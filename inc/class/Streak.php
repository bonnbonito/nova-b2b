<?php
namespace NOVA_B2B;

class Streak {
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
		add_action( 'init', array( $this, 'create_streak_boxes_table' ) );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
	}

	/**
	 * Create the streak_boxes table.
	 */
	public function create_streak_boxes_table() {
		global $wpdb;
		$table_name      = $wpdb->prefix . 'streak_boxes';
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            boxID varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}

	/**
	 * Register REST API routes.
	 */
	public function register_routes() {
		register_rest_route(
			'nova/v1',
			'/add-streak-box',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'add_streak_box' ),
				'permission_callback' => array( $this, 'check_basic_auth' ),
			)
		);
	}

	/**
	 * Add streak box to the database.
	 */
	public function add_streak_box( $request ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';

		$boxID = sanitize_text_field( $request['boxID'] );
		$email = sanitize_email( $request['email'] );

		$wpdb->insert(
			$table_name,
			array(
				'boxID' => $boxID,
				'email' => $email,
				'date'  => current_time( 'mysql' ),
			)
		);

		return new \WP_REST_Response( array( 'status' => 'success' ), 200 );
	}

	/**
	 * Check Basic Auth.
	 */
	public function check_basic_auth( $request ) {
		$headers = getallheaders();
		if ( isset( $headers['Authorization'] ) ) {
			list($type, $credentials) = explode( ' ', $headers['Authorization'], 2 );
			if ( strtolower( $type ) === 'basic' ) {
				list($user, $password) = explode( ':', base64_decode( $credentials ), 2 );
				if ( $user === 'your_username' && $password === 'your_password' ) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Add admin menu.
	 */
	public function add_admin_menu() {
		add_menu_page(
			'Streak Boxes',
			'Streak Boxes',
			'manage_options',
			'streak-boxes',
			array( $this, 'display_streak_boxes' ),
			'dashicons-list-view',
			6
		);
	}

	/**
	 * Display streak boxes.
	 */
	public function display_streak_boxes() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';
		$results    = $wpdb->get_results( "SELECT * FROM $table_name" );

		echo '<div class="wrap">';
		echo '<h1 class="wp-heading-inline">Streak Boxes</h1>';
		echo '<table class="wp-list-table widefat fixed striped">';
		echo '<thead><tr><th>ID</th><th>Box ID</th><th>Email</th><th>Date</th></tr></thead>';
		echo '<tbody>';
		foreach ( $results as $row ) {
			echo '<tr>';
			echo '<td>' . esc_html( $row->id ) . '</td>';
			echo '<td>' . esc_html( $row->boxID ) . '</td>';
			echo '<td>' . esc_html( $row->email ) . '</td>';
			echo '<td>' . esc_html( $row->date ) . '</td>';
			echo '</tr>';
		}
		echo '</tbody>';
		echo '</table>';
		echo '</div>';
	}
}
