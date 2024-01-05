<?php
$product_id = get_field( 'product' );
?>
<div id="quote-<?php the_ID(); ?>" class="rounded border p-4 mb-4 text-xs uppercase">
	<div class="block flex-wrap gap-4 md:flex">
		<div class="basis-[150px] grow">
			<div class="block"><span class="font-title text-sm">ID:</span> <?php the_ID(); ?> <div
					class="text-[16px] self-center font-title ml-auto float-right block md:hidden md-hidden">
					$<?php echo number_format( (float) get_field( 'final_price' ), 2 ); ?></div>
			</div>
			<div><span class="font-title text-sm">DATE:</span> <?php echo get_the_date(); ?></div>

		</div>
		<div class="grow-[2] mb-4 md:mb-0">
			<div class="block"><span class="font-title text-sm">NAME:</span> <?php the_title(); ?></div>
			<div><span class="font-title text-sm">PRODUCT:</span>
				<?php echo ( get_field( 'product' ) ? get_field( 'product' )->post_title : '' ); ?></div>
		</div>
		<div class="flex grow-[2] gap-2 justify-end font-title items-center">
			<div class="text-[16px] self-center hidden md-block">
				$<?php echo number_format( (float) get_field( 'final_price' ), 2 ); ?>
			</div>
			<?php if ( get_field( 'quote_status' )['value'] == 'draft' ) : ?>
			<a href="
					<?php
					echo esc_url(
						get_permalink( $product_id ) . '?qid=' . get_the_ID() . '&qedit=1'
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
			<?php else : ?>
			<a href="<?php echo esc_url( '/my-account/mockups/view?qid=' . get_the_ID() ); ?>"
				class="p-2 border rounded text-nova-gray text-[10px] tracking-[1px] hover:bg-nova-gray hover:text-white w-[110px] text-center">View
				Details</a>
			<a href="/" data-type="checkout" data-id="<?php the_ID(); ?>"
				data-product="<?php echo get_the_title( $product_id ); ?>"
				class="p-2 border rounded bg-green-600 text-white text-[10px] tracking-[1px] hover:bg-green-400 cursor-pointer w-[110px] text-center">
				Add To Cart</a>
			<?php endif; ?>
		</div>
	</div>

</div>
