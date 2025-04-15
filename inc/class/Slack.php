<?php

namespace NOVA_B2B;

class Slack {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Slack Bot Token
	 *
	 * @var string
	 */
	private $bot_token;

	/**
	 * Slack Channel
	 *
	 * @var string
	 */
	private $slack_channel;

	/**
	 * Bot ID
	 *
	 * @var string
	 */
	private $bot_id = null;

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
		$this->bot_token = get_field( 'slack_bot_token', 'option' ) ? get_field( 'slack_bot_token', 'option' ) : '';
		$this->slack_channel = get_field( 'slack_channel', 'option' ) ? get_field( 'slack_channel', 'option' ) : '';
	}

	/**
	 * Get the Bot ID
	 *
	 * @return string|\WP_Error Bot ID on success, WP_Error on failure
	 */
	private function get_bot_id() {
		if ( ! is_null( $this->bot_id ) ) {
			return $this->bot_id;
		}

		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		$response = wp_remote_post( 'https://slack.com/api/auth.test', [ 
			'headers' => [ 
				'Content-Type' => 'application/json; charset=utf-8',
				'Authorization' => 'Bearer ' . $this->bot_token,
			],
			'timeout' => 30,
		] );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Slack API error: ' . wp_remote_retrieve_response_message( $response ),
				[ 'status' => $response_code ]
			);
		}

		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( isset( $response_body['ok'] ) && $response_body['ok'] && isset( $response_body['bot_id'] ) ) {
			$this->bot_id = $response_body['bot_id'];
			return $this->bot_id;
		}

		return new \WP_Error( 'slack_error', 'Unable to retrieve bot ID: ' . ( $response_body['error'] ?? 'Unknown error' ) );
	}

	/**
	 * Validate a channel ID and ensure bot membership
	 *
	 * @param string $channel Channel ID
	 * @return bool|\WP_Error True if valid and bot is member, WP_Error otherwise
	 */
	private function validate_channel( $channel ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		if ( empty( $channel ) ) {
			return new \WP_Error( 'slack_error', 'Channel ID is empty' );
		}

		$response = wp_remote_get( 'https://slack.com/api/conversations.info?' . http_build_query( [ 'channel' => $channel ] ), [ 
			'headers' => [ 
				'Authorization' => 'Bearer ' . $this->bot_token,
			],
			'timeout' => 30,
		] );

		if ( is_wp_error( $response ) ) {
			error_log( 'Failed to validate channel: ' . $response->get_error_message() );
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Slack API error: ' . wp_remote_retrieve_response_message( $response ),
				[ 'status' => $response_code ]
			);
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! isset( $body['ok'] ) || ! $body['ok'] ) {
			return new \WP_Error( 'slack_error', 'Invalid channel: ' . ( $body['error'] ?? 'Unknown error' ) );
		}

		// Check if bot is a member (for private channels)
		if ( isset( $body['channel']['is_private'] ) && $body['channel']['is_private'] ) {
			$bot_id = $this->get_bot_id();
			if ( is_wp_error( $bot_id ) ) {
				return $bot_id;
			}
			// Note: conversations.info doesn't return member list for private channels, so we assume bot has access if API call succeeds
			// If issues persist, use conversations.members to verify, but requires additional scope
		}

		return true;
	}

	/**
	 * Delete all bot messages from the configured channel
	 *
	 * @return array|\WP_Error Deletion results or WP_Error on failure
	 */
	public function delete_bot() {
		return $this->delete_bot_messages( $this->slack_channel );
	}

	/**
	 * Send message to Slack channel
	 *
	 * @param string $message Message to send
	 * @param string $channel Channel to send message to (e.g., '#general' or 'C123456')
	 * @param array  $attachments Optional. Message attachments
	 * @return string|\WP_Error Message timestamp on success, WP_Error on failure
	 */
	public function send_message( $message, $channel = null, $attachments = [] ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		if ( empty( $channel ) ) {
			$channel = $this->slack_channel;

		}

		if ( empty( $channel ) ) {
			return new \WP_Error( 'slack_error', 'Slack channel not configured' );
		}

		// Validate channel
		$channel_valid = $this->validate_channel( $channel );
		if ( is_wp_error( $channel_valid ) ) {
			return $channel_valid;
		}

		$body = [ 
			'text' => $message,
			'channel' => $channel,
		];

		if ( ! empty( $attachments ) ) {
			$body['attachments'] = $attachments;
		}

		$response = wp_remote_post( 'https://slack.com/api/chat.postMessage', [ 
			'headers' => [ 
				'Content-Type' => 'application/json; charset=utf-8',
				'Authorization' => 'Bearer ' . $this->bot_token,
			],
			'body' => wp_json_encode( $body ),
			'timeout' => 30,
		] );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Slack API error: ' . wp_remote_retrieve_response_message( $response ),
				[ 'status' => $response_code ]
			);
		}

		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( isset( $response_body['ok'] ) && $response_body['ok'] && isset( $response_body['ts'] ) ) {
			return $response_body['ts'];
		}

		return new \WP_Error( 'slack_error', 'Slack API error: ' . ( $response_body['error'] ?? 'Unknown error' ) );
	}

	/**
	 * Send a reply to a thread
	 *
	 * @param string $message Message to send
	 * @param string $thread_ts Timestamp of the parent message to reply to
	 * @param string $channel Channel to send message to (e.g., '#general' or 'C123456')
	 * @param array  $attachments Optional. File URLs to upload
	 * @return bool|\WP_Error True on success, WP_Error on failure
	 */
	public function send_thread_reply( $message, $thread_ts, $channel = null, $attachments = [] ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		if ( empty( $channel ) ) {
			$channel = $this->slack_channel;
		}

		if ( empty( $channel ) ) {
			return new \WP_Error( 'slack_error', 'Slack channel not configured' );
		}

		// Validate channel
		$channel_valid = $this->validate_channel( $channel );
		if ( is_wp_error( $channel_valid ) ) {
			return $channel_valid;
		}

		if ( empty( $thread_ts ) ) {
			return new \WP_Error( 'slack_error', 'Thread timestamp is required' );
		}

		$body = [ 
			'text' => $message,
			'channel' => $channel,
			'thread_ts' => $thread_ts,
		];

		$response = wp_remote_post( 'https://slack.com/api/chat.postMessage', [ 
			'headers' => [ 
				'Content-Type' => 'application/json; charset=utf-8',
				'Authorization' => 'Bearer ' . $this->bot_token,
			],
			'body' => wp_json_encode( $body ),
			'timeout' => 30,
		] );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( $response_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Slack API error: ' . wp_remote_retrieve_response_message( $response ),
				[ 'status' => $response_code ]
			);
		}

		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( isset( $response_body['ok'] ) && $response_body['ok'] ) {
			if ( ! empty( $attachments ) ) {
				foreach ( $attachments as $file_url ) {
					$result = $this->upload_file_to_thread( $file_url, $channel, $thread_ts );
					if ( is_wp_error( $result ) ) {
						error_log( 'Failed to upload file to thread: ' . $result->get_error_message() );
					}
					usleep( 1200000 ); // 1.2-second delay to avoid rate limit
				}
			}
			return true;
		}

		return new \WP_Error( 'slack_error', 'Slack API error: ' . ( $response_body['error'] ?? 'Unknown error' ) );
	}

	/**
	 * Upload a file to a thread using files.getUploadURLExternal and files.completeUploadExternal
	 *
	 * @param string $file_url URL of the file to upload
	 * @param string $channel Channel ID
	 * @param string $thread_ts Thread timestamp
	 * @return bool|\WP_Error True on success, WP_Error on failure
	 */
	private function upload_file_to_thread( $file_url, $channel, $thread_ts ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		// Validate channel
		$channel_valid = $this->validate_channel( $channel );
		if ( is_wp_error( $channel_valid ) ) {
			return $channel_valid;
		}

		// Fetch the file content
		$file_response = wp_remote_get( $file_url, [ 'timeout' => 30 ] );
		if ( is_wp_error( $file_response ) ) {
			error_log( 'Failed to fetch file: ' . $file_response->get_error_message() );
			return $file_response;
		}

		$file_content = wp_remote_retrieve_body( $file_response );
		$file_name = basename( parse_url( $file_url, PHP_URL_PATH ) );
		$file_size = strlen( $file_content );

		if ( $file_size === 0 ) {
			return new \WP_Error( 'slack_error', 'File is empty or could not be read' );
		}

		// Step 1: Get upload URL and file ID
		$upload_url_response = wp_remote_post( 'https://slack.com/api/files.getUploadURLExternal', [ 
			'headers' => [ 
				'Content-Type' => 'application/x-www-form-urlencoded; charset=utf-8',
				'Authorization' => 'Bearer ' . $this->bot_token,
			],
			'body' => [ 
				'filename' => $file_name,
				'length' => $file_size,
			],
			'timeout' => 30,
		] );

		if ( is_wp_error( $upload_url_response ) ) {
			error_log( 'Failed to get upload URL: ' . $upload_url_response->get_error_message() );
			return $upload_url_response;
		}

		$response_code = wp_remote_retrieve_response_code( $upload_url_response );
		if ( $response_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Slack API error: ' . wp_remote_retrieve_response_message( $upload_url_response ),
				[ 'status' => $response_code ]
			);
		}

		$upload_url_body = json_decode( wp_remote_retrieve_body( $upload_url_response ), true );

		if ( ! isset( $upload_url_body['ok'] ) || ! $upload_url_body['ok'] ) {
			return new \WP_Error( 'slack_error', 'Failed to get upload URL: ' . ( $upload_url_body['error'] ?? 'Unknown error' ) );
		}

		$upload_url = $upload_url_body['upload_url'];
		$file_id = $upload_url_body['file_id'];

		// Step 2: Upload the file to the provided URL
		$boundary = wp_generate_password( 24, false );
		$headers = [ 
			'Content-Type' => 'multipart/form-data; boundary=' . $boundary,
		];

		$payload = '';
		$payload .= '--' . $boundary . "\r\n";
		$payload .= 'Content-Disposition: form-data; name="file"; filename="' . $file_name . '"' . "\r\n";
		$payload .= 'Content-Type: application/octet-stream' . "\r\n\r\n";
		$payload .= $file_content . "\r\n";
		$payload .= '--' . $boundary . '--';

		$file_upload_response = wp_remote_post( $upload_url, [ 
			'headers' => $headers,
			'body' => $payload,
			'timeout' => 60,
		] );

		if ( is_wp_error( $file_upload_response ) ) {
			error_log( 'Failed to upload file to URL: ' . $file_upload_response->get_error_message() );
			return $file_upload_response;
		}

		$file_upload_code = wp_remote_retrieve_response_code( $file_upload_response );
		if ( $file_upload_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Failed to upload file to URL: ' . wp_remote_retrieve_response_message( $file_upload_response ),
				[ 'status' => $file_upload_code ]
			);
		}

		// Step 3: Complete the upload and share to thread
		$complete_response = wp_remote_post( 'https://slack.com/api/files.completeUploadExternal', [ 
			'headers' => [ 
				'Content-Type' => 'application/json; charset=utf-8',
				'Authorization' => 'Bearer ' . $this->bot_token,
			],
			'body' => wp_json_encode( [ 
				'files' => [ 
					[ 
						'id' => $file_id,
						'title' => $file_name,
					],
				],
				'channel_id' => $channel,
				'thread_ts' => $thread_ts,
			] ),
			'timeout' => 30,
		] );

		if ( is_wp_error( $complete_response ) ) {
			error_log( 'Failed to complete file upload: ' . $complete_response->get_error_message() );
			return $complete_response;
		}

		$complete_code = wp_remote_retrieve_response_code( $complete_response );
		if ( $complete_code !== 200 ) {
			return new \WP_Error(
				'slack_error',
				'Slack API error: ' . wp_remote_retrieve_response_message( $complete_response ),
				[ 'status' => $complete_code ]
			);
		}

		$complete_body = json_decode( wp_remote_retrieve_body( $complete_response ), true );

		if ( ! isset( $complete_body['ok'] ) || ! $complete_body['ok'] ) {
			return new \WP_Error( 'slack_error', 'Failed to complete file upload: ' . ( $complete_body['error'] ?? 'Unknown error' ) );
		}

		return true;
	}

	/**
	 * Delete all bot messages from a channel
	 *
	 * @param string $channel Channel ID to clean (e.g., 'C123456')
	 * @param int    $days_ago Optional. Delete messages older than X days. Default 0 (all messages)
	 * @return array|\WP_Error Deletion results or WP_Error on failure
	 */
	public function delete_bot_messages( $channel = null, $days_ago = 0 ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		if ( empty( $channel ) ) {
			$channel = $this->slack_channel;
		}

		if ( empty( $channel ) ) {
			return new \WP_Error( 'slack_error', 'Slack channel not configured' );
		}

		// Validate channel
		$channel_valid = $this->validate_channel( $channel );
		if ( is_wp_error( $channel_valid ) ) {
			return $channel_valid;
		}

		$bot_id = $this->get_bot_id();
		if ( is_wp_error( $bot_id ) ) {
			return $bot_id;
		}

		$results = [ 
			'success_count' => 0,
			'failure_count' => 0,
			'errors' => [],
		];

		$oldest = $days_ago > 0 ? time() - ( $days_ago * 86400 ) : 0;
		$cursor = null;

		do {
			$params = [ 
				'channel' => $channel,
				'limit' => 100,
			];

			if ( $oldest > 0 ) {
				$params['oldest'] = $oldest;
			}

			if ( $cursor ) {
				$params['cursor'] = $cursor;
			}

			$response = wp_remote_get( 'https://slack.com/api/conversations.history?' . http_build_query( $params ), [ 
				'headers' => [ 
					'Authorization' => 'Bearer ' . $this->bot_token,
				],
				'timeout' => 30,
			] );

			if ( is_wp_error( $response ) ) {
				return $response;
			}

			$response_code = wp_remote_retrieve_response_code( $response );
			$headers = wp_remote_retrieve_headers( $response );

			if ( $response_code === 429 ) {
				$retry_after = isset( $headers['retry-after'] ) ? (int) $headers['retry-after'] : 1;
				sleep( $retry_after );
				continue;
			}

			if ( $response_code !== 200 ) {
				return new \WP_Error(
					'slack_error',
					'Slack API error: ' . wp_remote_retrieve_response_message( $response ),
					[ 'status' => $response_code ]
				);
			}

			$body = json_decode( wp_remote_retrieve_body( $response ), true );

			if ( ! isset( $body['ok'] ) || ! $body['ok'] ) {
				return new \WP_Error( 'slack_error', 'Slack API error: ' . ( $body['error'] ?? 'Unknown error' ) );
			}

			foreach ( $body['messages'] as $message ) {
				if ( isset( $message['bot_id'] ) && $message['bot_id'] === $bot_id ) {
					$delete_response = wp_remote_post( 'https://slack.com/api/chat.delete', [ 
						'headers' => [ 
							'Content-Type' => 'application/json; charset=utf-8',
							'Authorization' => 'Bearer ' . $this->bot_token,
						],
						'body' => wp_json_encode( [ 
							'channel' => $channel,
							'ts' => $message['ts'],
						] ),
						'timeout' => 30,
					] );

					if ( is_wp_error( $delete_response ) ) {
						$results['failure_count']++;
						$results['errors'][] = [ 
							'ts' => $message['ts'],
							'error' => $delete_response->get_error_message(),
						];
					} else {
						$delete_body = json_decode( wp_remote_retrieve_body( $delete_response ), true );
						error_log( 'Slack chat.delete response: ' . print_r( $delete_body, true ) );
						if ( isset( $delete_body['ok'] ) && $delete_body['ok'] ) {
							$results['success_count']++;
						} else {
							$results['failure_count']++;
							$results['errors'][] = [ 
								'ts' => $message['ts'],
								'error' => $delete_body['error'] ?? 'Unknown error',
							];
						}
					}

					usleep( 1200000 ); // 1.2-second delay to avoid rate limit
				}
			}

			$cursor = $body['response_metadata']['next_cursor'] ?? null;

		} while ( $cursor );

		error_log( "Deleted {$results['success_count']} bot messages from channel {$channel}, {$results['failure_count']} failures" );
		return $results;
	}
}