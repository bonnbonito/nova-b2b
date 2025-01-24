<?php
if ( ! isset( $args['image_left']['ID'] ) && ! isset( $args['image_right']['ID'] ) ) {
	return;
}
?>
<div class="grid md:grid-cols-2 gap-4">
	<figure>
		<?php echo wp_get_attachment_image( $args['image_left']['ID'], 'full' ); ?>
	</figure>
	<figure>
		<?php echo wp_get_attachment_image( $args['image_right']['ID'], 'full' ); ?>
	</figure>
</div>