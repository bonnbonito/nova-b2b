<?php

class Nova_Styles {
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
		add_action( 'wp_enqueue_scripts', array( $this, 'nova_enqueue_styles' ) );
	}

	public function nova_enqueue_styles() {
		wp_register_style( 'nova-woocommerce', get_stylesheet_directory_uri() . '/assets/css/woocommerce.css', array(), wp_get_theme()->get( 'Version' ) );

		wp_enqueue_style( 'nova-woocommerce' );
	}
}

Nova_Styles::get_instance();
