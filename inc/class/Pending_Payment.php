<?php
namespace NOVA_B2B;

require_once ABSPATH . 'wp-admin/includes/upgrade.php';

use WC;
use WC_DateTime;
use DateTime;
use DateInterval;

class Pending_Payment {
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
		add_action( 'after_setup_theme', array( $this, 'create_custom_table' ) );
		add_action( 'woocommerce_order_status_completed', array( $this, 'insert_pending_payment' ) );
		add_action( 'woocommerce_order_status_completed', array( $this, 'change_pending_status' ) );
		add_action( 'woocommerce_order_status_completed', array( $this, 'update_user_meta_overdue_orders' ) );
		// add_action( 'woocommerce_order_status_completed', array( $this, 'test_note' ) );
		add_action( 'admin_menu', array( $this, 'add_pending_payments_submenu_page' ) );
		add_action( 'admin_post_nopriv_delete_pending_payment', array( $this, 'handle_delete_order' ) );
		add_action( 'admin_post_delete_pending_payment', array( $this, 'handle_delete_order' ) );
		add_action( 'wp', array( $this, 'schedule_pending_payment_checker' ) );
		add_action( 'check_pending_payments_action_hook', array( $this, 'check_pending_payments' ) );
		add_action( 'admin_post_send_payment_reminder', array( $this, 'handle_send_reminder' ) );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'pending_payment_order_email_content' ), 999, 5 );
		add_action( 'woocommerce_payment_complete', array( $this, 'custom_order_complete' ), 99, 1 );
		add_action( 'pre_get_posts', array( $this, 'hide_specific_orders' ) );
		add_filter( 'woocommerce_my_account_my_orders_query', array( $this, 'filter_my_account_orders_query' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_custom_meta_box_to_orders' ) );
		add_filter( 'woocommerce_order_number', array( $this, 'pending_payment_order_number' ), 12, 2 );
		add_filter( 'gettext', array( $this, 'pay_for_order_notice' ), 10, 3 );
		add_action( 'woocommerce_order_status_completed', array( $this, 'admin_notification_paid_full' ) );
		add_action( 'woocommerce_before_checkout_form', array( $this, 'redirect_if_overdue_orders' ), 10, 1 );
		add_shortcode( 'nova_pending_payment_orders', array( $this, 'overdue_pending_payment_ouput' ) );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
		add_action( 'add_meta_boxes', array( $this, 'add_is_overdue_metabox' ) );
		add_action( 'save_post_shop_order', array( $this, 'save_is_overdue_metabox' ) );
		add_filter( 'wpo_wcpdf_filename', array( $this, 'filter_filename' ), 99, 5 );
		add_action( 'wpo_wcpdf_after_order_details', array( $this, 'etransfer_instructions' ), 10, 2 );
		add_filter( 'woocommerce_email_enabled_customer_completed_order', array( $this, 'disable_completed_email' ), 10, 2 );
		add_filter( 'woocommerce_order_get_date_completed', array( $this, 'modify_order_completed_date' ), 10, 2 );
		add_filter( 'woocommerce_order_data_store_cpt_get_orders_query', array( $this, 'handle_overdue_query' ), 10, 2 );
		add_action( 'show_user_profile', array( $this, 'overdue_list' ) );
		add_action( 'edit_user_profile', array( $this, 'overdue_list' ) );
	}

	public function overdue_list( $user ) {
		$overdue_orders = get_user_meta( $user->ID, 'overdue_orders', true );
		echo '<h2>Overdue Orders</h2>';

		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';

		$query = $wpdb->prepare( "SELECT * FROM {$table_name} WHERE payment_status = %s", 'Pending' );

		$pending_payments = $wpdb->get_results( $query );

		$overdue_orders = array();

		foreach ( $pending_payments as $pending_payment ) {
			$order    = wc_get_order( $pending_payment->payment_order );
			$original = $pending_payment->original_order;
			$user_id  = $order->get_user_id();
			if ( $user_id == $user->ID ) {
				$today = date( 'F d, Y' );

				echo '<pre>';
				$payment_date = date( 'F d, Y', strtotime( $pending_payment->payment_date ) );
				print_r( $payment_date . ' ' . $pending_payment->payment_order . ' ' . ( strtotime( $today ) > strtotime( $payment_date ) ) );
				echo '</pre>';

				if ( strtotime( $today ) > strtotime( $payment_date ) ) {
					$overdue_orders[] = $pending_payment->payment_order;
					update_post_meta( $pending_payment->payment_order, 'is_overdue', true );
				} else {
					update_post_meta( $pending_payment->payment_order, 'is_overdue', false );
				}
			}
		}

		if ( $overdue_orders ) {
			update_user_meta( $user->ID, 'overdue_orders', implode( ',', $overdue_orders ) );
			echo '<ul>';
			foreach ( $overdue_orders as $overdue_order ) {
				$order = wc_get_order( $overdue_order );
				echo '<li><a href="' . get_edit_post_link( $overdue_order ) . '">' . $order->get_order_number() . '</a></li>';
			}
			echo '</ul>';
		}
	}



	public function modify_order_completed_date( $date_completed, $order ) {
		// Check if the order has a custom field for manual delivered date
		$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );

		if ( ! empty( $manual_delivered_date ) ) {
			// Convert the manual delivered date from d/m/Y to Y-m-d H:i:s format
			$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );

			if ( $date_obj ) {
				// Return the date as a WC_DateTime object in the required format
				return new \WC_DateTime( $date_obj->format( 'Y-m-d H:i:s' ) );
			}
		}

		// Otherwise, return the original completion date
		return $date_completed;
	}

	public function disable_completed_email( $enabled, $order ) {
		$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );

		if ( ! empty( $manual_delivered_date ) ) {
			return false; // Disable the email
		}

		return $enabled; // Keep the default behavior if field is not set
	}

	public function etransfer_instructions( $type, $order ) {
		$payment_method = $order->get_payment_method();
		if ( 'bacs' !== $payment_method ) {
			return;
		}
		ob_start();
		?>
<h3 style="margin-bottom:4pt;">E-transfer Instruction</h3>
<ul style="list-style: disc; margin-left: 5pt; padding-left: 5pt;">
	<li>Log in to your bank’s website or mobile app.</li>
	<li>Go to the “Send Money” or “E-Transfer” section.</li>
	<li>Enter the email: <b>hello@novasignage.com</b></li>
	<li>Specify the amount to send.</li>
	<li>Create a security question if the bank requires one. Please set the answer to: <b>neonsigns</b></li>
	<li>Confirm the details and send the transfer.</li>
	<li>Inform our team via email</li>
</ul>
		<?php
		echo ob_get_clean();
	}

	public function filter_filename( $filename, $type, $order_ids, $context, $args ) {
		$order = wc_get_order( $order_ids[0] );
		if ( ! $order ) {
			return $filename;
		}

		$order_id    = $order->get_order_number();
		$customer_id = $order->get_customer_id();
		$business_id = get_field( 'business_id', 'user_' . $customer_id );

		$filename = $business_id . '-INV-' . $order_id . '.pdf';

		return $filename;
	}

	public function save_is_overdue_metabox( $post_id ) {
		if ( ! isset( $_POST['is_overdue_metabox_nonce'] ) || ! wp_verify_nonce( $_POST['is_overdue_metabox_nonce'], 'save_is_overdue_metabox' ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$is_overdue = isset( $_POST['is_overdue_checkbox'] ) ? 1 : 0;

		update_post_meta( $post_id, 'is_overdue', $is_overdue );
	}

	public function add_is_overdue_metabox() {
		global $post;

		$from_order_id = get_post_meta( $post->ID, '_from_order_id', true );

		if ( ! $from_order_id ) {
			// If it doesn't, don't display the metabox
			return;
		}

		add_meta_box(
			'is_overdue_metabox', // Unique ID
			__( 'Is Overdue', 'woocommerce' ), // Title
			array( $this, 'is_overdue_metabox_callback' ), // Callback
			'shop_order', // Post type
			'side', // Context
			'default' // Priority
		);
	}

	public function is_overdue_metabox_callback( $post ) {

		$from_order_id = get_post_meta( $post->ID, '_from_order_id', true );

		if ( ! $from_order_id ) {
			// If it doesn't, don't display the metabox
			return;
		}

		wp_nonce_field( 'save_is_overdue_metabox', 'is_overdue_metabox_nonce' );

		$is_overdue = get_post_meta( $post->ID, 'is_overdue', true );

		echo '<label for="is_overdue_checkbox">';
		echo '<input type="checkbox" id="is_overdue_checkbox" name="is_overdue_checkbox" value="1" ' . checked( 1, $is_overdue, false ) . ' />';
		echo ' Mark this order as overdue';
		echo '</label>';
	}



	public function pay_for_order_notice( $translated_text, $text, $domain ) {
		// Check if the text to be translated matches the one we want to change
		if ( $domain === 'woocommerce' && $text === 'Please log in to your account below to continue to the payment form.' ) {
			$translated_text = 'Please login to your account to pay for the order. Contact us if you need assistance.';
		}

		return $translated_text;
	}

	public function hide_orders_from_account() {
		$user             = get_current_user_id();
		$hidden_order_ids = array();

		// Define the query arguments to fetch orders
		$args = array(
			'posts_per_page' => -1,
			'post_type'      => 'shop_order',
			'post_status'    => array_keys( wc_get_order_statuses() ),
			'meta_key'       => '_customer_user',
			'meta_value'     => $user,
			'meta_query'     => array(
				'relation' => 'AND',
				array(
					'key'     => '_hide_order',
					'compare' => 'EXISTS',
				),
			),
		);

		// Create a new WP_Query instance with specified arguments
		$query = new \WP_Query( $args );

		// Loop through the posts and collect order IDs
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$hidden_order_ids[] = get_the_ID();
			}
		}

		// Reset post data to ensure global post data isn't corrupted
		wp_reset_postdata();

		return $hidden_order_ids;
	}


	public function filter_my_account_orders_query( $args ) {

		$args['exclude'] = $this->hide_orders_from_account();

		return $args;
	}

	public function pending_payment_order_number( $order_number, $order ) {
		if ( $order ) {
			// Check if the order has the '_from_order_id' meta key and retrieve its value
			$from_order_id = get_post_meta( $order->get_id(), '_from_order_id', true );

			// If '_from_order_id' exists and is not empty, use it as the order number
			if ( ! empty( $from_order_id ) ) {
				$order_number = 'NV' . str_pad( $from_order_id, 5, '0', STR_PAD_LEFT );
			}
		}

		return $order_number;
	}


	public function add_custom_meta_box_to_orders() {
		global $pagenow, $post;

		// Ensure we are on the post edit screen
		if ( 'post.php' !== $pagenow || 'shop_order' !== get_post_type() ) {
			return;
		}

		// Ensure the global $post object is set and retrieve the current order ID
		$order_id = isset( $post->ID ) ? $post->ID : false;

		if ( ! $order_id ) {
			return;
		}

		// Check for the specific post meta
		$_from_order_id = get_post_meta( $order_id, '_from_order_id', true );

		// If the meta value exists, add the meta box
		if ( ! empty( $_from_order_id ) ) {
			add_meta_box(
				'from_order_id',          // Unique ID for the meta box
				__( 'Original Order', 'woocommerce' ), // Title of the meta box
				array( $this, 'from_order_id_content' ), // Callback function to output the content
				'shop_order',                  // Post type
				'advanced',                    // Context (where on the screen)
				'default'                      // Priority
			);
		}
	}

	public function from_order_id_content( $post ) {
		// Output your custom content here. For example:
		$order_id       = get_post_meta( $post->ID, '_from_order_id', true );
		$original_total = get_post_meta( $post->ID, '_original_total', true );
		$order_edit_url = admin_url( 'post.php?post=' . $order_id . '&action=edit' );

		// print_r( get_post_meta( $post->ID ) );

		?>
<a href="<?php echo esc_url( $order_edit_url ); ?>" class="button button-primary">View Order</a>

<p>Original Total: <?php echo $original_total; ?></p>

		<?php
	}

	public function hide_specific_orders( $query ) {
		if ( $query->is_main_query() && $query->get( 'post_type' ) === 'shop_order' ) {
			if ( ! isset( $_GET['_hide_order'] ) ) {
				$meta_query = $query->get( 'meta_query' ) ?: array();

				$meta_query[] = array(
					'key'     => '_hide_order',
					'compare' => 'NOT EXISTS',
				);

				$query->set( 'meta_query', $meta_query );
			}

			if ( isset( $_GET['s'] ) && ! empty( $_GET['s'] ) ) {
				// Sanitize the search query
				$search_query = strtolower( sanitize_text_field( $_GET['s'] ) );

				// Remove #NV0+ strings from the search query
				$search_query = preg_replace( '/^#?nv0*/i', '', $search_query );

				// Convert search query into an integer
				$search_order_id = absint( $search_query );

				// If the search query is a valid number, adjust the search to include +/-1
				if ( $search_order_id ) {
					$query->set( 'search_order_id', $search_order_id );

					// Modify the search query
					add_filter(
						'posts_search',
						function ( $search, $wp_query ) use ( $search_order_id ) {
							global $wpdb;

							// If we're searching by order ID and post type is shop_order
							if ( $wp_query->is_search() && $wp_query->get( 'post_type' ) === 'shop_order' ) {
								// Search for the order ID, the previous ID, and the next ID
								$search = $wpdb->prepare(
									" AND {$wpdb->posts}.ID IN (%d, %d, %d)",
									$search_order_id - 1,
									$search_order_id,
									$search_order_id + 1
								);
							}

							return $search;
						},
						10,
						2
					);
				}
			}
		}
	}



	public function custom_order_complete( $order_id ) {
		$order         = wc_get_order( $order_id );
		$from_order_id = $order->get_meta( '_from_order_id' );
		if ( ! empty( $from_order_id ) ) {
			// Change the order status to 'Completed'
			$order->update_status( 'completed', 'Order auto-completed since this is a pending payment', true );
		}
	}

	public function pending_payment_order_email_content( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$pending_id     = $order->get_meta( '_pending_id' );
		$from_order_id  = $order->get_meta( '_from_order_id' );
		$original_order = wc_get_order( $from_order_id );

		if ( $pending_id && $from_order_id ) {
			$body_text  = '<p>Hello {customer_first_name},</p>';
			$body_text .= '<p>We have received your recent payment for Order #NV' . $from_order_id . '.</p>';
			$body_text .= '<p>Thank you very much.</p>';

			ob_start();
			add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
			do_action( 'woocommerce_email_order_details', $original_order, false, false, '' );
			remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
			$order_details = ob_get_clean();

			$body_text = str_replace( '{order_details}', $order_details, $body_text );

			$body_text = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
		}
		return $body_text;
	}

	protected function get_billing_information_from_payment( $payment ) {
		$order = wc_get_order( $payment->original_order );
		if ( ! $order ) {
			return false;
		}

		$billing_information = array(
			'first_name' => $order->get_billing_first_name(),
			'last_name'  => $order->get_billing_last_name(),
			'email'      => $order->get_billing_email(),
			'phone'      => $order->get_billing_phone(),
			'address_1'  => $order->get_billing_address_1(),
			'address_2'  => $order->get_billing_address_2(),
			'city'       => $order->get_billing_city(),
			'state'      => $order->get_billing_state(),
			'postcode'   => $order->get_billing_postcode(),
			'country'    => $order->get_billing_country(),
		);

		return $billing_information;
	}


	public function handle_send_reminder() {
		if ( isset( $_POST['payment_id'], $_POST['send_reminder_nonce'] ) && wp_verify_nonce( $_POST['send_reminder_nonce'], 'send_reminder_action' ) ) {
			$payment_id = intval( $_POST['payment_id'] );

			if ( $payment_id ) {
				$sent = $this->send_payment_reminder_email_manual( $payment_id, $_POST['index'] );

				// Optionally, add a query arg to indicate the email was sent, to show a message to the admin
				wp_redirect( add_query_arg( 'reminder_sent', 'true', admin_url( 'admin.php?page=pending-payments' ) ) );
				exit;
			}
		}
	}

	public function convert_string_to_slug( $string, $separator = '_' ) {
		// Convert to lowercase
		$slug = strtolower( $string );

		// Replace spaces with the separator (usually hyphen or underscore)
		$slug = str_replace( ' ', $separator, $slug );

		// Remove special characters
		$slug = preg_replace( '/[^a-z0-9' . preg_quote( $separator ) . ']/', '', $slug );

		return $slug;
	}



	public function send_payment_reminder_email_manual( $payment_id, $index ) {
		$payment           = $this->get_data( $payment_id );
		$payment_order_id  = $payment->payment_order;
		$original_order_id = $payment->original_order;
		$pending_total     = $payment->pending_total;
		$currency          = $payment->currency;
		$payment_type      = $payment->payment_select;

		$order          = wc_get_order( $payment_order_id );
		$original_order = wc_get_order( $original_order_id );

		$completed_date_obj  = $original_order->get_date_completed();
		$shipped_date        = $completed_date_obj->date( 'F d, Y' );
		$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
		$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
		$payment_date        = date( 'F d, Y', $deadline );

		$payment_url = $order->get_checkout_payment_url();

		$first_name               = $order->get_billing_first_name();
		$customer_email           = $order->get_billing_email();
		$user_id                  = $order->get_user_id() ? $order->get_user_id() : 0;
		$additional_billing_email = get_user_meta( $user_id, 'additional_billing_email', true );

		if ( $additional_billing_email ) {
			$customer_email = $additional_billing_email;
		}

		if ( ! $order ) {
			return 'Order not found';

		}
		if ( ! $customer_email ) {
			return 'No email';
		}

		if ( ! $index ) {
			return 'No index';
		}

		$payment_emails = get_field( 'payment_emails', $payment_type );

		if ( $payment_emails ) {
			$subject = $payment_emails[ $index - 1 ]['subject'];
			$heading = $payment_emails[ $index - 1 ]['heading'];
			$message = $payment_emails[ $index - 1 ]['content'];

			$subject = str_replace( '{customer_name}', $first_name, $subject );
			$subject = str_replace( '{deadline}', $payment_date, $subject );
			$subject = str_replace( '{order_number}', $original_order->get_order_number(), $subject );
			$heading = str_replace( '{order_number}', $original_order->get_order_number(), $heading );

			$message = str_replace( '{customer_name}', $first_name, $message );
			$message = str_replace( '{order_number}', $original_order->get_order_number(), $message );
			$message = str_replace( '{invoice_amount}', $currency . '$ ' . round( floatval( $pending_total ), 2 ), $message );
			$message = str_replace( '{pending_payment}', $currency . '$ ' . round( floatval( $pending_total ), 2 ), $message );
			$message = str_replace( '{payment_link}', $payment_url, $message );
			$message = str_replace( '{deadline}', $payment_date, $message );

			ob_start();
			add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
			do_action( 'woocommerce_email_order_details', $original_order, false, false, '' );
			remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
			$order_details = ob_get_clean();

			$message = str_replace( '{order_details}', $order_details, $message );

			if ( $customer_email ) {
				$headers     = array( 'Content-Type: text/html; charset=UTF-8' );
				$attachments = array();
				if ( class_exists( '\WPO\WC\PDF_Invoices\Main' ) ) {
					$attachments = \WPO\WC\PDF_Invoices\Main::instance()->attach_document_to_email( array(), 'customer_invoice', $order, null );
				}

				$role_instance = \NOVA_B2B\Roles::get_instance();

				if ( $role_instance ) {

					$role_instance->send_email( $customer_email, $subject, $message, $headers, $attachments, $heading );

					$key = 'payment_email_key_' . $index;

					$label = $payment_emails[ $index - 1 ]['email_label'];

					if ( $label == 'Deadline email' ) {
						$this->admin_notification_deadline_email( $original_order, $role_instance, $headers, $first_name, $payment_date, $pending_total );

						update_post_meta( $payment_order_id, 'is_overdue', true );
					}

					update_post_meta( $payment_order_id, $key, date( 'Y/m/d' ) );
				}
			}
		}
	}

	public function check_overdue( $payment ) {
		$payment_type          = $payment->payment_select;
		$payment_order_id      = $payment->payment_order;
		$original_order_id     = $payment->original_order;
		$manual_delivered_date = get_field( 'manual_delivered_date', $original_order_id );

		if ( isset( $manual_delivered_date ) && ! empty( $manual_delivered_date ) ) {
			return;
		}

		$order          = wc_get_order( $payment_order_id );
		$original_order = wc_get_order( $original_order_id );
		$user_id        = $order->get_user_id();

		$completed_date_obj  = $original_order->get_date_completed();
		$shipped_date        = $completed_date_obj->date( 'F d, Y' );
		$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
		$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
		$payment_date        = date( 'F d, Y', $deadline );
		$current_overdue     = get_user_meta( $user_id, 'overdue_orders', true );

		$today = date( 'F d, Y' );

		if ( strtotime( $today ) > strtotime( $payment_date ) ) {
			if ( $current_overdue ) {
				$current_overdue   = explode( ',', $current_overdue );
				$current_overdue[] = $payment_order_id;
				update_user_meta( $user_id, 'overdue_orders', implode( ',', $current_overdue ) );
			}

			update_post_meta( $payment_order_id, 'is_overdue', true );
		} else {
			update_post_meta( $payment_order_id, 'is_overdue', false );
			if ( $current_overdue ) {
				$current_overdue = explode( ',', $current_overdue );
				$key             = array_search( $payment_order_id, $current_overdue );
				if ( $key !== false ) {
					unset( $current_overdue[ $key ] );
					update_user_meta( $user_id, 'overdue_orders', implode( ',', $current_overdue ) );
				}
			}
		}
	}

	public function send_payment_reminder_email( $payment ) {

		$payment_type          = $payment->payment_select;
		$payment_order_id      = $payment->payment_order;
		$original_order_id     = $payment->original_order;
		$pending_total         = $payment->pending_total;
		$currency              = $payment->currency;
		$manual_delivered_date = get_field( 'manual_delivered_date', $original_order_id );

		if ( isset( $manual_delivered_date ) && ! empty( $manual_delivered_date ) ) {
			return;
		}

		$order          = wc_get_order( $payment_order_id );
		$original_order = wc_get_order( $original_order_id );

		$completed_date_obj  = $original_order->get_date_completed();
		$shipped_date        = $completed_date_obj->date( 'F d, Y' );
		$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
		$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
		$payment_date        = date( 'F d, Y', $deadline );

		$today = date( 'F d, Y' );

		$first_name               = $order->get_billing_first_name();
		$customer_email           = $order->get_billing_email();
		$user_id                  = $order->get_user_id() ? $order->get_user_id() : 0;
		$additional_billing_email = get_user_meta( $user_id, 'additional_billing_email', true );

		if ( $additional_billing_email ) {
			$customer_email = $additional_billing_email;
		}

		if ( ! $order ) {
			return 'Order not found';
		}
		if ( ! $customer_email ) {
			return 'No email';
		}

		$payment_url = $order->get_checkout_payment_url();

		if ( have_rows( 'payment_emails', $payment_type ) ) :

			while ( have_rows( 'payment_emails', $payment_type ) ) :
				the_row();
				$days = get_sub_field( 'send_after_days' );

				if ( $days !== false ) {

					$days_later = strtotime( $shipped_date . ' +' . intval( $days ) . ' days' );
					$date_later = date( 'F d, Y', $days_later );

					if ( $today == $date_later ) {

						$subject = get_sub_field( 'subject' );
						$subject = str_replace( '{customer_name}', $first_name, $subject );
						$subject = str_replace( '{deadline}', $payment_date, $subject );
						$subject = str_replace( '{order_number}', $original_order->get_order_number(), $subject );

						$message = get_sub_field( 'content' );
						$message = str_replace( '{customer_name}', $first_name, $message );
						$message = str_replace( '{invoice_amount}', $currency . '$ ' . round( floatval( $pending_total ), 2 ), $message );
						$message = str_replace( '{pending_payment}', $currency . '$ ' . round( floatval( $pending_total ), 2 ), $message );
						$message = str_replace( '{payment_link}', $payment_url, $message );
						$message = str_replace( '{deadline}', $payment_date, $message );
						$message = str_replace( '{order_number}', $original_order->get_order_number(), $message );

						// Get the order details
						ob_start();
						add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
						do_action( 'woocommerce_email_order_details', $original_order, false, false, '' );
						remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
						$order_details = ob_get_clean();

						$message = str_replace( '{order_details}', $order_details, $message );

						if ( $customer_email ) {
							$headers = array( 'Content-Type: text/html; charset=UTF-8' );

							$role_instance = \NOVA_B2B\Roles::get_instance();

							if ( $role_instance ) {

								$attachments = array();

								if ( class_exists( '\WPO\WC\PDF_Invoices\Main' ) ) {
									$attachments = \WPO\WC\PDF_Invoices\Main::instance()->attach_document_to_email( array(), 'customer_invoice', $order, null );
								}

								$role_instance->send_email( $customer_email, $subject, $message, $headers, $attachments );

							}

							$label = get_sub_field( 'email_label' );

							if ( $label == 'Deadline email' ) {
								$this->admin_notification_deadline_email( $original_order, $role_instance, $headers, $first_name, $payment_date, $pending_total );

								$current_overdue = get_user_meta( $user_id, 'overdue_orders', true );

								update_post_meta( $payment_order_id, 'is_overdue', true );

								if ( $current_overdue ) {
									$current_overdue   = explode( ',', $current_overdue );
									$current_overdue[] = $payment_order_id;
									update_user_meta( $user_id, 'overdue_orders', implode( ',', $current_overdue ) );
								} else {
									update_user_meta( $user_id, 'overdue_orders', $payment_order_id );
								}
							}

							$key = 'payment_email_key_' . get_row_index();
							update_post_meta( $payment_order_id, $key, 'sent' );

						}
					}
				}

			endwhile;
		endif;
	}

	public function admin_notification_deadline_email( $order, $role_instance, $headers, $first_name, $deadline, $pending_payment ) {
		ob_start();
		?>
<p>Hello,</p>
<p>An outstanding invoice for #{order_number} is due today. We have sent a reminder to:</p>
<ul>
	<li>Customer: {customer_name} - {business_id} </li>
	<li>Company: {business_name}</li>
	<li>Order ID: #{order_number}</li>
	<li>Deadline of payment: {deadline}</li>
	<li>Unpaid Balance: {pending_payment}</li>
</ul>

<p>Order details:</p>
{order_details}
		<?php
		$message = ob_get_clean();

		$user_id       = $order->get_user_id() ? $order->get_user_id() : 0;
		$first_name    = $order->get_billing_first_name();
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$business_name = get_field( 'business_name', 'user_' . $user_id );
		$order_number  = $order->get_order_number();
		$currency      = $order->get_currency();

		// Get the order details
		ob_start();
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
		do_action( 'woocommerce_email_order_details', $order, false, false, '' );
		remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
		$order_details = ob_get_clean();

		$message = str_replace( '{order_details}', $order_details, $message );
		$message = str_replace( '{customer_name}', $first_name, $message );
		$message = str_replace( '{business_id}', $business_id, $message );
		$message = str_replace( '{business_name}', $business_name, $message );
		$message = str_replace( '{order_number}', $order_number, $message );
		$message = str_replace( '{deadline}', $deadline, $message );
		$message = str_replace( '{pending_payment}', $currency . '$' . $pending_payment, $message );

		$subject = 'NOVA INTERNAL - Payment Deadline Sent: {customer_name} from {business_name} {business_id} - ORDER #{order_number}';
		$subject = str_replace( '{customer_name}', $first_name, $subject );
		$subject = str_replace( '{business_id}', $business_id, $subject );
		$subject = str_replace( '{business_name}', $business_name, $subject );
		$subject = str_replace( '{order_number}', $order_number, $subject );

		$emails = $role_instance->get_admin_and_customer_rep_emails();

		$role_instance->send_email( $emails, $subject, $message, $headers, array() );
	}



	public function admin_notification_shipped_email( $order, $role_instance, $headers ) {
		ob_start();
		?>
<p>Hello,</p>
<p>We've informed your client that the product is now prepared and ready to ship:</p>
<ul>
	<li>Customer: {customer_name} - {business_id} </li>
	<li>Company: {business_name}</li>
	<li>Order ID: #{order_number}</li>
</ul>

<p>Here's the final invoice and their tracking information:</p>
{order_details}
		<?php
		$message       = ob_get_clean();
		$first_name    = $order->get_billing_first_name();
		$user_id       = $order->get_user_id() ? $order->get_user_id() : 0;
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$business_name = get_field( 'business_name', 'user_' . $user_id );
		$order_number  = $order->get_order_number();

		// Get the order details
		ob_start();
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
		do_action( 'woocommerce_email_order_details', $order, false, false, '' );
		remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
		$order_details = ob_get_clean();

		$message = str_replace( '{order_details}', $order_details, $message );
		$message = str_replace( '{customer_name}', $first_name, $message );
		$message = str_replace( '{business_id}', $business_id, $message );
		$message = str_replace( '{business_name}', $business_name, $message );
		$message = str_replace( '{order_number}', $order_number, $message );

		$subject = 'NOVA - Ready to Ship:  {customer_name} from {business_name} {business_id} - ORDER #{order_number}';
		$subject = str_replace( '{customer_name}', $first_name, $subject );
		$subject = str_replace( '{business_id}', $business_id, $subject );
		$subject = str_replace( '{business_name}', $business_name, $subject );
		$subject = str_replace( '{order_number}', $order_number, $subject );

		$emails = $role_instance->get_admin_and_customer_rep_emails();

		$role_instance->send_email( $emails, $subject, $message, $headers, array() );
	}


	public function schedule_pending_payment_checker() {
		if ( ! wp_next_scheduled( 'check_pending_payments_action_hook' ) ) {
			wp_schedule_event( time(), 'daily', 'check_pending_payments_action_hook' );
		}

		if ( ! wp_next_scheduled( 'check_streak_email' ) ) {
			wp_schedule_event( time(), 'daily', 'check_streak_email' );
		}
	}

	public function handle_overdue_query( $query, $query_vars ) {
		if ( ! empty( $query_vars['overdue_orders'] ) && 'overdue' === $query_vars['overdue_orders'] ) {
			$query['meta_query']['relation'] = 'AND';
			$query['meta_query'][]           = array(
				'key'   => 'is_overdue',
				'value' => 0,
			);
			$query['meta_query'][]           = array(
				'key'     => '_from_order_id',
				'compare' => 'EXISTS',
			);
		}

		return $query;
	}

	public function get_user_overdue_orders() {

		$args = array(
			'limit'          => -1,
			'status'         => array( 'wc-processing', 'wc-on-hold', 'wc-pending' ),
			'overdue_orders' => 'overdue',
		);

		return wc_get_orders( $args );
	}

	public function check_overdue_orders() {
		$orders = $this->get_user_overdue_orders();

		// Log the orders
		if ( ! empty( $orders ) ) {
			foreach ( $orders as $order ) {
				error_log( 'Overdue Order ID: ' . $order->get_id() );
			}
		} else {
			error_log( 'No overdue orders found.' );
		}
	}



	public function check_pending_payments() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';

		$query = $wpdb->prepare( "SELECT * FROM {$table_name} WHERE payment_status = %s", 'Pending' );

		$pending_payments = $wpdb->get_results( $query );

		foreach ( $pending_payments as $payment ) {

			$this->send_payment_reminder_email( $payment );

			$this->check_overdue( $payment );

		}
	}

	public function add_pending_payments_submenu_page() {
		add_submenu_page(
			'woocommerce',
			'Pending Payments',
			'Pending Payments',
			'manage_woocommerce',
			'pending-payments',
			array( $this, 'pending_payments_page_content' )
		);
	}

	public function pending_payments_page_content() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';

		// Check if there's a filter request
		$order_by = isset( $_GET['order_by'] ) && $_GET['order_by'] === 'payment_date' ? 'payment_date' : 'id';

		$query = $wpdb->prepare(
			"SELECT * FROM {$table_name}
        WHERE payment_status != %s
        ORDER BY $order_by ASC",
			'Completed'
		);

		// Fetch data from the custom table
		$results = $wpdb->get_results( $query, ARRAY_A );

		// Start building the HTML content
		echo '<div class="wrap">';
		echo '<h1>Pending Payments ' . count( $results ) . '</h1>';

		if ( isset( $_GET['reminder_sent'] ) && $_GET['reminder_sent'] == 'true' ) {
			echo '<div class="notice notice-success is-dismissible"><p>Reminder email sent successfully.</p></div>';
		}

		// Filter form
		echo '<form method="get">';
		echo '<input type="hidden" name="page" value="pending-payments"/>'; // Keep the current page
		echo '<button type="submit" name="order_by" value="payment_date" style="display: none;">Order by Payment Date</button>';
		echo '</form>';

		// Start the table
		echo '<table class="wp-list-table widefat fixed striped">';
		echo '<thead>';
		echo '<tr>';
		echo '<th>Customer</th>';
		echo '<th>Order</th>';
		echo '<th>Payment Order</th>';
		echo '<th>Deposit</th>';
		echo '<th>Pending Total</th>';
		echo '<th>Payment Date</th>';
		echo '<th>Payment Select</th>';
		echo '<th colspan="3">Payment Status</th>';
		echo '<th></th>';
		echo '</tr>';
		echo '</thead>';
		echo '<tbody>';

		// Check if there are any results
		if ( ! empty( $results ) ) {
			foreach ( $results as $row ) {

				$class = '';
				$ago   = strtotime( $row['payment_date'] ) < current_time( 'timestamp' );
				if ( $ago ) {
					$class = ' over';
				}

				$order         = wc_get_order( $row['payment_order'] );
				$customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();

				echo '<tr>';
				echo "<td>{$customer_name}</td>";
				$order_edit_link1 = admin_url( 'post.php?post=' . absint( $row['original_order'] ) . '&action=edit' );
				echo "<td><a href='{$order_edit_link1}'>#{$row['original_order']}</a></td>";
				$order_edit_link = admin_url( 'post.php?post=' . absint( $row['payment_order'] ) . '&action=edit' );
				echo "<td><a href='{$order_edit_link}'>#{$row['payment_order']}</a></td>";
				echo "<td>{$row['currency']}$ {$row['deposit']}</td>";
				echo "<td>{$row['pending_total']}</td>";
				echo '<td>' . date( 'F d, Y', strtotime( $row['payment_date'] ) ) . ' - <span class="' . $class . '" style="display: block; padding: 5px;">' . human_time_diff( current_time( 'timestamp' ), strtotime( $row['payment_date'] ) ) . ( $ago ? ' ago' : '' ) . '</span></td>';
				echo '<td>' . get_the_title( $row['payment_select'] ) . '</td>';
				echo "<td colspan='3'>";

				if ( have_rows( 'payment_emails', $row['payment_select'] ) ) {
					echo '<ul class="flex">';
					while ( have_rows( 'payment_emails', $row['payment_select'] ) ) {
						the_row( 'payment_emails', $row['payment_select'] );

						$key        = 'payment_email_key_' . get_row_index();
						$email_sent = get_post_meta( $row['payment_order'], $key, true );

						echo '<li style="display: flex; gap: 1em; align-items: center;">' . get_sub_field( 'email_label' );
						echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
						echo '<input type="hidden" name="action" value="send_payment_reminder"/>';
						echo '<input type="hidden" name="payment_id" value="' . esc_attr( $row['id'] ) . '"/>';
						echo '<input type="hidden" name="original_order" value="' . esc_attr( $row['original_order'] ) . '"/>';
						echo '<input type="hidden" name="index" value="' . get_row_index() . '"/>';
						echo '<input type="hidden" name="order_id" value="' . absint( $row['payment_order'] ) . '"/>';
						echo '<input type="hidden" name="email_key" value="' . esc_attr( $key ) . '"/>';
						wp_nonce_field( 'send_reminder_action', 'send_reminder_nonce' );
						echo '<input type="submit" class="button action" value="' . ( isset( $email_sent ) && ! empty( $email_sent ) ? 'Send Again' : 'Send' ) . '"/>';
						if ( $email_sent ) {
							echo ' Sent: ' . $email_sent;
						}
						echo '</form>';
						echo '</li>';
					}
					echo '</ul>';
				}

				echo '</td>';

				echo '<td>';
				echo '<form method="post" action="' . admin_url( 'admin-post.php' ) . '" onsubmit="return confirm(\'Are you sure you want to delete the order #' . $order->get_order_number() . '?\');">';
				echo '<input type="hidden" name="action" value="delete_pending_payment"/>';
				echo '<input type="hidden" name="delete_order_id" value="' . esc_attr( $row['id'] ) . '"/>';
				wp_nonce_field( 'delete_order_action', 'delete_order_nonce' );
				echo '<input type="submit" class="button action delete" value="Delete #' . $order->get_order_number() . '"/>';
				echo '</form>';
				echo '</td>';
				echo '</tr>';
				echo '</tr>';
			}
		} else {
			echo '<tr><td colspan="10">No pending payments found.</td></tr>';
		}
		echo '</tbody>';
		echo '</table>';
		echo '</div>'; // Close the wrap div
		echo '<style>.over {background-color: red; color: white;}';
	}


	public function check() {

		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';

		$query = $wpdb->prepare( "SELECT * FROM {$table_name} WHERE payment_status = %s", 'Pending' );

		$pending_payments = $wpdb->get_results( $query );

		foreach ( $pending_payments as $payment ) {

			$payment_type        = $payment->payment_select;
			$payment_order_id    = $payment->payment_order;
			$original_order_id   = $payment->original_order;
			$original_order      = wc_get_order( $original_order_id );
			$completed_date_obj  = $original_order->get_date_completed();
			$shipped_date        = $completed_date_obj->date( 'F d, Y' );
			$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
			$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
			$deadline_date       = date( 'F d, Y', $deadline );

			$order = wc_get_order( $payment_order_id );

			if ( ! $order ) {
				echo 'Order not found<br>';
			}

			$today = date( 'F d, Y' );

			echo '-----<br>';
			echo $today . ' - ' . $shipped_date . ' - ' . $deadline_date . '<br>';
			echo '-----<br>';

			if ( have_rows( 'payment_emails', $payment_type ) ) :
				while ( have_rows( 'payment_emails', $payment_type ) ) :
					the_row();
					$days = get_sub_field( 'send_after_days' );

					if ( $days !== false ) {

						echo $days . '-';

						$days_later = strtotime( $shipped_date . ' +' . intval( $days ) . ' days' );
						$date_later = date( 'F d, Y', $days_later );

						if ( $today == $date_later ) {

							echo 'Today ' . $date_later . '<br>';

						} else {
							echo ' "' . get_sub_field( 'email_label' ) . '" - Not Today ' . $date_later . '<br>';
						}
					}

				endwhile;
		endif;
		}
	}


	public function create_custom_table() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';  // Prefixing the table name is a good practice

		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			time datetime DEFAULT NULL,
			name tinytext NOT NULL,
			original_order mediumint(9) NOT NULL,
			payment_order mediumint(9) NOT NULL,
			deposit varchar(55) NOT NULL,
			pending_total varchar(55) NOT NULL,
			original_total varchar(55) NOT NULL,
			currency varchar(10) NOT NULL,
			payment_date datetime DEFAULT NULL,
			reminder_sent varchar(10) NOT NULL,
			reminder_sent_date varchar(55) NOT NULL,
			payment_select varchar(10) NOT NULL,
			payment_status varchar(55) NOT NULL,
			PRIMARY KEY  (id)
		) $charset_collate;";

		dbDelta( $sql );
	}

	public function insert_data( $data, $format ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		$result     = $wpdb->insert( $table_name, $data, $format );
		return $result !== false ? $wpdb->insert_id : false;
	}

	public function get_data( $id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		$query      = $wpdb->prepare( "SELECT * FROM $table_name WHERE id = %d", $id );
		return $wpdb->get_row( $query );
	}

	public function get_data_from_order( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		$query      = $wpdb->prepare( "SELECT COUNT(*) FROM $table_name WHERE original_order = %d", $order_id );
		return $wpdb->get_var( $query );
	}

	public function get_payment_id_from_original_order( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		$query      = $wpdb->prepare( "SELECT * FROM $table_name WHERE original_order = %d", $order_id );
		return $wpdb->get_row( $query );
	}

	public function get_payment_date( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		$query      = $wpdb->prepare( "SELECT * FROM $table_name WHERE original_order = %d", $order_id );
		return $wpdb->get_row( $query );
	}

	public function update_data( $id, $data ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		return $wpdb->update( $table_name, $data, array( 'id' => $id ) );
	}

	public function delete_data( $id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		return $wpdb->delete( $table_name, array( 'id' => $id ), array( '%d' ) );
	}

	public function change_pending_status( $order_id ) {
		$pending_id = get_post_meta( $order_id, '_pending_id', true );

		if ( $pending_id ) {
			$update_data = array( 'payment_status' => 'Completed' );
			$this->update_data( $pending_id, $update_data );
		}
	}

	public function update_user_meta_overdue_orders( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return; // Bail if order is not found
		}

		$user_id = $order->get_customer_id();
		if ( ! $user_id ) {
			return; // Bail if no customer is associated with the order
		}

		$overdue_orders = get_user_meta( $user_id, 'overdue_orders', true );
		if ( $overdue_orders ) {
			$overdue_orders = explode( ',', $overdue_orders );

			// Remove the order from the list of overdue orders
			$overdue_orders = array_filter(
				$overdue_orders,
				function ( $value ) use ( $order_id ) {
					return $value != $order_id; // Loose comparison
				}
			);

			// Update the user meta with the new list of overdue orders
			update_user_meta( $user_id, 'overdue_orders', implode( ',', $overdue_orders ) );
		}
	}


	public function insert_pending_payment( $order_id ) {
		$pending_order = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$order         = wc_get_order( $order_id );

		$manual_delivered_date = get_field( 'manual_delivered_date', $order_id );

		$exists = $this->get_data_from_order( $order_id );

		if ( $exists ) {
			return;
		}

		if ( $pending_order ) {
			$original_total = get_post_meta( $order_id, '_original_total', true );
			$payment_select = get_post_meta( $order_id, '_payment_select', true ) ? (int) get_post_meta( $order_id, '_payment_select', true ) : '';
			$pending_total  = get_post_meta( $order_id, '_pending_payment', true );
			$days           = get_field( 'days_after_shipping', $payment_select ) ? get_field( 'days_after_shipping', $payment_select ) : 0;
			$currency       = $order->get_currency();
			$payment_order  = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
			$parent_order   = $order->get_ID();
			$deposit        = get_post_meta( $order_id, '_deposit_total', true );

			$order->set_total( $deposit );
			$order->save();

			/** if manual_delivered_date is set, use it */
			if ( $manual_delivered_date ) {
				// Create a DateTime object from the d/m/Y format
				$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );

				// Format it into a WooCommerce-compatible date string (Y-m-d H:i:s)
				if ( $date_obj ) {
					// add $days to the DateTime object
					$date_obj->add( new \DateInterval( 'P' . $days . 'D' ) );
					$future_date = $date_obj->format( 'Y-m-d H:i:s' );
				} else {
					// Fallback if conversion fails (use current date)
					$future_date = date( 'Y-m-d H:i:s', strtotime( '+' . $days . ' days' ) );
				}
			} else {
				// If no manual delivered date, use the current date
				$future_date = date( 'Y-m-d H:i:s', strtotime( '+' . $days . ' days' ) );
			}

			$data = array(
				'time'           => current_time( 'mysql' ),
				'name'           => 'Pending payment for Order #' . $order_id,
				'original_order' => $parent_order,
				'payment_order'  => $payment_order,
				'deposit'        => $deposit,
				'pending_total'  => $pending_total,
				'original_total' => $original_total,
				'currency'       => $currency,
				'payment_date'   => $future_date,
				'payment_select' => $payment_select,
				'payment_status' => 'Pending',
			);

			// Format array
			$format = array(
				'%s',
				'%s',
				'%d',
				'%d',
				'%s',
				'%s',
				'%s',
				'%s',
				'%s',
				'%d',
				'%s',
			);

			$inserted_id = $this->insert_data( $data, $format );

			update_post_meta( $pending_order, '_pending_id', $inserted_id );
			delete_post_meta( $pending_order, '_hide_order' );
			update_post_meta( $order_id, '_hide_order', true );

			$this->check_pending_payments();

			add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );

		}
	}

	public function test_note( $order_id ) {

		$order = wc_get_order( $order_id );

		$timestamp = current_time( 'timestamp' );

		$order_note = sprintf(
				/* translators: 1) carrier's name 2) shipped date, 3) tracking number */
			__( 'Items shipped via %1$s on %2$s with tracking number %3$s (Shipstation).', 'woocommerce-shipstation-integration' ),
			'UPS',
			date_i18n( get_option( 'date_format' ), $timestamp ),
			'UVISDFKSDKFKDSF'
		);

		$order->add_order_note( $order_note, 1 );
	}

	public function insert_payment_date( $total_rows, $order, $tax_display ) {

		$order_id           = $order->get_id();
		$completed_date_obj = $order->get_date_completed();

		if ( ! $completed_date_obj ) {
			return $total_rows;
		}

		$pending_order = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );

		$manual_shipped = get_field( 'manual_delivered_date', $order_id );

		if ( $manual_shipped ) {
			// Create a DateTime object from the d/m/Y format
			$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_shipped );

			// Format it into a WooCommerce-compatible date string (Y-m-d H:i:s)
			if ( $date_obj ) {
				$shipped_date = $date_obj->format( 'F d, Y' );
			} else {
				// Fallback if conversion fails (use completed date)
				$shipped_date = $completed_date_obj->date( 'F d, Y' );
			}
		} else {
			// If no manual shipped date, use the completed date
			$shipped_date = $completed_date_obj->date( 'F d, Y' );
		}

		$payment_type = $order->get_meta( '_payment_select' );

		$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
		$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
		$payment_date        = date( 'F d, Y', $deadline );

		if ( $pending_order ) {
			$payment = $this->get_payment_date( $order_id );

			if ( $payment && $payment_date ) {
				$total_rows['payment_date'] = array(
					'label' => __( 'Payment Date', 'woocommerce' ),
					'value' => esc_html( $payment_date ),
				);

				// Reorder to make sure the payment date is the last item
				$payment_date = $total_rows['payment_date'];
				unset( $total_rows['payment_date'] );
				$total_rows['payment_date'] = $payment_date;

			}
		}

		return $total_rows;
	}

	public function handle_delete_order() {
		if ( isset( $_POST['delete_order_id'], $_POST['delete_order_nonce'] ) && wp_verify_nonce( $_POST['delete_order_nonce'], 'delete_order_action' ) ) {
			$order_id = intval( $_POST['delete_order_id'] );
			$this->delete_data( $order_id );

			// Redirect back to the Pending Payments page
			wp_redirect( admin_url( 'admin.php?page=pending-payments' ) );
			exit;
		}
	}

	public function admin_email_pending_paid_full( $order ) {
		$pending_id = $order->get_meta( '_pending_id' );

		$user_id = $order->get_customer_id();
		$payment = $this->get_data( $pending_id );

		if ( $payment ) {

			$payment_type        = $payment->payment_select;
			$original_order_id   = $payment->original_order;
			$original_order      = wc_get_order( $original_order_id );
			$completed_date_obj  = $original_order->get_date_completed();
			$shipped_date        = $completed_date_obj->date( 'F d, Y' );
			$days_after_shipping = get_field( 'days_after_shipping', $payment_type );
			$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
			$payment_date        = date( 'F d, Y', $deadline );
			$pending_total       = $payment->pending_total;
		}

		$currency      = $order->get_currency();
		$first_name    = $order->get_billing_first_name();
		$user_id       = $order->get_user_id() ? $order->get_user_id() : 0;
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$business_name = get_field( 'business_name', 'user_' . $user_id );
		$order_number  = $order->get_order_number();

		$message  = '<p>Hello,</p>';
		$message .= '<p>Client {customer_name} has paid for their outstanding balance.</p>';
		$message .= '<ul>';
		$message .= '<li>Order ID: #{order_number}</li>';
		$message .= '<li>Customer: {customer_name} - {business_id}</li>';
		$message .= '<li>Company: {company_name}</li>';
		$message .= '</li>';
		$message .= '</ul>';

		$message .= '<p>Here are the details about their payment:</p>';
		$message .= '<ul>';

		if ( $payment ) {
			$message .= '<li>Amount paid: {pending_payment}</li>';
		}

		$message .= '<li>Date Paid: {today}</li>';

		if ( $payment ) {
			$message .= '<li>Payment Scheme: {payment_select}</li>';
		}

		$message .= '</ul>';
		$message .= '<p>Review the final invoice and payment details:</p>';
		$message .= '{order_details}';

		$message = str_replace( '{order_number}', $order_number, $message );

		if ( $payment ) {
			$message = str_replace( '{deadline}', $payment_date, $message );
			$message = str_replace( '{pending_payment}', $currency . '$' . round( floatval( $pending_total ), 2 ), $message );
			$message = str_replace( '{payment_select}', get_the_title( $payment_type ), $message );
		}

		$message       = str_replace( '{customer_name}', $first_name, $message );
		$message       = str_replace( '{company_name}', $business_name, $message );
		$message       = str_replace( '{business_id}', $business_id, $message );
		$message       = str_replace( '{today}', date( 'F j, Y' ), $message );
		$order_details = '';

		if ( $payment ) {
			ob_start();
			add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
			do_action( 'woocommerce_email_order_details', $original_order, false, false, '' );
			remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
			$order_details = ob_get_clean();
		} else {
			do_action( 'woocommerce_email_order_details', $order, false, false, '' );
		}

		$message = str_replace( '{order_details}', $order_details, $message );
		$subject = 'NOVA INTERNAL - Payment Received: {customer_name} {business_id}  from {company_name}- ORDER #{order_number}';
		$subject = str_replace( '{customer_name}', $first_name, $subject );
		$subject = str_replace( '{business_id}', $business_id, $subject );
		$subject = str_replace( '{business_name}', $business_name, $subject );
		$subject = str_replace( '{company_name}', $business_name, $subject );
		$subject = str_replace( '{order_number}', $order_number, $subject );

		return array(
			'subject' => $subject,
			'message' => $message,
		);
	}

	public function admin_notification_paid_full( $order_id ) {
		$order = wc_get_order( $order_id );

		if ( ! get_post_meta( $order_id, '_from_order_id', true ) ) {
			return;
		}

		$mail_content = $this->admin_email_pending_paid_full( $order );

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$role_instance = \NOVA_B2B\Roles::get_instance();
		if ( $role_instance && $mail_content ) {
			$subject = $mail_content['subject'];
			$message = $mail_content['message'];
			$emails  = $role_instance->get_admin_and_customer_rep_emails();
			$role_instance->send_email( $emails, $subject, $message, $headers, array() );
		}
	}

	public function get_overdue_pending_payment_orders( $customer_id ) {
		// Ensure WooCommerce is active
		if ( ! class_exists( 'WooCommerce' ) ) {
			return array();
		}

		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';

		// Fetch pending payments
		$pending_payments = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM {$table_name} WHERE payment_status = %s",
				'Pending'
			)
		);

		$overdue_orders = array();

		// Get today's date in 'Y-m-d' format
		$today = date( 'Y-m-d' );

		foreach ( $pending_payments as $pending_payment ) {
			// Get the order object
			$order = wc_get_order( $pending_payment->payment_order );

			if ( ! $order ) {
				continue; // Skip if order doesn't exist
			}

			// Get the user ID associated with the order
			$user_id = $order->get_user_id();

			// Compare user IDs (ensure both are integers)
			if ( intval( $user_id ) == intval( $customer_id ) ) {
				// Get the payment date in 'Y-m-d' format
				$payment_date = date( 'Y-m-d', strtotime( $pending_payment->payment_date ) );

				// Check if the payment date is before today
				if ( $payment_date < $today ) {
					$overdue_orders[] = $order;
				}
			}
		}

		return $overdue_orders;
	}


	public function has_overdue_pending_payment_orders( $customer_id ) {
		$orders = $this->get_overdue_pending_payment_orders( $customer_id );

		return count( $orders ) >= 3;
	}

	public function display_overdue_pending_payment_orders( $customer_id ) {
		$orders = $this->get_overdue_pending_payment_orders( $customer_id );

		if ( empty( $orders ) ) {
			echo '<div class="text-center inline-flex flex-wrap flex-col justify-center content-center w-full"><div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md border-solid" role="alert">
			<div class="flex">
				<div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
				<div>
				<p class="font-bold">No pending payment overdue orders found.</p>
				</div>
			</div>
			</div></div>';
			return;
		}

		echo '<div class="text-center inline-flex flex-wrap flex-col justify-center content-center w-full">';
		foreach ( $orders as $order ) {
			$order_id    = $order->get_order_number();
			$order_url   = $order->get_checkout_payment_url();
			$order_total = $order->get_total(); // Get the order total
			ob_start();
			?>
<a href="<?php echo esc_url( $order_url ); ?>"
	class="bg-red-100 border-solid border border-red-400 text-red-700 px-4 py-3 rounded relative mb-1 inline-block"
	role="alert">
	<strong class="font-bold">Order #<?php echo esc_html( $order_id ); ?> -
			<?php echo wc_price( $order_total ); ?></strong>:
	<span class="block sm:inline">Click here to pay.</span>
</a>

			<?php
			echo ob_get_clean();
		}
		echo '</div>';
	}

	public function overdue_pending_payment_ouput() {
		ob_start();
		$user_id = isset( $_GET['userid'] ) && ! empty( $_GET['userid'] ) ? intval( $_GET['userid'] ) : get_current_user_id();
		$this->display_overdue_pending_payment_orders( $user_id );
		return ob_get_clean();
	}

	public function redirect_if_overdue_orders() {
		// Ensure WooCommerce functions are available
		if ( ! function_exists( 'wc_get_page_permalink' ) ) {
			return;
		}

		// Get the current user ID
		$customer_id = get_current_user_id();

		if ( ! $this->has_overdue_pending_payment_orders( $customer_id ) ) {
			return;
		}

		error_log( $customer_id . ' user has overdue payment orders' );

		$redirect_url = get_permalink( get_page_by_path( 'overdue-orders' ) );

			// Redirect to the "overdue-orders" page
		if ( ! empty( $redirect_url ) ) {
			wp_safe_redirect( $redirect_url );
			exit;
		}
	}
}
