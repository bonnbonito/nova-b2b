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
$woo_instance = \NOVA_B2B\INC\CLASSES\Woocommerce::get_instance();
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
			<div title="View Details"
				onclick='Fancybox.show([{ src: "#quote-<?php echo $quoteID; ?>", type: "clone" }]);'
				class="nova-product-details cursor-pointer float-right">
				<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7 8C7.79545 8 8.47159 7.70833 9.02841 7.125C9.58523 6.54167 9.86364 5.83333 9.86364 5C9.86364 4.16667 9.58523 3.45833 9.02841 2.875C8.47159 2.29167 7.79545 2 7 2C6.20455 2 5.52841 2.29167 4.97159 2.875C4.41477 3.45833 4.13636 4.16667 4.13636 5C4.13636 5.83333 4.41477 6.54167 4.97159 7.125C5.52841 7.70833 6.20455 8 7 8ZM7 6.8C6.52273 6.8 6.11705 6.625 5.78295 6.275C5.44886 5.925 5.28182 5.5 5.28182 5C5.28182 4.5 5.44886 4.075 5.78295 3.725C6.11705 3.375 6.52273 3.2 7 3.2C7.47727 3.2 7.88295 3.375 8.21705 3.725C8.55114 4.075 8.71818 4.5 8.71818 5C8.71818 5.5 8.55114 5.925 8.21705 6.275C7.88295 6.625 7.47727 6.8 7 6.8ZM7 10C5.45152 10 4.04091 9.54722 2.76818 8.64167C1.49545 7.73611 0.572727 6.52222 0 5C0.572727 3.47778 1.49545 2.26389 2.76818 1.35833C4.04091 0.452778 5.45152 0 7 0C8.54848 0 9.95909 0.452778 11.2318 1.35833C12.5045 2.26389 13.4273 3.47778 14 5C13.4273 6.52222 12.5045 7.73611 11.2318 8.64167C9.95909 9.54722 8.54848 10 7 10ZM7 8.66667C8.19848 8.66667 9.29886 8.33611 10.3011 7.675C11.3034 7.01389 12.0697 6.12222 12.6 5C12.0697 3.87778 11.3034 2.98611 10.3011 2.325C9.29886 1.66389 8.19848 1.33333 7 1.33333C5.80152 1.33333 4.70114 1.66389 3.69886 2.325C2.69659 2.98611 1.9303 3.87778 1.4 5C1.9303 6.12222 2.69659 7.01389 3.69886 7.675C4.70114 8.33611 5.80152 8.66667 7 8.66667Z"
						fill="black" />
				</svg>
				<?php echo apply_filters( 'woocommerce_order_item_quantity_html', ' <strong class="product-quantity text-sm">' . sprintf( '&times;&nbsp;%s', $qty_display ) . '</strong>', $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
			<div>
				<span class="text-sm font-title tracking-[1.4px]">ID:</span>
				<?php echo $item['quote_id']; ?>

			</div>
			<div>
				<span class="text-sm font-title tracking-[1.4px]">DATE:</span> 11/4/2023
			</div>
			<div>
				<span class="text-sm font-title tracking-[1.4px]">NAME:</span>
				<?php echo $item['nova_title']; ?>
			</div>
			<div>
				<span class="text-sm font-title">PRODUCT:</span>
				<?php echo $item['product']; ?>
			</div>
			<div class="woocommerce-table__product-total product-total">
				<h6 class="uppercase text-right">
					<span class="tracking-[1.6px]">SUBTOTAL:</span>
					<?php echo $order->get_formatted_line_subtotal( $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</h6>
			</div>
		</div>

			<?php $woo_instance->show_details_order( $item['signage'], $quoteID, $order->get_formatted_line_subtotal( $item ) ); ?>


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
			<h6 class="uppercase text-right"><span class="tracking-[1.6px]">SUBTOTAL:</span>
				<?php echo $order->get_formatted_line_subtotal( $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</h6>
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
