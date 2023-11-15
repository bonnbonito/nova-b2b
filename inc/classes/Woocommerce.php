<?php

namespace NOVA_B2B\INC\CLASSES;

class Woocommerce {
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
		// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
		// remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
	}
}

Woocommerce::get_instance();
