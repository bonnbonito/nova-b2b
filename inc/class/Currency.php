<?php

namespace NOVA_B2B;

class Currency {
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
		add_action( 'woocommerce_product_options_pricing', array( $this, 'add_cad_price_fields_to_general_tab' ) );
		add_action( 'woocommerce_process_product_meta', array( $this, 'save_cad_price_fields' ) );
		add_action( 'woocommerce_variation_options_pricing', array( $this, 'add_cad_price_fields_to_variation_tab' ), 10, 3 );
		add_action( 'woocommerce_save_product_variation', array( $this, 'save_cad_price_fields_for_variations' ), 10, 2 );
		add_filter( 'woocommerce_get_price_html', array( $this, 'use_cad_price_if_currency_is_cad' ), 10, 2 );
		add_filter( 'woocommerce_available_variation', array( $this, 'add_cad_prices_to_variation_json' ), 10, 3 );
		add_filter( 'woocommerce_add_cart_item_data', array( $this, 'filter_price_before_adding_to_cart' ), 999999, 3 );
		add_filter( 'woocommerce_get_cart_item_from_session', array( $this, 'apply_custom_price_in_cart' ), 999999, 1 );
		add_action( 'woocommerce_cart_loaded_from_session', array( $this, 'refresh_cart_totals_on_load' ), 20 );

	}

	// Add custom CAD price fields to the WooCommerce product General tab
	public function add_cad_price_fields_to_general_tab() {
		echo '<div class="options_group">';

		// Regular CAD Price
		woocommerce_wp_text_input(
			array(
				'id' => '_cad_price_field',
				'label' => __( 'CAD Price', 'woocommerce' ),
				'desc_tip' => 'true',
				'description' => __( 'Enter the product price in CAD.', 'woocommerce' ),
				'type' => 'text',
			)
		);

		// Sale CAD Price
		woocommerce_wp_text_input(
			array(
				'id' => '_cad_sale_price_field',
				'label' => __( 'CAD Sale Price', 'woocommerce' ),
				'desc_tip' => 'true',
				'description' => __( 'Enter the sale price in CAD.', 'woocommerce' ),
				'type' => 'text',
			)
		);

		echo '</div>';
	}

	// Save the CAD price field
	public function save_cad_price_fields( $post_id ) {
		if ( isset( $_POST['_cad_price_field'] ) ) {
			update_post_meta( $post_id, '_cad_price_field', sanitize_text_field( $_POST['_cad_price_field'] ) );
		}

		// Save CAD Sale Price
		if ( isset( $_POST['_cad_sale_price_field'] ) ) {
			update_post_meta( $post_id, '_cad_sale_price_field', sanitize_text_field( $_POST['_cad_sale_price_field'] ) );
		}
	}

	public function add_cad_price_fields_to_variation_tab( $loop, $variation_data, $variation ) {
		echo '<div class="clear form-row form-row-first">';
		// Regular CAD Price
		woocommerce_wp_text_input(
			array(
				'id' => "_cad_price_field_$variation->ID",
				'name' => "_cad_price_field[$variation->ID]",
				'label' => __( 'CAD Price', 'woocommerce' ),
				'desc_tip' => 'true',
				'description' => __( 'Enter the CAD price for this variation.', 'woocommerce' ),
				'type' => 'text',
				'value' => get_post_meta( $variation->ID, '_cad_price_field', true ),
				'wrapper_class' => 'form-field',
			)
		);
		echo '</div>';

		echo '<div class="form-row form-row-last">';
		// Sale CAD Price
		woocommerce_wp_text_input(
			array(
				'id' => "_cad_sale_price_field_$variation->ID",
				'name' => "_cad_sale_price_field[$variation->ID]",
				'label' => __( 'CAD Sale Price', 'woocommerce' ),
				'desc_tip' => 'true',
				'description' => __( 'Enter the CAD sale price for this variation.', 'woocommerce' ),
				'type' => 'text',
				'value' => get_post_meta( $variation->ID, '_cad_sale_price_field', true ),
				'wrapper_class' => 'form-field',
			)
		);
		echo '</div>';
	}

	public function save_cad_price_fields_for_variations( $variation_id ) {
		if ( isset( $_POST['_cad_price_field'][ $variation_id ] ) ) {
			update_post_meta( $variation_id, '_cad_price_field', sanitize_text_field( $_POST['_cad_price_field'][ $variation_id ] ) );
		}

		if ( isset( $_POST['_cad_sale_price_field'][ $variation_id ] ) ) {
			update_post_meta( $variation_id, '_cad_sale_price_field', sanitize_text_field( $_POST['_cad_sale_price_field'][ $variation_id ] ) );
		}
	}

	public function use_cad_price_if_currency_is_cad( $price, $product ) {
		// Check if the current WooCommerce currency is CAD
		if ( get_woocommerce_currency() === 'CAD' ) {
			// Get CAD regular and sale price
			$cad_price = get_post_meta( $product->get_id(), '_cad_price_field', true );
			$cad_sale_price = get_post_meta( $product->get_id(), '_cad_sale_price_field', true );

			// If CAD sale price is set, use it
			if ( ! empty( $cad_sale_price ) ) {
				return wc_price( $cad_sale_price );
			}
			// Otherwise, use the regular CAD price
			elseif ( ! empty( $cad_price ) ) {
				return wc_price( $cad_price );
			}
		}

		// Return default price if currency is not CAD
		return $price;
	}

	public function add_cad_prices_to_variation_json( $data, $product, $variation ) {
		if ( get_woocommerce_currency() === 'CAD' ) {
			$cad_price = get_post_meta( $variation->get_id(), '_cad_price_field', true );
			$cad_sale_price = get_post_meta( $variation->get_id(), '_cad_sale_price_field', true );

			// Override variation price if CAD currency is active
			if ( ! empty( $cad_sale_price ) ) {
				$data['display_price'] = (float) $cad_sale_price;
			} elseif ( ! empty( $cad_price ) ) {
				$data['display_price'] = (float) $cad_price;
			}
		}

		return $data;
	}

	public function filter_price_before_adding_to_cart( $cart_item_data, $product_id, $variation_id ) {
		if ( get_woocommerce_currency() === 'CAD' ) {
			// Determine if it's a variable or simple product
			$product_id = $variation_id ? $variation_id : $product_id;

			// Get CAD price fields
			$cad_price = get_post_meta( $product_id, '_cad_price_field', true );
			$cad_sale_price = get_post_meta( $product_id, '_cad_sale_price_field', true );

			// Use CAD sale price if available, otherwise use CAD price
			if ( ! empty( $cad_sale_price ) ) {
				$cart_item_data['cad_custom_price'] = (float) $cad_sale_price / NOVA_EXCHANGE_RATE;
			} elseif ( ! empty( $cad_price ) ) {
				$cart_item_data['cad_custom_price'] = (float) $cad_price / NOVA_EXCHANGE_RATE;
			}
		}

		return $cart_item_data;
	}

	public function apply_custom_price_in_cart( $cart_item ) {
		if ( isset( $cart_item['cad_custom_price'] ) ) {
			$cart_item['data']->set_price( $cart_item['cad_custom_price'] );
		}
		return $cart_item;
	}

	public function refresh_cart_totals_on_load( $cart ) {
		if ( get_woocommerce_currency() === 'CAD' ) {
			$cart->calculate_totals();
		}
	}
}