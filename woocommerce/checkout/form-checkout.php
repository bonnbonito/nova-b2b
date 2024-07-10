<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}

?>

<form name="checkout" method="post" class="checkout woocommerce-checkout"
	action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">

	<?php if ( $checkout->get_checkout_fields() ) : ?>

		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-4" id="customer_details">
		<div class="">
			<?php do_action( 'woocommerce_checkout_billing' ); ?>
		</div>

		<div class="">
			<?php do_action( 'woocommerce_checkout_shipping' ); ?>
		</div>
	</div>

		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

	<?php endif; ?>

	<div class="order-div-details mt-10">

		<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>

		<h3 class="text-4xl uppercase float-none w-full pl-0 mb-10" id="order_review_heading">
			<?php esc_html_e( 'Your order', 'woocommerce' ); ?>
		</h3>

		<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

		<div id="order_review" class="woocommerce-checkout-review-order w-full float-none">
			<?php do_action( 'woocommerce_checkout_order_review' ); ?>
		</div>

		<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>

	</div>

</form>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>

<script>
document.addEventListener('DOMContentLoaded', () => {
	const checkPSTRequirement = () => {
		const shippingCountry = document.getElementById('shipping_country').value;
		const shippingState = document.getElementById('shipping_state').value;
		const pstField = document.getElementById('shipping_pst_field');

		console.log(shippingCountry);
		console.log(shippingState);

		if (shippingCountry === 'CA' && shippingState === 'BC') {
			pstField.classList.add('validate-required');
			if (!pstField.querySelector('.required')) {
				const requiredAbbr = document.createElement('abbr');
				requiredAbbr.classList.add('required');
				requiredAbbr.title = 'required';
				requiredAbbr.textContent = '*';
				pstField.querySelector('label').appendChild(requiredAbbr);
			}
		} else {
			pstField.classList.remove('validate-required');
			const requiredAbbr = pstField.querySelector('.required');
			if (requiredAbbr) {
				requiredAbbr.remove();
			}
		}
	};

	// Initial check on page load
	checkPSTRequirement();

	// Check on country/state change
	document.getElementById('shipping_country').addEventListener('change', checkPSTRequirement);
	document.getElementById('shipping_state').addEventListener('change', checkPSTRequirement);
});
</script>
