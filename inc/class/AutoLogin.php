<?php

namespace NOVA_B2B;

class AutoLogin {
	private static $instance = null;

	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function __construct() {
		add_action( 'init', array( $this, 'process_autologin' ) );
		add_action( 'edit_user_profile', array( $this, 'add_autologin_link_to_user_profile' ) );
		add_action( 'show_user_profile', array( $this, 'add_autologin_link_to_user_profile' ) );
		add_action( 'personal_options_update', array( $this, 'save_autologin_link_on_profile_update' ) );
		add_action( 'edit_user_profile_update', array( $this, 'save_autologin_link_on_profile_update' ) );
		add_action( 'edit_user_profile', array( $this, 'add_autologin_regenerate_button' ) );
		add_action( 'personal_options_update', array( $this, 'handle_autologin_regenerate_button' ) );
		add_action( 'edit_user_profile_update', array( $this, 'handle_autologin_regenerate_button' ) );
	}

	public function handle_autologin_regenerate_button() {
		if ( ! isset( $_POST['regenerate_autologin_nonce'] ) || ! wp_verify_nonce( $_POST['regenerate_autologin_nonce'], 'regenerate_autologin_action' ) ) {
			return;
		}

		if ( isset( $_POST['regenerate_autologin'] ) && $_POST['regenerate_autologin'] == '1' ) {
			if ( ! isset( $_POST['user_id'] ) || ! is_numeric( $_POST['user_id'] ) ) {
				wp_die( 'Invalid user ID.' );
			}

			$user_id = intval( $_POST['user_id'] );

			if ( ! current_user_can( 'edit_user', $user_id ) ) {
				wp_die( 'You do not have permission to edit this user.' );
			}

			$this->generate_autologin_link( $user_id );

			add_action(
				'admin_notices',
				function () {
					echo '<div class="notice notice-success"><p>Autologin link regenerated successfully.</p></div>';
				}
			);
		}
	}

	public function generate_autologin_link( $user_id ) {
		$token      = wp_generate_password( 20, false );
		$expiration = time() + DAY_IN_SECONDS; // Expiration set to 1 day

		update_user_meta( $user_id, 'autologin_token', $token );
		update_user_meta( $user_id, 'autologin_token_expiration', $expiration );

		$autologin_url = add_query_arg(
			array(
				'autologin' => $user_id,
				'token'     => $token,
			),
			site_url()
		);

		return $autologin_url;
	}

	public function process_autologin() {
		if ( ! isset( $_GET['autologin'], $_GET['token'] ) ) {
			return;
		}

		$user_id = intval( $_GET['autologin'] );
		$token   = sanitize_text_field( $_GET['token'] );

		$stored_token = get_user_meta( $user_id, 'autologin_token', true );
		$expiration   = get_user_meta( $user_id, 'autologin_token_expiration', true );

		if ( $token === $stored_token && time() <= $expiration ) {
			wp_set_auth_cookie( $user_id );
			wp_redirect( home_url() );
			exit;
		}

		wp_redirect( wp_login_url() );
		exit;
	}

	public function add_autologin_link_to_user_profile( $user ) {
		if ( ! current_user_can( 'edit_users' ) ) {
			return;
		}

		$autologin_token = get_user_meta( $user->ID, 'autologin_token', true );
		$expiration      = get_user_meta( $user->ID, 'autologin_token_expiration', true );

		if ( ! $autologin_token || time() > $expiration ) {
			$autologin_link = $this->generate_autologin_link( $user->ID );
		} else {
			$autologin_link = add_query_arg(
				array(
					'autologin' => $user->ID,
					'token'     => $autologin_token,
				),
				site_url()
			);
		}

		$expiration_date = $expiration ? date( 'Y-m-d H:i:s', $expiration ) : 'Expired';

		echo '<h2>Autologin Link</h2>';
		echo '<table class="form-table">';
		echo '<tr>';
		echo '<th><label for="autologin_link">Autologin Link</label></th>';
		echo '<td>';
		echo '<input type="text" id="autologin_link" value="' . esc_url( $autologin_link ) . '" readonly style="width: 100%;">';
		echo '<p class="description">Expires on: ' . $expiration_date . '</p>';
		echo '</td>';
		echo '</tr>';
		echo '</table>';
	}

	public function save_autologin_link_on_profile_update( $user_id ) {
		if ( ! current_user_can( 'edit_users' ) ) {
			return;
		}

		if ( isset( $_POST['regenerate_autologin'] ) ) {
			$this->generate_autologin_link( $user_id );
		}
	}

	public function add_autologin_regenerate_button( $user ) {
		if ( ! current_user_can( 'edit_users' ) ) {
			return;
		}

		echo '<h2>Regenerate Autologin Link</h2>';
		echo '<form method="post" action="">';
		echo '<input type="hidden" name="regenerate_autologin" value="1">';
		echo '<input type="hidden" name="user_id" value="' . esc_attr( $user->ID ) . '">';
		wp_nonce_field( 'regenerate_autologin_action', 'regenerate_autologin_nonce' );
		submit_button( 'Regenerate Autologin Link' );
		echo '</form>';
	}
}
