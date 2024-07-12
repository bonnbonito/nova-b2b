<?php

namespace NOVA_B2B;

class FAQ {
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
		add_action( 'init', array( $this, 'create_faq_cpt' ) );
		add_action( 'init', array( $this, 'create_faq_categories_taxonomy' ) );
		add_filter( 'rewrite_rules_array', array( $this, 'faq_rewrite_rules' ) );
		add_filter( 'post_type_link', array( $this, 'custom_faq_permalink' ), 10, 2 );
		register_activation_hook( __FILE__, array( $this, 'faq_rewrite_flush' ) );
	}

	/**
	 * Register Custom Post Type 'faq'
	 */
	public function create_faq_cpt() {
		$labels = array(
			'name'          => _x( 'FAQs', 'Post Type General Name', 'textdomain' ),
			'singular_name' => _x( 'FAQ', 'Post Type Singular Name', 'textdomain' ),
		);

		$args = array(
			'label'             => __( 'FAQ', 'textdomain' ),
			'labels'            => $labels,
			'supports'          => array( 'title', 'editor', 'excerpt', 'custom-fields', 'thumbnail', 'revisions' ),
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_in_menu'      => true,
			'show_in_nav_menus' => true,
			'show_in_admin_bar' => true,
			'show_in_rest'      => true,
			'has_archive'       => true,
			'rewrite'           => array(
				'slug'         => 'faq',
				'with_front'   => false,
				'hierarchical' => true,
			),
			'capability_type'   => 'post',
		);

		register_post_type( 'faq', $args );
	}

	/**
	 * Register Custom Taxonomy 'faq-categories'
	 */
	public function create_faq_categories_taxonomy() {
		$labels = array(
			'name'          => _x( 'FAQ Categories', 'Taxonomy General Name', 'textdomain' ),
			'singular_name' => _x( 'FAQ Category', 'Taxonomy Singular Name', 'textdomain' ),
		);

		$args = array(
			'labels'            => $labels,
			'hierarchical'      => true,
			'public'            => true,
			'show_ui'           => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'rewrite'           => array(
				'slug'         => 'faq',
				'with_front'   => false,
				'hierarchical' => true,
			),
		);

		register_taxonomy( 'faq-categories', array( 'faq' ), $args );
	}

	/**
	 * Add Custom Rewrite Rules
	 */
	public function faq_rewrite_rules( $rules ) {
		$new_rules = array(
			'faq/([^/]+)/([^/]+)/([^/]+)/?$' => 'index.php?faq=$matches[3]',
			'faq/([^/]+)/([^/]+)/?$'         => 'index.php?faq-categories=$matches[2]',
			'faq/([^/]+)/?$'                 => 'index.php?faq-categories=$matches[1]',
		);
		return $new_rules + $rules;
	}

	/**
	 * Filter Permalinks for FAQ Single
	 */
	public function custom_faq_permalink( $permalink, $post ) {
		if ( $post->post_type !== 'faq' ) {
			return $permalink;
		}

		$terms = wp_get_post_terms( $post->ID, 'faq-categories' );

		if ( $terms && ! is_wp_error( $terms ) ) {
			$terms  = array_reverse( $terms );
			$term   = array_shift( $terms );
			$parent = '';

			if ( $term->parent != 0 ) {
				$parent = get_term( $term->parent, 'faq-categories' )->slug . '/';
			}

			$permalink = home_url( '/faq/' . $parent . $term->slug . '/' . $post->post_name );
		}

		return $permalink;
	}

	/**
	 * Flush Rewrite Rules on Activation
	 */
	public function faq_rewrite_flush() {
		$this->create_faq_cpt();
		$this->create_faq_categories_taxonomy();
		flush_rewrite_rules();
	}
}
