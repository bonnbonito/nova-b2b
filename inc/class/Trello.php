<?php

namespace NOVA_B2B;

use WP_Error;
use WP_REST_Response;
use WP_REST_Request;

class Trello {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Trello API Key
	 *
	 * @var string
	 */
	private $api_key;

	/**
	 * Trello API Token
	 *
	 * @var string
	 */
	private $api_token;

	/**
	 * Trello API Base URL
	 *
	 * @var string
	 */
	public $api_url = 'https://api.trello.com/1';

	/**
	 * Trello Default List ID
	 *
	 * @var string
	 */
	public $default_list_id;

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
	 * Needs debugging
	 */
	private $debugging;

	/**
	 * Class Constructor.
	 */
	public function __construct() {
		$this->api_key = get_field( 'trello_api_key', 'option' );
		$this->api_token = get_field( 'trello_api_token', 'option' );
		$this->default_list_id = get_field( 'trello_default_list_id', 'option' );
		$this->debugging = true;

		if ( $this->debugging ) {
			error_log( 'Trello Credentials Check: ' . print_r( array(
				'api_key_set' => ! empty( $this->api_key ),
				'api_token_set' => ! empty( $this->api_token ),
				'default_list_id_set' => ! empty( $this->default_list_id )
			), true ) );
		}

		//add_action( 'wp', array( $this, 'create_sample_card' ) );

		// Register REST route for webhook
		add_action( 'rest_api_init', array( $this, 'register_webhook_endpoint' ) );
	}

	public function create_sample_card() {
		if ( $this->debugging ) {
			error_log( 'Creating sample card' );
		}
		$name = 'Test Card';
		$desc = 'This is a test card';
		$this->create_card( $this->default_list_id, $name, $desc );
	}

	/**
	 * Set API credentials
	 *
	 * @param string $api_key Trello API Key.
	 * @param string $api_token Trello API Token.
	 * @return bool
	 */
	public function set_credentials( $api_key, $api_token ) {
		update_field( 'trello_api_key', $api_key, 'option' );
		update_field( 'trello_api_token', $api_token, 'option' );
		$this->api_key = $api_key;
		$this->api_token = $api_token;
		return true;
	}

	/**
	 * Create a new card with optional file attachment
	 *
	 * @param string $list_id List ID.
	 * @param string $name Card name.
	 * @param string $desc Card description.
	 * @param array  $options Additional options.
	 * @param array  $attachments Array of attachments [['path' => '/path/to/file', 'name' => 'filename.ext']].
	 * @return array|WP_Error Card object containing id, name, desc, url, etc. or WP_Error on failure
	 */
	public function create_card( $list_id, $name, $desc = '', $options = [], $attachments = [], $order_id = null ) {
		if ( $this->debugging ) {
			error_log( 'Create card called with attachments: ' . print_r( $attachments, true ) );
		}
		$endpoint = "/cards";
		$params = array_merge( [ 
			'idList' => $list_id,
			'name' => $name,
			'desc' => $desc,
		], $options );

		$response = $this->make_request( 'POST', $endpoint, $params );

		if ( $this->debugging ) {
			error_log( 'Card created: ' . print_r( $response, true ) );
		}

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Attach files if any
		if ( ! empty( $attachments ) && is_array( $attachments ) ) {
			foreach ( $attachments as $attachment ) {
				if ( ! is_array( $attachment ) && filter_var( $attachment, FILTER_VALIDATE_URL ) ) {
					// Handle direct URL strings
					$attach_result = $this->attach_file_to_card( $response['id'], $attachment );
					if ( is_wp_error( $attach_result ) ) {
						error_log( 'Failed to attach URL to card: ' . $attach_result->get_error_message() );
					}
					continue;
				}

				if ( ! is_array( $attachment ) || ( ! isset( $attachment['path'] ) && ! isset( $attachment['url'] ) ) ) {
					error_log( 'Invalid attachment format: ' . print_r( $attachment, true ) );
					continue;
				}

				$file_path = isset( $attachment['url'] ) ? $attachment['url'] : $attachment['path'];
				$file_name = isset( $attachment['name'] ) ? $attachment['name'] : '';

				$attach_result = $this->attach_file_to_card( $response['id'], $file_path, $file_name );
				if ( is_wp_error( $attach_result ) ) {
					error_log( 'Failed to attach file to card: ' . $attach_result->get_error_message() );
				}
			}
		}

		if ( $order_id ) {
			//save the card id to meta
			update_post_meta( $order_id, 'trello_card_id', $response['id'] );
		}

		$webhook_url = get_field( 'trello_webhook_url', 'option' );

		$callback_url = $webhook_url ? $webhook_url : get_rest_url( null, NOVA_REST_ROUTE_PREFIX . '/trello-webhook' );

		// Automatically create webhook for this card
		$webhook = $this->create_webhook(
			$callback_url,
			$response['id'],
			'Auto-created webhook for card: ' . $name
		);

		if ( is_wp_error( $webhook ) ) {
			error_log( 'Failed to create webhook for card: ' . $webhook->get_error_message() );
		}

		if ( $webhook ) {
			//save the webhook id to meta
			update_post_meta( $order_id, 'trello_webhook_id', $webhook['id'] );
		}

		return $response;
	}

	private function download_file_from_url( $url ) {
		// Convert Dropbox shared link to direct download
		if ( strpos( $url, 'dropbox.com' ) !== false ) {
			// If URL doesn't end with ?dl=1, add it
			if ( strpos( $url, '?dl=1' ) === false ) {
				$url = str_replace( '?dl=0', '', $url ); // Remove dl=0 if present
				$url = rtrim( $url, '/' );
				$url .= '?dl=1';
			}
		}

		$tmp_file = download_url( $url );
		if ( is_wp_error( $tmp_file ) ) {
			error_log( 'Failed to download file: ' . $tmp_file->get_error_message() );
			return $tmp_file;
		}
		return $tmp_file;
	}

	private function get_file_extension_from_url( $url ) {
		$path = parse_url( $url, PHP_URL_PATH );
		$ext = pathinfo( $path, PATHINFO_EXTENSION );

		// If no extension or unknown extension, determine based on URL pattern
		if ( empty( $ext ) || ! in_array( strtolower( $ext ), [ 'pdf', 'zip' ] ) ) {
			return strpos( $url, '.pdf' ) !== false ? 'pdf' : 'zip';
		}

		return strtolower( $ext );
	}

	/**
	 * Attach a file to a card
	 *
	 * @param string $card_id Card ID.
	 * @param string $file_path Full path to the file.
	 * @param string $file_name Optional file name to use (defaults to basename of file_path).
	 * @return array|WP_Error
	 */
	public function attach_file_to_card( $card_id, $file_path, $file_name = '' ) {
		if ( $this->debugging ) {
			error_log( 'Attach file to card called with file_path: ' . $file_path );
		}

		// Handle URL attachments
		if ( filter_var( $file_path, FILTER_VALIDATE_URL ) ) {
			$ext = $this->get_file_extension_from_url( $file_path );
			$tmp_file = $this->download_file_from_url( $file_path );
			if ( is_wp_error( $tmp_file ) ) {
				return $tmp_file;
			}
			$file_path = $tmp_file;
			$file_name = $file_name ?: basename( parse_url( $file_path, PHP_URL_PATH ) );

			// Add extension if filename doesn't have one
			if ( ! pathinfo( $file_name, PATHINFO_EXTENSION ) ) {
				$file_name .= '.' . $ext;
			}
		}

		if ( ! file_exists( $file_path ) ) {
			return new WP_Error( 'file_not_found', 'File not found: ' . $file_path );
		}

		// Get file info
		$mime_type = mime_content_type( $file_path );
		$file_content = file_get_contents( $file_path );

		if ( $file_content === false ) {
			return new WP_Error( 'file_read_error', 'Could not read file: ' . $file_path );
		}

		// Prepare file data
		$boundary = wp_generate_password( 24 );
		$payload = '';

		// Add file metadata
		$payload .= "--" . $boundary . "\r\n";
		$payload .= 'Content-Disposition: form-data; name="file"; filename="' . $file_name . '"' . "\r\n";
		$payload .= 'Content-Type: ' . $mime_type . "\r\n\r\n";
		$payload .= $file_content . "\r\n";
		$payload .= "--" . $boundary . "--\r\n";

		// Make request
		$endpoint = "/cards/" . $card_id . "/attachments";
		$args = [ 
			'method' => 'POST',
			'headers' => [ 
				'Content-Type' => 'multipart/form-data; boundary=' . $boundary,
			],
			'body' => $payload,
		];

		return $this->make_request( 'POST', $endpoint, [], $args );
	}

	/**
	 * Create a webhook
	 *
	 * @param string $callback_url Webhook callback URL.
	 * @param string $id_model ID of the model to watch.
	 * @param string $description Webhook description.
	 * @return array|WP_Error
	 */
	public function create_webhook( $callback_url, $id_model, $description = '' ) {
		$endpoint = "/webhooks";
		$params = [ 
			'callbackURL' => $callback_url,
			'idModel' => $id_model,
			'description' => $description,
		];

		return $this->make_request( 'POST', $endpoint, $params );
	}

	/**
	 * Get list name by ID
	 *
	 * @param string $list_id List ID.
	 * @return string|WP_Error
	 */
	public function get_list_name( $list_id ) {
		$endpoint = "/lists/{$list_id}";
		$response = $this->make_request( 'GET', $endpoint );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return isset( $response['name'] ) ? $response['name'] : '';
	}

	/**
	 * Make an API request to Trello
	 *
	 * @param string $method HTTP method.
	 * @param string $endpoint API endpoint.
	 * @param array  $params Request parameters.
	 * @param array  $extra_args Additional wp_remote_request arguments.
	 * @return array|WP_Error
	 */
	private function make_request( $method, $endpoint, $params = [], $extra_args = [] ) {
		if ( empty( $this->api_key ) || empty( $this->api_token ) ) {
			return new WP_Error( 'trello_api_error', 'API credentials not set' );
		}

		$params = array_merge( $params, [ 
			'key' => $this->api_key,
			'token' => $this->api_token,
		] );

		$url = $this->api_url . $endpoint;

		if ( $method === 'GET' ) {
			$url = add_query_arg( $params, $url );
		}

		$args = array_merge( [ 
			'method' => $method,
			'headers' => [ 
				'Content-Type' => 'application/json',
			],
			'timeout' => 30,
			'sslverify' => true,
		], $extra_args );

		if ( $method !== 'GET' && empty( $extra_args ) ) {
			$args['body'] = json_encode( $params );
		}

		if ( $this->debugging ) {
			// Log the request for debugging
			error_log( 'Trello API Request: ' . print_r( [ 
				'url' => $url,
				'method' => $method,
				'params' => $params,
				'args' => $args
			], true ) );
		}

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			error_log( 'Trello API WP Error: ' . $response->get_error_message() );
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		$body = wp_remote_retrieve_body( $response );

		if ( $this->debugging ) {
			// Log the response for debugging
			error_log( 'Trello API Response: ' . print_r( [ 
				'code' => $response_code,
				'body' => $body
			], true ) );
		}

		if ( $response_code !== 200 ) {
			return new WP_Error(
				'trello_api_error',
				'API request failed with status ' . $response_code,
				[ 
					'status' => $response_code,
					'body' => $body
				]
			);
		}

		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new WP_Error(
				'trello_api_error',
				'Invalid JSON response: ' . json_last_error_msg(),
				[ 
					'body' => $body,
					'json_error' => json_last_error(),
					'json_error_msg' => json_last_error_msg()
				]
			);
		}

		return $data;
	}

	/**
	 * Register the webhook endpoint
	 */
	public function register_webhook_endpoint() {
		register_rest_route( NOVA_REST_ROUTE_PREFIX, '/trello-webhook', [ 
			[ 
				'methods' => 'HEAD',
				'callback' => [ $this, 'handle_webhook_verification' ],
				'permission_callback' => '__return_true',
			],
			[ 
				'methods' => 'POST',
				'callback' => [ $this, 'handle_webhook' ],
				'permission_callback' => [ $this, 'verify_webhook' ],
			]
		] );
	}

	/**
	 * Handle webhook verification request from Trello
	 *
	 * @return WP_REST_Response
	 */
	public function handle_webhook_verification() {
		return new WP_REST_Response( null, 200 );
	}

	/**
	 * Verify webhook request is from Trello
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return bool
	 */
	public function verify_webhook( $request ) {
		// Get Trello's signature
		$signature = $request->get_header( 'X-Trello-Webhook' );
		if ( empty( $signature ) ) {
			return false;
		}

		// Get request body
		$content = $request->get_body();
		$base_url = $request->get_header( 'X-Trello-Webhook-URL' );

		// Calculate expected signature
		$expected = hash_hmac( 'sha1', $content . $base_url, $this->api_key );

		// Compare signatures
		return hash_equals( $signature, $expected );
	}

	/**
	 * Handle incoming webhook from Trello
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function handle_webhook( $request ) {
		$payload = $request->get_json_params();

		// Get action details
		$action = isset( $payload['action'] ) ? $payload['action'] : null;
		$model = isset( $payload['model'] ) ? $payload['model'] : null;

		if ( ! $action || ! $model ) {
			return new WP_REST_Response( [ 'error' => 'Invalid payload' ], 400 );
		}

		// Log action for debugging
		if ( $this->debugging ) {
			error_log( 'Trello Webhook Action: ' . print_r( $action, true ) );
		}

		// Handle different action types
		switch ( $action['type'] ) {
			case 'createCard':
				// Handle card creation
				$this->handle_card_created( $action );
				break;

			case 'updateCard':
				// Handle card updates
				$this->handle_card_updated( $action );
				break;

			case 'deleteCard':
				// Handle card deletion
				$this->handle_card_deleted( $action );
				break;

			// Add more cases as needed
		}

		return new WP_REST_Response( [ 'status' => 'success' ], 200 );
	}

	/**
	 * Handle card creation action
	 *
	 * @param array $action Action data from webhook.
	 */
	private function handle_card_created( $action ) {
		// Implement card creation handling
		$card_data = $action['data']['card'];
		if ( $this->debugging ) {
			error_log( 'Card Created: ' . print_r( $card_data, true ) );
		}
		// Add your custom logic here
	}

	/**
	 * Handle card update action
	 *
	 * @param array $action Action data from webhook.
	 */
	private function handle_card_updated( $action ) {
		$card_data = $action['data']['card'];
		$old_data = $action['data']['old'];

		// Check if card was moved to a different list
		if ( isset( $old_data['idList'] ) ) {
			$new_list_id = $card_data['idList'];
			$old_list_id = $old_data['idList'];

			error_log( 'Card Moved: ' . print_r( [ 
				'card_id' => $card_data['id'],
				'card_name' => $card_data['name'],
				'from_list' => $old_list_id,
				'to_list' => $new_list_id
			], true ) );

			// You can add custom logic here for list moves
			// For example:
			// - Trigger notifications
			// - Update related data
			// - Sync with other systems
			do_action( 'trello_card_moved', $card_data, $old_list_id, $new_list_id );
		}
		// Handle other types of updates
		else {
			error_log( 'Card Updated: ' . print_r( [ 
				'card' => $card_data,
				'changed_fields' => $old_data
			], true ) );

			do_action( 'trello_card_updated', $card_data, $old_data );
		}
	}

	/**
	 * Handle card deletion action
	 *
	 * @param array $action Action data from webhook.
	 */
	private function handle_card_deleted( $action ) {
		// Implement card deletion handling
		$card_data = $action['data']['card'];
		if ( $this->debugging ) {
			error_log( 'Card Deleted: ' . print_r( $card_data, true ) );
		}
		// Add your custom logic here
	}
}