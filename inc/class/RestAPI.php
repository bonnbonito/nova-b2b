<?php

namespace NOVA_B2B;

class RestAPI {
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
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'wp_footer', array( $this, 'debug' ) );
	}

	/**
	 * Debug
	 */
	public function debug() {
		$response = wp_remote_get(
			rest_url( 'nova/v1/nova_orders' ),
			array(
				'cookies' => $_COOKIE,
				'headers' => array(
					'X-WP-Nonce' => wp_create_nonce( 'wp_rest' )
				)
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'REST API Error: ' . $response->get_error_message() );
			return;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body );
		?>
		<script>
			console.log(<?php echo json_encode( $data ); ?>);
		</script>
		<?php
	}

	/**
	 * Register REST API routes
	 */
	public function register_rest_routes() {
		register_rest_route(
			'nova/v1',
			'/nova_orders',
			array(
				'methods' => 'GET',
				'callback' => array( $this, 'get_nova_orders' ),
				'permission_callback' => '__return_true',
				// 'permission_callback' => function () {
				// 	return current_user_can( 'manage_woocommerce' );
				// },
			)
		);
	}

	public function get_nova_live_orders() {
		global $wpdb;

		// Get all order IDs
		$order_ids = $wpdb->get_col(
			"SELECT DISTINCT p.ID FROM {$wpdb->posts} p 
			LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = '_hide_order'
			LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_is_temporary_combined_order'
			WHERE p.post_type = 'shop_order' 
			AND p.post_status != 'trash'
			AND pm1.meta_value IS NULL
			AND pm2.meta_value IS NULL
			ORDER BY p.post_date DESC"
		);

		return $order_ids;

	}

	/**
	 * Get orders excluding those with _hide_order meta
	 */
	public function get_nova_orders() {

		$order_ids = $this->get_nova_live_orders();

		$response = array();

		foreach ( $order_ids as $order_id ) {
			$order = wc_get_order( $order_id );

			if ( ! $order ) {
				continue;
			}

			$customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
			/** if 'test' is in customer name, continue */
			if ( stripos( $customer_name, 'test' ) !== false ) {
				continue;
			}

			$payment_type = 'Full Payment';

			$payment_select = get_post_meta( $order_id, '_payment_select', true );
			$deposit_chosen = get_post_meta( $order_id, '_deposit_chosen', true );

			if ( $payment_select ) {
				$payment_type = get_the_title( intval( $payment_select ) );
			}

			if ( $deposit_chosen ) {
				$payment_type = get_the_title( intval( $deposit_chosen ) );
			}


			$items = $order->get_items();

			foreach ( $items as $item ) {
				$signage = $item->get_meta( 'signage' );
				if ( $signage ) {
					foreach ( $signage as $sign ) {

						print_r( $sign );

						$response[] = array(
							'order_id' => $order->get_id(),
							'customer_name' => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
							'customer_email' => $order->get_billing_email(),
							'state' => $order->get_billing_state(),
							'country' => $order->get_billing_country(),
							'currency' => $order->get_currency(),
							'price' => $order->get_total(),
							'order_date' => $order->get_date_created()->format( 'Y-m-d H:i:s' ),
							'payment_type' => $payment_type,
							'product_line' => get_the_title( $sign->product ),
						);
					}
				}
			}
		}

		return new \WP_REST_Response( $response, 200 );
	}
}