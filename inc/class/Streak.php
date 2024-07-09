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
		add_action( 'admin_post_delete_streak_box', array( $this, 'handle_delete_streak_box' ) );
		add_action( 'nova_b2b_add_streak_box', array( $this, 'populate_streak_details' ), 10, 2 );
	}

	public function get_google_sheet() {
		return get_field( 'sheet_web_app_link', 'option' ) ? get_field( 'sheet_web_app_link', 'option' ) : null;
	}

	public function get_streak_details_from_email( $email ) {
		$users = get_users( array( 'role' => 'partner' ) );

		$results = array();

		foreach ( $users as $user ) {
			$business_id    = get_user_meta( $user->ID, 'business_id', true );
			$emails         = get_user_meta( $user->ID, 'employee_emails', true );
			$emails_array   = $emails ? explode( ',', str_replace( ' ', '', trim( $emails ) ) ) : array();
			$emails_array[] = $user->user_email;
			$emails         = array_unique( $emails_array );
			$country        = get_user_meta( $user->ID, 'billing_country', true ) ? get_user_meta( $user->ID, 'billing_country', true ) : 'NONE';

			if ( $country == 'CA' ) {
				$country = 'CAN';
			} elseif ( $country == 'US' ) {
				$country = 'USA';
			}

			$results[] = array(
				'business_id' => $business_id,
				'emails'      => $emails,
				'country'     => $country,
			);

			if ( in_array( $email, $emails ) ) {
				return $results;
			}
		}

		return $results;
	}

	public function populate_streak_details( $insert_id, $boxID ) {
		$this->recursive_fetch_streak_box_data( $insert_id, $boxID, 5 );
	}

	private function recursive_fetch_streak_box_data( $insert_id, $boxID, $max_tries ) {
		if ( $max_tries <= 0 ) {
			return false; // Stop trying after max tries
		}

		$result  = $this->fetch_streak_box_data( $boxID );
		$decoded = json_decode( $result, true );

		if ( isset( $decoded['firstEmailFrom'] ) ) {
			$details = $this->get_streak_details_from_email( $decoded['firstEmailFrom'] ) ?: 'NONE';
			if ( $details && isset( $details[0] ) ) {
				$business_id = $details[0]['business_id'];
				$email       = $decoded['firstEmailFrom'];
				$country     = $details[0]['country'];
				return $this->update_streak( $insert_id, $boxID, $email, $business_id, $country );
			}
		} else {
			// Wait 5 seconds before fetching the data again
			sleep( 5 );
			return $this->recursive_fetch_streak_box_data( $insert_id, $boxID, $max_tries - 1 );
		}
	}

	function fetch_streak_box_data( $boxID ) {
		$url = 'https://api.streak.com/api/v1/boxes/' . $boxID;

		$args = array(
			'method'      => 'GET',
			'timeout'     => 30,
			'redirection' => 10,
			'httpversion' => '1.1',
			'headers'     => array(
				'Content-Type'  => 'application/json',
				'Accept'        => 'application/json',
				'Authorization' => 'Basic ' . base64_encode( $this->get_streak_api() ),
			),
		);

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			$error_message = $response->get_error_message();
			error_log( 'Error fetch_streak_box_data: ' . $error_message );
			return false;
		} else {
			return wp_remote_retrieve_body( $response );
		}
	}



	public function get_sheet_id() {
		return get_field( 'sheet_id', 'option' );
	}


	public function get_streak_api() {
		return get_field( 'streak_api', 'option' );
	}

	public function get_streak_password() {
		return get_field( 'streak_password', 'option' );
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
            business_id varchar(100) NOT NULL,
            country varchar(10) NOT NULL,
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

		register_rest_route(
			'nova/v1',
			'/update-streak-box/(?P<id>\d+)',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_streak_box' ),
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

		$wpdb->insert(
			$table_name,
			array(
				'boxID' => $boxID,
				'date'  => current_time( 'mysql' ),
			)
		);

		$insert_id = $wpdb->insert_id;

		do_action( 'nova_b2b_add_streak_box', $insert_id, $boxID );

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
				if ( $user === 'bonnix' && $password === $this->get_streak_password() ) {
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
			25
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
		echo '<thead><tr><th>ID</th><th>Box ID</th><th>Email</th><th>Business ID</th><th>Country</th><th>Date</th><th>Action</th></tr></thead>';
		echo '<tbody>';
		foreach ( $results as $row ) {
			$delete_nonce = wp_create_nonce( 'delete_streak_box_' . $row->id );
			$delete_url   = admin_url( 'admin-post.php?action=delete_streak_box&id=' . $row->id . '&nonce=' . $delete_nonce );

			echo '<tr>';
			echo '<td>' . esc_html( $row->id ) . '</td>';
			echo '<td>' . esc_html( $row->boxID ) . '</td>';
			echo '<td>' . esc_html( $row->email ) . '</td>';
			echo '<td>' . esc_html( $row->business_id ) . '</td>';
			echo '<td>' . esc_html( $row->country ) . '</td>';
			echo '<td>' . esc_html( $row->date ) . '</td>';
			echo '<td><a href="' . esc_url( $delete_url ) . '" class="button button-secondary delete-streak-box" data-id="' . esc_attr( $row->id ) . '">Delete</a></td>';
			echo '</tr>';
		}
		echo '</tbody>';
		echo '</table>';
		echo '</div>';

		// Add JavaScript for confirmation alert
		echo '<script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function() {
            const deleteLinks = document.querySelectorAll(".delete-streak-box");
            deleteLinks.forEach(function(link) {
                link.addEventListener("click", function(event) {
                    if (!confirm("Are you sure you want to delete this item?")) {
                        event.preventDefault();
                    }
                });
            });
        });
    </script>';
	}

	/**
	 * Handle delete streak box request.
	 */
	public function handle_delete_streak_box() {
		if ( ! isset( $_GET['id'] ) || ! isset( $_GET['nonce'] ) || ! wp_verify_nonce( $_GET['nonce'], 'delete_streak_box_' . $_GET['id'] ) ) {
			wp_die( 'Invalid request.' );
		}

		$id = intval( $_GET['id'] );

		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';
		$wpdb->delete( $table_name, array( 'id' => $id ) );

		wp_redirect( admin_url( 'admin.php?page=streak-boxes' ) );
		exit;
	}

	public function update_streak( $id, $boxID, $email, $business_id, $country ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';

		// Sanitize the inputs
		$id          = intval( $id );
		$email       = sanitize_email( $email );
		$business_id = sanitize_text_field( $business_id );
		$country     = sanitize_text_field( $country );

		// Update the database
		$result = $wpdb->update(
			$table_name,
			array(
				'email'       => $email,
				'business_id' => $business_id,
				'country'     => $country,
			),
			array( 'id' => $id ),
			array( '%s', '%s', '%s' ),
			array( '%d' )
		);

		// Check the result and return appropriate message
		if ( $result === false ) {
			error_log( 'wpdb update error: ' . $wpdb->last_error );
			return 'Failed to update. Error: ' . $wpdb->last_error;
		} elseif ( $result === 0 ) {
			return 'No rows were updated';
		} else {
			return $this->update_sheet_sheet( $boxID, $email, $business_id, $country );
		}
	}

	public function get_project_folder_id( $boxId, $business_id, $country ) {
		$params = array(
			'boxId'    => $boxId,
			'isSearch' => 'true',
		);
		$url    = $this->get_google_sheet();

		$project_folder = wp_remote_get( $url, array( 'body' => $params ) );

		if ( is_wp_error( $project_folder ) ) {
			error_log( 'Error getting project folder: ' . $project_folder->get_error_message() );
			return false; // indicate failure
		} else {
			$project_folder = wp_remote_retrieve_body( $project_folder );
			$data           = json_decode( $project_folder, true );

			$project_id = $data['data'][0]['projectId'] ? $data['data'][0]['projectId'] : false;

			if ( isset( $project_id ) ) {
				return $this->update_box_details_in_streak( $boxId, $project_id, $business_id, $country );
			}
		}
	}

	public function update_box_details_in_streak( $boxID, $project_id, $business_id, $country ) {

		$url = 'https://api.streak.com/api/v1/boxes/' . $boxID;

		$country_tag = $country === 'CAN' ? '9001' : '9002';

		$body = json_encode(
			array(
				'name'   => $project_id,
				'fields' => array(
					'1006' => array(
						$country_tag,
					),
					'1011' => $business_id,
				),
			)
		);

		$response = wp_remote_post(
			$url,
			array(
				'body'        => $body,
				'headers'     => array(
					'Content-Type'  => 'application/json',
					'Accept'        => 'application/json',
					'Authorization' => 'Basic ' . base64_encode( $this->get_streak_api() ),
				),
				'timeout'     => 30,
				'redirection' => 10,
				'blocking'    => true,
				'httpversion' => '1.1',
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error: ' . $response->get_error_message() );
		} else {
			$response_body = wp_remote_retrieve_body( $response );
		}
	}

	public function update_sheet_sheet( $boxId, $email, $business_id, $country ) {
		$params = array(
			'boxId'      => $boxId,
			'projectId'  => '="NV-POJ-" & TEXT(10000 + ROW() - 1, "00000")',
			'email'      => $email,
			'businessId' => $business_id,
			'country'    => $country,
		);

		$url = $this->get_google_sheet();

		$response = wp_remote_post(
			$url,
			array(
				'body'    => $params,
				'headers' => array(
					'Content-Type' => 'application/x-www-form-urlencoded',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error: ' . $response->get_error_message() );
		} else {
			return $this->get_project_folder_id( $boxId, $business_id, $country );
		}
	}



	/**
	 * Update streak box in the database.
	 */
	public function update_streak_box( $request ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';
		$id         = intval( $request['id'] );

		$boxID       = sanitize_text_field( $request['boxID'] );
		$email       = sanitize_email( $request['email'] );
		$business_id = sanitize_text_field( $request['business_id'] );
		$country     = sanitize_text_field( $request['country'] );

		$result = $wpdb->update(
			$table_name,
			array(
				'boxID'       => $boxID,
				'email'       => $email,
				'business_id' => $business_id,
				'country'     => $country,
				'date'        => current_time( 'mysql' ),
			),
			array( 'id' => $id )
		);

		if ( $result === false ) {
			return new \WP_REST_Response(
				array(
					'status'  => 'error',
					'message' => 'Failed to update',
				),
				500
			);
		}

		return new \WP_REST_Response( array( 'status' => 'success' ), 200 );
	}

	/**
	 * Search and return the row for a given boxID.
	 *
	 * @param string $boxID The boxID to search for.
	 * @return object|false The row object if found, or false if not found.
	 */
	public function get_row_by_boxID( $boxID ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';

		// Prepare the SQL query to search for the boxID
		$query = $wpdb->prepare( "SELECT * FROM $table_name WHERE boxID = %s", $boxID );

		// Execute the query and get the result
		$row = $wpdb->get_row( $query );

		// Return the row if found, or false if not found
		return $row ? $row : false;
	}

	function reset_streak_boxes_table() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'streak_boxes';

		// Step 1: Delete all rows from the table
		$wpdb->query( "TRUNCATE TABLE $table_name" );

		// Step 2: Reset AUTO_INCREMENT to 1 (TRUNCATE automatically resets AUTO_INCREMENT)
		// This step is optional since TRUNCATE resets AUTO_INCREMENT
		$wpdb->query( "ALTER TABLE $table_name AUTO_INCREMENT = 1" );

		// Verify the table is reset
		return true;
	}
}