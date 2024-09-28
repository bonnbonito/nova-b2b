<?php

namespace NOVA_B2B;

use WP_Query;

class Nova_Product {

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
		add_action( 'template_redirect', array( $this, 'redirect_singular_post_types' ) );
		add_filter( 'views_edit-product', array( $this, 'add_nova_quote_products_subsubsub' ), 30 );
		add_filter( 'views_edit-product', array( $this, 'change_all_count' ) );
		// add_filter( 'the_title', array( $this, 'modify_acrylic_post_title' ), 10, 2 );
		add_action( 'nova_signange_after_title', array( $this, 'signage_nav_tabs' ) );
		add_action( 'nova_product_installation', array( $this, 'nova_product_installation' ) );
		add_filter( 'document_title', array( $this, 'custom_wp_title' ), 10, 1 );
	}



	public function custom_wp_title( $title ) {
		if ( function_exists( 'is_wc_endpoint_url' ) ) {
			if ( is_wc_endpoint_url( 'lost-password' ) ) {
				$title = 'LOST PASSWORD | ' . $title;
			}
		}

		$tab = get_query_var( 'pagetab' );
		if ( $tab ) {
			switch ( $tab ) {
				case 'tech-specs':
					$title = 'Tech Specs | ' . $title;
					break;
				case 'overview':
					$title = 'Overview | ' . $title;
					break;
				case 'installation':
					$title = 'Installation | ' . $title;
					break;
				case 'faqs':
					$title = 'FAQS | ' . $title;
					break;
			}
		}

		return $title;
	}

	public function nova_product_installation() {
		if ( have_rows( 'installations' ) ) :
			?>
<div class="product-nav-content-item" data-nav="installation">
	<h2 class="mb-10 uppercase">Installation</h2>

	<div class="md:grid md:grid-cols-2 gap-x-10 gap-y-6">
			<?php
			while ( have_rows( 'installations' ) ) :
				the_row();
				?>
		<div class="installation-item grid md:grid-cols-[280px_1fr] md:mb-0 mb-5 gap-4">
			<div>
				<?php
				$image = get_sub_field( 'image' );
				if ( ! empty( $image ) ) :
					?>
				<a href="<?php echo esc_url( $image['url'] ); ?>"><img class="w-full"
						src="<?php echo esc_url( $image['url'] ); ?>"
						alt="<?php echo esc_attr( $image['alt'] ); ?>" /></a>
				<?php endif; ?>
			</div>
			<div class="px-0">
				<h6 class="uppercase tracking-[1.6px]"><?php echo get_sub_field( 'title' ); ?></h6>
				<div class="md:text-[14px] leading-loose tracking-[1.4px]">
					<?php echo get_sub_field( 'content' ); ?></div>
			</div>
		</div>
		<?php endwhile; ?>
	</div>


</div>
			<?php
	endif;
	}

	public function get_parent_or_current_id() {
		global $post;

		if ( isset( $post ) ) {
			if ( $post->post_parent != 0 ) {
				return $post->post_parent;
			}
			return $post->ID;
		}
		return false;
	}



	public function signage_nav_tabs() {
		global $post;

		$id = get_the_ID();

		if ( $post->post_type !== 'signage' ) {
			return;
		}
		if ( $post->post_parent > 0 ) {

			$tab = get_query_var( 'pagetab' );

			switch ( $tab ) {
				case 'tech-specs':
					$tab_title = 'Tech Specs';
					break;
				case 'overview':
					$tab_title = 'Overview';
					break;
				case 'installation':
					$tab_title = 'Installation';
					break;
				case 'faqs':
					$tab_title = 'FAQS';
					break;
				default:
					$tab_title = 'Instant Quote';
			}

			?>
<div class="product-nav-tabs not-tab">
	<div id="productNovaNav" class="product-nav-tabs-left">
		<h6><a class="button <?php echo ( $tab === 'overview' ? 'active' : '' ); ?>"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/overview">Overview</a></h6>
		<h6><a class="button <?php echo ( $tab === 'tech-specs' ? 'active' : '' ); ?>"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/tech-specs">Tech Specs</a></h6>
		<h6><a class="button <?php echo ( $tab === 'installation' ? 'active' : '' ); ?>"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/installation">Installation</a></h6>
			<?php if ( get_field( 'faq_questions' ) ) { ?>
		<h6><a class="button <?php echo ( $tab === 'faqs' ? 'active' : '' ); ?>"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/faqs">FAQS</a></h6>
		<?php } ?>
		<!-- <h6><a class="button active" href="#">Sample Board</a></h6> -->
	</div>

	<div id="productNavMobile" class="product-nav-tabs-mobile">

		<h6 id="current" data-click="toggleMobileNav"><span id="text"><?php echo $tab_title; ?></span> <svg
				xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
				<path d="M11 2L6.66667 6L2 2" stroke="black" stroke-width="1.5" stroke-linecap="square"
					stroke-linejoin="round" />
			</svg>
		</h6>

		<div id="innerMobileNav" class="mt-1 hidden">
			<a class="text-button block overflow-hidden"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/overview">
				<h6 class="py-1">- Overview</h6>
			</a>

			<a class="text-button block overflow-hidden"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/tech-specs">
				<h6 class="py-1 ">- Tech Specs</h6>
			</a>

			<a class="text-button block overflow-hidden"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/installation">
				<h6 class="py-1">- Installation</h6>
			</a>

			<a class="text-button block overflow-hidden"
				href="<?php echo untrailingslashit( get_permalink() ); ?>/faqs">
				<h6 class="py-1">- FAQS</h6>
			</a>
			<h6 data-menu="sample" style="display: none;">- Sample Board</a></h6>
		</div>


	</div>

	<a href="<?php echo untrailingslashit( get_permalink() ); ?>"
		class="button <?php echo ( ! $tab ? 'active' : '' ); ?>">Instant Quote</a>
</div>

<script>
document.addEventListener("DOMContentLoaded", (event) => {
	const productNavMobile = document.getElementById('productNavMobile');
	const toggleMobileNav = document.querySelector('h6[data-click="toggleMobileNav"]');
	const innerMobileNav = document.getElementById('innerMobileNav');
	toggleMobileNav.addEventListener('click', e => {
		e.preventDefault();
		if (innerMobileNav) {
			innerMobileNav.classList.toggle('hidden');
		}

	});
});
</script>

			<?php
		}
	}

	public function modify_acrylic_post_title( $title, $post_id ) {

		$post = get_post( $post_id );

		if ( $post->post_type == 'signage' && $post->post_parent != 0 && ! is_admin() ) {
			$parent_post = get_post( $post->post_parent );

			return $parent_post->post_title;
		}

		return $title;
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
		$products = new \WP_Query( $args );

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

	public function redirect_singular_post_types() {
		if ( is_singular( 'payment_type' ) || is_singular( 'custom_project' ) ) {
			/*
			global $post;
			$product = wc_get_product( $post->ID );

			if ( $product && $product->is_type( 'nova_quote' ) ) {
				wp_redirect( home_url() );
				exit;
			}*/
			wp_redirect( home_url() );
				exit;
		}
	}

	// Method to get the singleton instance
	public static function get_instance() {
		if ( self::$instance == null ) {
			self::$instance = new Nova_Product();
		}

		return self::$instance;
	}

	public function add_custom_product_type( $types ) {
		$types['nova_quote'] = 'Nova Quote';
		return $types;
	}

	public function create_product_type() {
		if ( ! class_exists( 'WC_Product_Nova_Quote' ) ) {
			require NOVA_CLASS_PATH . '/WC_Product_Nova_Quote.php';
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
