<?php
namespace NOVA_B2B\INC\CLASSES;

use WP_User;
use WP_Error;
use WC;

class Roles {
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

	public function __construct() {
		add_action( 'init', array( $this, 'create_roles' ) );
		add_action( 'wp_ajax_nopriv_nova_signup', array( $this, 'nova_signup' ) );
		add_action( 'wp_ajax_nopriv_nova_login', array( $this, 'nova_login' ) );
		add_action( 'wp_ajax_nopriv_send_activation', array( $this, 'send_activation' ) );
		add_action( 'template_redirect', array( $this, 'custom_activation_page_redirect' ) );
		add_action( 'admin_menu', array( $this, 'add_pending_users_count_bubble' ) );
		add_filter( 'wp_authenticate_user', array( $this, 'custom_role_login_check' ), 10, 2 );
		add_action( 'nova_activated', array( $this, 'user_activation' ), 10, 1 );
		add_filter( 'manage_users_columns', array( $this, 'add_business_id_column' ) );
		add_action( 'manage_users_custom_column', array( $this, 'business_id_user_column' ), 10, 3 );
		add_filter( 'manage_users_sortable_columns', array( $this, 'make_business_id_column_sortable' ) );
		add_action( 'pre_get_users', array( $this, 'sort_by_business_id_column' ) );
		add_action( 'set_user_role', array( $this, 'notify_user_approved_partner' ), 10, 3 );
		add_action( 'set_user_role', array( $this, 'log_role_change' ), 10, 3 );
	}

	public function log_role_change( $user_id, $new_role, $old_roles ) {
		$user_info = get_userdata( $user_id );
		$log_entry = sprintf(
			"User Role Change: User ID %d (%s) changed from %s to %s\n",
			$user_id,
			$user_info->user_login,
			implode( ', ', $old_roles ),
			$new_role
		);

		// Path to your log file
		$log_file = WP_CONTENT_DIR . '/user-role-changes.log';

		// Write the log entry to file
		file_put_contents( $log_file, $log_entry, FILE_APPEND );
	}

	public function notify_user_approved_partner( $user_id, $role, $old_roles ) {
		if ( in_array( 'pending', $old_roles ) && $role == 'partner' ) {
			$user_info = get_userdata( $user_id );

			$to         = $user_info->user_email;
			$first_name = $user_info->first_name;

			$subject  = 'Your Business Partner Status is Approved. Welcome to NOVA Signage!';
			$message  = '<p>Dear  ' . $first_name . ',</p>';
			$message .= '<p>Congratulations! Your application to become a business partner with NOVA Signage has been approved. Welcome to the NOVA Signage family!</p>';
			$message .= "<p>We look forward to collaborating with you to enhance your shop's offerings. If you have any questions, our team is here to assist.</p>";
			$message .= "<p>Best,\n<br>";
			$message .= 'NOVA Signage Team</p>';

			$headers = array( 'Content-Type: text/html; charset=UTF-8' );

			wp_mail( $to, $subject, $message, $headers );

		}
	}

	public function custom_role_login_check( $user, $password ) {
		if ( ! is_wp_error( $user ) ) {
			$roles = (array) $user->roles;

			// Check for 'Temporary' role
			if ( in_array( 'temporary', $roles, true ) ) {
				return new WP_Error( 'temporary_account', __( 'Please Activate your email' ) );
			}
		}

		return $user;
	}

	public function sort_by_business_id_column( $query ) {
		if ( ! is_admin() ) {
			return;
		}

		$orderby = $query->get( 'orderby' );

		if ( 'business_id' == $orderby ) {
			$query->set( 'meta_key', 'business_id' ); // replace with your actual meta key
			$query->set( 'orderby', 'meta_value' ); // or 'meta_value_num' if the values are numeric
		}
	}

	public function make_business_id_column_sortable( $columns ) {
		$columns['business_id'] = 'business_id';
		return $columns;
	}

	public function business_id_user_column( $value, $column_name, $user_id ) {
		if ( 'business_id' === $column_name ) {
			return get_field( 'business_id', 'user_' . $user_id );
		}
		return $value;
	}

	public function add_business_id_column( $columns ) {
		$new_column = array( 'business_id' => 'Business ID' );

		$new_columns = array();
		foreach ( $columns as $key => $value ) {
			if ( $key == 'username' ) {
				$new_columns = array_merge( $new_columns, $new_column );
			}
			$new_columns[ $key ] = $value;
		}

		return $new_columns;
	}

	public function user_activation( $user_id ) {
		delete_user_meta( $user_id, 'account_activation_key' );
		$user = new WP_User( $user_id );
		$user->set_role( 'pending' );

		$subject  = 'New Partner Application';
		$message  = '<p>A new business partner has submitted their application. Congratulations!</p>';
		$message .= '<p>Business ID: ' . get_field( 'business_id', 'user_' . $user_id ) . '</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		wp_mail( get_option( 'admin_email' ), $subject, $message, $headers );

		$this->send_user_pending_email( $user_id );
	}

	public function send_user_pending_email( $user_id ) {
		$user       = get_userdata( $user_id );
		$first_name = get_user_meta( $user_id, 'first_name', true );
		$user_email = $user->user_email;

		$subject = 'NOVA Signage: Pending Status';

		$message  = '<p>Hello  ' . $first_name . ',</p>';
		$message .= '<p>Kindly allow 1 business day for the processing of your partner status. Meanwhile, you can place your order in the cart until your status is approved.</p>';
		$message .= '<p>You will receive an email notification upon the approval of your application.</p>';
		$message .= "<p>Thank you,\n<br>";
		$message .= 'NOVA Signage Team</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		wp_mail( $user_email, $subject, $message, $headers );
	}

	public function send_user_approved_email( $user_id ) {
		$user = new WP_User( $user_id );

		$first_name = get_user_meta( $user_id, 'first_name', true );

		$subject  = 'Your Business Partner Status is Approved. Welcome to NOVA Signage!';
		$message  = '<p>Dear  ' . $first_name . ',</p>';
		$message .= '<p>Congratulations! Your application to become a business partner with NOVA Signage has been approved. Welcome to the NOVA Signage family!</p>';
		$message .= "<p>We look forward to collaborating with you to enhance your shop's offerings. If you have any questions, our team is here to assist.</p>";
		$message .= "<p>Best,\n<br>";
		$message .= 'NOVA Signage Team</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		wp_mail( $user->user_email, $subject, $message, $headers );
	}

	public function nova_login() {

		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_login_nonce' ) ) {
			$status['error'] = 'Nonce Error';
			wp_send_json( $status );
		}

		$login    = $_POST['login'];
		$password = $_POST['user_password'];

		$user_id = is_email( $login ) ? email_exists( $login ) : username_exists( $login );

		if ( ! $user_id ) {
			$status['error'] = 'Invalid username or email.';
		}

		$user = wp_authenticate( $login, $password );

		if ( is_wp_error( $user ) ) {
			$status['code']  = is_email( $login ) ? 3 : 4;
			$status['error'] = $user->get_error_message();
		} else {
			wp_set_current_user( $user->ID );
			wp_set_auth_cookie( $user->ID );
			$status['code'] = 2;
		}

		$status['referrer'] = wp_get_referer();
		wp_send_json( $status );
	}

	public function add_pending_users_count_bubble() {
		$users         = count_users();
		$pending_count = $users['avail_roles']['pending'] ?? 0;

		if ( $pending_count > 0 ) {
			global $menu;
			foreach ( $menu as $key => $value ) {
				if ( $menu[ $key ][2] == 'users.php' ) {
					// Add count bubble
					$menu[ $key ][0] .= ' <span class="update-plugins count-' . $pending_count . '"><span class="plugin-count">' . $pending_count . '</span></span>';
					return;
				}
			}
		}
	}

	public function custom_activation_page_redirect() {
		if ( is_page( 'activate' ) ) {
			if ( is_user_logged_in() || empty( $_GET['key'] ) || empty( $_GET['pu'] ) ) {
				wp_redirect( home_url() );
				exit;
			}
		}
	}

	public function sanitize_phone_number( $phone ) {
		return preg_replace( '/[^\d+]/', '', $phone ?? '' );
	}

	public function nova_signup() {

		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_signup_nonce' ) ) {
			wp_send_json(
				$status = array(
					'code'  => 5,
					'error' => 'Nonce Error',
				)
			);
		}

		$username        = sanitize_user( $_POST['username'] );
		$password        = $_POST['password'];
		$firstName       = sanitize_text_field( $_POST['firstName'] );
		$lastName        = sanitize_text_field( $_POST['lastName'] );
		$businessName    = isset( $_POST['businessName'] ) ? sanitize_text_field( $_POST['businessName'] ) : '';
		$businessEmail   = sanitize_email( $_POST['businessEmail'] );
		$businessWebsite = isset( $_POST['businessWebsite'] ) ? sanitize_url( $_POST['businessWebsite'] ) : '';
		$businessType    = isset( $_POST['businessType'] ) ? sanitize_text_field( $_POST['businessType'] ) : '';
		$businessPhone   = isset( $_POST['businessPhone'] ) ? $this->sanitize_phone_number( $_POST['businessPhone'] ) : '';
		$taxId           = isset( $_POST['taxId'] ) ? sanitize_text_field( $_POST['taxId'] ) : '';
		$street          = isset( $_POST['street'] ) ? sanitize_text_field( $_POST['street'] ) : '';
		$city            = isset( $_POST['city'] ) ? sanitize_text_field( $_POST['city'] ) : '';
		$state           = isset( $_POST['state'] ) ? sanitize_text_field( $_POST['state'] ) : '';
		$zip             = isset( $_POST['zip'] ) ? sanitize_text_field( $_POST['zip'] ) : '';
		$country         = isset( $_POST['country'] ) ? sanitize_text_field( $_POST['country'] ) : '';
		$promotions      = isset( $_POST['promotions'] ) ? sanitize_text_field( $_POST['promotions'] ) : '';
		$privacy         = isset( $_POST['privacy'] ) ? sanitize_text_field( $_POST['privacy'] ) : '';

		if ( username_exists( $username ) || email_exists( $businessEmail ) ) {
			wp_send_json(
				$status = array(
					'code'  => 3,
					'error' => 'Username/Email already exists.',
				)
			);
		}

		$userData = array(
			'user_login'           => $username,
			'user_pass'            => $password,
			'user_email'           => $businessEmail,
			'show_admin_bar_front' => false,
			'first_name'           => $firstName,
			'last_name'            => $lastName,
			'role'                 => 'temporary',
		);

		$user_id = wp_insert_user( $userData );

		if ( is_wp_error( $user_id ) ) {
			// Handle error when user creation fails
			wp_send_json(
				$status = array(
					'code'  => 4,
					'error' => $user_id->get_error_message(),
				)
			);
		}

		wp_update_user(
			array(
				'ID'         => $user_id,
				'first_name' => $firstName,
				'last_name'  => $lastName,
			)
		);

		$business_id = strtoupper( $country . $state . '-' . substr( $businessType, 0, 1 ) );

		if ( $user_id < 100 ) {
			$business_id = $business_id . '0' . $user_id;
		} else {
			$business_id = $business_id . $user_id;
		}

		update_field( 'business_id', $business_id, 'user_' . $user_id );
		update_field( 'business_name', $businessName, 'user_ ' . $user_id );
		update_field( 'business_phone', $businessPhone, 'user_ ' . $user_id );
		update_field( 'business_type', $businessType, 'user_ ' . $user_id );
		update_field( 'business_email', $businessEmail, 'user_ ' . $user_id );
		update_field( 'business_website', $businessWebsite, 'user_ ' . $user_id );
		update_field( 'business_phone_number', $businessPhone, 'user_ ' . $user_id );
		update_field( 'tax_id', $taxId, 'user_ ' . $user_id );
		update_field( 'street_address', $street, 'user_ ' . $user_id );
		update_field( 'city', $city, 'user_ ' . $user_id );
		update_field( 'state', $state, 'user_ ' . $user_id );
		update_field( 'zip', $zip, 'user_ ' . $user_id );
		update_field( 'how_did_you_hear_about_us', $_POST['hear'], 'user_ ' . $user_id );
		update_field( 'promotions', isset( $_POST['promotions'] ) && $_POST['promotions'] === 'yes' ? 1 : 0, 'user_ ' . $user_id );
		update_field( 'privacy', $_POST['privacy'] === 'yes' ? 1 : 0, 'user_ ' . $user_id );

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		// Send activation email
		// wp_mail( $businessEmail, $subject, $message, $headers );

		$status['code']   = 2;
		$status['post']   = $_POST;
		$status['result'] = array(
			'business_id' => $business_id,
			'email'       => $businessEmail,
			'first_name'  => $firstName,
		);

		wp_send_json( $status );
	}

	public function send_activation() {

		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_signup_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		$user_id       = $_POST['user_id'];
		$firstName     = sanitize_text_field( $_POST['first_name'] );
		$businessEmail = sanitize_email( $_POST['email'] );
		$business_id   = sanitize_text_field( $_POST['business_id'] );

		$activation_key = md5( uniqid( rand(), true ) );
		update_user_meta( $user_id, 'account_activation_key', $activation_key );

		$subject  = 'NOVA Signage: Activate Your Account';
		$message  = '<p>Hello  ' . $firstName . ',</p>';
		$message .= '<p>Thank you for submitting your application as a NOVA Business Partner. Your <b>Business ID</b> number is: ' . $business_id . "\n\n</p>";
		$message .= '<p>Please click the link below to activate your account:' . "\n\n</p>";
		$message .= '<a href="' . site_url() . '/activate?pu=' . $user_id . '&key=' . $activation_key . '">';
		$message .= site_url() . '/activate?pu=' . $user_id . '&key=' . $activation_key . "</a>\n\n";
		$message .= "<p>Thank you,\n<br>";
		$message .= 'NOVA Signage Team</p>';

		$this->send_email( $businessEmail, $subject, $message, array(), array() );

		$status['code'] = 2;
		$status['post'] = $_POST;
		wp_send_json( $status );
	}

	public function send_email( $to, $subject, $content, $headers = array(), $attachments = array() ) {
		// Get the WooCommerce emailer instance
		$mailer = WC()->mailer();

		// Wrap the content with WooCommerce email template
		$wrapped_content = $mailer->wrap_message( $subject, $content );

		// Send the email using WooCommerce's mailer
		$mailer->send( $to, $subject, $wrapped_content, $headers, $attachments );
	}



	public function create_roles() {
		global $wp_roles;

		if ( ! class_exists( 'WP_Roles' ) ) {
			return;
		}

		if ( ! isset( $wp_roles ) ) {
			$wp_roles = new WP_Roles(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		}

		// Partner role.
		add_role(
			'temporary',
			'Temporary',
			array(),
		);

		// Partner role.
		add_role(
			'pending',
			'Pending',
			array(),
		);

		// Partner role.
		add_role(
			'partner',
			'Partner',
			get_role( 'customer' )->capabilities
		);
	}
}

Roles::get_instance();
