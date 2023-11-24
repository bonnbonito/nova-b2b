<?php
class Nova_Quote {

	private static $instance = null;

	// Private constructor to prevent creating a new instance
	private function __construct() {
		add_filter( 'product_type_selector', array( $this, 'add_custom_product_type' ) );
		add_action( 'init', array( $this, 'create_product_type' ) );
		add_filter( 'woocommerce_product_class', array( $this, 'set_product_class' ), 10, 2 );
		add_action( 'woocommerce_product_options_general_product_data', array( $this, 'show_price' ) );
		add_action( 'woocommerce_nova_quote_add_to_cart', array( $this, 'add_to_cart' ) );

		add_action( 'pre_get_posts', array( $this, 'exclude_nova_quote_from_shop' ) );
		add_filter( 'woocommerce_product_search', array( $this, 'exclude_nova_quote_from_search' ) );
		add_filter( 'woocommerce_related_products', array( $this, 'exclude_nova_quote_from_related_products' ), 10, 3 );
	}

	// Method to get the singleton instance
	public static function get_instance() {
		if ( self::$instance == null ) {
			self::$instance = new Nova_Quote();
		}

		return self::$instance;
	}

	public function add_custom_product_type( $types ) {
		$types['nova_quote'] = 'Nova Quote';
		return $types;
	}

	public function create_product_type() {
		if ( ! class_exists( 'WC_Product_Nova_Quote' ) ) {
			require NOVA_DIR_PATH . '/inc/classes/WC_Product_Nova_Quote.php';
		}
	}

	public function set_product_class( $classname, $product_type ) {
		if ( $product_type == 'nova_quote' ) {
			$classname = 'WC_Product_Nova_Quote';
		}
		return $classname;
	}

	public function show_price() {
		global $product_object;
		if ( $product_object && 'nova_quote' === $product_object->get_type() ) {
			wc_enqueue_js(
				"
                $('.product_data_tabs .general_tab').addClass('show_if_nova_quote').show();
                $('.pricing').addClass('show_if_nova_quote').show();
            "
			);
		}
	}

	public function add_to_cart() {
		do_action( 'woocommerce_simple_add_to_cart' );
	}

	public function exclude_nova_quote_from_shop( $query ) {
		if ( ! is_admin() && $query->is_main_query() && ( is_shop() || is_product_category() || is_product_tag() ) ) {
			$tax_query   = $query->get( 'tax_query' ) ?: array();
			$tax_query[] = array(
				'taxonomy' => 'product_type',
				'field'    => 'slug',
				'terms'    => array( 'nova_quote' ),
				'operator' => 'NOT IN',
			);
			$query->set( 'tax_query', $tax_query );
		}
	}

	public function exclude_nova_quote_from_search( $query ) {
		if ( ! is_admin() && is_search() && $query->is_main_query() ) {
			$tax_query   = $query->get( 'tax_query' ) ?: array();
			$tax_query[] = array(
				'taxonomy' => 'product_type',
				'field'    => 'slug',
				'terms'    => array( 'nova_quote' ),
				'operator' => 'NOT IN',
			);
			$query->set( 'tax_query', $tax_query );
		}
	}

	public function exclude_nova_quote_from_related_products( $related_posts, $product_id, $args ) {
		return array_filter(
			$related_posts,
			function ( $related_post_id ) {
				$product = wc_get_product( $related_post_id );
				return 'nova_quote' !== $product->get_type();
			}
		);
	}
}

// Initialize the singleton instance
Nova_Quote::get_instance();
