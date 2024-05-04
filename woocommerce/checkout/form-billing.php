<?php
/**
 * Checkout billing information form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-billing.php.
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
<div id="checkoutBillingShow" class="block mb-8 md:mb-0">
	<h4 class="woocommerce-column__title uppercase tracking-[2.4px] mb-4 md:mb-9 flex gap-4">
		<?php esc_html_e( 'Billing details', 'woocommerce' ); ?>

		<a data-toggle-checkout="#checkoutBilling" data-hide="#checkoutBillingShow" title="Edit Billing Details"><svg
				xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
				stroke="currentColor" class="w-5 h-5 cursor-pointer" aria-label="Edit Billing Details">
				<path strokeLinecap="round" strokeLinejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
			</svg></a>
	</h4>

	<div class="border-none pl-0">

		<?php if ( get_field( 'business_id', 'user_' . $user_id ) ) : ?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Business ID:</h6>
			<span class="text-sm"><?php echo get_field( 'business_id', 'user_' . $user_id ); ?></span>
		</div>
		<?php endif; ?>

		<?php if ( $customer->get_billing_first_name() && $customer->get_billing_last_name() ) : ?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Name:</h6>
			<span
				class="text-sm"><?php echo $customer->get_billing_first_name() . ' ' . $customer->get_billing_last_name(); ?></span>
		</div>
		<?php endif; ?>

		<?php
		if ( $customer->get_billing_phone() ) :
			?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Phone:</h6>
			<span class="text-sm"><?php echo $customer->get_billing_phone(); ?></span>
		</div>
		<?php endif; ?>

		<?php
				$billing_address_1 = $customer->get_billing_address_1();
				$billing_address_2 = $customer->get_billing_address_2();
				$billing_city      = $customer->get_billing_city();
				$billing_state     = $customer->get_billing_state();
				$billing_postcode  = $customer->get_billing_postcode();
				$billing_country   = $customer->get_billing_country();
				$billing_address   = $billing_address_1;
		if ( ! empty( $billing_address_2 ) ) {
			$billing_address .= ', <br>' . $billing_address_2;
		}
		if ( ! empty( $billing_city ) ) {
				$billing_address .= ', ' . $billing_city;
		}
		if ( ! empty( $billing_state ) ) {
				$billing_address .= ',<br> ' . $billing_state;
		}

		if ( ! empty( $billing_postcode ) ) {
				$billing_address .= ', ' . $billing_postcode;
		}

		if ( ! empty( $billing_country ) ) {
				$billing_address .= ', ' . $billing_country;
		}
		?>

		<div class="grid grid-cols-[180px_1fr] items-start py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Billing Address:</h6>
			<address class="border-none p-0 text-sm" style="font-style: normal;"><?php echo $billing_address; ?>
			</address>
		</div>

		<?php
		if ( $customer->get_billing_email() ) :
			?>
		<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
			<h6 class="uppercase tracking-[1.6px] mb-0">Email:</h6>
			<span class="text-sm"><?php echo $customer->get_billing_email(); ?></span>
		</div>
		<?php endif; ?>


	</div>
</div>
<div id="checkoutBilling" class="hidden">
	<div class="woocommerce-billing-fields">
		<?php if ( wc_ship_to_billing_address_only() && WC()->cart->needs_shipping() ) : ?>

		<h3 class="text-2xl uppercase"><?php esc_html_e( 'Billing &amp; Shipping', 'woocommerce' ); ?></h3>

		<?php else : ?>

		<h3 class="text-2xl uppercase"><?php esc_html_e( 'Billing details', 'woocommerce' ); ?></h3>

		<?php endif; ?>

		<?php do_action( 'woocommerce_before_checkout_billing_form', $checkout ); ?>

		<div class="woocommerce-billing-fields__field-wrapper">
			<?php
			$fields = $checkout->get_checkout_fields( 'billing' );

			foreach ( $fields as $key => $field ) {
				woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
			}
			?>
		</div>

		<?php do_action( 'woocommerce_after_checkout_billing_form', $checkout ); ?>
	</div>

	<?php if ( ! is_user_logged_in() && $checkout->is_registration_enabled() ) : ?>
	<div class="woocommerce-account-fields">
		<?php if ( ! $checkout->is_registration_required() ) : ?>

		<p class="form-row form-row-wide create-account">
			<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
				<input class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
					id="createaccount"
					<?php checked( ( true === $checkout->get_value( 'createaccount' ) || ( true === apply_filters( 'woocommerce_create_account_default_checked', false ) ) ), true ); ?>
					type="checkbox" name="createaccount" value="1" />
				<span><?php esc_html_e( 'Create an account?', 'woocommerce' ); ?></span>
			</label>
		</p>

		<?php endif; ?>

		<?php do_action( 'woocommerce_before_checkout_registration_form', $checkout ); ?>

		<?php if ( $checkout->get_checkout_fields( 'account' ) ) : ?>

		<div class="create-account">
			<?php foreach ( $checkout->get_checkout_fields( 'account' ) as $key => $field ) : ?>
				<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
			<?php endforeach; ?>
			<div class="clear"></div>
		</div>

		<?php endif; ?>

		<?php do_action( 'woocommerce_after_checkout_registration_form', $checkout ); ?>
	</div>
	<?php endif; ?>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
	const checkoutToggles = document.querySelectorAll('a[data-toggle-checkout]');

	checkoutToggles.forEach(btn => {
		btn.addEventListener('click', e => {
			const showing = btn.dataset.toggleCheckout;
			const hide = btn.dataset.hide;
			e.preventDefault();
			document.querySelector(showing)?.classList.remove('hidden');
			document.querySelector(hide)?.classList.add('hidden');
		});
	});

});

jQuery(document).ready(function($) {
	const togglePSTField = () => {
		const countryField = document.getElementById('shipping_country');
		const stateField = document.getElementById('shipping_state');
		const shippingPST = document.getElementById('shipping_pst');
		const shippingPSTField = document.getElementById('shipping_pst_field');
		const pstField = document.querySelector('.hide-if-not-canada');


		const country = countryField ? countryField.value : '';
		const state = stateField ? stateField.value : '';
		if (country === 'CA') {
			pstField.style.display = 'block';
			if (state === 'BC') {
				shippingPST.required = true;
				shippingPSTField.querySelector('label').innerHTML =
					'PST<abbr class="required" title="required">*</abbr>';
				if (shippingPST.value === '') {
					shippingPSTField.classList.add('woocommerce-invalid');
				} else {
					shippingPSTField.classList.remove('woocommerce-invalid');
				}
			} else {
				shippingPST.required = false;
				shippingPSTField.classList.remove('woocommerce-invalid');
				shippingPSTField.querySelector('label').innerHTML = 'PST (Optional)';
			}
		} else {
			pstField.style.display = 'none';
			shippingPST.required = false;
		}
	};
	$(document.body).on('updated_checkout', function() {
		togglePSTField();
	});
});
</script>
