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

	public function delete_bot() {
		$this->delete_bot_messages( '#novaorder' );
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

		$body = [ 
			'text' => $message,
			'channel' => $channel,
		];

		if ( ! empty( $attachments ) ) {
			$body['attachments'] = $attachments;
		}

		$response = wp_remote_post( 'https://slack.com/api/chat.postMessage', [ 
			'headers' => [ 
				'Content-Type' => 'application/json',
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
		error_log( 'Slack send_message response: ' . print_r( $response_body, true ) );

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
	 * @param array  $attachments Optional. Message attachments
	 * @return bool|\WP_Error True on success, WP_Error on failure
	 */
	public function send_thread_reply( $message, $thread_ts, $channel = null, $attachments = [] ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		if ( empty( $channel ) ) {
			$channel = $this->slack_channel;
		}

		if ( empty( $thread_ts ) ) {
			return new \WP_Error( 'slack_error', 'Thread timestamp is required' );
		}

		$body = [ 
			'text' => $message,
			'channel' => $channel,
			'thread_ts' => $thread_ts,
		];

		if ( ! empty( $attachments ) ) {
			$body['attachments'] = $attachments;
		}

		$response = wp_remote_post( 'https://slack.com/api/chat.postMessage', [ 
			'headers' => [ 
				'Content-Type' => 'application/json',
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
		error_log( 'Slack send_thread_reply response: ' . print_r( $response_body, true ) );

		if ( isset( $response_body['ok'] ) && $response_body['ok'] ) {
			return true;
		}

		return new \WP_Error( 'slack_error', 'Slack API error: ' . ( $response_body['error'] ?? 'Unknown error' ) );
	}

	/**
	 * Delete all bot messages from a channel
	 *
	 * @param string $channel Channel ID to clean (e.g., 'C123456')
	 * @param int    $days_ago Optional. Delete messages older than X days. Default 0 (all messages)
	 * @return bool|\WP_Error True on success, WP_Error on failure
	 */
	public function delete_bot_messages( $channel = null, $days_ago = 0 ) {
		if ( empty( $this->bot_token ) ) {
			return new \WP_Error( 'slack_error', 'Slack bot token not configured' );
		}

		if ( empty( $channel ) ) {
			$channel = $this->slack_channel;
		}

		$oldest = $days_ago > 0 ? time() - ( $days_ago * 86400 ) : 0;
		$cursor = null;
		$deleted_count = 0;
		$rate_limit_remaining = 50; // Initial assumption
		$next_reset = time();

		do {
			// Check rate limits and delay if needed
			if ( $rate_limit_remaining < 5 ) {
				$wait_time = max( 0, $next_reset - time() + 1 );
				if ( $wait_time > 0 ) {
					sleep( $wait_time );
				}
			}

			$params = [ 
				'channel' => $channel,
				'limit' => 100
			];

			if ( $oldest > 0 ) {
				$params['oldest'] = $oldest;
			}

			if ( $cursor ) {
				$params['cursor'] = $cursor;
			}

			$response = wp_remote_get( 'https://slack.com/api/conversations.history?' . http_build_query( $params ), [ 
				'headers' => [ 
					'Authorization' => 'Bearer ' . $this->bot_token
				],
				'timeout' => 30
			] );

			if ( is_wp_error( $response ) ) {
				return $response;
			}

			$response_code = wp_remote_retrieve_response_code( $response );
			$headers = wp_remote_retrieve_headers( $response );

			// Update rate limit info
			$rate_limit_remaining = isset( $headers['x-rate-limit-remaining'] ) ? (int) $headers['x-rate-limit-remaining'] : 49;
			$next_reset = isset( $headers['x-rate-limit-reset'] ) ? (int) $headers['x-rate-limit-reset'] : ( time() + 60 );

			if ( $response_code === 429 ) { // Rate limited
				$retry_after = isset( $headers['retry-after'] ) ? (int) $headers['retry-after'] : 60;
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

			if ( ! $body['ok'] ) {
				return new \WP_Error( 'slack_error', 'Slack API error: ' . ( $body['error'] ?? 'Unknown error' ) );
			}

			// Process messages
			foreach ( $body['messages'] as $message ) {
				if ( isset( $message['bot_id'] ) ) {
					// Add delay between deletions
					if ( $deleted_count > 0 ) {
						usleep( 1200000 ); // 1.2 second delay between deletions
					}

					$delete_response = wp_remote_post( 'https://slack.com/api/chat.delete', [ 
						'headers' => [ 
							'Content-Type' => 'application/json',
							'Authorization' => 'Bearer ' . $this->bot_token
						],
						'body' => wp_json_encode( [ 
							'channel' => $channel,
							'ts' => $message['ts']
						] ),
						'timeout' => 30
					] );

					if ( ! is_wp_error( $delete_response ) ) {
						$delete_body = json_decode( wp_remote_retrieve_body( $delete_response ), true );
						if ( $delete_body['ok'] ) {
							$deleted_count++;
						}
					}
				}
			}

			$cursor = $body['response_metadata']['next_cursor'] ?? null;

		} while ( $cursor );

		error_log( "Deleted {$deleted_count} bot messages from channel" );
		return true;
	}
}