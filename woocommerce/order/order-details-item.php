<?php
/**
 * Order Item Details
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/order-details-item.php.
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

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! apply_filters( 'woocommerce_order_item_visible', true, $item ) ) {
	return;
}
$woo_instance = \NOVA_B2B\Woocommerce::get_instance();
?>
<tr
	class="<?php echo esc_attr( apply_filters( 'woocommerce_order_item_class', 'woocommerce-table__line-item order_item', $item, $order ) ); ?>">

	<td class="woocommerce-table__product-name product-name product-name px-4 py-4" colspan="2">
		<?php

		$is_visible        = $product && $product->is_visible();
		$product_permalink = apply_filters( 'woocommerce_order_item_permalink', $is_visible ? $product->get_permalink( $item ) : '', $item, $order );

		$qty          = $item->get_quantity();
		$refunded_qty = $order->get_qty_refunded_for_item( $item_id );

		if ( $refunded_qty ) {
			$qty_display = '<del>' . esc_html( $qty ) . '</del> <ins>' . esc_html( $qty - ( $refunded_qty * -1 ) ) . '</ins>';
		} else {
			$qty_display = esc_html( $qty );
		}



		if ( $item->get_meta( 'signage' ) ) {
			$quoteID = $item['quote_id'];
			?>
		<div class="text-xs uppercase">
			<div>
				<span class="text-sm font-title tracking-[1.4px]">QUOTE ID:</span>
				Q-<?php echo str_pad( $item['quote_id'], 4, '0', STR_PAD_LEFT ); ?>
			</div>
			<div>
				<span class="text-sm font-title tracking-[1.4px]">DATE:</span> 11/4/2023
			</div>
			<div>
				<span class="text-sm font-title tracking-[1.4px]">NAME:</span>
				<?php echo $item['name']; ?>
			</div>
			<div>
				<span class="text-sm font-title">PRODUCT:</span>
				<?php echo get_the_title( $item['product_line'] ); ?>
			</div>
			<div>
				<?php echo $woo_instance->show_order_product_details( $item['signage'] ); ?>
			</div>
			<div class="woocommerce-table__product-total product-total">
				<p class="uppercase text-right font-bold">
					<span class="tracking-[1.6px]">SUBTOTAL:</span>
					<?php echo $order->get_formatted_line_subtotal( $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</p>
			</div>
		</div>

			<?php

		} else {
			?>
		<div class="font-title text-sm uppercase tracking-[1.4px] mb-5 md:mb-1 sample-board-detail">
			<?php

			echo wp_kses_post( apply_filters( 'woocommerce_order_item_name', $product_permalink ? sprintf( '<a href="%s">%s</a>', $product_permalink, $item->get_name() ) : $item->get_name(), $item, $is_visible ) );

			echo apply_filters( 'woocommerce_order_item_quantity_html', ' <strong class="product-quantity">' . sprintf( '&times;&nbsp;%s', $qty_display ) . '</strong>', $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

			?>
		</div>

		<div class="woocommerce-table__product-total product-total">
			<p class="uppercase text-right font-bold text-xs"><span class="tracking-[1.6px]">SUBTOTAL:</span>
				<?php echo $order->get_formatted_line_subtotal( $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</p>
		</div>

			<?php

		}

		do_action( 'woocommerce_order_item_meta_start', $item_id, $item, $order, false );

		wc_display_item_meta( $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		do_action( 'woocommerce_order_item_meta_end', $item_id, $item, $order, false );
		?>
	</td>



</tr>



<?php if ( $show_purchase_note && $purchase_note ) : ?>

<tr class="woocommerce-table__product-purchase-note product-purchase-note">

	<td colspan="2">
		<?php echo wpautop( do_shortcode( wp_kses_post( $purchase_note ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</td>

</tr>

<?php endif; ?>
