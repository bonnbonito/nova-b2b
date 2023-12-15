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
		add_action( 'pre_get_posts', array( $this, 'filter_products_by_nova_quote' ) );
		add_action( 'pre_get_posts', array( $this, 'exclude_nova_quote_from_shop' ) );

		add_filter( 'woocommerce_product_search', array( $this, 'exclude_nova_quote_from_search' ) );
		add_filter( 'woocommerce_related_products', array( $this, 'exclude_nova_quote_from_related_products' ), 10, 3 );
		add_action( 'template_redirect', array( $this, 'redirect_nova_quote_single_product' ) );
		add_filter( 'views_edit-product', array( $this, 'add_nova_quote_products_subsubsub' ), 30 );
		add_filter( 'views_edit-product', array( $this, 'change_all_count' ) );
	}

	public function change_all_count( $views ) {
		$allcount     = $this->get_all_products_count();
		$class        = ( isset( $_REQUEST['all_posts'] ) && $_REQUEST['all_posts'] === '1' ) ? 'current' : '';
		$views['all'] = "<a href='edit.php?post_type=product&all_posts=1' class='{$class}'>All ({$allcount})</a>";

		return $views;
	}

	public function get_all_products_count() {

		$args     = array(
			'post_type'      => 'product',
			'tax_query'      => array(
				array(
					'taxonomy' => 'product_type',
					'field'    => 'slug',
					'terms'    => array( 'nova_quote' ),
					'operator' => 'NOT IN',
				),
			),
			'posts_per_page' => -1,
		);
		$products = new WP_Query( $args );

		return $products->found_posts;
	}

	public function filter_products_by_nova_quote( $query ) {
		global $typenow;

		if ( is_admin() && $typenow === 'product' && isset( $_GET['product_type'] ) && $_GET['product_type'] === 'nova_quote' ) {
			$tax_query   = $query->get( 'tax_query' ) ?: array();
			$tax_query[] = array(
				'taxonomy' => 'product_type',
				'field'    => 'slug',
				'terms'    => array( 'nova_quote' ),
				'operator' => 'IN',
			);
			$query->set( 'tax_query', $tax_query );
		}
	}

	public function add_nova_quote_products_subsubsub( $views ) {
		$count = $this->get_nova_quote_products_count();
		$class = ( isset( $_REQUEST['product_type'] ) && $_REQUEST['product_type'] === 'nova_quote' ) ? 'current' : '';

		if ( isset( $views['nova_quote'] ) ) {
			unset( $views['nova_quote'] );
		}

		$views['nova_quote'] = "<a href='edit.php?post_type=product&product_type=nova_quote' class='{$class}'>Nova Quotes ({$count})</a>";

		return $views;
	}

	public function get_nova_quote_products_count() {
		$args     = array(
			'post_type'      => 'product',
			'post_status'    => 'publish',
			'tax_query'      => array(
				array(
					'taxonomy' => 'product_type', // Replace with the correct taxonomy, if different
					'field'    => 'slug',
					'terms'    => 'nova_quote',   // The slug of the custom product type
				),
			),
			'posts_per_page' => -1,
		);
		$products = new WP_Query( $args );

		return $products->found_posts;
	}


	public function redirect_nova_quote_single_product() {
		if ( is_singular( 'product' ) && is_product() ) {
			global $post;
			$product = wc_get_product( $post->ID );

			if ( $product && $product->is_type( 'nova_quote' ) ) {
				wp_redirect( home_url() );
				exit;
			}
		}
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
		if ( ( $query->is_main_query() && ! isset( $_GET['product_type'] ) ) && ( is_shop() || is_product_category() || is_product_tag() ) ) {
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
		if ( is_search() && $query->is_main_query() ) {
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
