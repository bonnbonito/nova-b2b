<?php
/**
 * Review order table
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/review-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 5.2.0
 */

defined( 'ABSPATH' ) || exit;

$woo_instance = \NOVA_B2B\INC\CLASSES\Woocommerce::get_instance();
?>
<table class="shop_table woocommerce-checkout-review-order-table">
	<tbody>
		<?php
		do_action( 'woocommerce_review_order_before_cart_contents' );

		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );

			if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_checkout_cart_item_visible', true, $cart_item, $cart_item_key ) ) {



				?>
		<tr
			class="<?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">
			<td class="product-name px-4 py-8" colspan="2">
				<?php
				if ( 'nova_quote' !== $_product->get_type() ) {
					?>

				<div class="font-title text-sm uppercase tracking-[1.4px] mb-1">
					<?php echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) ) . '&nbsp;'; ?>

					<?php echo apply_filters( 'woocommerce_checkout_cart_item_quantity', ' <strong class="product-quantity">' . sprintf( '&times;&nbsp;%s', $cart_item['quantity'] ) . '</strong>', $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo wc_get_formatted_cart_item_data( $cart_item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
				<div class="text-xs"><?php echo $_product->get_short_description(); ?></div>

					<?php
				} else {
					?>
					<?php
						$quoteID = $cart_item['quote_id'];
					?>
				<div title="View Details"
					onclick='Fancybox.show([{ src: "#quote-<?php echo $quoteID; ?>", type: "clone" }]);'
					class="nova-product-details cursor-pointer float-right">
					<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7 8C7.79545 8 8.47159 7.70833 9.02841 7.125C9.58523 6.54167 9.86364 5.83333 9.86364 5C9.86364 4.16667 9.58523 3.45833 9.02841 2.875C8.47159 2.29167 7.79545 2 7 2C6.20455 2 5.52841 2.29167 4.97159 2.875C4.41477 3.45833 4.13636 4.16667 4.13636 5C4.13636 5.83333 4.41477 6.54167 4.97159 7.125C5.52841 7.70833 6.20455 8 7 8ZM7 6.8C6.52273 6.8 6.11705 6.625 5.78295 6.275C5.44886 5.925 5.28182 5.5 5.28182 5C5.28182 4.5 5.44886 4.075 5.78295 3.725C6.11705 3.375 6.52273 3.2 7 3.2C7.47727 3.2 7.88295 3.375 8.21705 3.725C8.55114 4.075 8.71818 4.5 8.71818 5C8.71818 5.5 8.55114 5.925 8.21705 6.275C7.88295 6.625 7.47727 6.8 7 6.8ZM7 10C5.45152 10 4.04091 9.54722 2.76818 8.64167C1.49545 7.73611 0.572727 6.52222 0 5C0.572727 3.47778 1.49545 2.26389 2.76818 1.35833C4.04091 0.452778 5.45152 0 7 0C8.54848 0 9.95909 0.452778 11.2318 1.35833C12.5045 2.26389 13.4273 3.47778 14 5C13.4273 6.52222 12.5045 7.73611 11.2318 8.64167C9.95909 9.54722 8.54848 10 7 10ZM7 8.66667C8.19848 8.66667 9.29886 8.33611 10.3011 7.675C11.3034 7.01389 12.0697 6.12222 12.6 5C12.0697 3.87778 11.3034 2.98611 10.3011 2.325C9.29886 1.66389 8.19848 1.33333 7 1.33333C5.80152 1.33333 4.70114 1.66389 3.69886 2.325C2.69659 2.98611 1.9303 3.87778 1.4 5C1.9303 6.12222 2.69659 7.01389 3.69886 7.675C4.70114 8.33611 5.80152 8.66667 7 8.66667Z"
							fill="black" />
					</svg>
				</div>

				<div class="text-xs uppercase">
					<div>
						<span class="text-sm font-title tracking-[1.4px]">ID:</span>
						<?php echo $cart_item['quote_id']; ?>
					</div>
					<div>
						<span class="text-sm font-title tracking-[1.4px]">DATE:</span> 11/4/2023
					</div>
					<div>
						<span class="text-sm font-title tracking-[1.4px]">NAME:</span>
						<?php echo $cart_item['nova_title']; ?>
					</div>
					<div>
						<span class="text-sm font-title">PRODUCT:</span>
						<?php echo $cart_item['product']; ?>
					</div>
				</div>
					<?php $woo_instance->show_details( $cart_item['signage'], $quoteID ); ?>
				<?php } ?>
				<h6 class="mt-0 text-right">SUBTOTAL:&nbsp;
					<?php echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</h6>
			</td>

			<td style="border-top: 0;"></td>
		</tr>
				<?php
			}
		}

		do_action( 'woocommerce_review_order_after_cart_contents' );
		?>
	</tbody>
	<tfoot>

		<tr class="cart-subtotal">
			<td class="px-4 py-8">
				<div class="text-2xl uppercase font-title font-normal tracking-[2.4px]">
					<?php esc_html_e( 'Subtotal', 'woocommerce' ); ?>
				</div>
			</td>
			<td colspan="2" class="px-4 py-8 text-right">
				<div class="text-2xl uppercase font-title font-normal"><?php wc_cart_totals_subtotal_html(); ?></div>
			</td>
		</tr>

		<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
		<tr class="cart-discount coupon-<?php echo esc_attr( sanitize_title( $code ) ); ?>">
			<th class="px-4 py-8"><?php wc_cart_totals_coupon_label( $coupon ); ?></th>
			<td colspan="2" class="px-4 py-8"><?php wc_cart_totals_coupon_html( $coupon ); ?></td>
		</tr>
		<?php endforeach; ?>

		<?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>

			<?php do_action( 'woocommerce_review_order_before_shipping' ); ?>

			<?php wc_cart_totals_shipping_html(); ?>

			<?php do_action( 'woocommerce_review_order_after_shipping' ); ?>

		<?php endif; ?>

		<?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
		<tr class="fee">
			<th class="px-4 py-8"><?php echo esc_html( $fee->name ); ?></th>
			<td colspan="2" class="px-4 py-8"><?php wc_cart_totals_fee_html( $fee ); ?></td>
		</tr>
		<?php endforeach; ?>

		<?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
			<?php if ( 'itemized' === get_option( 'woocommerce_tax_total_display' ) ) : ?>
				<?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited ?>
		<tr class="tax-rate tax-rate-<?php echo esc_attr( sanitize_title( $code ) ); ?>">
			<th class="px-4 py-8"><?php echo esc_html( $tax->label ); ?></th>
			<td class="px-4 py-8 text-right" colspan=2><?php echo wp_kses_post( $tax->formatted_amount ); ?></td>
		</tr>
		<?php endforeach; ?>
		<?php else : ?>
		<tr class="tax-total">
			<th class="px-4 py-8"><?php echo esc_html( WC()->countries->tax_or_vat() ); ?></th>
			<td colspan="2" class="px-4 py-8"><?php wc_cart_totals_taxes_total_html(); ?></td>
		</tr>
		<?php endif; ?>
		<?php endif; ?>

		<?php do_action( 'woocommerce_review_order_before_order_total' ); ?>
		<?php $payment_select = WC()->session->get( 'payment_select' ) ? WC()->session->get( 'payment_select' ) : 0; ?>
		<tr class="payment-selection">
			<th class="px-4 py-8">Payment type</th>
			<td colspan="2" class="px-4 py-8">
				<ul id="payment-select">
					<li>
						<label for="payment_0" class="block justify-end p-3 border rounded-md w-full max-w-sm">
							<input type="radio" name="payment_select" value="0"
								<?php echo ( $payment_select == 0 ? 'checked' : '' ); ?> id="payment_0"
								onchange="updateCheckoutTotal(0)">
							<span>Full</span>
							<span class="text-sm font-body block mt-2 hidden">Description</span>
						</label>
					</li>
					<?php $payments_selection = $woo_instance->get_payment_selections(); ?>
					<?php
					foreach ( $payments_selection as $key => $selection ) {
						?>
					<li>
						<label for="payment_<?php echo $selection['id']; ?>"
							class="block justify-end p-3 border rounded-md w-full max-w-sm">
							<input type="radio" name="payment_select" value="<?php echo $selection['id']; ?>"
								id="payment_<?php echo $selection['id']; ?>"
								<?php echo ( $payment_select == $selection['id'] ? 'checked' : '' ); ?>
								onchange="updateCheckoutTotal(<?php echo $selection['id']; ?>)">
							<span><?php echo $selection['title']; ?></span>
							<span class="text-sm font-body block mt-2"><?php echo $selection['description']; ?></span>
						</label>
					</li>
					<?php } ?>
				</ul>
			</td>
		</tr>



		<tr class="order-total">
			<th class="px-4 py-8">
				<h3 class="uppercase text-3xl"><?php esc_html_e( 'Total', 'woocommerce' ); ?></h3>
			</th>
			<td colspan="2" class="text-right px-4 py-8">
				<h6 class="uppercase text-3xl"><?php wc_cart_totals_order_total_html(); ?></h6>
			</td>
		</tr>

		<?php
		if ( $payment_select != 0 ) :
			?>
		<tr class="order-total future-payment">
			<th class="px-4 py-8">
				<h2 class="uppercase text-3xl"><?php esc_html_e( 'Future Payment', 'woocommerce' ); ?></h2>
			</th>
			<td colspan="2" class="text-right px-4 py-8">
				<h5 class="uppercase text-3xl"><?php echo wc_price( WC()->session->get( 'pending_payment' ) ); ?></h5>
			</td>
		</tr>
		<?php endif; ?>




		<?php do_action( 'woocommerce_review_order_after_order_total' ); ?>

	</tfoot>
</table>
