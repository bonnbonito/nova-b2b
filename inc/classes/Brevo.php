<?php

namespace NOVA_B2B\Inc\Classes;

class Brevo {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	private $brevo_api;
	private $brevo_list_id;
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
		$this->brevo_api     = get_field( 'brevo_api', 'option' ) ?: '';
		$this->brevo_list_id = 43;
		add_action( 'nova_user_partner_approved', array( $this, 'add_to_brevo_list' ) );
	}

	public function check_user_info() {
		$all_meta_for_user = get_userdata( get_current_user_id() );
		$meta              = get_user_meta( get_current_user_id() );
		echo '<pre>';
		print_r( $all_meta_for_user->user_email );
		echo '</pre>';
		echo '<pre>';
		print_r( $meta );
		echo '</pre>';
	}

	public function add_to_brevo_list( $user ) {
		$user_id    = $user->ID;
		$user       = get_userdata( $user_id );
		$user_meta  = get_user_meta( $user_id );
		$email      = $user->user_email;
		$first_name = $user_meta['first_name'][0];
		$last_name  = $user_meta['last_name'][0];
		$company    = $user_meta['business_name'][0];

		$curl = curl_init();

		curl_setopt_array(
			$curl,
			array(
				CURLOPT_URL            => 'https://api.brevo.com/v3/contacts',
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING       => '',
				CURLOPT_MAXREDIRS      => 10,
				CURLOPT_TIMEOUT        => 30,
				CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST  => 'POST',
				CURLOPT_POSTFIELDS     => json_encode(
					array(
						'email'            => $email,
						'ext_id'           => 'novaUser' . $user->ID,
						'attributes'       => array(
							'FIRSTNAME' => $first_name,
							'LASTNAME'  => $last_name,
							'COMPANY'   => $company,
						),
						'emailBlacklisted' => false,
						'smsBlacklisted'   => false,
						'listIds'          => array(
							$this->brevo_list_id,
						),
					)
				),
				CURLOPT_HTTPHEADER     => array(
					'accept: application/json',
					'api-key: ' . $this->brevo_api,
					'content-type: application/json',
				),
			)
		);

		$response = curl_exec( $curl );
		$err      = curl_error( $curl );

		curl_close( $curl );

		$logger = new \WC_Logger();

		if ( $err ) {
			$logger->error( 'cURL Error #: ' . $err . ' for user ID: ' . $user_id, array( 'source' => 'brevo_api' ) );
		} else {
			$logger->info( 'Brevo API Response for user ID ' . $user_id . ': ' . $response, array( 'source' => 'brevo_api' ) );
		}
	}
}

Brevo::get_instance();
