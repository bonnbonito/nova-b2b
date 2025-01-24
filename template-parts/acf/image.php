<?php
if ( $args['single_image']['ID'] ) :
	?>
<figure class="one-col-img">
	<?php echo wp_get_attachment_image( $args['single_image']['ID'], 'full' ); ?>
</figure>
	<?php
endif;
