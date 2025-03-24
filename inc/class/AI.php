<?php

namespace NOVA_B2B;

class AI {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static ?self $instance = null;

	/**
	 * Option name for storing the API key
	 *
	 * @var string
	 */

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

	public function get_providers(): array {
		return [ 
			'grok' => [ 
				'name' => 'Grok',
				'api_url' => 'https://api.x.ai/v1/chat/completions',
				'option_key' => 'grok_api_key',
				'description' => 'Grok API Key',
			],
			'openai' => [ 
				'name' => 'OpenAI',
				'api_url' => 'https://api.openai.com/v1/chat/completions',
				'option_key' => 'openai_api_key',
				'description' => 'OpenAI API Key',
			],
		];
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
	public function register_settings(): void {
		foreach ( $this->get_providers() as $provider_id => $provider ) {

			register_setting(
				'nova_ai_settings_group', // Settings group name
				$provider['option_key'],  // Individual option name
				[ 
					'type' => 'string',
					'sanitize_callback' => 'sanitize_text_field',
				]
			);
		}

		add_settings_section(
			'nova_ai_settings_section',
			'AI Providers Configuration',
			[ $this, 'render_section_description' ],
			'nova-ai-settings'
		);

		// Dynamically register settings fields for each provider
		foreach ( $this->get_providers() as $provider_id => $provider ) {
			add_settings_field(
				$provider['option_key'],
				$provider['name'] . ' API Key',
				[ $this, 'render_api_key_field' ],
				'nova-ai-settings',
				'nova_ai_settings_section',
				[ 'provider' => $provider_id ]
			);
		}
	}

	/**
	 * Render section description
	 */
	public function render_section_description() {
		echo '<p>Enter your API Keys. This key will be used for AI-powered features.</p>';
	}

	/**
	 * Render API key field
	 */
	public function render_api_key_field( array $args ): void {
		$provider = $args['provider'];
		$option_key = $this->get_providers()[ $provider ]['option_key'];
		$api_key = get_option( $option_key );
		?>
		<input type="password" name="<?php echo esc_attr( $option_key ); ?>" value="<?php echo esc_attr( $api_key ); ?>"
			class="regular-text" />
		<p class="description">
			<?php echo esc_html( $this->get_providers()[ $provider ]['description'] ); ?>
		</p>
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
				settings_fields( 'nova_ai_settings_group' ); // Match the group name used in register_setting
				do_settings_sections( 'nova-ai-settings' );
				submit_button( 'Save Settings' );
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Get API key for a specific provider
	 *
	 * @param string $provider_id The provider identifier
	 * @return string|null The API key if set, null otherwise
	 */
	public function get_api_key( string $provider_id ): ?string {
		if ( ! isset( $this->get_providers()[ $provider_id ] ) ) {
			return null;
		}
		return get_option( $this->get_providers()[ $provider_id ]['option_key'] );
	}

	/**
	 * Get API URL for a specific provider
	 *
	 * @param string $provider_id The provider identifier
	 * @return string|null The API URL if provider exists, null otherwise
	 */
	public function get_api_url( string $provider_id ): ?string {
		return $this->get_providers()[ $provider_id ]['api_url'] ?? null;
	}
}