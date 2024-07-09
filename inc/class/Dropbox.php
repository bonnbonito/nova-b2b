<?php

namespace NOVA_B2B;

class Dropbox {
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
	}

	function get_refresh_token() {
		$client_id     = get_field( 'dropbox_app_key', 'option' );
		$client_secret = get_field( 'dropbox_secret_key', 'option' );
		$refresh_token = get_field( 'dropbox_refresh_token', 'option' );

		$url    = 'https://api.dropboxapi.com/oauth2/token';
		$params = array(
			'grant_type'    => 'refresh_token',
			'refresh_token' => $refresh_token,
			'client_id'     => $client_id,
			'client_secret' => $client_secret,
		);

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
			error_log( 'Error getting access token: ' . $response->get_error_message() );
			return null;
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( isset( $data['access_token'] ) ) {
			return $data['access_token'];
		} else {
			error_log( 'Error: ' . wp_remote_retrieve_body( $response ) );
			return null;
		}
	}

	function rename_dropbox_folder( $old_path, $new_path ) {
		$access_token = $this->get_refresh_token();
		if ( ! $access_token ) {
			error_log( 'Failed to get access token' );
			return false; // indicate failure
		}

		$move_url    = 'https://api.dropboxapi.com/2/files/move_v2';
		$move_params = json_encode(
			array(
				'from_path'  => $old_path,
				'to_path'    => $new_path,
				'autorename' => true,
			)
		);

		$response = wp_remote_post(
			$move_url,
			array(
				'method'  => 'POST',
				'body'    => $move_params,
				'headers' => array(
					'Authorization' => 'Bearer ' . $access_token,
					'Content-Type'  => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error moving folder: ' . $response->get_error_message() );
			return false; // indicate failure
		}

		$response_body = wp_remote_retrieve_body( $response );
		$move_data     = json_decode( $response_body, true );

		if ( isset( $move_data['metadata'] ) ) {
			// Folder moved successfully
			return true; // indicate success
		} else {
			error_log( 'Failed to move folder. Response: ' . $response_body );
			return false; // indicate failure
		}
	}


	public function get_access_token() {
		$clientId     = get_field( 'dropbox_app_key', 'option' );
		$clientSecret = get_field( 'dropbox_secret_key', 'option' );
		$redirectUri  = get_field( 'dropbox_redirect_url', 'option' );
		$url          = 'https://api.dropboxapi.com/oauth2/token';
		$params       = array(
			'code'          => $_GET['code'],
			'grant_type'    => 'authorization_code',
			'client_id'     => $clientId,
			'client_secret' => $clientSecret,
			'redirect_uri'  => $redirectUri,
		);
		$response     = wp_remote_post( $url, array( 'body' => $params ) );
		if ( is_wp_error( $response ) ) {
			// Handle error
			return null;
		}
		$body = wp_remote_retrieve_body( $response );
		$data = $body ? json_decode( $body, true ) : null;

		return array(
			'access_token'  => $data['access_token'] ?? null,
			'refresh_token' => $data['refresh_token'] ?? null,
		);
	}

	public function exchangeAuthorizationCodeForAccessToken( $authorizationCode ) {
		$clientId     = get_field( 'dropbox_app_key', 'option' );
		$clientSecret = get_field( 'dropbox_secret_key', 'option' );
		$redirectUri  = get_field( 'dropbox_redirect_url', 'option' );
		$url          = 'https://api.dropboxapi.com/oauth2/token';
		$params       = array(
			'code'          => $authorizationCode,
			'grant_type'    => 'authorization_code',
			'client_id'     => $clientId,
			'client_secret' => $clientSecret,
			'redirect_uri'  => $redirectUri,
		);
		$response     = wp_remote_post( $url, array( 'body' => $params ) );
		if ( is_wp_error( $response ) ) {
			// Handle error
			return null;
		}
		$body = wp_remote_retrieve_body( $response );
		$data = $body ? json_decode( $body, true ) : null;
		return array(
			'access_token'  => $data['access_token'] ?? null,
			'refresh_token' => $data['refresh_token'] ?? null,
		);
	}
}
