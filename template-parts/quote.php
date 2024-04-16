<?php
$product_id = get_field( 'product' );

$price = get_field( 'final_price' ) ? (float) get_field( 'final_price' ) : 0;

$currency_settings = new WooCommerce_Ultimate_Multi_Currency_Suite_Settings( '' );

$exchange_rate_cad = 1.3;

$flat_rate     = 14.75;
$standard_rate = $price * 0.075;

$estimatedShipping = $price > 0 ? number_format( max( $flat_rate, $standard_rate ), 2, '.', '' ) : 0;

$price_with_shipping = $price + $estimatedShipping;

$final_price = $price_with_shipping ? ( get_woocommerce_currency() === 'USD' ? $price_with_shipping : $price_with_shipping * $exchange_rate_cad ) : 'TBD';



?>
<div id="quote-<?php the_ID(); ?>" class="quote-row rounded border p-4 mb-4 text-xs uppercase relative pr-8">
	<div class="block flex-wrap gap-4 lg:grid lg:grid-cols-[180px_1fr_375px] tracking-[1px]">
		<div class="flex flex-col gap-1 mb-1 lg:mb-0">
			<div class="block"><span class="font-title text-sm">QUOTE ID:</span>
				<?php echo 'Q-' . str_pad( get_the_ID(), 4, '0', STR_PAD_LEFT ); ?> <div
					class="text-[16px] self-center font-title ml-auto float-right block lg:hidden">
					<?php echo get_woocommerce_currency_symbol() . number_format( (float) $final_price, 2 ); ?>
				</div>
			</div>
			<div><span class="font-title text-sm">DATE:</span> <?php echo get_the_date(); ?></div>

		</div>
		<div class="flex flex-col gap-1">
			<div class="block"><span class="font-title text-sm">NAME:</span>
				<?php echo get_field( 'frontend_title' ); ?>
			</div>
			<div><span class="font-title text-sm">PRODUCT:</span>
				<?php echo ( get_field( 'product' ) ? get_field( 'product' )->post_title : 'CUSTOM PROJECT' ); ?></div>
		</div>
		<div class="flex grow-[2] gap-2 justify-end font-title items-center text-center">
			<div class="text-[16px] self-center hidden lg:block">
				<?php echo get_woocommerce_currency_symbol() . number_format( (float) $final_price, 2 ); ?>
			</div>
			<?php if ( get_field( 'quote_status' )['value'] == 'draft' ) : ?>
			<a href="
					<?php
					echo esc_url(
						untrailingslashit( get_permalink( $product_id ) ) . '/?qid=' . get_the_ID() . '&qedit=1'
					);
					?>
					" class="p-2 border rounded text-nova-gray text-[10px] tracking-[1px] hover:bg-nova-gray hover:text-white w-[110px] text-center">Edit
				Order</a>
				<?php if ( ! current_user_can( 'pending' ) ) { ?>
			<a href="/" data-type="quotation" data-id="<?php the_ID(); ?>"
				class="p-2 border rounded text-white bg-nova-primary text-[10px] tracking-[1px] hover:bg-nova-secondary w-[110px] text-center">For
				Quotation</a>
			<?php } ?>


			<?php elseif ( get_field( 'quote_status' )['value'] == 'processing' ) : ?>
			<a href="<?php echo esc_url( '/my-account/mockups/view?qid=' . get_the_ID() ); ?>"
				class="p-2 border rounded text-nova-gray text-[10px] tracking-[1px] hover:bg-nova-gray hover:text-white w-[110px] text-center">View
				Details</a>
			<span class="p-2 rounded text-[10px] w-[110px] text-center tracking-[1.2px]">Processing<br>
				Quotation</span>

			<?php elseif ( get_field( 'quote_status' )['value'] == 'archived' ) : ?>
			<a href="<?php echo esc_url( '/my-account/mockups/view?qid=' . get_the_ID() ); ?>"
				class="p-2 border rounded text-nova-gray text-[10px] tracking-[1px] hover:bg-nova-gray hover:text-white w-[110px] text-center">View
				Details</a>
				<?php
				$updated_order = get_field( 'new_quote' );

				if ( $updated_order ) :
					?>



			<a href="<?php echo esc_url( '/my-account/mockups/view?qid=' . $updated_order->ID ); ?>"
				class="p-2 border rounded text-white bg-green-800 text-[10px] tracking-[1px] hover:bg-nova-gray hover:text-white w-[110px] text-center">Updated
				Order</a>
			<?php endif; ?>



			<?php else : ?>
			<a href="<?php echo esc_url( '/my-account/mockups/view?qid=' . get_the_ID() ); ?>"
				class="p-2 border rounded text-nova-gray text-[10px] tracking-[1px] hover:bg-nova-gray hover:text-white w-[110px] text-center">View
				Details</a>

				<?php
				$cart_product_id = get_post_meta( get_the_ID(), 'nova_product_generated_id', true );

				if ( in_array( $cart_product_id, array_column( WC()->cart->get_cart(), 'product_id' ) ) ) {
					?>
			<span class="p-2 border rounded bg-gray-400 text-white text-[10px] tracking-[1px]">ALREADY IN CART<span>
					<?php
				} elseif ( $final_price > 0 ) {
					?>
					<a href="#" data-type="checkout" data-id="<?php the_ID(); ?>"
						data-product="<?php echo get_the_title( $product_id->ID ); ?>"
						data-product_line="<?php echo $product_id->ID; ?>"
						data-product_id="<?php echo $cart_product_id; ?>"
						class="p-2 border rounded bg-green-600 text-white text-[10px] tracking-[1px] hover:bg-green-400 cursor-pointer w-[110px] text-center">Add
						To Cart</a>

					<?php

				}
				endif;
			?>
		</div>
	</div>
	<a class="cursor-pointer absolute top-4 lg:top-[50%] lg:-translate-y-[50%] right-3" data-type="delete"
		data-id="<?php echo get_the_ID(); ?>" title="Delete Q-<?php echo get_the_ID(); ?>">
		<svg width=" 15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
				stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</a>
	<div class="loading hidden"><svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
			fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
			</path>
		</svg> Deleting...</div>
</div>
