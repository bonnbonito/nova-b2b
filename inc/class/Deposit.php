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

	/**
	 * Insert payment record into the custom table on WooCommerce thank you page
	 */
	public function insert_payment_record( $order_id, $posted_data, $order ) {

		$deposit_chosen = WC()->session->get( 'deposit_chosen' );
		$second_payment = WC()->session->get( 'second_payment' );

		if ( ! $deposit_chosen || $deposit_chosen == '0' ) {
			return;
		}

		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$order = wc_get_order( $order_id );
		if ( $order->has_status( 'failed' ) ) {
			return;
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
				'order_id'     => $order_id,
				'amount'       => $order->get_total(),
				'payment_date' => current_time( 'mysql' ),
			),
			array( '%d', '%f', '%s' )
		);

		if ( $inserted ) {

			$deposit_amount = WC()->session->get( 'deposit_amount' );
			$pending_amount = WC()->session->get( 'pending_amount' );

			update_post_meta( $order_id, '_deposit_chosen', $deposit_chosen );
			update_post_meta( $order_id, '_deposit_chosen_title', get_the_title( $deposit_chosen ) );
			update_post_meta( $order_id, '_pending_amount', $pending_amount );
			update_post_meta( $order_id, '_deposit_amount', $deposit_amount );
			update_post_meta( $order_id, 'needs_payment', true );

			WC()->session->__unset( 'deposit_chosen' );
			WC()->session->__unset( 'deposit_amount' );
			WC()->session->__unset( 'pending_amount' );

			$order->calculate_totals();
		}

		if ( $second_payment ) {
			update_post_meta( $order_id, 'needs_payment', false );
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
}
