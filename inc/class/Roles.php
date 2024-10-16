<?php
namespace NOVA_B2B;

use WP_User;
use WP_Error;
use WC;
use function get_field;
use function update_field;
use function rand;

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

	private $streak_api;

	public function __construct() {
		add_action( 'init', array( $this, 'create_roles' ) );
		add_action( 'after_setup_theme', array( $this, 'create_custom_table' ) );
		add_action( 'wp_ajax_nopriv_nova_signup', array( $this, 'nova_signup' ) );
		add_action( 'wp_ajax_nopriv_nova_login', array( $this, 'nova_login' ) );
		add_action( 'wp_ajax_nopriv_send_activation', array( $this, 'send_activation' ) );
		add_action( 'template_redirect', array( $this, 'custom_activation_page_redirect' ) );
		add_action( 'admin_menu', array( $this, 'add_pending_users_count_bubble' ) );
		add_filter( 'wp_authenticate_user', array( $this, 'custom_role_login_check' ), 10, 2 );
		add_action( 'nova_activated', array( $this, 'user_activation' ), 10, 1 );
		add_filter( 'manage_users_columns', array( $this, 'add_business_id_column' ), 20, 1 );
		add_filter( 'manage_users_columns', array( $this, 'add_registration_business_name_column' ) );
		add_action( 'manage_users_custom_column', array( $this, 'business_id_user_column' ), 10, 3 );
		add_filter( 'manage_users_sortable_columns', array( $this, 'make_business_id_column_sortable' ) );
		add_filter( 'manage_users_sortable_columns', array( $this, 'user_id_column_sortable' ) );
		add_filter( 'manage_users_custom_column', array( $this, 'show_registration_date_business_name_column_content' ), 11, 3 );
		add_action( 'pre_get_users', array( $this, 'sort_by_business_id_column' ) );
		add_action( 'set_user_role', array( $this, 'notify_user_approved_partner' ), 13, 3 );
		add_action( 'set_user_role', array( $this, 'update_role_business_id' ), 40, 3 );
		add_action( 'set_user_role', array( $this, 'log_role_change' ), 10, 3 );
		add_action( 'admin_footer', array( $this, 'move_row_actions_js' ) );
		add_action( 'pre_get_users', array( $this, 'sort_users_by_user_id' ) );
		add_action( 'pre_user_query', array( $this, 'custom_user_search_business_id' ) );
		add_action( 'profile_update', array( $this, 'update_role_business_id_on_profile_update' ), 10, 2 );
		add_action( 'show_user_profile', array( $this, 'add_registration_date_to_profile' ), 0 );
		add_action( 'edit_user_profile', array( $this, 'add_registration_date_to_profile' ), 0 );
		add_action( 'edit_user_profile', array( $this, 'add_activate_button' ), 0 );
		add_action( 'wp_ajax_send_activation_email', array( $this, 'handle_send_activation_email' ) );
		add_action( 'admin_notices', array( $this, 'display_send_activation_email_notice' ) );
		add_action( 'kadence_header', array( $this, 'remove_multicurrency' ) );
		add_action( 'rest_api_init', array( $this, 'rest_show_all_business_id' ) );

		if ( function_exists( 'get_field' ) ) {
			$this->streak_api = get_field( 'streak_api', 'option' ) ?? null;
		} else {
			$this->streak_api = null;
		}

		add_filter( 'user_contactmethods', array( $this, 'add_contact_methods' ), 10, 2 );
		add_action( 'personal_options_update', array( $this, 'save_additional_billing_email_field' ) );
		add_action( 'edit_user_profile_update', array( $this, 'save_additional_billing_email_field' ) );
	}

	public function add_contact_methods( $contact_methods, $user ) {
		$contact_methods['additional_order_email']   = __( 'Order Email', 'nova' );
		$contact_methods['additional_billing_email'] = __( 'Billing Email', 'nova' );
		return $contact_methods;
	}

	public function save_additional_billing_email_field( $user_id ) {
		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return false;
		}
		if ( isset( $_POST['additional_order_email'] ) ) {
			update_user_meta( $user_id, 'additional_order_email', sanitize_email( $_POST['additional_order_email'] ) );
		}
		if ( isset( $_POST['additional_billing_email'] ) ) {
			update_user_meta( $user_id, 'additional_billing_email', sanitize_email( $_POST['additional_billing_email'] ) );
		}
	}

	public function get_streak_api() {
		return $this->streak_api;
	}

	public function rest_show_all_business_id() {
		register_rest_route(
			'nova/v1',
			'/show-all-business-id/',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_show_all_business_id' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'nova/v1',
			'/businessId/(?P<email>[^\/]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_find_business_id' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'nova/v1',
			'/businessIdfromId/(?P<id>[^\/]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_find_business_id_from_id' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'nova/v1',
			'/streakBox/(?P<id>[\w-]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_streak_box' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public function handle_find_business_id_from_id( \WP_REST_Request $request ) {
		$id = $request['id'];

		$business_id = get_user_meta( $id, 'business_id', true );

		if ( $business_id ) {
			return new \WP_REST_Response(
				array(
					'business_id' => $business_id,
				)
			);
		} else {
			return new \WP_REST_Response(
				array(
					'message' => 'Business ID not found for the given id.',
				),
				404
			);
		}
	}

	public function handle_test( \WP_REST_Request $request ) {
		$id = $request['email'];
		return $id;
	}

	public function handle_find_business_id( \WP_REST_Request $request ) {
		$email = $request['email'];

		$users = get_users( array( 'role' => 'partner' ) );

		foreach ( $users as $user ) {

			$country = get_user_meta( $user->ID, 'billing_country', true ) ? get_user_meta( $user->ID, 'billing_country', true ) : 'NONE';

			if ( $country == 'CA' ) {
				$country = 'CAN';
			} elseif ( $country == 'US' ) {
				$country = 'USA';
			}

			$employee_emails = get_user_meta( $user->ID, 'employee_emails', true );
			$emails_array    = $employee_emails ? explode( ',', str_replace( ' ', '', trim( $employee_emails ) ) ) : array();
			$emails_array[]  = $user->user_email;
			$emails_array    = array_map( 'strtolower', $emails_array );
			$emails          = array_unique( $emails_array );
			$results[]       = array(
				'user_id'     => $user->ID,
				'label'       => get_user_meta( $user->ID, 'business_id', true ) . ' - ' . get_user_meta( $user->ID, 'business_name', true ),
				'business_id' => get_user_meta( $user->ID, 'business_id', true ),
				'emails'      => $emails,
				'country'     => $country,
			);
		}

		foreach ( $results as $result ) {
			if ( in_array( $email, $result['emails'] ) ) {
				return new \WP_REST_Response(
					$result,
					200
				);
			}
		}

		// If the email was not found, return an appropriate message
		return new \WP_REST_Response(
			array(
				'message' => 'Business ID not found for the given email.',
			),
			404
		);
	}

	public function handle_streak_box( \WP_REST_Request $request ) {
		$id = $request['id'];

		$curl = curl_init();

		curl_setopt_array(
			$curl,
			array(
				CURLOPT_URL            => 'https://api.streak.com/api/v1/boxes/' . $id,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING       => '',
				CURLOPT_MAXREDIRS      => 10,
				CURLOPT_TIMEOUT        => 30,
				CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST  => 'GET',
				CURLOPT_HTTPHEADER     => array(
					'Content-Type: application/json',
					'accept: application/json',
					'authorization: Basic ' . $this->streak_api,
				),
			)
		);

		$response = curl_exec( $curl );
		$err      = curl_error( $curl );

		curl_close( $curl );

		if ( $err ) {
			return new \WP_REST_Response(
				array(
					'error' => 'cURL Error #: ' . $err,
				),
				500
			);
		} else {
			$decoded_response = json_decode( $response, true );

			// Check if the JSON decoding was successful
			if ( json_last_error() !== JSON_ERROR_NONE ) {
				return new \WP_REST_Response(
					array(
						'error' => 'JSON Decode Error: ' . json_last_error_msg(),
					),
					500
				);
			}

			// Create a new post with the title as the ID and content as the response
			$post_id = wp_insert_post(
				array(
					'post_title'   => $id,
					'post_content' => wp_json_encode( $decoded_response, JSON_PRETTY_PRINT ),
					'post_status'  => 'publish',
					'post_type'    => 'post',
				)
			);

			if ( is_wp_error( $post_id ) ) {
				return new \WP_REST_Response(
					array(
						'error' => $post_id->get_error_message(),
					),
					500
				);
			}

			return new \WP_REST_Response(
				array(
					'success'  => true,
					'post_id'  => $post_id,
					'response' => $post_id,
				),
				200
			);
		}
	}

	public function handle_show_all_business_id( \WP_REST_Request $request ) {
		$users = get_users( array( 'role' => 'partner' ) );

		$results = array();

		foreach ( $users as $user ) {
			$employee_emails = get_user_meta( $user->ID, 'employee_emails', true );
			$emails_array    = $employee_emails ? explode( ',', str_replace( ' ', '', trim( $employee_emails ) ) ) : array();
			$emails_array[]  = $user->user_email;
			$emails          = array_unique( $emails_array );
			$results[]       = array(
				'user_id'     => $user->ID,
				'label'       => get_user_meta( $user->ID, 'business_id', true ) . ' - ' . get_user_meta( $user->ID, 'business_name', true ),
				'business_id' => get_user_meta( $user->ID, 'business_id', true ),
				'emails'      => $emails,
				'country'     => get_user_meta( $user->ID, 'billing_country', true ) ? get_user_meta( $user->ID, 'billing_country', true ) : 'NONE',
			);
		}

		return $results;
	}

	public function remove_multicurrency() {
		if ( ! is_user_logged_in() ) {
			remove_action( 'kadence_header_html', 'Kadence\header_html' );
		}
	}

	public function display_send_activation_email_notice() {
		// Check if the transient is set
		if ( $message = get_transient( 'send_activation_email_notice' ) ) {
			?>
<div class="notice notice-success is-dismissible">
	<p><?php echo esc_html( $message ); ?></p>
</div>
			<?php
			// Delete the transient
			delete_transient( 'send_activation_email_notice' );
		}
	}

	public function handle_send_activation_email() {
		check_ajax_referer( 'send_activation_email_nonce', 'nonce' );

		if ( isset( $_POST['user_id'] ) ) {
			$user_id = intval( $_POST['user_id'] );
			$user    = get_userdata( $user_id );

			// Check if the user has the 'temporary' role
			if ( in_array( 'temporary', (array) $user->roles ) ) {
				$this->send_user_activate_email( $user_id );
				wp_send_json_success( 'Activation email sent.' );
			} else {
				wp_send_json_error( 'User does not have the required role.' );
			}
		} else {
			wp_send_json_error( 'User ID not provided.' );
		}
	}

	public function add_activate_button( $user ) {
		// Check if the user has the 'temporary' role
		if ( in_array( 'temporary', (array) $user->roles ) ) {
			?>
<h2>Account Activation</h2>
<table class="form-table">
	<tr>
		<th>
			<label for="send_activation_email">Send Activation Email</label>
		</th>
		<td>
			<button id="send_activation_email_button" class="button button-primary"
				data-user-id="<?php echo esc_attr( $user->ID ); ?>">Send Activation Email</button>
			<span id="activation_email_status"></span>
		</td>
	</tr>
</table>
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function() {
	var sendEmailButton = document.getElementById('send_activation_email_button');
	var statusSpan = document.getElementById('activation_email_status');

	sendEmailButton.addEventListener('click', function() {
		var userId = sendEmailButton.getAttribute('data-user-id');
		statusSpan.textContent = 'Sending...';

		fetch(ajaxurl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					action: 'send_activation_email',
					user_id: userId,
					nonce: '<?php echo wp_create_nonce( 'send_activation_email_nonce' ); ?>',
				})
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					statusSpan.textContent = 'Activation email sent.';
					sendEmailButton.style.display = 'none';
				} else {
					statusSpan.textContent = 'Failed to send activation email.';
				}
			})
			.catch(error => {
				statusSpan.textContent = 'An error occurred.';
				console.error('Error:', error);
			});
	});
});
</script>
			<?php
		}
	}

	public function add_registration_date_to_profile( $user ) {
		?>
<h3>Registration Information</h3>
<table class="form-table" id="registration-info">
	<tr>
		<th><label for="registration_date">Registration Date</label></th>
		<td>
			<?php echo date( 'M d, Y', strtotime( $user->user_registered ) ); ?>
		</td>
	</tr>
</table>
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function() {
	var regInfo = document.getElementById('registration-info').closest('table');
	var personalOptions = document.querySelector('.user-rich-editing-wrap').closest('table');
	if (regInfo && personalOptions) {
		personalOptions.parentNode.insertBefore(regInfo, personalOptions);
	}
});
</script>
		<?php
	}

	public function show_registration_date_business_name_column_content( $value, $column_name, $user_id ) {
		if ( 'registration_date' == $column_name ) {
			$user  = get_userdata( $user_id );
			$value = $user->user_registered;
			return date( 'M d, Y', strtotime( $value ) );
		}
		if ( 'business_name' == $column_name ) {
			return get_field( 'business_name', 'user_' . $user_id );
		}
		return $value;
	}

	public function add_registration_business_name_column( $columns ) {
		$columns['business_name']     = 'Business Name';
		$columns['registration_date'] = 'Registration Date';
		return $columns;
	}

	public function custom_user_search_business_id( $user_query ) {
		global $wpdb;

		$search = '';
		if ( isset( $user_query->query_vars['search'] ) ) {
			// Remove the leading and trailing slashes added by WordPress
			$search = trim( $user_query->query_vars['search'], '*' );
		}
		if ( $search ) {
			$like_keyword = '%' . $wpdb->esc_like( $search ) . '%';

			// Prepare the query to search by user_login and meta_keys for business_id, first_name, and last_name
			$search_meta = $wpdb->prepare(
				"( {$wpdb->users}.user_login LIKE %s OR
              ID IN (
                  SELECT user_id FROM {$wpdb->usermeta}
                  WHERE ( meta_key = 'business_id' OR
                          meta_key = 'first_name' OR
						  meta_key = 'last_name' OR
						  meta_key = 'business_name' OR
						  meta_key = 'business_email' OR
						  meta_key = 'employee_emails' )
                  AND meta_value LIKE %s )
             )",
				$like_keyword, // For user_login
				$like_keyword  // For meta values
			);

			// Integrate the custom search into the existing WHERE clause
			$user_query->query_where = str_replace(
				'WHERE 1=1 AND (',
				'WHERE 1=1 AND (' . $search_meta . ' OR ',
				$user_query->query_where
			);
		}
	}




	public function states_by_country() {
		$states = array(
			'US' => array(
				'AL' => 'Alabama',
				'AK' => 'Alaska',
				'AS' => 'American Samoa',
				'AZ' => 'Arizona',
				'AR' => 'Arkansas',
				'CA' => 'California',
				'CO' => 'Colorado',
				'CT' => 'Connecticut',
				'DE' => 'Delaware',
				'DC' => 'District Of Columbia',
				'FM' => 'Federated States Of Micronesia',
				'FL' => 'Florida',
				'GA' => 'Georgia',
				'GU' => 'Guam',
				'HI' => 'Hawaii',
				'ID' => 'Idaho',
				'IL' => 'Illinois',
				'IN' => 'Indiana',
				'IA' => 'Iowa',
				'KS' => 'Kansas',
				'KY' => 'Kentucky',
				'LA' => 'Louisiana',
				'ME' => 'Maine',
				'MH' => 'Marshall Islands',
				'MD' => 'Maryland',
				'MA' => 'Massachusetts',
				'MI' => 'Michigan',
				'MN' => 'Minnesota',
				'MS' => 'Mississippi',
				'MO' => 'Missouri',
				'MT' => 'Montana',
				'NE' => 'Nebraska',
				'NV' => 'Nevada',
				'NH' => 'New Hampshire',
				'NJ' => 'New Jersey',
				'NM' => 'New Mexico',
				'NY' => 'New York',
				'NC' => 'North Carolina',
				'ND' => 'North Dakota',
				'MP' => 'Northern Mariana Islands',
				'OH' => 'Ohio',
				'OK' => 'Oklahoma',
				'OR' => 'Oregon',
				'PW' => 'Palau',
				'PA' => 'Pennsylvania',
				'PR' => 'Puerto Rico',
				'RI' => 'Rhode Island',
				'SC' => 'South Carolina',
				'SD' => 'South Dakota',
				'TN' => 'Tennessee',
				'TX' => 'Texas',
				'UT' => 'Utah',
				'VT' => 'Vermont',
				'VI' => 'Virgin Islands',
				'VA' => 'Virginia',
				'WA' => 'Washington',
				'WV' => 'West Virginia',
				'WI' => 'Wisconsin',
				'WY' => 'Wyoming',
			),
			'CA' => array(
				'AB' => 'Alberta',
				'BC' => 'British Columbia',
				'MB' => 'Manitoba',
				'NB' => 'New Brunswick',
				'NL' => 'Newfoundland and Labrador',
				'NS' => 'Nova Scotia',
				'NT' => 'Northwest Territories',
				'NU' => 'Nunavut',
				'ON' => 'Ontario',
				'PE' => 'Prince Edward Island',
				'QC' => 'Québec',
				'SK' => 'Saskatchewan',
				'YT' => 'Yukon',
			),
		);
		return $states;
	}

	public function country_by_state( $stateCode ) {
		$states = $this->states_by_country();
		foreach ( $states as $country => $regions ) {
			if ( array_key_exists( $stateCode, $regions ) ) {
				return $country;
			}
		}
		return null;
	}

	public function sort_users_by_user_id( $query ) {
		if ( isset( $query->query_vars['orderby'] ) && 'user_id' == $query->query_vars['orderby'] ) {
			$query->query_vars['orderby'] = 'ID'; // WordPress user query recognizes 'ID' for sorting by user ID
		}
	}

	public function move_row_actions_js() {
		$screen = get_current_screen();
		if ( $screen->id === 'users' ) {
			?>
<script type="text/javascript">
jQuery(document).ready(function($) {
	// Move the row actions from their original location to the 'user_id' column
	$('#the-list tr').each(function() {
		var $this = $(this);
		var rowActions = $this.find('.row-actions').clone(); // Clone the row actions
		$this.find('.row-actions').remove(); // Remove the original row actions

		// Check if the 'user_id' column exists and append the cloned row actions
		var userIDCell = $this.find('td.business_id');
		if (userIDCell.length) {
			userIDCell.append(rowActions);
		}
	});
});
</script>

			<?php
		}
	}



	public function update_role_business_id( $user_id, $new_role, $old_roles ) {
		switch ( $new_role ) {
			case 'partner':
				$business_id = $this->generate_partner_business_id( $user_id );
				if ( $business_id ) {
					update_field( 'business_id', $business_id, 'user_' . $user_id );
				}
				break;

			case 'temporary':
				update_field( 'business_id', 'TEMPORARY-' . $user_id, 'user_' . $user_id );
				break;

			case 'pending':
				update_field( 'business_id', 'PENDING-' . $user_id, 'user_' . $user_id );
				break;

			default:
				break;
		}
	}

	public function update_role_business_id_on_profile_update( $user_id, $old_user_data ) {
		$old_roles = $old_user_data->roles;
		$user      = get_userdata( $user_id );
		$new_role  = $user->roles ? $user->roles[0] : '';

		if ( $new_role == 'temporary' ) {
			update_field( 'business_id', 'TEMPORARY-' . $user_id, 'user_' . $user_id );
		}

		if ( $new_role == 'pending' ) {
			update_field( 'business_id', 'PENDING-' . $user_id, 'user_' . $user_id );
		}

		if ( ( in_array( 'pending', $old_roles ) || in_array( 'temporary', $old_roles ) ) && $new_role == 'partner' ) {
			$business_id = $this->generate_partner_business_id( $user_id );
			update_field( 'business_id', $business_id, 'user_' . $user_id );
		}
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

			$subject  = 'Welcome to NOVA Signage, ' . $first_name . '!';
			$message  = '<p style="margin-top: 20px;">Hello  ' . $first_name . ',</p>';
			$message .= '<p>Welcome to NOVA Signage! Your Business Partner application has been approved.</p>';
			$message .= '<p>You may now <a href="' . home_url( '/my-account/' ) . '">login</a> to see our products, get instant quotes, or start a custom sign project.';
			$message .= '<p><a href="' . home_url( '/' ) . '" style="padding: 10px 16px; display: inline-block; text-decoration: none; border-style: solid; background-color: #d33; color: #fff; font-size: 16px; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-weight: 400; background: #d33; padding-top: 10px; padding-bottom: 10px; padding-left: 8px; padding-right: 8px; border-width: 0px; border-radius: 4px; border-color: #dedede;">EXPLORE OUR PRODUCTS</a><br>';
			$message .= '<a href="' . home_url( '/custom-project' ) . '" style="padding: 10px 16px; display: inline-block; text-decoration: none; border-style: solid; background-color: #d33; color: #fff; font-size: 16px; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-weight: 400; background: #d33; padding-top: 10px; padding-bottom: 10px; padding-left: 8px; padding-right: 8px; border-width: 0px; border-radius: 4px; border-color: #dedede;">START A CUSTOM PROJECT</a></p>';
			$message .= '<p>If you have any questions, feel free to ask our team.</p>';
			$message .= '<p>Happy exploring,<br>';
			$message .= 'NOVA Signage Team</p>';
			$message .= "<br><br><p><em>This is a generated email. You don't need to reply.</em></p>";

			$headers = array( 'Content-Type: text/html; charset=UTF-8' );

			/** Disable welcome email */
			// $this->send_email( $to, $subject, $message, $headers, array() );

			do_action( 'nova_user_partner_approved', $user_info );

		}
	}

	public function custom_role_login_check( $user, $password ) {
		if ( ! is_wp_error( $user ) ) {
			$roles = (array) $user->roles;

			// Check for 'Temporary' role
			if ( in_array( 'temporary', $roles, true ) ) {
				return new WP_Error( 'temporary_account', __( 'Please Activate your email' ) );
			}

			if ( in_array( 'pending', $roles, true ) ) {
				return new WP_Error( 'pending_account', __( 'Your account is still pending.' ) );
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
			// $query->set( 'meta_key', 'business_id' ); // replace with your actual meta key
			$query->set( 'orderby', 'id' ); // or 'meta_value_num' if the values are numeric
		}
	}

	public function make_business_id_column_sortable( $columns ) {
		$columns['business_id'] = 'business_id';
		return $columns;
	}

	public function user_id_column_sortable( $columns ) {
		$columns['user_id'] = 'user_id';
		return $columns;
	}

	public function business_id_user_column( $value, $column_name, $user_id ) {
		if ( 'business_id' === $column_name ) {
			$user_edit_link = esc_url( admin_url( "user-edit.php?user_id={$user_id}" ) );
			$business_id    = get_field( 'business_id', 'user_' . $user_id );
			return "<strong><a href='{$user_edit_link}'>{$business_id}</a></strong>";
		}

		if ( 'user_id' == $column_name ) {
			$user_edit_link = esc_url( admin_url( "user-edit.php?user_id={$user_id}" ) );
			// Return the user ID as a clickable link
			return "<strong><a href='{$user_edit_link}'>{$user_id}</a></strong>";
		}

		return $value;
	}

	public function add_business_id_column( $columns ) {
		$cb_column    = array( 'cb' => $columns['cb'] );
		$posts_column = array( 'posts' => $columns['posts'] );
		unset( $columns['cb'] );
		unset( $columns['posts'] );
		$new_columns = array_merge( $cb_column, array( 'business_id' => 'Business ID' ), $columns );
		return $new_columns;
	}

	public function user_activation( $user_id ) {

		delete_user_meta( $user_id, 'account_activation_key' );
		$user = new WP_User( $user_id );
		$user->set_role( 'pending' );
		$first_name    = $user->get( 'first_name' );
		$company       = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$user_edit_url = admin_url( 'user-edit.php?user_id=' . $user_id );
		$business_id   = get_field( 'business_id', 'user_' . $user_id );

		$subject      = 'NOVA INTERNAL - Pending Partner Status: ' . $first_name . ' from ' . $company . ' -  ' . $business_id;
		$josh_subject = 'NOVA INTERNAL (Action Required) - Pending Partner Status: ' . $first_name . ' from ' . $company . ' -  ' . $business_id;
		$message      = '<p>Hello,</p>';
		$message     .= '<p>You have a business partner application to approve:</p>';
		$message     .= '<ul>';
		$message     .= '<li><strong>Customer:</strong> - ' . $business_id . '</li>';
		$message     .= '<li><strong>Company:</strong> - ' . $company . '</li>';
		$message     .= '</ul><br>';
		$message     .= '<p style="margin-top: 20px;">' . $first_name . ' with Business ID ' . $business_id . ' submitted a business partner application. </p>';
		$message     .= '<p>Please <strong>APPROVE</strong> or <strong>DENY</strong> their Business Partner Status here:<br>';
		$message     .= '<a href="' . esc_url( $user_edit_url ) . '">Click Here</a></p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$emails = $this->get_admin_and_customer_rep_emails();

		/*** Add Yat and Lok. */
		$emails[] = 'yat@novasignage.com';
		$emails[] = 'lok.l@hineon.com';

		/* Remove joshua@hineon.com to $emails array */
		$emails = array_diff( $emails, array( 'joshua@hineon.com' ) );

		$this->send_email( $emails, $subject, $message, $headers, array() );
		$this->send_email( 'joshua@hineon.com', $josh_subject, $message, $headers, array() );

		$this->send_user_pending_email( $user_id );
	}

	public function send_user_pending_email( $user_id ) {
		$user       = get_userdata( $user_id );
		$first_name = get_user_meta( $user_id, 'first_name', true );
		$user_email = $user->user_email;

		$subject = 'Your NOVA Business Partner Status is under review';

		$message  = '<p style="margin-top: 20px;">Hello  ' . $first_name . ',</p>';
		$message .= '<p>Your Business Partner account will be reviewed within 24 business hours. Please wait for the approval email.</p>';
		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';
		$message .= "<br><br><p><em>This is a generated email. You don't need to reply.</em></p>";

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$this->send_email( $user_email, $subject, $message, $headers, array() );
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

		$front_page_url = trailingslashit( home_url( '/' ) );
		$from           = trailingslashit( $_POST['referrer'] );
		if ( $from !== $front_page_url ) {
			$status['reload'] = 'yes';
		}

		$status['referrer']   = wp_get_referer();
		$status['is_product'] = $_POST['product_page'];
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
		$billingEmail    = sanitize_email( $_POST['billingEmail'] );
		$businessWebsite = isset( $_POST['businessWebsite'] ) ? esc_url( $_POST['businessWebsite'] ) : '';
		$businessType    = isset( $_POST['businessType'] ) ? sanitize_text_field( $_POST['businessType'] ) : '';
		$businessPhone   = isset( $_POST['businessPhone'] ) ? $this->sanitize_phone_number( $_POST['businessPhone'] ) : '';
		$taxId           = isset( $_POST['taxId'] ) ? sanitize_text_field( $_POST['taxId'] ) : '';
		$street          = isset( $_POST['street'] ) ? sanitize_text_field( $_POST['street'] ) : '';
		$city            = isset( $_POST['city'] ) ? sanitize_text_field( $_POST['city'] ) : '';
		$state           = isset( $_POST['state'] ) ? sanitize_text_field( $_POST['state'] ) : '';
		$zip             = isset( $_POST['zip'] ) ? sanitize_text_field( $_POST['zip'] ) : '';
		$pst             = isset( $_POST['pst'] ) ? sanitize_text_field( $_POST['pst'] ) : '';
		$country         = isset( $_POST['country'] ) ? sanitize_text_field( $_POST['country'] ) : '';
		$promotions      = isset( $_POST['promotions'] ) ? sanitize_text_field( $_POST['promotions'] ) : '';
		$privacy         = isset( $_POST['privacy'] ) ? sanitize_text_field( $_POST['privacy'] ) : '';
		$referral        = isset( $_POST['referredBy'] ) ? sanitize_text_field( $_POST['referredBy'] ) : '';
		$referrer        = isset( $_POST['referrer'] ) ? sanitize_url( $_POST['referrer'] ) : '';

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

		$billing_keys = array(
			'billing_first_name' => $firstName,
			'billing_last_name'  => $lastName,
			'billing_company'    => $businessName,
			'billing_email'      => $businessEmail,
			'billing_phone'      => $businessPhone,
			'billing_address_1'  => $street,
			'billing_city'       => $city,
			'billing_state'      => $state,
			'billing_postcode'   => $zip,
			'billing_country'    => $country,
		);

		$shipping_keys = array(
			'shipping_first_name' => $firstName,
			'shipping_last_name'  => $lastName,
			'shipping_company'    => $businessName,
			'shipping_email'      => $businessEmail,
			'shipping_phone'      => $businessPhone,
			'shipping_address_1'  => $street,
			'shipping_city'       => $city,
			'shipping_state'      => $state,
			'shipping_postcode'   => $zip,
			'shipping_country'    => $country,
			'shipping_pst'        => $pst,
		);

		foreach ( $billing_keys as $key => $value ) {
			update_user_meta( $user_id, $key, $value );
		}

		foreach ( $shipping_keys as $key => $value ) {
			update_user_meta( $user_id, $key, $value );
		}

		wp_update_user(
			array(
				'ID'         => $user_id,
				'first_name' => $firstName,
				'last_name'  => $lastName,
			)
		);

		$business_id = 'TEMPORARY-' . $user_id;

		update_user_meta( $user_id, 'additional_billing_email', $billingEmail );

		update_field( 'business_id', $business_id, 'user_' . $user_id );
		update_field( 'business_name', $businessName, 'user_ ' . $user_id );
		update_field( 'business_phone', $businessPhone, 'user_ ' . $user_id );
		update_field( 'business_type', $businessType, 'user_ ' . $user_id );
		update_field( 'business_email', $businessEmail, 'user_ ' . $user_id );
		update_field( 'business_website', $businessWebsite, 'user_ ' . $user_id );
		update_field( 'business_phone_number', $businessPhone, 'user_ ' . $user_id );
		update_field( 'tax_id', $taxId, 'user_ ' . $user_id );
		// update_field( 'street_address', $street, 'user_ ' . $user_id );
		// update_field( 'city', $city, 'user_ ' . $user_id );
		// update_field( 'state', $state, 'user_ ' . $user_id );
		// update_field( 'zip', $zip, 'user_ ' . $user_id );
		// update_field( 'country', $country, 'user_ ' . $user_id );
		update_field( 'pst', $pst, 'user_ ' . $user_id );
		update_field( 'referral', $referral, 'user_ ' . $user_id );
		if ( isset( $_POST['hear'] ) ) {
			update_field( 'how_did_you_hear_about_us', $_POST['hear'], 'user_ ' . $user_id );
		}
		if ( $referrer ) {
			update_field( 'registration_page', $referrer, 'user_ ' . $user_id );
		}
		update_field( 'promotions', isset( $_POST['promotions'] ) && $_POST['promotions'] === 'yes' ? 1 : 0, 'user_ ' . $user_id );
		update_field( 'privacy', $_POST['privacy'] === 'yes' ? 1 : 0, 'user_ ' . $user_id );

		$activation_key = md5( uniqid( rand(), true ) );
		update_user_meta( $user_id, 'account_activation_key', $activation_key );

		// Send activation email
		// wp_mail( $businessEmail, $subject, $message, $headers );

		$status['code']   = 2;
		$status['post']   = $_POST;
		$status['result'] = array(
			'business_id'    => $business_id,
			'email'          => $businessEmail,
			'first_name'     => $firstName,
			'user_id'        => $user_id,
			'activation_key' => $activation_key,
		);

		$this->send_user_activate_email( $user_id );

		wp_send_json( $status );
	}

	public function send_user_activate_email( $user_id ) {

		$user_data      = get_userdata( $user_id );
		$user_email     = $user_data->user_email;
		$firstName      = $user_data->first_name;
		$activation_key = get_user_meta( $user_id, 'account_activation_key', true );

		$subject = 'Activate your NOVA Signage account';

		$message = '<p style="margin-top: 20px;">Hello ' . $firstName . ',</p><p><a href="' . home_url( '/activate' ) . '?pu=' . $user_id . '&key=' . $activation_key . '">PLEASE CLICK TO VERIFY YOUR ACCOUNT.</a></p><p>Thank you,<br>NOVA Signage Team</p>';

		$this->send_email( $user_email, $subject, $message );
	}


	public function send_activation() {

		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_signup_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		$user_id        = $_POST['user_id'];
		$firstName      = sanitize_text_field( $_POST['first_name'] );
		$businessEmail  = sanitize_email( $_POST['email'] );
		$business_id    = sanitize_text_field( $_POST['business_id'] );
		$activation_key = $_POST['activation_key'];

		$subject  = 'NOVA Signage: Activate Your Account';
		$message  = '<p style="margin-top: 20px;">Hello  ' . $firstName . ',</p>';
		$message .= '<p>Thank you for submitting your application as a NOVA Business Partner. Your <b>Business ID</b> number is: ' . $business_id . "\n\n</p>";
		$message .= '<p>Please click the link below to activate your account:' . "\n\n</p>";
		$message .= '<a href="' . home_url() . '/activate?pu=' . $user_id . '&key=' . $activation_key . '">';
		$message .= home_url() . '/activate?pu=' . $user_id . '&key=' . $activation_key . "</a>\n\n";
		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';
		$message .= "<br><br><p><em>This is a generated email. You don't need to reply.</em></p>";

		$this->send_email( $businessEmail, $subject, $message, array(), array() );

		$status['code'] = 2;
		$status['post'] = $_POST;
		wp_send_json( $status );
	}

	public function send_email( $to, $subject, $content, $headers = array(), $attachments = array(), $heading = '' ) {
		// Get the WooCommerce emailer instance
		$mailer = WC()->mailer();
		// Wrap the content with WooCommerce email template

		if ( ! $heading || empty( $heading ) ) {
			$heading = $subject;
		}

		$wrapped_content = $mailer->wrap_message( $heading, $content );

		// Send the email using WooCommerce's mailer
		$mailer->send( $to, $subject, $wrapped_content, $headers, $attachments );
	}

	public function get_admin_and_customer_rep_emails() {

		if ( get_field( 'testing_mode', 'option' ) ) {
			return array( 'bonn.j@hineon.com' );
		}

		$user_emails = array();

		// Get users with the 'administrator' role
		$admin_users = get_users( array( 'role' => 'administrator' ) );
		foreach ( $admin_users as $user ) {
			$notifications = get_field( 'email_notifications', 'user_' . $user->ID );
			if ( $notifications ) {
				$user_emails[] = $user->user_email;
			}
		}

		// Get users with the 'customer-rep' role
		$customer_rep_users = get_users( array( 'role' => 'customer-rep' ) );
		foreach ( $customer_rep_users as $user ) {
			$user_emails[] = $user->user_email;
		}

		// Remove duplicate email addresses
		$user_emails = array_unique( $user_emails );

		return $user_emails;
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

	public function create_custom_table() {
		global $wpdb;

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$tables = array(
			'type_sign-shops',
			'type_printing-shops',
			'type_display',
			'type_graphics',
			'type_marketing-agencies',
			'type_others',
		);

		foreach ( $tables as $table ) {

			$sanitized_table_name = str_replace( '-', '_', $table );
			$table_name           = $wpdb->prefix . $sanitized_table_name;

			$charset_collate = $wpdb->get_charset_collate();

			$sql = "CREATE TABLE $table_name (
				id mediumint(9) NOT NULL AUTO_INCREMENT,
				time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
				user_group tinytext NOT NULL,
				user_id mediumint(9) NOT NULL,
				PRIMARY KEY  (id)
			) $charset_collate;";

			dbDelta( $sql );

		}
	}

	public function insert_business_type( $type, $group, $user_id ) {
		global $wpdb;

		// Sanitize the type and prepare the table name
		$sanitized_type = str_replace( '-', '_', $type );
		$table_name     = $wpdb->prefix . $sanitized_type;
		$current_time   = current_time( 'mysql' );

		// Prepare data and format arrays
		$data   = array(
			'time'       => $current_time,
			'user_group' => $group,
			'user_id'    => $user_id,
		);
		$format = array( '%s', '%s', '%d' );

		// Check if the entry already exists
		$query  = $wpdb->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE user_group = %s AND user_id = %d", $group, $user_id );
		$exists = $wpdb->get_var( $query );

		if ( $exists > 0 ) {

			$query = $wpdb->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE user_group = %s", $group );
			$count = $wpdb->get_var( $query );
			return $count;

		} else {
			// Insert the new record if it does not exist
			$success = $wpdb->insert( $table_name, $data, $format );
			if ( false === $success ) {
				return new WP_Error( 'db_insert_error', 'Failed to insert business type data into database', $wpdb->last_error );
			} else {
				// After successful insertion, return the count of similar entries
				$query = $wpdb->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE user_group = %s", $group );
				$count = $wpdb->get_var( $query );
				return $count;
			}
		}
	}


	public function clear_table() {
		global $wpdb; // Make sure $wpdb is accessible
		$tables = array(
			'type_sign-shops',
			'type_printing-shops',
			'type_display',
			'type_graphics',
			'type_marketing-agencies',
			'type_others',
		);
		$error  = false;

		foreach ( $tables as $table ) {
			$sanitized_table_name = str_replace( '-', '_', $table );
			$table_name           = $wpdb->prefix . $sanitized_table_name;
			$sql                  = "TRUNCATE TABLE `$table_name`";
			$wpdb->query( $sql );

			if ( $wpdb->last_error ) {
				echo "Error truncating table $table_name: " . $wpdb->last_error . '<br>';
				$error = true;
			} else {
				echo "Table $table_name has been cleared successfully.<br>";
			}
		}

		return ! $error; // Return true if no errors occurred
	}

	public function generate_partner_business_id( $user_id ) {
		$businessType = get_field( 'business_type', 'user_' . $user_id );

		$state = get_user_meta( $user_id, 'billing_state', true );

		$country = get_user_meta( $user_id, 'billing_country', true );

		if ( ! $state || ! $businessType || ! $country ) {
			return;
		}

		$business_group      = strtoupper( $country . $state );
		$business_id_start   = strtoupper( $country . $state . '-' . substr( $businessType, 0, 1 ) );
		$business_type_table = 'type_' . $businessType;
		$business_type_id    = $this->insert_business_type( $business_type_table, $business_group, $user_id );
		if ( $business_type_id ) {
			$business_id = $business_id_start . str_pad( $business_type_id, 3, '0', STR_PAD_LEFT );
			return $business_id;
		}
		return;
	}

	public function update_business_id_user( $user_id ) {
		$user = get_user_by( 'id', $user_id );

		if ( in_array( 'administrator', (array) $user->roles ) || in_array( 'customer-rep', (array) $user->roles ) ) {
					update_field( 'business_id', 'NOVA-' . $user_id, 'user_' . $user_id );
		} else {

			$state = get_user_meta( $user_id, 'billing_state', true );

			$country      = get_user_meta( $user_id, 'billing_country', true );
			$businessType = get_field( 'business_type', 'user_' . $user_id );

			if ( isset( $country ) && ! empty( $country ) && isset( $state ) && ! empty( $state ) && isset( $businessType ) && ! empty( $businessType ) ) {

				$business_group      = strtoupper( $country . $state );
				$business_id_start   = strtoupper( $country . $state . '-' . substr( $businessType, 0, 1 ) );
				$business_type_table = 'type_' . $businessType;
				$business_type_id    = $this->insert_business_type( $business_type_table, $business_group, $user_id );
				$business_id         = $business_id_start . str_pad( $business_type_id, 3, '0', STR_PAD_LEFT );

				update_field( 'business_id', $business_id, 'user_' . $user_id );
			} else {
				update_field( 'business_id', '' . $user_id, 'user_' . $user_id );
			}
		}
	}

	public function handle_business_id_conflict( $business_id, $user_id, $business_type_table, $business_group, $business_id_start ) {
		// Fetch users that may already have this business ID
		$existing_users = get_users(
			array(
				'meta_key'   => 'business_id',
				'meta_value' => $business_id,
				'exclude'    => array( $user_id ),  // Exclude the current user from the search
			)
		);

		// Check if the business ID is already used
		if ( ! empty( $existing_users ) ) {
			// Generate a new business type ID
			print_r( $existing_users );
			die();
			$business_type_id = $this->insert_business_type( $business_type_table, $business_group, $user_id );
			// Create a new business ID based on the new business type ID
			$new_business_id = $business_id_start . str_pad( $business_type_id, 3, '0', STR_PAD_LEFT );

			// Recursive call to ensure this new business ID is also not in conflict
			return $this->handle_business_id_conflict( $new_business_id, $user_id, $business_type_table, $business_group, $business_id_start );
		} else {
			// If no conflict, update the business ID field and return the confirmed business ID
			return $business_id;
		}
	}

	private function containsKeywords( $string, $keywords ) {
		$lowerString = strtolower( $string ); // Convert string to lower case once
		foreach ( $keywords as $keyword ) {
			if ( strpos( $lowerString, $keyword ) !== false ) {
				return true;
			}
		}
		return false;
	}



	private function process_business_id_user( $user ) {
		$user_id    = $user->ID;
		$first_name = get_user_meta( $user_id, 'first_name', true );
		$last_name  = get_user_meta( $user_id, 'last_name', true );
		$email      = get_user_meta( $user_id, 'user_email', true );

		// Early exit for specific roles
		$role_based_ids = array(
			'administrator' => 'NOVA-' . $user_id,
			'customer-rep'  => 'CUSTOMER REP-' . $user_id,
			'temporary'     => 'TEMPORARY-' . $user_id,
			'pending'       => 'PENDING-' . $user_id,
		);
		foreach ( $role_based_ids as $role => $id ) {
			if ( in_array( $role, (array) $user->roles ) ) {
				update_field( 'business_id', $id, 'user_' . $user_id );
				return $id;
			}
		}

		$keywords = array( 'test', 'demo' );

		// Check if any of the user's details contain the keywords
		if ( $this->containsKeywords( strtolower( $first_name ), $keywords ) ||
			$this->containsKeywords( strtolower( $last_name ), $keywords ) ||
			$this->containsKeywords( $email, $keywords ) ) {
			update_field( 'business_id', 'TEST USER-' . $user_id, 'user_' . $user_id );
			return 'TEST USER-' . $user_id;
		}

		// Process business ID creation
		$state        = get_user_meta( $user_id, 'billing_state', true );
		$country      = get_user_meta( $user_id, 'billing_country', true );
		$businessType = get_field( 'business_type', 'user_' . $user_id );

		if ( $country && $state && $businessType ) {
			$business_group      = strtoupper( $country . $state );
			$business_id_start   = strtoupper( $country . $state . '-' . substr( $businessType, 0, 1 ) );
			$business_type_table = 'type_' . $businessType;
			$business_type_id    = $this->insert_business_type( $business_type_table, $business_group, $user_id );
			$business_id         = $business_id_start . str_pad( $business_type_id, 3, '0', STR_PAD_LEFT );

			// $existing_user = get_users(
			// array(
			// 'meta_key'   => 'business_id',
			// 'meta_value' => $business_id,
			// 'exclude'    => array( $user_id ),
			// )
			// );

			// if ( ! empty( $existing_user ) ) {
			// $business_id = $this->handle_business_id_conflict( $business_id, $user_id, $business_type_table, $business_group, $business_id_start );
			// }

			update_field( 'business_id', $business_id, 'user_' . $user_id );
		} else {
			update_field( 'business_id', '', 'user_' . $user_id );
		}
	}



	public function regenerate_business_id() {
		$batch_size = 20; // Process 100 users per batch
		$page       = 0;
		$processed  = true;
		$this->clear_table();

		while ( $processed ) {
			// Fetch a batch of users
			echo 'Starting ... <br>';
			$users = get_users(
				array(
					'number'  => $batch_size,
					'offset'  => $page * $batch_size,
					'orderby' => 'ID',  // Sort by user ID
					'order'   => 'ASC',    // Ascending order
				)
			);

			// If no users are returned, we are done
			if ( empty( $users ) ) {
				$processed = false;
				continue;
			}

			// Process each user in the current batch
			foreach ( $users as $user ) {
				// Your existing user processing code goes here

				$business_id = $this->process_business_id_user( $user );
				$user_id     = $user->ID;
				// $business_id = get_field( 'business_id', $user->ID );
				// if ( $business_id ) {
				// update_field( 'old_business_id', $business_id, $user->ID );
				// }

				$country      = get_user_meta( $user->ID, 'billing_country', true );
				$state        = get_user_meta( $user->ID, 'billing_state', true );
				$businessType = get_field( 'business_type', 'user_' . $user_id );
				echo 'Country: ' . $country . '<br>';
				echo 'State: ' . $state . '<br>';
				echo 'Type: ' . $businessType . '<br>';
				echo 'Updating user ' . $user_id . '<br>';
				echo 'Business ID ' . get_field( 'business_id', 'user_' . $user_id ) . '<br>';
				echo 'Saved business id : ' . $business_id;
				echo '<br>--------------------------------<br>';
			}

			// Increment the page number for the next batch
			++$page;
			echo 'Next batch ...<br>';
		}
		echo 'Done processing';
	}
}
