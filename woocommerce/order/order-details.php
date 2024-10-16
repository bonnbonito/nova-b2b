<?php
/**
 * Order details
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/order-details.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 9.0.0
 *
 * @var bool $show_downloads Controls whether the downloads table should be rendered.
 */

defined( 'ABSPATH' ) || exit;

$order = wc_get_order( $order_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

if ( ! $order ) {
	return;
}

$order_items           = $order->get_items( apply_filters( 'woocommerce_purchase_order_item_types', 'line_item' ) );
$show_purchase_note    = $order->has_status( apply_filters( 'woocommerce_purchase_note_order_statuses', array( 'completed', 'processing' ) ) );
$show_customer_details = is_user_logged_in() && $order->get_user_id() === get_current_user_id();
$downloads             = $order->get_downloadable_items();

if ( $show_downloads ) {
	wc_get_template(
		'order/order-downloads.php',
		array(
			'downloads'  => $downloads,
			'show_title' => true,
		)
	);
}
?>

<div class="flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
	<div>
		<div class="woocommerce-order-details">
			<?php do_action( 'woocommerce_order_details_before_order_table', $order ); ?>

			<h4 class="woocommerce-order-details__title uppercase tracking-[1.4px]">
				<?php esc_html_e( 'Order details', 'woocommerce' ); ?></h4>

			<table class="woocommerce-table woocommerce-table--order-details shop_table order_details">

				<tbody>
					<?php
					do_action( 'woocommerce_order_details_before_order_table_items', $order );

					foreach ( $order_items as $item_id => $item ) {
						$product = $item->get_product();

						wc_get_template(
							'order/order-details-item.php',
							array(
								'order'              => $order,
								'item_id'            => $item_id,
								'item'               => $item,
								'show_purchase_note' => $show_purchase_note,
								'purchase_note'      => $product ? $product->get_purchase_note() : '',
								'product'            => $product,
							)
						);
					}

					do_action( 'woocommerce_order_details_after_order_table_items', $order );

					$pending_payment  = get_post_meta( $order_id, '_pending_payment', true );
					$original_payment = get_post_meta( $order_id, '_original_total', true );
					$payment_select   = get_post_meta( $order_id, '_payment_select', true );
					$from_id          = get_post_meta( $order_id, '_from_order_id', true );

					?>
				</tbody>

				<tfoot>
					<?php
					foreach ( $order->get_order_item_totals() as $key => $total ) {
						?>
					<tr class="order-detail detail-<?php echo $key; ?>">
						<th scope="row"><?php echo esc_html( $total['label'] ); ?></th>
						<td class="text-right"><?php echo wp_kses_post( $total['value'] ); ?></td>
					</tr>
						<?php
					}

					if ( $order->get_customer_note() ) :
						?>
					<tr>
						<th><?php esc_html_e( 'Note:', 'woocommerce' ); ?></th>
						<td><?php echo wp_kses_post( nl2br( wptexturize( $order->get_customer_note() ) ) ); ?></td>
					</tr>
					<?php endif; ?>
				</tfoot>
			</table>

			<?php do_action( 'woocommerce_order_details_after_order_table', $order ); ?>


		</div>

	</div>

	<div>
		<?php
		/**
		 * Action hook fired after the order details.
		 *
		 * @since 4.4.0
		 * @param WC_Order $order Order data.
		 */
		do_action( 'woocommerce_after_order_details', $order );

		if ( $show_customer_details ) {
			wc_get_template( 'order/order-details-customer.php', array( 'order' => $order ) );
		}
		?>

	</div>

</div>
