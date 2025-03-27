<?php

namespace NOVA_B2B;

class PhotoRegistration {
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
		add_shortcode( 'nova_photo_upload', array( $this, 'render_photo_upload' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_ajax_process_image', array( $this, 'process_image' ) );
		add_action( 'wp_ajax_nopriv_process_image', array( $this, 'process_image' ) );
	}

	public function process_image() {
		try {
			check_ajax_referer( 'nova_photo_upload', 'nonce' );

			if ( ! isset( $_POST['file'] ) || empty( $_POST['file'] ) ) {
				throw new \Exception( 'No file provided' );
			}

			$file = $_POST['file'];
			$AI = \NOVA_B2B\AI::get_instance();

			if ( ! $AI ) {
				throw new \Exception( 'AI instance not available' );
			}

			$grok_api_key = $AI->get_api_key( 'grok' );
			if ( ! $grok_api_key ) {
				throw new \Exception( 'API key not available' );
			}

			$GROK_API_URL = $AI->get_api_url( 'grok' );

			// Configure request with proper timeouts and retry logic
			$max_retries = 3;
			$retry_count = 0;
			$last_error = null;

			while ( $retry_count < $max_retries ) {
				$response = wp_remote_post( $GROK_API_URL, array(
					'headers' => array(
						'Authorization' => 'Bearer ' . $grok_api_key,
						'Content-Type' => 'application/json',
					),
					'body' => json_encode( array(
						'model' => 'grok-2-vision-latest',
						'stream' => false,
						'messages' => array(
							array(
								'role' => 'user',
								'content' => array(
									array(
										'type' => 'image_url',
										'image_url' => array(
											'url' => $file,
											'detail' => 'high',
										),
									),
									array(
										'type' => 'text',
										'text' => 'Extract the following information from the image: First Name, Last Name, Business Name, Email, Website, Phone, Street Address, City, State, Zip, Country. Country is 2 letter(CA or US only). Return the information in a JSON object directly. no other texts. Object keys are firstName, lastName, businessName, businessEmail, businessWebsite, businessPhone, country, street, city, state, zip',
									),
								),
							),
						),
					) ),
					'timeout' => 30, // Increase timeout to 30 seconds
					'blocking' => true,
					'httpversion' => '1.1',
					'compress' => true,
				) );

				if ( ! is_wp_error( $response ) ) {
					$response_code = wp_remote_retrieve_response_code( $response );
					if ( $response_code === 200 ) {
						break; // Success, exit retry loop
					}
					$last_error = new \Exception( 'API returned status code: ' . $response_code );
				} else {
					$last_error = $response;
				}

				$retry_count++;
				if ( $retry_count < $max_retries ) {
					sleep( 1 ); // Wait 1 second before retrying
				}
			}

			if ( $retry_count >= $max_retries ) {
				throw new \Exception(
					$last_error instanceof \WP_Error
					? $last_error->get_error_message()
					: $last_error->getMessage()
				);
			}

			$body = json_decode( $response['body'], true );
			if ( ! $body ) {
				throw new \Exception( 'Invalid API response' );
			}

			$content = $body['choices'][0]['message']['content'] ?? null;
			if ( ! $content ) {
				throw new \Exception( 'No content found in API response' );
			}

			$data = array(
				'success' => true,
				'message' => 'Image processed successfully',
				'data' => $content, // Parse the JSON content
			);

			wp_send_json( $data );
		} catch (\Exception $e) {
			wp_send_json_error( array(
				'message' => $e->getMessage(),
			) );
		}
	}
	/**
	 * Enqueue required styles
	 */
	public function enqueue_scripts() {
		wp_register_style(
			'nova-photo-upload',
			get_stylesheet_directory_uri() . '/assets/css/photo-upload.css',
			array(),
			wp_get_theme()->get( 'Version' )
		);

		wp_register_script(
			'nova-photo-upload',
			get_stylesheet_directory_uri() . '/assets/js/photo-upload.js',
			array(),
			wp_get_theme()->get( 'Version' ),
			true
		);

		// Pass configuration to JavaScript
		wp_localize_script(
			'nova-photo-upload',
			'novaPhotoUpload',
			array(
				'allowedTypes' => array( 'image/jpeg', 'image/png', 'image/gif' ),
				'maxFileSize' => wp_max_upload_size(),
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'nova_photo_upload' ),
			)
		);
	}

	/**
	 * Render the photo upload form
	 *
	 * @param array $atts Shortcode attributes
	 * @return string HTML output
	 */
	public function render_photo_upload( $atts ) {
		$atts = shortcode_atts(
			array(
				'button_text' => 'Upload Photo',
				'camera_text' => 'Take Photo',
				'class' => '',
			),
			$atts
		);

		wp_enqueue_style( 'nova-photo-upload' );
		wp_enqueue_script( 'nova-photo-upload' );

		ob_start();
		?>
		<div id="photoContainer" class="nova-photo-upload-container relative max-w-[500px] mx-auto p-4">
			<div id="loader" class="bg-opacity-40 bg-slate-700 absolute w-full h-full items-center justify-center left-0 top-0"
				style="display: none;">
				<span class="flex items-center gap-2 text-white text-lg">
					<svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
						viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
						</path>
					</svg> Please wait...
				</span>
			</div>
			<div class="nova-photo-upload-wrapper">
				<h2 class="text-2xl font-semibold tracking-tight text-center mb-6">Business Card Upload</h2>

				<div class="nova-photo-button-container flex justify-center gap-4">
					<button id="open-camera" class="nova-photo-camera-button flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
							class="size-6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
						</svg>


						<?php echo esc_html( $atts['camera_text'] ); ?>
					</button>
					<div class="nova-photo-upload-wrapper">
						<input type="file" id="file-upload" class="nova-photo-input hidden" accept="image/*" />
						<button type="button" class="nova-photo-upload-button flex items-center gap-2"
							onclick="document.getElementById('file-upload').click()">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
								stroke="currentColor" class="size-6">
								<path stroke-linecap="round" stroke-linejoin="round"
									d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
							</svg>

							<?php echo esc_html( $atts['button_text'] ); ?>
						</button>
					</div>
				</div>

				<div id="photo-preview" class="nova-photo-preview hidden p-4">
					<img class="max-w-[350px] max-h-[350px] object-contain mx-auto" id="photo" alt="Selected photo will appear here"
						class="nova-photo-preview-img">
				</div>

				<div id="nova-photo-result" class="hidden ">
					<p class="text-green-900 flex items-center gap-2 text-center pt-4 justify-center"><svg
							xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
							class="size-6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
						Please double check the details</p>
				</div>
			</div>
		</div>

		<!-- Camera Modal -->
		<div id="camera-modal" class="fixed inset-0 z-50 hidden">
			<div class="fixed inset-0 bg-background/80 backdrop-blur-sm"></div>
			<div
				class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg bg-black">
				<div class="flex flex-col space-y-1.5 text-center sm:text-left">
					<h3 class="text-2xl font-semibold leading-none tracking-tight text-white">Take a Photo</h3>
					<p id="status" class="text-sm text-muted-foreground text-white">Please allow camera access when prompted</p>
				</div>

				<div id="camera-container" class="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
					<video id="video" autoplay playsinline class="w-full h-full object-cover"></video>
					<canvas id="canvas"></canvas>
				</div>

				<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
					<button id="close-camera" class="nova-photo-remove mt-2 sm:mt-0">
						Cancel
					</button>
					<button id="take-photo" class="nova-photo-upload-button" disabled>
						Take Photo
					</button>
				</div>
			</div>
		</div>
		<style>
			.nova-signup.loading {
				position: relative;
			}

			.nova-signup.loading::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				display: block;
				background: rgba(255, 255, 255, 0.49);
				top: 0;
				left: 0;
			}

			.nova-photo-upload-container {
				border: 2px dashed rgba(0, 0, 0, .35);
				margin-bottom: 40px;
				border-radius: 4px;
			}
		</style>
		<?php
		return ob_get_clean();
	}
}