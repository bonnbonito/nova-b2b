<?php
namespace NOVA_B2B;

class Order_History {
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
		add_action( 'woocommerce_account_invoice-history_endpoint', array( $this, 'account_statement_content' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		wp_register_script(
			'nova-order-history',
			get_theme_file_uri( '/statements/build/index.js' ),
			array( 'wp-element' ),
			wp_get_theme()->get( 'Version' ),
			true
		);

		wp_register_style( 'nova-order-history', get_stylesheet_directory_uri() . '/statements/build/index.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );

		wp_localize_script(
			'nova-order-history',
			'NovaOrderHistory',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'orders'   => $this->get_orders(),
			)
		);

		if ( is_account_page() ) {
			wp_enqueue_script( 'nova-order-history' );
		}
	}

	public function account_statement_content() {
		?>
<div id="nova">
	<div id="hello"></div>
</div>
		<?php
	}

	public function get_orders() {
		if ( ! is_user_logged_in() ) {
			return array();
		}

		$current_user_id = get_current_user_id();

		$args = array(
			'customer_id' => $current_user_id,
			'limit'       => -1, // Get all orders
			'orderby'     => 'date',
			'order'       => 'DESC',
			'return'      => 'ids', // Return only order IDs
		);

		$order_ids = wc_get_orders( $args );

		$orders = array();
		foreach ( $order_ids as $order_id ) {
			$order    = wc_get_order( $order_id );
			$orders[] = array(
				'id'       => $order->get_id(),
				'date'     => $order->get_date_created()->format( 'Y-m-d' ),
				'total'    => $order->get_total(),
				'status'   => $order->get_status(),
				'customer' => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
				'items'    => $this->get_order_items( $order ),
			);
		}
		return $orders;
	}

	public function get_order_items( $order ) {
		$items = array();
		foreach ( $order->get_items() as $item_id => $item ) {
			$items[] = array(
				'id'       => $item_id,
				'name'     => $item->get_name(),
				'quantity' => $item->get_quantity(),
				'subtotal' => $item->get_subtotal(),
				'total'    => $item->get_total(),
			);
		}
		return $items;
	}
}
