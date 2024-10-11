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
		add_filter( 'woocommerce_my_account_my_orders_actions', array( $this, 'order_actions' ), 10, 2 );
		add_action( 'init', array( $this, 'custom_endpoints' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'account_menu_items' ) );
		add_action( 'woocommerce_account_pending-orders_endpoint', array( $this, 'pending_orders_content' ) );
		add_filter( 'woocommerce_get_endpoint_url', array( $this, 'modify_endpoint_url' ), 10, 4 );
		add_filter( 'nova_user_pending_payments_orders', array( $this, 'pending_orders' ), 10, 2 );
		add_action( 'template_redirect', array( $this, 'handle_pay_multiple_orders_submission' ) );
	}

	public function handle_pay_multiple_orders_submission() {
		if ( isset( $_POST['pay_multiple_orders_submit'] ) ) {
			if ( ! isset( $_POST['pay_multiple_orders_nonce'] ) || ! wp_verify_nonce( $_POST['pay_multiple_orders_nonce'], 'nova_orders_nonce' ) ) {
				wc_add_notice( __( 'Security check failed.', 'nova-b2b' ), 'error' );
				return;
			}

			if ( empty( $_POST['order_ids'] ) ) {
				wc_add_notice( __( 'No orders selected.', 'nova-b2b' ), 'error' );
				return;
			}

			$order_ids     = array_map( 'absint', $_POST['order_ids'] );
			$total_amount  = 0;
			$orders_to_pay = array();

			$current_user_id = get_current_user_id();

			foreach ( $order_ids as $order_id ) {
				$order = wc_get_order( $order_id );

				if ( $order && $order->get_customer_id() === $current_user_id && in_array( $order->get_status(), array( 'pending', 'on-hold' ), true ) ) {
					$total_amount   += $order->get_total();
					$orders_to_pay[] = $order;
				}
			}

			if ( $total_amount > 0 && ! empty( $orders_to_pay ) ) {
				// Proceed to payment
				$this->create_combined_order_and_redirect( $orders_to_pay, $total_amount );
			} else {
				wc_add_notice( __( 'Unable to process the selected orders.', 'nova-b2b' ), 'error' );
			}
		}
	}

	public function create_combined_order_and_redirect( $orders_to_pay, $total_amount_order ) {
		$current_user_id = get_current_user_id();
		$total_amount    = 0;

		// Collect order IDs
		$original_order_ids = array();

		// Create a new order
		$combined_order = wc_create_order();

		// Set customer
		$combined_order->set_customer_id( $current_user_id );

		// Loop through each original order
		foreach ( $orders_to_pay as $order ) {
			$order_id             = $order->get_id();
			$original_order_ids[] = $order_id;

			$currency = $order->get_currency();

			// Get the order total
			$order_total   = $order->get_total();
			$total_amount += $order_total;

			// Create a new order item for this order
			$item = new \WC_Order_Item_Product();

			// Set the item name to the order ID
			$item->set_name( 'Order #' . $order->get_order_number() );

			// Set quantity to 1
			$item->set_quantity( 1 );

			// Set total and subtotal
			$item->set_total( $order_total );
			$item->set_subtotal( $order_total );

			// Add the item to the combined order
			$combined_order->add_item( $item );
		}

		$combined_order->set_currency( $currency );

		// Add meta data to link original orders
		$combined_order->update_meta_data( '_original_order_ids', $original_order_ids );

		// Mark the order as temporary
		$combined_order->update_meta_data( '_is_temporary_combined_order', true );

		$combined_order->add_order_note( __( 'This order is a combined payment for multiple orders.', 'nova-2' ) );

		// Set the order as virtual (no shipping)
		$combined_order->set_shipping_total( 0 );
		$combined_order->set_shipping_tax( 0 );
		$combined_order->set_cart_tax( 0 );
		$combined_order->set_total( $total_amount );

		// Set status to pending payment
		$combined_order->set_status( 'pending' );

		// Save the order
		$combined_order->save();

		// Redirect to payment page
		wp_safe_redirect( $combined_order->get_checkout_payment_url() );
		exit;
	}


	public function modify_endpoint_url( $url, $endpoint, $value, $permalink ) {
		if ( $endpoint === 'pending-orders' ) {
			// Modify the URL as needed
			// For example, change 'pending-orders' to 'orders/pending'
			$url = wc_get_account_endpoint_url( 'orders/pending' );
		}
		return $url;
	}

	public function custom_pending_orders_content() {
		wc_get_template( 'myaccount/pending-orders.php' );
	}

	public function account_menu_items( $items ) {
		$new_items = array();

		foreach ( $items as $key => $title ) {
			$new_items[ $key ] = $title;

			if ( 'orders' === $key ) {
				$new_items['pending_orders'] = __( 'Pending Payment Orders', 'nova-b2b' );
			}
		}

		return $new_items;
	}

	public function custom_endpoints() {
		add_rewrite_endpoint( 'pending', EP_ROOT | EP_PAGES );
	}

	public function order_actions( $actions, $order ) {
		$from_order_id    = $order->get_meta( '_from_order_id' );
		$payment_order_id = $order->get_meta( '_adjusted_duplicate_order_id' );
		if ( $from_order_id ) {
			unset( $actions['cancel'] );
		}

		if ( $payment_order_id ) {
			$payment_order = wc_get_order( $payment_order_id );
			if ( $payment_order->get_status() == 'pending' ) {
				$actions['pay'] = array(
					'url'  => $payment_order->get_checkout_payment_url(),
					'name' => __( 'Pay', 'woocommerce' ),
				);
			}
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
				'ajax_url'               => admin_url( 'admin-ajax.php' ),
				'orders'                 => $this->get_orders(),
				'has_payment_types'      => $this->has_payment_types(),
				'pending_payment_orders' => $this->get_pending_payments(),
				'nonce'                  => wp_create_nonce( 'nova_orders_nonce' ),
				'customer_id'            => isset( $_GET['customer_id'] ) ? absint( $_GET['customer_id'] ) : get_current_user_id(),
			)
		);

		// enqueue the script when on my-account/orders
		if ( is_account_page() && is_wc_endpoint_url( 'orders' ) || ( isset( $_GET['order_status'] ) && 'pending' === $_GET['order_status'] ) ) {
			wp_enqueue_script( 'nova-orders' );
			wp_enqueue_style( 'nova-orders', get_stylesheet_directory_uri() . '/statements/build/output.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		}
	}

	public function has_payment_types() {
		$current_user_id = isset( $_GET['customer_id'] ) && current_user_can( 'administrator' ) ? absint( $_GET['customer_id'] ) : get_current_user_id();

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

		$current_user_id = isset( $_GET['customer_id'] ) ? absint( $_GET['customer_id'] ) : get_current_user_id();

		$args = array(
			'customer_id'  => $current_user_id,
			'limit'        => -1, // Get all orders
			'orderby'      => 'date',
			'order'        => 'DESC',
			'meta_key'     => '_hide_order',
			'meta_compare' => 'NOT EXISTS',
			'status'       => array( 'wc-pending', 'wc-processing', 'wc-on-hold', 'wc-completed' ),
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

			$payment_order_object = null;

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
				'id'                   => $order->get_id(),
				'order_number'         => $order->get_order_number(),
				'po_number'            => $order->get_meta( '_po_number' ),
				'order_url'            => $order->get_view_order_url(),
				'date'                 => $order->get_date_created()->format( 'M d, Y' ),
				'total'                => $total_with_currency,
				'status'               => $order->get_status(),
				'actions'              => $actions,
				'order_total'          => $order_total,
				'due_date'             => $due_date,
				'is_overdue'           => $is_overdue,
				'payment_order_status' => isset( $payment_order_object ) ? $payment_order_object->get_status() : '',
			);

		}
		return $orders;
	}

	public function get_pending_payments() {
		if ( ! is_user_logged_in() ) {
			return array();
		}

		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';

		$orders = array();

		$query = $wpdb->prepare(
			"SELECT * FROM {$table_name}
        WHERE payment_status != %s
        ORDER BY 'id' ASC",
			'Completed'
		);

		// Fetch data from the custom table
		$results = $wpdb->get_results( $query, ARRAY_A );

		$current_user_id = isset( $_GET['customer_id'] ) ? absint( $_GET['customer_id'] ) : get_current_user_id();
		$order_ids       = array();
		if ( ! empty( $results ) ) {
			foreach ( $results as $row ) {
				$order = wc_get_order( $row['payment_order'] );
				if ( $current_user_id == $order->get_user_id() ) {
					$order_ids[] = $row['payment_order'];
				}
			}
		}

		foreach ( $order_ids as $order_id ) {
			$order = wc_get_order( $order_id );

			// Ensure we have a valid order object
			if ( ! $order ) {
				continue;
			}

			$actions = wc_get_account_orders_actions( $order );

			$total_with_currency = wc_price( $order->get_total(), array( 'currency' => $order->get_currency() ) );

			$order_total = $order->get_total();

			$payment_order_object = null;

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

			$payment_select = $order->get_meta( '_payment_select' );

			$payment_select_title = get_the_title( $payment_select );

			$orders[] = array(
				'id'                   => $order->get_id(),
				'order_number'         => $order->get_order_number(),
				'po_number'            => $order->get_meta( '_po_number' ),
				'order_url'            => $order->get_view_order_url(),
				'date'                 => $order->get_date_created()->format( 'M d, Y' ),
				'total'                => $total_with_currency,
				'status'               => $order->get_status(),
				'actions'              => $actions,
				'order_total'          => $order_total,
				'due_date'             => $due_date,
				'is_overdue'           => $is_overdue,
				'payment_order_status' => isset( $payment_order_object ) ? $payment_order_object->get_status() : '',
				'payment_select'       => $payment_select_title,
			);

		}
		return apply_filters( 'nova_user_pending_payments_orders', $orders, $current_user_id );
	}

	public function pending_orders( $orders, $current_user ) {
		global $wpdb;
		$pending_payments = array();

		$table_name = $wpdb->prefix . 'order_payments';

		// Get all data from the table
		$results = $wpdb->get_results(
			$wpdb->prepare( "SELECT * FROM $table_name" )
		);

		foreach ( $results as $result ) {

			$order_id      = $result->order_id;
			$order         = wc_get_order( $order_id );
			$time_diff     = '';
			$due_date      = '';
			$needs_payment = $order->get_meta( 'needs_payment' );

			if ( ! $order ) {
				continue;
			}

			if ( $order->get_status() === 'completed' ) {
				continue;
			}

			if ( $current_user != $order->get_user_id() ) {
				continue;
			}

			if ( $order->get_status() !== 'pending' ) {
				continue;
			}

			if ( ! $needs_payment ) {
				continue;
			}

			$deposit_chosen = $order->get_meta( '_deposit_chosen' );

			$days = get_field( 'days_after_shipping', $deposit_chosen );

			$payment_date = $result->payment_date;

			$shipped_date = $order->get_meta( 'shipped_date' );

			// ** due date is $shipped_date + $days */
			if ( $shipped_date ) {
				$due_date  = date( 'Y-m-d', strtotime( '+' . $days . ' days', strtotime( $shipped_date ) ) );
				$time_diff = human_time_diff( current_time( 'timestamp' ), strtotime( $due_date ) );
				$ago       = strtotime( $due_date ) < current_time( 'timestamp' );
			}

			$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );

			$delivered_date = $order->get_meta( 'delivered_date' );

			if ( $manual_delivered_date ) {
				$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );
				if ( $date_obj ) {
					$delivered_date = $date_obj->format( 'F d, Y' );
				}
			}

			$total = $order->get_total();

			$is_overdue = false;

			// If order is pending and is overdue
			if ( $order->get_meta( 'is_overdue' ) && $order->get_status() == 'pending' ) {
				$is_overdue = true;
			}

			$actions = wc_get_account_orders_actions( $order );

			$deposit_chosen = $order->get_meta( '_deposit_chosen' );

			$payment_select_title = get_the_title( $deposit_chosen );

			$pending_payments[] = array(
				'id'                   => $order->get_id(),
				'order_number'         => $order->get_order_number(),
				'po_number'            => $order->get_meta( '_po_number' ),
				'order_url'            => $order->get_view_order_url(),
				'date'                 => $order->get_date_created()->format( 'M d, Y' ),
				'total'                => wc_price( $total, array( 'currency' => $order->get_currency() ) ),
				'status'               => $order->get_status(),
				'actions'              => $actions,
				'order_total'          => $total,
				'due_date'             => $due_date,
				'is_overdue'           => $is_overdue,
				'payment_order_status' => isset( $payment_order_object ) ? $payment_order_object->get_status() : '',
				'payment_select'       => $payment_select_title,
			);

		}

		/* merge the two arrays */
		$orders = array_merge( $orders, $pending_payments );

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
