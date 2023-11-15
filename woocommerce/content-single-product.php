<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<?php woocommerce_template_single_title(); ?>

	<div class="product-nav-tabs">
		<div id="productNav" class="product-nav-tabs-left">
			<h6><a href="#overview">Overview</a></h6>
			<h6><a href="#specs">Tech Specs</a></h6>
			<h6><a href="#installation">Installation</a></h6>
			<h6><a href="#sample">Sample Board</a></h6>
		</div>
		<a href="#quote" class="button">Get Quote</a>
	</div>

	<div class="product-nav-content" id="productNavContent">
		<div class="product-nav-content-item" data-nav="quote">

			<div id="accrylicQuote"></div>

		</div>

		<div class="product-nav-content-item" data-nav="overview">

		</div>

		<div class="product-nav-content-item" data-nav="specs">

		</div>

		<div class="product-nav-content-item" data-nav="installation">

		</div>

		<div class="product-nav-content-item" data-nav="sample">

		</div>

	</div>

	<?php
	/**
	 * Hook: woocommerce_before_single_product_summary.
	 *
	 * @hooked woocommerce_show_product_sale_flash - 10
	 * @hooked woocommerce_show_product_images - 20
	 */
	do_action( 'woocommerce_before_single_product_summary' );
	?>

	<div class="summary entry-summary">
		<?php
		/**
		 * Hook: woocommerce_single_product_summary.
		 *
		 * @hooked woocommerce_template_single_title - 5
		 * @hooked woocommerce_template_single_rating - 10
		 * @hooked woocommerce_template_single_price - 10
		 * @hooked woocommerce_template_single_excerpt - 20
		 * @hooked woocommerce_template_single_add_to_cart - 30
		 * @hooked woocommerce_template_single_meta - 40
		 * @hooked woocommerce_template_single_sharing - 50
		 * @hooked WC_Structured_Data::generate_product_data() - 60
		 */
		do_action( 'woocommerce_single_product_summary' );
		?>
	</div>

	<?php
	/**
	 * Hook: woocommerce_after_single_product_summary.
	 *
	 * @hooked woocommerce_output_product_data_tabs - 10
	 * @hooked woocommerce_upsell_display - 15
	 * @hooked woocommerce_output_related_products - 20
	 */
	do_action( 'woocommerce_after_single_product_summary' );
	?>
</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>

<div class="blurred">
	<div class="blurred-box">
		<h3>Log in to our business portal</h3>
		<p>Easily access exclusive partner account through our Business Portal login.</p>
		<div class="blurred-flex">
			<div class="blurred-login">

			</div>
		</div>
	</div>
</div>
<?php do_action( 'woocommerce_after_single_product' ); ?>
