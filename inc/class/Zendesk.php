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
	 * Class Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route( 'nova/v1', '/update-order', array(
			'methods' => 'POST',
			'callback' => array( $this, 'update_order_with_ticket' ),
			'permission_callback' => array( $this, 'check_auth' ),
		) );
	}

	public function check_auth() {
		$user = wp_validate_application_password( false );

		if ( ! $user ) {
			return new WP_Error( 'rest_forbidden', 'Unauthorized', array( 'status' => 403 ) );
		}

		return true;
	}

	public function update_order_with_ticket( WP_REST_Request $request ) {

		$payload = $request->get_json_params();

		if ( ! isset( $payload['ticket'] ) || ! isset( $payload['ticket']['id'] ) || ! isset( $payload['ticket']['subject'] ) ) {
			return new WP_Error( 'missing_parameters', 'Missing ticket id or subject', array( 'status' => 400 ) );
		}

		$ticket_id = $payload['ticket']['id'];
		$subject = $payload['ticket']['subject'];

		if ( preg_match( '/#NV(\d+)/', $subject, $matches ) ) {
			$order_id = $matches[1]; // e.g., "131328"
		} else {
			return new WP_Error( 'invalid_subject', 'Could not extract order ID from subject', array( 'status' => 400 ) );
		}


		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return new WP_Error( 'order_not_found', 'Order not found', array( 'status' => 404 ) );
		}

		$order->update_meta_data( 'zendesk_ticket_id', $ticket_id );
		$order->save();

		return new WP_REST_Response( array( 'message' => 'Order updated with ticket ID' ), 200 );
	}
}