<?php
namespace NOVA_B2B\INC\CLASSES;

class Shortcodes {
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
		add_shortcode( 'nova_signup', array( $this, 'nova_signup' ) );
		add_shortcode( 'activate_account', array( $this, 'activate_account' ) );
		add_shortcode( 'nova_login_form', array( $this, 'nova_login_form' ) );
		add_shortcode( 'blurred_login', array( $this, 'nova_login_form' ) );
	}

	public function nova_signup() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/signup.php';

		return ob_get_clean();
	}

	public function activate_account() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/activate.php';

		return ob_get_clean();
	}

	public function nova_login_form() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/loginform.php';

		return ob_get_clean();
	}
}

Shortcodes::get_instance();
