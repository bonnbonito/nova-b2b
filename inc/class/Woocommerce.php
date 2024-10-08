<?php

namespace NOVA_B2B;

use WP_Query;
use function WC;
use WC_Order_Item_Shipping;
use function is_cart;

class Woocommerce {
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
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_specs' ), 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_faqs' ), 11 );
		add_filter( 'woocommerce_get_query_vars', array( $this, 'add_mockups_endpoint_query_var' ) );
		add_filter( 'query_vars', array( $this, 'add_pg_var' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'add_mockups_link_my_account' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'add_mockups_endpoints' ) );
		add_action( 'woocommerce_account_mockups_endpoint', array( $this, 'add_mockups_content' ) );
		add_action( 'woocommerce_account_mockups-drafts_endpoint', array( $this, 'mockups_drafts_content' ) );
		add_action( 'woocommerce_account_mockups-processing_endpoint', array( $this, 'mockups_processing_content' ) );
		add_action( 'woocommerce_account_mockups-payments_endpoint', array( $this, 'mockups_payments_content' ) );
		add_action( 'woocommerce_account_mockups-archived_endpoint', array( $this, 'mockups_archived_content' ) );
		add_action( 'woocommerce_account_mockups-view_endpoint', array( $this, 'mockups_view_content' ) );
		add_filter( 'woocommerce_endpoint_mockups_title', array( $this, 'mockups_endpoint_title' ), 10, 2 );
		add_action( 'init', array( $this, 'add_nested_mockups_rewrite_rules' ) );
		add_action( 'nova_account_navigation', array( $this, 'nova_account_navigation' ) );
		add_action( 'nova_inner_account_nav', array( $this, 'myaccount_nav_avatar' ) );
		add_action( 'woocommerce_account_content', array( $this, 'nova_account_title' ), 5 );
		// add_filter( 'woocommerce_add_cart_item_data', array( $this, 'nova_add_to_cart_meta' ), 10, 3 );
		add_filter( 'woocommerce_cart_item_name', array( $this, 'nova_change_product_name' ), 10, 3 );
		add_filter( 'woocommerce_cart_item_thumbnail', array( $this, 'remove_thumbnail_for_nova_product' ), 10, 3 );
		add_action( 'woocommerce_before_calculate_totals', array( $this, 'nova_custom_price_refresh' ) );
		add_action( 'woocommerce_after_cart_item_name', array( $this, 'nova_quote_display_signage' ), 20, 2 );
		add_action( 'woocommerce_order_item_name', array( $this, 'nova_quote_order_name' ), 10, 3 );
		add_action( 'woocommerce_checkout_create_order_line_item', array( $this, 'nova_create_order_line_item' ), 10, 4 );
		add_action( 'woocommerce_order_item_meta_end', array( $this, 'woocommerce_order_item_meta_end' ), 10, 4 );
		add_filter( 'woocommerce_order_item_class', array( $this, 'nova_woocommerce_order_item_class' ), 10, 3 );
		add_filter( 'woocommerce_hidden_order_itemmeta', array( $this, 'nova_hidden_order_itemmeta' ) );
		add_action( 'woocommerce_before_order_itemmeta', array( $this, 'nova_before_order_itemmeta' ), 10, 3 );
		add_filter( 'woocommerce_display_item_meta', array( $this, 'nova_display_item_meta' ), 10, 3 );
		add_action( 'woocommerce_checkout_order_created', array( $this, 'nova_checkout_order_created' ), 10, 1 );
		add_action( 'after_setup_theme', array( $this, 'edit_cart_summary_title' ) );
		add_action( 'woocommerce_cart_actions', array( $this, 'update_quantity_script' ) );
		add_action( 'woocommerce_after_add_to_cart_button', array( $this, 'update_single_quantity_script' ) );
		add_action( 'woocommerce_before_cart', array( $this, 'edit_cart_form_wrap_before' ), 1 );
		add_action( 'woocommerce_checkout_after_customer_details', array( $this, 'remove_checkout_coupon_form' ), 10 );
		add_filter( 'woocommerce_cart_totals_order_total_html', array( $this, 'woocommerce_cart_totals_order_total_html' ) );
		add_filter( 'woocommerce_endpoint_order-received_title', array( $this, 'order_received_title' ), 20, 2 );
		add_filter( 'woocommerce_thankyou_order_received_text', array( $this, 'woocommerce_thankyou_order_received_text' ), 20, 2 );
		add_shortcode( 'product_features', array( $this, 'product_features' ) );
		add_shortcode( 'product_guides', array( $this, 'product_guides' ) );
		add_shortcode( 'product_dropdown_nav', array( $this, 'product_dropdown_nav' ) );
		add_action( 'woocommerce_before_single_product', array( $this, 'show_product_dropdown_nav' ) );
		// add_action( 'woocommerce_edit_account_form', array( $this, 'my_account_billing_shipping_fields' ), 5 );
		// add_action( 'woocommerce_save_account_details', array( $this, 'save_my_account_billing_shipping_fields' ) );
		add_filter( 'woocommerce_currency_symbol', array( $this, 'currency_symbol' ), 10, 2 );
		add_filter( 'woocommerce_shipping_fields', array( $this, 'add_pst_field' ) );
		add_action( 'nova_signange_before_content', array( $this, 'show_product_dropdown_nav' ) );
		add_filter( 'woocommerce_package_rates', array( $this, 'custom_shipping_logic' ), 99999, 2 );
		add_action( 'wp_ajax_update_checkout_total', array( $this, 'handle_ajax_update_checkout_total' ) );
		add_action( 'wp_ajax_nopriv_update_checkout_total', array( $this, 'handle_ajax_update_checkout_total' ) );
		add_filter( 'woocommerce_cart_get_total', array( $this, 'custom_modify_cart_total' ), 10, 1 );
		add_action( 'woocommerce_checkout_order_processed', array( $this, 'create_adjusted_duplicate_order' ), 10, 3 );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'deposit_insert_order_total_row' ), 90, 2 );
		add_action( 'add_meta_boxes', array( $this, 'add_custom_meta_box_to_orders' ) );
		add_action( 'add_meta_boxes', array( $this, 'debug_order_meta' ) );
		add_action( 'woocommerce_admin_order_totals_after_tax', array( $this, 'add_deposit_row' ) );
		add_action( 'wp_ajax_populate_signage', array( $this, 'populate_signage' ) );
		add_action( 'wp_ajax_nopriv_populate_signage', array( $this, 'populate_signage' ) );
		add_filter( 'woocommerce_order_number', array( $this, 'customize_woocommerce_order_number' ), 10, 2 );
		add_filter( 'woocommerce_available_payment_gateways', array( $this, 'disable_bacs_for_non_admins' ) );
		add_filter( 'payment_types', array( $this, 'partner_payment_types' ) );
		add_filter( 'woocommerce_order_actions', array( $this, 'remove_send_invoice' ), 10, 2 );
		add_filter( 'woocommerce_admin_order_actions', array( $this, 'remove_recalculate' ), 10, 2 );
		add_filter( 'wcumcs_custom_item_price_final', array( $this, 'change_to_custom_price' ), 9999999, 4 );
		add_filter( 'woocommerce_checkout_fields', array( $this, 'require_pst_on_bc' ) );
		add_filter( 'woocommerce_quantity_input_args', array( $this, 'quantity_input_args' ), 40, 2 );
		add_filter( 'woocommerce_before_cart_contents', array( $this, 'change_max_value' ) );
		add_filter( 'woocommerce_order_get_total', array( $this, 'custom_order_total_based_on_meta' ), 10, 2 );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'add_tracking_and_carrier_to_email_table' ), 99, 3 );
		add_filter( 'woocommerce_shipstation_export_order', array( $this, 'shipstation_not_export_order' ), 10, 2 );
		add_action( 'init', array( $this, 'set_currency_cookie_based_on_billing_country' ), 999 );
		add_action( 'option_wcumcs_available_currencies', array( $this, 'list_of_currencies' ), 10, 2 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'change_order_email_headings' ), 20, 2 );
		add_filter( 'woocommerce_order_after_calculate_totals', array( $this, 'modify_order_total' ), 20, 2 );
		add_filter( 'woocommerce_order_after_calculate_totals', array( $this, 'custom_adjust_order_calculated_tax' ), 19, 2 );
		add_filter( 'user_has_cap', array( $this, 'order_pay_without_login' ), 9999, 3 );
		add_filter( 'woocommerce_order_email_verification_required', '__return_false', 9999 );
		add_action( 'template_redirect', array( $this, 'remove_login_form_on_thankyou_page' ) );
		add_filter( 'woocommerce_order_received_verify_known_shoppers', '__return_false', 9999 );
		add_action( 'woocommerce_new_customer_note', array( $this, 'save_tracking_details_to_order_meta_from_note' ) );
		add_filter( 'woocommerce_is_sold_individually', array( $this, 'set_products_individual' ), 10, 2 );
		add_filter( 'views_edit-shop_order', array( $this, 'add_hidden_orders_subsubsub_link' ) );
		add_filter( 'request', array( $this, 'filter_orders_by_hidden_status' ) );
		add_action( 'woocommerce_thankyou', array( $this, 'move_product_to_trash_after_order' ), 10, 1 );
		add_filter( 'wpo_wcpdf_woocommerce_totals', array( $this, 'invoice_order_totals' ), 10, 3 );
		add_filter( 'woocommerce_order_get_total', array( $this, 'set_order_total_to_meta_value' ), 10, 2 );
		// add_filter( 'woocommerce_calc_tax', array( $this, 'debug_woocommerce_tax_calculation' ), 9999, 5 );
		// add_filter( 'woocommerce_calc_shipping_tax', array( $this, 'debug_woocommerce_shipping_tax_calculation' ), 9999, 3 );
		// add_action( 'woocommerce_order_item_fee_after_calculate_taxes', array( $this, 'debug_after_fees' ), 99, 2 );
		add_filter( 'woocommerce_cart_tax_totals', array( $this, 'custom_adjust_calculated_tax' ), 20, 2 );
		add_filter( 'woocommerce_calculated_total', array( $this, 'nova_calculated_total' ), 9, 2 );
		add_action( 'woocommerce_checkout_create_order', array( $this, 'order_adjust_tax' ), 99, 2 );
		// add_action( 'woocommerce_checkout_create_order', array( $this, 'order_creating' ), 10, 2 );
		add_filter( 'woocommerce_order_get_tax_totals', array( $this, 'order_get_tax_totals' ), 10, 2 );
		add_action( 'woocommerce_before_account_orders', array( $this, 'change_formatted_order_total' ) );
		add_action( 'woocommerce_after_account_orders', array( $this, 'remove_show_total_from_payment_order' ) );
		add_filter( 'woocommerce_shop_order_search_fields', array( $this, 'order_name_search_fields' ) );
		// add_action( 'pre_get_posts', array( $this, 'custom_search_by_order_number_in_admin' ) );
	}

	public function custom_search_by_order_number_in_admin( $query ) {
		global $pagenow, $wpdb;

		// Check if we are in the admin area and searching shop orders
		if ( is_admin() && 'edit.php' === $pagenow && isset( $_GET['post_type'] ) && 'shop_order' === $_GET['post_type'] && ! empty( $_GET['s'] ) ) {

			$search_query = sanitize_text_field( $_GET['s'] );

			// Check if the search query starts with #NV
			if ( strpos( $search_query, '#NV' ) === 0 ) {
				// Remove the # and perform a meta query on the '_order_number' field
				$order_number = substr( $search_query, 1 );

				// Modify the query to search for the custom order number
				$query->set(
					'meta_query',
					array(
						array(
							'key'     => '_order_number',
							'value'   => $order_number,
							'compare' => 'LIKE',
						),
					)
				);

				// Remove the default search query so it doesn't interfere
				$query->set( 's', '' );
			}
		}
	}

	public function order_name_search_fields( $search_fields ) {
		// Add '_order_number' to the search fields
		$search_fields[] = '_order_number';

		return $search_fields;
	}

	public function remove_show_total_from_payment_order() {
		remove_filter( 'woocommerce_get_formatted_order_total', array( $this, 'show_total_from_payment_order' ), 20, 4 );
	}

	public function change_formatted_order_total() {
		add_filter( 'woocommerce_get_formatted_order_total', array( $this, 'show_total_from_payment_order' ), 20, 4 );
	}

	public function show_total_from_payment_order( $formatted_total, $order, $tax_display, $display_refunded ) {
		if ( $order->get_meta( '_adjusted_duplicate_order_id' ) ) {
			$payment_order        = $order->get_meta( '_adjusted_duplicate_order_id' );
			$payment_order_object = wc_get_order( $payment_order );
			$formatted_total      = $payment_order_object->get_formatted_order_total();
		}
		return $formatted_total;
	}

	public function order_get_tax_totals( $tax_totals, $order ) {

		// $_order_tax = $order->get_meta( '_order_tax' );

		foreach ( $tax_totals as $key => $tax_total ) {

			$rate_id                              = $tax_total->rate_id;
			$tax_rate                             = \WC_Tax::get_rate_percent_value( $rate_id );
			$tax_totals[ $key ]->amount           = $this->calculate_correct_tax( $order, $tax_rate );
			$tax_totals[ $key ]->formatted_amount = wc_price( $tax_totals[ $key ]->amount, array( 'currency' => $order->get_currency() ) );
		}
		// print_r( $tax_totals );
		return $tax_totals;
	}

	public function get_rate_percent_value_from_order( $order ) {
		$taxes = $order->get_taxes();

		$rate_percent = false;

		foreach ( $taxes as $tax_item ) {
			$rate_percent = $tax_item->get_rate_percent();
		}

		return $rate_percent;
	}

	public function calculate_correct_tax( $order, $tax_rate ) {

		$order_subtotal = $order->get_subtotal();
		$shipping_total = $order->get_shipping_total();

		// Calculate the subtotal including shipping
		$subtotal = $order_subtotal + $shipping_total;

		return floatval( $subtotal * ( $tax_rate / 100 ) );
	}

	public function order_adjust_tax( $order, $data ) {

		$order_subtotal = $order->get_subtotal();
		$shipping_total = $order->get_shipping_total();

		// Calculate the subtotal including shipping
		$subtotal = $order_subtotal + $shipping_total;

		$taxes = $order->get_taxes();
		foreach ( $taxes as $tax_item ) {
			$rate_percent = $tax_item->get_rate_percent() / 100;

			$total_tax = $subtotal * $rate_percent;

			$tax_item->set_tax_total( $total_tax );
		}

		$order->set_discount_tax( $total_tax );
		$order->set_cart_tax( $total_tax );
	}

	public function nova_calculated_total( $total, $cart ) {
		$customer    = WC()->customer;
		$customer_id = $customer->get_id();

		$cart_total = $cart->get_subtotal();
		$shipping   = $cart->get_shipping_total();

		$subtotal = $cart_total + $shipping;

		$instance = \NOVA_B2B\Scripts::get_instance();
		$tax_rate = false;
		if ( $instance ) {
			$tax = $instance->get_woocommerce_tax_rate_by_country_and_state( $customer_id, '', '' );

			if ( $tax ) {
				$tax_rate = floatval( $tax->tax_rate / 100 );
			}
		}

		if ( ! $tax_rate ) {
			return $total;
		}

		$computed_tax = $subtotal * $tax_rate;
		$total        = $subtotal + $computed_tax;

		return $total;
	}

	public function custom_adjust_calculated_tax( $tax_totals, $cart ) {
		$customer    = WC()->customer;
		$customer_id = $customer->get_id();

		$currency = get_woocommerce_currency();

		$cart_total = $cart->get_subtotal();
		$shipping   = $cart->get_shipping_total();

		$subtotal = $cart_total + $shipping;

		// Get the tax rates for the specified location
		$instance = \NOVA_B2B\Scripts::get_instance();
		$tax_rate = false;
		if ( $instance ) {
			$tax = $instance->get_woocommerce_tax_rate_by_country_and_state( $customer_id, '', '' );

			if ( $tax ) {
				$tax_rate = floatval( $tax->tax_rate / 100 );
			}
		}

		if ( ! $tax_rate ) {
			return $tax_totals;
		}

		foreach ( $tax_totals as $key => $tax_total ) {
			$computed_tax                         = $subtotal * $tax_rate;
			$tax_totals[ $key ]->amount           = $computed_tax;
			$formatted_amount                     = wc_price( $computed_tax, array( 'currency' => $currency ) );
			$tax_totals[ $key ]->formatted_amount = $formatted_amount;
		}

		return $tax_totals;
	}

	public function debug_after_fees( $order, $fees ) {
		print_r( 'Fees: ' . print_r( $fees, true ) );
		echo '<br>';
	}

	public function debug_woocommerce_shipping_tax_calculation( $taxes, $price, $rates ) {
		// Log the input parameters for debugging
		print_r( 'Prices: ' . print_r( $price, true ) );
		echo '<br>';
		print_r( 'Rates: ' . print_r( $rates, true ) );
		echo '<br>';

		// Log the calculated taxes
		print_r( 'Calculated Taxes: ' . print_r( $taxes, true ) );
		echo '-------------------------------------------------------------------------------<br>';

		return $taxes;
	}

	public function debug_woocommerce_tax_calculation( $taxes, $price, $rates, $price_includes_tax, $surcharge ) {
		// Log the input parameters for debugging
		print_r( 'Price: ' . print_r( $price, true ) );
		echo '<br>';
		print_r( 'Rates: ' . print_r( $rates, true ) );
		echo '<br>';
		print_r( 'Price includes tax: ' . print_r( $price_includes_tax, true ) );
		echo '<br>';
		print_r( 'Surcharge: ' . print_r( $surcharge, true ) );
		echo '<br>';

		// Log the calculated taxes
		print_r( 'Calculated Taxes: ' . print_r( $taxes, true ) );

		return $taxes;
	}

	public function add_pg_var( $vars ) {
		$vars[] = 'pg';
		return $vars;
	}

	public function set_order_total_to_meta_value( $total, $order ) {
		if ( ! is_a( $order, 'WC_Order' ) ) {
			return $total;
		}

		if ( ! $order->get_meta( '_from_order_id' ) ) {
			return $total;
		}

		$over_all_total = $order->get_meta( '_pending_payment' );

		if ( isset( $over_all_total ) && is_numeric( $over_all_total ) ) {
			$total = (float) $over_all_total;
		}

		return $total;
	}

	public function invoice_order_totals( $totals, $order, $type ) {
		if ( isset( $totals['overall_total']['value'] ) && ! empty( $totals['overall_total']['value'] ) ) {
			$totals['order_total']['value'] = $totals['overall_total']['value'];

			$pending_payment = floatval( $order->get_meta( '_pending_payment' ) );
			if ( $pending_payment > 0 ) {
				$totals['order_total']['value'] = wc_price( $pending_payment, array( 'currency' => $order->get_currency() ) );
			}
		}

		$refunds      = $order->get_refunds();
		$refund_array = array();

		if ( $refunds ) {
			$refund_array[] = array(
				'label' => 'Previous Total:',
				'value' => $totals['order_total']['value'],
			);
			foreach ( $refunds as $refund ) {
				$refund_array[] = array(
					'label' => 'Refund: (' . $refund->get_reason() . ')',
					'value' => '<span style="color: red;">-' . wc_price( $refund->get_amount(), array( 'currency' => $order->get_currency() ) ) . '</span>',
				);
			}

			$refund_total = array_sum( wp_list_pluck( $refunds, 'amount' ) ); // use 'amount' instead of 'total'
			$new_total    = floatval( $order->get_total() ) - floatval( $refund_total ); // corrected calculation

			$totals['order_total']['value'] = wc_price( $new_total, array( 'currency' => $order->get_currency() ) );

			$position = array_search( 'order_total', array_keys( $totals ) );

			if ( $position !== false ) {
				// Split the array into two parts
				$array_before = array_slice( $totals, 0, $position, true );
				$array_after  = array_slice( $totals, $position, null, true );

				// Insert $refund_array before 'order_total'
				foreach ( $refund_array as $refund ) {
					$array_before[] = $refund;
				}

				// Merge the arrays back together
				$totals = $array_before + $array_after;
			}
		}

		return $totals;
	}


	public function move_product_to_trash_after_order( $order_id ) {
		if ( ! $order_id ) {
			return;
		}

		// Get the order object
		$order = wc_get_order( $order_id );

		// Loop through order items
		foreach ( $order->get_items() as $item_id => $item ) {
			// Ensure the item is a product item
			if ( $item instanceof \WC_Order_Item_Product ) {
				// Get the product ID
				$product_id = $item->get_product_id();

				// Check if the product exists and is not already in trash
				if ( get_post_status( $product_id ) != 'trash' ) {
					// Move the product to trash
					wp_trash_post( $product_id );
				}
			}
		}
	}

	public function add_hidden_orders_subsubsub_link( $views ) {
		global $wpdb;

		// Query to count orders with the '_hide_order' meta key set to true
		$hidden_count = $wpdb->get_var(
			"
        SELECT COUNT(*)
        FROM {$wpdb->posts} AS p
        JOIN {$wpdb->postmeta} AS pm ON p.ID = pm.post_id
        WHERE p.post_type = 'shop_order'
        AND p.post_status != 'trash'
        AND pm.meta_key = '_hide_order'
        AND pm.meta_value = '1'
    "
		);

		// Create the link for hidden orders
		$views['hidden_orders'] = sprintf(
			'<a href="%s">%s <span class="count">(%d)</span></a>',
			admin_url( 'edit.php?post_type=shop_order&_hide_order=true' ),
			__( 'Hidden Orders', 'your-text-domain' ),
			$hidden_count
		);

		return $views;
	}

	public function filter_orders_by_hidden_status( $vars ) {
		if ( isset( $_GET['_hide_order'] ) && 'true' === $_GET['_hide_order'] ) {
			$vars['meta_key']   = '_hide_order';
			$vars['meta_value'] = '1';
		}
		return $vars;
	}

	public function set_products_individual( $value, $product ) {

		$id = get_post_meta( $product->get_id(), 'product_id', true );

		if ( $id && get_field( 'sold_individually', $id ) ) {
			$value = 'yes';
		}

		return $value;
	}

	public function remove_login_form_on_thankyou_page() {
		if ( is_wc_endpoint_url( 'order-received' ) && ! is_user_logged_in() ) {
			remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_login_form', 10 );
			remove_action( 'woocommerce_before_checkout_form', 'woocommerce_output_all_notices', 10 );
		}
	}

	public function save_tracking_details_to_order_meta_from_note( $args ) {
		$order_id         = $args['order_id'];
		$payment_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );

		$note_content = $args['customer_note'];

		$details = $this->extractDetails( $note_content );

		if ( ! empty( $details['carrier'] ) ) {
			update_post_meta( $order_id, '_shipping_carrier', $details['carrier'] );
			if ( $payment_order_id ) {
				update_post_meta( $payment_order_id, '_shipping_carrier', $details['carrier'] );
			}
		}

		if ( ! empty( $details['tracking_number'] ) ) {
			update_post_meta( $order_id, '_tracking_number', $details['tracking_number'] );
			if ( $payment_order_id ) {
				update_post_meta( $payment_order_id, '_tracking_number', $details['tracking_number'] );
			}
		}

		if ( $payment_order_id ) {
			$payment_order = wc_get_order( $payment_order_id );
			$payment_order->add_order_note( $note_content, 0 );
		}
	}

	public function extractDetails( $str ) {
		// Get the string after "via" and before "on"
		preg_match( '/via (.*?) on/', $str, $matches1 );

		// Get the string after "tracking number", but exclude trailing period
		preg_match( '/tracking number (.*?)\.$/', $str, $matches2 );

		return array(
			'carrier'         => isset( $matches1[1] ) ? $matches1[1] : null,
			'tracking_number' => isset( $matches2[1] ) ? $matches2[1] : null,
		);
	}

	function order_pay_without_login( $allcaps, $caps, $args ) {
		if ( isset( $caps[0], $_GET['key'] ) ) {
			if ( $caps[0] == 'pay_for_order' ) {
				$order_id = isset( $args[2] ) ? $args[2] : null;
				$order    = wc_get_order( $order_id );
				if ( $order ) {
						$allcaps['pay_for_order'] = true;
				}
			}
		}
		return $allcaps;
	}

	public function modify_order_total( $and_taxes, $order ) {
		$order_id      = $order->get_id();
		$deposit_total = get_post_meta( $order_id, '_deposit_total', true );
		$payment_order = get_post_meta( $order_id, '_from_order_id', true );

		if ( $deposit_total && $payment_order ) {
			$deposit = floatval( $deposit_total );
			$total   = $order->get_total();

			if ( $total > 0 && $total >= $deposit ) {
				$total -= $deposit;
				$order->set_total( $total );
			}
		}
	}

	public function custom_adjust_order_calculated_tax( $and_taxes, $order ) {
		$customer_id = $order->get_user_id();

		$order_total = $order->get_subtotal();
		$shipping    = $order->get_shipping_total();

		$subtotal = $order_total + $shipping;

		// Get the tax rates for the specified location
		$instance = \NOVA_B2B\Scripts::get_instance();
		$tax_rate = false;
		if ( $instance ) {
			$tax = $instance->get_woocommerce_tax_rate_by_country_and_state( $customer_id, '', '' );

			if ( $tax ) {
				$tax_rate = floatval( $tax->tax_rate / 100 );
			}
		}

		if ( ! $tax_rate ) {
			return;
		}

		$computed_tax = $subtotal * $tax_rate;

		$order->set_discount_tax( $computed_tax );
		$order->set_cart_tax( $computed_tax );

		// Calculate the new order total
		$new_total = $subtotal + $computed_tax;
		$order->set_total( $new_total );
	}



	public function change_order_email_headings( $heading, $order ) {

		$adjusted_duplicate_order_id = $order->get_meta( '_adjusted_duplicate_order_id' );

		$from_order_id = $order->get_meta( '_from_order_id' );

		if ( $adjusted_duplicate_order_id ) {
			// Custom heading for orders with the meta key
			$heading = 'Your order is ready for delivery - #{order_number}';
			$heading = str_replace( '{order_number}', $order->get_order_number(), $heading );
		}

		if ( $from_order_id ) {
			$heading = 'Payment Received for Order #{order_number}';
			$heading = str_replace( '{order_number}', $order->get_order_number(), $heading );
		}

		return $heading;
	}

	public function list_of_currencies( $values, $option ) {
		if ( ! is_user_logged_in() || current_user_can( 'administrator' ) ) {
			return $values;
		}

		// Decode the JSON string into an associative array
		$values_array = json_decode( $values, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			// Error handling if JSON is not valid
			error_log( 'JSON decode error in list_of_currencies: ' . json_last_error_msg() );
			return $values; // Return the original string if there's an error
		}

		$user_id         = get_current_user_id();
		$billing_country = get_user_meta( $user_id, 'billing_country', true );

		if ( $billing_country === 'CA' ) {
			if ( isset( $values_array['USD'] ) ) {
				unset( $values_array['USD'] );
			}
		} elseif ( isset( $values_array['CAD'] ) ) {
			unset( $values_array['CAD'] );
		}

		// Encode the modified array back to JSON
		$modified_values = json_encode( $values_array );
		if ( json_last_error() !== JSON_ERROR_NONE ) {
			// Error handling if JSON encode fails
			error_log( 'JSON encode error in list_of_currencies: ' . json_last_error_msg() );
			return $values; // Return the original string if there's an error
		}

		return $modified_values;
	}


	public function set_currency_cookie_based_on_billing_country() {
		if ( ! is_user_logged_in() || current_user_can( 'administrator' ) ) {
			return;
		}

		$user_id         = get_current_user_id();
		$billing_country = get_user_meta( $user_id, 'billing_country', true );

		$new_currency = $billing_country === 'CA' ? 'CAD' : 'USD';

		// Check if the cookie exists and if its value matches the new currency
		if ( ! isset( $_COOKIE['wcumcs_user_currency_session'] ) || $_COOKIE['wcumcs_user_currency_session'] !== $new_currency ) {
			// Set or update the cookie if it does not exist or if the value is different
			wc_setcookie( 'wcumcs_user_currency_session', $new_currency, 0 );
		}
	}


	public function change_currency_based_on_shipping_country( $currency ) {
		if ( is_user_logged_in() ) {
			$user = wp_get_current_user();

			$shipping_country = get_user_meta( $user->ID, 'shipping_country', true );

			if ( $shipping_country == 'CA' ) {
				$currency = 'CAD';
			}
		}

		return $currency;
	}


	public function shipstation_not_export_order( $export, $order_id ) {
		$payment_order = get_post_meta( $order_id, '_from_order_id', true );
		if ( $payment_order ) {
			return false;
		}

		$manually_shipped = get_field( 'manual_delivered_date', $order_id );
		if ( $manually_shipped ) {
			return false;
		}

		return $export;
	}

	public function add_tracking_and_carrier_to_email( $order, $sent_to_admin, $plain_text, $email ) {
		if ( $email->id !== 'customer_completed_order' ) {
			return;
		}

		$order_id        = $order->get_id();
		$carrier         = $order->get_meta( '_shipping_carrier' );
		$tracking_number = $order->get_meta( '_tracking_number' );

		if ( $carrier || $tracking_number ) {
			echo '<h2>' . __( 'Shipping Details', 'woocommerce' ) . '</h2>';
			if ( $carrier ) {
				echo '<p><strong>' . __( 'Carrier:', 'woocommerce' ) . '</strong> ' . esc_html( $carrier ) . '</p>';
			}
			if ( $tracking_number ) {
				echo '<p><strong>' . __( 'Tracking Number:', 'woocommerce' ) . '</strong> ' . esc_html( $tracking_number ) . '</p>';
			}
		}
	}

	public function add_tracking_and_carrier_to_email_table( $total_rows, $order, $tax_display ) {
		$order_id = $order->get_id();

		$carrier         = $order->get_meta( '_shipping_carrier' );
		$tracking_number = $order->get_meta( '_tracking_number' );

		$new_rows = array();

		foreach ( $total_rows as $key => $total ) {
			$new_rows[ $key ] = $total;

			if ( 'shipping' === $key ) {
				if ( $carrier ) {
					$new_rows['carrier'] = array(
						'label' => __( 'Carrier:', 'woocommerce' ),
						'value' => $carrier,
					);
				}
				if ( $tracking_number ) {
					$new_rows['tracking_number'] = array(
						'label' => __( 'Tracking Number:', 'woocommerce' ),
						'value' => $tracking_number,
					);
				}
			}
		}
		return $new_rows;
	}

	public function custom_order_total_based_on_meta( $total, $order ) {
		// Check if the order has the required meta keys.
		$has_adjusted_id = get_post_meta( $order->get_id(), '_adjusted_duplicate_order_id', true );
		$deposit_total   = get_post_meta( $order->get_id(), '_deposit_total', true );

		if ( ! empty( $has_adjusted_id ) && ! empty( $deposit_total ) ) {
			return (float) $deposit_total;
		}

		return $total;
	}

	public function change_max_value() {
		add_filter( 'woocommerce_quantity_input_max', array( $this, 'quantity_input_max' ) );
	}

	public function quantity_input_args( $args, $product ) {
		$args['max_value'] = 100;
		return $args;
	}

	public function quantity_input_max( $max ) {
		$max = 100;
		return $max;
	}

	public function require_pst_on_bc( $fields ) {

		/**  function get_shipping_country() on null, return $fields */
		if ( ! WC()->customer->get_shipping_country() ) {
			return $fields;
		}

		$shipping_country = WC()->customer->get_shipping_country();
		$shipping_state   = WC()->customer->get_shipping_state();

		if ( 'CA' === $shipping_country && 'BC' === $shipping_state ) {
			$fields['shipping']['shipping_pst']['required'] = true;
		}

		return $fields;
	}


	public function change_to_custom_price( $final_price, $price, $product, $currency ) {

		if ( get_woocommerce_currency() == 'CAD' ) {
			$final_price = $price * 1.3;
		}

		return $final_price;
	}

	public function remove_recalculate( $actions, $order ) {
		// Check if the order has the '_from_order_id' meta key
		$from_order_id = get_post_meta( $order->get_id(), '_from_order_id', true );

		if ( ! empty( $from_order_id ) ) {
			// Remove the 'Recalculate' action
			unset( $actions['recalculate'] );
		}

		return $actions;
	}

	public function remove_send_invoice( $actions, $order ) {
		// Check if the order has the '_from_order_id' meta key
		$from_order_id = get_post_meta( $order->get_id(), '_from_order_id', true );

		if ( ! empty( $from_order_id ) ) {
			// Remove the 'Email Invoice / Order Details to Customer' action
			unset( $actions['send_order_details'] );
			unset( $actions['send_order_details_admin'] );
		}

		return $actions;
	}

	public function disable_bacs_for_non_admins( $available_gateways ) {

		$env      = wp_get_environment_type();
		$is_local = defined( 'WP_ENVIRONMENT_TYPE' ) && $env === 'local';

		if ( $is_local ) {
			return $available_gateways;
		}

		if ( ! current_user_can( 'manage_options' ) ) {

			if ( isset( $available_gateways['cheque'] ) ) {
				unset( $available_gateways['cheque'] );
			}

			if ( is_wc_endpoint_url( 'order-pay' ) ) {
				// Get the order ID from the URL
				$order_id = absint( get_query_var( 'order-pay' ) );
				// Get the order object
				$order = wc_get_order( $order_id );

				// Check if the order exists
				if ( $order ) {
					// Get the shipping state
					$shipping_state = $order->get_shipping_state();

					// Get Customer ID
					$customer_id   = $order->get_customer_id();
					$payment_types = $this->partner_payment_types( array(), $customer_id );
					/* check if payment_types is has title Net30 */

					$has_net30 = false;
					foreach ( $payment_types as $payment ) {
						if ( 'Net30' === $payment['title'] || 'Net 30' === $payment['title'] ) {
							$has_net30 = true;
							break;
						}
					}

					// Check if the shipping state is British Columbia (BC)
					if ( 'BC' === $shipping_state ) {
						if ( ! $has_net30 ) {
							if ( isset( $available_gateways['bacs'] ) ) {
								unset( $available_gateways['bacs'] );
							}
						}
					} elseif ( isset( $available_gateways['bacs'] ) ) {
							unset( $available_gateways['bacs'] );
					}
				}
			}

			if ( is_checkout() ) {
				// Get the customer shipping state from the cart or session
				$shipping_state = WC()->customer->get_shipping_state();

				$payment_types = $this->partner_payment_types( array(), get_current_user_id() );

				$has_net30 = false;
				foreach ( $payment_types as $payment ) {
					if ( 'Net30' === $payment['title'] || 'Net 30' === $payment['title'] ) {
						$has_net30 = true;
						break;
					}
				}

				// If the shipping state is not BC, remove BACS and Cheque for non-admin users
				if ( 'BC' === $shipping_state ) {
					if ( ! $has_net30 ) {
						if ( isset( $available_gateways['bacs'] ) ) {
							unset( $available_gateways['bacs'] );
						}
					}
				} elseif ( isset( $available_gateways['bacs'] ) ) {
						unset( $available_gateways['bacs'] );
				}
			}
		}

		return $available_gateways;
	}

	public function customize_woocommerce_order_number( $order_number, $order ) {
		$return = 'NV' . str_pad( $order_number, 5, '0', STR_PAD_LEFT );
		if ( $order->get_meta( '_po_number' ) ) {
			$return .= ' - (PO#: ' . $order->get_meta( '_po_number' ) . ')';
		}
		return $return;
	}

	public function add_deposit_row( $order_id ) {

		$order                           = wc_get_order( $order_id );
		$deposit_total                   = get_post_meta( $order_id, '_deposit_total', true );
		$payment_select                  = get_post_meta( $order_id, '_payment_select', true );
		$has_adjusted_duplicate_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$pending_payment                 = get_post_meta( $order_id, '_pending_payment', true );
		$original_total                  = get_post_meta( $order_id, '_original_total', true );
		$from_order                      = get_post_meta( $order_id, '_from_order_id', true );
		$original_tax_names              = get_post_meta( $order_id, '_original_tax_names', true );
		$original_tax                    = get_post_meta( $order_id, '_original_tax', true );
		$original_shipping               = get_post_meta( $order_id, '_original_shipping', true );
		$original_shipping_method        = get_post_meta( $order_id, '_original_shipping_method', true );

		if ( $original_tax_names && $original_tax && $from_order ) {
			?>
<tr>
	<td class="label"><?php echo 'Shipping (' . $original_shipping_method . ')'; ?>:</td>
	<td width="1%"></td>
	<td class="total">
			<?php
			if ( ! empty( $original_shipping ) ) {
				echo wc_price( $original_shipping, array( 'currency' => $order->get_currency() ) );
			}
			?>
	</td>
</tr>
			<?php
		}

		if ( $original_tax_names && $original_tax && $from_order ) {

			$from_order_object = wc_get_order( $from_order );
			$tax_rate          = $this->get_rate_percent_value_from_order( $from_order_object );
			$tax_total         = $this->calculate_correct_tax( $from_order_object, $tax_rate );
			?>
<tr>
	<td class="label"><?php echo $original_tax_names; ?>:</td>
	<td width="1%"></td>
	<td class="total">
			<?php
			if ( $tax_total ) {
				echo wc_price( $tax_total, array( 'currency' => $order->get_currency() ) );
			}
			?>
	</td>
</tr>
			<?php
		}

		if ( $original_total && $from_order && $from_order ) :

			?>
<tr>
			<?php if ( $original_tax_names ) : ?>
	<td class="label"><?php esc_html_e( 'Overall Total (+shipping & tax)', 'woocommerce' ); ?>:</td>
	<?php else : ?>
	<td class="label"><?php esc_html_e( 'Overall Total (+shipping)', 'woocommerce' ); ?>:</td>
	<?php endif; ?>
	<td width="1%"></td>
	<td class="total">
			<?php
			if ( ! empty( $original_total ) ) {
				echo wc_price( $original_total, array( 'currency' => $order->get_currency() ) );
			}
			?>
	</td>
</tr>

			<?php
			endif;

		if ( $payment_select ) {
			?>
<tr>
	<td class="label"><?php echo 'Payment Type'; ?>:</td>
	<td width="1%"></td>
	<td class="total">
		<strong><?php echo get_the_title( $payment_select ); ?></strong>
	</td>
</tr>
			<?php
		}

		if ( $deposit_total ) :

			if ( empty( $has_adjusted_duplicate_order_id ) ) :
				?>
<tr>
	<td class="label"><?php esc_html_e( 'Deposit', 'woocommerce' ); ?>:</td>
	<td width="1%"></td>
	<td class="total">
				<?php
				if ( ! empty( $deposit_total ) ) {
					echo '-' . wc_price( $deposit_total, array( 'currency' => $order->get_currency() ) );
				} else {
					echo wc_price( 0, array( 'currency' => $order->get_currency() ) );
				}
				?>
	</td>
</tr>

				<?php
				endif;

	endif;

		if ( $pending_payment && $has_adjusted_duplicate_order_id ) {
			?>
<tr>
	<td class="label"><?php esc_html_e( 'Pending Payment', 'woocommerce' ); ?>:</td>
	<td width="1%"></td>
	<td class="total">
			<?php
			if ( ! empty( $pending_payment ) ) {
				echo wc_price( $pending_payment, array( 'currency' => $order->get_currency() ) );
			} else {
				echo wc_price( 0, array( 'currency' => $order->get_currency() ) );
			}
			?>
	</td>
</tr>

			<?php
		}
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
		$has_adjusted_duplicate_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );

		// If the meta value exists, add the meta box
		if ( ! empty( $has_adjusted_duplicate_order_id ) ) {
			add_meta_box(
				'pending_payment_order',          // Unique ID for the meta box
				__( 'Pending Payment Order', 'woocommerce' ), // Title of the meta box
				array( $this, 'pending_payment_order_content' ), // Callback function to output the content
				'shop_order',                  // Post type
				'advanced',                    // Context (where on the screen)
				'default'                      // Priority
			);
		}
	}
	public function debug_order_meta() {
		global $pagenow, $post;

		// If current user id is not 1, return
		if ( get_current_user_id() !== 1 ) {
			return;
		}

		// Ensure we are on the post edit screen
		if ( 'post.php' !== $pagenow || 'shop_order' !== get_post_type() ) {
			return;
		}

		// Ensure the global $post object is set and retrieve the current order ID
		$order_id = isset( $post->ID ) ? $post->ID : false;

		if ( ! $order_id ) {
			return;
		}

		add_meta_box(
			'nova_debug_order',          // Unique ID for the meta box
			__( 'Order Meta', 'woocommerce' ), // Title of the meta box
			array( $this, 'debug_order_meta_content' ), // Callback function to output the content
			'shop_order',                  // Post type
			'advanced',                    // Context (where on the screen)
			'default'                      // Priority
		);
	}

	public function debug_order_meta_content( $post ) {
		echo '<pre>';
		print_r( get_post_meta( $post->ID ) );
		$order = wc_get_order( $post->ID );
		print_r( $order );
		echo '</pre>';
	}

	public function pending_payment_order_content( $post ) {
		// Output your custom content here. For example:
		$order_id       = get_post_meta( $post->ID, '_adjusted_duplicate_order_id', true );
		$original_total = get_post_meta( $post->ID, '_original_total', true );
		$payment_select = get_post_meta( $post->ID, '_payment_select', true );
		$order_edit_url = admin_url( 'post.php?post=' . $order_id . '&action=edit' );

		// print_r( get_post_meta( $post->ID ) );

		?>
<a href="<?php echo esc_url( $order_edit_url ); ?>" class="button button-primary">View Order</a>

<p>Original Total: <?php echo $original_total; ?></p>

		<?php
	}

	public function deposit_insert_order_total_row( $total_rows, $order ) {
		// Check if the order has the '_deposit_total' meta key
		$payment_order            = get_post_meta( $order->get_id(), '_adjusted_duplicate_order_id', true );
		$pending_payment          = get_post_meta( $order->get_id(), '_pending_payment', true );
		$payment_select           = get_post_meta( $order->get_id(), '_payment_select', true );
		$deposit_total            = get_post_meta( $order->get_id(), '_deposit_total', true );
		$from_order               = get_post_meta( $order->get_id(), '_from_order_id', true );
		$original_total           = get_post_meta( $order->get_id(), '_original_total', true );
		$original_shipping        = get_post_meta( $order->get_id(), '_original_shipping', true );
		$original_shipping_method = get_post_meta( $order->get_id(), '_original_shipping_method', true );
		$original_tax_names       = get_post_meta( $order->get_id(), '_original_tax_names', true );
		$original_tax             = get_post_meta( $order->get_id(), '_original_tax', true );

		if ( $from_order || $payment_order ) {

			// Initialize a new array for the modified total rows
			$new_total_rows = array();

			foreach ( $total_rows as $total_key => $total ) {
				$new_total_rows[ $total_key ] = $total;

				// Check if the current key is 'payment_method', then insert the deposit total
				if ( $total_key === 'shipping' ) {

					if ( $payment_select ) {
						$new_total_rows['payment_select'] = array(
							'label' => __( 'Payment Type:', 'woocommerce' ),
							'value' => get_the_title( $payment_select ),
						);
					}

					$new_total_rows['deposit_total'] = array(
						'label' => __( 'Deposit:', 'woocommerce' ),
						'value' => wc_price( -$deposit_total, array( 'currency' => $order->get_currency() ) ),
					);
				}
			}

			if ( $payment_order && $pending_payment ) {
				unset( $new_total_rows['order_total'] );
				$new_total_rows['pending_payment'] = array(
					'label' => __( 'Pending Payment:', 'woocommerce' ),
					'value' => wc_price( $pending_payment, array( 'currency' => $order->get_currency() ) ),
				);
			}

			if ( $from_order && isset( $new_total_rows['cart_subtotal'] ) ) {
				unset( $new_total_rows['cart_subtotal'] );
				unset( $new_total_rows['shipping'] );

				if ( $payment_select ) {
					$overall_total_row['payment_select'] = array(
						'label' => __( 'Payment Type:', 'woocommerce' ),
						'value' => get_the_title( $payment_select ),
					);
				}

				if ( $original_shipping && $original_shipping_method ) {
					$overall_total_row['original_shipping'] = array(
						'label' => __( 'Shipping(' . $original_shipping_method . '):', 'woocommerce' ),
						'value' => wc_price( $original_shipping, array( 'currency' => $order->get_currency() ) ),
					);
				}

				if ( $original_tax_names && $original_tax ) {
					$from_order_object                 = wc_get_order( $from_order );
					$tax_rate                          = $this->get_rate_percent_value_from_order( $from_order_object );
					$tax_total                         = $this->calculate_correct_tax( $from_order_object, $tax_rate );
					$overall_total_row['original_tax'] = array(
						'label' => $original_tax_names,
						'value' => wc_price( $tax_total, array( 'currency' => $from_order_object->get_currency() ) ),
					);
				}

				if ( $original_tax_names && $original_tax ) {
					$overall_total_row['overall_total'] = array(
						'label' => __( 'Overall Total (+shipping & tax):', 'woocommerce' ),
						'value' => wc_price( $original_total, array( 'currency' => $order->get_currency() ) ),
					);
				} else {
					$overall_total_row['overall_total'] = array(
						'label' => __( 'Overall Total (+shipping):', 'woocommerce' ),
						'value' => wc_price( $original_total, array( 'currency' => $order->get_currency() ) ),
					);
				}

				$overall_total_row['deposit_total'] = array(
					'label' => __( 'Deposit:', 'woocommerce' ),
					'value' => wc_price( -$deposit_total, array( 'currency' => $order->get_currency() ) ),
				);

				// Prepend the custom row to the beginning of the total rows array
				$new_total_rows = array_merge( $overall_total_row, $new_total_rows );

			}

			return $new_total_rows;
		}

		return $total_rows;
	}


	public function create_duplicate_order_with_adjustment( $order, $payment_select, $total, $shipping, $shipping_method, $tax, $pending_payment ) {
		// Create a new order
		$new_order = wc_create_order();

		$pending_payment = $pending_payment ? $pending_payment : $total;

		// Copy items from the current order to the new order
		foreach ( $order->get_items() as $item_id => $item ) {
			// Add product to the new order
			// error_log( $item );
			$new_item = $new_order->add_product(
				$item->get_product(),
				$item->get_quantity(),
				array(
					'subtotal' => $item->get_subtotal(),
					'total'    => $item->get_total(), // Adjust if necessary based on your logic
				)
			);

			// Ensure the new item was added successfully
			if ( ! $new_item ) {
				error_log( 'Failed to add product to the new order.' );
				continue;
			}

			$created_item = $new_order->get_item( $new_item );

			// Copy all meta data from the original item to the new item
			$meta_data = $item->get_meta_data();
			foreach ( $meta_data as $meta ) {
				// Each $meta is an instance of WC_Meta_Data
				$created_item->add_meta_data( $meta->key, $meta->value, true );
			}

			$created_item->save(); // Save the new item to store meta data
		}

		// Set customer and address data from the original order
		$new_order->set_customer_id( $order->get_customer_id() );
		$new_order->set_address( $order->get_address( 'billing' ), 'billing' );
		$new_order->set_address( $order->get_address( 'shipping' ), 'shipping' );

		// Handle shipping
		$shipping_item = new WC_Order_Item_Shipping();
		$shipping_item->set_method_title( $shipping_method );
		$shipping_item->set_method_id( 'custom_shipping_method' );
		$shipping_item->set_total( $shipping ); // Set the shipping total to the provided shipping parameter
		$new_order->add_item( $shipping_item );

		// Adjust totals if necessary

		$new_order->set_cart_tax( $tax );

		$new_order->set_total( $pending_payment );

		// Add a note and save the new order
		$new_order->add_order_note( 'This order is a follow-up for Order #' . $order->get_id() );
		$new_order->save();

		// Optionally, reset session variables or perform additional actions

		return $new_order->get_id();
	}




	public function create_adjusted_duplicate_order( $order_id, $posted_data, $order ) {
		$payment_select = (int) WC()->session->get( 'payment_select' );

		if ( isset( $payment_select ) && $payment_select !== 0 ) {

			$tax             = WC()->session->get( 'original_tax' );
			$shipping        = WC()->session->get( 'original_shipping' );
			$total           = WC()->session->get( 'original_total' );
			$shipping_method = WC()->session->get( 'original_shipping_methods' );
			$pending_payment = WC()->session->get( 'pending_payment' );
			$deposit_total   = WC()->session->get( 'deposit_total' );
			$tax_names       = WC()->session->get( 'original_tax_names' );

			// Save the session values as order meta for the original order
			update_post_meta( $order_id, '_payment_select', $payment_select );
			update_post_meta( $order_id, '_original_tax', $tax );
			update_post_meta( $order_id, '_original_tax_names', $tax_names );
			update_post_meta( $order_id, '_original_shipping', $shipping );
			update_post_meta( $order_id, '_original_total', $total );
			update_post_meta( $order_id, '_original_shipping_method', $shipping_method );
			update_post_meta( $order_id, '_pending_payment', $pending_payment );
			update_post_meta( $order_id, '_deposit_total', $deposit_total );

			// Create the adjusted duplicate order
			$new_order_id = $this->create_duplicate_order_with_adjustment( $order, $payment_select, $total, $shipping, $shipping_method, $tax, $pending_payment );
			// Create Invoice
			// $this->create_order_invoice( $order_id, $payment_select, );

			// Optionally, link the new order with the original by storing the new order ID in the original order's meta
			update_post_meta( $order_id, '_adjusted_duplicate_order_id', $new_order_id );
			update_post_meta( $new_order_id, '_payment_select', $payment_select );
			update_post_meta( $new_order_id, '_from_order_id', $order_id );
			update_post_meta( $new_order_id, '_deposit_total', $deposit_total );
			update_post_meta( $new_order_id, '_pending_payment', $pending_payment );
			update_post_meta( $new_order_id, '_original_total', $total );
			update_post_meta( $new_order_id, '_original_tax', $tax );
			update_post_meta( $new_order_id, '_original_tax_names', $tax_names );
			update_post_meta( $new_order_id, '_original_shipping', $shipping );
			update_post_meta( $new_order_id, '_original_shipping_method', $shipping_method );
			update_post_meta( $new_order_id, '_hide_order', true );

			// Reset the session variables
			WC()->session->__unset( 'payment_select' );
			WC()->session->__unset( 'original_tax' );
			WC()->session->__unset( 'original_shipping' );
			WC()->session->__unset( 'original_total' );
			WC()->session->__unset( 'original_shipping_methods' );
			WC()->session->__unset( 'pending_payment' );
			WC()->session->__unset( 'deposit_total' );
			WC()->session->__unset( 'original_tax_names' );
		}
	}


	public function custom_modify_cart_total( $total ) {
		if ( WC()->session ) {
			$payment_select = (int) WC()->session->get( 'payment_select' );

			if ( $payment_select && 0 !== $payment_select ) {
				// Handling shipping methods
				$chosen_methods        = WC()->session->get( 'chosen_shipping_methods' );
				$shipping_method_names = array();
				foreach ( $chosen_methods as $method_id ) {
					list($method, $instance_id) = explode( ':', $method_id );
					$available_shipping_rates   = WC()->session->get( 'shipping_for_package_0' )['rates'];
					if ( isset( $available_shipping_rates[ $method_id ] ) ) {
						$shipping_method_names[] = $available_shipping_rates[ $method_id ]->get_label();
					}
				}
				$shipping_names = implode( ', ', $shipping_method_names );
				WC()->session->set( 'original_shipping_methods', $shipping_names );

				// Handling taxes
				$tax_totals  = WC()->cart->get_tax_totals(); // Retrieves the tax totals as objects
				$tax_details = array();
				foreach ( $tax_totals as $code => $tax ) {
					$tax_details[ $code ] = $tax->label;  // Capturing each tax name
				}
				$tax_names = implode( ', ', $tax_details ); // Combine all tax names into a string
				WC()->session->set( 'original_tax_names', $tax_names ); // Store tax names in the session

				// Calculate new total based on deposit
				$deposit   = get_field( 'deposit', $payment_select ) / 100;
				$new_total = $total * $deposit;

				// Storing other session values
				WC()->session->set( 'pending_payment', $total - $new_total );
				WC()->session->set( 'original_total', $total );
				WC()->session->set( 'deposit_total', $new_total );
				WC()->session->set( 'original_shipping', WC()->cart->get_shipping_total() );
				WC()->session->set( 'original_tax', WC()->cart->get_taxes_total() );

				return $new_total;
			} else {
				WC()->session->__unset( 'pending_payment' );
			}
		}
		return $total;
	}


	public function handle_ajax_update_checkout_total() {
		$payment_select = isset( $_POST['payment_select'] ) ? (int) $_POST['payment_select'] : 0;

		if ( WC()->session ) {
			WC()->session->__unset( 'payment_select' );
			WC()->session->set( 'payment_select', $payment_select );
		} else {
			error_log( 'WooCommerce session not initialized.' );
		}

		wp_send_json_success(
			array(
				'payment' => $payment_select,
			)
		);
	}

	public function custom_shipping_logic( $rates, $package ) {
		// Get the total cart cost
		$cart_total = WC()->cart->cart_contents_total;

		// Calculate the standard and expedite costs
		$standard_cost = $cart_total * 0.075; // 7.5%
		$expedite_cost = $cart_total * 0.155 > 29.5 ? $cart_total * 0.155 : 29.5; // 15.5%
		if ( get_woocommerce_currency() === 'CAD' ) {
			$expedite_cost *= 1.3;
		}

		// Assuming the method IDs are 'flat_rate', 'standard', and 'expedite'
		$flat_rate = isset( $rates['flat_rate:4'] ) ? $rates['flat_rate:4'] : null;
		$standard  = isset( $rates['flat_rate:2'] ) ? $rates['flat_rate:2'] : null;
		$expedite  = isset( $rates['flat_rate:3'] ) ? $rates['flat_rate:3'] : null;

		// Update the standard and expedite rates
		if ( $standard ) {
			$rates['flat_rate:2']->cost = $standard_cost;
		}
		if ( $expedite ) {
			$rates['flat_rate:3']->cost = $expedite_cost;
		}

		// Check and unset the lower cost between Flat Rate and Standard
		if ( $flat_rate && $standard ) {
			if ( $flat_rate->cost < $standard_cost ) {
				unset( $rates['flat_rate:4'] );
			} else {
				unset( $rates['flat_rate:2'] );
			}
		}

		// Check if the address is Vancouver and modify Expedite
		/*
		if ( isset( $package['destination']['city'] ) && strtolower( $package['destination']['city'] ) === 'vancouver' ) {
			if ( $expedite ) {
				$rates['flat_rate:3']->cost = min( $expedite_cost, $standard_cost, ( isset( $flat_rate->cost ) ? $flat_rate->cost : PHP_INT_MAX ) );
				// Unset other rates to show only Expedite
				unset( $rates['flat_rate:2'], $rates['flat_rate:4'] );
			}
		}
		*/

		if ( is_cart() ) {
			unset( $rates['flat_rate:3'] );
		}

		return $rates;
	}

	public function add_pst_field( $fields ) {

		$fields['shipping_pst'] = array(
			'label'    => __( 'PST', 'woocommerce' ), // Change the label to something appropriate
			'required' => false, // Not required by default
			'class'    => array( 'form-row-wide', 'custom-field-bc', 'hide-if-not-canada' ), // Custom class for JavaScript
			'priority' => 105, // Adjust the priority to position it right after the state field
		);

		return $fields;
	}

	public function currency_symbol( $currency_symbol, $currency ) {
		$currency_symbol = $currency . $currency_symbol;
		return $currency_symbol;
	}


	public function get_parent_ID() {
		global $post;
		// Check if it's a singular "signage" post.
		if ( is_singular( 'signage' ) ) {
			$parent_id = $post->post_parent;

			// If it's a top-level post or has children, use the current post's details.
			if ( $parent_id === 0 || $this->has_children( $post->ID, 'signage' ) ) {
				$output_post_id = $post->ID;
			} else {
				$output_post_id = $parent_id;
			}
			return $output_post_id;
		} elseif ( is_page( 'custom' ) || is_page( 'custom-project' ) ) {
			return $post->ID;
		}
		return 0;
	}

	public function get_signage_ID() {
		global $post;
		// Check if it's a singular "signage" post.
		if ( is_singular( 'signage' ) ) {
			$parent_id = $post->post_parent;

			// If it's a top-level post or has children, use the current post's details.
			if ( $parent_id !== 0 && ! $this->has_children( $post->ID, 'signage' ) ) {
				return $post->ID;
			}
		}
		return 0;
	}

	public function output_current_signage( $output_post_id ) {
		echo get_the_post_thumbnail( $output_post_id, array( 35, 35 ) );
		echo get_the_title( $output_post_id );
	}

	public function has_children( $post_id, $post_type = 'page' ) {
		$children = get_posts(
			array(
				'post_type'   => $post_type,
				'post_parent' => $post_id,
				'numberposts' => 1, // We only need to check if at least one exists.
			)
		);
		return ! empty( $children );
	}


	public function product_dropdown_nav() {
		ob_start();

		$custom = get_page_by_path( 'custom-project' );

		$custom_quote = get_page_by_path( 'custom-quote', OBJECT, 'signage' );

		$product_cat_list = array(
			'post_type'      => 'signage',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'post_parent'    => 0,
			'orderby'        => 'menu_order',
			'order'          => 'ASC',
		);

		if ( $custom_quote && ! current_user_can( 'administrator' ) ) {
			$product_cat_list['post__not_in'] = array( $custom_quote->ID );
		}

		$signage_query = new WP_Query( $product_cat_list );
		?>
<div class="md:flex md:gap-10 p-dropdown-wrap mb-24 mt-10 relative">
	<div class="p-dropdown cursor-pointer mb-4 md:mb-0">
		<div id="productCat" class="p-dropdown-current overflow-hidden grow">
			<div class="p-drowpdown-wrap grow h-[55px] p-[10px] dropdown-trigger" data-open="productCat-list">
				<div id="productCatCurrent" class="flex grow gap-2 items-center">
					<div class="selectedWrap flex items-center gap-3">
						<?php if ( $this->get_parent_ID() ) : ?>
							<?php $this->output_current_signage( $this->get_parent_ID() ); ?>
						<?php else : ?>
						<div class="text-[#D2D2D2]">SELECT OPTION</div>
						<?php endif; ?>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none"
						class="ml-auto">
						<path d="M13.3516 2L7.8861 6.54054L2.00021 2" stroke="black" stroke-width="2"
							stroke-linecap="square" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</div>
		<?php if ( $signage_query->have_posts() ) { ?>
		<div id="productCat-list" class="hidden shadow-lg">
			<?php if ( $custom ) : ?>
			<a class="product-cat-item text-black no-underline" data-signage="<?php echo $custom->ID; ?>"
				href="<?php echo esc_url( get_the_permalink( $custom->ID ) ); ?>">
				<?php echo get_the_post_thumbnail( $custom->ID, array( 35, 35 ) ); ?>
				<?php echo get_the_title( $custom->ID ); ?>
			</a>
			<?php endif; ?>

			<?php
			while ( $signage_query->have_posts() ) {
				$signage_query->the_post();
				?>
			<a class="product-cat-item text-black no-underline" data-signage="<?php echo get_the_ID(); ?>"
				href="<?php echo esc_url( get_permalink() ); ?>">
				<?php the_post_thumbnail( array( 35, 35 ) ); ?>
				<?php the_title(); ?>
			</a>

				<?php
			}
				wp_reset_postdata();
			?>
		</div>
		<?php } ?>
	</div>

	<div class="p-dropdown cursor-pointer">
		<div id="novaProduct" class="p-dropdown-current overflow-hidden grow">
			<div class="p-drowpdown-wrap grow h-[55px] p-[10px] dropdown-trigger" data-open="novaProduct-list">
				<div id="novaProductCurrent" class="flex grow gap-2 items-center">
					<div class="selectedWrap flex items-center gap-3">
						<?php if ( $this->get_signage_ID() ) : ?>
							<?php $this->output_current_signage( $this->get_signage_ID() ); ?>
						<?php else : ?>
						<span class="text-[#D2D2D2]">SELECT OPTION</span>
						<?php endif; ?>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none"
						class="ml-auto">
						<path d="M13.3516 2L7.8861 6.54054L2.00021 2" stroke="black" stroke-width="2"
							stroke-linecap="square" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</div>
		<?php
		$nova_query = new WP_Query(
			array(
				'post_type'      => 'signage',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'post_parent'    => $this->get_parent_ID(),
				'orderby'        => 'menu_order',
				'order'          => 'ASC',
			)
		);
		?>
		<?php if ( $nova_query->have_posts() ) { ?>
		<div id="novaProduct-list" class="hidden shadow-lg">

			<?php
			while ( $nova_query->have_posts() ) {
				$nova_query->the_post();
				?>
			<a class="product-cat-item text-black no-underline"
				href="<?php echo esc_url( get_permalink() ); ?>overview">
				<?php the_post_thumbnail( array( 35, 35 ) ); ?>
				<?php the_title(); ?>
			</a>

				<?php
			}
				wp_reset_postdata();
			?>
		</div>
		<?php } ?>
	</div>

	<script>
	document.addEventListener("DOMContentLoaded", (event) => {
		const triggers = document.querySelectorAll('.dropdown-trigger');
		const productCatList = document.getElementById('productCat-list');
		const novaProductCurrent = document.getElementById('novaProductCurrent');
		const novaProductList = document.getElementById('novaProduct-list');



		productCatList.querySelectorAll('.product-cat-item').forEach(item => {
			item.addEventListener("click", () => {
				const parentId = item.dataset.signage;
				const selectWrap = novaProductCurrent.querySelector('.selectedWrap');
				const currentWrap = productCatCurrent.querySelector('.selectedWrap');
				const content = item.innerHTML;
				currentWrap.innerHTML = content;

				selectWrap.innerHTML =
					'<span class="text-[#D2D2D2]">LOADING...</span>';

				novaProductList.innerHTML = '';

				const data = new FormData();
				data.append('action', 'populate_signage');
				data.append('parent_id', parentId);
				data.append('nonce', NovaMyAccount.nonce);


				productCatList.classList.add('hidden');
				novaProductList.classList.add('hidden');

				fetch(NovaMyAccount.ajax_url, {
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Cache-Control': 'no-cache',
						},
						body: data,
					})
					.then((response) => response.json())
					.then((data) => {
						selectWrap.innerHTML =
							'<span class="text-[#D2D2D2]">SELECT OPTION</span>';


						novaProductList.innerHTML = data['html'];
					})
					.catch((error) => console.error('Error:', error))

			});
		});

		triggers.forEach(trigger => {
			trigger.addEventListener('click', e => {
				e.preventDefault();
				const open = trigger.dataset.open;
				const dropdown = document.getElementById(open);
				dropdown.classList.toggle('hidden');

				document.addEventListener('click', function closeDropdown(event) {
					const dropdownWrap = document.querySelector('.p-dropdown-wrap');

					if ((!dropdown.contains(event.target) && !dropdownWrap.contains(
							event.target)) && event.target !== trigger) {
						dropdown.classList.add('hidden');
						document.removeEventListener('click', closeDropdown);
					}
				});
			});
		});
	});
	</script>

</div>
		<?php
			return ob_get_clean();
	}

	public function populate_signage() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_account_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		$nova_query = new WP_Query(
			array(
				'post_type'      => 'signage',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'post_parent'    => $_POST['parent_id'],
			)
		);

		ob_start();
		while ( $nova_query->have_posts() ) {
			$nova_query->the_post();
			?>
<a class="product-cat-item text-black no-underline" href="<?php echo esc_url( get_permalink() ); ?>overview">
			<?php the_post_thumbnail( array( 35, 35 ) ); ?>
			<?php the_title(); ?>
</a>
			<?php
		}
		wp_reset_postdata();

		$html = ob_get_clean();

		$status['post'] = $_POST;
		$status['code'] = 2;
		$status['html'] = $html;

		wp_send_json( $status );
	}

	public function show_product_dropdown_nav() {
		if ( 'signage' === get_post_type() || is_page( 'custom-project' ) ) {
			echo do_shortcode( '[product_dropdown_nav]' );
		}
	}

	public function product_guides() {
		ob_start();
		if ( have_rows( 'product_guide' ) ) :
			while ( have_rows( 'product_guide' ) ) :
				the_row();
				?>
<div class="md:flex gap-20 items-center mb-10 md:mb-20">
				<?php
				$image = get_sub_field( 'image' );
				?>
	<div class="md:w-1/3 mb-5 md:mb-0">
		<h3 class="uppercase"><?php echo get_sub_field( 'title' ); ?></h3>
		<p class="text-[16px] mb-4"><?php echo get_sub_field( 'content' ); ?></p>
				<?php if ( get_sub_field( 'link' ) ) : ?>
		<a href="<?php echo esc_url( get_sub_field( 'link' )['url'] ); ?>"
			class="text-nova-secondary lowercase underline text-[16px]"><?php echo get_sub_field( 'link' )['title']; ?></a>
		<?php endif; ?>
	</div>
	<div class="md:w-2/3">
		<a href="<?php echo esc_url( $image['url'] ); ?>"><img class="w-full h-full object-cover aspect-[4/3]"
				src="<?php echo esc_url( $image['url'] ); ?>" alt="<?php echo esc_attr( $image['alt'] ); ?>" /></a>
	</div>
</div>

				<?php
			endwhile;
	endif;
		return ob_get_clean();
	}

	public function product_features() {
		ob_start();
		if ( have_rows( 'features' ) ) :
			?>
<div class="md:flex justify-between product-features-icons gap-12">
			<?php
			while ( have_rows( 'features' ) ) :
				the_row();
				$image = get_sub_field( 'icon' );
				?>
	<div class="text-center md:mb-0 mb-[40px] flex-1">
		<div class="img-wrap h-[55px]">
			<img class="mx-auto" src="<?php echo esc_url( $image['url'] ); ?>"
				alt="<?php echo esc_attr( $image['alt'] ); ?>" />
		</div>
		<h5 class="uppercase tracking-[1.8px] mt-9"><?php echo get_sub_field( 'name' ); ?></h5>
	</div>
	<?php endwhile; ?>
</div>

			<?php
			endif;
		return ob_get_clean();
	}

	public function woocommerce_thankyou_order_received_text( $text, $order ) {
		if ( ! $order ) {
			return;
		}
		$text           = 'Your order is being processed.';
		$from_order_id  = $order->get_meta( '_from_order_id' );
		$second_payment = $order->get_meta( 'second_payment' );
		if ( ! empty( $from_order_id ) ) {
			// Change the thank you text
			$text = 'Thank you for the payment';
		}
		if ( ! empty( $second_payment ) ) {
			$text = 'Thank you for the payment';
		}
		return $text;
	}

	public function order_received_title( $title, $order_id ) {
		return 'Thank You!';
	}

	public function woocommerce_cart_totals_order_total_html( $value ) {
		$value = preg_replace( '/<strong\b[^>]*>(.*?)<\/strong>/', '$1', $value );
		return $value;
	}

	public function remove_checkout_coupon_form() {
		remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );
	}

	public function update_quantity_script() {
		?>
<script>
function initializeQuantityButtons() {
	const cartForm = document.querySelector('form.woocommerce-cart-form');
	const updateCartButton = document.querySelector('button[name="update_cart"]');
	const quantityChanges = document.querySelectorAll('.quantity-change');

	quantityChanges.forEach(q => {
		const decrease = q.querySelector('.decrease');
		const increase = q.querySelector('.increase');
		const input = q.querySelector('input.qty');

		// Remove existing event listeners
		increase.removeEventListener('click', increaseClickListener);
		decrease.removeEventListener('click', decreaseClickListener);

		// Add new event listeners
		increase.addEventListener('click', increaseClickListener);
		decrease.addEventListener('click', decreaseClickListener);

		function increaseClickListener(e) {
			increaseHandler(e, input);
		}

		function decreaseClickListener(e) {
			decreaseHandler(e, input);
		}
	});

	function increaseHandler(e, input) {
		e.preventDefault();
		let currentValue = parseInt(input.value, 10);
		input.value = currentValue + 1;
		updateCartButton.disabled = false;
	}

	function decreaseHandler(e, input) {
		e.preventDefault();
		let currentValue = parseInt(input.value, 10);
		if (currentValue > 1) {
			input.value = currentValue - 1;
			updateCartButton.disabled = false;
		}
	}
}


document.addEventListener('DOMContentLoaded', initializeQuantityButtons);
jQuery(document.body).on('updated_cart_totals', initializeQuantityButtons);
</script>
		<?php
	}

	public function update_single_quantity_script() {
		global $product;
		?>
<script>
function initializeQuantityButtons() {
	const quantityChanges = document.querySelectorAll('.quantity-change');
	const currentPrice = '<?php echo $product->get_price(); ?>';
	const currencySymbol = '<?php echo get_woocommerce_currency_symbol(); ?>';

	function computePrice(qty) {

		let computeprice = qty * parseFloat(currentPrice);
		console.log(computeprice);
		computeprice = computeprice.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

		document.getElementById("watchPrice").innerHTML = currencySymbol + computeprice;

	}


	quantityChanges.forEach(q => {
		const decrease = q.querySelector('.decrease');
		const increase = q.querySelector('.increase');
		const input = q.querySelector('input.qty');

		// Remove existing event listeners
		increase.removeEventListener('click', increaseClickListener);
		decrease.removeEventListener('click', decreaseClickListener);

		// Add new event listeners
		increase.addEventListener('click', increaseClickListener);
		decrease.addEventListener('click', decreaseClickListener);



		function increaseClickListener(e) {
			increaseHandler(e, input);
		}

		function decreaseClickListener(e) {
			decreaseHandler(e, input);
		}
	});

	function increaseHandler(e, input) {
		e.preventDefault();
		let currentValue = parseInt(input.value, 10);
		input.value = currentValue + 1;

		console.log(input.value);

		computePrice(input.value);


	}

	function decreaseHandler(e, input) {
		e.preventDefault();
		let currentValue = parseInt(input.value, 10);
		if (currentValue > 1) {
			input.value = currentValue - 1;
			computePrice(input.value)
		}
		console.log(input.value);
	}
}

document.addEventListener('DOMContentLoaded', initializeQuantityButtons);
</script>
		<?php
	}

	public function edit_cart_summary_title() {
		$kadence_theme_class = \Kadence\Theme::instance();
		remove_action( 'woocommerce_before_cart_table', array( $kadence_theme_class->components['woocommerce'], 'cart_summary_title' ) );
		add_action(
			'woocommerce_before_cart_table',
			function () {
				echo '<div class="cart-summary"><h2>' . esc_html__( 'PRODUCTS', 'kadence' ) . '</h2></div>';
			}
		);
	}

	public function edit_cart_form_wrap_before() {
		$kadence_theme_class = \Kadence\Theme::instance();
		remove_action( 'woocommerce_before_cart', array( $kadence_theme_class->components['woocommerce'], 'cart_form_wrap_before' ) );
		add_action(
			'woocommerce_before_cart',
			function () {
				echo '<div class="nova-woo-cart-form-wrap">';
			}
		);
	}

	public function nova_checkout_order_created( $order ) {
		$items = $order->get_items();

		foreach ( $items as $item_id => $item ) {
			$signage  = $item->get_meta( 'signage' );
			$quote_id = $item->get_meta( 'quote_id' );
			if ( ! empty( $signage ) && isset( $quote_id ) ) {
				update_field( 'paid', true, $quote_id );
				update_field( 'order_id', $order->get_order_number(), $quote_id );
				$args = array(
					'ID'          => $quote_id,
					'post_status' => 'checked_out',
				);
				wp_update_post( $args );
			}
		}
	}

	public function nova_display_item_meta( $html, $item, $args ) {
		if ( $item['signage'] ) {
			return '';
		}
		return $html;
	}

	public function nova_quote_order_name( $title, $item, $visible ) {
		if ( $item['nova_title'] ) {
			$title = $item['nova_title'];
		}
		return $title;
	}

	public function nova_before_order_itemmeta( $item_id, $item, $product ) {

		if ( is_wc_endpoint_url( 'order-received' ) || is_wc_endpoint_url( 'view-order' ) ) {
			return;
		}
		if ( isset( $item['signage'] ) && isset( $item['nova_title'] ) ) {

			echo $this->generate_html_table_from_array( $item['signage'], $item['product'], $item->get_name(), get_the_title( $item['product_line'] ) );

			if ( isset( $item['nova_note'] ) ) {
				echo '<p><strong>NOTE:</strong><br>' . $item['nova_note'] . '</p>';
			}
		}
	}

	public function nova_hidden_order_itemmeta( $array ) {
		$array[] = 'nova_title';
		$array[] = 'quote_id';
		$array[] = 'nova_note';
		return $array;
	}

	public function nova_woocommerce_order_item_class( $class, $item, $order ) {
		if ( $item->get_meta( 'signage' ) ) {
			$class .= ' nova-signage';
		}
		return $class;
	}

	public function nova_create_order_line_item( $item, $cart_item_key, $values, $order ) {
		if ( isset( $values['nova_quote'] ) && ! empty( $values['nova_title'] ) ) {
			$item->add_meta_data( 'nova_title', $values['nova_title'] );
			$item->add_meta_data( 'signage', $values['signage'] );
			$item->add_meta_data( 'quote_id', $values['quote_id'] );
			$item->add_meta_data( 'product', $values['quote_id'] );
			$item->add_meta_data( 'product_line', $values['product_line'] );

			if ( isset( $values['nova_note'] ) && ! empty( $values['nova_note'] ) ) {
				$item->add_meta_data( 'nova_note', $values['nova_note'] );
			}
		}
	}

	public function woocommerce_order_item_meta_end( $item_id, $item, $order, $bool ) {

		if ( is_wc_endpoint_url( 'order-received' ) || is_wc_endpoint_url( 'view-order' ) ) {
			return;
		}

		if ( $item->get_meta( 'signage' ) ) {
			echo $this->generate_html_table_from_array( $item->get_meta( 'signage' ), $item->get_meta( 'product' ), $item->get_name(), get_the_title( $item['product_line'] ) );
		}
		if ( $item->get_meta( 'nova_note' ) ) {
			echo '<p><strong>NOTE:</strong><br>' . $item->get_meta( 'nova_note' ) . '</p>';
		}
	}

	public function note_order_name( $name, $item ) {
		$nova_title = $item->get_meta( 'nova_title' );
		if ( ! empty( $nova_title ) ) {
			return $nova_title;
		}

		return $name;
	}

	public function nova_quote_display_signage( $cart_item, $cart_item_key ) {
		if ( is_wc_endpoint_url( 'order-received' ) || is_wc_endpoint_url( 'view-order' ) ) {
				return;
		}
		if ( isset( $cart_item['signage'] ) && $cart_item['nova_title'] ) {

			if ( is_admin() ) {
				echo '<p>' . $cart_item['nova_title'] . '</p>';
			}

			echo $this->generate_html_table_from_array( $cart_item['signage'], $cart_item['product'], $cart_item->get_name(), get_the_title( $cart_item['product_line'] ) );

			if ( isset( $cart_item['nova_note'] ) && ! empty( $cart_item['nova_note'] ) ) {
				echo '<p>NOTE:<br>' . $cart_item['nova_note'] . '</p>';
			}
		}
	}

	public function generate_html_table_from_array( $array, $product, $nova_title, $product_line ) {

		$instance   = \NOVA_B2B\Nova_Quote::get_instance();
		$attributes = $instance->allAttributes();

		$html  = '<h6 style="font-size: 100%; margin-top: 10px;margin-bottom: 0;">Quote ID: <strong>Q-' . str_pad( $product, 4, '0', STR_PAD_LEFT ) . '</strong></h6>';
		$html .= '<h6 style="font-size: 100%; margin-top: 0; margin-bottom: 0;">Project Name: <strong>' . $nova_title . '</strong></h6>';
		$html .= '<h6 style="font-size: 100%; margin-top: 0; margin-bottom: 0;">Product: <strong>' . $product_line . '</strong></h6>';

		foreach ( $array as $object ) {

			$html .= '<div style="display: block;">';
			$html .= '<p style="margin-top:20px; font-size: 18px; margin-bottom: 5px;">' . $object->title . '</p>';

			$html .= '<table style="padding: 4px; border-collapse: collapse; max-width: 400px; width: 100%; font-size: 80%; margin-bottom: 20px;">
    <tbody>';

			foreach ( $attributes as $key => $attr ) {

				if ( isset( $object->$key ) && ! empty( $object->$key ) ) {

					if ( is_array( $attr ) ) {
						if ( $attr['isLink'] ?? false && isset( $object->fontFileUrl, $object->fontFileName ) && ! empty( $object->fontFileUrl ) && ! empty( $object->fontFileName ) ) {
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 10px;"><strong>' . $attr['label'] . ':</strong></td><td style="border: 1px solid #dddddd; padding: 10px;"><a href="' . htmlspecialchars( $object->fontFileUrl ) . '" target="_blank">' . htmlspecialchars( $object->fontFileName ) . '</a></td></tr>';
						} elseif ( $attr['isVinyl'] ?? false && isset( $object->vinylWhite->code ) && ! empty( $object->vinylWhite->name ) && ! empty( $object->vinylWhite->code ) ) {
							if ( ( isset( $object->acrylicFront ) && $object->acrylicFront === '3M Vinyl' ) || ( isset( $object->frontOption ) && $object->frontOption === '3M Vinyl' ) || ( isset( $object->frontAcrylicCover ) && $object->frontAcrylicCover === '3M Vinyl' ) ) {
								$html .= '<tr><td style="border: 1px solid #dddddd; padding: 10px;"><strong>' . $attr['label'] . ':</strong></td><td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars( $object->vinylWhite->name ) . ' - [' . htmlspecialchars( $object->vinylWhite->code ) . ']</td></tr>';
							}
						} elseif ( $attr['isFile'] ?? false && isset( $object->fileUrl, $object->fileName ) && ! empty( $object->fileUrl ) && ! empty( $object->fileName ) ) {
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 10px;"><strong>' . $attr['label'] . ':</strong></td><td style="border: 1px solid #dddddd; padding: 10px;"><a href="' . htmlspecialchars( $object->fileUrl ) . '" target="_blank">' . htmlspecialchars( $object->fileName ) . '</a></td></tr>';
						} elseif ( $attr['isFiles'] ?? false && isset( $object->fileUrls, $object->fileNames ) && ! empty( $object->fileUrls ) && ! empty( $object->fileNames ) ) {
							$filesHtml = '';
							foreach ( $object->fileUrls as $index => $fileUrl ) {
								$fileName   = $object->fileNames[ $index ] ?? $fileUrl;
								$filesHtml .= '<a href="' . htmlspecialchars( $fileUrl, ENT_QUOTES, 'UTF-8' ) . '" target="_blank">' . htmlspecialchars( $fileName, ENT_QUOTES, 'UTF-8' ) . '</a><br>';
							}
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 10px;"><strong>' . $attr['label'] . ':</strong></td><td style="border: 1px solid #dddddd; padding: 10px;">' . $filesHtml . '</td></tr>';
						}
					} else {
						$value = $object->$key;
						if ( is_object( $value ) ) {
							if ( isset( $value->thickness ) ) {
								$value = $value->thickness;
							} elseif ( isset( $value->depth ) ) {
								$value = $value->depth;
							} elseif ( isset( $value->name ) ) {
								$value = $value->name;
							}
						}
						if ( isset( $value ) && ! empty( $value ) ) {
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 10px;"><strong>' . $attr . ':</strong></td><td style="border: 1px solid #dddddd; padding: 10px;">' . htmlspecialchars( $value ) . ( $key === 'letterHeight' ? '"' : '' ) . '</td></tr>';
						}
					}
				}
			}

			$html .= '</tbody></table>';

			$html .= '</div>';

		}

		return $html;
	}

	public function nova_custom_price_refresh( $cart_object ) {

		foreach ( $cart_object->get_cart() as $item ) {

			if ( array_key_exists( 'usd_price', $item ) && array_key_exists( 'nova_quote', $item ) ) {
				$price = $item['usd_price'];

				$item['data']->set_price( $price );

			}
		}
	}

	public function remove_thumbnail_for_nova_product( $thumbnail, $cart_item, $cart_item_key ) {
		$product = $cart_item['data'];
		if ( is_a( $product, 'WC_Product' ) && $product->is_type( 'nova_quote' ) ) {
			return '';
		}

		return $thumbnail;
	}

	public function nova_change_product_name( $title, $cart_item, $cart_item_key ) {
		if ( isset( $cart_item['nova_title'] ) ) {
			$title = $cart_item['nova_title'];
		}
		return $title;
	}

	public function nova_add_to_cart_meta( $cart_item_data, $product_id, $variation_id ) {
		if ( isset( get_field( 'nova_quote_product', 'option' )->ID ) && get_field( 'nova_quote_product', 'option' )->ID === $product_id && isset( $_POST['nova_title'] ) && isset( $_POST['quote_id'] ) ) {
			$cart_item_data['nova_title']   = sanitize_text_field( $_POST['nova_title'] );
			$cart_item_data['signage']      = $_POST['signage'];
			$cart_item_date['quote_id']     = $_POST['quote_id'];
			$cart_item_date['product']      = $_POST['product'];
			$cart_item_date['product_line'] = $_POST['product_line'];
			$cart_item_date['nova_quote']   = true;
			if ( isset( $_POST['nova_note'] ) ) {
				$cart_item_date['nova_note'] = $_POST['nova_note'];
			}
		}
		return $cart_item_data;
	}

	public function nova_account_title() {
		$endpoint = WC()->query->get_current_endpoint();
		switch ( $endpoint ) {
			case 'downloads':
				$endpoint_title = 'Downloads';
				break;
			case 'orders':
				$endpoint_title = 'Orders';
				break;
			case 'mockups':
			case 'mockups-drafts':
			case 'mockups-archived':
			case 'mockups-processing':
			case 'mockups-payments':
			case 'mockups-view':
				$endpoint_title = 'Mockups';
				break;
			case 'edit-account':
				$endpoint_title = 'Account';
				break;
			case 'invoice-history':
				$endpoint_title = 'Invoice History';
				break;
			default:
				$endpoint_title = 'Dashboard';
				break;
		}
		?>
<h2 class="pb-4 mb-4 uppercase mt-0"><?php echo $endpoint_title; ?></h2>
		<?php
	}

	public function nova_account_navigation() {
		get_template_part( 'template-parts/my-account/navigation' );
	}

	public function mockups_view_content() {
		get_template_part( 'template-parts/my-account/view' );
	}

	public function add_nested_mockups_rewrite_rules() {
		add_rewrite_endpoint( 'mockups-drafts', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-archived', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-processing', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-payments', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-view', EP_ROOT | EP_PAGES );
	}

	public function add_mockups_endpoints( $items ) {
		$new_items = array();

		foreach ( $items as $key => $value ) {
			$new_items[ $key ] = $value;

			if ( 'mockups' === $key ) {
				$new_items['mockups-drafts']     = 'Mockups Drafts';
				$new_items['mockups-payments']   = 'Mockups Payments';
				$new_items['mockups-processing'] = 'Mockups Processing';
				$new_items['mockups-archived']   = 'Mockups Archived';
				$new_items['mockups-view']       = 'View Mockup';
				$new_items['invoice-history']    = 'Account History';
			}
		}

		return $new_items;
	}

	public function mockups_endpoint_title( $title, $endpoint ) {
		if ( $endpoint === 'mockups' ) {
			$title = 'Mockups';
		}
		return $title;
	}

	public function mockups_content( $quote_status = '' ) {
		$user_id  = get_current_user_id();
		$paged    = isset( $_GET['pg'] ) ? intval( $_GET['pg'] ) : 1;
		$per_page = 10;

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
		);

		if ( $quote_status ) {
			$meta_query[] = array(
				'key'     => 'quote_status',
				'value'   => $quote_status,
				'compare' => '=',
			);
		}

		$query_args = array(
			'post_type'      => 'nova_quote',
			'meta_query'     => $meta_query,
			'post_status'    => 'publish',
			'posts_per_page' => $per_page,
			'paged'          => $paged,
		);

		$query_paged = new WP_Query( $query_args );

		$this->mockups_nav();

		if ( $query_paged->have_posts() ) {
			while ( $query_paged->have_posts() ) {
				$query_paged->the_post();
				get_template_part( 'template-parts/quote' );
			}

			$this->custom_pagination( $query_paged->found_posts, $query_paged->max_num_pages, $paged, $per_page );
		} else {
			// Fallback to show all posts if paginated query returns no results
			$query_args['posts_per_page'] = -1;
			$query_all                    = new WP_Query( $query_args );

			if ( $query_all->have_posts() ) {
				while ( $query_all->have_posts() ) {
					$query_all->the_post();
					get_template_part( 'template-parts/quote' );
				}
			} else {
				echo '<div role="alert"><div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">0 Results</div><div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"><p>No Quotes Found.</p></div></div>';
			}

			wp_reset_postdata();
		}
	}

	public function custom_pagination( $total_results, $total_pages, $current_page, $per_page ) {
		if ( $total_pages <= 1 ) {
			return; // No need to display pagination if there's only one page.
		}

		$base_url         = esc_url( add_query_arg( 'pg', '%#%' ) );
		$pagination_links = paginate_links(
			array(
				'base'    => $base_url,
				'format'  => '',
				'current' => $current_page,
				'total'   => $total_pages,
				'type'    => 'array',
			)
		);

		if ( ! $pagination_links ) {
			return; // No links to display.
		}

		?>
<div
	class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between border-t border-gray-200 bg-white py-3">
	<div class="flex justify-center md:flex md:flex-1 md:items-center md:justify-between">
		<div>
			<p class="text-sm text-gray-700">
				<?php
					$first_result = ( ( $current_page - 1 ) * $per_page ) + 1;
					$last_result  = min( $current_page * $per_page, $total_pages * $per_page, $total_results );
				?>
				Showing
				<span class="font-medium"><?php echo $first_result; ?></span>
				to
				<span class="font-medium"><?php echo $last_result; ?></span>
				of
				<span class="font-medium"><?php echo $total_results; ?></span>
				results
			</p>
		</div>
	</div>
	<div class="flex flex-1 mt-4 md:mt-0 justify-center md:justify-end gap-2 md:gap-4">
		<?php if ( $current_page > 1 ) : ?>
		<a href="<?php echo str_replace( '%#%', $current_page - 1, $base_url ); ?>"
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-nova-primary hover:text-white gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
				<path fill-rule="evenodd"
					d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
					clip-rule="evenodd" />
			</svg>
			<span class="ml-1"><?php _e( 'Previous' ); ?></span>
		</a>
		<?php endif; ?>
		<?php if ( $current_page < $total_pages ) : ?>
		<a href="<?php echo str_replace( '%#%', $current_page + 1, $base_url ); ?>"
			class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-nova-primary hover:text-white">
			<span>
				<?php _e( 'Next' ); ?>
			</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
				<path fill-rule="evenodd"
					d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd" />
			</svg>
		</a>
		<?php endif; ?>
	</div>

</div>
		<?php
	}


	public function mockups_processing_content() {
		$this->mockups_content( 'processing' );
	}

	public function mockups_drafts_content() {
		$this->mockups_content( 'draft' );
	}

	public function mockups_payments_content() {
		$this->mockups_content( 'ready' );
	}

	public function mockups_archived_content() {
		$this->mockups_content( 'archived' );
	}

	public function add_mockups_content() {
		$this->mockups_content();
	}

	public function get_all_mockups_quantity( $hook ) {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
		);

		if ( $hook != 'all' ) {
			$meta_query[] = array(
				'key'     => 'quote_status',
				'value'   => $hook,
				'compare' => '=',
			);
		}

		$query = new WP_Query(
			array(
				'post_type'      => 'nova_quote',
				'meta_query'     => $meta_query,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		return $query->found_posts;
	}

	public function mockups_nav() {
		global $wp_query;

		$all        = $this->get_all_mockups_quantity( 'all' );
		$drafts     = $this->get_all_mockups_quantity( 'draft' );
		$processing = $this->get_all_mockups_quantity( 'processing' );
		$quoted     = $this->get_all_mockups_quantity( 'ready' );
		$archived   = $this->get_all_mockups_quantity( 'archived' );

		?>
<div
	class="border-b font-title uppercase flex gap-6 md:gap-11 mb-8 whitespace-nowrap overflow-x-auto overflow-y-hidden">
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/all' ) ); ?>"
		class="py-4 border-solid border-x-0 border-t-0 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/all'] ) ? 'border-black' : 'border-transparent' ); ?>  text-black">ALL
		Mockups <span>(<?php echo $all; ?>)</span></a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/drafts' ) ); ?>"
		class="py-4 border-solid border-x-0 border-t-0 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/drafts'] ) ? 'border-black' : 'border-transparent' ); ?>  text-black">Drafts
		<span>(<?php echo $drafts; ?>)</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/processing' ) ); ?>"
		class="py-4 border-solid border-x-0 border-t-0 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/processing'] ) ? 'border-black' : 'border-transparent' ); ?>  text-black">Processing
		<span>(<?php echo $processing; ?>)</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/payments' ) ); ?>"
		class="py-4 border-solid border-x-0 border-t-0 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/payments'] ) ? 'border-black' : 'border-transparent' ); ?>  text-black">Quoted
		<span>(<?php echo $quoted; ?>)</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/archived' ) ); ?>"
		class="py-4 border-solid border-x-0 border-t-0 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/archived'] ) ? 'border-black' : 'border-transparent' ); ?>  text-black">Archived
		<span>(<?php echo $archived; ?>)</span></a>
</div>
		<?php
	}

	public function add_mockups_link_my_account( $items ) {
		unset( $items['downloads'] );
		$items['mockups'] = 'Mockups'; // Add a new menu item for your endpoint.

		return $items;
	}

	public function add_mockups_endpoint_query_var( $vars ) {
		$vars['mockups']            = 'mockups/all';
		$vars['mockups-drafts']     = 'mockups/drafts';
		$vars['mockups-archived']   = 'mockups/archived';
		$vars['mockups-processing'] = 'mockups/processing';
		$vars['mockups-payments']   = 'mockups/payments';
		$vars['mockups-view']       = 'mockups/view';
		$vars['invoice-history']    = 'invoice-history';
		$vars[]                     = 'paged';
		return $vars;
	}

	public function nova_product_specs() {
		if ( have_rows( 'tech_specs_group' ) ) :
			?>
<div class="nova_product_specs_group">
			<?php
			while ( have_rows( 'tech_specs_group' ) ) :
				the_row();
				?>
	<h2><?php echo get_sub_field( 'title' ); ?></h2>
				<?php
				if ( have_rows( 'specs' ) ) :
					?>
	<div class="spec-group">
					<?php
					while ( have_rows( 'specs' ) ) :
						the_row();
						?>
		<div class="spec-item">
			<div class="spec-label">
						<?php echo get_sub_field( 'name' ); ?>
			</div>
			<div class="spec-value">
						<?php echo get_sub_field( 'value' ); ?>
			</div>
		</div>

						<?php
						endwhile;
					?>
	</div>
					<?php
			endif;
				?>

	<?php endwhile; ?>
</div>
			<?php
			endif;
	}

	public function nova_product_faqs() {
		if ( have_rows( 'faqs' ) ) {
			?>
<div id="faqItems" class="has-faq accordion">
	<h2 class="uppercase text-center mb-10">Frequently asked Questions</h2>
			<?php
			while ( have_rows( 'faqs' ) ) {
				the_row();
				?>
	<div class="faq-item visible">
		<p class="faq-question mb-0"><?php echo get_sub_field( 'question' ); ?> <svg width="14" height="14"
				viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="7" y1="1" x2="7" y2="13" stroke="black" stroke-width="2" stroke-linecap="round">
				</line>
				<line x1="13" y1="7" x2="1" y2="7" stroke="black" stroke-width="2" stroke-linecap="round">
				</line>
			</svg></p>
		<div class="expander">
			<div class="expander-content">
				<div class="content-wrapper">
					<?php if ( get_sub_field( 'answer' ) ) : ?>
					<div class="post-content-container" style="padding-top: 2em;">
						<?php echo get_sub_field( 'answer' ); ?>
					</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
				<?php
			}
			?>
</div>
			<?php
		}
	}

	public function myaccount_nav_avatar() {
		$current_user = wp_get_current_user();
		?>
<div class="kadence-account-avatar">
	<div class="kadence-customer-image">
		<a class="kt-link-to-gravatar" href="https://gravatar.com/" target="_blank" rel="no"
			title="<?php echo esc_attr__( 'Update Profile Photo', 'kadence' ); ?>">
			<?php echo get_avatar( $current_user->ID, 40, null, null, array( 'class' => array( 'rounded-full' ) ) ); ?>
		</a>
	</div>
</div>
<div class="kadence-customer-name">
	<h5 class="uppercase mt-2 mb-0 block"><?php echo esc_html( $current_user->display_name ); ?></h5>
	<div class="block text-[14px] text-black uppercase"><span class="font-title text-[12px]">BUSINESS ID:</span>
		<?php echo get_field( 'business_id', 'user_' . get_current_user_id() ); ?></div>
	<a href="<?php echo wp_logout_url( '/' ); ?>" class="text-black text-[10px]">LOG OUT</a>
</div>
		<?php
	}

	function camelcase_to_regular( $input ) {
		$result = strtolower( preg_replace( '/(?<!^)[A-Z]/', ' $0', $input ) );
		return ucwords( $result );
	}

	public function quote_details( $project ) {
		$projectArray = get_object_vars( $project );

		$instance   = \NOVA_B2B\Nova_Quote::get_instance();
		$attributes = $instance->allAttributes();

		foreach ( $attributes as $key => $attr ) {
			if ( $key === 'title' ) {
				continue;
			}
			if ( isset( $projectArray[ $key ] ) && ! empty( $projectArray[ $key ] ) ) {
				if ( is_array( $attr ) ) {
					if ( $attr['isLink'] ?? false && isset( $projectArray['fontFileUrl'], $projectArray['fontFileName'] ) && ! empty( $projectArray['fontFileUrl'] ) && ! empty( $projectArray['fontFileName'] ) ) {
						echo '<div class="grid grid-cols-2 py-[2px]"><div class="text-left text-xs font-title uppercase">' . $attr['label'] . ':</div><div class="text-left text-[10px] uppercase"><a href="' . htmlspecialchars( $projectArray['fontFileUrl'] ) . '" target="_blank">' . htmlspecialchars( $projectArray['fontFileName'] ) . '</a></div></div>';
					} elseif ( $attr['isVinyl'] ?? false && isset( $projectArray['vinylWhite']->name ) && ! empty( $projectArray['vinylWhite']->name ) && ! isset( $projectArray['vinylWhite']->code ) ) {
						if ( ( isset( $projectArray['acrylicFront'] ) && $projectArray['acrylicFront'] === '3M Vinyl' ) || ( isset( $projectArray['frontOption'] ) && $projectArray['frontOption'] === '3M Vinyl' ) || ( isset( $projectArray['frontAcrylicCover'] ) && $projectArray['frontAcrylicCover'] === '3M Vinyl' ) ) {
							echo '<div class="grid grid-cols-2 py-[2px]"><div class="text-left text-xs font-title uppercase">' . $attr['label'] . ':</div><div class="text-left text-[10px] uppercase">' . htmlspecialchars( $projectArray['vinylWhite']->name ) . ' - [' . htmlspecialchars( $projectArray['vinylWhite']->code ) . ']</div></div>';
						}
					} elseif ( $attr['isFile'] ?? false && isset( $projectArray['fileUrl'], $projectArray['fileName'] ) && ! empty( $projectArray['fileUrl'] ) && ! empty( $projectArray['fileName'] ) ) {
						echo '<div class="grid grid-cols-2 py-[2px]"><div class="text-left text-xs font-title uppercase">' . $attr['label'] . ':</div><div class="text-left text-[10px] uppercase"><a href="' . htmlspecialchars( $projectArray['fileUrl'] ) . '" target="_blank">' . htmlspecialchars( $projectArray['fileName'] ) . '</a></div></div>';
					} elseif ( $attr['isFiles'] ?? false && isset( $projectArray['fileUrls'], $projectArray['fileNames'] ) && ! empty( $projectArray['fileUrls'] ) && ! empty( $projectArray['fileNames'] ) ) {
						$filesHtml = '';
						foreach ( $projectArray['fileUrls'] as $index => $fileUrl ) {
							$fileName   = $projectArray['fileNames'][ $index ] ?? $fileUrl;
							$filesHtml .= '<a href="' . htmlspecialchars( $fileUrl, ENT_QUOTES, 'UTF-8' ) . '" target="_blank">' . htmlspecialchars( $fileName, ENT_QUOTES, 'UTF-8' ) . '</a><br>';
						}
						echo '<div class="grid grid-cols-2 py-[2px]"><div class="text-left text-xs font-title uppercase">' . $attr['label'] . ':</div><div class="text-left text-[10px] uppercase">' . $filesHtml . '</div></div>';
					}
				} else {
					$value = $projectArray[ $key ];
					if ( is_object( $value ) ) {
						if ( isset( $value->thickness ) ) {
							$value = $value->thickness;
						} elseif ( isset( $value->depth ) ) {
							$value = $value->depth;
						} elseif ( isset( $value->name ) ) {
							$value = $value->name;
						}
					}
					if ( isset( $value ) && ! empty( $value ) ) {
						echo '<div class="grid grid-cols-2 py-[2px]"><div class="text-left text-xs font-title uppercase">' . $attr . ':</div><div class="text-left text-[10px] uppercase">' . htmlspecialchars( $value ) . ( $key === 'letterHeight' ? '"' : '' ) . '</div></div>';
					}
				}
			}
		}
	}

	public function quote_details_html( $project ) {
		$projectArray = get_object_vars( $project );

		$instance   = \NOVA_B2B\Nova_Quote::get_instance();
		$attributes = $instance->allAttributes();

		echo '<dl class="quote-details">';

		foreach ( $attributes as $key => $attr ) {
			if ( isset( $projectArray[ $key ] ) && ! empty( $projectArray[ $key ] ) ) {
				if ( is_array( $attr ) ) {
					if ( ( $attr['isLink'] ?? false ) && isset( $projectArray['fontFileUrl'], $projectArray['fontFileName'] ) ) {
						echo '<dt>' . htmlspecialchars( $attr['label'] ) . ':</dt><dd><a href="' . htmlspecialchars( $projectArray['fontFileUrl'] ) . '" target="_blank">' . htmlspecialchars( $projectArray['fontFileName'] ) . '</a></dd>';
					} elseif ( ( $attr['isVinyl'] ?? false ) && isset( $projectArray['vinylWhite']->name, $projectArray['vinylWhite']->code ) ) {
						if ( ( isset( $projectArray['acrylicFront'] ) && $projectArray['acrylicFront'] === '3M Vinyl' ) ||
						( isset( $projectArray['frontOption'] ) && $projectArray['frontOption'] === '3M Vinyl' ) ||
						( isset( $projectArray['frontAcrylicCover'] ) && $projectArray['frontAcrylicCover'] === '3M Vinyl' ) ) {
							echo '<dt>' . htmlspecialchars( $attr['label'] ) . ':</dt><dd>' . htmlspecialchars( $projectArray['vinylWhite']->name ) . ' - [' . htmlspecialchars( $projectArray['vinylWhite']->code ) . ']</dd>';
						}
					} elseif ( ( $attr['isFile'] ?? false ) && isset( $projectArray['fileUrl'], $projectArray['fileName'] ) ) {
						echo '<dt>' . htmlspecialchars( $attr['label'] ) . ':</dt><dd><a href="' . htmlspecialchars( $projectArray['fileUrl'] ) . '" target="_blank">' . htmlspecialchars( $projectArray['fileName'] ) . '</a></dd>';
					} elseif ( ( $attr['isFiles'] ?? false ) && isset( $projectArray['fileUrls'], $projectArray['fileNames'] ) ) {
						$filesHtml = '';
						foreach ( $projectArray['fileUrls'] as $index => $fileUrl ) {
							$fileName   = $projectArray['fileNames'][ $index ] ?? $fileUrl;
							$filesHtml .= '<a href="' . htmlspecialchars( $fileUrl, ENT_QUOTES, 'UTF-8' ) . '" target="_blank">' . htmlspecialchars( $fileName, ENT_QUOTES, 'UTF-8' ) . '</a><br>';
						}
						echo '<dt>' . htmlspecialchars( $attr['label'] ) . ':</dt><dd>' . $filesHtml . '</dd>';
					}
				} else {
					$value = $projectArray[ $key ];
					if ( is_object( $value ) ) {
						if ( isset( $value->thickness ) ) {
							$value = $value->thickness;
						} elseif ( isset( $value->depth ) ) {
							$value = $value->depth;
						} elseif ( isset( $value->name ) ) {
							$value = $value->name;
						}
					}
					if ( isset( $value ) && ! empty( $value ) ) {
						echo '<dt>' . htmlspecialchars( $attr ) . ':</dt><dd>' . htmlspecialchars( $value ) . ( $key === 'letterHeight' ? '"' : '' ) . '</dd>';
					}
				}
			}
		}

		echo '</dl>';
	}




	public function show_project_details( $projects ) {
		foreach ( $projects as $project ) {
			echo '<div class="block">';

			// Display title and price
			if ( ! empty( $project->title ) ) {
				$currencySymbol = get_woocommerce_currency_symbol();
				$price          = get_woocommerce_currency() === 'USD' ? number_format( $project->usdPrice, 2 ) : number_format( $project->cadPrice, 2 );
				echo "<div class='flex justify-between py-2 font-title uppercase'>{$project->title} <span>{$currencySymbol}{$price}</span></div>";
			}

			$this->quote_details( $project );

			echo '</div>'; // Close block div
		}
	}

	public function show_order_product_details( $projects ) {
		foreach ( $projects as $project ) {
			echo '<div class="block px-2 pb-2">';

			$this->quote_details( $project );

			echo '</div>'; // Close block div
		}
	}

	public function show_order_product_details_html( $projects ) {
		$project_keys = array_keys( $projects );
		$last_key     = end( $project_keys );
		foreach ( $projects as $key => $project ) {
			$class = 'quote-details-row';
			if ( $key === $last_key ) {
				$class .= ' last-child';
			}
			echo '<tr class="' . $class . '"><td colspan="3">';
			$this->quote_details_html( $project );
			echo '</td></tr>';
		}
	}




	public function show_details_order( $signage, $quoteID, $subtotal, $product_line ) {
		ob_start();
		?>
<div id="quote-<?php echo $quoteID; ?>" style="display:none;max-width:550px; width: 100%;">
	<div class="pb-8 mb-8 border-b-nova-light border-b">
		<h4 class="text-[16px]">QUOTE ID: Q-<?php echo str_pad( $quoteID, 4, '0', STR_PAD_LEFT ); ?></h4>
		<h4 class="text-[16px]">PRODUCT:
			<?php echo $product_line; ?>
		</h4>
		<?php
		$this->show_project_details( $signage );
		?>
	</div>
	<h6 class="uppercase flex">Subtotal: <span class="ml-auto"><?php echo $subtotal; ?></span></h6>
</div>
		<?php
			echo ob_get_clean();
	}

	public function show_details( $signage, $quoteID, $subtotal ) {
		ob_start();
		?>
<div id="quote-<?php echo $quoteID; ?>" style="display:none;max-width:550px; width: 100%;">
	<div class="pb-8 mb-8 border-b-nova-light border-b">
		<h4 class="text-[16px]">QUOTE ID: Q-<?php echo str_pad( $quoteID, 4, '0', STR_PAD_LEFT ); ?></h4>
		<h4 class="text-[16px] uppercase">PRODUCT:
			<?php echo ( get_field( 'product', $quoteID ) ? get_field( 'product', $quoteID )->post_title : 'CUSTOM PROJECT' ); ?>
		</h4>
		<?php
		$this->show_project_details( $signage );
		?>
	</div>
	<h6 class="uppercase flex">Subtotal: <span class="ml-auto"><?php echo $subtotal; ?></span></h6>
</div>
		<?php
			echo ob_get_clean();
	}

	public function my_account_billing_shipping_fields() {
		$customer_id = get_current_user_id();

		if ( ! $customer_id ) {
			return;
		}

		$customer = new \WC_Customer( $customer_id );

		// Combine billing and shipping fields
		$fields = array_merge(
			WC()->countries->get_address_fields( '', 'billing_' ),
			WC()->countries->get_address_fields( '', 'shipping_' )
		);

		foreach ( $fields as $key => $field ) {
			// Use specific methods for billing and shipping fields
			if ( strpos( $key, 'billing_' ) === 0 ) {
				$value = $customer->{'get_billing_' . substr( $key, 8 )}();
			} elseif ( strpos( $key, 'shipping_' ) === 0 ) {
				$value = $customer->{'get_shipping_' . substr( $key, 9 )}();
			} else {
				$value = get_user_meta( $customer_id, $key, true );
			}

			woocommerce_form_field( $key, $field, $value );
		}
	}

	public function save_my_account_billing_shipping_fields( $customer_id ) {
		$customer = new \WC_Customer( $customer_id );

		// Saving billing fields
		foreach ( WC()->countries->get_address_fields( '', 'billing_' ) as $key => $field ) {
			if ( isset( $_POST[ $key ] ) ) {
				$customer->{'set_billing_' . substr( $key, 8 )}( sanitize_text_field( $_POST[ $key ] ) );
			}
		}

		// Saving shipping fields
		foreach ( WC()->countries->get_address_fields( '', 'shipping_' ) as $key => $field ) {
			if ( isset( $_POST[ $key ] ) ) {
				$customer->{'set_shipping_' . substr( $key, 9 )}( sanitize_text_field( $_POST[ $key ] ) );
			}
		}

		// Save the data
		$customer->save();
	}

	public function get_payment_selections() {
		$args     = array(
			'post_type'      => 'payment_type',
			'posts_per_page' => -1,
		);
		$query    = new WP_Query( $args );
		$payments = array();
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				// Save the current post's title and ID
				$payments[] = array(
					'title'       => get_the_title(),
					'id'          => get_the_ID(),
					'description' => get_field( 'description' ),
				);
			}
			wp_reset_postdata(); // Reset the global post object so that the rest of the page works correctly
		}
		return apply_filters( 'payment_types', $payments );
	}

	public function partner_payment_types( $payments, $user_id = null ) {
		if ( ! $user_id ) {
			$user_id = get_current_user_id();
		}
		$payments      = array();
		$user_payments = get_field( 'payment_type', 'user_' . $user_id );
		global $post;
		if ( $user_payments ) :

			foreach ( $user_payments as $post ) :
				setup_postdata( $post );
				$payments[] = array(
					'title'       => get_the_title(),
					'id'          => get_the_ID(),
					'description' => get_field( 'description' ),
				);
			endforeach;
			wp_reset_postdata();
		endif;

		return $payments;
	}

	public function is_product_in_cart( $product_id ) {
		if ( is_a( WC()->cart, 'WC_Cart' ) ) {
			foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product_id = $cart_item['product_id'];
				if ( $_product_id == $product_id ) {
					return true;
				}
			}
		}
		return false;
	}
}
