<?php

namespace NOVA_B2B;

class Post {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;
	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	/**
	 * Class Constructor.
	 */
	public function __construct() {
		add_action( 'kadence_single_before_entry_content', array( $this, 'output_acf_content' ) );
	}

	public function output_acf_content() {
		$sections = get_field( 'post_content_elements' );
		if ( $sections ) :
			?>
<div class="post-content-container">
  <?php foreach ( $sections as $section ) :
					$template = str_replace( '_', '-', $section['acf_fc_layout'] );
					?>
  <div class="section-content mb-4">
    <?php
						get_template_part( 'template-parts/acf/' . $template, '', $section );
						?>
  </div>
  <?php
				endforeach;
		endif;
	}
}