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
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'single-product-wrap', $product ); ?>>
	<?php if ( ! is_user_logged_in() ) : ?>
	<div class="blurred alignfull">
		<?php echo do_shortcode( '[kadence_element id=" 202"]' ); ?>
	</div>
	<?php endif; ?>

	<?php woocommerce_template_single_title(); ?>

	<div class="product-nav-tabs">
		<div id="productNav" class="product-nav-tabs-left">
			<h6><a class="button" href="#overview" data-menu="overview">Overview</a></h6>
			<h6><a class="button" href="#specs" data-menu="specs">Tech Specs</a></h6>
			<h6><a class="button" href="#installation" data-menu="installation">Installation</a></h6>
			<h6><a class="button" href="#sample" data-menu="sample">Sample Board</a></h6>
		</div>

		<div id="productNavMobile" class="product-nav-tabs-mobile" onclick="toggleShowClass()">
			<h6 id="current"><span id="text">Overview</span> <svg xmlns="http://www.w3.org/2000/svg" width="13"
					height="7" viewBox="0 0 13 7" fill="none">
					<path d="M11 2L6.66667 6L2 2" stroke="black" stroke-width="1.5" stroke-linecap="square"
						stroke-linejoin="round" />
				</svg>
			</h6>
			<h6 data-menu="overview" class="selected">Overview</a></h6>
			<h6 data-menu="specs">Tech Specs</a></h6>
			<h6 data-menu="installation">Installation</a></h6>
			<h6 data-menu="sample">Sample Board</a></h6>
		</div>

		<a href="#quote"
			class="button <?php echo ( isset( $_GET['qedit'] ) && $_GET['qedit'] == '1' ? 'active' : '' ); ?>"
			data-menu="quote">Get
			Quote</a>
	</div>

	<script>
	const productNavMobile = document.getElementById('productNavMobile');

	function toggleShowClass() {
		let element = document.getElementById('productNavMobile');
		element.classList.toggle('show');
	}
	productNavMobile.querySelectorAll('[data-menu]').forEach(tab => {
		tab.addEventListener('click', e => {
			e.preventDefault();
			productNavMobile.querySelectorAll('[data-menu]').forEach(tab => tab.classList.remove(
				'selected'));
			tab.classList.add('selected');
			const text = tab.innerHTML;
			const hash = tab.dataset.menu;
			document.querySelector('a[href="#' + hash + '"]').click();
			document.getElementById('text').innerHTML = text;
		});
	});
	</script>

	<div class="product-nav-content" id="productNavContent">
		<div class="product-nav-content-item <?php echo ( isset( $_GET['qedit'] ) && $_GET['qedit'] == '1' ? 'active' : '' ); ?>"
			data-nav="quote">

			<div id="novaQuote"></div>

		</div>

		<div class="product-nav-content-item" data-nav="overview">
			<div class="product-overview">

				<?php do_action( 'nova_product_overview' ); ?>

			</div>

		</div>

		<div class="product-nav-content-item" data-nav="specs">
			<?php do_action( 'nova_product_specs' ); ?>

		</div>

		<?php
		if ( have_rows( 'installations' ) ) :
			?>
		<div class="product-nav-content-item" data-nav="installation">
			<h2 class="mb-10 uppercase">Installation</h2>

			<div class="md:grid md:grid-cols-2 gap-x-10">
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
						<img class="w-full" src="<?php echo esc_url( $image['url'] ); ?>"
							alt="<?php echo esc_attr( $image['alt'] ); ?>" />
						<?php endif; ?>
					</div>
					<div class="px-0">
						<h6 class="uppercase tracking-[1.6px]"><?php the_sub_field( 'title' ); ?></h6>
						<div class="md:text-[14px] leading-loose tracking-[1.4px]">
							<?php the_sub_field( 'content' ); ?></div>
					</div>
				</div>
				<?php endwhile; ?>
			</div>


		</div>
		<?php endif; ?>

		<div class="product-nav-content-item" data-nav="sample">
			<div id="sampleBoard" class="sample-board">
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
			</div>

		</div>

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


<?php do_action( 'woocommerce_after_single_product' ); ?>
