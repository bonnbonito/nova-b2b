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
		add_action( 'admin_menu', array( $this, 'add_export_orders_submenu_page' ) );
		//add_action( 'wp_footer', array( $this, 'debug' ) );
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
				'permission_callback' => function () {
					return current_user_can( 'manage_woocommerce' );
				},
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

			$script = \NOVA_B2B\Scripts::get_instance();


			$items = $order->get_items();

			foreach ( $items as $item ) {
				$signage = $item->get_meta( 'signage' );



				if ( $signage ) {
					$response[] = array(
						'Order ID' => $order->get_id(),
						'Product Line' => wp_strip_all_tags( get_the_title( $signage[0]->product ) ),
						'Customer Name' => wp_strip_all_tags( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ),
						'Business ID' => get_field( 'business_id', 'user_' . $order->get_customer_id() ),
						'Customer Email' => wp_strip_all_tags( $order->get_billing_email() ),
						'State' => wp_strip_all_tags( $order->get_billing_state() ),
						'Country' => wp_strip_all_tags( $order->get_billing_country() ),
						'Currency' => wp_strip_all_tags( $order->get_currency() ),
						'Item Total' => floatval( $order->get_subtotal() ),
						'Total Price' => floatval( $order->get_total() ),
						'Order Date' => wp_strip_all_tags( $order->get_date_created()->format( 'Y-m-d H:i:s' ) ),
						'Payment Type' => wp_strip_all_tags( $payment_type ),
						'Material' => wp_strip_all_tags( $script ? $script->get_material_name( $signage[0]->product ) : '' ),
					);
				}
			}
		}

		return $response;

	}

	/**
	 * Get orders excluding those with _hide_order meta
	 */
	public function get_nova_orders() {

		$response = $this->get_nova_live_orders();

		return new \WP_REST_Response( $response, 200 );
	}

	/**
	 * Add Export Orders submenu page under WooCommerce menu
	 */
	public function add_export_orders_submenu_page() {
		add_submenu_page(
			'woocommerce',
			'Export Orders',
			'Export Orders',
			'manage_woocommerce',
			'export-orders',
			array( $this, 'export_orders_page_content' )
		);
	}

	/**
	 * Display the Export Orders page content
	 */
	public function export_orders_page_content() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		// Check if export button was clicked
		if ( isset( $_GET['export_orders'] ) && $_GET['export_orders'] === '1' ) {
			$this->export_orders_to_csv();
			return;
		}

		?>
		<div class="wrap">
			<h1>Export Orders</h1>
			<p>Click the button below to export all orders to a CSV file.</p>
			<a href="<?php echo admin_url( 'admin.php?page=export-orders&export_orders=1' ); ?>"
				class="button button-primary">Export Orders</a>
		</div>
		<?php
	}

	/**
	 * Export orders to CSV file
	 */
	private function export_orders_to_csv() {
		// Prevent WordPress from sending its headers
		if ( ! headers_sent() ) {
			// Clear any previous output
			ob_clean();

			// Prevent WordPress from processing further output
			remove_all_actions( 'wp_headers' );
			remove_all_actions( 'admin_head' );
			remove_all_actions( 'admin_footer' );

			// Set headers for CSV download
			header( 'Content-Type: text/csv; charset=utf-8' );
			header( 'Content-Disposition: attachment; filename="nova-orders-' . date( 'Y-m-d' ) . '.csv"' );
			header( 'Pragma: no-cache' );
			header( 'Expires: 0' );
		}

		$orders_data = $this->get_nova_live_orders();

		if ( empty( $orders_data ) ) {
			wp_die( 'No orders found to export.' );
		}

		// Create output stream
		$output = fopen( 'php://output', 'w' );

		// Add UTF-8 BOM for proper Excel encoding
		fputs( $output, "\xEF\xBB\xBF" );

		// Add headers
		fputcsv( $output, array_keys( $orders_data[0] ) );

		// Add data
		foreach ( $orders_data as $row ) {
			// Clean each field
			$clean_row = array_map( function ($value) {
				// First decode HTML entities
				$decoded = html_entity_decode( $value, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
				// Then strip any remaining HTML tags
				$stripped = wp_strip_all_tags( $decoded );
				// Finally trim any whitespace
				return trim( $stripped );
			}, $row );

			fputcsv( $output, $clean_row );
		}

		fclose( $output );
		exit();
	}
}