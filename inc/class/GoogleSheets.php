<?php

namespace NOVA_B2B;

use WP_Error;

class GoogleSheets {
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
		/** add to admin footer */
		add_action( 'wp_ajax_update_crm_sheet', array( $this, 'update_crm_sheet' ) );
		add_action( 'wp_ajax_download_crm_sheet', array( $this, 'download_crm_sheet' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		// add_action( 'set_user_role', array( $this, 'update_sheet' ), 99 );
		// add_action( 'profile_update', array( $this, 'update_sheet' ), 99 );
	}

	public function enqueue_scripts() {
		if ( isset( $_GET['page'] ) && $_GET['page'] == 'googlesheet-web-crm' ) {
			wp_enqueue_script( 'admin-sheets', get_stylesheet_directory_uri() . '/assets/js/admin-sheets.js', array(), wp_get_theme()->get( 'Version' ), true );

			wp_localize_script(
				'admin-sheets',
				'GoogleSheets',
				array(
					'ajax_url'    => admin_url( 'admin-ajax.php' ),
					'nonce'       => wp_create_nonce( 'googlesheets' ),
					'web_app_url' => get_field( 'google_sheet_web_app_url', 'option' ),
				)
			);
		}
	}

	public function get_crm_webapp_url() {
		return get_field( 'google_sheet_web_app_url', 'option' );
	}

	public function download_crm_sheet() {
		$status = array(
			'code' => 1,
		);

		$partners           = self::get_all_partners();
		$status['partners'] = $partners;
		$status['code']     = 2;

		wp_send_json( $status );
	}

	public function update_crm_sheet() {
		$status = array(
			'code' => 1,
		);
		try {

			/** clear sheet */
			$clear = $this->clear_sheet();

			if ( is_wp_error( $clear ) ) {
				$status['error'] = 'cant clear sheet';
				wp_send_json( $status );
				return;
			}

			$partners = self::get_all_partners();

			foreach ( $partners as $partner ) {
				$this->insert_to_sheet( $partner );
			}

			wp_send_json( $status );

		} catch ( \Exception $e ) {
			$status['code'] = 2;
			wp_send_json( $status );
		}

		wp_send_json( $status );
	}

	public function clear_sheet() {
		$url      = $this->get_crm_webapp_url() . '?action=clear&path=Partners (Master Copy)';
		$response = wp_remote_get( $url );

		return $response;
	}

	public static function get_all_partners() {
		$args    = array(
			'role'    => 'partner',
			'orderby' => 'registered',
			'order'   => 'ASC',
		);
		$users   = get_users( $args );
		$results = array();

		$keywords = array( 'test', 'demo' );

		foreach ( $users as $user ) {

			$first_name = $user->first_name;
			$last_name  = $user->last_name;
			$email      = $user->user_email;

			// Skip user if any field contains the keywords
			if ( self::containsKeywords( $first_name, $keywords ) ||
				self::containsKeywords( $last_name, $keywords ) ||
				self::containsKeywords( $email, $keywords ) ) {
				continue;
			}

			// Retrieve country or default to 'NONE'
			$country = get_user_meta( $user->ID, 'billing_country', true );
			if ( empty( $country ) ) {
				$country = 'NONE';
			}

			$state = get_user_meta( $user->ID, 'billing_state', true );
			if ( empty( $state ) ) {
				$state = 'NONE';
			}

			$results[] = array(
				'businessId'       => get_field( 'business_id', 'user_' . $user->ID ) ?: 'None',
				'businessName'     => get_field( 'business_name', 'user_' . $user->ID ) ?: 'None',
				'username'         => $user->user_login ?: 'None',
				'name'             => $first_name . ' ' . $last_name ?: 'None',
				'email'            => $email ?: 'None',
				'phone'            => get_field( 'business_phone_number', 'user_' . $user->ID ) ?: 'None',
				'website'          => get_field( 'business_website', 'user_' . $user->ID ) ?: 'None',
				'address'          => get_user_meta( $user->ID, 'billing_address_1', true ) ?: 'None',
				'city'             => get_user_meta( $user->ID, 'billing_city', true ) ?: 'None',
				'postcode'         => get_user_meta( $user->ID, 'billing_postcode', true ) ?: 'None',
				'state'            => $state ?: 'None',
				'country'          => $country ?: 'None',
				'registrationDate' => ( new \DateTime( $user->user_registered ) )->format( 'Y-m-d' ),
				'orders'           => self::user_orders_count( $user->ID ),
				'quotes'           => self::user_quotes_count( $user->ID ),
			);
		}

		return $results;
	}

	public function insert_to_sheet( $partner ) {
		$url = $this->get_crm_webapp_url() . '?businessId=' . $partner['businessId'] . '&businessName=' . $partner['businessName'] . '&username=' . $partner['username'] . '&name=' . $partner['name'] . '&email=' . $partner['email'] . '&phone=' . $partner['phone'] . '&website=' . $partner['website'] . '&address=' . $partner['address'] . '&city=' . $partner['city'] . '&postcode=' . $partner['postcode'] . '&state=' . $partner['state'] . '&country=' . $partner['country'] . '&registrationDate=' . $partner['registrationDate'] . '&orders=' . $partner['orders'] . '&quotes=' . $partner['quotes'] . '&path=Partners (Master Copy)&action=write';

		$response = wp_remote_get( $url );

		if ( is_wp_error( $response ) ) {
			return $response;
		}
		return $response;
	}

	public function update_sheet( $user_id ) {

		$web_app_url      = $this->get_crm_webapp_url();
		$user             = get_user_by( 'id', $user_id );
		$business_id      = get_field( 'business_id', 'user_' . $user->ID );
		$business_name    = get_field( 'business_name', 'user_' . $user->ID );
		$username         = $user->user_login;
		$name             = $user->first_name . ' ' . $user->last_name;
		$email            = $user->user_email;
		$phone            = get_field( 'business_phone_number', 'user_' . $user->ID );
		$website          = get_field( 'business_website', 'user_' . $user->ID );
		$address          = get_user_meta( $user->ID, 'billing_address_1', true );
		$city             = get_user_meta( $user->ID, 'billing_city', true );
		$postcode         = get_user_meta( $user->ID, 'billing_postcode', true );
		$state            = get_user_meta( $user->ID, 'billing_state', true );
		$country          = get_user_meta( $user->ID, 'billing_country', true );
		$registrationDate = ( new \DateTime( $user->user_registered ) )->format( 'Y-m-d' );
		$orders           = self::user_orders_count( $user->ID );
		$quotes           = self::user_quotes_count( $user->ID );

		$url = $web_app_url . '?businessId=' . $business_id . '&businessName=' . $business_name . '&username=' . $username . '&name=' . $name . '&email=' . $email . '&phone=' . $phone . '&website=' . $website . '&address=' . $address . '&city=' . $city . '&postcode=' . $postcode . '&state=' . $state . '&country=' . $country . '&registrationDate=' . $registrationDate . '&orders=' . $orders . '&quotes=' . $quotes . '&path=Partners (Master Copy)&action=update';

		$response = wp_remote_get( $url );

		if ( is_wp_error( $response ) ) {
			return $response;
		}
		return $response;
	}

	public function user_orders_count( $user_id ) {
		if ( ! class_exists( 'WC_Order_Query' ) ) {
			return 'WooCommerce is not active';
		}

		// Set up the order query arguments
		$args = array(
			'customer_id' => $user_id, // User ID
			'return'      => 'ids',         // Return only IDs to speed up the query
			'status'      => array( 'wc-completed', 'wc-processing', 'wc-on-hold' ), // Optional: specify order statuses
		);

		// Create a new WC_Order_Query object with the specified arguments
		$query  = new \WC_Order_Query( $args );
		$orders = $query->get_orders(); // Get the orders

		// Return the count of orders
		return count( $orders );
	}

	public function user_quotes_count( $user_id ) {
		$args = array(
			'post_type'      => 'nova_quote',  // Set to your custom post type
			'posts_per_page' => -1,       // We don't need to retrieve all posts, just count them
			'fields'         => 'ids',            // Fetch only the IDs to speed up the query
			'post_status'    => 'publish',   // Consider only published posts; adjust if needed
			'meta_query'     => array(
				array(
					'key'     => 'partner',  // The ACF field key
					'value'   => $user_id, // The user ID you want to match
					'compare' => '=',    // Exact match
					'type'    => 'NUMERIC',  // Assuming the field is stored as a numeric value
				),
			),
		);

		$query = new \WP_Query( $args );
		return $query->found_posts; // Return the count of matching posts
	}


	public static function containsKeywords( $string, $keywords ) {
		$lowerString = strtolower( $string ); // Convert string to lower case once
		foreach ( $keywords as $keyword ) {
			if ( strpos( $lowerString, $keyword ) !== false ) {
				return true;
			}
		}
		return false;
	}
}
