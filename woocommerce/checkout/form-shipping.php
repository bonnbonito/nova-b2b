<?php
/**
 * Checkout shipping information form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-shipping.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 * @global WC_Checkout $checkout
 */

defined( 'ABSPATH' ) || exit;
$user_id  = get_current_user_id();
$customer = new WC_Customer( $user_id );
?>
<div id="checkoutShippingShow" class="block">
	<h4 class="woocommerce-column__title uppercase tracking-[2.4px] mb-4 md:mb-9 flex gap-4">
		<?php esc_html_e( 'Shipping details', 'woocommerce' ); ?>
		<a data-toggle-checkout="#checkoutShipping" data-hide="#checkoutShippingShow" title="Edit Shipping Details"><svg
				xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
				stroke="currentColor" class="w-5 h-5 cursor-pointer" aria-label="Edit Shipping Details">
				<path strokeLinecap="round" strokeLinejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
			</svg></a>
	</h4>

	<div class="border-none pl-0">

		<?php if ( $customer->get_shipping_first_name() && $customer->get_shipping_last_name() ) : ?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Name:</h6>
			<span
				class="text-sm"><?php echo $customer->get_shipping_first_name() . ' ' . $customer->get_shipping_last_name(); ?></span>
		</div>
		<?php endif; ?>

		<?php
		if ( $customer->get_shipping_phone() ) :
			?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Phone:</h6>
			<span class="text-sm"><?php echo $customer->get_shipping_phone(); ?></span>
		</div>
		<?php endif; ?>

		<?php
				$shipping_address_1 = $customer->get_shipping_address_1();
				$shipping_address_2 = $customer->get_shipping_address_2();
				$shipping_city      = $customer->get_shipping_city();
				$shipping_state     = $customer->get_shipping_state();
				$shipping_postcode  = $customer->get_shipping_postcode();
				$shipping_country   = $customer->get_shipping_country();
				$shipping_address   = $shipping_address_1;
		if ( ! empty( $shipping_address_2 ) ) {
			$shipping_address .= ', <br>' . $shipping_address_2;
		}
		if ( ! empty( $shipping_city ) ) {
			$shipping_address .= ', ' . $shipping_city;
		}
		if ( ! empty( $shipping_state ) ) {
			$shipping_address .= ',<br> ' . $shipping_state;
		}
		if ( ! empty( $shipping_postcode ) ) {
				$shipping_address .= ', ' . $shipping_postcode;
		}
		if ( ! empty( $shipping_country ) ) {
				$shipping_address .= ', ' . $shipping_country;
		}
		?>

		<div class="grid grid-cols-[180px_1fr] items-start py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Shipping Address:</h6>
			<address class="border-none p-0 text-sm" style="font-style: normal;"><?php echo $shipping_address; ?>
			</address>
		</div>

		<?php
		$shipping_pst = get_user_meta( $user_id, 'shipping_pst', true );

		if ( $shipping_pst && $shipping_country == 'CA' ) :
			?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">PST:</h6>
			<span class="text-sm"><?php echo $shipping_pst; ?></span>
		</div>
		<?php endif; ?>


	</div>
</div>
<div id="checkoutShipping" class="hidden">
	<div class="woocommerce-shipping-fields">
		<?php if ( true === WC()->cart->needs_shipping_address() ) : ?>

		<h3 class="text-2xl uppercase" id="ship-to-different-address">
			<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
				<input id="ship-to-different-address-checkbox"
					class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
					<?php checked( apply_filters( 'woocommerce_ship_to_different_address_checked', 'shipping' === get_option( 'woocommerce_ship_to_destination' ) ? 1 : 0 ), 1 ); ?>
					type="checkbox" name="ship_to_different_address" value="1" />
				<span><?php esc_html_e( 'Ship to a different address?', 'woocommerce' ); ?></span>
			</label>
		</h3>

		<div class="shipping_address">

			<?php do_action( 'woocommerce_before_checkout_shipping_form', $checkout ); ?>

			<div class="woocommerce-shipping-fields__field-wrapper">
				<?php
				$fields = $checkout->get_checkout_fields( 'shipping' );

				foreach ( $fields as $key => $field ) {
					woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
				}
				?>
			</div>

			<?php do_action( 'woocommerce_after_checkout_shipping_form', $checkout ); ?>

		</div>

		<?php endif; ?>
	</div>
	<div class="woocommerce-additional-fields">
		<?php do_action( 'woocommerce_before_order_notes', $checkout ); ?>

		<?php if ( apply_filters( 'woocommerce_enable_order_notes_field', 'yes' === get_option( 'woocommerce_enable_order_comments', 'yes' ) ) ) : ?>

			<?php if ( ! WC()->cart->needs_shipping() || wc_ship_to_billing_address_only() ) : ?>

		<h3><?php esc_html_e( 'Additional information', 'woocommerce' ); ?></h3>

		<?php endif; ?>

		<div class="woocommerce-additional-fields__field-wrapper">
			<?php foreach ( $checkout->get_checkout_fields( 'order' ) as $key => $field ) : ?>
				<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
			<?php endforeach; ?>
		</div>

		<?php endif; ?>

		<?php do_action( 'woocommerce_after_order_notes', $checkout ); ?>
	</div>
</div>
