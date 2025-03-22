<?php

namespace NOVA_B2B;

class AI {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Option name for storing the API key
	 *
	 * @var string
	 */
	private const OPTION_NAME = 'nova_grok_api_key';

	public const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

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
		add_action( 'admin_menu', array( $this, 'add_options_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
	}

	/**
	 * Add options page for AI settings
	 */
	public function add_options_page() {
		add_menu_page(
			'AI Settings',
			'AI Settings',
			'manage_options',
			'nova-ai-settings',
			array( $this, 'render_settings_page' ),
			'dashicons-admin-generic',
			30
		);
	}

	/**
	 * Register settings
	 */
	public function register_settings() {
		register_setting(
			'nova_ai_settings',
			self::OPTION_NAME,
			array(
				'type' => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);

		add_settings_section(
			'nova_ai_settings_section',
			'API Configuration',
			array( $this, 'render_section_description' ),
			'nova-ai-settings'
		);

		add_settings_field(
			'nova_grok_api_key',
			'Grok API Key',
			array( $this, 'render_api_key_field' ),
			'nova-ai-settings',
			'nova_ai_settings_section'
		);
	}

	/**
	 * Render section description
	 */
	public function render_section_description() {
		echo '<p>Enter your Grok API key below. This key will be used for AI-powered features.</p>';
	}

	/**
	 * Render API key field
	 */
	public function render_api_key_field() {
		$api_key = get_option( self::OPTION_NAME );
		?>
		<input type="password" name="<?php echo esc_attr( self::OPTION_NAME ); ?>" value="<?php echo esc_attr( $api_key ); ?>"
			class="regular-text" />
		<?php
	}

	/**
	 * Render settings page
	 */
	public function render_settings_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<?php
				settings_fields( 'nova_ai_settings' );
				do_settings_sections( 'nova-ai-settings' );
				submit_button( 'Save Settings' );
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Get the Grok API key
	 *
	 * @return string|null The API key if set, null otherwise
	 */
	public function get_grok_api_key(): ?string {
		return get_option( self::OPTION_NAME );
	}
}