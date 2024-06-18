<?php

namespace NOVA_B2B;

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
		add_action( 'show_user_profile', array( $this, 'zoho_account_id' ) );
		add_action( 'edit_user_profile', array( $this, 'zoho_account_id' ) );
		add_action( 'personal_options_update', array( $this, 'save_lead_id_field' ) );
		add_action( 'edit_user_profile_update', array( $this, 'save_lead_id_field' ) );
		add_action( 'nova_user_partner_approved', array( $this, 'user_add_to_zoho' ), 20 );
		add_action( 'wp_ajax_generate_zoho_id', array( $this, 'generate_zoho_id' ) );
		// add_action( 'wp_ajax_generate_zoho_id', array( $this, 'custom_output' ) );
		add_action( 'woocommerce_thankyou', array( $this, 'send_order_to_zoho_crm' ), 10, 1 );
	}

	public function nova_singnage_details( $product_id ) {
		ob_start();
		$signage = get_post_meta( $product_id, 'signage', true );
		?>
<p>Product: <?php echo get_post_meta( $product_id, 'product', true ); ?></p>
<strong>Projects</strong>
		<?php
			echo '<ul>';
		foreach ( $signage as $project ) {
			$projectArray = get_object_vars( $project );

			// Check and print the title first
			if ( isset( $projectArray['title'] ) && ! empty( $projectArray['title'] ) ) {
				echo '<li><strong>Title: ' . $projectArray['title'] . '</strong></li>';
				unset( $projectArray['title'] ); // Remove the title so it's not printed again
			}

			unset( $projectArray['id'] );

			// Iterate over the rest of the project details
			foreach ( $projectArray as $key => $value ) {
				// Convert nested objects to a readable format
				if ( is_object( $value ) ) {
					$value = get_object_vars( $value );
					// Create a sub-list for nested objects
					$valueText = '<ul>';
					foreach ( $value as $subKey => $subValue ) {
						$valueText .= '<li>' . ucfirst( $subKey ) . ': ' . $subValue . '</li>';
					}
					$valueText .= '</ul>';
					$value      = $valueText;
				} elseif ( ! empty( $value ) ) {
					$value = htmlspecialchars( $value, ENT_QUOTES, 'UTF-8' );
				}

				// Print the rest of the details
				if ( ! empty( $value ) ) {
					echo '<li>' . ucfirst( $key ) . ': ' . $value . '</li>';
				}
			}
		}
			echo '</ul>';

			return ob_get_clean();
	}

	public function get_zoho_product_id( $product_id ) {

		$product = wc_get_product( $product_id );

		$access_token = $this->get_zoho_access_token();

		$nova_product_id = $product_id;
		$search_url      = 'https://www.zohoapis.com/crm/v2/Products/search?criteria=(Nova_Product_ID:equals:' . $nova_product_id . ')';
		$search_headers  = array( 'Authorization' => 'Zoho-oauthtoken ' . $access_token );

		$search_response = wp_remote_get( $search_url, array( 'headers' => $search_headers ) );
		$search_body     = json_decode( wp_remote_retrieve_body( $search_response ), true );

		if ( ! empty( $search_body['data'] ) ) {
			return $search_body['data'][0]['id'];

		} else {
			$api_url = 'https://www.zohoapis.com/crm/v2/Products';

			$product_data = array(
				'Product_Name'      => $product->get_name(),
				'Nova_Product_ID'   => strval( $nova_product_id ),
				'Unit_Price'        => $product->get_regular_price(),
				'Product_Edit_Link' => admin_url( 'post.php?post=' . $product_id . '&action=edit' ),
				'Description'       => $product->get_description(),
			);

			$headers = array(
				'Authorization' => 'Zoho-oauthtoken ' . $access_token,
				'Content-Type'  => 'application/json',
			);

			$body     = json_encode( array( 'data' => array( $product_data ) ) );
			$response = wp_remote_post(
				$api_url,
				array(
					'headers'     => $headers,
					'body'        => $body,
					'method'      => 'POST',
					'data_format' => 'body',
				)
			);

			$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

			$response_string = print_r( $response, true );

			$this->log_to_file( "Response Product Add: {$response_string}" );

			if ( isset( $response_body['data'][0]['details']['id'] ) ) {
				// Product added to Zoho CRM successfully, return the new Zoho product ID.
				$this->log_to_file( "Product Added: {$response_body['data'][0]['details']['id']}" );
				return $response_body['data'][0]['details']['id'];
			} else {
				// Handle errors or unsuccessful attempts to add the product
				return null;
			}
		}
	}


	public function custom_output() {
		$order = wc_get_order( 1506 );

		foreach ( $order->get_items() as $item_id => $item ) {
			$product_id = $item->get_id();

			$id = $this->get_zoho_product_id( $product_id );

			$status['zoho_id'][] = $id;

		}

		wp_send_json( $status );
	}

	public function save_lead_id_field( $user_id ) {
		// Check for the current user's permissions
		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return false;
		}

		// Update user meta field
		if ( isset( $_POST['zoho_account_id'] ) && ! empty( $_POST['zoho_account_id'] ) ) {
			update_user_meta( $user_id, 'zoho_account_id', $_POST['zoho_account_id'] );
		}
	}

	public function zoho_account_id( $user ) {
		if ( in_array( 'partner', (array) $user->roles ) ) {
			?>
<h3>ZOHO CRM</h3>
<table class="form-table">
	<tr>
		<th><label for="zoho_account_id">Zoho Account ID</label></th>
		<td>
			<input readonly type="text" name="zoho_account_id" id="zoho_account_id"
				value="<?php echo esc_attr( get_user_meta( $user->ID, 'zoho_account_id', true ) ); ?>"
				class="regular-text" /><br />
			<span class="description">This is the user's Account ID from Zoho CRM</span>
		</td>
	</tr>
	<tr>
		<th><label for="generate_zoho_id">Generate Zoho Account ID</label></th>
		<td>
			<button type="button" class="button-primary" id="generate_zoho_id">Generate</button>
		</td>
	</tr>
</table>
<script>
const generateZohoId = document.getElementById("generate_zoho_id");
generateZohoId.addEventListener("click", e => {

	e.preventDefault();

	let isConfirmed = confirm("Are you sure you want to generate a new Account ID?");

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
			if (data.zoho_account_id) {
				document.getElementById('zoho_account_id').value = data.zoho_account_id;
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

		$business_id = get_field( 'business_id', 'user_' . $user_id );

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
			'Account_Name'    => get_field( 'business_id', 'user_' . $user_id ),
			'Website'         => get_field( 'business_website', 'user_' . $user_id ),
			'Phone'           => $user->billing_phone,
			'Billing_City'    => $user->billing_city,
			'Billing_Street'  => $user->billing_address_1 . ' ' . $user->billing_address_2,
			'Billing_State'   => $user->billing_state,
			'Billing_Code'    => $user->billing_postcode,
			'Billing_Country' => $user->billing_country,
			'Nova_User_ID'    => strval( $user_id ),
		);

		$access_token = $this->get_zoho_access_token();

		// Search for an existing lead by email
		$search_url     = 'https://www.zohoapis.com/crm/v2/Accounts/search?criteria=(Account_Name:equals:' . $business_id . ')';
		$search_headers = array(
			'Authorization' => 'Zoho-oauthtoken ' . $access_token,
		);

		$search_response = wp_remote_get( $search_url, array( 'headers' => $search_headers ) );

		if ( is_wp_error( $search_response ) ) {
			$error_message           = $search_response->get_error_message();
			$status['error_message'] = $error_message;
			$this->log_to_file( "Error during search: {$error_message}" );
		}

		$search_body = json_decode( wp_remote_retrieve_body( $search_response ), true );
		if ( ! empty( $search_body['data'] ) ) {
			// Lead already exists, fetch the existing Account ID
			$zoho_account_id         = $search_body['data'][0]['id'];
			$status['error_message'] = 'Account already exists in Zoho CRM. Account ID: ' . $zoho_account_id;

			$this->log_to_file( "Account already exists. Zoho Account ID: {$zoho_account_id}" );

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

				$this->log_to_file( "Error during lead creation: {$error_message}" );
			}

			$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

			$response_string = print_r( $response, true );

			$this->log_to_file( "Response: {$response_string}" );

			if ( isset( $response_body['data'][0]['details']['id'] ) ) {
				$zoho_account_id = $response_body['data'][0]['details']['id'];

				update_user_meta( $user_id, 'zoho_account_id', $zoho_account_id );

				$status['success_message'] = 'New contact added to Zoho CRM successfully. Contact ID: ' . $zoho_account_id;
				$status['status']          = 'success';

				$this->log_to_file( "New contact added to Zoho CRM. Contact ID: {$zoho_account_id}" );

			} else {
				$status['error_message'] = 'Failed to add new contact to Zoho CRM.';
				$this->log_to_file( 'Failed to add new contact to Zoho CRM.' );
			}
		}

		if ( isset( $zoho_account_id ) ) {
			$status['zoho_account_id'] = $zoho_account_id;
		}

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
			// echo 'Generate ZOHO refresh token first';
			return false;
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
			return $result['access_token'] ?? false;
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

		}
	}

	public function user_add_to_zoho( $user ) {
		$user_id = $user->ID;

		$this->log_to_file( "Adding to zoho User ID: {$user_id}" );

		$zoho_account_id = $this->get_user_zoho_id( $user_id );

		if ( ! isset( $zoho_account_id ) ) {
			$zoho_account_id = 'undefined';
		}

		$this->log_to_file( "Result: {$zoho_account_id}" );
	}

	public function send_order_to_zoho_crm( $order_id ) {
		if ( ! $order_id ) {
			return null;
		}

		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return null;
		}

		$access_token = $this->get_zoho_access_token();

		if ( ! $access_token ) {
			return null;
		}

		// Search for an existing sales order with the Order_Number matching $order_id
		$search_url     = 'https://www.zohoapis.com/crm/v2/Sales_Orders/search?criteria=(Order_Number:equals:' . $order_id . ')';
		$search_headers = array(
			'Authorization' => 'Zoho-oauthtoken ' . $access_token,
		);

		$search_response = wp_remote_get( $search_url, array( 'headers' => $search_headers ) );
		$search_body     = json_decode( wp_remote_retrieve_body( $search_response ), true );

		if ( ! empty( $search_body['data'] ) ) {
			$existing_sales_order_id = $search_body['data'][0]['id'];
			$this->log_to_file( "An existing sales order with Order_Number $order_id was found. Sales Order ID: $existing_sales_order_id" );
			update_post_meta( $order_id, 'zoho_order_id', $existing_sales_order_id );
			return $existing_sales_order_id;
		}

		$sales_order_data = $this->prepare_zoho_order_data( $order_id );

		$api_url = 'https://www.zohoapis.com/crm/v2/Sales_Orders';
		$headers = array(
			'Authorization' => 'Zoho-oauthtoken ' . $access_token,
			'Content-Type'  => 'application/json',
		);
		$body    = json_encode( array( 'data' => array( $sales_order_data ) ) );

		$response = wp_remote_post(
			$api_url,
			array(
				'headers'     => $headers,
				'body'        => $body,
				'method'      => 'POST',
				'data_format' => 'body',
			)
		);

		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( isset( $response_body['data'][0]['details']['id'] ) ) {
			$new_sales_order_id = $response_body['data'][0]['details']['id'];
			$this->log_to_file( "New sales order created with ID: $new_sales_order_id" );
			update_post_meta( $order_id, 'zoho_order_id', $new_sales_order_id );
			return $new_sales_order_id;
		} else {
			$this->log_to_file( "Failed to create a new sales order from order $order_id." );
			return null;
		}
	}


	function prepare_zoho_order_data( $order_id ) {
		$order = wc_get_order( $order_id );

		if ( ! $order ) {
			return;
		}

		$items = array();

		foreach ( $order->get_items() as $item_id => $item ) {
			$product = $item->get_product();

			$zoho_product_id = $this->get_zoho_product_id( $product->get_id() );

			$items[] = array(
				'product'      => array(
					'id' => $zoho_product_id,
				),
				'product_code' => $product->get_id(),
				'quantity'     => $item->get_quantity(),
				'list_price'   => floatval( $product->get_price() ),
				'total'        => $item->get_total(),
			);
		}

		// Retrieve the customer ID associated with the order
		$customer_id = $order->get_customer_id();

		// Use the customer ID to get the user's 'zoho_account_id' ACF field value
		$zoho_account_id = get_field( 'zoho_account_id', 'user_' . $customer_id );

		// Ensure there's a valid Zoho Account ID
		if ( ! $zoho_account_id ) {
			$zoho_account_id = $this->get_user_zoho_id( $customer_id );

			if ( ! $zoho_account_id ) {
				return;
			}
		}

		return array(
			'Subject'         => 'Order #' . $order->get_order_number(),
			'Account_Name'    => array(
				'id' => $zoho_account_id,
			),
			'Product_Details' => $items,
			'Order_Number'    => strval( $order->get_order_number() ),
		);
	}

	public function log_to_file( $message ) {
		$log_file     = WP_CONTENT_DIR . '/zoho-logs/zoho_crm_log.txt'; // Specify the log file path
		$current_time = current_time( 'Y-m-d H:i:s' );
		$log_message  = "{$current_time} - {$message}\n";

		// Check if directory exists, if not create it
		$log_dir = dirname( $log_file );
		if ( ! file_exists( $log_dir ) ) {
			wp_mkdir_p( $log_dir );
		}

		// Append the message to the log file
		file_put_contents( $log_file, $log_message, FILE_APPEND );
	}
}
