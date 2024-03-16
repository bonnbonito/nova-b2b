<?php
/**
 * Cart Page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.9.0
 */

defined( 'ABSPATH' ) || exit;

$woo_instance = \NOVA_B2B\Inc\Classes\Woocommerce::get_instance();

do_action( 'woocommerce_before_cart' ); ?>

<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
	<?php do_action( 'woocommerce_before_cart_table' ); ?>

	<div class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">

		<div>
			<?php do_action( 'woocommerce_before_cart_contents' ); ?>

			<?php
			foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
				/**
				 * Filter the product name.
				 *
				 * @since 2.1.0
				 * @param string $product_name Name of the product in the cart.
				 * @param array $cart_item The product in the cart.
				 * @param string $cart_item_key Key for the product in the cart.
				 */
				$product_name = apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key );

				if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
					$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );


					if ( 'nova_quote' === $_product->get_type() ) {
						?>
			<div
				class="woocommerce-cart-form__cart-item nova_product_item uppercase <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">

				<div class="flex-line">
					<div>
						<strong>QUOTE ID:</strong>
						Q-<?php echo str_pad( $cart_item['quote_id'], 4, '0', STR_PAD_LEFT ); ?>
					</div>

					<div class="view-remove">
						<?php
						$quoteID = $cart_item['quote_id'];
						?>
						<div title="View Details"
							onclick='Fancybox.show([{ src: "#quote-<?php echo $quoteID; ?>", type: "clone" }]);'
							class="nova-product-details cursor-pointer">
							<svg width="14" height="10" viewBox="0 0 14 10" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7 8C7.79545 8 8.47159 7.70833 9.02841 7.125C9.58523 6.54167 9.86364 5.83333 9.86364 5C9.86364 4.16667 9.58523 3.45833 9.02841 2.875C8.47159 2.29167 7.79545 2 7 2C6.20455 2 5.52841 2.29167 4.97159 2.875C4.41477 3.45833 4.13636 4.16667 4.13636 5C4.13636 5.83333 4.41477 6.54167 4.97159 7.125C5.52841 7.70833 6.20455 8 7 8ZM7 6.8C6.52273 6.8 6.11705 6.625 5.78295 6.275C5.44886 5.925 5.28182 5.5 5.28182 5C5.28182 4.5 5.44886 4.075 5.78295 3.725C6.11705 3.375 6.52273 3.2 7 3.2C7.47727 3.2 7.88295 3.375 8.21705 3.725C8.55114 4.075 8.71818 4.5 8.71818 5C8.71818 5.5 8.55114 5.925 8.21705 6.275C7.88295 6.625 7.47727 6.8 7 6.8ZM7 10C5.45152 10 4.04091 9.54722 2.76818 8.64167C1.49545 7.73611 0.572727 6.52222 0 5C0.572727 3.47778 1.49545 2.26389 2.76818 1.35833C4.04091 0.452778 5.45152 0 7 0C8.54848 0 9.95909 0.452778 11.2318 1.35833C12.5045 2.26389 13.4273 3.47778 14 5C13.4273 6.52222 12.5045 7.73611 11.2318 8.64167C9.95909 9.54722 8.54848 10 7 10ZM7 8.66667C8.19848 8.66667 9.29886 8.33611 10.3011 7.675C11.3034 7.01389 12.0697 6.12222 12.6 5C12.0697 3.87778 11.3034 2.98611 10.3011 2.325C9.29886 1.66389 8.19848 1.33333 7 1.33333C5.80152 1.33333 4.70114 1.66389 3.69886 2.325C2.69659 2.98611 1.9303 3.87778 1.4 5C1.9303 6.12222 2.69659 7.01389 3.69886 7.675C4.70114 8.33611 5.80152 8.66667 7 8.66667Z"
									fill="black" />
							</svg>
						</div>
						<div class="product-remove">
							<?php
							echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
								'woocommerce_cart_item_remove_link',
								sprintf(
									'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s"><svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.6875 13V2.16667H0V0.722222H3.4375V0H7.5625V0.722222H11V2.16667H10.3125V13H0.6875ZM2.0625 11.5556H8.9375V2.16667H2.0625V11.5556ZM3.4375 10.1111H4.8125V3.61111H3.4375V10.1111ZM6.1875 10.1111H7.5625V3.61111H6.1875V10.1111Z" fill="black"/>
</svg>
</a>',
									esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
									/* translators: %s is the product name */
									esc_attr( sprintf( __( 'Remove %s from cart', 'woocommerce' ), wp_strip_all_tags( $product_name ) ) ),
									esc_attr( $product_id ),
									esc_attr( $_product->get_sku() )
								),
								$cart_item_key
							);
							?>
						</div>
					</div>
				</div>

				<div class="flex-line">
					<div>
						<strong>DATE:</strong> 11/4/2023
					</div>
				</div>
				<div class="flex-line">
					<div>
						<strong>NAME:</strong> <?php echo get_field( 'frontend_title', $cart_item['quote_id'] ); ?>
					</div>
				</div>
				<div class="flex-line mb-5">
					<div>
						<strong>PRODUCT:</strong>
						<?php echo $cart_item['product']; ?>
					</div>

				</div>

				<div class="flex-line">

					<div>
						<div class="product-subtotal" data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>">
							<strong>SUBTOTAL:
								<?php
								echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
								?>
							</strong>
						</div>
					</div>

					<div class="quantity-change">
						<div class="cursor-pointer decrease">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#5E5E5E" />
								<path d="M7.40449 9.13351H13.0045L12.8645 10.7435H7.26449L7.40449 9.13351Z"
									fill="black" />
							</svg>
						</div>
						<div class="product-quantity" data-title="<?php esc_attr_e( 'Quantity', 'woocommerce' ); ?>">
							<?php
							if ( $_product->is_sold_individually() ) {
								$min_quantity = 1;
								$max_quantity = 1;
							} else {
								$min_quantity = 0;
								$max_quantity = $_product->get_max_purchase_quantity();
							}

							$product_quantity = woocommerce_quantity_input(
								array(
									'input_name'   => "cart[{$cart_item_key}][qty]",
									'input_value'  => $cart_item['quantity'],
									'max_value'    => $max_quantity,
									'min_value'    => $min_quantity,
									'product_name' => $product_name,
								),
								$_product,
								false
							);

							echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // PHPCS: XSS ok.
							?>
						</div>
						<div class="cursor-pointer increase">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#5E5E5E" />
								<path
									d="M9.41849 10.7375H6.07449L6.23449 9.53751H9.41849V6.36951L10.6185 6.20951V9.53751H13.9145L13.7545 10.7375H10.6185V13.8895L9.41849 14.0495V10.7375Z"
									fill="black" />
							</svg>

						</div>
					</div>

				</div>


				<div class="product-price hidden" data-title="<?php esc_attr_e( 'Price', 'woocommerce' ); ?>">
						<?php
						echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
						?>
				</div>

						<?php $woo_instance->show_details( $cart_item['signage'], $quoteID ); ?>

			</div>

						<?php

					} else {


						?>


			<div
				class="woocommerce-cart-form__cart-item sample-board-item relative <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">

				<div class="product-remove absolute right-[6px] top-5">
						<?php
								echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									'woocommerce_cart_item_remove_link',
									sprintf(
										'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s"><svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.6875 13V2.16667H0V0.722222H3.4375V0H7.5625V0.722222H11V2.16667H10.3125V13H0.6875ZM2.0625 11.5556H8.9375V2.16667H2.0625V11.5556ZM3.4375 10.1111H4.8125V3.61111H3.4375V10.1111ZM6.1875 10.1111H7.5625V3.61111H6.1875V10.1111Z" fill="black"/>
</svg>
</a>',
										esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
										/* translators: %s is the product name */
										esc_attr( sprintf( __( 'Remove %s from cart', 'woocommerce' ), wp_strip_all_tags( $product_name ) ) ),
										esc_attr( $product_id ),
										esc_attr( $_product->get_sku() )
									),
									$cart_item_key
								);
						?>
				</div>

				<div class="sample-product-details">

					<div class="product-thumbnail">
						<?php
						$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );

						if ( ! $product_permalink ) {
							echo $thumbnail; // PHPCS: XSS ok.
						} else {
							printf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $thumbnail ); // PHPCS: XSS ok.
						}
						?>
					</div>


					<div class="product-name" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
						<?php
						if ( ! $product_permalink ) {
							echo wp_kses_post( $product_name . '&nbsp;' );
						} else {
							/**
							 * This filter is documented above.
							 *
							 * @since 2.1.0
							 */
							echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $_product->get_name() ), $cart_item, $cart_item_key ) );
						}

						do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key );

						// Meta data.
						echo wc_get_formatted_cart_item_data( $cart_item ); // PHPCS: XSS ok.

						// Backorder notification.
						if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) {
							echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) );
						}
						?>
					</div>
				</div>





				<div class="product-price hidden" data-title="<?php esc_attr_e( 'Price', 'woocommerce' ); ?>">
						<?php
								echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
						?>
				</div>

				<div class="flex-line mt-4">

					<div>
						<div class="product-subtotal" data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>">
							<strong>SUBTOTAL:
								<?php
								echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
								?>
							</strong>
						</div>
					</div>

					<div class="quantity-change">
						<div class="cursor-pointer decrease">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#5E5E5E" />
								<path d="M7.40449 9.13351H13.0045L12.8645 10.7435H7.26449L7.40449 9.13351Z"
									fill="black" />
							</svg>
						</div>
						<div class="product-quantity" data-title="<?php esc_attr_e( 'Quantity', 'woocommerce' ); ?>">
							<?php
							if ( $_product->is_sold_individually() ) {
								$min_quantity = 1;
								$max_quantity = 1;
							} else {
								$min_quantity = 0;
								$max_quantity = $_product->get_max_purchase_quantity();
							}

							$product_quantity = woocommerce_quantity_input(
								array(
									'input_name'   => "cart[{$cart_item_key}][qty]",
									'input_value'  => $cart_item['quantity'],
									'max_value'    => $max_quantity,
									'min_value'    => $min_quantity,
									'product_name' => $product_name,
								),
								$_product,
								false
							);

							echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // PHPCS: XSS ok.
							?>
						</div>
						<div class="cursor-pointer increase">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#5E5E5E" />
								<path
									d="M9.41849 10.7375H6.07449L6.23449 9.53751H9.41849V6.36951L10.6185 6.20951V9.53751H13.9145L13.7545 10.7375H10.6185V13.8895L9.41849 14.0495V10.7375Z"
									fill="black" />
							</svg>

						</div>
					</div>

				</div>
			</div>
						<?php
					}
				}
			}
			?>

			<?php do_action( 'woocommerce_cart_contents' ); ?>

			<div>
				<div colspan="6" class="actions">



					<button type="submit"
						class="button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>"
						name="update_cart"
						value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Update cart', 'woocommerce' ); ?></button>

					<?php do_action( 'woocommerce_cart_actions' ); ?>

					<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
				</div>
			</div>

			<?php do_action( 'woocommerce_after_cart_contents' ); ?>
		</div>
	</div>
	<?php do_action( 'woocommerce_after_cart_table' ); ?>
</form>

<?php do_action( 'woocommerce_before_cart_collaterals' ); ?>

<div class="cart-collaterals">
	<?php
		/**
		 * Cart collaterals hook.
		 *
		 * @hooked woocommerce_cross_sell_display
		 * @hooked woocommerce_cart_totals - 10
		 */
		do_action( 'woocommerce_cart_collaterals' );
	?>
</div>

<?php do_action( 'woocommerce_after_cart' ); ?>
