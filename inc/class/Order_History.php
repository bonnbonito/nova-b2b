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
		add_filter( 'woocommerce_my_account_my_orders_actions', array( $this, 'remove_cancel_if_payment_order' ), 10, 2 );
	}

	public function remove_cancel_if_payment_order( $actions, $order ) {
		$from_order_id = $order->get_meta( '_from_order_id' );
		if ( $from_order_id ) {
			unset( $actions['cancel'] );
		}
		return $actions;
	}

	public function enqueue_scripts() {
		wp_register_script(
			'nova-orders',
			get_theme_file_uri( '/statements/build/index.js' ),
			array( 'wp-element' ),
			wp_get_theme()->get( 'Version' ),
			true
		);

		wp_register_style( 'nova-orders', get_stylesheet_directory_uri() . '/statements/build/index.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );

		wp_localize_script(
			'nova-orders',
			'NovaOrders',
			array(
				'ajax_url'          => admin_url( 'admin-ajax.php' ),
				'orders'            => $this->get_orders(),
				'has_payment_types' => $this->has_payment_types(),
			)
		);

		// enqueue the script when on my-account/orders
		if ( is_account_page() && is_wc_endpoint_url( 'orders' ) ) {
			wp_enqueue_script( 'nova-orders' );
			wp_enqueue_style( 'nova-orders', get_stylesheet_directory_uri() . '/statements/build/output.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		}
	}

	public function has_payment_types() {
		$current_user_id = get_current_user_id();

		return get_field( 'payment_type', 'user_' . $current_user_id );
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
			'customer_id'  => $current_user_id,
			'limit'        => -1, // Get all orders
			'orderby'      => 'date',
			'order'        => 'DESC',
			'meta_key'     => '_hide_order',
			'meta_compare' => 'NOT EXISTS',
		);

		$order_ids = wc_get_orders( $args );

		$orders = array();
		foreach ( $order_ids as $order_id ) {
			$order = wc_get_order( $order_id );

			// Ensure we have a valid order object
			if ( ! $order ) {
				continue;
			}

			$actions = wc_get_account_orders_actions( $order );

			$total_with_currency = wc_price( $order->get_total(), array( 'currency' => $order->get_currency() ) );

			$order_total = $order->get_total();

			if ( $order->get_meta( '_adjusted_duplicate_order_id' ) ) {
				$payment_order        = $order->get_meta( '_adjusted_duplicate_order_id' );
				$payment_order_object = wc_get_order( $payment_order );

				// Ensure we have a valid payment order object
				if ( $payment_order_object ) {
					$total_with_currency = $payment_order_object->get_formatted_order_total();
					$order_total         = $payment_order_object->get_total();
				}
			}

			$is_overdue = false;

			// If order is pending and is overdue
			if ( $order->get_meta( 'is_overdue' ) && $order->get_status() == 'pending' ) {
				$is_overdue = true;
			}

			$due_date = false;

			// If order is payment, get due date
			if ( $order->get_meta( '_from_order_id' ) ) {
				$from_order_id = $order->get_meta( '_from_order_id' );
				$from_order    = wc_get_order( $from_order_id );

				// Ensure we have a valid from order object
				if ( $from_order ) {
					$completed_date_obj = $from_order->get_date_completed();

					// Check if the completed date is valid
					if ( $completed_date_obj ) {
						$shipped_date        = $completed_date_obj->date( 'F d, Y' );
						$payment_type        = $from_order->get_meta( '_payment_select' );
						$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
						$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
						$due_date            = date( 'M d, Y', $deadline );
					}
				}
			}

			$orders[] = array(
				'id'           => $order->get_id(),
				'order_number' => $order->get_order_number(),
				'order_url'    => $order->get_view_order_url(),
				'date'         => $order->get_date_created()->format( 'M d, Y' ),
				'total'        => $total_with_currency,
				'status'       => $order->get_status(),
				'actions'      => $actions,
				'order_total'  => $order_total,
				'due_date'     => $due_date,
				'is_overdue'   => $is_overdue,
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
