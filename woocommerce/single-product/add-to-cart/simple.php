<?php
/**
 * Simple product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/simple.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( ! $product->is_purchasable() ) {
	return;
}

echo wc_get_stock_html( $product ); // WPCS: XSS ok.

if ( $product->is_in_stock() ) : ?>

	<?php do_action( 'woocommerce_before_add_to_cart_form' ); ?>

<form class="cart"
	action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>"
	method="post" enctype='multipart/form-data'>
	<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>
	<div class="text-sm font-title tracking-[1.4px] mb-1">QUANTITY</div>
	<div class="quantity-change">
		<div class="cursor-pointer decrease">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#5E5E5E" />
				<path d="M7.40449 9.13351H13.0045L12.8645 10.7435H7.26449L7.40449 9.13351Z" fill="black" />
			</svg>
		</div>

		<?php
			do_action( 'woocommerce_before_add_to_cart_quantity' );

			woocommerce_quantity_input(
				array(
					'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
					'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
					'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
				)
			);

			do_action( 'woocommerce_after_add_to_cart_quantity' );
		?>

		<div class="cursor-pointer increase">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#5E5E5E" />
				<path
					d="M9.41849 10.7375H6.07449L6.23449 9.53751H9.41849V6.36951L10.6185 6.20951V9.53751H13.9145L13.7545 10.7375H10.6185V13.8895L9.41849 14.0495V10.7375Z"
					fill="black" />
			</svg>

		</div>
	</div>

	<hr class="mt-2">

	<h4 class="py-4 flex justify-between gap-4">
		<span>TOTAL: </span>
		<span id="watchPrice"><?php echo $product->get_price_html(); ?></span>
	</h4>



	<button type="submit" name="add-to-cart" value="<?php echo esc_attr( $product->get_id() ); ?>"
		class="font-title single_add_to_cart_button button alt<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>"><?php echo esc_html( $product->single_add_to_cart_text() ); ?></button>

	<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>
</form>

	<?php do_action( 'woocommerce_after_add_to_cart_form' ); ?>

<?php endif; ?>
