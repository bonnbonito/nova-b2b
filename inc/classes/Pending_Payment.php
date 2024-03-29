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
		// add_filter( 'woocommerce_email_recipient_customer_completed_order', array( $this, 'disable_completed_order_email_for_pending' ), 10, 2 );
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
			$body_text = 'Thank you for the payment';
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
			$payment    = $this->get_data( $payment_id );

			if ( $payment ) {
				$this->send_payment_reminder_email( $payment );
				// Optionally, add a query arg to indicate the email was sent, to show a message to the admin
				wp_redirect( add_query_arg( 'reminder_sent', 'true', admin_url( 'admin.php?page=pending-payments' ) ) );
				exit;
			}
		}
	}

	public function send_payment_reminder_email( $payment ) {

		$payment_type   = $payment->payment_select;
		$payment_order  = $payment->payment_order;
		$deposit        = $payment->deposit;
		$pending_total  = $payment->pending_total;
		$original_total = $payment->original_total;
		$currency       = $payment->currency;
		$payment_date   = $payment->payment_date;

		$customer = $this->get_billing_information_from_payment( $payment );

		$first_name     = $customer['first_name'];
		$customer_email = $customer['email'];

		$subject = get_field( 'reminder_email_subject', $payment_type );

		$message = get_field( 'reminder_email', $payment_type );
		$message = str_replace( '{first_name}', $first_name, $message );

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		if ( $customer_email ) {
			$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();
			$role_instance->send_email( $customer_email, $subject, $message, $headers, array() );
		}
	}


	public function schedule_pending_payment_checker() {
		if ( ! wp_next_scheduled( 'check_pending_payments_hook' ) ) {
			wp_schedule_event( time(), 'daily', 'check_pending_payments_hook' );
		}
	}

	public function check_pending_payments() {
		global $wpdb;
		$table_name     = $wpdb->prefix . 'nova_pendings';
		$one_week_ahead = date( 'Y-m-d', strtotime( '+1 week' ) );

		$query            = $wpdb->prepare( "SELECT * FROM {$table_name} WHERE payment_date <= %s AND payment_status = %s", $one_week_ahead, 'Pending' );
		$pending_payments = $wpdb->get_results( $query );

		foreach ( $pending_payments as $payment ) {

			$customer = $this->get_billing_information_from_payment( $payment );

			$customer_email = $customer['email'];

			if ( $customer_email ) {
				$this->send_payment_reminder_email( $customer_email, $payment );
			}
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

		// Fetch data from the custom table
		$results = $wpdb->get_results( "SELECT id, name, original_order, payment_order, deposit, pending_total, currency, payment_date, payment_select, payment_status FROM {$table_name} ORDER BY {$order_by} ASC", ARRAY_A );

		// Start building the HTML content
		echo '<div class="wrap">';
		echo '<h1>Pending Payments</h1>';

		if ( isset( $_GET['reminder_sent'] ) && $_GET['reminder_sent'] == 'true' ) {
			echo '<div class="notice notice-success is-dismissible"><p>Reminder email sent successfully.</p></div>';
		}

		// Filter form
		echo '<form method="get">';
		echo '<input type="hidden" name="page" value="pending-payments"/>'; // Keep the current page
		echo '<button type="submit" name="order_by" value="payment_date">Order by Payment Date</button>';
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
		echo '<th>Currency</th>';
		echo '<th>Payment Date</th>';
		echo '<th>Payment Select</th>';
		echo '<th>Payment Status</th>';
		echo '<th>Send Reminder Email</th>';
		echo '<th></th>';
		echo '</tr>';
		echo '</thead>';
		echo '<tbody>';

		// Check if there are any results
		if ( ! empty( $results ) ) {
			foreach ( $results as $row ) {
				echo '<tr>';
				echo "<td>{$row['name']}</td>";
				$order_edit_link1 = admin_url( 'post.php?post=' . absint( $row['original_order'] ) . '&action=edit' );
				echo "<td><a href='{$order_edit_link1}'>#{$row['original_order']}</a></td>";
				$order_edit_link = admin_url( 'post.php?post=' . absint( $row['payment_order'] ) . '&action=edit' );
				echo "<td><a href='{$order_edit_link}'>#{$row['payment_order']}</a></td>";
				echo "<td>{$row['deposit']}</td>";
				echo "<td>{$row['pending_total']}</td>";
				echo "<td>{$row['currency']}</td>";
				echo "<td>{$row['payment_date']}</td>";
				echo '<td>' . get_the_title( $row['payment_select'] ) . '</td>';
				echo "<td>{$row['payment_status']}</td>";
				echo '<td>';
				echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
				echo '<input type="hidden" name="action" value="send_payment_reminder"/>';
				echo '<input type="hidden" name="payment_id" value="' . esc_attr( $row['id'] ) . '"/>';
				wp_nonce_field( 'send_reminder_action', 'send_reminder_nonce' );
				echo '<input type="submit" class="button action" value="Send Reminder"/>';
				echo '</form>';
				echo '</td>';
				echo '<td>';
				echo '<form method="post" action="' . admin_url( 'admin-post.php' ) . '" onsubmit="return confirm(\'Are you sure you want to delete this order?\');">';
				echo '<input type="hidden" name="action" value="delete_pending_payment"/>';
				echo '<input type="hidden" name="delete_order_id" value="' . esc_attr( $row['id'] ) . '"/>';
				wp_nonce_field( 'delete_order_action', 'delete_order_nonce' );
				echo '<input type="submit" class="button action" value="Delete"/>';
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
	}



	public function create_custom_table() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'nova_pendings';  // Prefixing the table name is a good practice

		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			name tinytext NOT NULL,
			original_order mediumint(9) NOT NULL,
			payment_order mediumint(9) NOT NULL,
			deposit varchar(55) NOT NULL,
			pending_total varchar(55) NOT NULL,
			original_total varchar(55) NOT NULL,
			currency varchar(10) NOT NULL,
			payment_date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
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
