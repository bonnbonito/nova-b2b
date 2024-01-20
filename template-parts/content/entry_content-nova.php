<?php
/**
 * Template part for displaying a post's content
 *
 * @package kadence
 */

namespace Kadence;

?>

<div class="<?php echo esc_attr( apply_filters( 'kadence_entry_content_class', 'entry-content single-content' ) ); ?>">
	<?php
	do_action( 'kadence_single_before_entry_content' );

	$template = get_query_var( 'pagetab' );

	switch ( $template ) {
		case 'installation':
			do_action( 'nova_product_installation' );
			break;
		case 'quote':
			do_action( 'nova_product_instant_quote' );
			break;
		case 'sample_board ':
			do_action( 'nova_product_sample_board' );
			break;
		case 'tech-specs':
			do_action( 'nova_product_specs' );
			break;
		default:
			the_content(
				sprintf(
					wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
						__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'kadence' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				)
			);
			do_action( 'nova_signange_after_content' );
	}



	wp_link_pages(
		array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'kadence' ),
			'after'  => '</div>',
		)
	);
	do_action( 'kadence_single_after_entry_content' );
	?>
</div><!-- .entry-content -->
