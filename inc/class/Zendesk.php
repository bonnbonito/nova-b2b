<?php

namespace NOVA_B2B;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;

class Zendesk {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;
	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Zendesk domain
	 */
	public const ZENDESK_DOMAIN = 'novasignagehelp.zendesk.com';
	/**
	 * Class Constructor.
	 */

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_zendesk_ticket_metabox' ) );
		add_action( 'save_post_shop_order', array( $this, 'save_zendesk_ticket_metabox' ) );

	}

	/**
	 * Get Zendesk API
	 *
	 * @return string
	 */
	public function get_zendesk_api() {
		return get_field( 'zendesk_api', 'option' );
	}

	/**
	 * Get Zendesk bearer token
	 *
	 * @param string $email
	 * @return string
	 */
	public function zendesk_bearer_token( $email ) {
		$api = $this->get_zendesk_api();

		return base64_encode( $email . '/token:' . $api );
	}

	/**
	 * Register routes
	 */
	public function register_routes() {
		register_rest_route( NOVA_REST_ROUTE_PREFIX, '/update-order', array(
			'methods' => 'POST',
			'callback' => array( $this, 'update_order_with_ticket' ),
			'permission_callback' => array( $this, 'check_auth' ),
		) );
	}

	/**
	 * Check authentication
	 *
	 * @return bool|WP_Error
	 */
	public function check_auth() {
		$user = wp_validate_application_password( false );

		if ( ! $user ) {
			return new WP_Error( 'rest_forbidden', 'Unauthorized', array( 'status' => 403 ) );
		}

		return true;
	}

	/**
	 * Update order with ticket
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response|WP_Error
	 */
	public function update_order_with_ticket( WP_REST_Request $request ) {

		error_log( print_r( $request->get_params(), true ) );

		$subject = $request->get_param( 'subject' ); // e.g., "131328"
		$ticket_id = $request->get_param( 'ticket_id' ); // Zendesk ticket ID

		if ( ! $subject || ! $ticket_id ) {
			return new WP_Error( 'missing_parameters', 'Missing subject or ticket_id', array( 'status' => 400 ) );
		}
		// Try to extract order ID from subject
		if ( preg_match( '/^\[NOVA\]: New order #NV(\d+)/', $subject, $matches ) ) {
			$order_id = $matches[1];
		} else {
			return new WP_Error( 'invalid_subject', 'Could not extract order ID from subject', array( 'status' => 400 ) );
		}

		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return new WP_Error( 'order_not_found', 'Order not found', array( 'status' => 404 ) );
		}

		if ( $order->get_meta( 'zendesk_ticket_id' ) ) {
			return new WP_Error( 'ticket_already_exists', 'Ticket already exists', array( 'status' => 400 ) );
		}

		$order->update_meta_data( 'zendesk_ticket_id', $ticket_id );
		$order->save();

		return new WP_REST_Response( array( 'message' => 'Order updated with ticket ID' ), 200 );
	}

	/**
	 * Add Zendesk ticket metabox
	 */
	public function add_zendesk_ticket_metabox() {
		add_meta_box(
			'zendesk_ticket_metabox',
			__( 'Zendesk Ticket', 'nova-b2b' ),
			array( $this, 'zendesk_ticket_metabox_callback' ),
			'shop_order',
			'side',
			'default'
		);
	}

	/**
	 * Zendesk ticket metabox callback
	 *
	 * @param WP_Post $post
	 */
	public function zendesk_ticket_metabox_callback( $post ) {
		wp_nonce_field( 'save_zendesk_ticket_metabox', 'zendesk_ticket_metabox_nonce' );

		$ticket_id = get_post_meta( $post->ID, 'zendesk_ticket_id', true );

		echo '<p>';
		echo '<label for="zendesk_ticket_id">' . esc_html__( 'Ticket ID:', 'nova-b2b' ) . '</label><br/>';
		echo '<input type="text" id="zendesk_ticket_id" name="zendesk_ticket_id" value="' . esc_attr( $ticket_id ) . '" style="width:100%" ' . ( $ticket_id ? 'readonly' : '' ) . '/>';
		if ( $ticket_id ) {
			echo '<br/><a href="https://' . self::ZENDESK_DOMAIN . '/agent/tickets/' . esc_attr( $ticket_id ) . '" target="_blank" class="button button-small" style="margin-top:5px;">View Ticket</a>';
		}
		echo '</p>';
		echo '<style>';
		echo '#zendesk_ticket_id:target{ border: 2px solid red !important; }';
		echo '</style>';
	}

	/**
	 * Save Zendesk ticket metabox
	 *
	 * @param int $post_id
	 */
	public function save_zendesk_ticket_metabox( $post_id ) {
		if ( ! isset( $_POST['zendesk_ticket_metabox_nonce'] ) ) {
			return;
		}

		if ( ! wp_verify_nonce( $_POST['zendesk_ticket_metabox_nonce'], 'save_zendesk_ticket_metabox' ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( isset( $_POST['zendesk_ticket_id'] ) ) {
			update_post_meta( $post_id, 'zendesk_ticket_id', sanitize_text_field( $_POST['zendesk_ticket_id'] ) );
		}
	}

	/**
	 * Send Zendesk reply
	 *
	 * @param string $email
	 * @param string $ticket_id
	 * @param string $message
	 * @param array $files_urls
	 * @param bool $public
	 * @param array $cc_emails
	 * @return bool|WP_Error
	 */
	public function send_zendesk_reply( $email, $ticket_id, $message, $files_urls = [], $public = true, $collaborators = [] ) {
		$url = 'https://' . self::ZENDESK_DOMAIN . '/api/v2/tickets/' . $ticket_id . '.json';
		$headers = array(
			'Authorization' => 'Basic ' . $this->zendesk_bearer_token( $email ),
			'Content-Type' => 'application/json',
		);

		if ( ! empty( $files_urls ) ) {
			$files_tokens = array();
			foreach ( $files_urls as $file_url ) {
				$files_tokens[] = $this->upload_files_to_zendesk( $file_url, $email );
			}
		}

		$comment_array = array(
			'html_body' => $message,
			'public' => $public,
		);

		if ( ! empty( $files_tokens ) ) {
			$comment_array['uploads'] = $files_tokens;
		}

		$ticket_array = array(
			'comment' => $comment_array,
		);

		if ( ! empty( $collaborators ) ) {
			$ticket_array['collaborators'] = $collaborators;
		}

		$data = array(
			'ticket' => $ticket_array,
		);

		$args_ticket = array(
			'method' => 'PUT',
			'headers' => $headers,
			'body' => json_encode( $data ),
		);

		$ticket_response = wp_remote_request( $url, $args_ticket );

		if ( is_wp_error( $ticket_response ) ) {
			error_log( print_r( $ticket_response, true ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to update ticket', array( 'status' => 500 ) );
		}

		$response_code = wp_remote_retrieve_response_code( $ticket_response );

		if ( $response_code !== 200 ) {
			error_log( print_r( $ticket_response, true ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to update ticket', array( 'status' => $response_code ) );
		}

		return true;
	}

	/**
	 * Upload files to Zendesk from a Dropbox URL without saving to a temporary file
	 *
	 * @param string $file_url Dropbox file URL
	 * @param string $email
	 * @return string|WP_Error Upload token or error
	 */
	public function upload_files_to_zendesk( $file_url, $email ) {
		// Step 1: Download the file from Dropbox using wp_remote_get
		$file_url = str_replace( 'dl=0', 'dl=1', $file_url );
		$response = wp_remote_get( $file_url, array(
			'timeout' => 60,
			'redirection' => 10,
			'sslverify' => false,
			'headers' => array(
				'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
				'Accept' => 'application/pdf,application/octet-stream',
			),
		) );

		if ( is_wp_error( $response ) ) {
			error_log( 'Dropbox download failed: ' . $response->get_error_message() );
			return new WP_Error( 'download_error', 'Failed to download file from Dropbox', array( 'status' => 500 ) );
		}


		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			error_log( 'Dropbox download failed with code ' . $response_code . ': ' . wp_remote_retrieve_body( $response ) );
			return new WP_Error( 'download_error', 'Failed to download file from Dropbox', array( 'status' => $response_code ) );
		}

		$file_content = wp_remote_retrieve_body( $response );
		if ( empty( $file_content ) ) {
			error_log( 'Downloaded file content is empty for URL: ' . $file_url );
			return new WP_Error( 'download_error', 'Downloaded file is empty', array( 'status' => 500 ) );
		}


		// Step 2: Determine MIME type from buffer (no temp file)
		$finfo = new \finfo( FILEINFO_MIME_TYPE );
		$mime_type = $finfo->buffer( $file_content );
		error_log( 'MIME type detected: ' . $mime_type );


		// Step 3: Upload to Zendesk
		$filename = basename( parse_url( $file_url, PHP_URL_PATH ) ); // e.g., "CABC-S003-MEIGARDEN-2714-3D-Layered-Flat-Cut-Acrylic.pdf"

		// if $filename does not end with .pdf or .zip, add .zip to the end
		if ( ! preg_match( '/\.pdf|\.zip/i', $filename ) ) {
			$filename .= '.zip';
		}

		$url = 'https://' . self::ZENDESK_DOMAIN . '/api/v2/uploads.json?filename=' . urlencode( $filename );
		$headers = array(
			'Authorization' => 'Basic ' . $this->zendesk_bearer_token( $email ),
			'Content-Type' => $mime_type,
		);

		$args_upload = array(
			'method' => 'POST',
			'headers' => $headers,
			'body' => $file_content,
			'timeout' => 60
		);

		$upload_response = wp_remote_request( $url, $args_upload );

		if ( is_wp_error( $upload_response ) ) {
			error_log( 'Zendesk upload failed: ' . $upload_response->get_error_message() );
			return new WP_Error( 'zendesk_api_error', 'Failed to upload files', array( 'status' => 500 ) );
		}

		$response_code = wp_remote_retrieve_response_code( $upload_response );
		if ( $response_code !== 201 ) {
			error_log( 'Zendesk upload failed with code ' . $response_code . ': ' . wp_remote_retrieve_body( $upload_response ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to upload files', array( 'status' => $response_code ) );
		}

		$response_body = json_decode( wp_remote_retrieve_body( $upload_response ), true );
		return $response_body['upload']['token'];
	}

	/**
	 * Merge multiple pdf files into one pdf file
	 *
	 * @param array $files_urls
	 * @return string
	 */
	public function merge_files( $files_urls ) {
		return false;
	}

	/**
	 * Add/Remove a zendesk tag to a ticket
	 *
	 * @param string $ticket_id
	 * @param string $tag
	 * @param bool $add Add or remove the tag
	 * @param string $email Email for authentication
	 * @return bool|WP_Error
	 */
	public function update_zendesk_tag( $email, $ticket_id, $tag, $add = true ) {
		$url = 'https://' . self::ZENDESK_DOMAIN . '/api/v2/tickets/' . $ticket_id . '.json';
		$headers = array(
			'Authorization' => 'Basic ' . $this->zendesk_bearer_token( $email ),
			'Content-Type' => 'application/json',
		);

		// Get current ticket details
		$get_args = array(
			'method' => 'GET',
			'headers' => $headers,
		);
		$get_response = wp_remote_request( $url, $get_args );

		if ( is_wp_error( $get_response ) ) {
			error_log( 'Zendesk get ticket failed: ' . $get_response->get_error_message() );
			return new WP_Error( 'zendesk_api_error', 'Failed to get ticket details', array( 'status' => 500 ) );
		}

		$get_response_code = wp_remote_retrieve_response_code( $get_response );
		if ( $get_response_code !== 200 ) {
			error_log( 'Zendesk get ticket failed with code ' . $get_response_code . ': ' . wp_remote_retrieve_body( $get_response ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to get ticket details', array( 'status' => $get_response_code ) );
		}

		$ticket_data = json_decode( wp_remote_retrieve_body( $get_response ), true );
		$current_tags = $ticket_data['ticket']['tags'] ?? array();

		// Add or remove the tag
		if ( $add ) {
			if ( ! in_array( $tag, $current_tags ) ) {
				$current_tags[] = $tag;
			}
		} else {
			$current_tags = array_filter( $current_tags, function ($current_tag) use ($tag) {
				return $current_tag !== $tag;
			} );
			// Re-index array after filter
			$current_tags = array_values( $current_tags );
		}

		// Update the ticket tags
		$update_data = array(
			'ticket' => array(
				'tags' => $current_tags,
			),
		);

		$put_args = array(
			'method' => 'PUT',
			'headers' => $headers,
			'body' => json_encode( $update_data ),
		);

		$put_response = wp_remote_request( $url, $put_args );

		if ( is_wp_error( $put_response ) ) {
			error_log( 'Zendesk update tags failed: ' . $put_response->get_error_message() );
			return new WP_Error( 'zendesk_api_error', 'Failed to update ticket tags', array( 'status' => 500 ) );
		}

		$put_response_code = wp_remote_retrieve_response_code( $put_response );

		if ( $put_response_code !== 200 ) {
			error_log( 'Zendesk update tags failed with code ' . $put_response_code . ': ' . wp_remote_retrieve_body( $put_response ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to update ticket tags', array( 'status' => $put_response_code ) );
		}

		return true;
	}

	/**
	 * Get ticket details from Zendesk
	 *
	 * @param string $email Email for authentication
	 * @param string $ticket_id Zendesk ticket ID
	 * @return array|WP_Error Ticket details or error
	 */
	public function get_ticket_details( $email, $ticket_id ) {
		$url = 'https://' . self::ZENDESK_DOMAIN . '/api/v2/tickets/' . $ticket_id . '.json';
		$headers = array(
			'Authorization' => 'Basic ' . $this->zendesk_bearer_token( $email ),
			'Content-Type' => 'application/json',
		);

		$args = array(
			'method' => 'GET',
			'headers' => $headers,
		);

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			error_log( 'Zendesk get ticket failed: ' . $response->get_error_message() );
			return new WP_Error( 'zendesk_api_error', 'Failed to get ticket details', array( 'status' => 500 ) );
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			error_log( 'Zendesk get ticket failed with code ' . $response_code . ': ' . wp_remote_retrieve_body( $response ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to get ticket details', array( 'status' => $response_code ) );
		}

		return json_decode( wp_remote_retrieve_body( $response ), true );
	}

	/**
	 * Get user details from Zendesk
	 *
	 * @param string $email Email for authentication
	 * @param string $user_id Zendesk user ID
	 * @return array|WP_Error User details or error
	 */
	public function get_user_details( $email, $user_id ) {
		$url = 'https://' . self::ZENDESK_DOMAIN . '/api/v2/users/' . $user_id . '.json';
		$headers = array(
			'Authorization' => 'Basic ' . $this->zendesk_bearer_token( $email ),
			'Content-Type' => 'application/json',
		);

		$args = array(
			'method' => 'GET',
			'headers' => $headers,
		);

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			error_log( 'Zendesk get user failed: ' . $response->get_error_message() );
			return new WP_Error( 'zendesk_api_error', 'Failed to get user details', array( 'status' => 500 ) );
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			error_log( 'Zendesk get user failed with code ' . $response_code . ': ' . wp_remote_retrieve_body( $response ) );
			return new WP_Error( 'zendesk_api_error', 'Failed to get user details', array( 'status' => $response_code ) );
		}

		return json_decode( wp_remote_retrieve_body( $response ), true );
	}

	/**
	 * Get requester's first name from Zendesk ticket or WooCommerce order
	 *
	 * @param string $email Email for authentication
	 * @param string $ticket_id Zendesk ticket ID
	 * @param int    $order_id WooCommerce order ID
	 * @return string Customer's first name
	 */
	public function get_requester_first_name( $email, $ticket_id, $order_id ) {
		$ticket_data = $this->get_ticket_details( $email, $ticket_id );
		if ( ! is_wp_error( $ticket_data ) ) {
			$requester_id = $ticket_data['ticket']['requester_id'];
			$user_data = $this->get_user_details( $email, $requester_id );

			if ( ! is_wp_error( $user_data ) && ! empty( $user_data['user']['first_name'] ) ) {
				return $user_data['user']['first_name'];
			}
		}

		// Fallback to WooCommerce customer name
		$order = wc_get_order( $order_id );
		if ( $order ) {
			$first_name = $order->get_billing_first_name();
			if ( ! empty( $first_name ) ) {
				return $first_name;
			}
			// If no billing first name, return full billing name
			return $order->get_formatted_billing_full_name();
		}

		return '';
	}

}