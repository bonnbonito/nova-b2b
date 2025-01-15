<?php
/**
 * "Order received" message.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.8.0
 *
 * @var WC_Order|false $order
 */

defined( 'ABSPATH' ) || exit;
?>

<h4 class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received uppercase">
  <?php
	/**
	 * Filter the message shown after a checkout is complete.
	 *
	 * @since 2.2.0
	 *
	 * @param string         $message The message.
	 * @param WC_Order|false $order   The order created during checkout, or false if order data is not available.
	 */
	$message = apply_filters(
		'woocommerce_thankyou_order_received_text',
		esc_html( __( 'Thank you. Your order has been received.', 'woocommerce' ) ),
		$order
	);

	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo $message;
	?>
</h4>

<?php

$from_order_id      = $order->get_meta( '_from_order_id' );
$second_payment     = $order->get_meta( 'second_payment' );
$original_order_ids = $order->get_meta( '_original_order_ids' );
$order_id           = $order->get_id();

if ( empty( $from_order_id ) && empty( $second_payment ) && empty( $original_order_ids ) ) {
	?>
<div class="woocommerce-message woocommerce-message--info woocommerce-thankyou-order-details">
  <h4>IMPORTANT:</h4>
  <p>You will receive the production drawing and finalized mockup within 24 hours. We'll notify you via email.</p>
  <p>Production will start <strong>only after you approve the mockup</strong>.</p>
</div>
<?php
}