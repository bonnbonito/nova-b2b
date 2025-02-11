<?php

namespace NOVA_B2B;

use Google_Client;
use Google_Service_Sheets;
use Google_Service_Sheets_Spreadsheet;
use Google_Service_Sheets_ValueRange;
use Google_Service_Sheets_Request;
use Google_Service_Sheets_BatchUpdateSpreadsheetRequest;
use Google_Service_Sheets_ClearValuesRequest;
use Exception;

class ExportOrder {
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
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'admin_menu', array( $this, 'add_export_orders_submenu_page' ) );
		add_action( 'woocommerce_new_order', array( $this, 'auto_export_to_sheets' ) );
		add_action( 'woocommerce_order_status_changed', array( $this, 'auto_export_to_sheets' ) );
		add_action( 'do_nova_sheets_export', array( $this, 'do_sheets_export' ) );
		//add_action( 'wp_footer', array( $this, 'debug' ) );
	}

	/**
	 * Debug
	 */
	public function debug() {
		$response = wp_remote_get(
			rest_url( 'nova/v1/nova_orders' ),
			array(
				'cookies' => $_COOKIE,
				'headers' => array(
					'X-WP-Nonce' => wp_create_nonce( 'wp_rest' )
				)
			)
		);
		if ( is_wp_error( $response ) ) {
			error_log( 'REST API Error: ' . $response->get_error_message() );
			return;
		}

		$body = wp_remote_retrieve_body( $response );

		$data = json_decode( $body );

		?>
		<script>
			console.log(<?php echo json_encode( $data ); ?>);
		</script>
		<?php
	}

	/**
	 * Register REST API routes
	 */
	public function register_rest_routes() {
		register_rest_route(
			'nova/v1',
			'/nova_orders',
			array(
				'methods' => 'GET',
				'callback' => array( $this, 'get_nova_orders' ),
				'permission_callback' => array( $this, 'verify_request_auth' ),
			)
		);
	}

	/**
	 * Verify request authentication
	 * Checks for either Basic Auth credentials or WooCommerce management capabilities
	 *
	 * @param WP_REST_Request $request The request object
	 * @return bool|WP_Error
	 */
	public function verify_request_auth( $request ) {
		// Check for Basic Auth header
		$auth_header = $request->get_header( 'Authorization' );

		if ( $auth_header && strpos( $auth_header, 'Basic ' ) === 0 ) {
			return $this->validate_basic_auth( $auth_header );
		}

		// Fallback to WordPress capability check
		return current_user_can( 'manage_woocommerce' );
	}

	/**
	 * Validate Basic Authentication
	 *
	 * @param string $auth_header The Authorization header
	 * @return bool|\WP_Error
	 */
	private function validate_basic_auth( $auth_header ) {
		// Remove 'Basic ' from the header
		$credentials = substr( $auth_header, 6 );

		// Decode base64 credentials
		$decoded = base64_decode( $credentials );

		if ( ! $decoded || strpos( $decoded, ':' ) === false ) {
			return new \WP_Error(
				'rest_forbidden',
				'Invalid username or password',
				array( 'status' => 401 )
			);
		}

		// Split into username and password
		list( $username, $password ) = explode( ':', $decoded, 2 );

		// Authenticate user
		$user = wp_authenticate( $username, $password );

		if ( is_wp_error( $user ) ) {
			return new \WP_Error(
				'rest_forbidden',
				'Invalid username or password',
				array( 'status' => 401 )
			);
		}

		// Check if user has required capability
		if ( ! user_can( $user, 'manage_woocommerce' ) ) {
			return new \WP_Error(
				'rest_forbidden',
				'You do not have permission to view orders',
				array( 'status' => 403 )
			);
		}

		return true;
	}

	public function get_nova_live_orders() {
		global $wpdb;

		// Get all order IDs
		$order_ids = $wpdb->get_col(
			"SELECT DISTINCT p.ID FROM {$wpdb->posts} p 
			LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = '_hide_order'
			LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_is_temporary_combined_order'
			WHERE p.post_type = 'shop_order' 
			AND p.post_status != 'trash'
			AND pm1.meta_value IS NULL
			AND pm2.meta_value IS NULL
			ORDER BY p.post_date DESC"
		);

		$response = array();

		foreach ( $order_ids as $order_id ) {
			$order = wc_get_order( $order_id );

			if ( ! $order ) {
				continue;
			}

			$customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
			/** if 'test' is in customer name, continue */
			if ( stripos( $customer_name, 'test' ) !== false ) {
				continue;
			}

			$customer_id = $order->get_customer_id();

			/** if customer is admin, continue */
			if ( $customer_id && user_can( $customer_id, 'administrator' ) ) {
				continue;
			}

			$payment_type = 'Full Payment';

			$payment_select = get_post_meta( $order_id, '_payment_select', true );
			$deposit_chosen = get_post_meta( $order_id, '_deposit_chosen', true );

			if ( $payment_select ) {
				$payment_type = get_the_title( intval( $payment_select ) );
			}

			if ( $deposit_chosen ) {
				$payment_type = get_the_title( intval( $deposit_chosen ) );
			}

			$script = \NOVA_B2B\Scripts::get_instance();


			$items = $order->get_items();

			foreach ( $items as $item ) {
				$signage = $item->get_meta( 'signage' );

				$order_number = 'NV' . $order->get_id();


				//get item total
				$item_total = $item->get_total();




				if ( $signage ) {
					$response[] = array(
						'Order ID' => $order_number,
						'Material' => wp_strip_all_tags( $script ? $script->get_material_name( $signage[0]->product ) : '' ),
						'Product Line' => wp_strip_all_tags( get_the_title( $signage[0]->product ) ),
						'Customer Name' => wp_strip_all_tags( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ),
						'Business ID' => get_field( 'business_id', 'user_' . $order->get_customer_id() ),
						'Customer Email' => wp_strip_all_tags( $order->get_billing_email() ),
						'State' => wp_strip_all_tags( $order->get_billing_state() ),
						'Country' => wp_strip_all_tags( $order->get_billing_country() ),
						'Currency' => wp_strip_all_tags( $order->get_currency() ),
						'Item Price' => floatval( $item_total ),
						'Total Price' => floatval( $order->get_total() ),
						'Order Date' => wp_strip_all_tags( $order->get_date_created()->format( 'm/d/Y' ) ),
						'Payment Type' => wp_strip_all_tags( $payment_type ),
						'Order Status' => wp_strip_all_tags( $order->get_status() ),
					);
				}
			}
		}

		return $response;

	}

	/**
	 * Get orders excluding those with _hide_order meta
	 */
	public function get_nova_orders() {

		$response = $this->get_nova_live_orders();

		return new \WP_REST_Response( $response, 200 );
	}

	/**
	 * Add Export Orders submenu page under WooCommerce menu
	 */
	public function add_export_orders_submenu_page() {
		add_submenu_page(
			'woocommerce',
			'Export Orders',
			'Export Orders',
			'manage_woocommerce',
			'export-orders',
			array( $this, 'export_orders_page_content' )
		);
	}

	/**
	 * Display the Export Orders page content
	 */
	public function export_orders_page_content() {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}

		// Check if export button was clicked
		if ( isset( $_GET['export_orders'] ) && $_GET['export_orders'] === '1' ) {
			$this->export_orders_to_csv();
			return;
		}

		// Check if Google Sheets export was requested
		if ( isset( $_GET['export_to_sheets'] ) && $_GET['export_to_sheets'] === '1' ) {
			$this->update_google_sheet();
			return;
		}

		?>
		<div class="wrap">
			<h1>Export Orders</h1>
			<p>Click one of the buttons below to export all orders.</p>
			<?php
			?>
			<div class="button-group">
				<a href="<?php echo admin_url( 'admin.php?page=export-orders&export_orders=1' ); ?>" class="button button-primary"
					style="margin-right: 10px;">Export to CSV</a>
				<a href="<?php echo admin_url( 'admin.php?page=export-orders&export_to_sheets=1' ); ?>"
					class="button button-secondary">Update Google Sheet</a>
			</div>
			<?php
			// Display Google Sheets settings if they exist
			$sheet_url = get_option( 'nova_orders_sheet_url' );
			$last_updated = get_option( 'nova_orders_sheet_last_updated' );
			if ( $sheet_url ) {
				echo '<div class="sheet-info" style="margin-top: 20px;">';
				echo '<p class="description">Google Sheet: <a href="' . esc_url( $sheet_url ) . '" target="_blank">View Sheet</a>';
				if ( $last_updated ) {
					echo '<br>Last updated: ' . date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $last_updated ) );
				}
				echo '</p></div>';
			}
			?>
		</div>
		<?php
	}

	/**
	 * Export orders to CSV file
	 */
	private function export_orders_to_csv() {
		// Prevent WordPress from sending its headers
		if ( ! headers_sent() ) {
			// Clear any previous output
			ob_clean();

			// Prevent WordPress from processing further output
			remove_all_actions( 'wp_headers' );
			remove_all_actions( 'admin_head' );
			remove_all_actions( 'admin_footer' );

			// Set headers for CSV download
			header( 'Content-Type: text/csv; charset=utf-8' );
			header( 'Content-Disposition: attachment; filename="nova-orders-' . date( 'Y-m-d' ) . '.csv"' );
			header( 'Pragma: no-cache' );
			header( 'Expires: 0' );
		}

		$orders_data = $this->get_nova_live_orders();

		if ( empty( $orders_data ) ) {
			wp_die( 'No orders found to export.' );
		}

		// Create output stream
		$output = fopen( 'php://output', 'w' );

		// Add UTF-8 BOM for proper Excel encoding
		fputs( $output, "\xEF\xBB\xBF" );

		// Add headers
		fputcsv( $output, array_keys( $orders_data[0] ) );

		// Add data
		foreach ( $orders_data as $row ) {
			// Clean each field
			$clean_row = array_map( function ($value) {
				// First decode HTML entities
				$decoded = html_entity_decode( $value, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
				// Then strip any remaining HTML tags
				$stripped = wp_strip_all_tags( $decoded );
				// Finally trim any whitespace
				return trim( $stripped );
			}, $row );

			fputcsv( $output, $clean_row );
		}

		fclose( $output );
		exit();
	}

	public function update_google_sheet() {
		$this->export_orders_to_sheets();
		// Redirect back with success message
		wp_redirect( add_query_arg( 'sheets_export_success', '1', admin_url( 'admin.php?page=export-orders' ) ) );
		exit;
	}

	/**
	 * Export orders to Google Sheets
	 */
	private function export_orders_to_sheets() {
		if ( ! class_exists( 'Google_Client' ) ) {
			require_once get_template_directory() . '/vendor/autoload.php';
		}

		try {
			$client = new Google_Client();
			$client->setApplicationName( 'Nova Orders Export' );
			// Set full access scope
			$client->setScopes( [ 
				Google_Service_Sheets::SPREADSHEETS,
				Google_Service_Sheets::DRIVE,
				Google_Service_Sheets::DRIVE_FILE
			] );

			// Get credentials from WordPress options
			$credentials = get_option( 'nova_google_sheets_credentials' );
			$spreadsheet_id = get_field( 'google_sheets_id', 'option' );

			if ( empty( $credentials ) ) {
				wp_die( 'Google Sheets credentials not found. Please configure them in the theme options.' );
			}

			if ( empty( $spreadsheet_id ) ) {
				wp_die( 'Google Sheets ID not found. Please configure it in the theme options.' );
			}

			$client->setAuthConfig( $credentials );

			$service = new Google_Service_Sheets( $client );

			// First, try to get the spreadsheet to check permissions
			try {
				$spreadsheet = $service->spreadsheets->get( $spreadsheet_id );
			} catch (Exception $e) {
				wp_die( 'Error accessing Google Sheet. Please make sure the sheet is shared with the service account email address. Error: ' . $e->getMessage() );
			}

			// Get the orders data
			$orders_data = $this->get_nova_live_orders();
			if ( empty( $orders_data ) ) {
				wp_die( 'No orders found to export.' );
			}

			// Prepare the data for Google Sheets
			$values = [];
			// Add headers
			$values[] = array_keys( $orders_data[0] );

			// Add data rows
			foreach ( $orders_data as $row ) {
				$clean_row = array_map( function ($value) {
					$decoded = html_entity_decode( $value, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
					$stripped = wp_strip_all_tags( $decoded );
					return trim( $stripped );
				}, $row );
				$values[] = array_values( $clean_row );
			}

			// Clear the existing content
			$clear_request = new Google_Service_Sheets_ClearValuesRequest();
			$service->spreadsheets_values->clear( $spreadsheet_id, 'A:Z', $clear_request );

			$body = new Google_Service_Sheets_ValueRange( [ 
				'values' => $values
			] );

			// Update the sheet
			$result = $service->spreadsheets_values->update(
				$spreadsheet_id,
				'Orders!A1:Z',
				$body,
				[ 'valueInputOption' => 'RAW' ]
			);

			// Auto-resize columns and format cells
			$requests = [ 
				new Google_Service_Sheets_Request( [ 
					'autoResizeDimensions' => [ 
						'dimensions' => [ 
							'sheetId' => 0,
							'dimension' => 'COLUMNS',
							'startIndex' => 0,
							'endIndex' => count( $values[0] )
						]
					]
				] ),
				// Make header bold
				new Google_Service_Sheets_Request( [ 
					'repeatCell' => [ 
						'range' => [ 
							'sheetId' => 0,
							'startRowIndex' => 0,
							'endRowIndex' => 1
						],
						'cell' => [ 
							'userEnteredFormat' => [ 
								'textFormat' => [ 
									'bold' => true
								]
							]
						],
						'fields' => 'userEnteredFormat.textFormat.bold'
					]
				] ),
				// Format Item Price column as number
				new Google_Service_Sheets_Request( [ 
					'repeatCell' => [ 
						'range' => [ 
							'sheetId' => 0,
							'startRowIndex' => 1,
							'startColumnIndex' => 9, // Index of Item Price column
							'endColumnIndex' => 10
						],
						'cell' => [ 
							'userEnteredFormat' => [ 
								'numberFormat' => [ 
									'type' => 'NUMBER',
									'pattern' => '#,##0.00'
								]
							]
						],
						'fields' => 'userEnteredFormat.numberFormat'
					]
				] ),
				// Format Total Price column as number
				new Google_Service_Sheets_Request( [ 
					'repeatCell' => [ 
						'range' => [ 
							'sheetId' => 0,
							'startRowIndex' => 1,
							'startColumnIndex' => 10, // Index of Total Price column
							'endColumnIndex' => 11
						],
						'cell' => [ 
							'userEnteredFormat' => [ 
								'numberFormat' => [ 
									'type' => 'NUMBER',
									'pattern' => '#,##0.00'
								]
							]
						],
						'fields' => 'userEnteredFormat.numberFormat'
					]
				] ),
				// Format Order Date column as date
				new Google_Service_Sheets_Request( [ 
					'repeatCell' => [ 
						'range' => [ 
							'sheetId' => 0,
							'startRowIndex' => 1,
							'startColumnIndex' => 11, // Index of Order Date column
							'endColumnIndex' => 12
						],
						'cell' => [ 
							'userEnteredFormat' => [ 
								'numberFormat' => [ 
									'type' => 'DATE',
									'pattern' => 'mm/dd/yyyy'
								]
							]
						],
						'fields' => 'userEnteredFormat.numberFormat'
					]
				] )
			];

			$batchUpdateRequest = new Google_Service_Sheets_BatchUpdateSpreadsheetRequest( [ 
				'requests' => $requests
			] );

			$service->spreadsheets->batchUpdate( $spreadsheet_id, $batchUpdateRequest );

			// Save the sheet URL
			$sheet_url = "https://docs.google.com/spreadsheets/d/{$spreadsheet_id}";
			update_option( 'nova_orders_sheet_url', $sheet_url );

			// Add last updated timestamp
			update_option( 'nova_orders_sheet_last_updated', current_time( 'mysql' ) );

		} catch (Exception $e) {
			wp_die( 'Error exporting to Google Sheets: ' . $e->getMessage() );
		}
	}

	/**
	 * Auto export to sheets when order is created or status changes
	 */
	public function auto_export_to_sheets() {
		// Don't run if we're doing AJAX or in admin
		if ( wp_doing_ajax() ) {
			return;
		}

		// Run the export in the background after 1 minute to ensure order data is fully processed
		wp_schedule_single_event( time() + 60, 'do_nova_sheets_export' );
	}

	/**
	 * Background export handler
	 */
	public function do_sheets_export() {
		try {
			$this->export_orders_to_sheets();
		} catch (Exception $e) {
			error_log( 'Nova Sheets Export Error: ' . $e->getMessage() );
		}
	}
}