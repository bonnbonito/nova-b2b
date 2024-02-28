<?php

namespace NOVA_B2B\Inc\Classes;

class Zoho {
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

		if ( function_exists( 'acf_add_options_page' ) ) {
			add_action( 'init', array( $this, 'add_options_page' ) );
		}
		add_action( 'admin_menu', array( $this, 'zoho_crm_connector_menu' ) );
		add_action( 'show_user_profile', array( $this, 'zoho_contact_id' ) );
		add_action( 'edit_user_profile', array( $this, 'zoho_contact_id' ) );
		add_action( 'personal_options_update', array( $this, 'save_lead_id_field' ) );
		add_action( 'edit_user_profile_update', array( $this, 'save_lead_id_field' ) );
		add_action( 'nova_user_partner_approved', array( $this, 'user_add_to_zoho' ) );
		add_action( 'wp_ajax_generate_zoho_id', array( $this, 'generate_zoho_id' ) );
	}

	public function save_lead_id_field( $user_id ) {
		// Check for the current user's permissions
		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return false;
		}

		// Update user meta field
		update_user_meta( $user_id, 'zoho_contact_id', $_POST['zoho_contact_id'] );
	}

	public function zoho_contact_id( $user ) {
		if ( in_array( 'partner', (array) $user->roles ) ) {
			?>
<h3>ZOHO CRM</h3>

<table class="form-table">
	<tr>
		<th><label for="zoho_contact_id">Zoho Lead ID</label></th>
		<td>
			<input readonly type="text" name="zoho_contact_id" id="zoho_contact_id"
				value="<?php echo esc_attr( get_user_meta( $user->ID, 'zoho_contact_id', true ) ); ?>"
				class="regular-text" /><br />
			<span class="description">This is the user's Lead ID from Zoho CRM</span>
		</td>
	</tr>
	<tr>
		<th><label for="generate_zoho_id">Generate Zoho Lead ID</label></th>
		<td>
			<button type="button" class="button-primary" id="generate_zoho_id">Generate</button>
		</td>
	</tr>
</table>
<script>
const generateZohoId = document.getElementById("generate_zoho_id");
generateZohoId.addEventListener("click", e => {

	e.preventDefault();

	let isConfirmed = confirm("Are you sure you want to generate a new Lead ID?");

	if (!isConfirmed) return;

	generateZohoId.disabled = true;
	generateZohoId.textContent = 'Please wait...';

	let formData = new FormData();
	formData.append('action', 'generate_zoho_id');
	formData.append('user', userProfileL10n.user_id);

	fetch(wp.ajax.settings.url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			generateZohoId.style.display = 'none';
			if (data.zoho_contact_id) {
				document.getElementById('zoho_contact_id').value = data.zoho_contact_id;
			}
		})
		.catch((error) => console.error('Error:', error))
});
</script>
			<?php
		}
	}

	public function get_user_zoho_id( $user_id ) {

		$user = get_userdata( $user_id );

		$status = array(
			'status' => 'error',
		);

		$lead_data = array(
			'First_Name'  => $user->first_name,
			'Last_Name'   => $user->last_name,
			'Email'       => $user->user_email,
			'Company'     => $user->billing_company,
			'City'        => $user->billing_city,
			'Street'      => $user->billing_address_1 . ' ' . $user->billing_address_2,
			'State'       => $user->billing_state,
			'Zip'         => $user->billing_postcode,
			'Country'     => $user->billing_country,
			'Phone'       => $user->billing_phone,
			'Website'     => get_field( 'business_website', 'user_' . $user->ID ),
			'Lead_Source' => 'Nova Website',
		);

		$account_data = array(
			'Account_Name'    => $user->billing_company, // Name of the account (typically the company name)
			'Website'         => get_field( 'business_website', 'user_' . $user_id ), // Assuming you are using ACF to store extra user meta
			'Phone'           => $user->billing_phone,
			'Billing_City'    => $user->billing_city,
			'Billing_Street'  => $user->billing_address_1 . ' ' . $user->billing_address_2,
			'Billing_State'   => $user->billing_state,
			'Billing_Code'    => $user->billing_postcode,
			'Billing_Country' => $user->billing_country,
			'Nova_User_ID'    => $user_id,
		);

		$access_token = $this->get_zoho_access_token();

		// Search for an existing lead by email
		$search_url     = 'https://www.zohoapis.com/crm/v2/Accounts/search?criteria=(Email:equals:' . $user->user_email . ')';
		$search_headers = array(
			'Authorization' => 'Zoho-oauthtoken ' . $access_token,
		);

		$search_response = wp_remote_get( $search_url, array( 'headers' => $search_headers ) );

		if ( is_wp_error( $search_response ) ) {
			$error_message           = $search_response->get_error_message();
			$status['error_message'] = $error_message;
		}

		$search_body = json_decode( wp_remote_retrieve_body( $search_response ), true );
		if ( ! empty( $search_body['data'] ) ) {
			// Lead already exists, fetch the existing Lead ID
			$zoho_contact_id         = $search_body['data'][0]['id'];
			$status['error_message'] = 'Lead already exists in Zoho CRM. Lead ID: ' . $zoho_contact_id;
		} else {
			// Lead does not exist, proceed to create a new one
			$zoho_crm_api_url = 'https://www.zohoapis.com/crm/v2/Accounts';
			$headers          = array(
				'Authorization' => 'Zoho-oauthtoken ' . $access_token,
				'Content-Type'  => 'application/json',
			);

			$body = json_encode( array( 'data' => array( $account_data ) ) );

			$response = wp_remote_post(
				$zoho_crm_api_url,
				array(
					'headers'     => $headers,
					'body'        => $body,
					'method'      => 'POST',
					'data_format' => 'body',
				)
			);

			if ( is_wp_error( $response ) ) {
				$error_message           = $response->get_error_message();
				$status['error_message'] = $error_message;
			}

			$response_body = json_decode( wp_remote_retrieve_body( $response ), true );
			if ( isset( $response_body['data'][0]['details']['id'] ) ) {
				$zoho_contact_id = $response_body['data'][0]['details']['id'];

				update_user_meta( $user_id, 'zoho_contact_id', $zoho_contact_id );

				$status['success_message'] = 'New contact added to Zoho CRM successfully. Contact ID: ' . $zoho_contact_id;
				$status['status']          = 'success';

			} else {
				$status['error_message'] = 'Failed to add new contact to Zoho CRM.';
			}
		}
		$status['zoho_contact_id'] = $zoho_contact_id;

		return $status;
	}

	public function get_zoho_account_id( $user_id, $access_token ) {
		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return 'Error: User not found.';
		}

		$account_data = array(
			'Account_Name'    => $user->billing_company, // Ensure this field is populated correctly in WordPress.
			'Website'         => get_field( 'business_website', 'user_' . $user_id ), // Assuming ACF for custom fields.
			'Phone'           => $user->billing_phone,
			'Billing_City'    => $user->billing_city,
			'Billing_Street'  => $user->billing_address_1 . ' ' . $user->billing_address_2,
			'Billing_State'   => $user->billing_state,
			'Billing_Code'    => $user->billing_postcode,
			'Billing_Country' => $user->billing_country,
		);

		if ( ! $access_token ) {
			return 'Error: Unable to retrieve Zoho access token.';
		}

		// Adjust the search criteria according to your Zoho CRM configuration. Here, it searches by Account_Name.
		$search_url     = 'https://www.zohoapis.com/crm/v2/Accounts/search?criteria=(Account_Name:equals:' . urlencode( $user->billing_company ) . ')';
		$search_headers = array(
			'Authorization' => 'Zoho-oauthtoken ' . $access_token,
		);

		$search_response = wp_remote_get( $search_url, array( 'headers' => $search_headers ) );

		if ( is_wp_error( $search_response ) ) {
			return 'Error: ' . $search_response->get_error_message();
		}

		$search_body = json_decode( wp_remote_retrieve_body( $search_response ), true );

		if ( ! empty( $search_body['data'] ) ) {
			return $search_body['data'][0]['id'];
		} else {
			// Account does not exist, proceed to create a new one
			$zoho_crm_api_url = 'https://www.zohoapis.com/crm/v2/Accounts';
			$headers          = array(
				'Authorization' => 'Zoho-oauthtoken ' . $access_token,
				'Content-Type'  => 'application/json',
			);

			$body = json_encode( array( 'data' => array( $account_data ) ) );

			$response = wp_remote_post(
				$zoho_crm_api_url,
				array(
					'headers'     => $headers,
					'body'        => $body,
					'method'      => 'POST',
					'data_format' => 'body',
				)
			);

			if ( is_wp_error( $response ) ) {
				return 'Error: ' . $response->get_error_message();
			}

			$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

			if ( isset( $response_body['data'][0]['details']['id'] ) ) {
				$zoho_account_id = $response_body['data'][0]['details']['id'];

				// Optionally, store the Zoho Account ID in user meta for future reference.
				update_user_meta( $user_id, 'zoho_account_id', $zoho_account_id );

				return $zoho_account_id;
			} else {
				return 'Error: Failed to create a new account in Zoho CRM.';
			}
		}
	}


	public function generate_zoho_id() {

		$user_id = $_POST['user'];

		$status = $this->get_user_zoho_id( $user_id );

		wp_send_json( $status );
	}

	public function add_options_page() {

		acf_add_options_sub_page(
			array(
				'page_title'  => 'Zoho Settings',
				'menu_title'  => 'Zoho Connect',
				'parent_slug' => 'nova-options',
			)
		);
	}

	public function zoho_crm_connector_menu() {
		add_options_page(
			'Zoho CRM Connector Settings', // Page title
			'Zoho CRM Connector', // Menu title
			'edit_theme_options', // Capability
			'zoho-crm-connector', // Menu slug
			array( $this, 'zoho_crm_connector_settings_page' ) // Function to display the settings page
		);
	}

	public function zoho_crm_connector_settings_page() {
		// Check if the form has been submitted
		if ( isset( $_POST['zoho_crm_connector_submit'] ) ) {
			// Handle the form submission to get the access token and refresh token
			// Note: Ensure to implement proper validation and security measures here
			$client_id     = isset( $_POST['zoho_crm_client_id'] ) ? sanitize_text_field( $_POST['zoho_crm_client_id'] ) : '';
			$client_secret = isset( $_POST['zoho_crm_client_secret'] ) ? sanitize_text_field( $_POST['zoho_crm_client_secret'] ) : '';
			$redirect_uri  = isset( $_POST['zoho_crm_redirect_uri'] ) ? sanitize_text_field( $_POST['zoho_crm_redirect_uri'] ) : '';
			$code          = sanitize_text_field( $_POST['zoho_crm_code'] );

			update_option( 'zoho_crm_client_id', $client_id );
			update_option( 'zoho_crm_client_secret', $client_secret );
			update_option( 'zoho_crm_redirect_uri', $redirect_uri );

			// Implement the OAuth2 flow to exchange the code for an access token and refresh token
			// This is a simplified example; in practice, you should handle errors and edge cases
			$token_response = $this->zoho_crm_get_tokens( $client_id, $client_secret, $redirect_uri, $code );
			if ( ! empty( $token_response['refresh_token'] ) ) {
				// Save the refresh token in a WordPress option
				update_option( 'zoho_crm_refresh_token', $token_response['refresh_token'] );
				echo '<div class="updated"><p>Refresh token saved successfully.</p></div>';
			} else {
				echo '<div class="error"><p>Failed to retrieve the refresh token.</p></div>';
			}
		}

		// Settings form HTML
		?>
<div class="wrap">
	<h2>Zoho CRM Connector Settings</h2>
	<form method="post" action="">
		<table class="form-table">
			<tr valign="top">
				<th scope="row">Client ID</th>
				<td><input type="text" name="zoho_crm_client_id"
						value="<?php echo get_option( 'zoho_crm_client_id' ); ?>" />
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">Client Secret</th>
				<td><input type="text" name="zoho_crm_client_secret"
						value="<?php echo get_option( 'zoho_crm_client_secret' ); ?>" /></td>
			</tr>
			<tr valign="top">
				<th scope="row">Redirect URI</th>
				<td><input type="text" name="zoho_crm_redirect_uri"
						value="<?php echo get_option( 'zoho_crm_redirect_uri' ); ?>" /></td>
			</tr>
			<tr valign="top">
				<th scope="row">Code</th>
				<td><input type="text" name="zoho_crm_code" value="" /></td>
			</tr>
		</table>
		<input type="submit" name="zoho_crm_connector_submit" value="Get Refresh Token" class="button-primary" />
	</form>
		<?php if ( get_option( 'zoho_crm_refresh_token' ) ) : ?>
	<h2>Refresh Token</h2>
	<p><?php echo esc_attr( get_option( 'zoho_crm_refresh_token' ) ); ?></p>
	<?php endif; ?>

</div>
		<?php
	}

	public function zoho_crm_get_tokens( $client_id, $client_secret, $redirect_uri, $code ) {
		$token_url = 'https://accounts.zoho.com/oauth/v2/token';
		$body      = array(
			'code'          => $code,
			'redirect_uri'  => $redirect_uri,
			'client_id'     => $client_id,
			'client_secret' => $client_secret,
			'grant_type'    => 'authorization_code',
		);

		$response = wp_remote_post(
			$token_url,
			array(
				'body'        => $body,
				'method'      => 'POST',
				'data_format' => 'body',
				'timeout'     => 45,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(); // Error handling here
		}

		$body = wp_remote_retrieve_body( $response );
		return json_decode( $body, true );
	}

	public function get_zoho_access_token() {

		if ( get_option( 'zoho_crm_refresh_token' ) == '' ) {
			echo 'Generate ZOHO refresh token first';
		} else {

			$token_url = 'https://accounts.zoho.com/oauth/v2/token';
			$body      = array(
				'refresh_token' => get_option( 'zoho_crm_refresh_token' ),
				'client_id'     => get_option( 'zoho_crm_client_id' ),
				'client_secret' => get_option( 'zoho_crm_client_secret' ),
				'grant_type'    => 'refresh_token',
			);

			$response = wp_remote_post(
				$token_url,
				array(
					'body'        => $body,
					'method'      => 'POST',
					'data_format' => 'body',
					'timeout'     => 65,
				)
			);

			if ( is_wp_error( $response ) ) {
				return array(); // Error handling here
			}

			$body   = wp_remote_retrieve_body( $response );
			$result = json_decode( $body, true );
			return $result['access_token'];
		}
	}

	public function add_partners_to_zoho_crm() {
		$users = get_users( array( 'role' => 'partner' ) );

		foreach ( $users as $user ) {

			$user_data = array(
				'First_Name'  => $user->first_name,
				'Last_Name'   => $user->last_name,
				'Email'       => $user->user_email,
				'Company'     => $user->billing_company,
				'City'        => $user->billing_city,
				'Street'      => $user->billing_address_1 . ' ' . $user->billing_address_2,
				'State'       => $user->billing_state,
				'Zip'         => $user->billing_postcode,
				'Country'     => $user->billing_country,
				'Phone'       => $user->billing_phone,
				'Website'     => get_field( 'business_website', 'user_' . $user->ID ),
				'Lead_Source' => 'Nova Website',
			);

			echo '<pre>';
			print_r( $user_data );
			echo '</pre>';

		}
	}

	public function user_add_to_zoho( $user ) {
		$user_id = $user->ID;

		$this->get_user_zoho_id( $user_id );
	}
}

Zoho::get_instance();
