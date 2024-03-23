<?php
namespace NOVA_B2B\Inc\Classes;

use WC;
class Scripts {
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

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'nova_woocommerce_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_customer_rep_editor_css' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'nova_admin_scripts' ) );
	}

	public function enqueue_customer_rep_editor_css() {

		if ( current_user_can( 'customer-rep' ) ) {
			wp_enqueue_style( 'customer-rep-editor-css', get_stylesheet_directory_uri() . '/assets/css/customer-rep.css' );
		}
	}

	public function nova_woocommerce_scripts() {

		wp_enqueue_style( 'nova-output', get_stylesheet_directory_uri() . '/assets/css/dist/output.css' );

		wp_register_script( 'splide', get_stylesheet_directory_uri() . '/assets/js/splide.min.js', array(), '4.1.4' );
		wp_register_script( 'splide-init', get_stylesheet_directory_uri() . '/assets/js/splide-init.js', array( 'splide' ), wp_get_theme()->get( 'Version' ), false, false );
		wp_register_style( 'splide', get_stylesheet_directory_uri() . '/assets/css/splide.min.css', array(), '4.1.4' );

		wp_register_style( 'nova-single-product', get_stylesheet_directory_uri() . '/assets/css/single-product.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		wp_register_style( 'nova-woo', get_stylesheet_directory_uri() . '/assets/css/woo.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		wp_register_script( 'nova-woo', get_stylesheet_directory_uri() . '/assets/js/woo.js', array( 'jquery' ), wp_get_theme()->get( 'Version' ), false, false );
		wp_register_style( 'nova-loggedout', get_stylesheet_directory_uri() . '/assets/css/loggedout.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		wp_register_script( 'nova-single-product', get_stylesheet_directory_uri() . '/assets/js/single-product.js', array(), wp_get_theme()->get( 'Version' ), true );
		wp_register_script( 'nova-accordion', get_stylesheet_directory_uri() . '/assets/js/accordion.js', array(), wp_get_theme()->get( 'Version' ), true );
		wp_enqueue_script( 'fancyapps', get_stylesheet_directory_uri() . '/assets/js/fancybox.umd.js', array(), '5.0.0', true );

		wp_register_style( 'flickity', get_stylesheet_directory_uri() . '/assets/css/flickity.min.css', array(), '2.2.1' );
		wp_register_script( 'flickity', get_stylesheet_directory_uri() . '/assets/js/flickity.min.js', array(), '2.2.1', false );

		wp_register_script( 'flickity-init', get_stylesheet_directory_uri() . '/assets/js/flickity-init.js', array( 'flickity' ), wp_get_theme()->get( 'Version' ), true );

		wp_enqueue_style( 'fancyapps', get_stylesheet_directory_uri() . '/assets/css/fancybox.css', array( 'nova-output' ), '5.0.0' );

		wp_register_style( 'nova-account', get_stylesheet_directory_uri() . '/assets/css/account.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );

		if ( is_account_page() ) {
			wp_enqueue_style( 'nova-account' );
		}

		if ( is_singular( 'product' ) || is_singular( 'signage' ) || is_page( 'custom' ) || is_page( 'custom-project' ) ) {
			wp_enqueue_script( 'splide' );
			wp_enqueue_style( 'splide' );
			wp_enqueue_script( 'nova-accordion' );
			wp_enqueue_style( 'nova-single-product' );
			wp_enqueue_script( 'nova-single-product' );
		}

		if ( is_cart() || is_checkout() ) {
			wp_enqueue_style( 'nova-woo' );
			wp_enqueue_script( 'nova-woo' );
		}

		if ( ! is_user_logged_in() ) {
			wp_enqueue_style( 'nova-loggedout' );
		}

		wp_register_script( 'nova-registration', get_stylesheet_directory_uri() . '/assets/js/registration.js', array(), wp_get_theme()->get( 'Version' ), true );

		wp_localize_script(
			'nova-registration',
			'NovaSignUp',
			array(
				'ajax_url'    => admin_url( 'admin-ajax.php' ),
				'nonce'       => wp_create_nonce( 'nova_signup_nonce' ),
				'success_url' => home_url( 'signup-success' ),
			)
		);

		if ( is_page( 'business-portal-sign-up' ) && ! is_user_logged_in() ) {
			wp_enqueue_script( 'nova-registration' );
		}

		wp_register_script( 'nova-login', get_stylesheet_directory_uri() . '/assets/js/login.js', array(), wp_get_theme()->get( 'Version' ), true );

		wp_localize_script(
			'nova-login',
			'NovaLogin',
			array(
				'ajax_url'      => admin_url( 'admin-ajax.php' ),
				'nonce'         => wp_create_nonce( 'nova_login_nonce' ),
				'dashboard_url' => home_url( '/my-account' ),
			)
		);

		if ( ! is_user_logged_in() ) {
			wp_enqueue_script( 'nova-login' );
		}

		wp_register_script( 'nova-account', get_stylesheet_directory_uri() . '/assets/js/myaccount.js', array(), wp_get_theme()->get( 'Version' ), true );

		$qid = isset( $_GET['qid'] ) ? $_GET['qid'] : '';
		wp_localize_script(
			'nova-account',
			'NovaMyAccount',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'nova_account_nonce' ),
				'quote'    => $this->get_quote(),
				'tax_rate' => $this->get_tax_rate_by_project( $qid ),
				'country'  => $this->get_customer_country_code(),
				'state'    => $this->get_customer_state_code(),
			)
		);

		if ( is_account_page() || is_singular( 'signage' ) ) {
			wp_enqueue_script( 'nova-account' );
		}

		if ( is_front_page() ) {
			wp_enqueue_style( 'flickity' );
			wp_enqueue_script( 'flickity' );
			wp_enqueue_script( 'flickity-init' );
		}
	}

	public function get_customer_country_code() {
		$user_id = get_current_user_id();

		if ( ! $user_id ) {
			return false;
		}

		$country_code = get_user_meta( $user_id, 'shipping_country', true );

		return ! empty( $country_code ) ? $country_code : false;
	}


	public function get_customer_state_code() {
		$user_id = get_current_user_id();

		if ( ! $user_id ) {
			return false;
		}

		$state_code = get_user_meta( $user_id, 'shipping_state', true );

		return ! empty( $state_code ) ? $state_code : false;
	}

	public function get_tax_rate_by_project( $post_id ) {
		if ( ! $post_id ) {
			return;
		}

		$user_id = get_field( 'partner', $post_id );

		return $this->get_woocommerce_tax_rate_by_country_and_state( $user_id, '', '' );
	}


	public function get_woocommerce_tax_rate_by_country_and_state( $user_id = null, $country_code = '', $state_code = '' ) {
		global $wpdb;

		if ( is_null( $user_id ) ) {
			$user_id = get_current_user_id();
		}

		// Use global customer as fallback
		if ( empty( $country_code ) || empty( $state_code ) ) {
			$country_code = get_user_meta( $user_id, 'shipping_country', true ) ?: $country_code;
			$state_code   = get_user_meta( $user_id, 'shipping_state', true ) ?: $state_code;
		}

		try {
			$tax_rates = $wpdb->get_results(
				$wpdb->prepare(
					"
                SELECT tax_rate, tax_rate_name
                FROM {$wpdb->prefix}woocommerce_tax_rates
                WHERE tax_rate_country = %s
                AND tax_rate_state = %s
                AND tax_rate_class = ''
                ORDER BY tax_rate_order
                ",
					$country_code,
					$state_code
				)
			);

			return $tax_rates ? $tax_rates[0] : null;
		} catch ( Exception $e ) {
			// Optionally log the error or handle it as needed
			return null;
		}
	}




	public function get_product_cat_name_by_id( $product_id ) {
		$terms = wp_get_post_terms( $product_id, 'product_cat' );

		if ( is_wp_error( $terms ) || empty( $terms ) ) {
			return '';
		}

		return $terms[0]->name;
	}

	public function get_quote() {
		if ( ! isset( $_GET['qid'] ) ) {
			return;
		}
			$id           = $_GET['qid'];
			$partner_id   = get_field( 'partner', $id );
			$product_id   = get_field( 'product', $id );
			$product_name = $product_id ? get_the_title( $product_id ) : 'Custom Project';
			return array(
				'ID'           => $id,
				'title'        => get_field( 'frontend_title', $id ),
				'data'         => get_field( 'signage', $id ),
				'final_price'  => get_field( 'final_price', $id ),
				'product_name' => $product_name,
				'material'     => $this->get_material_name( $product_id ),
				'business_id'  => get_field( 'business_id', 'user_' . $partner_id ),
				'partner'      => $partner_id,
				'published'    => get_the_date( 'F j, Y', $id ),
				'updated_date' => get_the_modified_date( 'F j, Y', $id ),
				'company_name' => get_field( 'business_name', 'user_' . $partner_id ),
				'quote_status' => get_field( 'quote_status', $id ),
				'product_link' => esc_url( get_permalink( $product_id ) ),
				'product_line' => $product_id,
				'note'         => get_field( 'note', $id ),
			);
	}

	public function get_material_name( $id ) {
		if ( ! get_post_status( $id ) ) {
			return 'None'; // Or any default value you wish to return
		}

		if ( 'signage' === get_post_type( $id ) ) {
			$parent_id = wp_get_post_parent_id( $id );

			return $parent_id ? get_the_title( $parent_id ) : get_the_title( $id );
		}

		return 'Custom Project';
	}

	public function get_letter_pricing_table() {
		return get_field( 'letter_pricing_table', get_the_ID() );
	}

	public function get_logo_pricing_tables() {
		return get_field( 'logo_pricing_tables', get_the_ID() );
	}


	public function get_quote_options() {
		return get_field( 'signage_quote_options', get_the_ID() );
	}

	public function get_lasercut_stainless_metal_pricing() {
		return get_field( 'lasercut_stainless_metal_pricing', get_the_ID() );
	}

	public function get_fabricated_metal_pricing() {
		return get_field( 'fabricated_stainless_metal_pricing', get_the_ID() );
	}

	public function nova_admin_scripts( $hook ) {

		global $post;

		if ( 'post.php' !== $hook && 'post-new.php' !== $hook && 'toplevel_page_nova-options' !== $hook ) {
			return;
		}

		wp_register_script( 'admin-signage', get_stylesheet_directory_uri() . '/assets/js/admin-signage.js', array(), '1.0', true );
		wp_register_script( 'admin-acrylic', get_stylesheet_directory_uri() . '/assets/js/admin-acrylic.js', array(), '1.0', true );
		wp_register_script( 'admin-metal', get_stylesheet_directory_uri() . '/assets/js/admin-metal.js', array(), '1.0', true );
		wp_register_script( 'admin-stainless-metal', get_stylesheet_directory_uri() . '/assets/js/admin-stainless-metal.js', array(), '1.0', true );
		wp_register_script( 'admin-fabricated-metal', get_stylesheet_directory_uri() . '/assets/js/admin-fabricated-metal.js', array(), '1.0', true );
		wp_register_script( 'admin-quote', get_stylesheet_directory_uri() . '/assets/js/admin-quote.js', array(), '1.0', true );
		wp_register_script( 'admin-projects', get_stylesheet_directory_uri() . '/assets/js/admin-projects.js', array(), '1.0', true );
		wp_register_script( 'dropbox-api', get_stylesheet_directory_uri() . '/assets/js/dropbox.js', array(), '1.0', true );

		wp_register_script( 'admin-letter-pricing', get_stylesheet_directory_uri() . '/assets/js/admin-letter-pricing.js', array(), '1.0', true );
		wp_register_script( 'admin-logo-pricing', get_stylesheet_directory_uri() . '/assets/js/admin-logo-pricing.js', array(), '1.0', true );

		wp_localize_script(
			'dropbox-api',
			'DropboxNova',
			array(
				'ajax_url'     => admin_url( 'admin-ajax.php' ),
				'nonce'        => wp_create_nonce( 'dropbox' ),
				'redirect_uri' => get_field( 'dropbox_redirect_url', 'option' ),
				'app_key'      => get_field( 'dropbox_app_key', 'option' ),
				'secret_key'   => get_field( 'dropbox_secret_key', 'option' ),
				'token'        => get_field( 'dropbox_token_access', 'option' ),
			)
		);

		wp_localize_script(
			'admin-signage',
			'AdminSignage',
			array(
				'ajax_url'             => admin_url( 'admin-ajax.php' ),
				'nonce'                => wp_create_nonce( 'nova_admin_nonce' ),
				'ID'                   => isset( $_GET['post'] ) ? $_GET['post'] : 0,
				'quote_options'        => $this->get_quote_options(),
				'letter_pricing_table' => $this->get_letter_pricing_table(),
				'logo_pricing_tables'  => $this->get_logo_pricing_tables(),
			)
		);

		wp_localize_script(
			'admin-stainless-metal',
			'AdminStainlessMetal',
			array(
				'pricing_table' => $this->get_lasercut_stainless_metal_pricing(),
			)
		);

		wp_localize_script(
			'admin-fabricated-metal',
			'AdminFabricatedMetal',
			array(
				'pricing_table' => $this->get_fabricated_metal_pricing(),
			)
		);

		wp_localize_script(
			'admin-quote',
			'QuoteAdmin',
			array(
				'signage' => get_field( 'signage' ),
			)
		);

		if ( $post && 'product' === $post->post_type ) {
			$categories = wp_get_post_terms( $post->ID, 'product_cat', array( 'fields' => 'slugs' ) );

			if ( in_array( 'signage', $categories ) ) {
				wp_enqueue_script( 'admin-acrylic' );
			}
		}

		if ( $post && 'signage' === $post->post_type ) {
			wp_enqueue_script( 'admin-signage' );

			if ( 'laser-cut-acrylic' === $post->post_name ) {
				wp_enqueue_script( 'admin-acrylic' );
			}

			if ( 'metal-sign' === $post->post_name ) {
				wp_enqueue_script( 'admin-metal' );
			}

			if ( 'laser-cut-stainless-steel' === $post->post_name ) {
				wp_enqueue_script( 'admin-stainless-metal' );
			}

			if ( 'fabricated-stainless-steel' === $post->post_name ) {
				wp_enqueue_script( 'admin-fabricated-metal' );
			}

			if ( get_field( 'letter_pricing_table' ) ) {
				wp_enqueue_script( 'admin-letter-pricing' );

			}
			if ( get_field( 'logo_pricing_tables' ) ) {

				wp_enqueue_script( 'admin-logo-pricing' );
			}
		}

		if ( $post && 'nova_quote' === $post->post_type ) {
			wp_enqueue_script( 'admin-quote' );
		}

		wp_localize_script(
			'admin-projects',
			'CustomProjects',
			array(
				'projects' => get_field( 'projects' ),
			)
		);

		if ( $post && 'custom_project' === $post->post_type ) {
			wp_enqueue_script( 'admin-projects' );
		}

		wp_enqueue_style( 'nova-admin', get_stylesheet_directory_uri() . '/assets/css/admin.css' );

		if ( 'toplevel_page_nova-options' === $hook ) {
			wp_enqueue_script( 'dropbox-api' );
		}
	}
}

Scripts::get_instance();
