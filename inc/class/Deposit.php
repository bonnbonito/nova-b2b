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
		add_action( 'woocommerce_before_thankyou', array( $this, 'insert_payment_record' ) );
		add_action( 'woocommerce_order_after_calculate_totals', array( $this, 'adjust_order_total_based_on_payments' ), 9999, 2 );
		add_action( 'woocommerce_admin_order_totals_after_total', array( $this, 'display_payments_in_admin' ) );
		add_action( 'woocommerce_checkout_update_order_review', array( $this, 'handle_deposit_option' ) );
		add_filter( 'woocommerce_calculated_total', array( $this, 'apply_deposit_percentage' ), 9999, 2 );
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
	public function insert_payment_record( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$order = wc_get_order( $order_id );
		if ( $order->has_status( 'failed' ) ) {
			return;
		}

		$wpdb->insert(
			$table_name,
			array(
				'order_id'     => $order_id,
				'amount'       => $order->get_total(),
				'payment_date' => current_time( 'mysql' ),
			),
			array( '%d', '%f', '%s' )
		);

		$order->calculate_totals();
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
				$order->set_status( 'pending' );
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
		if ( isset( $output['deposit'] ) ) {
			WC()->session->set( 'deposit_chosen', $output['deposit'] );
		}
	}

	/**
	 * Apply deposit percentage on total
	 */
	public function apply_deposit_percentage( $total, $cart ) {
		if ( ! WC()->session->get( 'deposit_chosen' ) || WC()->session->get( 'deposit_chosen' ) == 'full' ) {
			return $total;
		}
		return $total * 0.3;
	}
}