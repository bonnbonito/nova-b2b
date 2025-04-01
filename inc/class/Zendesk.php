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
		$order_id = $request->get_param( 'order_id' );
		$ticket_id = $request->get_param( 'ticket_id' );

		if ( ! $order_id || ! $ticket_id ) {
			return new WP_Error( 'missing_parameters', 'Missing order_id or ticket_id', array( 'status' => 400 ) );
		}

		$order = wc_get_order( $order_id );

		if ( ! $order ) {
			return new WP_Error( 'invalid_order', 'Invalid order', array( 'status' => 400 ) );
		}

		$order->update_meta_data( 'zendesk_ticket_id', $ticket_id );
		$order->save();

		return new WP_REST_Response( array( 'message' => 'Order updated with ticket ID' ), 200 );
	}
}