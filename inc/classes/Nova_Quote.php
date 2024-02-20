<?php
namespace NOVA_B2B\Inc\Classes;

class Nova_Quote {
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
		add_action( 'wp_enqueue_scripts', array( $this, 'quotes_nova_scripts' ) );
		add_action( 'rest_api_init', array( $this, 'nova_rest_quote_file' ) );

		add_action( 'wp_ajax_signage_pricing_table', array( $this, 'signage_pricing_table' ) );
		// add_filter( 'acf/init', array( $this, 'afc_load_popular_fonts' ), 10, 3 );
		add_action( 'wp_ajax_upload_signage_file', array( $this, 'upload_signage_file' ) );
		add_action( 'wp_ajax_save_quote', array( $this, 'save_quote' ) );
		add_action( 'wp_ajax_update_quote', array( $this, 'update_quote' ) );
		add_action( 'wp_ajax_remove_signage_file', array( $this, 'remove_signage_file' ) );
		add_action( 'wp_ajax_quote_to_processing', array( $this, 'quote_to_processing' ) );
		add_action( 'wp_ajax_to_checkout', array( $this, 'nova_to_checkout' ) );
		add_action( 'wp_ajax_delete_quote', array( $this, 'delete_quote' ) );
		add_action( 'wp_ajax_save_custom_project', array( $this, 'save_custom_project' ) );
		add_filter( 'upload_mimes', array( $this, 'enable_ai_files' ), 1, 1 );
		add_filter( 'acf/prepare_field/name=signage', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=partner', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=projects', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=dropbox_token_access', array( $this, 'acf_diable_field' ) );
		add_action( 'template_redirect', array( $this, 'redirect_if_loggedin' ) );
		if ( function_exists( 'acf_add_options_page' ) ) {
			add_action( 'init', array( $this, 'add_options_page' ) );
		}
		add_action( 'admin_init', array( $this, 'handle_dropbox_oauth_redirect' ) );
		add_action( 'acf/save_post', array( $this, 'for_quotation_email_action' ) );
		add_action( 'acf/save_post', array( $this, 'for_payment_email_action' ) );
		add_action( 'quote_to_processing', array( $this, 'for_quotation_email' ) );
		add_action( 'processing_to_payment', array( $this, 'for_payment_email' ) );
		add_action( 'processing_to_payment', array( $this, 'create_nova_quote_product' ), 1 );
		add_action( 'wp', array( $this, 'single_quote_redirect' ) );
		add_action( 'nova_product_instant_quote', array( $this, 'nova_product_instant_quote' ) );
		add_action( 'init', array( $this, 'custom_rewrite_rule' ), 10, 0 );
		add_filter( 'query_vars', array( $this, 'custom_query_vars' ) );
		add_action( 'admin_notices', array( $this, 'show_dropbox_oauth_errors' ) );
		add_action( 'kadence_single_before_inner_content', array( $this, 'show_product_dropdown' ) );
	}

	public function show_product_dropdown() {
		if ( ! is_page( 'custom' ) || ! is_page( 'custom-project' ) ) {
			return;
		}
		echo do_shortcode( '[product_dropdown_nav]' );
	}

	public function custom_query_vars( $vars ) {
		$vars[] = 'pagetab';
		return $vars;
	}

	public function custom_rewrite_rule() {
		add_rewrite_rule( '^custom/([^/]*)/([^/]*)/(installation|tech-specs|sample-board|quote)/?$', 'index.php?signage=$matches[1]/$matches[2]&pagetab=$matches[3]', 'top' );
	}

	public function nova_product_instant_quote() {
		?>
		<?php if ( ! is_user_logged_in() ) : ?>
			<?php echo do_shortcode( '[kadence_element id=" 202"]' ); ?>
		<?php else : ?>
<div id="<?php echo get_field( 'quote_div_id' ); ?>"></div>
			<?php
	endif;
	}

	public function single_quote_redirect() {
		if ( is_singular( 'nova_quote' ) ) {
			wp_redirect( home_url( '/' ), 301 );
			die;
		}
	}

	public function create_nova_quote_product( $post_id ) {

		$title        = get_the_title( $post_id );
		$final_price  = get_field( 'final_price', $post_id );
		$product_id   = get_field( 'product', $post_id )->ID;
		$product_name = get_field( 'product', $post_id )->post_title;
		$signage      = json_decode( get_field( 'signage', $post_id ) );
		$note         = get_field( 'note', $post_id );

		$status['final_price'] = get_field( 'final_price', $post_id );
		$status['note']        = $note;
		$status['quote']       = $signage;

		$product_meta = array(
			'usd_price'  => $final_price,
			'signage'    => $signage,
			'nova_quote' => true,
			'nova_title' => $title,
			'quote_id'   => $post_id,
			'nova_note'  => $note,
			'product'    => $product_name,
			'product_id' => $product_id,
		);

		$product_data = array(
			'post_title'   => wp_strip_all_tags( $title ),
			'post_content' => '',
			'post_status'  => 'publish',
			'post_type'    => 'product',
			'meta_input'   => array(
				'_regular_price' => $final_price,
				'_price'         => $final_price,
			),
		);

		if ( $this->product_exists_by_title( wp_strip_all_tags( $title ) ) ) {

			$created_product = $this->product_exists_by_title( wp_strip_all_tags( $title ) );

		} else {
			$created_product = wp_insert_post( $product_data );
			wp_set_object_terms( $created_product, 'nova_quote', 'product_type' );
		}

		foreach ( $product_meta as $meta_key => $meta_value ) {
			update_post_meta( $created_product, $meta_key, $meta_value );
		}

		update_post_meta( $post_id, 'nova_product_generated_id', $created_product );

		return $created_product;
	}

	public function for_payment_email( $post_id ) {

		$user_id       = get_field( 'partner', $post_id );
		$user_info     = get_userdata( $user_id );
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject  = 'NOVA Signage - Quoted Order (ORDER #' . $post_id . ') ';
		$message  = '<p>Hello ' . $first_name . ',</p>';
		$message .= '<p>Please review the quotation for Order #' . $post_id . '.  below. Kindly proceed to checkout if everything looks good.</p>';
		$message .= '<p><a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';
		$message .= "<p>Don't hesitate to contact us if you have any questions or concerns.</p>";

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();

		$role_instance->send_email( $to, $subject, $message, $headers, array() );

		$to_admin       = get_option( 'admin_email' );
		$admin_subject  = 'NOVA Signage - You Sent a Quotation for Order #' . $post_id . '.';
		$admin_message  = '<p>Hello,</p>';
		$admin_message .= 'You sent a quotation to ' . $first_name . ' with Business ID: ' . $business_id . ' for their Order #' . $post_id . '.';
		$admin_message .= '<p>You may review the quotation you sent here:</p>';
		$admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a>';

		$role_instance->send_email( $to_admin, $admin_subject, $admin_message, $headers, array() );
	}

	public function for_quotation_email( $post_id ) {

		$user_id       = get_field( 'partner', $post_id );
		$user_info     = get_userdata( $user_id );
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject  = 'NOVA Signage -  Mockup Submitted for Quotation (ORDER #' . $post_id . ') ';
		$message  = '<p>Hello ' . $first_name . '.</p>';
		$message .= '<p>We got your quote request for Order #' . $post_id . '.</p>';
		$message .= '<p>Our team is reviewing your mockup.</p>';
		$message .= '<p>Should we require additional information or clarification on your design specifications, we will reach out to you within the next 24 business hours.</p>';
		$message .= '<p>Please review your order details:<br><a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();

		$role_instance->send_email( $to, $subject, $message, $headers, array() );

		$to_admin = get_option( 'admin_email' );

		$admin_subject = 'NOVA Signage - You Received a Quotation Request - Order #' . $post_id . '.';

		$to_admin_message  = '<p>Hello,</p>';
		$to_admin_message .= '<p>' . $first_name . ' with Business ID: <strong>' . $business_id . '</strong> sent a quotation request for their Order #' . $post_id . '.</p>';
		$to_admin_message .= '<p>You may review the mockup details here:<br></p>';
		$to_admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a>';

		$role_instance->send_email( $to_admin, $admin_subject, $to_admin_message, $headers, array() );
	}

	public function for_payment_email_action( $post_id ) {

		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( 'nova_quote' !== get_post_type( $post_id ) ) {
			return;
		}

		$quote_status = get_field( 'quote_status', $post_id );

		if ( 'ready' !== $quote_status['value'] ) {
			return;
		}

		do_action( 'processing_to_payment', $post_id );
	}

	public function for_quotation_email_action( $post_id ) {

		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( 'nova_quote' !== get_post_type( $post_id ) ) {
			return;
		}

		$quote_status = get_field( 'quote_status', $post_id );

		if ( 'processing' !== $quote_status['value'] ) {
			return;
		}

		// do_action( 'quote_to_processing', $post_id );
	}

	public function handle_dropbox_oauth_redirect() {
		if ( isset( $_GET['code'] ) && isset( $_GET['state'] ) ) {
			$authorizationCode = sanitize_text_field( $_GET['code'] );
			$state             = sanitize_text_field( $_GET['state'] );

			if ( ! wp_verify_nonce( $state, 'dropbox' ) ) {
				wp_redirect( admin_url( 'admin.php?page=nova-options&error=invalid_state' ) );
				exit;
			}

			$tokens = $this->exchangeAuthorizationCodeForAccessToken( $authorizationCode );

			$accessToken  = $tokens['access_token'] ?? null;
			$refreshToken = $tokens['refresh_token'] ?? null;

			if ( $accessToken && $refreshToken ) {
				update_field( 'dropbox_token_access', $accessToken, 'option' );
				update_field( 'dropbox_refresh_token', $refreshToken, 'option' );
				wp_redirect( admin_url( 'admin.php?page=nova-options&success=1' ) );
				exit;
			} else {
				wp_redirect( admin_url( 'admin.php?page=nova-options&error=token_retrieval_failed' ) );
				exit;
			}
		}
	}




	public function exchangeAuthorizationCodeForAccessToken( $authorizationCode ) {
		$clientId     = get_field( 'dropbox_app_key', 'option' );
		$clientSecret = get_field( 'dropbox_secret_key', 'option' );
		$redirectUri  = get_field( 'dropbox_redirect_url', 'option' );

		$url    = 'https://api.dropboxapi.com/oauth2/token';
		$params = array(
			'code'          => $authorizationCode,
			'grant_type'    => 'authorization_code',
			'client_id'     => $clientId,
			'client_secret' => $clientSecret,
			'redirect_uri'  => $redirectUri,
		);

		$response = wp_remote_post( $url, array( 'body' => $params ) );

		if ( is_wp_error( $response ) ) {
			// Handle error
			return null;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		return array(
			'access_token'  => $data['access_token'] ?? null,
			'refresh_token' => $data['refresh_token'] ?? null,
		);
	}



	public function redirect_if_loggedin() {
		if ( ( is_page( 'business-portal-sign-up' ) || is_page( 'business-portal' ) ) && is_user_logged_in() ) {
			wp_redirect( home_url( '/my-account/' ) );
			exit();
		}
	}

	public function acf_diable_field( $field ) {
		$field['readonly'] = true;
		return $field;
	}

	public function delete_quote() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			$status['code']   = '3';
			wp_send_json( $status );
		}
		$post_id = $_POST['quote_id'];

		/**delete custom post type with $post_ID */
		if ( wp_delete_post( $post_id ) ) {
			$status['status'] = 'success';
			$status['code']   = '2';
		} else {
			$status['error']  = 'Deletion failed';
			$status['status'] = 'error';
			$status['code']   = '4';
		}

		$status['post'] = $_POST;

		wp_send_json( $status );
	}

	public function quote_to_processing() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_account_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		if ( $_POST['role'] === 'pending' ) {
			$status['code']   = 3;
			$status['error']  = 'Pending Account';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		update_field( 'quote_status', 'processing', $_POST['quote'] );

		$this->for_quotation_email( $_POST['quote'] );

		$status['code'] = 2;
		wp_send_json( $status );
	}

	public function product_exists_by_title( $product_title ) {
		$existing_product = get_page_by_title( $product_title, 'OBJECT', 'product' );

		return $existing_product ? $existing_product->ID : false;
	}


	public function nova_to_checkout() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_account_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		$checkout_id = $_POST['product_id'];

		if ( ! $checkout_id ) {
			$status['error']  = 'No Product';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		if ( $_POST['role'] === 'pending' ) {
			$status['code']   = 3;
			$status['error']  = 'Pending Account';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		$post_id = $_POST['quote'];

		$title        = get_the_title( $post_id );
		$final_price  = get_field( 'final_price', $post_id );
		$product_id   = $_POST['nova_product'];
		$product_line = $_POST['product_line'];
		$product_name = $_POST['product'];
		$signage      = json_decode( get_field( 'signage', $post_id ) );
		$note         = get_field( 'note', $post_id );

		$status['final_price'] = get_field( 'final_price', $post_id );
		$status['note']        = $note;
		$status['quote']       = $signage;
		$status['post']        = $_POST;

		$product_meta = array(
			'usd_price'    => $final_price,
			'signage'      => $signage,
			'nova_quote'   => true,
			'nova_title'   => $title,
			'quote_id'     => $post_id,
			'nova_note'    => $note,
			'product'      => $product_name,
			'product_id'   => $product_id,
			'product_line' => $product_line,
		);

		$product_data = array(
			'post_title'   => wp_strip_all_tags( $title ),
			'post_content' => '',
			'post_status'  => 'publish',
			'post_type'    => 'product',
			'meta_input'   => array(
				'_regular_price' => $final_price,
				'_price'         => $final_price,
			),
		);

		if ( $checkout_id ) {
			WC()->cart->add_to_cart(
				$checkout_id,
				1,
				0,
				array(),
				$product_meta,
			);
			$status['code']          = 2;
			$status['product_added'] = 'yes';
		}

		wp_send_json( $status );
	}

	public function update_quote() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		$status['post']   = $_POST;
		$status['status'] = 'success';

		wp_send_json( $status );
	}

	public function save_custom_project() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['status'] = 'error';
			$status['error']  = 'Nonce error';
			wp_send_json( $status );
		}

		$args = array(
			'post_type'   => 'custom_project',
			'post_title'  => $_POST['title'],
			'post_status' => 'publish',
			'post_author' => $_POST['user'],
		);

		$post_id = wp_insert_post( $args );

		if ( ! is_wp_error( $post_id ) ) {

			update_field( 'projects', $_POST['projects'], $post_id );

			$status['code']   = 2;
			$status['post']   = $_POST;
			$status['status'] = 'success';
		} else {
			$status['code'] = 3;
			wp_send_json( $status );
		}

		wp_send_json( $status );
	}

	public function save_quote() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['status'] = 'error';
			$status['error']  = 'Nonce error';
			wp_send_json( $status );
		}

		if ( isset( $_POST['quote_id'] ) && isset( $_POST['editing'] ) && $_POST['editing'] === 'edit' ) {
			$post_id = $_POST['quote_id'];
		} else {

			$args = array(
				'post_type'   => 'nova_quote',
				'post_title'  => $_POST['title'],
				'post_status' => 'publish',
			);

			$post_id = wp_insert_post( $args );

		}

		if ( ! is_wp_error( $post_id ) ) {

			if ( isset( $_POST['quote_id'] ) && isset( $_POST['editing'] ) && $_POST['editing'] === 'edit' ) {
				wp_update_post(
					array(
						'ID'         => $_POST['quote_id'],
						'post_title' => $_POST['title'],
					)
				);
			}

			update_field( 'quote_status', 'draft', $post_id );
			update_field( 'partner', get_current_user_id(), $post_id );
			update_field( 'signage', $_POST['signage'], $post_id );
			update_field( 'final_price', $_POST['total'], $post_id );
			update_field( 'product', $_POST['product'], $post_id );
			update_field( 'quote_status', $_POST['quote_status'], $post_id );

			$status['code']   = 2;
			$status['post']   = $_POST;
			$status['status'] = 'success';
		} else {
			$status['code'] = 3;
			wp_send_json( $status );
		}

		wp_send_json( $status );
	}

	public function enable_ai_files( $mimes ) {
		$mimes['svg'] = 'image/svg+xml';
		$mimes['ai']  = 'application/postscript';
		return $mimes;
	}

	public function remove_signage_file() {
		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		$upload_dir = wp_upload_dir();

		$file_path = str_replace( $upload_dir['baseurl'], $upload_dir['basedir'], $_POST['file'] );

		if ( file_exists( $file_path ) ) {
			// Attempt to delete the file
			if ( unlink( $file_path ) ) {
				$status['code']    = 2;
				$status['message'] = 'File successfully deleted.';
			} else {
				$status['code']    = 3;
				$status['message'] = 'Error: Unable to delete the file.';
			}
		} else {
			$status['code']  = 4;
			$status['error'] = 'Error: File does not exist.';
		}

		wp_send_json( $status );
	}

	public function upload_signage_file() {
		$status = array(
			'code'     => 1,
			'uploaded' => 0,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		if ( ! function_exists( 'wp_handle_upload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}

		$file               = $_FILES['file'];
		$status['fileName'] = $file['name'];

		// Set a custom upload directory based on the current user's username.
		add_filter(
			'upload_dir',
			function ( $dir ) {
				$user     = wp_get_current_user();
				$username = $user->user_login;

				// Create the custom path.
				$custom_dir = '/' . $username;

				return array(
					'path'   => $dir['basedir'] . $custom_dir,
					'url'    => $dir['baseurl'] . $custom_dir,
					'subdir' => $custom_dir,
				) + $dir;
			}
		);

		$upload_overrides = array( 'test_form' => false );
		$movefile         = wp_handle_upload( $file, $upload_overrides );

		if ( $movefile && ! isset( $movefile['error'] ) ) {
			$status['code']    = 2;
			$status['message'] = "File is valid, and was successfully uploaded.\n";
		} else {
			$status['message'] = $movefile['error'];
		}

		// Remove the filter so it doesn't affect subsequent uploads
		remove_filter( 'upload_dir', 'custom_upload_directory' );

		$status['file'] = $movefile;
		wp_send_json( $status );
	}


	public function signage_pricing_table() {
		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_admin_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		$id = $_POST['id'];

		$acrylic_options = get_field( 'signage_quote_options', $id );

		$pricing = $acrylic_options['letter_height_x_logo_pricing'];

		$status['code']    = 2;
		$status['pricing'] = $pricing;
		wp_send_json( $status );
	}



	public function nova_rest_quote_file() {
		register_rest_route(
			'nova/v1',
			'/upload-quote-file',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_quote_file_upload' ),
				'permission_callback' => function (){},
			)
		);
	}

	public function handle_quote_file_upload( $request ) {
		return 'DONE';
		$files = $request->get_file_params();
		$file  = $files['file'];

		// Define the upload directory and options.
		$upload = wp_upload_bits( $file['name'], null, file_get_contents( $file['tmp_name'] ) );
		if ( ! $upload['error'] ) {
			$filename = $upload['file'];

			$quote_directory = WP_CONTENT_DIR . '/uploads/quote/';
			if ( ! file_exists( $quote_directory ) ) {
				wp_mkdir_p( $quote_directory );
			}
			$new_file_path = $quote_directory . basename( $filename );
			if ( rename( $filename, $new_file_path ) ) {
				return new WP_REST_Response( 'File uploaded successfully', 200 );
			}
		}

		return new WP_Error( 'upload_error', $upload['error'], array( 'status' => 500 ) );
	}

	public function quotes_nova_scripts() {
		wp_register_script(
			'nova-quote',
			get_theme_file_uri( '/quotes/build/index.js' ),
			array( 'wp-element' ),
			wp_get_theme()->get( 'Version' ),
			true
		);

		wp_register_style( 'nova-quote', get_stylesheet_directory_uri() . '/quotes/build/index.css', array( 'nova-output' ), wp_get_theme()->get( 'Version' ) );

		wp_localize_script(
			'nova-quote',
			'NovaQuote',
			array(
				'ajax_url'                => admin_url( 'admin-ajax.php' ),
				'nonce'                   => wp_create_nonce( 'quote_nonce' ),
				'quote_options'           => $this->get_quote_options(),
				'fonts'                   => $this->get_fonts(),
				'upload_rest'             => esc_url_raw( rest_url( '/nova/v1/upload-quote-file' ) ),
				'logged_in'               => is_user_logged_in(),
				'user_role'               => $this->get_current_user_role_slugs(),
				'user_id'                 => get_current_user_id(),
				'product'                 => get_the_ID(),
				'mockup_account_url'      => esc_url_raw( home_url( '/my-account/mockups/all' ) ),
				'is_editting'             => $this->is_editting(),
				'signage'                 => $this->get_signage(),
				'nova_quote_product'      => get_field( 'nova_quote_product', 'option' ),
				'current_quote_id'        => isset( $_GET['qid'] ) ? $_GET['qid'] : null,
				'current_quote_title'     => isset( $_GET['qid'] ) ? get_the_title( $_GET['qid'] ) : null,
				'dropbox_app_key'         => get_field( 'dropbox_app_key', 'option' ),
				'dropbox_secret'          => get_field( 'dropbox_secret_key', 'option' ),
				'dropbox_token'           => get_field( 'dropbox_token_access', 'option' ),
				'dropbox_refresh_token'   => get_field( 'dropbox_refresh_token', 'option' ),
				'business_id'             => get_field( 'business_id', 'user_' . get_current_user_id() ),
				'single_quote_options'    => get_field( 'single_quote_options' ),
				'generated_product_id'    => isset( $_GET['qid'] ) ? get_post_meta( $_GET['qid'], 'nova_product_generated_id', true ) : null,
				'metal_stainless_pricing' => get_field( 'lasercut_stainless_metal_pricing' ),
			)
		);

		if ( ( is_product( 'product' ) || is_account_page() || is_page( 'custom' ) || is_page( 'custom-project' ) ) && is_user_logged_in() || get_post_type() === 'signage' ) {
			wp_enqueue_script( 'nova-quote' );
			wp_enqueue_style( 'nova-quote' );
		}
	}

	public function get_current_user_role_slugs() {
		if ( is_user_logged_in() ) {
			$current_user = wp_get_current_user();
			$roles        = (array) $current_user->roles;
			return $roles;
		} else {
			return array();
		}
	}

	public function get_parent_id() {
		global $post;
		return $post->post_parent != 0 ? $post->post_parent : $post->ID;
	}

	public function get_quote_options() {
		$parent_id = wp_get_post_parent_id();
		return get_field( 'signage_quote_options', $parent_id );
	}

	public function get_fonts() {
		$list_files = get_stylesheet_directory() . '/assets/fonts';
		if ( ! function_exists( 'list_files' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		$files = list_files( $list_files );
		$fonts = array();

		foreach ( $files as $file ) {
			// Encode the basename to handle spaces in filenames
			$encoded_basename = rawurlencode( basename( $file ) );

			$fonts[] = array(
				'name' => pathinfo( $file, PATHINFO_FILENAME ),
				'src'  => get_stylesheet_directory_uri() . '/assets/fonts/' . $encoded_basename,
			);
		}

		return $fonts;
	}

	public function afc_load_popular_fonts( $value, $post_id, $field ) {
		if ( get_post_type( $post_id ) === 'product' ) {
			$popular = 'Arial,Futura,Helvetica,Garamond,Palatino,Optima,Montserrat,Patua One,Bebas Neue,Versa';
			$regular = 'Arial Regular,Arial Bold,Arial Rounded,Futura,Futura Md BT - Bold Italic,Futura Extra Black BT - Extra Black,Helvetica Regular,Helvetica - Bold,Arima - Semibold,Segoe Print - Bold,Malvie,Garamond Regular,Garamond Bold,Times New Roman,Century Schoolbook,Optima,Optima Semibold,Palatino Semibold,Trajan Bold,Twentieth Century,Comfortaa Bold,Fredoka Semibold,Montserrat Bold,Bai Jamjeree Semibold,Boogaloo Regular,Cooper Black,Coiny Regular,Muloka Karesh,Zilla Slab Semibold,Patua One,Antonio Bold,Bebas Neue,Versa,Chateau de Garage,Heavitas,';

			$popular_arr = explode( ',', $popular );
			foreach ( $popular_arr as $font ) {
				$value[] = array(
					'field_6552c810e7252' => $font,
				);
			}
		}
	}

	public function is_editting() {
		$editting = isset( $_GET['qid'] ) && ! empty( $_GET['qid'] ) && isset( $_GET['qedit'] ) && $_GET['qedit'] == 1;
		return $editting;
	}

	public function get_signage() {
		$editting = isset( $_GET['qid'] ) && ! empty( $_GET['qid'] ) && isset( $_GET['qedit'] ) && $_GET['qedit'] == 1;
		if ( $editting && ( get_post_status( $_GET['qid'] ) !== false ) && get_field( 'partner', $_GET['qid'] ) === get_current_user_id() ) {
			return get_field( 'signage', $_GET['qid'] );
		}
	}

	public function add_options_page() {
		$parent = acf_add_options_page(
			array(
				'page_title' => 'Nova Options',
				'menu_title' => 'Nova Options',
				'menu_slug'  => 'nova-options',
				'capability' => 'edit_posts',
				'redirect'   => false,
			)
		);
	}



	public function dropbox_api() {
		echo 'Test';
	}

	public function show_dropbox_oauth_errors() {
		if ( ! isset( $_GET['page'] ) && 'nova-options' !== $_GET['page'] ) {
			return;
		}
		if ( isset( $_GET['error'] ) ) {
			$error_message = '';

			switch ( $_GET['error'] ) {
				case 'invalid_state':
					$error_message = 'Invalid state parameter. Please try again.';
					break;
				case 'token_retrieval_failed':
					$error_message = 'Error retrieving access token. Please try again.';
					break;
			}

			if ( ! empty( $error_message ) ) {
				echo '<div class="notice notice-error is-dismissible"><p>' . esc_html( $error_message ) . '</p></div>';
			}
		}

		if ( isset( $_GET['success'] ) ) {
			echo '<div class="notice notice-success is-dismissible"><p>Access token successfully retrieved and saved.</p></div>';
		}
	}
}

Nova_Quote::get_instance();
