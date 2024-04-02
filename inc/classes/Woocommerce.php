<?php

namespace NOVA_B2B\Inc\Classes;

use WP_Query;
use Kadence\Theme;
use WC;
use WC_Order_Item_Shipping;

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
		// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_specs' ), 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_faqs' ), 11 );
		add_filter( 'woocommerce_get_query_vars', array( $this, 'add_mockups_endpoint_query_var' ) );
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
		add_filter( 'woocommerce_add_cart_item_data', array( $this, 'nova_add_to_cart_meta' ), 10, 3 );
		add_filter( 'woocommerce_cart_item_name', array( $this, 'nova_change_product_name' ), 10, 3 );
		add_filter( 'woocommerce_cart_item_thumbnail', array( $this, 'remove_thumbnail_for_nova_product' ), 10, 3 );
		add_action( 'woocommerce_before_calculate_totals', array( $this, 'nova_custom_price_refresh' ) );
		add_action( 'woocommerce_after_cart_item_name', array( $this, 'nova_quote_display_signage' ), 20, 2 );
		add_action( 'woocommerce_order_item_name', array( $this, 'nova_quote_order_name' ), 10, 3 );
		add_action( 'woocommerce_checkout_create_order_line_item', array( $this, 'nova_create_order_line_item' ), 10, 4 );
		add_action( 'woocommerce_order_item_meta_end', array( $this, 'woocommerce_order_item_meta_end' ), 10, 4 );
		// add_action( 'woocommerce_before_order_itemmeta', array( $this, 'nova_order_item_meta' ), 10, 3 );
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
		add_filter( 'woocommerce_thankyou_order_received_text', array( $this, 'woocommerce_thankyou_order_received_text' ) );
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
		add_action( 'woocommerce_get_order_item_totals', array( $this, 'deposit_insert_order_total_row' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'add_custom_meta_box_to_orders' ) );
		add_action( 'woocommerce_admin_order_totals_after_tax', array( $this, 'add_deposit_row' ) );
		add_action( 'wp_ajax_populate_signage', array( $this, 'populate_signage' ) );
		add_action( 'wp_ajax_nopriv_populate_signage', array( $this, 'populate_signage' ) );
		add_filter( 'woocommerce_order_number', array( $this, 'customize_woocommerce_order_number' ), 10, 2 );
		add_filter( 'woocommerce_available_payment_gateways', array( $this, 'disable_bacs_for_non_admins' ) );
		add_filter( 'payment_types', array( $this, 'partner_payment_types' ) );
	}

	public function disable_bacs_for_non_admins( $available_gateways ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			// Target checkout and order payment pages
			if ( is_checkout() || is_wc_endpoint_url( 'order-pay' ) ) {
				// Remove BACS gateway for non-admin users
				if ( isset( $available_gateways['bacs'] ) ) {
					unset( $available_gateways['bacs'] );
				}
				// Remove Cheque gateway for non-admin users
				if ( isset( $available_gateways['cheque'] ) ) {
					unset( $available_gateways['cheque'] );
				}
			}
		}
		return $available_gateways;
	}

	public function customize_woocommerce_order_number( $order_number, $order ) {
		return 'NV' . str_pad( $order_number, 5, '0', STR_PAD_LEFT );
	}

	public function add_deposit_row( $order_id ) {
		$deposit_total                   = get_post_meta( $order_id, '_deposit_total', true );
		$has_adjusted_duplicate_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$original_total                  = get_post_meta( $order_id, '_original_total', true );
		$from_order                      = get_post_meta( $order_id, '_from_order_id', true );
		$order                           = wc_get_order( $order_id );
		if ( $original_total && $from_order ) :
			?>
<tr>
	<td class="label"><?php esc_html_e( 'Overall Total', 'woocommerce' ); ?>:</td>
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

	public function pending_payment_order_content( $post ) {
		// Output your custom content here. For example:
		$order_id       = get_post_meta( $post->ID, '_adjusted_duplicate_order_id', true );
		$original_total = get_post_meta( $post->ID, '_original_total', true );
		$order_edit_url = admin_url( 'post.php?post=' . $order_id . '&action=edit' );
		?>
<a href="<?php echo esc_url( $order_edit_url ); ?>" class="button button-primary">View Order</a>

<p>Original Total: <?php echo $original_total; ?></p>

		<?php

	}

	public function deposit_insert_order_total_row( $total_rows, $order ) {
		// Check if the order has the '_deposit_total' meta key
		$deposit_total  = get_post_meta( $order->get_id(), '_deposit_total', true );
		$from_order     = get_post_meta( $order->get_id(), '_from_order_id', true );
		$original_total = get_post_meta( $order->get_id(), '_original_total', true );

		// If '_deposit_total' meta key doesn't exist, return the original total rows
		if ( empty( $deposit_total ) || empty( $from_order ) ) {
			return $total_rows;
		}

		// Initialize a new array for the modified total rows
		$new_total_rows = array();

		foreach ( $total_rows as $total_key => $total ) {
			// Insert your custom row before the 'order_total' row
			$new_total_rows['deposit_total'] = array(
				'label' => __( 'Deposit:', 'woocommerce' ),
				'value' => wc_price( -$deposit_total ),
			);
			$new_total_rows[ $total_key ]    = $total;
		}

		if ( $from_order && isset( $new_total_rows['cart_subtotal'] ) ) {
			unset( $new_total_rows['cart_subtotal'] );
			unset( $new_total_rows['shipping'] );

			$overall_total_row = array(
				'overall_total' => array(
					'label' => __( 'Overall Total (+shipping):', 'woocommerce' ),
					'value' => wc_price( $original_total ),
				),
			);

			// Prepend the custom row to the beginning of the total rows array
			$new_total_rows = array_merge( $overall_total_row, $new_total_rows );

		}

		return $new_total_rows;
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
		$shipping_item->set_method_title( $shipping_method ); // Set to the title of your shipping method
		$shipping_item->set_method_id( 'custom_shipping_method' ); // Set to an appropriate shipping method ID
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

			// Save the session values as order meta for the original order
			update_post_meta( $order_id, '_payment_select', $payment_select );
			update_post_meta( $order_id, '_original_tax', $tax );
			update_post_meta( $order_id, '_original_shipping', $shipping );
			update_post_meta( $order_id, '_original_total', $total );
			update_post_meta( $order_id, '_original_shipping_method', $shipping_method );
			update_post_meta( $order_id, '_pending_payment', $pending_payment );
			update_post_meta( $order_id, '_deposit_total', $deposit_total );

			// Create the adjusted duplicate order
			$new_order_id = $this->create_duplicate_order_with_adjustment( $order, $payment_select, $total, $shipping, $shipping_method, $tax, $pending_payment );

			// Optionally, link the new order with the original by storing the new order ID in the original order's meta
			update_post_meta( $order_id, '_adjusted_duplicate_order_id', $new_order_id );
			update_post_meta( $new_order_id, '_from_order_id', $order_id );
			update_post_meta( $new_order_id, '_deposit_total', $deposit_total );
			update_post_meta( $new_order_id, '_pending_payment', $pending_payment );
			update_post_meta( $new_order_id, '_original_total', $total );
			update_post_meta( $new_order_id, '_original_tax', $tax );
			update_post_meta( $new_order_id, '_original_shipping', $shipping );
			update_post_meta( $new_order_id, '_original_shipping_method', $shipping_method );

			// Reset the session variables
			WC()->session->__unset( 'payment_select' );
			WC()->session->__unset( 'original_tax' );
			WC()->session->__unset( 'original_shipping' );
			WC()->session->__unset( 'original_total' );
			WC()->session->__unset( 'original_shipping_methods' );
			WC()->session->__unset( 'pending_payment' );
			WC()->session->__unset( 'deposit_total' );
		}
	}


	public function custom_modify_cart_total( $total ) {
		if ( WC()->session ) {
			$payment_select = (int) WC()->session->get( 'payment_select' );

			// Save the original total, shipping, and tax values only once to avoid overwriting

			// If the payment method is 'net30', set the total to 0
			if ( $payment_select && 0 !== $payment_select ) {

				$chosen_methods = WC()->session->get( 'chosen_shipping_methods' );

				$shipping_method_names = array();

				foreach ( $chosen_methods as $method_id ) {
					// Split the chosen method id to get the method's instance ID
					list($method, $instance_id) = explode( ':', $method_id );

					// Access all available shipping rates for the current package
					$available_shipping_rates = WC()->session->get( 'shipping_for_package_0' )['rates'];

					// Check if the chosen method's ID exists in the available rates and retrieve its label (name)
					if ( isset( $available_shipping_rates[ $method_id ] ) ) {
						$shipping_method_names[] = $available_shipping_rates[ $method_id ]->get_label();
					}
				}

				// Convert the shipping method names array to a string, separated by commas if there are multiple
				$shipping_names = implode( ', ', $shipping_method_names );

				// Store the shipping method names in the session, join them if multiple
				WC()->session->set( 'original_shipping_methods', $shipping_names );

				$deposit = get_field( 'deposit', $payment_select ) / 100;

				$new_total = $total * $deposit;

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
		$expedite_cost = $cart_total * 0.155; // 15.5%

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
		if ( isset( $package['destination']['city'] ) && strtolower( $package['destination']['city'] ) === 'vancouver' ) {
			if ( $expedite ) {
				$rates['flat_rate:3']->cost = min( $expedite_cost, $standard_cost, ( isset( $flat_rate->cost ) ? $flat_rate->cost : PHP_INT_MAX ) );
				// Unset other rates to show only Expedite
				unset( $rates['flat_rate:2'], $rates['flat_rate:4'] );
			}
		}

		return $rates;
	}

	public function add_pst_field( $fields ) {

		$fields['shipping_pst'] = array(
			'label'    => __( 'PST', 'woocommerce' ), // Change the label to something appropriate
			'required' => true, // Not required by default
			'class'    => array( 'form-row-wide', 'custom-field-bc' ), // Custom class for JavaScript
			'priority' => 105, // Adjust the priority to position it right after the state field
		);

		return $fields;
	}

	public function currency_symbol( $currency_symbol, $currency ) {
		if ( $currency == 'USD' ) {
			$currency_symbol = 'USD' . $currency_symbol;
		}
		if ( $currency === 'CAD' ) {
			$currency_symbol = 'CAD' . $currency_symbol;
		}
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

		$signage_query = new WP_Query(
			array(
				'post_type'      => 'signage',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'post_parent'    => 0,
			)
		);
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
		<div id="productCat-list" class="hidden">
			<?php if ( $custom ) : ?>
			<a class="product-cat-item text-black" data-signage="<?php echo $custom->ID; ?>"
				href="<?php echo esc_url( get_the_permalink( $custom->ID ) ); ?>">
				<?php echo get_the_post_thumbnail( $custom->ID, array( 35, 35 ) ); ?>
				<?php echo get_the_title( $custom->ID ); ?>
			</a>
			<?php endif; ?>

			<?php
			while ( $signage_query->have_posts() ) {
				$signage_query->the_post();
				?>
			<a class="product-cat-item text-black" data-signage="<?php echo get_the_ID(); ?>"
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
			)
		);
		?>
		<?php if ( $nova_query->have_posts() ) { ?>
		<div id="novaProduct-list" class="hidden">

			<?php
			while ( $nova_query->have_posts() ) {
				$nova_query->the_post();
				?>
			<a class="product-cat-item text-black" href="<?php echo esc_url( get_permalink() ); ?>">
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
<a class="product-cat-item text-black" href="<?php echo esc_url( get_permalink() ); ?>">
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

	public function woocommerce_thankyou_order_received_text( $text ) {
		return 'Your order is being processed.';
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
				wp_delete_post( $quote_id );
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

	public function nova_order_item_meta( $item_id, $item, $product ) {
		if ( is_admin() && $item->get_type() === 'line_item' ) {
			$nova_title = wc_get_order_item_meta( $item_id, 'nova_title', true );
			if ( ! empty( $nova_title ) ) {
				// Directly update the order item name in the database
				global $wpdb;
				$wpdb->update(
					$wpdb->prefix . 'woocommerce_order_items',
					array( 'order_item_name' => $nova_title ),
					array( 'order_item_id' => $item_id )
				);
			}
		}
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

		$html  = '<h6 style="font-size: 100%; margin-top: 10px;margin-bottom: 0;">Quote ID: <strong>Q-' . str_pad( $product, 4, '0', STR_PAD_LEFT ) . '</strong></h6>';
		$html .= '<h6 style="font-size: 100%; margin-top: 0; margin-bottom: 0;">Project Name: <strong>' . $nova_title . '</strong></h6>';
		$html .= '<h6 style="font-size: 100%; margin-top: 0; margin-bottom: 20px;">Product: <strong>' . $product_line . '</strong></h6>';

		foreach ( $array as $object ) {

			$html .= '<div style="padding: 10px; border: 1pxz solid #d2d2d2 !important;">';

			// Each property of the object gets its own row

			$html .= '<p style="font-size: 125%; margin-bottom: 8px;">' . htmlspecialchars( $object->title ) . '</p>';

			$html .= '<p>';
			if ( isset( $object->type ) && ! empty( $object->type ) ) {
				$html .= '<strong>Type: </strong>' . htmlspecialchars( $object->type ) . '<br>';
			}

			if ( isset( $object->width ) && ! empty( $object->width ) ) {
				$html .= '<strong>Width: </strong>' . htmlspecialchars( $object->width ) . '<br>';
			}

			if ( isset( $object->height ) && ! empty( $object->height ) ) {
				$html .= '<strong>Height: </strong>' . htmlspecialchars( $object->height ) . '<br>';
			}

			if ( isset( $object->letters ) && ! empty( $object->letters ) ) {
				$html .= '<strong>Letters: </strong>' . htmlspecialchars( $object->letters ) . '<br>';
			}

			if ( isset( $object->thickness ) && ! empty( $object->thickness ) ) {
				$html .= '<strong>Thickness: </strong>' . htmlspecialchars( $object->thickness->thickness ) . '<br>';
			}
			if ( isset( $object->color->name ) && ! empty( $object->color->name ) ) {
				$html .= '<strong>Color: </strong>' . htmlspecialchars( $object->color->name ) . '<br>';
			}

			if ( isset( $object->customColor ) && ! empty( $object->customColor ) ) {
				$html .= '<strong>Custom Color: </strong>' . htmlspecialchars( $object->customColor ) . '<br>';
			}

			if ( isset( $object->letterHeight ) && ! empty( $object->letterHeight ) ) {
				$html .= '<strong>Letter Height: </strong>' . htmlspecialchars( $object->letterHeight ) . '"<br>';
			}

			if ( isset( $object->printPreference ) && ! empty( $object->printPreference ) ) {
				$html .= '<strong>Print Preference: </strong>' . htmlspecialchars( $object->printPreference ) . '<br>';
			}

			if ( isset( $object->baseColor ) && ! empty( $object->baseColor ) ) {
				$html .= '<strong>Base Color: </strong>' . htmlspecialchars( $object->baseColor ) . '<br>';
			}

			if ( isset( $object->metal ) && ! empty( $object->metal ) ) {
				$html .= '<strong>Metal: </strong>' . htmlspecialchars( $object->metal ) . '<br>';
			}

			if ( isset( $object->stainLessMetalFinish ) && ! empty( $object->stainLessMetalFinish ) ) {
				$html .= '<strong>Metal Finish: </strong>' . htmlspecialchars( $object->stainLessMetalFinish ) . '<br>';
			}

			if ( isset( $object->metalFinishing ) && ! empty( $object->metalFinishing ) ) {
				$html .= '<strong>Metal Finishing: </strong>' . htmlspecialchars( $object->metalFinishing ) . '<br>';
			}

			if ( isset( $object->metalFinish ) && ! empty( $object->metalFinish ) ) {
				$html .= '<strong>Metal Finish: </strong>' . htmlspecialchars( $object->metalFinish ) . '<br>';
			}

			if ( isset( $object->metalFinish->name ) && ! empty( $object->metalFinish->name ) ) {
				$html .= '<strong>Metal Finish: </strong>' . htmlspecialchars( $object->metalFinish->name ) . '<br>';
			}

			if ( isset( $object->acrylicBase ) && ! empty( $object->acrylicBase->name ) ) {
				$html .= '<strong>Acrylic Base: </strong>' . htmlspecialchars( $object->acrylicBase->name ) . '<br>';
			}

			if ( isset( $object->acrylicReveal ) && ! empty( $object->acrylicReveal ) ) {
				$html .= '<strong>Acrylic Base: </strong>' . htmlspecialchars( $object->acrylicReveal ) . '<br>';
			}

			if ( isset( $object->stainlessSteelPolished ) && ! empty( $object->stainlessSteelPolished ) ) {
				$html .= '<strong>Steel Polished: </strong>' . htmlspecialchars( $object->stainlessSteelPolished ) . '<br>';
			}

			if ( isset( $object->mounting ) && ! empty( $object->mounting ) ) {
				$html .= '<strong>Mounting: </strong>' . htmlspecialchars( $object->mounting ) . '<br>';
			}
			if ( isset( $object->font ) && ! empty( $object->font ) ) {
				$html .= '<strong>Font: </strong>' . htmlspecialchars( $object->font ) . '<br>';
			}
			if ( isset( $object->customFont ) && ! empty( $object->customFont ) ) {
				$html .= '<strong>Custom Font: </strong>' . htmlspecialchars( $object->customFont ) . '<br>';
			}
			if ( isset( $object->waterproof ) && ! empty( $object->waterproof ) ) {
				$html .= '<strong>Environment: </strong>' . htmlspecialchars( $object->waterproof ) . '<br>';
			}

			if ( isset( $object->finishing ) && ! empty( $object->finishing ) ) {
				$html .= '<strong>Finishing: </strong>' . htmlspecialchars( $object->finishing ) . '<br>';
			}

			if ( isset( $object->installation ) && ! empty( $object->installation ) ) {
				$html .= '<strong>Installation: </strong>' . htmlspecialchars( $object->installation ) . '<br>';
			}

			if ( isset( $object->pieces ) && ! empty( $object->pieces ) ) {
				$html .= '<strong>Pieces/Cutouts: </strong>' . htmlspecialchars( $object->pieces ) . '<br>';
			}

			if ( isset( $object->description ) && ! empty( $object->description ) ) {
				$html .= '<strong>Description: </strong>' . htmlspecialchars( $object->description ) . '<br>';
			}

			if ( isset( $object->comments ) && ! empty( $object->comments ) ) {
				$html .= '<strong>Comments: </strong>' . htmlspecialchars( $object->comments ) . '<br>';
			}

			if ( isset( $object->file ) && ! empty( $object->fileUrl ) ) {
				$html .= '<strong>File: </strong><a href="' . $object->fileUrl . '" target="_blank">' . htmlspecialchars( $object->fileName ) . '</a><br>';
			}

			if ( isset( $object->fontFile ) && isset( $object->fontFileName ) && ! empty( $object->fontFileUrl ) ) {
				$html .= '<strong>File: </strong><a href="' . $object->fontFileUrl . '" target="_blank">' . htmlspecialchars( $object->fontFileName ) . '</a><br>';
			}

			$html .= '</div>';

		}

		return $html;
	}

	public function nova_custom_price_refresh( $cart_object ) {

		foreach ( $cart_object->get_cart() as $item ) {

			if ( array_key_exists( 'usd_price', $item ) && array_key_exists( 'nova_quote', $item ) ) {

				$item['data']->set_price( $item['usd_price'] );
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
		if ( get_field( 'nova_quote_product', 'option' )->ID === $product_id && isset( $_POST['nova_title'] ) && isset( $_POST['quote_id'] ) ) {
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

	public function mockups_processing_content() {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'processing',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'      => 'nova_quote',
				'meta_query'     => $meta_query,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_drafts_content() {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'draft',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'      => 'nova_quote',
				'meta_query'     => $meta_query,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_payments_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'ready',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'      => 'nova_quote',
				'meta_query'     => $meta_query,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_archived_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'archived',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'      => 'nova_quote',
				'meta_query'     => $meta_query,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
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

	public function add_mockups_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'      => 'nova_quote',
				'meta_query'     => $meta_query,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_nav() {
		global $wp_query;

		$all        = $this->get_all_mockups_quantity( 'all' );
		$drafts     = $this->get_all_mockups_quantity( 'draft' );
		$processing = $this->get_all_mockups_quantity( 'processing' );
		$quoted     = $this->get_all_mockups_quantity( 'ready' );
		$archived   = $this->get_all_mockups_quantity( 'archived' );

		?>
<div class="border-b font-title uppercase flex gap-6 md:gap-11 mb-8">
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/all' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/all'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">ALL
		Mockups <span>(<?php echo $all; ?>)</span></a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/drafts' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/drafts'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Drafts
		<span>(<?php echo $drafts; ?>)</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/processing' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/processing'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Processing
		<span>(<?php echo $processing; ?>)</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/payments' ) ); ?>"
		class="py-4 py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/payments'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Quoted
		<span>(<?php echo $quoted; ?>)</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/archived' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/archived'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Archived
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
		<p class="faq-question"><?php echo get_sub_field( 'question' ); ?> <svg width="14" height="14"
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
		foreach ( $signage as $item ) {
			?>

		<div class="block">
			<div class="flex justify-between py-2 font-title uppercase">
				<?php echo $item->title; ?>
				<span>$<?php echo number_format( $item->usdPrice, 2 ); ?> USD</span>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">TYPE</div>
				<div class="text-left text-[10px] uppercase">
					<?php echo $item->type; ?>
				</div>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">THICKNESS</div>
				<div class="text-left text-[10px] uppercase">
					<?php echo $item->thickness->thickness; ?>
				</div>
			</div>

			<?php if ( $item->type === 'logo' ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">WIDTH</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->width; ?>"
				</div>
			</div>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">HEIGHT</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->height; ?>"
				</div>
			</div>
				<?php
				endif;
			?>

			<?php if ( $item->type === 'letters' ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">Letter Height</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->letterHeight; ?>"
				</div>
			</div>
			<?php endif; ?>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">MOUNTING</div>
				<div class="text-left text-[10px]"><?php echo $item->mounting; ?></div>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">WATERPROOF</div>
				<div class="text-left text-[10px]"><?php echo $item->waterproof; ?></div>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">FINISHING</div>
				<div class="text-left text-[10px]"><?php echo $item->finishing; ?></div>
			</div>

			<?php if ( $item->type === 'letters' ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">COLOR</div>
				<div class="text-left text-[10px]"><?php echo $item->color->name; ?></div>
			</div>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">FONT</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->font; ?>
				</div>
			</div>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">LINE TEXT</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->letters; ?>
				</div>
			</div>
			<?php endif; ?>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">COMMENTS</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->comments; ?>
				</div>
			</div>
			<?php if ( ! empty( $item->file ) ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">FILE</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->fileName; ?>
				</div>
			</div>
			<?php endif; ?>
		</div>


			<?php
		}
		?>
	</div>
	<h6 class="uppercase flex">Subtotal: <span class="ml-auto"><?php echo $subtotal; ?></span></h6>
</div>
		<?php
			echo ob_get_clean();
	}

	public function show_details( $signage, $quoteID ) {
		ob_start();
		?>
<div id="quote-<?php echo $quoteID; ?>" style="display:none;max-width:550px; width: 100%;">
	<div class="pb-8 mb-8 border-b-nova-light border-b">
		<h4 class="text-[16px]">QUOTE ID: Q-<?php echo str_pad( $quoteID, 4, '0', STR_PAD_LEFT ); ?></h4>
		<h4 class="text-[16px]">PRODUCT:
			<?php echo ( get_field( 'product', $quoteID ) ? get_field( 'product', $quoteID )->post_title : 'CUSTOM PROJECT' ); ?>
		</h4>
		<?php
		foreach ( $signage as $item ) {
			?>

		<div class="block">
			<div class="flex justify-between py-2 font-title uppercase">
				<?php echo $item->title; ?>
				<span><?php echo get_woocommerce_currency_symbol(); ?><?php echo ( get_woocommerce_currency() === 'USD' ? number_format( $item->usdPrice, 2 ) : number_format( $item->cadPrice, 2 ) ); ?></span>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">TYPE</div>
				<div class="text-left text-[10px] uppercase">
					<?php echo $item->type; ?>
				</div>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">THICKNESS</div>
				<div class="text-left text-[10px] uppercase">
					<?php echo $item->thickness->thickness; ?>
				</div>
			</div>

			<?php if ( $item->type === 'logo' ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">WIDTH</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->width; ?>"
				</div>
			</div>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">HEIGHT</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->height; ?>"
				</div>
			</div>
				<?php
				endif;
			?>

			<?php if ( $item->type === 'letters' ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">Letter Height</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->letterHeight; ?>"
				</div>
			</div>
			<?php endif; ?>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">MOUNTING</div>
				<div class="text-left text-[10px]"><?php echo $item->mounting; ?></div>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">WATERPROOF</div>
				<div class="text-left text-[10px]"><?php echo $item->waterproof; ?></div>
			</div>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">FINISHING</div>
				<div class="text-left text-[10px]"><?php echo $item->finishing; ?></div>
			</div>

			<?php if ( $item->type === 'letters' ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">COLOR</div>
				<div class="text-left text-[10px]"><?php echo $item->color->name; ?></div>
			</div>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">FONT</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->font; ?>
				</div>
			</div>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">LINE TEXT</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->letters; ?>
				</div>
			</div>
			<?php endif; ?>

			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">COMMENTS</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->comments; ?>
				</div>
			</div>
			<?php if ( ! empty( $item->file ) ) : ?>
			<div class="grid grid-cols-2 py-[2px]">
				<div class="text-left text-xs font-title">FILE</div>
				<div class="text-left text-[10px] break-words">
					<?php echo $item->fileName; ?>
				</div>
			</div>
			<?php endif; ?>
		</div>


			<?php
		}
		?>
	</div>
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

	public function partner_payment_types( $payments ) {
		$user_id       = get_current_user_id();
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

Woocommerce::get_instance();
