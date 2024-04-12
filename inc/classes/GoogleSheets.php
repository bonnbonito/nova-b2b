<?php

namespace NOVA_B2B\Inc\Classes;

class GoogleSheets {
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
		if ( function_exists( 'acf_add_options_page' ) ) {
			add_action( 'init', array( $this, 'add_options_page' ) );
		}
		add_action( 'wp_loaded', array( $this, 'initialize_options' ) );
		add_action( 'acf/input/admin_footer', array( $this, 'add_custom_button_to_acf_options_page' ) );
		add_action( 'wp_ajax_google_token', array( $this, 'google_token' ) );
	}

	public function initialize_options() {
		$this->GOOGLE_CLIENT_ID = get_field( 'google_client_id', 'option' );
		$this->GOOGLE_SECRET    = get_field( 'google_secret_key', 'option' );

		$this->config  = array(
			'callback'                 => 'http://localhost:3002/wp-admin/admin.php?page=acf-options-googlesheet-settings',
			'keys'                     => array(
				'id'     => $this->GOOGLE_CLIENT_ID,
				'secret' => $this->GOOGLE_SECRET,
			),
			'scope'                    => 'https://www.googleapis.com/auth/spreadsheets',
			'authorize_url_parameters' => array(
				'approval_prompt' => 'force', // to pass only when you need to acquire a new refresh token.
				'access_type'     => 'offline',
			),
		);
		$this->adapter = new \Hybridauth\Provider\Google( $this->config );
	}

	public function add_options_page() {

		acf_add_options_sub_page(
			array(
				'page_title'  => 'GoogleSheet Settings',
				'menu_title'  => 'GoogleSheet Settings',
				'parent_slug' => 'nova-options',
			)
		);
	}

	public function google_token() {
		$status = array(
			'code' => 1,
		);

		try {
			$this->adapter->authenticate();
			$token = $this->adapter->getAccessToken();
			wp_send_json( $token );
		} catch ( Exception $e ) {
			echo $e->getMessage();
		}

		wp_send_json( $status );
	}

	public function add_custom_button_to_acf_options_page() {
		$screen = get_current_screen();
		// Check if we are on the settings page
		if ( $screen->base == 'nova-options_page_acf-options-googlesheet-settings' ) {
			ob_start();
			?>
<script>
const googleToken = document.getElementById('googleToken');

googleToken.addEventListener('click', e => {
	e.preventDefault();
	const formData = new FormData();
	formData.append('action', 'google_token');

	fetch(ajaxurl, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.code == 2) {
				location.reload();
			}
		})
		.catch((error) => console.error('Error:', error));

});
</script>
			<?php
			echo ob_get_clean();
		}
	}
}

GoogleSheets::get_instance();
