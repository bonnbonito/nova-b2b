<?php

namespace NOVA_B2B;

class Deposit {

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
		// Hook to initialize payment functionality
		add_action( 'init', array( $this, 'create_payment_table' ) );
		// add_action( 'woocommerce_before_thankyou', array( $this, 'insert_payment_record' ) );
		add_action( 'woocommerce_before_thankyou', array( $this, 'insert_nova_meta' ), 10, 1 );
		// add_action( 'woocommerce_thankyou', array( $this, 'thank_you_actions' ), 10, 1 );
		add_action( 'woocommerce_order_after_calculate_totals', array( $this, 'adjust_order_total_based_on_payments' ), 9999, 2 );
		add_action( 'woocommerce_admin_order_totals_after_total', array( $this, 'display_payments_in_admin' ) );
		add_action( 'woocommerce_checkout_update_order_review', array( $this, 'handle_deposit_option' ) );
		add_filter( 'woocommerce_calculated_total', array( $this, 'apply_deposit_percentage' ), 9999, 2 );
		add_action( 'woocommerce_checkout_order_processed', array( $this, 'insert_payment_record' ), 20, 3 );
		add_filter( 'woocommerce_order_needs_payment', array( $this, 'order_needs_payment' ), 10, 2 );
		add_filter( 'woocommerce_order_get_date_paid', array( $this, 'order_get_date_paid' ), 10, 2 );
		add_filter( 'wc_order_is_editable', array( $this, 'order_is_editable' ), 10, 2 );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'deposit_insert_order_total_row' ), 90, 2 );
		add_filter( 'woocommerce_order_is_paid', array( $this, 'order_is_paid' ), 10, 2 );
		add_action( 'nova_pending_payments_after_content', array( $this, 'pending_page_after_content' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_nova_scripts' ) );
		add_action( 'woocommerce_order_status_completed', array( $this, 'needs_payment_update' ), 99 );
		add_action( 'woocommerce_order_status_delivered', array( $this, 'insert_delivered_date' ) );
		add_action( 'woocommerce_order_status_shipped', array( $this, 'insert_shipped_date' ) );
		add_action( 'woocommerce_before_cart', array( $this, 'remove_wc_sessions_on_cart' ) );
		add_action( 'woocommerce_review_order_before_submit', array( $this, 'output_deposit_selection' ) );
		add_filter( 'woocommerce_payment_complete_order_status', array( $this, 'change_payment_status' ), 10, 3 );
		add_filter( 'woocommerce_bacs_process_payment_order_status', array( $this, 'change_onhold_status' ), 99, 2 );
	}

	public function change_onhold_status( $on_hold, $order ) {
		/** if current user is admin */
		if ( is_admin() ) {
			return $old_status;
		}

		return $on_hold;
	}

	public function change_payment_status( $order_status, $order_id, $order ) {
		$status         = $order->get_status();
		$delivered_date = get_post_meta( $order_id, 'delivered_date', true );

		if ( ! $delivered_date ) {
			return $status;
		}

		return $order_status;
	}

	public function remove_wc_sessions_on_cart() {
		WC()->session->__unset( 'deposit_chosen' );
		WC()->session->__unset( 'deposit_amount' );
		WC()->session->__unset( 'pending_amount' );
	}

	public function insert_emails_meta( $order, $deposit_chosen ) {

		if ( have_rows( 'payment_emails', $deposit_chosen ) ) {
			while ( have_rows( 'payment_emails', $deposit_chosen ) ) {
				the_row();
				$key = 'payment_email_key_' . $deposit_chosen . '_' . get_row_index();
				$order->update_meta_data( $key, false );
			}
		}
	}

	public function insert_delivered_date( $order_id ) {
		$today = date( 'Ymd' );
		update_post_meta( $order_id, 'delivered_date', $today );
	}
	public function insert_shipped_date( $order_id ) {
		$today = date( 'Ymd' );
		update_post_meta( $order_id, 'shipped_date', $today );
	}

	public function needs_payment_update( $order_id ) {
		$order          = wc_get_order( $order_id );
		$needs_payment  = $order->get_meta( 'needs_payment' );
		$second_payment = $order->get_meta( 'second_payment' );
		if ( $needs_payment ) {
			delete_post_meta( $order_id, 'needs_payment' );
		}
	}


	public function thank_you_actions( $order_id ) {
	}

	public function insert_nova_meta( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( $order ) {
			update_post_meta( $order_id, '_nova_new_order', true );
		}
	}

	public function order_actions( $order ) {
		$actions = array();

		if ( $order->get_status() === 'pending' ) {
			$actions['pay'] = array(
				'name'  => __( 'Pay', 'woocommerce' ),
				'url'   => $order->get_checkout_payment_url(),
				'class' => 'button',
			);
		}

		return $actions;
	}

	public function get_pending_payments() {

		global $wpdb;
		$pending_payments = array();

		$table_name = $wpdb->prefix . 'order_payments';

		// Get all data from the table
		$results = $wpdb->get_results(
			$wpdb->prepare( "SELECT * FROM $table_name" )
		);

		foreach ( $results as $result ) {

			$order_id = $result->order_id;
			$order    = wc_get_order( $order_id );

			if ( ! $order ) {
				continue;
			}

			$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );
			$delivered_date        = $order->get_meta( 'delivered_date' );

			if ( $manual_delivered_date ) {
				$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );
				if ( $date_obj ) {
					$delivered_date = $date_obj->format( 'F d, Y' );
				}
			}
			$total = $order->get_total();

			$pending_payments[] = array(
				'order_id'        => $result->order_id,
				'order_number'    => '#' . $order->get_order_number(),
				'deposit_chosen'  => $order->get_meta( '_deposit_chosen_title' ),
				'deposit_amount'  => wc_price( $order->get_meta( '_deposit_amount' ), array( 'currency' => $order->get_currency() ) ),
				'total'           => $total,
				'total_amount'    => wc_price( $total, array( 'currency' => $order->get_currency() ) ),
				'payment_date'    => $result->payment_date,
				'customer_name'   => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
				'order_status'    => wc_get_order_status_name( $order->get_status() ),
				'delivered_date'  => $delivered_date,
				'order_admin_url' => admin_url( 'post.php?post=' . $order_id . '&action=edit' ),
				'order_actions'   => $this->order_actions( $order ),
			);

		}

		return $pending_payments;
	}

	public function enqueue_nova_scripts() {
		// Get the current screen
		$screen = get_current_screen();

		// Check if we're on the pending payments page
		if ( isset( $screen->id ) && 'woocommerce_page_pending-payments' === $screen->id ) {
			wp_enqueue_style( 'nova-deposits', get_stylesheet_directory_uri() . '/deposits/assets/css/dist/output.css', array(), wp_get_theme()->get( 'Version' ) );

			wp_enqueue_script( 'nova-deposits', get_stylesheet_directory_uri() . '/deposits/build/index.js', array( 'wp-element' ), wp_get_theme()->get( 'Version' ), true );

			wp_localize_script(
				'nova-deposits',
				'NovaDeposits',
				array(
					'ajax_url'         => admin_url( 'admin-ajax.php' ),
					'nonce'            => wp_create_nonce( 'nonce' ),
					'pending_payments' => $this->get_pending_payments(),
				)
			);

		}
	}


	/**
	 * Create custom payment table
	 */
	public function create_payment_table() {
		global $wpdb;
		$table_name      = $wpdb->prefix . 'order_payments';
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
			id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			order_id bigint(20) UNSIGNED NOT NULL,
			amount decimal(10, 2) NOT NULL,
			payment_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
			PRIMARY KEY  (id)
		) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}

	public function second_payment_action( $order_id, $posted_data, $order ) {
	}

	/**
	 * Insert payment record into the custom table
	 */
	public function insert_payment_record( $order_id, $posted_data, $order ) {

		$deposit_chosen = WC()->session->get( 'deposit_chosen' );

		if ( ! $deposit_chosen || $deposit_chosen == '0' ) {
			return;
		}

		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$order = wc_get_order( $order_id );

		if ( $order->has_status( 'failed' ) ) {
			return;
		}

		$second_payment = WC()->session->get( 'second_payment' );
		if ( $second_payment ) {
			update_post_meta( $order_id, 'second_payment', true );
			WC()->session->__unset( 'second_payment' );
		}

		/** Check if order_id is already in the table */

		$order_id_in_table = $wpdb->get_var(
			"
		SELECT order_id
		FROM {$table_name}
		WHERE order_id = {$order_id}
		"
		);

		if ( $order_id_in_table ) {
			return;
		}

		$inserted = $wpdb->insert(
			$table_name,
			array(
				'order_id'      => $order_id,
				'amount'        => $order->get_total(),
				'payment_date'  => current_time( 'mysql' ),
				'needs_payment' => 1,
			),
			array( '%d', '%f', '%s', '%d' )
		);

		if ( $inserted ) {

			$deposit_amount = WC()->session->get( 'deposit_amount' );
			$pending_amount = WC()->session->get( 'pending_amount' );

			update_post_meta( $order_id, '_deposit_chosen', $deposit_chosen );
			update_post_meta( $order_id, '_deposit_chosen_title', get_the_title( $deposit_chosen ) );
			update_post_meta( $order_id, '_pending_amount', $pending_amount );
			update_post_meta( $order_id, '_deposit_amount', $deposit_amount );
			update_post_meta( $order_id, 'needs_payment', true );

			// $this->insert_emails_meta( $order, $deposit_chosen );

			WC()->session->__unset( 'deposit_chosen' );
			WC()->session->__unset( 'deposit_amount' );
			WC()->session->__unset( 'pending_amount' );

			$order->calculate_totals();
		}
	}

	/**
	 * Adjust order total based on payments in the custom table
	 */
	public function adjust_order_total_based_on_payments( $and_taxes, $order ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$payments = $wpdb->get_results(
			$wpdb->prepare( "SELECT amount FROM $table_name WHERE order_id = %d", $order->get_id() )
		);

		if ( $payments ) {
			$total = $order->get_total();
			$paid  = 0.00;

			foreach ( $payments as $payment ) {
				$paid += $payment->amount;
			}

			$new_total = $total - $paid;
			$order->set_total( $new_total );

			if ( $new_total > 0 ) {
				// $order->set_status( 'pending' );
			}
			$order->save();
		}
	}

	/**
	 * Display payments in the WooCommerce admin order totals section
	 */
	public function display_payments_in_admin( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$order = wc_get_order( $order_id );

		echo '<tr><td class="label">Payments:</td><td width="1%"></td><td class="total"><ul style="margin:0">';

		$payments = $wpdb->get_results(
			$wpdb->prepare( "SELECT * FROM $table_name WHERE order_id = %d", $order_id )
		);

		if ( $payments ) {
			foreach ( $payments as $payment ) {
				echo '<li style="margin:0">' . wc_price( $payment->amount, array( 'currency' => $order->get_currency() ) ) . ' (' . date( 'd-m-y', strtotime( $payment->payment_date ) ) . ')</li>';
			}
		}

		echo '</ul></td></tr>';
	}

	/**
	 * Handle deposit options on checkout page
	 */
	public function handle_deposit_option( $posted_data ) {
		parse_str( $posted_data, $output );
		$deposit_chosen = isset( $output['deposit_chosen'] ) ? $output['deposit_chosen'] : 0;
		WC()->session->set( 'deposit_chosen', $deposit_chosen );
	}

	/**
	 * Apply deposit percentage on total
	 */
	public function apply_deposit_percentage( $total, $cart ) {
		$payment_select = WC()->session->get( 'deposit_chosen' );
		if ( ! $payment_select || $payment_select == '0' ) {
			WC()->session->set( 'deposit_amount', 0 );
			WC()->session->set( 'pending_amount', 0 );
			return $total;
		}
		$deposit   = get_field( 'deposit', $payment_select ) / 100;
		$new_total = $total * $deposit;
		WC()->session->set( 'pending_amount', $total - $new_total );
		return $new_total;
	}

	public function order_needs_payment( $needs_payment, $order ) {
		if ( $order->get_meta( 'needs_payment' ) ) {
			return true;
		}
		return $needs_payment;
	}

	public function order_is_paid( $is_paid, $order ) {
		$needs_payment = $order->get_meta( 'needs_payment' );
		if ( $needs_payment ) {
			return false;
		}
		return $is_paid;
	}

	public function order_get_date_paid( $date_paid, $order ) {
		if ( $order->get_meta( 'needs_payment' ) ) {
			return false;
		}
		return $date_paid;
	}

	public function order_is_editable( $editable, $order ) {
		if ( $order->get_meta( 'needs_payment' ) && $order->get_status() !== 'completed' ) {
			return true;
		}
		return $editable;
	}

	public function deposit_insert_order_total_row( $total_rows, $order ) {
		$deposit_title = get_post_meta( $order->get_id(), '_deposit_chosen_title', true );
		if ( $deposit_title ) {
			$deposit_amount = get_post_meta( $order->get_id(), '_deposit_amount', true );
			$new_rows       = array();

			foreach ( $total_rows as $key => $total ) {
				// Insert the deposit details before the order total
				if ( 'order_total' === $key ) {
					// Add deposit title and amount rows
					$new_rows['deposit_title']  = array(
						'label' => __( 'Payment Type:', 'nova-b2b' ),
						'value' => $deposit_title,
					);
					$new_rows['deposit_amount'] = array(
						'label' => __( 'Deposit:', 'nova-b2b' ),
						'value' => '-' . wc_price( $deposit_amount, array( 'currency' => $order->get_currency() ) ),
					);
				}

				// Always add the existing rows
				$new_rows[ $key ] = $total;
			}

			return $new_rows;
		}

		return $total_rows;
	}

	public function pending_page_after_content() {
		?>
<div class="wrap">
	<div id="depositTable"></div>

</div>
		<?php
	}

	public function output_deposit_selection() {
		$woo_instance = \NOVA_B2B\Woocommerce::get_instance();
		if ( ! $woo_instance ) {
			return;
		}
		$payments_selection = $woo_instance->get_payment_selections();

		if ( ! $payments_selection ) {
			return;
		}

		$chosen = WC()->session->get( 'deposit_chosen' );
		$chosen = empty( $chosen ) ? WC()->checkout->get_value( 'deposit_chosen' ) : $chosen;
		$chosen = empty( $chosen ) ? '0' : $chosen;
		?>
<fieldset>
	<legend class="px-4 uppercase"><span><?php esc_html_e( 'Payment Type', 'woocommerce' ); ?></span></legend>
	<div class="grid md:grid-cols-3 gap-4 update_totals_on_change">
		<div class="cursor-pointer h-full">
			<label for="payment_0"
				class="block h-full justify-end p-3 border rounded-md w-full max-w-sm cursor-pointer hover:border-slate-500 hover:bg-slate-200 hover:shadow-lg">
				<input class="bg-none" id="payment_0" type="radio" name="deposit_chosen" value="0"
					<?php echo ( '0' == $chosen ? 'checked' : '' ); ?>>
				<span>Full</span>
				<span class="text-sm font-body block mt-2 hidden">Description</span>
			</label>
		</div>
		<?php
		foreach ( $payments_selection as $key => $selection ) {
			?>
		<div class="cursor-pointer h-full">
			<label for="payment_<?php echo $selection['id']; ?>"
				class="block h-full justify-end p-3 border rounded-md w-full max-w-sm cursor-pointer hover:border-slate-500 hover:bg-slate-200 hover:shadow-lg">
				<input class="bg-none" id="payment_<?php echo $selection['id']; ?>" type="radio" name="deposit_chosen"
					value="<?php echo $selection['id']; ?>" id="payment_<?php echo $selection['id']; ?>"
					<?php echo ( $selection['id'] == $chosen ? 'checked' : '' ); ?>>
				<span><?php echo $selection['title']; ?></span>
				<span class="text-sm font-body block mt-2"><?php echo $selection['description']; ?></span>
			</label>
		</div>
		<?php } ?>
	</div>
</fieldset>

		<?php
	}
}
