<?php

namespace NOVA_B2B\INC\CLASSES;

use WP_Query;

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
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_specs' ), 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_faqs' ), 11 );
		add_filter( 'woocommerce_get_query_vars', array( $this, 'add_mockups_endpoint_query_var' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'add_mockups_link_my_account' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'add_mockups_endpoints' ) );
		add_action( 'woocommerce_account_mockups_endpoint', array( $this, 'add_mockups_content' ) );
		add_action( 'woocommerce_account_mockups-drafts_endpoint', array( $this, 'mockups_drafts_content' ) );
		add_action( 'woocommerce_account_mockups-processing_endpoint', array( $this, 'mockups_processing_content' ) );
		add_action( 'woocommerce_account_mockups-payments_endpoint', array( $this, 'mockups_payments_content' ) );
		add_action( 'woocommerce_account_mockups-view_endpoint', array( $this, 'mockups_view_content' ) );
		add_filter( 'woocommerce_endpoint_mockups_title', array( $this, 'mockups_endpoint_title' ), 10, 2 );
		add_action( 'init', array( $this, 'add_nested_mockups_rewrite_rules' ) );
		add_action( 'nova_account_navigation', array( $this, 'nova_account_navigation' ) );
		add_action( 'nova_inner_account_nav', array( $this, 'myaccount_nav_avatar' ) );
		add_action( 'woocommerce_account_content', array( $this, 'nova_account_title' ), 5 );
	}

	public function nova_account_title() {
		$endpoint = WC()->query->get_current_endpoint();
		switch ( $endpoint ) {
			case 'downloads':
				$endpoint_title = 'Downloads';
				break;
			case 'orders':
				$endpoint_title = 'Orders';
				break;
			case 'mockups':
			case 'mockups-drafts':
			case 'mockups-processing':
			case 'mockups-payments':
			case 'mockups-view':
				$endpoint_title = 'Mockups';
				break;
			case 'edit-account':
				$endpoint_title = 'Account';
				break;
			default:
				$endpoint_title = 'Dashboard';
				break;
		}
		?>
<h2 class="pb-4 mb-4 uppercase mt-0"><?php echo $endpoint_title; ?></h2>
		<?php
	}

	public function nova_account_navigation() {
		get_template_part( 'template-parts/my-account/navigation' );
	}

	public function mockups_view_content() {
		get_template_part( 'template-parts/my-account/view' );
	}

	public function add_nested_mockups_rewrite_rules() {
		add_rewrite_endpoint( 'mockups-drafts', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-processing', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-payments', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-view', EP_ROOT | EP_PAGES );
	}

	public function add_mockups_endpoints( $items ) {
		$new_items = array();

		foreach ( $items as $key => $value ) {
			$new_items[ $key ] = $value;

			if ( 'mockups' === $key ) {
				$new_items['mockups-drafts']     = 'Mockups Drafts';
				$new_items['mockups-payments']   = 'Mockups Payments';
				$new_items['mockups-processing'] = 'Mockups Processing';
				$new_items['mockups-view']       = 'View Mockup';
			}
		}

		return $new_items;
	}

	public function mockups_endpoint_title( $title, $endpoint ) {
		if ( $endpoint === 'mockups' ) {
			$title = 'Mockups';
		}
		return $title;
	}


	public function mockups_processing_content() {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'processing',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'  => 'nova_quote',
				'meta_query' => $meta_query,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_drafts_content() {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'draft',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'  => 'nova_quote',
				'meta_query' => $meta_query,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_payments_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'ready',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'  => 'nova_quote',
				'meta_query' => $meta_query,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function add_mockups_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'  => 'nova_quote',
				'meta_query' => $meta_query,
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_nav() {
		global $wp_query;
		?>
<div class="border-b font-title uppercase flex gap-11 mb-8">
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/all' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/all'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">ALL
		Mockups</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/drafts' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/drafts'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Drafts</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/processing' ) ); ?>"
		class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/processing'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Processing</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/payments' ) ); ?>"
		class="py-4 py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/payments'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Quoted</a>
</div>
		<?php
	}

	public function add_mockups_link_my_account( $items ) {
		unset( $items['downloads'] );
		$items['mockups'] = 'Mockups'; // Add a new menu item for your endpoint.

		return $items;
	}

	public function add_mockups_endpoint_query_var( $vars ) {
		$vars['mockups']            = 'mockups/all';
		$vars['mockups-drafts']     = 'mockups/drafts';
		$vars['mockups-processing'] = 'mockups/processing';
		$vars['mockups-payments']   = 'mockups/payments';
		$vars['mockups-view']       = 'mockups/view';
		return $vars;
	}


	public function nova_product_specs() {
		if ( have_rows( 'tech_specs_group' ) ) :
			?>
<div class="nova_product_specs_group">
			<?php
			while ( have_rows( 'tech_specs_group' ) ) :
				the_row();
				?>
	<h2><?php the_sub_field( 'title' ); ?></h2>
				<?php
				if ( have_rows( 'specs' ) ) :
					?>
	<div class="spec-group">
					<?php
					while ( have_rows( 'specs' ) ) :
						the_row();
						?>
		<div class="spec-item">
			<div class="spec-label">
						<?php the_sub_field( 'name' ); ?>
			</div>
			<div class="spec-value">
						<?php the_sub_field( 'value' ); ?>
			</div>
		</div>

						<?php
						endwhile;
					?>
	</div>
					<?php
		endif;
				?>

	<?php endwhile; ?>
</div>
			<?php
		endif;
	}

	public function nova_product_faqs() {
		if ( have_rows( 'faqs' ) ) {
			?>
<div id="faqItems" class="has-faq accordion">
	<h2 class="uppercase">Frequently asked Questions</h2>
			<?php
			while ( have_rows( 'faqs' ) ) {
				the_row();
				?>
	<div class="faq-item visible">
		<p class="faq-question"><?php the_sub_field( 'question' ); ?> <svg width="14" height="14" viewBox="0 0 14 14"
				fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="7" y1="1" x2="7" y2="13" stroke="black" stroke-width="2" stroke-linecap="round">
				</line>
				<line x1="13" y1="7" x2="1" y2="7" stroke="black" stroke-width="2" stroke-linecap="round">
				</line>
			</svg></p>
		<div class="expander">
			<div class="expander-content">
				<div class="content-wrapper">
					<?php if ( get_sub_field( 'answer' ) ) : ?>
					<div class="post-content-container" style="padding-top: 2em;">
						<?php the_sub_field( 'answer' ); ?>
					</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
				<?php
			}
			?>
</div>
			<?php
		}
	}

	public function myaccount_nav_avatar() {
		$current_user = wp_get_current_user();
		?>
<div class="kadence-account-avatar">
	<div class="kadence-customer-image">
		<a class="kt-link-to-gravatar" href="https://gravatar.com/" target="_blank" rel="no"
			title="<?php echo esc_attr__( 'Update Profile Photo', 'kadence' ); ?>">
			<?php echo get_avatar( $current_user->ID, 40, null, null, array( 'class' => array( 'rounded-full' ) ) ); ?>
		</a>
	</div>
</div>
<div class="kadence-customer-name">
	<h5 class="uppercase mt-2 mb-0 block"><?php echo esc_html( $current_user->display_name ); ?></h5>
	<a href="<?php echo wp_logout_url( '/' ); ?>" class="text-black text-[10px]">LOG OUT</a>
</div>
		<?php
	}
}

Woocommerce::get_instance();
