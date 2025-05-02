<?php

namespace NOVA_B2B;

use WP_Error;
use WP_REST_Response;
use WP_REST_Request;


class Trello {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Trello API Key
	 *
	 * @var string
	 */
	private $api_key;

	/**
	 * Trello API Token
	 *
	 * @var string
	 */
	private $api_token;

	/**
	 * Trello API Secret
	 *
	 * @var string
	 */
	private $api_secret;

	/**
	 * Trello API Base URL
	 *
	 * @var string
	 */
	public $api_url = 'https://api.trello.com/1';

	/**
	 * Trello Default List ID
	 *
	 * @var string
	 */
	public $default_list_id;

	/**
	 * Trello Default Board ID
	 *
	 * @var string
	 */
	public $default_board_id;

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
	 * Needs debugging
	 */
	private $debugging;

	/**
	 * Class Constructor.
	 */
	public function __construct() {
		$this->api_key = get_field( 'trello_api_key', 'option' );
		$this->api_token = get_field( 'trello_api_token', 'option' );
		$this->default_list_id = get_field( 'trello_default_list_id', 'option' );
		$this->default_board_id = get_field( 'trello_default_board_id', 'option' );
		$this->api_secret = get_field( 'trello_secret_key', 'option' );
		$this->debugging = false;

		if ( $this->debugging ) {
			error_log( 'Trello Credentials Check: ' . print_r( array(
				'api_key_set' => ! empty( $this->api_key ),
				'api_token_set' => ! empty( $this->api_token ),
				'default_list_id_set' => ! empty( $this->default_list_id ),
				'default_board_id_set' => ! empty( $this->default_board_id )
			), true ) );
		}

		//add_action( 'wp', array( $this, 'create_sample_card' ) );

		// Register REST route for webhook
		add_action( 'rest_api_init', array( $this, 'register_webhook_endpoint' ) );
	}

	public function create_sample_card() {
		if ( $this->debugging ) {
			error_log( 'Creating sample card' );
		}
		$name = 'Test Card';
		$desc = 'This is a test card';
		$this->create_card( $this->default_list_id, $name, $desc );
	}

	/**
	 * Set API credentials
	 *
	 * @param string $api_key Trello API Key.
	 * @param string $api_token Trello API Token.
	 * @return bool
	 */
	public function set_credentials( $api_key, $api_token ) {
		update_field( 'trello_api_key', $api_key, 'option' );
		update_field( 'trello_api_token', $api_token, 'option' );
		$this->api_key = $api_key;
		$this->api_token = $api_token;
		return true;
	}

	/**
	 * Create a new card with optional file attachment
	 *
	 * @param string $list_id List ID.
	 * @param string $name Card name.
	 * @param string $desc Card description.
	 * @param array  $options Additional options.
	 * @param array  $attachments Array of attachments [['path' => '/path/to/file', 'name' => 'filename.ext']].
	 * @return array|WP_Error Card object containing id, name, desc, url, etc. or WP_Error on failure
	 */
	public function create_card( $list_id, $name, $desc = '', $options = [], $attachments = [], $order_id = null ) {
		if ( $this->debugging ) {
			error_log( 'Create card called with attachments: ' . print_r( $attachments, true ) );
		}
		$endpoint = "/cards";
		$params = array_merge( [ 
			'idList' => $list_id,
			'name' => $name,
			'desc' => $desc,
		], $options );

		$response = $this->make_request( 'POST', $endpoint, $params );

		if ( $this->debugging ) {
			error_log( 'Card created: ' . print_r( $response, true ) );
		}

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Attach files if any
		if ( ! empty( $attachments ) && is_array( $attachments ) ) {
			foreach ( $attachments as $attachment ) {
				if ( ! is_array( $attachment ) && filter_var( $attachment, FILTER_VALIDATE_URL ) ) {
					// Handle direct URL strings
					$attach_result = $this->attach_file_to_card( $response['id'], $attachment );
					if ( is_wp_error( $attach_result ) ) {
						error_log( 'Failed to attach URL to card: ' . $attach_result->get_error_message() );
					}
					continue;
				}

				if ( ! is_array( $attachment ) || ( ! isset( $attachment['path'] ) && ! isset( $attachment['url'] ) ) ) {
					error_log( 'Invalid attachment format: ' . print_r( $attachment, true ) );
					continue;
				}

				$file_path = isset( $attachment['url'] ) ? $attachment['url'] : $attachment['path'];
				$file_name = isset( $attachment['name'] ) ? $attachment['name'] : '';

				$attach_result = $this->attach_file_to_card( $response['id'], $file_path, $file_name );
				if ( is_wp_error( $attach_result ) ) {
					error_log( 'Failed to attach file to card: ' . $attach_result->get_error_message() );
				}
			}
		}

		if ( $order_id ) {
			//save the card id to meta
			update_post_meta( $order_id, 'trello_card_id', $response['id'] );
			$this->create_webhook_for_order( $order_id, $name, $response['id'] );
		}

		return $response;

	}

	public function create_webhook_for_order( $order_id, $name, $trello_card_id ) {

		$webhook_url = get_field( 'trello_webhook_url', 'option' );

		$callback_url = $webhook_url ? $webhook_url : get_rest_url( null, NOVA_REST_ROUTE_PREFIX . '/trello-webhook' );

		// Automatically create webhook for this card
		$webhook = $this->create_webhook(
			$callback_url,
			$trello_card_id,
			'Auto-created webhook for card: ' . $name
		);

		if ( is_wp_error( $webhook ) ) {
			error_log( 'Failed to create webhook for card: ' . $webhook->get_error_message() );
			return;
		}

		if ( $webhook ) {
			//save the webhook id to meta
			update_post_meta( $order_id, 'trello_webhook_id', $webhook['id'] );
		}

		return $webhook['id'];

	}

	private function download_file_from_url( $url ) {
		// Simple Dropbox URL conversion
		$url = str_replace( 'dl=0', 'dl=1', $url );

		// Get original filename from URL
		$filename = basename( parse_url( $url, PHP_URL_PATH ) );
		// Remove query parameters if present
		$filename = preg_replace( '/\?.*/', '', $filename );

		// Create temporary file with original name
		$tmp_dir = get_temp_dir();
		$tmp_file = $tmp_dir . wp_unique_filename( $tmp_dir, $filename );

		// Download file with proper headers
		$response = wp_remote_get( $url, array(
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
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			error_log( 'Dropbox download failed with code ' . $response_code . ': ' . wp_remote_retrieve_body( $response ) );
			return new WP_Error( 'download_error', 'Failed to download file from Dropbox', array( 'status' => $response_code ) );
		}

		$file_content = wp_remote_retrieve_body( $response );
		if ( empty( $file_content ) ) {
			return new WP_Error( 'download_error', 'Downloaded file is empty' );
		}

		if ( file_put_contents( $tmp_file, $file_content ) === false ) {
			return new WP_Error( 'file_write_error', 'Could not write to temporary file' );
		}

		if ( $this->debugging ) {
			error_log( 'File downloaded successfully to: ' . $tmp_file );
		}

		return $tmp_file;
	}

	private function get_file_extension_from_url( $url ) {
		$filename = basename( parse_url( $url, PHP_URL_PATH ) );
		$ext = pathinfo( $filename, PATHINFO_EXTENSION );

		if ( ! empty( $ext ) ) {
			return strtolower( $ext );
		}

		// Fallback
		return strpos( $url, '.pdf' ) !== false ? 'pdf' : 'zip';
	}

	/**
	 * Attach a file to a card
	 *
	 * @param string $card_id Card ID.
	 * @param string $file_path Full path to the file.
	 * @param string $file_name Optional file name to use (defaults to basename of file_path).
	 * @return array|WP_Error
	 */
	public function attach_file_to_card( $card_id, $file_path, $file_name = '' ) {
		if ( $this->debugging ) {
			error_log( 'Attach file to card called with file_path: ' . $file_path );
		}

		// Handle URL attachments
		if ( filter_var( $file_path, FILTER_VALIDATE_URL ) ) {
			$ext = $this->get_file_extension_from_url( $file_path );
			$tmp_file = $this->download_file_from_url( $file_path );
			if ( is_wp_error( $tmp_file ) ) {
				return $tmp_file;
			}
			$file_path = $tmp_file;
			$file_name = $file_name ?: basename( parse_url( $file_path, PHP_URL_PATH ) );

			// Add extension if filename doesn't have one
			if ( ! pathinfo( $file_name, PATHINFO_EXTENSION ) ) {
				$file_name .= '.' . $ext;
			}
		}

		if ( ! file_exists( $file_path ) ) {
			return new WP_Error( 'file_not_found', 'File not found: ' . $file_path );
		}

		// Get file info
		$mime_type = mime_content_type( $file_path );
		$file_content = file_get_contents( $file_path );

		if ( $file_content === false ) {
			return new WP_Error( 'file_read_error', 'Could not read file: ' . $file_path );
		}

		// Prepare file data
		$boundary = wp_generate_password( 24 );
		$payload = '';

		// Add file metadata
		$payload .= "--" . $boundary . "\r\n";
		$payload .= 'Content-Disposition: form-data; name="file"; filename="' . $file_name . '"' . "\r\n";
		$payload .= 'Content-Type: ' . $mime_type . "\r\n\r\n";
		$payload .= $file_content . "\r\n";
		$payload .= "--" . $boundary . "--\r\n";

		// Make request
		$endpoint = "/cards/" . $card_id . "/attachments";
		$url = $this->api_url . $endpoint;

		// Add authentication parameters to URL
		$url = add_query_arg( array(
			'key' => $this->api_key,
			'token' => $this->api_token
		), $url );

		$args = array(
			'method' => 'POST',
			'headers' => array(
				'Content-Type' => 'multipart/form-data; boundary=' . $boundary
			),
			'body' => $payload,
			'timeout' => 60
		);

		if ( $this->debugging ) {
			error_log( 'Trello upload request URL: ' . $url );
			error_log( 'Trello upload request args: ' . print_r( $args, true ) );
		}

		$response = wp_remote_request( $url, $args );

		// Clean up temporary file if it was created from URL
		if ( filter_var( $file_path, FILTER_VALIDATE_URL ) ) {
			@unlink( $tmp_file );
		}

		if ( is_wp_error( $response ) ) {
			error_log( 'Trello upload failed: ' . $response->get_error_message() );
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			$body = wp_remote_retrieve_body( $response );
			error_log( 'Trello upload failed with code ' . $response_code . ': ' . $body );
			return new WP_Error( 'trello_api_error', 'Failed to upload file', array( 'status' => $response_code, 'body' => $body ) );
		}

		return json_decode( wp_remote_retrieve_body( $response ), true );
	}

	/**
	 * Create a webhook
	 *
	 * @param string $callback_url Webhook callback URL.
	 * @param string $id_model ID of the model to watch.
	 * @param string $description Webhook description.
	 * @return array|WP_Error
	 */
	public function create_webhook( $callback_url, $id_model, $description = '' ) {
		$endpoint = "/webhooks";
		$params = [ 
			'callbackURL' => $callback_url,
			'idModel' => $id_model,
			'description' => $description,
		];

		return $this->make_request( 'POST', $endpoint, $params );
	}

	/**
	 * Get list name by ID
	 *
	 * @param string $list_id List ID.
	 * @return string|WP_Error
	 */
	public function get_list_name( $list_id ) {
		$endpoint = "/lists/{$list_id}";
		$response = $this->make_request( 'GET', $endpoint );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return isset( $response['name'] ) ? $response['name'] : '';
	}

	/**
	 * Make an API request to Trello
	 *
	 * @param string $method HTTP method.
	 * @param string $endpoint API endpoint.
	 * @param array  $params Request parameters.
	 * @param array  $extra_args Additional wp_remote_request arguments.
	 * @return array|WP_Error
	 */
	private function make_request( $method, $endpoint, $params = [], $extra_args = [] ) {
		if ( empty( $this->api_key ) || empty( $this->api_token ) ) {
			return new WP_Error( 'trello_api_error', 'API credentials not set' );
		}

		$params = array_merge( $params, [ 
			'key' => $this->api_key,
			'token' => $this->api_token,
		] );

		$url = $this->api_url . $endpoint;

		if ( $method === 'GET' ) {
			$url = add_query_arg( $params, $url );
		}

		$args = array_merge( [ 
			'method' => $method,
			'headers' => [ 
				'Content-Type' => 'application/json',
			],
			'timeout' => 30,
			'sslverify' => true,
		], $extra_args );

		if ( $method !== 'GET' && empty( $extra_args ) ) {
			$args['body'] = json_encode( $params );
		}

		if ( $this->debugging ) {
			// Log the request for debugging
			error_log( 'Trello API Request: ' . print_r( [ 
				'url' => $url,
				'method' => $method,
				'params' => $params,
				'args' => $args
			], true ) );
		}

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			error_log( 'Trello API WP Error: ' . $response->get_error_message() );
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		$body = wp_remote_retrieve_body( $response );

		if ( $this->debugging ) {
			// Log the response for debugging
			error_log( 'Trello API Response: ' . print_r( [ 
				'code' => $response_code,
				'body' => $body
			], true ) );
		}

		if ( $response_code !== 200 ) {
			return new WP_Error(
				'trello_api_error',
				'API request failed with status ' . $response_code,
				[ 
					'status' => $response_code,
					'body' => $body
				]
			);
		}

		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new WP_Error(
				'trello_api_error',
				'Invalid JSON response: ' . json_last_error_msg(),
				[ 
					'body' => $body,
					'json_error' => json_last_error(),
					'json_error_msg' => json_last_error_msg()
				]
			);
		}

		return $data;
	}

	/**
	 * Register the webhook endpoint
	 */
	public function register_webhook_endpoint() {
		register_rest_route( NOVA_REST_ROUTE_PREFIX, '/trello-webhook', [ 
			[ 
				'methods' => 'HEAD',
				'callback' => [ $this, 'handle_webhook_verification' ],
				'permission_callback' => '__return_true',
			],
			[ 
				'methods' => 'POST',
				'callback' => [ $this, 'handle_webhook' ],
				'permission_callback' => [ $this, 'verify_webhook' ],
			]
		] );
	}

	/**
	 * Handle webhook verification request from Trello
	 *
	 * @return WP_REST_Response
	 */
	public function handle_webhook_verification() {
		return new WP_REST_Response( null, 200 );
	}

	/**
	 * Verify webhook request is from Trello
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return bool
	 */
	public function verify_webhook( WP_REST_Request $request ) {
		// Get Trello's signature
		$signature = $request->get_header( 'X-Trello-Webhook' );
		if ( empty( $signature ) ) {
			error_log( 'Trello webhook verification failed: Missing signature' );
			return false;
		}

		// Get request body
		$content = $request->get_body();

		// Get callback URL from request body
		$data = json_decode( $content, true );
		if ( ! isset( $data['webhook']['callbackURL'] ) ) {
			error_log( 'Trello webhook verification failed: Missing callbackURL in webhook data' );
			return false;
		}
		$callback_url = $data['webhook']['callbackURL'];

		// Calculate expected signature using content + callback URL
		$payload = $content . $callback_url;
		$expected = base64_encode( hash_hmac( 'sha1', $payload, $this->api_secret, true ) );

		// Compare signatures
		return hash_equals( $signature, $expected );
	}

	/**
	 * Handle incoming webhook from Trello
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function handle_webhook( $request ) {
		$payload = $request->get_json_params();


		// Get action details
		$action = isset( $payload['action'] ) ? $payload['action'] : null;
		$model = isset( $payload['model'] ) ? $payload['model'] : null;

		if ( ! $action || ! $model ) {
			return new WP_REST_Response( [ 'error' => 'Invalid payload' ], 400 );
		}

		// Log action for debugging
		if ( $this->debugging ) {
			error_log( 'Trello Webhook Action: ' . print_r( $action, true ) );
		}

		// Find associated order
		$card_id = $action['data']['card']['id'];

		error_log( 'Trello Webhook Card ID: ' . $card_id );

		$args = array(
			'post_type' => 'shop_order',
			'meta_key' => 'trello_card_id',
			'meta_value' => $card_id,
			'meta_compare' => '=',
			'post_status' => 'any',
			'posts_per_page' => 1,
		);

		$orders = get_posts( $args );


		if ( ! empty( $orders ) ) {
			$order_id = $orders[0]->ID;

			// Get existing actions
			$trello_actions = get_post_meta( $order_id, 'trello_actions', true );
			if ( ! is_array( $trello_actions ) ) {
				$trello_actions = array();
			}

			// Add new action with timestamp
			$action['timestamp'] = current_time( 'mysql' );
			$trello_actions[] = $action;

			// Save updated actions
			update_post_meta( $order_id, 'trello_actions', $trello_actions );
		}

		// Handle different action types
		switch ( $action['type'] ) {
			case 'createCard':
				$this->handle_card_created( $action, $order_id );
				break;

			case 'updateCard':
				$this->handle_card_updated( $action, $order_id );
				break;

			case 'deleteCard':
				$this->handle_card_deleted( $action, $order_id );
				break;
		}

		return new WP_REST_Response( [ 'status' => 'success' ], 200 );
	}

	/**
	 * Handle card creation action
	 *
	 * @param array $action Action data from webhook.
	 */
	private function handle_card_created( $action, $order_id ) {
		// Implement card creation handling
		$card_data = $action['data']['card'];
		if ( $this->debugging ) {
			error_log( 'Card Created: ' . print_r( $card_data, true ) );
		}
		// Add your custom logic here
	}

	/**
	 * Handle card update action
	 *
	 * @param array $action Action data from webhook.
	 */
	private function handle_card_updated( $action, $order_id ) {
		$card_data = $action['data']['card'];
		$old_data = $action['data']['old'];

		// Check if card was moved to a different list
		if ( isset( $old_data['idList'] ) ) {
			$new_list_id = $card_data['idList'];
			$old_list_id = $old_data['idList'];

			do_action( 'trello_card_moved', $card_data, $old_list_id, $new_list_id, $order_id );
		}
		// Handle other types of updates
		else {

			do_action( 'trello_card_updated', $card_data, $old_data, $order_id );
		}
	}

	/**
	 * Handle card deletion action
	 *
	 * @param array $action Action data from webhook.
	 */
	private function handle_card_deleted( $action, $order_id ) {
		// Implement card deletion handling
		$card_data = $action['data']['card'];
		if ( $this->debugging ) {
			error_log( 'Card Deleted: ' . print_r( $card_data, true ) );
		}
		// Add your custom logic here
	}

	/**
	 * Get Trello actions for an order
	 * 
	 * @param int $order_id WooCommerce order ID
	 * @return array Array of Trello actions
	 */
	public function get_order_trello_actions( $order_id ) {
		$actions = get_post_meta( $order_id, 'trello_actions', true );
		return is_array( $actions ) ? $actions : array();
	}
}