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
		register_rest_route( 'nova/v1', '/update-order', array(
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


	public function send_zendesk_reply( $email, $ticket_id, $message ) {
		$url = 'https://' . self::ZENDESK_DOMAIN . '/api/v2/tickets/' . $ticket_id . '.json';
		$headers = array(
			'Authorization' => 'Basic ' . $this->zendesk_bearer_token( $email ),
			'Content-Type' => 'application/json',
		);

		$data = array(
			'ticket' => array(
				'comment' => array(
					'body' => $message,
					'public' => true,
				),
			),
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

}