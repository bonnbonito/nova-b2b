<?php
namespace NOVA_B2B\Inc\Classes;

require_once ABSPATH . 'wp-admin/includes/upgrade.php';

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
		add_action( 'admin_menu', array( $this, 'add_pending_payments_submenu_page' ) );
		add_action( 'admin_post_nopriv_delete_pending_payment', array( $this, 'handle_delete_order' ) );
		add_action( 'admin_post_delete_pending_payment', array( $this, 'handle_delete_order' ) );
		add_action( 'wp', array( $this, 'schedule_pending_payment_checker' ) );
		add_action( 'check_pending_payments_hook', array( $this, 'check_pending_payments' ) );
		add_action( 'admin_post_send_payment_reminder', array( $this, 'handle_send_reminder' ) );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'pending_payment_order_email_content' ), 999, 5 );
		add_action( 'woocommerce_payment_complete', array( $this, 'custom_order_complete' ), 99, 1 );
		add_action( 'pre_get_posts', array( $this, 'hide_specific_orders' ) );
		add_filter( 'woocommerce_my_account_my_orders_query', array( $this, 'filter_my_account_orders_query' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_custom_meta_box_to_orders' ) );
		add_filter( 'woocommerce_order_number', array( $this, 'pending_payment_order_number' ), 12, 2 );
		// add_filter( 'woocommerce_email_recipient_customer_completed_order', array( $this, 'disable_completed_order_email_for_pending' ), 10, 2 );
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

		print_r( get_post_meta( $post->ID ) );

		?>
<a href="<?php echo esc_url( $order_edit_url ); ?>" class="button button-primary">View Order</a>

<p>Original Total: <?php echo $original_total; ?></p>

		<?php
	}

	public function hide_specific_orders( $query ) {
		if ( $query->is_main_query() && $query->get( 'post_type' ) === 'shop_order' ) {
			$meta_query = $query->get( 'meta_query' ) ?: array();

			$meta_query[] = array(
				'key'     => '_hide_order',
				'compare' => 'NOT EXISTS',
			);

			$query->set( 'meta_query', $meta_query );
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

	public function disable_completed_order_email_for_pending( $recipient, $order ) {
		if ( $order && get_post_meta( $order->get_id(), '_pending_id', true ) ) {
			return '';
		}

		return $recipient;
	}

	public function pending_payment_order_email_content( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$pending_id = $order->get_meta( '_pending_id' );
		if ( $pending_id ) {
			$body_text = 'We have received your recent payment for Order #NV' . $order->get_id() . '. Thank you very much.';
		}
		return $body_text;
	}

	protected function get_billing_information_from_payment( $payment ) {
		$order = wc_get_order( intval( $payment->original_order ) );
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
		$payment          = $this->get_data( $payment_id );
		$payment_order_id = $payment->payment_order;
		$payment_order    = '#NV' . $payment->payment_order;
		$pending_total    = $payment->pending_total;
		$currency         = $payment->currency;
		$payment_date     = date( 'F d, Y', strtotime( $payment->payment_date ) );

		$order = wc_get_order( $payment_order_id );

		$customer = $this->get_billing_information_from_payment( $payment );

		$payment_url = $order->get_checkout_payment_url();

		$first_name     = $customer['first_name'];
		$customer_email = $customer['email'];

		if ( ! $order ) {
			return 'Order not found';
			die();

		}
		if ( ! $customer_email ) {
			return 'No email';
		}

		if ( ! $index ) {
			return 'No index';
			die();
		}

		$payment_emails = get_field( 'payment_emails', $payment->payment_select );

		if ( $payment_emails ) {
			$subject = $payment_emails[ $index - 1 ]['subject'];

			$message = $payment_emails[ $index - 1 ]['content'];

			$subject = str_replace( '{customer_name}', $first_name, $subject );
			$subject = str_replace( '{order_number}', $payment_order, $subject );

			$message = str_replace( '{customer_name}', $first_name, $message );
			$message = str_replace( '{invoice_amount}', $currency . '$ ' . $pending_total, $message );
			$message = str_replace( '{order_number}', $payment_order, $message );
			$message = str_replace( '{payment_link}', $payment_url, $message );
			$message = str_replace( '{deadline}', $payment_date, $message );

			if ( $customer_email ) {
				$headers = array( 'Content-Type: text/html; charset=UTF-8' );

				$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();
				$role_instance->send_email( $customer_email, $subject, $message, $headers, array() );
				$key = 'payment_email_key_' . $index;
				update_post_meta( $payment_order, $key, date( 'Y/m/d' ) );

			}
		}
	}

	public function send_payment_reminder_email( $payment ) {

		$payment_type        = $payment->payment_select;
		$payment_order_id    = $payment->payment_order;
		$payment_order       = '#NV' . $payment->payment_order;
		$deposit             = $payment->deposit;
		$pending_total       = $payment->pending_total;
		$original_total      = $payment->original_total;
		$currency            = $payment->currency;
		$payment_date        = date( 'F d, Y', strtotime( $payment->payment_date ) );
		$payment_date_object = new \DateTime( $payment->payment_date );
		$today               = new \DateTime();

		$customer = $this->get_billing_information_from_payment( $payment_order_id );

		$order = wc_get_order( $payment_order_id );
		if ( ! $order ) {
			return 'Order not found';
		}
		if ( ! $customer_email ) {
			return 'No email';
		}
		$payment_url = $order->get_checkout_payment_url();

		$first_name     = $customer['first_name'];
		$customer_email = $customer['email'];

		if ( have_rows( 'payment_emails', $payment_type ) ) :
			while ( have_rows( 'payment_emails', $payment_type ) ) :
				the_row();
				$days = get_sub_field( 'send_after_days' ) ? intval( get_sub_field( 'send_after_days' ) ) : false;

				if ( $days ) {
					$payment_date_plus_days = clone $payment_date_object;
					$payment_date_plus_days->modify( "+{$days} days" );

					if ( $today == $payment_date_plus_days ) {

						$subject = get_sub_field( 'subject' );
						$subject = str_replace( '{customer_name}', $first_name, $subject );
						$subject = str_replace( '{order_number}', $payment_order, $subject );

						$message = get_sub_field( 'content' );
						$message = str_replace( '{customer_name}', $first_name, $message );
						$message = str_replace( '{invoice_amount}', $currency . '$ ' . $pending_total, $message );
						$message = str_replace( '{order_number}', $payment_order, $message );
						$message = str_replace( '{payment_link}', $payment_url, $message );
						$message = str_replace( '{deadline}', $payment_date, $message );

						if ( $customer_email ) {
							$headers = array( 'Content-Type: text/html; charset=UTF-8' );

							$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();
							$role_instance->send_email( $customer_email, $subject, $message, $headers, array() );
							$key = 'payment_email_key_' . get_row_index();
							update_post_meta( $payment_order, $key, 'sent' );
						}
					}
				}

			endwhile;
		endif;
	}


	public function schedule_pending_payment_checker() {
		if ( ! wp_next_scheduled( 'check_pending_payments_hook' ) ) {
			wp_schedule_event( time(), 'daily', 'check_pending_payments_hook' );
		}
	}

	public function check_pending_payments() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';
		// $one_week_ahead = date( 'Y-m-d', strtotime( '+1 week' ) );

		// $query = $wpdb->prepare( "SELECT * FROM {$table_name} WHERE payment_date <= %s AND payment_status = %s", $one_week_ahead, 'Pending' );

		$query = $wpdb->prepare( "SELECT * FROM {$table_name} payment_status = %s", 'Pending' );

		$pending_payments = $wpdb->get_results( $query );

		foreach ( $pending_payments as $payment ) {

			$this->send_payment_reminder_email( $payment );

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
		echo '<h1>Pending Payments</h1>';

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
		echo '<th>Name</th>';
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
				if ( strtotime( $row['payment_date'] ) < current_time( 'timestamp' ) ) {
					$class = ' over';
				}

				echo '<tr>';
				echo "<td>{$row['name']}</td>";
				$order_edit_link1 = admin_url( 'post.php?post=' . absint( $row['original_order'] ) . '&action=edit' );
				echo "<td><a href='{$order_edit_link1}'>#{$row['original_order']}</a></td>";
				$order_edit_link = admin_url( 'post.php?post=' . absint( $row['payment_order'] ) . '&action=edit' );
				echo "<td><a href='{$order_edit_link}'>#{$row['payment_order']}</a></td>";
				echo "<td>{$row['currency']}$ {$row['deposit']}</td>";
				echo "<td>{$row['pending_total']}</td>";
				echo '<td>' . date( 'F d, Y', strtotime( $row['payment_date'] ) ) . ' - <span class="' . $class . '" style="display: block; padding: 5px;">' . human_time_diff( current_time( 'timestamp' ), strtotime( $row['payment_date'] ) ) . '</span></td>';
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
						echo '<input type="hidden" name="index" value="' . get_row_index() . '"/>';
						echo '<input type="hidden" name="order_id" value="' . absint( $row['payment_order'] ) . '"/>';
						echo '<input type="hidden" name="email_key" value="' . esc_attr( $key ) . '"/>';
						wp_nonce_field( 'send_reminder_action', 'send_reminder_nonce' );
						echo '<input type="submit" class="button action" value="' . ( isset( $email_sent ) && ! empty( $email_sent ) ? 'Send Again' : 'Send' ) . '"/>';
						echo '</form>';
						echo '</li>';
					}
					echo '</ul>';
				}

				echo '</td>';

				echo '<td>';
				echo '<form method="post" action="' . admin_url( 'admin-post.php' ) . '" onsubmit="return confirm(\'Are you sure you want to delete this order?\');">';
				echo '<input type="hidden" name="action" value="delete_pending_payment"/>';
				echo '<input type="hidden" name="delete_order_id" value="' . esc_attr( $row['id'] ) . '"/>';
				wp_nonce_field( 'delete_order_action', 'delete_order_nonce' );
				echo '<input type="submit" class="button action delete" value="Delete"/>';
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


	public function insert_pending_payment( $order_id ) {
		$pending_order = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		if ( $pending_order ) {
			$order          = wc_get_order( $order_id );
			$original_total = get_post_meta( $order_id, '_original_total', true );
			$payment_select = get_post_meta( $order_id, '_payment_select', true ) ? (int) get_post_meta( $order_id, '_payment_select', true ) : '';
			$pending_total  = get_post_meta( $order_id, '_pending_payment', true );
			$days           = get_field( 'days_after_shipping', $payment_select ) ? get_field( 'days_after_shipping', $payment_select ) : 20;
			$currency       = $order->get_currency();
			$payment_order  = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
			$parent_order   = $order->get_ID();
			$deposit        = get_post_meta( $order_id, '_deposit_total', true );

			$order->set_total( $deposit );
			$order->save();

			$future_date = date( 'Y-m-d H:i:s', strtotime( '+' . $days . ' days' ) );

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

		}
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
}

Pending_Payment::get_instance();
