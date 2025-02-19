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
		add_filter( 'nova_account_title_filter', array( $this, 'pending_order_title' ) );
		add_action( 'woocommerce_thankyou', array( $this, 'delete_temporary_products_on_order_complete' ), 99, 1 );
		add_action( 'woocommerce_order_status_cancelled', array( $this, 'delete_temporary_products_on_order_complete' ), 10, 1 );
		add_action( 'woocommerce_order_status_failed', array( $this, 'delete_temporary_products_on_order_complete' ), 10, 1 );
		add_filter( 'woocommerce_email_enabled_customer_completed_order', array( $this, 'disable_completed_email_for_combined_order' ), 11, 2 );
		add_action( 'init', array( $this, 'schedule_temporary_orders_cleanup_event' ) );
		add_action( 'delete_temporary_orders_daily_event', array( $this, 'delete_old_temporary_orders' ) );


		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'combined_completed_subject' ), 50, 2 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'combined_completed_heading' ), 42, 3 );

		add_filter( 'woocommerce_bacs_email_instructions', array( $this, 'combined_order_bacs_instruction' ), 20, 4 );

	}

	public function combined_order_bacs_instruction( $instructions, $order, $sent_to_admin, $plain_text ) {
		$order_id = $order->get_id();
		$original_order_ids = get_post_meta( $order_id, '_original_order_ids', true );

		if ( ! $original_order_ids ) {
			return $instructions;
		}

		return '';
	}

	public function combined_completed_heading( $heading, $order, $email ) {
		$order_id = $order->get_id();
		$original_order_ids = get_post_meta( $order_id, '_original_order_ids', true );

		if ( ! $original_order_ids ) {
			return $heading;
		}

		$heading = "Thank you for your payment";

		return $heading;
	}

	public function combined_completed_subject( $subject, $order ) {
		$order_id = $order->get_id();
		$original_order_ids = get_post_meta( $order_id, '_original_order_ids', true );

		if ( ! $original_order_ids ) {
			return $subject;
		}

		$subject = 'Payment received.';

		return $subject;
	}

	public function delete_old_temporary_orders() {
		// Define the time threshold (1 day ago)
		$time_threshold = strtotime( '-1 day' );

		// Query arguments to get temporary combined orders older than 1 day
		$args = array(
			'type' => 'shop_order',
			'status' => array( 'pending', 'failed', 'cancelled' ), // Include relevant statuses
			'meta_key' => '_is_temporary_combined_order',
			'meta_value' => '1',
			'date_created' => '<' . date( 'Y-m-d H:i:s', $time_threshold ),
			'limit' => -1,
			'return' => 'ids',
		);

		$orders = wc_get_orders( $args );

		if ( ! empty( $orders ) ) {
			foreach ( $orders as $order_id ) {
				// Optionally, delete associated temporary products
				$this->delete_temporary_products_from_order( $order_id );

				// Delete the order permanently
				wp_delete_post( $order_id, true );
			}
		}
	}

	public function delete_temporary_products_from_order( $order_id ) {
		$order = wc_get_order( $order_id );

		if ( $order ) {
			// Get the product IDs
			$created_product_ids = $order->get_meta( '_created_product_ids' );

			if ( is_array( $created_product_ids ) ) {
				foreach ( $created_product_ids as $product_id ) {
					// Delete the product
					wp_delete_post( $product_id, true );
				}
			}
		}
	}

	public function schedule_temporary_orders_cleanup_event() {
		if ( ! wp_next_scheduled( 'delete_temporary_orders_daily_event' ) ) {
			wp_schedule_event( time(), 'daily', 'delete_temporary_orders_daily_event' );
		}
	}

	public function disable_completed_email_for_combined_order( $enabled, $order ) {
		if ( $order && $order->get_meta( '_is_temporary_combined_order' ) ) {
			// return false;
		}
		if ( $order && $order->get_meta( '_completed_by_combined' ) ) {
			return false;
		}
		return $enabled;
	}

	public function pending_order_title( $title ) {
		if ( isset( $_GET['order_status'] ) && 'pending' === $_GET['order_status'] ) {
			return 'Pending Payment Orders';
		}
		return $title;
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

			$order_ids = array_map( 'absint', $_POST['order_ids'] );
			$total_amount = 0;
			$orders_to_pay = array();
			$currency = null; // Initialize currency variable

			$current_user_id = get_current_user_id();

			foreach ( $order_ids as $order_id ) {
				$order = wc_get_order( $order_id );

				if ( $order && $order->get_customer_id() === $current_user_id && in_array( $order->get_status(), array( 'pending', 'on-hold' ), true ) ) {
					// Get the currency of the order
					$order_currency = $order->get_currency();

					if ( is_null( $currency ) ) {
						// Set the currency if not set yet
						$currency = $order_currency;
					} elseif ( $currency !== $order_currency ) {
						// If currencies don't match, display error and exit
						wc_add_notice( __( 'Selected orders have different currencies and cannot be combined.', 'nova-b2b' ), 'error' );
						return;
					}

					$total_amount += $order->get_total();
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

	public function delete_temporary_products_on_order_complete( $order_id ) {
		$order = wc_get_order( $order_id );

		if ( $order ) {
			// Check if this is a combined order
			$is_temporary_combined_order = $order->get_meta( '_is_temporary_combined_order' );

			if ( $is_temporary_combined_order ) {
				// Get the product IDs
				$created_product_ids = $order->get_meta( '_created_product_ids' );

				if ( is_array( $created_product_ids ) ) {
					foreach ( $created_product_ids as $product_id ) {
						// Delete the product
						wp_delete_post( $product_id, true );
					}
				}
			}
		}
	}


	public function create_combined_order_and_redirect( $orders_to_pay, $total_amount_order ) {
		$current_user_id = get_current_user_id();
		$total_amount = 0;

		// Collect order IDs
		$original_order_ids = array();

		// Create a new order
		$combined_order = wc_create_order();

		// Set customer
		$combined_order->set_customer_id( $current_user_id );

		// Get billing and shipping details from the first order
		$first_order = reset( $orders_to_pay );

		if ( $first_order ) {
			// Set billing details
			$combined_order->set_billing_first_name( $first_order->get_billing_first_name() );
			$combined_order->set_billing_last_name( $first_order->get_billing_last_name() );
			$combined_order->set_billing_company( $first_order->get_billing_company() );
			$combined_order->set_billing_address_1( $first_order->get_billing_address_1() );
			$combined_order->set_billing_address_2( $first_order->get_billing_address_2() );
			$combined_order->set_billing_city( $first_order->get_billing_city() );
			$combined_order->set_billing_state( $first_order->get_billing_state() );
			$combined_order->set_billing_postcode( $first_order->get_billing_postcode() );
			$combined_order->set_billing_country( $first_order->get_billing_country() );
			$combined_order->set_billing_email( $first_order->get_billing_email() );
			$combined_order->set_billing_phone( $first_order->get_billing_phone() );
		}

		// Loop through each original order
		foreach ( $orders_to_pay as $order ) {
			$order_id = $order->get_id();
			$original_order_ids[] = $order_id;

			$currency = $order->get_currency();

			// Get the order total
			$order_total = $order->get_total();
			$total_amount += $order_total;

			// Create a new private product for this order
			$product = new \WC_Product_Simple();

			// Set product details
			$product->set_name( 'Order #' . $order->get_order_number() );
			$product->set_price( $order_total );
			$product->set_regular_price( $order_total );
			$product->set_status( 'private' );
			$product->set_catalog_visibility( 'hidden' );
			$product->set_sold_individually( true );
			$product->save();

			// Store the product ID for cleanup later (optional)
			$created_product_ids[] = $product->get_id();

			// Create a new order item using the product
			$item = new \WC_Order_Item_Product();
			$item->set_product( $product );
			$item->set_quantity( 1 );
			$item->set_subtotal( $order_total );
			$item->set_total( $order_total );

			// Add the item to the combined order
			$combined_order->add_item( $item );
		}

		$combined_order->set_currency( $currency );

		// Add meta data to link original orders and created products
		$combined_order->update_meta_data( '_original_order_ids', $original_order_ids );
		$combined_order->update_meta_data( '_created_product_ids', $created_product_ids ); // For cleanup

		// Mark the order as temporary
		$combined_order->update_meta_data( '_is_temporary_combined_order', true );
		$combined_order->update_meta_data( '_ga_tracked', true );

		$combined_order->add_order_note( __( 'This order is a combined payment for multiple orders.', 'nova-b2b' ) );

		// Set the order totals
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
		$from_order_id = $order->get_meta( '_from_order_id' );
		$payment_order_id = $order->get_meta( '_adjusted_duplicate_order_id' );
		if ( $from_order_id ) {
			unset( $actions['cancel'] );
		}

		if ( $payment_order_id ) {
			$payment_order = wc_get_order( $payment_order_id );
			if ( $payment_order->get_status() == 'pending' ) {
				$actions['pay'] = array(
					'url' => $payment_order->get_checkout_payment_url(),
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
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'orders' => $this->get_orders(),
				'has_payment_types' => $this->has_payment_types(),
				'pending_payment_orders' => $this->get_pending_payments(),
				'nonce' => wp_create_nonce( 'nova_orders_nonce' ),
				'customer_id' => isset( $_GET['customer_id'] ) ? absint( $_GET['customer_id'] ) : get_current_user_id(),
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
			'customer_id' => $current_user_id,
			'limit' => -1, // Get all orders
			'orderby' => 'date',
			'order' => 'DESC',
			'meta_key' => '_hide_order',
			'meta_compare' => 'NOT EXISTS',
			'status' => array( 'wc-pending', 'wc-processing', 'wc-on-hold', 'wc-completed' ),
		);

		$order_ids = wc_get_orders( $args );

		// check if the order is overdue to due_date
		$current_time = time();

		$orders = array();
		foreach ( $order_ids as $order_id ) {
			$order = wc_get_order( $order_id );

			// Ensure we have a valid order object
			if ( ! $order ) {
				continue;
			}

			$combined_order = $order->get_meta( '_original_order_ids' );

			if ( $combined_order ) {
				continue;
			}

			$actions = wc_get_account_orders_actions( $order );

			$total_with_currency = wc_price( $order->get_total(), array( 'currency' => $order->get_currency() ) );

			$order_total = $order->get_total();

			$payment_order_object = null;

			if ( $order->get_meta( '_adjusted_duplicate_order_id' ) ) {
				$payment_order = $order->get_meta( '_adjusted_duplicate_order_id' );
				$payment_order_object = wc_get_order( $payment_order );

				// Ensure we have a valid payment order object
				if ( $payment_order_object ) {
					$total_with_currency = $payment_order_object->get_formatted_order_total();
					$order_total = $payment_order_object->get_total();
				}
			}

			$is_overdue = false;

			// If order is pending and is overdue
			if ( $order->get_meta( 'is_overdue' ) && $order->get_status() == 'pending' ) {
				$is_overdue = true;
			}

			$due_date = false;
			$deadline = false;
			$delivered_date = false;

			$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );
			if ( $manual_delivered_date ) {
				$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );
				if ( $date_obj ) {
					$delivered_date = $date_obj->format( 'F d, Y' );
				}
			}

			// If order is payment, get due date
			if ( $order->get_meta( '_from_order_id' ) ) {
				$from_order_id = $order->get_meta( '_from_order_id' );
				$from_order = wc_get_order( $from_order_id );

				// Ensure we have a valid from order object
				if ( $from_order ) {
					$completed_date_obj = $from_order->get_date_completed();

					// Check if the completed date is valid
					if ( $completed_date_obj ) {
						$shipped_date = $completed_date_obj->date( 'F d, Y' );
						$payment_type = $from_order->get_meta( '_payment_select' );
						$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
						$deadline = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
						$due_date = date( 'M d, Y', $deadline );

						if ( $current_time > $deadline ) {
							if ( $order->get_status() == 'pending' ) {
								$is_overdue = true;
								if ( ! $order->get_meta( '_is_overdue' ) ) {
									update_post_meta( $order->get_id(), '_is_overdue', true );
								}
							}
						} elseif ( $order->get_meta( '_is_overdue' ) ) {
							update_post_meta( $order->get_id(), '_is_overdue', true );
						}
					}
				}
			}

			$deposit_chosen = $order->get_meta( '_deposit_chosen' );

			if ( $deposit_chosen ) {

				$shipped_date = $delivered_date ? $delivered_date : $order->get_meta( 'shipped_date' );

				$days_after_shipping = get_field( 'days_after_shipping', $deposit_chosen );

				if ( $shipped_date ) {
					$deadline = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
					$due_date = date( 'M d, Y', $deadline );
					if ( $current_time > $deadline ) {
						if ( ! $order->has_status( array( 'completed', 'on-hold', 'trash' ) ) ) {
							$is_overdue = true;
							if ( ! $order->get_meta( '_is_overdue' ) ) {
								update_post_meta( $order->get_id(), '_is_overdue', true );
							}
						}
					} elseif ( $order->get_meta( '_is_overdue' ) ) {
						update_post_meta( $order->get_id(), '_is_overdue', true );
					}
				}
			}

			$orders[] = array(
				'id' => $order->get_id(),
				'order_number' => $order->get_order_number(),
				'po_number' => $order->get_meta( '_po_number' ),
				'order_url' => $order->get_view_order_url(),
				'date' => $order->get_date_created()->format( 'M d, Y' ),
				'total' => $total_with_currency,
				'status' => $order->get_status(),
				'actions' => $actions,
				'deadline' => $deadline,
				'order_total' => $order_total,
				'due_date' => $due_date,
				'is_overdue' => $is_overdue,
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
		$order_ids = array();
		if ( ! empty( $results ) ) {
			foreach ( $results as $row ) {
				$order = wc_get_order( $row['payment_order'] );

				if ( ! $order ) {
					continue;
				}

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

			if ( 'completed' === $order->get_status() || 'trash' === $order->get_status() ) {
				continue;
			}

			$combined_order = $order->get_meta( '_original_order_ids' );

			if ( $combined_order ) {
				continue;
			}

			$actions = wc_get_account_orders_actions( $order );

			$total_with_currency = wc_price( $order->get_total(), array( 'currency' => $order->get_currency() ) );

			$order_total = $order->get_total();

			$payment_order_object = null;

			if ( $order->get_meta( '_adjusted_duplicate_order_id' ) ) {
				$payment_order = $order->get_meta( '_adjusted_duplicate_order_id' );
				$payment_order_object = wc_get_order( $payment_order );

				// Ensure we have a valid payment order object
				if ( $payment_order_object ) {
					$total_with_currency = $payment_order_object->get_formatted_order_total();
					$order_total = $payment_order_object->get_total();
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
				$from_order = wc_get_order( $from_order_id );

				// Ensure we have a valid from order object
				if ( $from_order ) {
					$completed_date_obj = $from_order->get_date_completed();

					// Check if the completed date is valid
					if ( $completed_date_obj ) {
						$shipped_date = $completed_date_obj->date( 'F d, Y' );
						$payment_type = $from_order->get_meta( '_payment_select' );
						$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
						$deadline = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
						$due_date = date( 'M d, Y', $deadline );
					}
				}
			}

			$payment_select = $order->get_meta( '_payment_select' );

			$payment_select_title = get_the_title( $payment_select );

			$orders[] = array(
				'id' => $order->get_id(),
				'order_number' => $order->get_order_number(),
				'po_number' => $order->get_meta( '_po_number' ),
				'order_url' => $order->get_view_order_url(),
				'date' => $order->get_date_created()->format( 'M d, Y' ),
				'total' => $total_with_currency,
				'status' => $order->get_status(),
				'actions' => $actions,
				'order_total' => $order_total,
				'due_date' => $due_date,
				'is_overdue' => $is_overdue,
				'payment_order_status' => isset( $payment_order_object ) ? $payment_order_object->get_status() : '',
				'payment_select' => $payment_select_title,
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
			"SELECT * FROM $table_name"
		);

		foreach ( $results as $result ) {

			$order_id = $result->order_id;
			$order = wc_get_order( $order_id );
			$time_diff = '';
			$due_date = '';

			if ( ! $order ) {
				continue;
			}

			$needs_payment = $order->get_meta( 'needs_payment' );

			if ( ! $order->has_status( array( 'pending', 'processing' ) ) ) {
				continue;
			}

			if ( $current_user != $order->get_user_id() ) {
				continue;
			}

			if ( ! $needs_payment ) {
				continue;
			}
			$is_overdue = false;
			$due_date = false;
			$deadline = false;
			$delivered_date = false;

			$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );
			if ( $manual_delivered_date ) {
				$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );
				if ( $date_obj ) {
					$delivered_date = $date_obj->format( 'F d, Y' );
				}
			}

			$deposit_chosen = $order->get_meta( '_deposit_chosen' );

			if ( $deposit_chosen ) {

				$shipped_date = $delivered_date ? $delivered_date : $order->get_meta( 'shipped_date' );

				$days_after_shipping = get_field( 'days_after_shipping', $deposit_chosen );

				$current_time = time();

				if ( $shipped_date ) {
					$deadline = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
					$due_date = date( 'M d, Y', $deadline );
					if ( $current_time > $deadline ) {
						if ( ! $order->has_status( array( 'completed', 'on-hold', 'trash' ) ) ) {
							$is_overdue = true;
						}
					}
				}
			}



			$total = $order->get_total();

			$is_overdue = false;

			// If order is pending and is overdue
			if ( $order->get_meta( 'is_overdue' ) && $order->get_status() === 'pending' ) {
				$is_overdue = true;
			}

			$actions = wc_get_account_orders_actions( $order );


			$payment_select_title = get_the_title( $deposit_chosen );

			$pending_payments[] = array(
				'id' => $order->get_id(),
				'order_number' => $order->get_order_number(),
				'po_number' => $order->get_meta( '_po_number' ),
				'order_url' => $order->get_view_order_url(),
				'date' => $order->get_date_created()->format( 'M d, Y' ),
				'total' => wc_price( $total, array( 'currency' => $order->get_currency() ) ),
				'status' => $order->get_status(),
				'actions' => $actions,
				'order_total' => $total,
				'due_date' => $due_date ? date( 'F d, Y', strtotime( $due_date ) ) : '',
				'is_overdue' => $is_overdue,
				'payment_order_status' => isset( $payment_order_object ) ? $payment_order_object->get_status() : '',
				'payment_select' => $payment_select_title,
			);

		}

		/* merge the two arrays */
		return array_merge( $orders, $pending_payments );
	}

	public function get_order_items( $order ) {
		$items = array();
		foreach ( $order->get_items() as $item_id => $item ) {
			$items[] = array(
				'id' => $item_id,
				'name' => $item->get_name(),
				'quantity' => $item->get_quantity(),
				'subtotal' => $item->get_subtotal(),
				'total' => $item->get_total(),
			);
		}
		return $items;
	}
}