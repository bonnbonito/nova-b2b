<?php

namespace NOVA_B2B;

class EmailLimit {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Email limit per recipient
	 *
	 * @var int
	 */
	private $email_limit = 6;

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
		// Hook into wp_mail to enforce email limits
		add_filter( 'wp_mail', array( $this, 'limit_emails' ), 1, 1 );

		// Schedule hourly reset
		$this->schedule_reset();
	}

	/**
	 * Enforce email limits for recipients
	 */
	public function limit_emails( $args ) {
		$recipients = $this->get_recipients( $args['to'] );

		foreach ( $recipients as $recipient ) {
			if ( $this->has_exceeded_limit( $recipient ) ) {
				error_log( "Email limit reached for $recipient." );
				$args['to'] = 'bonn.j@hineon.com';
			}

			$this->increment_email_count( $recipient );
		}

		return $args; // Allow the email
	}

	/**
	 * Extract recipients from 'to' field
	 */
	private function get_recipients( $to ) {

		if ( is_array( $to ) ) {
			return $to;
		}

		return array_map( 'trim', explode( ',', $to ) );
	}

	/**
	 * Check if a recipient has exceeded the email limit
	 */
	private function has_exceeded_limit( $recipient ) {
		$transient_key = $this->get_transient_key( $recipient );
		$emails_sent   = get_transient( $transient_key );

		return ( $emails_sent && $emails_sent >= $this->email_limit );
	}

	/**
	 * Increment the email count for a recipient
	 */
	private function increment_email_count( $recipient ) {
		$transient_key = $this->get_transient_key( $recipient );
		$emails_sent   = get_transient( $transient_key );
		$emails_sent   = $emails_sent ? $emails_sent : 0;

		set_transient( $transient_key, $emails_sent + 1, HOUR_IN_SECONDS );
	}

	/**
	 * Generate a unique transient key for a recipient
	 */
	private function get_transient_key( $recipient ) {
		return 'nova_emails_sent_' . md5( $recipient );
	}

	/**
	 * Schedule an hourly reset of email counts
	 */
	private function schedule_reset() {
		if ( ! wp_next_scheduled( 'nova_reset_hourly_email_counts' ) ) {
			wp_schedule_event( time(), 'hourly', 'nova_reset_hourly_email_counts' );
		}

		add_action( 'nova_reset_hourly_email_counts', array( $this, 'reset_email_counts' ) );
	}

	/**
	 * Reset email counts hourly
	 */
	public function reset_email_counts() {
		global $wpdb;
		$wpdb->query( "DELETE FROM $wpdb->options WHERE option_name LIKE '_transient_nova_emails_sent_%'" );
	}
}

// Initialize the EmailLimit class
EmailLimit::get_instance();
