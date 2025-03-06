<?php

namespace NOVA_B2B;

class QuotesArchived {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Cron hook name for archiving quotes
	 *
	 * @var string
	 */
	private const CRON_HOOK = 'nova_archive_old_quotes';

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
		add_action( 'admin_menu', array( $this, 'add_archive_quotes_page' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		add_action( 'wp_ajax_restore_archived_quote', array( $this, 'handle_restore_quote' ) );
		add_action( 'admin_init', array( $this, 'handle_add_quoted_date' ) );

		// Add cron job actions
		add_action( self::CRON_HOOK, array( $this, 'archive_old_quotes' ) );
		add_action( 'init', array( $this, 'schedule_archive_cron' ) );
	}

	/**
	 * Schedule the archive quotes cron job
	 */
	public function schedule_archive_cron(): void {
		if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
			wp_schedule_event( time(), 'daily', self::CRON_HOOK );
		}
	}

	/**
	 * Archive quotes that have been ready for more than 30 days
	 */
	public function archive_old_quotes(): void {
		$args = array(
			'post_type' => 'nova_quote',
			'posts_per_page' => -1,
			'meta_query' => array(
				'relation' => 'AND',
				array(
					'key' => 'quote_status',
					'value' => 'ready',
					'compare' => '=',
				),
				array(
					'key' => 'date_quoted',
					'compare' => 'EXISTS',
				),
			),
		);

		$quotes = get_posts( $args );
		$thirty_days_ago = date( 'Y-m-d H:i:s', strtotime( '-30 days' ) );

		foreach ( $quotes as $quote ) {
			$date_quoted = get_post_meta( $quote->ID, 'date_quoted', true );

			if ( $date_quoted && strtotime( $date_quoted ) <= strtotime( $thirty_days_ago ) ) {
				update_post_meta( $quote->ID, 'quote_status', 'archived' );

				// Log the archiving action
				error_log( sprintf(
					'NOVA B2B: Quote #%d automatically archived after 30 days. Quoted date: %s',
					$quote->ID,
					$date_quoted
				) );
			}
		}
	}

	/**
	 * Clean up cron job on theme deactivation
	 */
	public static function cleanup_cron(): void {
		wp_clear_scheduled_hook( self::CRON_HOOK );
	}

	/**
	 * Handle the Add Quoted Date action
	 */
	public function handle_add_quoted_date() {
		if ( ! isset( $_GET['add_quoted_date'] ) || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		check_admin_referer( 'add_quoted_date' );

		$args = array(
			'post_type' => 'nova_quote',
			'posts_per_page' => -1,
			'meta_query' => array(
				'relation' => 'AND',
				array(
					'key' => 'quote_status',
					'value' => 'ready',
					'compare' => '=',
				),
				array(
					'key' => 'date_quoted',
					'compare' => 'NOT EXISTS',
				),
			),
		);

		$quotes = get_posts( $args );
		$updated = 0;

		foreach ( $quotes as $quote ) {
			$revisions = wp_get_post_revisions( $quote->ID );
			if ( ! empty( $revisions ) ) {
				$last_revision = reset( $revisions );
				update_post_meta( $quote->ID, 'date_quoted', $last_revision->post_date );
				$updated++;
			}
		}

		wp_redirect( add_query_arg( 'quoted_dates_added', $updated, admin_url( 'edit.php?post_type=nova_quote&page=archive-quotes' ) ) );
		exit;
	}

	/**
	 * Add the Archive Quotes submenu page
	 */
	public function add_archive_quotes_page() {
		add_submenu_page(
			'edit.php?post_type=nova_quote',
			'Archive Quotes',
			'Archive Quotes',
			'manage_options',
			'archive-quotes',
			array( $this, 'render_archive_quotes_page' )
		);
	}

	/**
	 * Enqueue admin scripts and styles
	 *
	 * @param string $hook The current admin page.
	 */
	public function enqueue_admin_scripts( $hook ) {
		if ( 'nova_quote_page_archive-quotes' !== $hook ) {
			return;
		}

		$theme = wp_get_theme();
		wp_enqueue_style( 'nova-admin', get_stylesheet_directory_uri() . '/assets/css/admin.css', array(), $theme->Version );

		wp_enqueue_script(
			'admin-archive-quotes',
			get_stylesheet_directory_uri() . '/assets/js/admin-archive-quotes.js',
			array( 'jquery' ),
			$theme->Version,
			true
		);

		wp_localize_script(
			'admin-archive-quotes',
			'NovaQuote',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'nova_quote_nonce' ),
			)
		);
	}

	/**
	 * Handle the AJAX request to restore an archived quote
	 */
	public function handle_restore_quote() {
		if ( ! check_ajax_referer( 'nova_quote_nonce', 'nonce', false ) ) {
			wp_send_json_error( array( 'message' => 'Invalid nonce' ) );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => 'Insufficient permissions' ) );
		}

		$quote_id = isset( $_POST['quote_id'] ) ? intval( $_POST['quote_id'] ) : 0;
		if ( ! $quote_id ) {
			wp_send_json_error( array( 'message' => 'Invalid quote ID' ) );
		}

		$post = get_post( $quote_id );
		if ( ! $post || $post->post_type !== 'nova_quote' || $post->post_status !== 'archive' ) {
			wp_send_json_error( array( 'message' => 'Invalid quote' ) );
		}

		$result = wp_update_post(
			array(
				'ID' => $quote_id,
				'post_status' => 'draft',
			)
		);

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( array( 'message' => $result->get_error_message() ) );
		}

		wp_send_json_success();
	}

	/**
	 * Render the Archive Quotes page
	 */
	public function render_archive_quotes_page() {
		?>
		<div class="wrap">
			<h1>Archive Quotes</h1>

			<?php if ( isset( $_GET['quoted_dates_added'] ) ) : ?>
				<div class="notice notice-success is-dismissible">
					<p>
						<?php
						printf(
							_n(
								'Added quoted date to %d quote.',
								'Added quoted date to %d quotes.',
								intval( $_GET['quoted_dates_added'] ),
								'nova-b2b'
							),
							intval( $_GET['quoted_dates_added'] )
						);
						?>
					</p>
				</div>
			<?php endif; ?>

			<div class="card">
				<h2>Add Quoted Dates</h2>
				<p>Click the button below to add quoted dates to all quotes that are marked as "ready" but don't have a quoted date
					set.</p>
				<p>The quoted date will be set to the date of the last revision.</p>
				<a href="<?php echo esc_url( wp_nonce_url( admin_url( 'edit.php?post_type=nova_quote&page=archive-quotes&add_quoted_date=1' ), 'add_quoted_date' ) ); ?>"
					class="button button-primary">Add Quoted Date</a>
			</div>
		</div>
	<?php
	}
}