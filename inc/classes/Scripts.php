<?php
namespace NOVA_B2B\INC\CLASSES;

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
		add_action( 'admin_enqueue_scripts', array( $this, 'nova_admin_scripts' ) );
	}

	public function nova_woocommerce_scripts() {
		wp_enqueue_style( 'nova-output', get_stylesheet_directory_uri() . '/assets/css/dist/output.css' );
		wp_register_style( 'nova-single-product', get_stylesheet_directory_uri() . '/assets/css/single-product.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		wp_register_style( 'nova-woo', get_stylesheet_directory_uri() . '/assets/css/woo.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		wp_register_style( 'nova-loggedout', get_stylesheet_directory_uri() . '/assets/css/loggedout.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );
		wp_register_script( 'nova-single-product', get_stylesheet_directory_uri() . '/assets/js/single-product.js', array(), wp_get_theme()->get( 'Version' ), true );
		wp_register_script( 'nova-accordion', get_stylesheet_directory_uri() . '/assets/js/accordion.js', array(), wp_get_theme()->get( 'Version' ), true );
		if ( is_singular( 'product' ) ) {
			wp_enqueue_script( 'nova-accordion' );
			wp_enqueue_style( 'nova-single-product' );
			wp_enqueue_script( 'nova-single-product' );
		}

		if ( is_cart() ) {
			wp_enqueue_style( 'nova-woo' );
		}

		if ( ! is_user_logged_in() ) {
			wp_enqueue_style( 'nova-loggedout' );
		}

		wp_register_script( 'nova-registration', get_stylesheet_directory_uri() . '/assets/js/registration.js', array(), wp_get_theme()->get( 'Version' ), true );

		wp_localize_script(
			'nova-registration',
			'NovaSignUp',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'nova_signup_nonce' ),
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
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'nova_login_nonce' ),
			)
		);

		if ( ! is_user_logged_in() ) {
			wp_enqueue_script( 'nova-login' );
		}

		wp_register_script( 'nova-account', get_stylesheet_directory_uri() . '/assets/js/myaccount.js', array(), wp_get_theme()->get( 'Version' ), true );

		wp_localize_script(
			'nova-account',
			'NovaMyAccount',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'nova_account_nonce' ),
				'quote'    => $this->get_quote(),
			)
		);

		if ( is_account_page() ) {
			wp_enqueue_script( 'nova-account' );
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
			$id         = $_GET['qid'];
			$partner_id = get_field( 'partner', $id );
			$product_id = get_field( 'product', $id );
			return array(
				'ID'           => $id,
				'title'        => get_the_title( $id ),
				'data'         => get_field( 'signage', $id ),
				'final_price'  => get_field( 'final_price', $id ),
				'product_name' => get_the_title( $product_id ),
				'material'     => $this->get_material_name( $product_id ),
				'business_id'  => get_field( 'business_id', 'user_' . $partner_id ),
				'partner'      => $partner_id,
				'published'    => get_the_date( 'F j, Y', $id ),
				'updated_date' => get_the_modified_date( 'F j, Y', $id ),
				'company_name' => get_field( 'business_name', 'user_' . $partner_id ),
				'quote_status' => get_field( 'quote_status', $id ),
				'product_link' => esc_url( get_permalink( $product_id ) ),
				'note'         => get_field( 'note', $id ),
			);
	}

	public function get_material_name( $id ) {
		if ( ! get_post_status( $id ) ) {
			return 'None'; // Or any default value you wish to return
		}

		$terms = get_the_terms( $id, 'product_cat' );
		if ( is_array( $terms ) && ! empty( $terms ) ) {
			return $terms[0]->name;
		}

		return 'None';
	}


	public function get_quote_options() {
		return get_field( 'acrylic_quote_options' );
	}

	public function nova_admin_scripts( $hook ) {

		global $post;

		if ( 'post.php' !== $hook && 'post-new.php' !== $hook && 'toplevel_page_nova-options' !== $hook ) {
			return;
		}

		wp_register_script( 'admin-acrylic', get_stylesheet_directory_uri() . '/assets/js/admin-acrylic.js', array(), '1.0', true );
		wp_register_script( 'admin-quote', get_stylesheet_directory_uri() . '/assets/js/admin-quote.js', array(), '1.0', true );
		wp_register_script( 'dropbox-api', get_stylesheet_directory_uri() . '/assets/js/dropbox.js', array(), '1.0', true );

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
			'admin-acrylic',
			'AcrylicAdmin',
			array(
				'ajax_url'      => admin_url( 'admin-ajax.php' ),
				'nonce'         => wp_create_nonce( 'nova_admin_nonce' ),
				'ID'            => isset( $_GET['post'] ) ? $_GET['post'] : 0,
				'quote_options' => $this->get_quote_options(),
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

			if ( in_array( 'acrylic', $categories ) ) {
				wp_enqueue_script( 'admin-acrylic' );
			}
		}

		if ( $post && 'nova_quote' === $post->post_type ) {
			wp_enqueue_script( 'admin-quote' );
		}

		wp_enqueue_style( 'nova-admin', get_stylesheet_directory_uri() . '/assets/css/admin.css' );

		if ( 'toplevel_page_nova-options' === $hook ) {
			wp_enqueue_script( 'dropbox-api' );
		}
	}
}

Scripts::get_instance();
