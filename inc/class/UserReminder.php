<?php
namespace NOVA_B2B;

class UserReminder {
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
		// Register cron schedule
		add_filter( 'cron_schedules', array( $this, 'register_cron_schedules' ) );

		// Setup cron job
		add_action( 'wp', array( $this, 'setup_notification_cron' ) );

		// Add the cron job action
		add_action( 'check_temporary_users_notifications', array( $this, 'process_temporary_users_notifications' ) );

		$this->register_user_registration_metabox();

	}

	/**
	 * Register a custom cron schedule for temporary users notification
	 */
	public function register_cron_schedules( $schedules ) {
		$schedules['daily'] = array(
			'interval' => 86400, // 24 hours in seconds
			'display' => __( 'Once Daily' )
		);
		return $schedules;
	}

	/**
	 * Schedule the cron job if it's not already scheduled
	 */
	public function setup_notification_cron() {
		if ( ! wp_next_scheduled( 'check_temporary_users_notifications' ) ) {
			wp_schedule_event( time(), 'daily', 'check_temporary_users_notifications' );
		}
	}

	/**
	 * Main function to check temporary users and send notifications
	 */
	public function process_temporary_users_notifications() {
		// Get all users with 'temporary' role
		$temporary_users = get_users( array(
			'role' => 'temporary',
		) );

		// Current date for comparison
		$current_date = current_time( 'timestamp' );

		foreach ( $temporary_users as $user ) {
			// Get user registration date
			$registration_date = strtotime( $user->user_registered );

			// Calculate days since registration
			$days_since_registration = floor( ( $current_date - $registration_date ) / ( 60 * 60 * 24 ) );


			// Get the last reminder date if exists
			$days_since_last_reminder = get_user_meta( $user->ID, 'email_remider_sent', true );

			if ( ! $days_since_last_reminder ) {
				update_user_meta( $user->ID, 'email_remider_sent', $days_since_registration );
			}

			// If more than 30 days since registration, skip this user
			if ( $days_since_registration > 30 ) {
				continue;
			}

			// Determine if we should send an email based on the schedule
			$should_send_email = false;

			if ( $days_since_registration == 1 ) {
				// First notification after 1 day
				$should_send_email = true;
			} elseif ( $days_since_registration >= 7 && $days_since_registration % 7 == 0 ) {
				// Weekly notifications (on day 7, 14, 21, 28)
				$should_send_email = true;
			}

			// If we should send an email and either no previous reminder or reminder was on a different day
			if ( $should_send_email && $days_since_registration != $days_since_last_reminder ) {

				$this->send_notification_email( $user );

				// Update the user meta with current date
				update_user_meta( $user->ID, 'email_remider_sent', $days_since_registration );

				// Log this action (optional)
				error_log( sprintf( 'Sent notification email to temporary user %s (ID: %d) on day %d after registration',
					$user->user_email,
					$user->ID,
					$days_since_registration
				) );
			}
		}
	}

	/**
	 * Placeholder for the email notification function
	 * This should be replaced with your actual implementation
	 */
	private function send_notification_email( $user ) {
		$role_instance = \NOVA_B2B\Roles::get_instance();
		if ( $role_instance ) {
			$role_instance->send_user_activate_email( $user->ID );
		}
	}

	/**
	 * Clean up cron job
	 */
	public function cleanup_notification_cron() {
		$timestamp = wp_next_scheduled( 'check_temporary_users_notifications' );
		if ( $timestamp ) {
			wp_unschedule_event( $timestamp, 'check_temporary_users_notifications' );
		}
	}

	////////////////////////////////////////////////////////////

	/**
	 * Register the metabox for editing user registration date
	 */
	public function register_user_registration_metabox() {
		add_action( 'add_meta_boxes', [ $this, 'add_user_registration_metabox' ] );
		add_action( 'edit_user_profile', [ $this, 'display_registration_date_field' ] );
		add_action( 'show_user_profile', [ $this, 'display_registration_date_field' ] );
		add_action( 'personal_options_update', [ $this, 'save_registration_date' ] );
		add_action( 'edit_user_profile_update', [ $this, 'save_registration_date' ] );
	}

	/**
	 * Add the metabox to user edit screen
	 */
	public function add_user_registration_metabox() {
		add_meta_box(
			'user_registration_date',
			__( 'Registration Date', 'nova-b2b' ),
			[ $this, 'render_registration_date_metabox' ],
			'user-edit',
			'normal',
			'high'
		);
	}

	/**
	 * Display registration date field on user profile pages
	 *
	 * @param WP_User $user User object
	 */
	public function display_registration_date_field( $user ) {
		// Only show this field to users who can edit other users
		if ( ! current_user_can( 'edit_users' ) ) {
			return;
		}

		$registration_date = $user->user_registered;

		// Format date for display in local timezone
		$date_format = get_option( 'date_format' );
		$time_format = get_option( 'time_format' );
		$formatted_date = date_i18n( "$date_format $time_format", strtotime( $registration_date ) );

		// Format date for input field (Y-m-d H:i:s)
		$input_date = date( 'Y-m-d\TH:i:s', strtotime( $registration_date ) );
		$last_reminder_sent = get_user_meta( $user->ID, 'email_remider_sent', true );


		if ( ! $last_reminder_sent || $last_reminder_sent < 0 ) {
			$last_reminder_sent = 0;
		}

		// registration_date + $last_reminder_sent days
		$last_reminder_sent_date = date( 'F j, Y', strtotime( $registration_date . ' + ' . $last_reminder_sent . ' days' ) );

		?>
		<h3><?php _e( 'Registration Date', 'nova-b2b' ); ?></h3>
		<table class="form-table">
			<tr>
				<th><label for="user_registration_date"><?php _e( 'Registration Date', 'nova-b2b' ); ?></label></th>
				<td>
					<input type="datetime-local" name="user_registration_date" id="user_registration_date"
						value="<?php echo esc_attr( $input_date ); ?>" class="regular-text" />
					<p class="description">
						<?php printf( __( 'Current registration date: %s', 'nova-b2b' ), $formatted_date ); ?>
					</p>
					<?php wp_nonce_field( 'update_registration_date_' . $user->ID, 'registration_date_nonce' ); ?>
				</td>
			</tr>
			<tr>
				<th><label for="user_reminder_sent"><?php _e( 'Last Reminder Sent', 'nova-b2b' ); ?></label></th>
				<td>
					<input type="text" name="user_reminder_sent" id="user_reminder_sent"
						value="<?php echo esc_attr( $last_reminder_sent ); ?>" class="regular-text" readonly />
					<?php if ( $last_reminder_sent && $last_reminder_sent > 0 ) : ?>
						<p class="description">
							<?php printf( __( 'Last reminder sent date: %s', 'nova-b2b' ), $last_reminder_sent_date ); ?>
						</p>
					<?php endif; ?>
			</tr>
		</table>
		<?php
	}

	/**
	 * Render the metabox content
	 *
	 * @param WP_User $user User object
	 */
	public function render_registration_date_metabox( $user ) {
		$this->display_registration_date_field( $user );
	}

	/**
	 * Save the registration date
	 *
	 * @param int $user_id User ID
	 * @return bool Whether the update was successful
	 */
	public function save_registration_date( $user_id ) {
		// Check if current user can edit other users
		if ( ! current_user_can( 'edit_users' ) ) {
			return false;
		}

		// Verify nonce
		if ( ! isset( $_POST['registration_date_nonce'] ) ||
			! wp_verify_nonce( $_POST['registration_date_nonce'], 'update_registration_date_' . $user_id ) ) {
			return false;
		}

		// Check if registration date is set
		if ( ! isset( $_POST['user_registration_date'] ) ) {
			return false;
		}

		// Sanitize and validate the date
		$new_date = sanitize_text_field( $_POST['user_registration_date'] );

		// Validate date format
		if ( ! preg_match( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/', $new_date ) ) {
			// Try to fix the format if it's missing seconds
			if ( preg_match( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $new_date ) ) {
				$new_date .= ':00';
			} else {
				return false;
			}
		}

		// Convert to MySQL datetime format (Y-m-d H:i:s)
		$new_date = date( 'Y-m-d H:i:s', strtotime( $new_date ) );

		// Update the registration date directly in the database
		global $wpdb;
		$result = $wpdb->update(
			$wpdb->users,
			[ 'user_registered' => $new_date ],
			[ 'ID' => $user_id ],
			[ '%s' ],
			[ '%d' ]
		);

		if ( $result ) {
			// Clear user cache after update
			clean_user_cache( $user_id );
		}

		return (bool) $result;
	}
}