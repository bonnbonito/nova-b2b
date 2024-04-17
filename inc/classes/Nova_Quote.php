<?php
namespace NOVA_B2B\Inc\Classes;

use TCPDF;
use WP_Query;

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
		add_action( 'wp_ajax_update_dropbox_path', array( $this, 'update_dropbox_path' ) );
		add_action( 'wp_ajax_remove_signage_file', array( $this, 'remove_signage_file' ) );
		add_action( 'wp_ajax_quote_to_processing', array( $this, 'quote_to_processing' ) );
		add_action( 'wp_ajax_update_signage', array( $this, 'update_signage' ) );
		add_action( 'wp_ajax_to_checkout', array( $this, 'nova_to_checkout' ) );
		add_action( 'wp_ajax_delete_quote', array( $this, 'delete_quote' ) );
		add_action( 'wp_ajax_save_custom_project', array( $this, 'save_custom_project' ) );
		add_filter( 'upload_mimes', array( $this, 'enable_ai_files' ), 1, 1 );
		add_filter( 'acf/prepare_field/name=signage', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=final_price', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=partner', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=projects', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=partner_email', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=dropbox_token_access', array( $this, 'acf_diable_field' ) );
		add_action( 'template_redirect', array( $this, 'redirect_if_loggedin' ) );
		if ( function_exists( 'acf_add_options_page' ) ) {
			add_action( 'init', array( $this, 'add_options_page' ) );
		}
		add_action( 'admin_init', array( $this, 'handle_dropbox_oauth_redirect' ) );
		// add_action( 'acf/save_post', array( $this, 'for_payment_email_action' ) );
		add_action( 'acf/save_post', array( $this, 'quote_actions' ), 5, 1 );
		add_action( 'acf/save_post', array( $this, 'show_partner_email' ), 10, 1 );
		add_action( 'save_post', array( $this, 'regenerate_pdf' ), 10, 3 );
		add_action( 'quote_to_processing', array( $this, 'for_quotation_email' ) );
		add_action( 'quote_to_payment', array( $this, 'for_payment_email' ) );
		add_action( 'quote_to_payment', array( $this, 'create_nova_quote_product' ) );
		add_action( 'wp', array( $this, 'single_quote_redirect' ) );
		add_action( 'nova_product_instant_quote', array( $this, 'nova_product_instant_quote' ) );
		add_action( 'init', array( $this, 'custom_rewrite_rule' ), 10, 0 );
		add_filter( 'query_vars', array( $this, 'custom_query_vars' ) );
		add_action( 'admin_notices', array( $this, 'show_dropbox_oauth_errors' ) );
		add_action( 'kadence_single_before_inner_content', array( $this, 'show_product_dropdown' ) );
		add_action( 'add_meta_boxes', array( $this, 'nova_quote_add_admin_meta_box' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'nova_quote_admin_changed' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'update_dropbox_folder' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'generated_product_id' ), 10, 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'dequeue_lightbox_on_mockups_view' ), 100 );
	}

	public function show_partner_email( $post_id ) {
		$partner = get_field( 'partner', $post_id );
		if ( isset( $partner ) ) {
			$userdata = get_userdata( $partner );
			update_field( 'partner_email', $userdata->user_email, $post_id );
		}
	}

	public function dequeue_lightbox_on_mockups_view() {
		// Check if we're on the 'mockups-view' endpoint
		if ( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url( 'mockups-view' ) ) {
			wp_dequeue_script( 'kadence-lightbox-init' );
		}
	}

	public function generated_product_id( $post_type, $post ) {
		if ( $post_type !== 'nova_quote' ) {
			return;
		}

		add_meta_box(
			'nova_quote_generated_product_id',
			__( 'Generated Product ID:' ),
			array( $this, 'show_generated_product_id' ),
			'nova_quote',
			'side',
			'high'
		);
	}

	public function show_generated_product_id( $post ) {
		print_r( get_post_meta( $post->ID, 'nova_product_generated_id', true ) );
	}

	public function update_dropbox_folder( $post_type, $post ) {

		if ( $post_type !== 'nova_quote' ) {
			return;
		}

		$signage             = get_field( 'signage', $post->ID );
		$partner             = get_field( 'partner', $post->ID );
		$partner_business_id = get_field( 'business_id', 'user_' . $partner );
		$data                = json_decode( $signage, true );
		$show                = false;
		$user_folder_arr     = array();
		$font_folder_arr     = '';
		foreach ( $data as $item ) {
			foreach ( $item['filePaths'] as $filePath ) {
				$parts = explode( '/', $filePath );
				if ( isset( $parts[2] ) ) {
					$user_folder_arr[] = $parts[2];
				}
			}

			if ( isset( $item['fontFilePath'] ) ) {
				$parts = explode( '/', $item['fontFilePath'] );
				if ( isset( $parts[2] ) ) {
					$font_folder_arr = $parts[2];
				}
			}
		}

		$user_folder_arr = array_unique( $user_folder_arr );

		if ( ! empty( $user_folder_arr ) || isset( $user_folder_arr[0] ) ) {

			$old_folder = $user_folder_arr[0];
			if ( count( $user_folder_arr ) > 0 && $old_folder !== $partner_business_id ) {
				$show = true;
			}
		}

		if ( $font_folder_arr && $old_folder !== $partner_business_id ) {
			$show = true;
		}

		if ( $show ) {
			add_meta_box(
				'nova_update_dropbox_folder',
				__( 'Update Dropbox Folder:' ),
				array( $this, 'nova_update_dropbox_folder' ),
				'nova_quote',
				'side',
				'high'
			);
		}
	}

	public function nova_update_dropbox_folder( $post ) {
		$signage             = get_field( 'signage', $post->ID );
		$partner             = get_field( 'partner', $post->ID );
		$partner_business_id = get_field( 'business_id', 'user_' . $partner );
		$data                = json_decode( $signage, true );
		$user_folder_arr     = array();
		$font_folder_arr     = '';
		foreach ( $data as $item ) {
			foreach ( $item['filePaths'] as $filePath ) {
				$parts = explode( '/', $filePath );
				if ( isset( $parts[2] ) ) {
					$user_folder_arr[] = $parts[2];
				}
			}

			if ( isset( $item['fontFilePath'] ) ) {
				$parts = explode( '/', $item['fontFilePath'] );
				if ( isset( $parts[2] ) ) {
					$font_folder_arr = $parts[2];
				}
			}
		}

		$user_folder_arr = array_unique( $user_folder_arr );

		if ( ! empty( $user_folder_arr ) || isset( $user_folder_arr[0] ) ) {

			$old_folder = $user_folder_arr[0];
			$old_path   = '/NOVA-CRM/' . $old_folder . '/Q-' . $post->ID . '/FromClient';
			$new_path   = '/NOVA-CRM/' . $partner_business_id . '/Q-' . $post->ID . '/FromClient';
			if ( count( $user_folder_arr ) > 0 && $old_folder !== $partner_business_id ) {
				?>
<a class="button button-primary button-large mb-4 block" id="updateDropboxFolder" data-btn="updateDropbox"
	data-id="<?php echo $post->ID; ?>" data-new="<?php echo $new_path; ?>" data-old="<?php echo $old_path; ?>"
	style="margin-bottom: 10px;">Update
	Dropbox Folder</a>
				<?php
			}
		}

		if ( ! empty( $font_folder_arr ) || isset( $font_folder_arr ) ) {

			$old_folder = $font_folder_arr;
			$old_path   = '/NOVA-CRM/' . $old_folder . '/Q-' . $post->ID . '/Fonts';
			$new_path   = '/NOVA-CRM/' . $partner_business_id . '/Q-' . $post->ID . '/Fonts';
			if ( $font_folder_arr && $old_folder !== $partner_business_id ) {
				?>
<a class="button button-primary button-large block" id="updateDropboxFolderFont" data-btn="updateDropbox"
	data-id="<?php echo $post->ID; ?>" data-new="<?php echo $new_path; ?>" data-old="<?php echo $old_path; ?>">Update
	Dropbox Font Folder</a>
				<?php
			}
		}
	}

	public function nova_quote_admin_changed( $post_type, $post ) {

		if ( $post_type !== 'nova_quote' ) {
			return;
		}

		$status = get_field( 'quote_status', $post->ID );

		if ( isset( $status['value'] ) && $status['value'] === 'ready' ) {
			add_meta_box(
				'nova_quote_admin_revision',
				__( 'Updated by:' ),
				array( $this, 'nova_quote_who_updated' ),
				'nova_quote',
				'side',
				'high'
			);
		}
	}

	public function nova_quote_who_updated( $post ) {
		$args = array(
			'post_parent' => $post->ID,
			'post_type'   => 'revision',
			'numberposts' => 1,
			'orderby'     => 'modified',
			'order'       => 'DESC',
		);

		$latest_revision = get_children( $args );

		if ( $latest_revision ) {
			$revision           = array_shift( $latest_revision );
			$revision_author_id = $revision->post_author;

			// Get the user data of the author of the revision
			$user_info = get_userdata( $revision_author_id );

			echo '<p><strong>' . esc_html( $user_info->first_name ) . '</strong> (' . $user_info->user_email . ')</p>';
		} else {
			echo '<p>No revisions found.</p>';
		}
	}

	public function nova_quote_add_admin_meta_box( $post_type, $post ) {
		if ( $post_type !== 'nova_quote' ) {
			return;
		}
		add_meta_box(
			'nova_admin_view_quote',
			__( 'View Details', 'textdomain' ),
			array( $this, 'nova_admin_view_quote_callback' ),
			'nova_quote',
			'side',
			'default'
		);
	}

	public function nova_admin_view_quote_callback() {
		$details = home_url( '/my-account/mockups/view/?qid=' . get_the_ID() );
		?>

<a href="<?php echo esc_url( $details ); ?>" target="_blank" class="button button-primary button-large">View Details</a>
		<?php
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
		add_rewrite_rule( '^custom/([^/]*)/([^/]*)/(installation|tech-specs|sample-board|quote|overview)/?$', 'index.php?signage=$matches[1]/$matches[2]&pagetab=$matches[3]', 'top' );
	}

	public function nova_product_instant_quote() {
		?>
		<?php if ( ! is_user_logged_in() ) : ?>
			<?php echo do_shortcode( '[kadence_element id=" 202"]' ); ?>
			<?php
		elseif ( get_field( 'quote_div_id' ) ) :
			?>
<div id="<?php echo get_field( 'quote_div_id' ); ?>"></div>
			<?php
				else :
					?>
<div id="customProject"></div>
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

		$title        = get_field( 'frontend_title', $post_id );
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
			'note'       => $note,
		);

		ob_start();
		?>
<p>Product: <?php echo $product_name; ?></p>
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
				} elseif ( is_array( $value ) ) {
					$valueText = '<ul>';
					foreach ( $value as $subKey => $subValue ) {
						// Check if the sub-value is an array or object and recursively process it
						if ( is_array( $subValue ) || is_object( $subValue ) ) {
							$subValue = '<li>' . ucfirst( $subKey ) . ': ' . json_encode( $subValue ) . '</li>';
						} else {
							// Sanitize the sub-value
							$subValue = htmlspecialchars( $subValue, ENT_QUOTES, 'UTF-8' );
							$subValue = '<li>' . ucfirst( $subKey ) . ': ' . $subValue . '</li>';
						}
						$valueText .= $subValue;
					}
					$valueText .= '</ul>';
					$value      = $valueText;
				} else {
					$value = htmlspecialchars( $value, ENT_QUOTES, 'UTF-8' );
				}
				if ( $key === 'product' ) {
					$value = get_the_title( intval( $value ) );
				}

				// Print the rest of the details
				if ( ! empty( $value ) ) {
					echo '<li>' . ucfirst( $key ) . ': ' . $value . '</li>';
				}
			}
		}
			echo '</ul>';

		$content = ob_get_clean();

		$product_data = array(
			'post_title'   => wp_strip_all_tags( $title ),
			'post_content' => $content,
			'post_status'  => 'publish',
			'post_type'    => 'product',
			'meta_input'   => array(
				'_regular_price' => $final_price,
				'_price'         => $final_price,
			),
		);

		$existing_product_id = $this->product_exists_by_title( wp_strip_all_tags( $title ) );
		if ( ! $existing_product_id ) {
			$existing_product_id = wp_insert_post( $product_data );
			wp_set_object_terms( $existing_product_id, 'nova_quote', 'product_type' );
		}

		foreach ( $product_meta as $meta_key => $meta_value ) {
			update_post_meta( $existing_product_id, $meta_key, $meta_value );
		}

		update_post_meta( $post_id, 'nova_product_generated_id', $existing_product_id );
	}

	public function for_payment_email( $post_id ) {

		$user_id       = get_field( 'partner', $post_id );
		$user_info     = get_userdata( $user_id );
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$company       = get_field( 'business_name', 'user_' . $user_id );
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject  = 'NOVA Signage - Mockup for Review - Quote ID: Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );
		$message  = '<p>Hello ' . $first_name . ',</p>';
		$message .= '<p>Please review the quotation for Quote ID: Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '.  below. Kindly proceed to checkout if everything looks good.</p>';
		$message .= '<p><a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';
		$message .= "<p>Don't hesitate to contact us if you have any questions or concerns.</p>";

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();

		$role_instance->send_email( $to, $subject, $message, $headers, array() );

		$to_admin       = $this->to_admin_customer_rep_emails();
		$admin_subject  = 'NOVA - Quote Sent: Quote ID: Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . ' - ' . $first_name . ' ' . $business_id . ' from ' . $company;
		$admin_message  = '<p>Hello,</p>';
		$admin_message .= 'You sent a quotation to ' . $first_name . ' with Business ID: ' . $business_id . ' from ' . $company . ' for Quote ID : Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '.';
		$admin_message .= '<p>You may review the quotation you sent here:</p>';
		$admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a>';

		$role_instance->send_email( $to_admin, $admin_subject, $admin_message, $headers, array() );
	}

	public function for_quotation_email( $post_id ) {

		$user_id       = get_field( 'partner', $post_id );
		$user_info     = get_userdata( $user_id );
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$company       = get_field( 'business_name', 'user_' . $user_id );
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject  = 'NOVA Signage -  Mockup Submitted for Quotation (Quote ID:  Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . ') ';
		$message  = '<p>Hello ' . $first_name . '.</p>';
		$message .= '<p>We got your quote request for Quote ID: Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '.</p>';
		$message .= '<p>Our team is reviewing your mockup.</p>';
		$message .= '<p>Should we require additional information or clarification on your design specifications, we will reach out to you within the next 24 business hours.</p>';
		$message .= '<p>Please review your order details:<br><a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		$role_instance = \NOVA_B2B\Inc\Classes\Roles::get_instance();

		/*
		Remove send email to client */
		// $role_instance->send_email( $to, $subject, $message, $headers, array() );

		$to_admin = $this->to_admin_customer_rep_emails();

		$admin_subject = 'NOVA - Quote Request Received: QUOTE ID Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . ' - ' . $first_name . ' ' . $business_id . ' from ' . $company;

		// $admin_subject = 'NOVA Signage - You Received a Quotation Request - Quote ID: Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '.';

		$to_admin_message  = '<p>Hello,</p>';
		$to_admin_message .= '<p>' . $first_name . ' with Business ID: <strong>' . $business_id . '</strong> from ' . $company . ' sent a quotation request for their Quote ID: Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '.</p>';
		$to_admin_message .= '<p>You may review the mockup details here:<br></p>';
		$to_admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a>';

		$role_instance->send_email( $to_admin, $admin_subject, $to_admin_message, $headers, array() );
	}

	public function to_admin_customer_rep_emails() {
		if ( get_field( 'testing_mode', true ) ) {
			return array( 'bonn.j@hineon.com' );
		}

		$emails = array( get_option( 'admin_email' ) );

		$customer_rep_users = get_users( array( 'role' => 'customer-rep' ) );
		$admin_users        = get_users( array( 'role' => 'administrator' ) );

		$all_users = array_merge( $admin_users, $customer_rep_users );

		foreach ( $all_users as $user ) {
			$emails [] = $user->user_email;
		}

		return array_unique( $emails );
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

		do_action( 'for_payment_email_action' );
	}

	public function quote_actions( $post_id ) {

		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( 'nova_quote' !== get_post_type( $post_id ) ) {
			return;
		}

		$this->update_product_meta( $post_id );

		if ( isset( $_POST['acf']['field_655821f69cbab'] ) ) {

			if ( get_field( 'quote_status', $post_id )['value'] !== 'ready' && $_POST['acf']['field_655821f69cbab'] === 'ready' ) {
				do_action( 'quote_to_payment', $post_id );
			}

			if ( get_field( 'quote_status', $post_id )['value'] !== 'processing' && $_POST['acf']['field_655821f69cbab'] === 'processing' ) {
				do_action( 'quote_to_processing', $post_id );
			}
		}
	}

	public function update_product_meta( $post_id ) {
		$product_id = get_post_meta( $post_id, 'nova_product_generated_id', true );
		if ( ! $product_id ) {
			return;
		}

		$newjson = json_decode( get_field( 'signage', $post_id ) );
		update_field( 'signage', $newjson, $product_id );

		echo '<pre>';
		print_r( $post_id );
		print_r( json_decode( get_field( 'signage', $post_id ) ) );
		echo '</pre>';

		echo '<pre>';
		print_r( $product_id );
		print_r( get_field( 'signage', $product_id ) );
		echo '</pre>';
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

	public function regenerate_pdf( $post_id, $post, $update ) {
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( 'nova_quote' !== get_post_type( $post_id ) ) {
			return;
		}

		if ( $update ) {
			$html     = $this->html_invoice( $post_id );
			$html_cad = $this->html_invoice_cad( $post_id );
			$this->generate_pdf( $post_id, $html, 'USD' );
			$this->generate_pdf( $post_id, $html_cad, 'CAD' );
		}
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
		$existing_product_query = new WP_Query(
			array(
				'post_type'      => 'product',
				'title'          => $product_title,
				'posts_per_page' => 1,
			)
		);

		if ( $existing_product_query->have_posts() ) {
			return $existing_product_query->posts[0]->ID; // Return the ID of the existing product
		}

		return false; // No product found by title
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
			'note'         => $note,
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

		$status['post'] = $_POST;

		wp_send_json( $status );
	}

	public function update_dropbox_path() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['error']  = 'Nonce error';
			$status['status'] = 'error';
			wp_send_json( $status );
		}

		$quote_id = $_POST['quote_id'];
		$updated  = $_POST['updated'];

		update_field( 'signage', $updated, $quote_id );

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

	public function html_invoice_cad( $post_id ) {
		ob_start();
		$instance = \NOVA_B2B\Inc\Classes\Scripts::get_instance();
		$user_id  = get_field( 'partner', $post_id );

		$final_price = floatval( get_field( 'final_price', $post_id ) );

		$final_price = number_format( $final_price * 1.3, 2, '.', '' );

		$product_id   = get_field( 'product', $post_id )->ID;
		$product_name = get_field( 'product', $post_id )->post_title;
		$signage      = json_decode( get_field( 'signage', $post_id ) );
		$note         = get_field( 'note', $post_id );

		$flat_rate     = 14.75 * 1.3;
		$standard_rate = $final_price * 0.075;

		$estimatedShipping = $final_price > 0 ? number_format( max( $flat_rate, $standard_rate ), 2, '.', '' ) : 0;

		$tax         = $instance->get_woocommerce_tax_rate_by_country_and_state( $user_id, '', '' );
		$tax_rate    = 0;
		$tax_compute = 0;
		if ( $tax ) {
			$tax_rate_name = $tax->tax_rate_name;
			$tax_rate      = floatval( $tax->tax_rate / 100 );
			$tax_compute   = number_format( $final_price * $tax_rate, 2, '.', '' );
		}

		$estimate_total = $final_price + $tax_compute + $estimatedShipping;

		$estimate_total = number_format( $estimate_total, 2, '.', '' );

		?>
<style>
h4,
h6 {
	margin-bottom: 0pt;
	margin-top: 0px;
}
</style>
<table>
	<tr>
		<td>
			<h4 style="font-size: 14pt; margin: 0;">QUOTE ID: Q-<?php echo str_pad( $post_id, 4, '0', STR_PAD_LEFT ); ?>
			</h4>
			<p style="padding-bottom: 0; margin-bottom: 0;">INITIAL QUOTE REQUESTED ON: <font face="lato">
					<?php echo get_the_date( 'F j, Y', $post_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">LAST QUOTE SAVED: <font face="lato">
					<?php echo get_the_modified_date( 'F j, Y', $post_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">QUOTE NAME: <font face="lato">
					<?php echo get_field( 'frontend_title', $post_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">BUSINESS ID: <font face="lato">
					<?php echo get_field( 'business_id', 'user_' . $user_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">COMPANY NAME: <font face="lato">
					<?php echo ( get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None' ); ?>
				</font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">MATERIAL: <font face="lato">
					<?php echo $instance->get_material_name( $product_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 40px;">PRODUCT: <font face="lato">
					<?php echo $product_name; ?></font>
			</p>
		</td>
	</tr>

	<tr>
		<td cellpadding="10"></td>
	</tr>

	<tr>
		<td style="padding-top: 20px; padding-bottom: 20px;">
			<?php
			foreach ( $signage as $project ) {
				$projectArray = get_object_vars( $project );
				$price        = $projectArray['cadPrice'];

				?>
			<table style="margin-top: 40pt;">
				<tr style="font-size: 17px; font-weight: bold;">
					<td><?php echo $projectArray['title']; ?></td>
					<td style="text-align: right;">CAD$ <?php echo $price; ?></td>
				</tr>
				<?php
				if ( isset( $projectArray['letters'] ) ) {
					$color = isset( $projectArray['color'] ) ? ' color: ' . $projectArray['color']->color : '';
					$face  = $projectArray['font'] ? strtolower( str_replace( array( 'regular', ' ', 'bold' ), array( '', '_', 'b' ), $projectArray['font'] ) ) : '';
					$style = $color . $face;
					?>
				<tr>
					<td colspan="2">
						<div style="padding: 100px; border-radius: 8px; border: 1px solid #ddd;">
							<h1 style="text-align: center;">
								<font size="22" face="<?php echo $face; ?>"
									<?php echo ( isset( $projectArray['color'] ) && $projectArray['color']->color ? ' color="' . $projectArray['color']->color . '" ' : '' ); ?>>
									<?php echo $projectArray['letters']; ?>
								</font>
							</h1>
						</div>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<td colspan="2" style="padding:40px;"></td>
				</tr>
			</table>

				<?php
				$this->output_project_item( $project );
			}

			?>
		</td>
	</tr>
		<?php if ( $note ) : ?>
	<tr>
		<td style="font-size:110%;">NOTE:</td>
	</tr>
	<tr>
		<td>
			<?php echo str_replace( '"', '&quot;', $note ); ?>
		</td>
	</tr>
	<?php endif; ?>
	<tr>
		<td></td>
	</tr>
	<tr>
		<td style="padding-top: 20px; border-top: 1px solid #ddd;">
			<table>
				<tr>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>
						<h5 style="font-size: 13pt">ESTIMATED SUBTOTAL:</h5>
					</td>
					<td style="text-align: right;">
						<h5 style="font-size: 13pt">CAD$
							<?php echo $final_price; ?></h5>
					</td>
				</tr>
				<tr>
					<td>
						<h5 style="font-size: 13pt">PACKAGING &amp; SHIPPING:</h5>
					</td>
					<td style="text-align: right;">
						<h5 style="font-size: 13pt">CAD$
							<?php echo $estimatedShipping; ?></h5>
					</td>
				</tr>
				<?php if ( $tax ) { ?>
				<tr>
					<td>
						<h5 style="font-size: 13pt"><?php echo $tax_rate_name; ?>:</h5>
					</td>
					<td style="text-align: right;">
						<h5 style="font-size: 13pt">CAD$
							<?php echo $tax_compute; ?></h5>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<td style="padding-top: 20px; padding-bottom: 20px;">
						<h4 style="font-size: 14pt;">ESTIMATED TOTAL:
						</h4>
					</td>
					<td style="padding-top: 20px; padding-bottom: 20px; text-align: right;">
						<h4 style="font-size: 14pt;">CAD$
							<?php echo $estimate_total; ?></h4>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

		<?php
		return ob_get_clean();
	}

	public function html_invoice( $post_id ) {
		ob_start();
		$instance = \NOVA_B2B\Inc\Classes\Scripts::get_instance();
		$user_id  = get_field( 'partner', $post_id );

		$final_price = floatval( get_field( 'final_price', $post_id ) );

		$product_id   = get_field( 'product', $post_id )->ID;
		$product_name = get_field( 'product', $post_id )->post_title;
		$signage      = json_decode( get_field( 'signage', $post_id ) );
		$note         = get_field( 'note', $post_id );

		$flat_rate     = 14.75;
		$standard_rate = $final_price * 0.075;

		$estimatedShipping = $final_price > 0 ? number_format( max( $flat_rate, $standard_rate ), 2, '.', '' ) : 0;

		$tax         = $instance->get_woocommerce_tax_rate_by_country_and_state( $user_id, '', '' );
		$tax_rate    = 0;
		$tax_compute = 0;
		if ( $tax ) {
			$tax_rate_name = $tax->tax_rate_name;
			$tax_rate      = floatval( $tax->tax_rate / 100 );
			$tax_compute   = number_format( $final_price * $tax_rate, 2, '.', '' );
		}

		$estimate_total = $final_price + $tax_compute + $estimatedShipping;

		?>
<style>
h4,
h6 {
	margin-bottom: 0pt;
	margin-top: 0px;
}
</style>
<table>
	<tr>
		<td>
			<h4 style="font-size: 14pt; margin: 0;">QUOTE ID: Q-<?php echo str_pad( $post_id, 4, '0', STR_PAD_LEFT ); ?>
			</h4>
			<p style="padding-bottom: 0; margin-bottom: 0;">INITIAL QUOTE REQUESTED ON: <font face="lato">
					<?php echo get_the_date( 'F j, Y', $post_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">LAST QUOTE SAVED: <font face="lato">
					<?php echo get_the_modified_date( 'F j, Y', $post_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">QUOTE NAME: <font face="lato">
					<?php echo get_field( 'frontend_title', $post_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">BUSINESS ID: <font face="lato">
					<?php echo get_field( 'business_id', 'user_' . $user_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">COMPANY NAME: <font face="lato">
					<?php echo ( get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None' ); ?>
				</font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 0;">MATERIAL: <font face="lato">
					<?php echo $instance->get_material_name( $product_id ); ?></font>
			</p>
			<p style="padding-bottom: 0; margin-bottom: 40px;">PRODUCT: <font face="lato">
					<?php echo $product_name; ?></font>
			</p>
		</td>
	</tr>

	<tr>
		<td cellpadding="10"></td>
	</tr>

	<tr>
		<td style="padding-top: 20px; padding-bottom: 20px;">
			<?php
			foreach ( $signage as $project ) {
				$projectArray = get_object_vars( $project );
				$price        = $projectArray['usdPrice'];

				?>
			<table style="margin-top: 40pt;">
				<tr style="font-size: 17px; font-weight: bold;">
					<td><?php echo $projectArray['title']; ?></td>
					<td style="text-align: right;">USD$ <?php echo $price; ?></td>
				</tr>
				<?php
				if ( isset( $projectArray['letters'] ) ) {
					$color = isset( $projectArray['color'] ) ? ' color: ' . $projectArray['color']->color : '';
					$face  = $projectArray['font'] ? strtolower( str_replace( array( 'regular', ' ', 'bold' ), array( '', '_', 'b' ), $projectArray['font'] ) ) : '';
					$style = $color . $face;
					?>
				<tr>
					<td colspan="2">
						<div style="padding: 100px; border-radius: 8px; border: 1px solid #ddd;">
							<h1 style="text-align: center;">
								<font size="22" face="<?php echo $face; ?>"
									<?php echo ( isset( $projectArray['color'] ) && $projectArray['color']->color ? ' color="' . $projectArray['color']->color . '" ' : '' ); ?>>
									<?php echo $projectArray['letters']; ?>
								</font>
							</h1>
						</div>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<td colspan="2" style="padding:40px;"></td>
				</tr>
			</table>

				<?php

				$this->output_project_item( $project );

			}

			?>
		</td>
	</tr>
		<?php if ( $note ) : ?>
	<tr>
		<td style="font-size:110%;">NOTE:</td>
	</tr>
	<tr>
		<td>
			<?php echo str_replace( '"', '&quot;', $note ); ?>
		</td>
	</tr>
	<?php endif; ?>
	<tr>
		<td></td>
	</tr>
	<tr>
		<td style="padding-top: 20px; border-top: 1px solid #ddd;">
			<table>
				<tr>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>
						<h5 style="font-size: 13pt">ESTIMATED SUBTOTAL:</h5>
					</td>
					<td style="text-align: right;">
						<h5 style="font-size: 13pt">USD$
							<?php echo $final_price; ?></h5>
					</td>
				</tr>
				<tr>
					<td>
						<h5 style="font-size: 13pt">PACKAGING &amp; SHIPPING:</h5>
					</td>
					<td style="text-align: right;">
						<h5 style="font-size: 13pt">USD$
							<?php echo $estimatedShipping; ?></h5>
					</td>
				</tr>
				<?php if ( $tax ) { ?>
				<tr>
					<td>
						<h5 style="font-size: 13pt"><?php echo $tax_rate_name; ?>:</h5>
					</td>
					<td style="text-align: right;">
						<h5 style="font-size: 13pt">USD$
							<?php echo $tax_compute; ?></h5>
					</td>
				</tr>
				<?php } ?>
				<tr>
					<td style="padding-top: 20px; padding-bottom: 20px;">
						<h4 style="font-size: 14pt;">ESTIMATED TOTAL:
						</h4>
					</td>
					<td style="padding-top: 20px; padding-bottom: 20px; text-align: right;">
						<h4 style="font-size: 14pt;">USD$
							<?php echo $estimate_total; ?></h4>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

		<?php
		return ob_get_clean();
	}

	public function output_project_item( $project ) {
		echo '<table>';
		$projectArray = get_object_vars( $project );

		if ( isset( $projectArray['title'] ) && ! empty( $projectArray['title'] ) ) {
			echo '<tr style="font-size: 14px; text-transform: uppercase; padding-top: 40px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">Title: </strong></td><td><font face="lato">' . $projectArray['title'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['thickness'] ) && ! empty( $projectArray['thickness'] ) && $projectArray['thickness'] ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">THICKNESS: </strong></td><td><font face="lato">' . $projectArray['thickness']->thickness . '</font></td></tr>';
		}

		if ( isset( $projectArray['layers'] ) && ! empty( $projectArray['layers'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">Layers: </strong></td><td><font face="lato">' . $projectArray['layers'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['depth'] ) && ! empty( $projectArray['depth'] ) && $projectArray['depth'] ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">METAL DEPTH: </strong></td><td><font face="lato">' . $projectArray['depth']->depth . '</font></td></tr>';
		}

		if ( isset( $projectArray['width'] ) && ! empty( $projectArray['width'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">WIDTH: </strong></td><td><font face="lato">' . $projectArray['width'] . '"</font></td></tr>';
		}

		if ( isset( $projectArray['height'] ) && ! empty( $projectArray['height'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">HEIGHT: </strong></td><td><font face="lato">' . $projectArray['height'] . '"</font></td></tr>';
		}

		if ( isset( $projectArray['printPreference'] ) && ! empty( $projectArray['printPreference'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">PRINT PREFERENCE: </strong></td><td><font face="lato">' . $projectArray['printPreference'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['baseColor'] ) && ! empty( $projectArray['baseColor'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">BASE COLOR: </strong></td><td><font face="lato">' . $projectArray['baseColor'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['letterHeight'] ) && ! empty( $projectArray['letterHeight'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">Letter Height: </strong></td><td><font face="lato">' . $projectArray['letterHeight'] . '"</font></td></tr>';
		}

		if ( isset( $projectArray['metal'] ) && ! empty( $projectArray['metal'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">METAL OPTION: </strong></td><td><font face="lato">' . $projectArray['metal'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['stainLessMetalFinish'] ) && ! empty( $projectArray['stainLessMetalFinish'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">METAL FINISH: </strong></td><td><font face="lato">' . $projectArray['stainLessMetalFinish'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['acrylicReveal'] ) && ! empty( $projectArray['acrylicReveal'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">ACRYLIC REVEAL: </strong></td><td><font face="lato">' . $projectArray['acrylicReveal'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['mounting'] ) && ! empty( $projectArray['mounting'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">MOUNTING: </strong></td><td><font face="lato">' . $projectArray['mounting'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['waterproof'] ) && ! empty( $projectArray['waterproof'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">WATERPROOF: </strong></td><td><font face="lato">' . $projectArray['waterproof'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['finishing'] ) && ! empty( $projectArray['finishing'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">FINISHING: </strong></td><td><font face="lato">' . $projectArray['finishing'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['metalFinishing'] ) && ! empty( $projectArray['metalFinishing'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">METAL FINISHING: </strong></td><td><font face="lato">' . $projectArray['metalFinishing'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['metalFinish'] ) && ! empty( $projectArray['metalFinish'] ) && ! is_object( $projectArray['metalFinish'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">METAL FINISH: </strong></td><td><font face="lato">' . $projectArray['metalFinish'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['stainlessSteelPolished'] ) && ! empty( $projectArray['stainlessSteelPolished'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">STEEL POLISHED: </strong></td><td><font face="lato">' . $projectArray['stainlessSteelPolished'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['font'] ) && ! empty( $projectArray['font'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">FONT: </strong></td><td><font face="lato">' . $projectArray['font'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['fontFileUrl'] ) && ! empty( $projectArray['fontFileUrl'] ) && isset( $projectArray['fontFileName'] ) && ! empty( $projectArray['fontFileName'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">FONT FILE: </strong></td><td><font face="lato"><a href="' . $projectArray['fontFileUrl'] . '" target="_blank">' . $projectArray['fontFileName'] . '</a></font></td></tr>';
		}

		if ( isset( $projectArray['customFont'] ) && ! empty( $projectArray['customFont'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">CUSTOM FONT: </strong></td><td><font face="lato">' . $projectArray['customFont'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['color'] ) && is_object( $projectArray['color'] ) && ! empty( $projectArray['color']->name ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">COLOR: </strong></td><td><font face="lato">' . $projectArray['color']->name . '</font></td></tr>';
		}

		if ( isset( $projectArray['pvcBaseColor'] ) && is_object( $projectArray['pvcBaseColor'] ) && ! empty( $projectArray['pvcBaseColor']->name ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">PVC BASE COLOR: </strong></td><td><font face="lato">' . $projectArray['pvcBaseColor']->name . '</font></td></tr>';
		}

		if ( isset( $projectArray['customColor'] ) && ! empty( $projectArray['customColor'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">CUSTOM COLOR: </strong></td><td><font face="lato">' . $projectArray['customColor'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['letters'] ) && ! empty( $projectArray['letters'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">LINE TEXT: </strong></td><td><font face="lato">' . $projectArray['letters'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['metalFinish'] ) && ! empty( $projectArray['metalFinish'] ) && isset( $projectArray['metalFinish']->name ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">METAL FINISH: </strong></td><td><font face="lato">' . $projectArray['metalFinish']->name . '</font></td></tr>';
		}

		if ( isset( $projectArray['acrylicBase'] ) && ! empty( $projectArray['acrylicBase'] ) && isset( $projectArray['acrylicBase']->name ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">ACRYLIC BASE: </strong></td><td><font face="lato">' . $projectArray['acrylicBase']->name . '</font></td></tr>';
		}

		if ( isset( $projectArray['studLength'] ) && ! empty( $projectArray['studLength'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">STUD LENGTH: </strong></td><td><font face="lato">' . $projectArray['studLength'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['spacerStandoffDistance'] ) && ! empty( $projectArray['spacerStandoffDistance'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">SPACER STANDOFF DISTANCE: </strong></td><td><font face="lato">' . $projectArray['spacerStandoffDistance'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['ledLightColor'] ) && ! empty( $projectArray['ledLightColor'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">LED LIGHT COLOR: </strong></td><td><font face="lato">' . $projectArray['ledLightColor'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['installation'] ) && ! empty( $projectArray['installation'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">INSTALLATION: </strong></td><td><font face="lato">' . $projectArray['installation'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['acrylicCover'] ) && ! empty( $projectArray['acrylicCover'] ) && isset( $projectArray['acrylicCover']->name ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">ACRYLIC COVER: </strong></td><td><font face="lato">' . $projectArray['acrylicCover']->name . '</font></td></tr>';
		}

		if ( isset( $projectArray['frontAcrylicCover'] ) && ! empty( $projectArray['frontAcrylicCover'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">FRONT ACRYLIC COVER: </strong></td><td><font face="lato">' . $projectArray['frontAcrylicCover'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['vinylWhite'] ) && ! empty( $projectArray['vinylWhite'] ) && isset( $projectArray['vinylWhite']->name ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">ACRYLIC COVER: </strong></td><td><font face="lato">' . $projectArray['vinylWhite']->name . '</font></td></tr>';
		}

		if ( isset( $projectArray['pieces'] ) && ! empty( $projectArray['pieces'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">PIECES/CUTOUTS: </strong></td><td><font face="lato">' . $projectArray['pieces'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['sets'] ) && ! empty( $projectArray['sets'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">QUANTITY: </strong></td><td><font face="lato">' . $projectArray['sets'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['comments'] ) && ! empty( $projectArray['comments'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">COMMENTS: </strong></td><td><font face="lato">' . $projectArray['comments'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['description'] ) && ! empty( $projectArray['description'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">DESCRIPTION: </strong></td><td><font face="lato">' . $projectArray['description'] . '</font></td></tr>';
		}

		if ( isset( $projectArray['fileUrl'] ) && ! empty( $projectArray['fileUrl'] ) && isset( $projectArray['fileName'] ) && ! empty( $projectArray['fileName'] ) ) {
			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">FILE: </strong></td><td><font face="lato"><a href="' . $projectArray['fileUrl'] . '" target="_blank">' . $projectArray['fileName'] . '</a></font></td></tr>';
		}

		if ( isset( $projectArray['fileUrls'] ) && ! empty( $projectArray['fileUrls'] ) && isset( $projectArray['fileNames'] ) && ! empty( $projectArray['fileNames'] ) ) {
			$filesHtml = '';
			foreach ( $projectArray['fileUrls'] as $index => $fileUrl ) {
				// Get the corresponding file name or use the URL as the name if not available
				$fileName   = $projectArray['fileNames'][ $index ] ?? $fileUrl;
				$filesHtml .= '<a href="' . htmlspecialchars( $fileUrl, ENT_QUOTES, 'UTF-8' ) . '" target="_blank">' . htmlspecialchars( $fileName, ENT_QUOTES, 'UTF-8' ) . '</a><br>';
			}

			echo '<tr style="font-size: 14px;"><td style="width: 160px;"><strong style="text-transform: uppercase;">FILES: </strong></td><td><font face="lato">' . $filesHtml . '</font></td></tr>';
		}

		echo '<tr><td></td></tr>';
		echo '<tr><td></td></tr>';

		echo '</table>';
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

			wp_update_post(
				array(
					'ID'         => $post_id,
					'post_title' => $post_id . ' - ' . $_POST['title'],
				)
			);

		}

		if ( ! is_wp_error( $post_id ) ) {

			if ( isset( $_POST['quote_id'] ) && isset( $_POST['editing'] ) && $_POST['editing'] === 'edit' ) {
				wp_update_post(
					array(
						'ID'         => $post_id,
						'post_title' => $post_id . ' - ' . $_POST['title'],
					)
				);
			}

			update_field( 'frontend_title', $_POST['title'], $post_id );
			update_field( 'partner', get_current_user_id(), $post_id );
			update_field( 'signage', $_POST['signage'], $post_id );
			update_field( 'final_price', $_POST['total'], $post_id );
			update_field( 'product', $_POST['product'], $post_id );
			update_field( 'quote_status', $_POST['quote_status'], $post_id );
			update_field( 'currency', $_POST['currency'], $post_id );

			if ( 'processing' == $_POST['quote_status'] ) {
				$html     = $this->html_invoice( $post_id );
				$html_cad = $this->html_invoice_cad( $post_id );
				/*Remove for quotation email*/
				$this->for_quotation_email( $post_id );
				$this->generate_pdf( $post_id, $html, 'USD' );
				$this->generate_pdf( $post_id, $html_cad, 'CAD' );
			}

			$status['code']         = 2;
			$status['post']         = $_POST;
			$status['generated_id'] = $post_id;
			$status['status']       = 'success';

		} else {
			$status['code'] = 3;
			wp_send_json( $status );
		}

		wp_send_json( $status );
	}



	public function generate_pdf( $post_id, $html, $currency = 'USD' ) {
		require_once get_stylesheet_directory() . '/tcpdf/tcpdf.php';

		$partner = get_field( 'partner', $post_id );

		$business_id = get_field( 'business_id', 'user_' . $partner );

		$pdf = new TCPDF( PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false );

		$filename = $business_id . '-INV-Q-' . $post_id . '-' . $currency . '.pdf';

		// set document information
		$pdf->SetCreator( PDF_CREATOR );
		$pdf->SetAuthor( 'NOVA Signage' );
		$pdf->SetTitle( 'Customer Invoice - ' . $post_id );
		$pdf->SetSubject( '' );
		$pdf->SetKeywords( '' );

		// remove default header/footer
		$pdf->setPrintHeader( false );
		$pdf->setPrintFooter( false );

		// set default monospaced font
		$pdf->SetDefaultMonospacedFont( PDF_FONT_MONOSPACED );

		// set margins
		$pdf->SetMargins( PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT );
		$pdf->SetHeaderMargin( PDF_MARGIN_HEADER );
		$pdf->SetFooterMargin( PDF_MARGIN_FOOTER );

		// set auto page breaks
		$pdf->SetAutoPageBreak( true, PDF_MARGIN_BOTTOM );

		// set image scale factor
		$pdf->setImageScale( PDF_IMAGE_SCALE_RATIO );

		// set some language-dependent strings (optional)
		// if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
		// require_once(dirname(__FILE__).'/lang/eng.php');
		// $pdf->setLanguageArray($l);
		// }

		// ---------------------------------------------------------

		// set default font subsetting mode
		$pdf->setFontSubsetting( true );

		// setfont
		$pdf->SetFont( 'secularone', '', 10, '', true );

		$pdf->SetMargins( 10, 10, 10, true );

		// Add a page
		// This method has several options, check the source code documentation for more information.
		$pdf->AddPage();

		$pdf->writeHTML( $html, true, false, true, false, '' );

		$pdf->Output( $_SERVER['DOCUMENT_ROOT'] . 'wp-content/customer_invoices/' . $filename, 'F' );
	}

	function create_customer_invoice_folder( $business_id, $quote_id ) {
		// Get the WordPress uploads directory.
		$upload_dir = wp_upload_dir();
		$base_dir   = $upload_dir['basedir'] . '/customer_invoices';

		// Ensure the base directory exists.
		if ( ! file_exists( $base_dir ) ) {
			if ( ! wp_mkdir_p( $base_dir ) ) {
				return new WP_Error( 'base_directory_creation_failed', __( 'Failed to create base directory for customer invoices.', 'nova-b2b' ) );
			}
		}

		// Define the directory path for the specific business and quote.
		$business_dir = $base_dir . '/' . $business_id;

		// Check if the business directory exists and create it if it doesn't.
		if ( ! file_exists( $business_dir ) ) {
			if ( ! wp_mkdir_p( $business_dir ) ) {
				print_r( $business_id . 'err' );
				return new WP_Error( 'business_directory_creation_failed', __( 'Failed to create business directory.', 'nova-b2b' ) );
			}
		}

		if ( file_exists( $business_dir ) ) {
			print_r( $business_id . 'yes' );
			die();
		}

		return true;
	}


	public function enable_ai_files( $mimes ) {
		$mimes['svg'] = 'image/svg+xml';
		$mimes['ai']  = 'application/postscript';
		return $mimes;
	}

	public function update_signage() {
		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}
		$id           = $_POST['post_id'];
		$old          = $_POST['old_path'];
		$new          = $_POST['new_path'];
		$signage_json = $_POST['signage'];

		// Replace old path with new path in the JSON string
		$new_signage_json = str_replace( $old, $new, $signage_json );

		// Update the 'signage' field with the new JSON string
		update_field( 'signage', $new_signage_json, $id );

		$status['code']    = 2;
		$status['signage'] = $new_signage_json;
		$status['post']    = $_POST;

		wp_send_json( $status );
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
				'ajax_url'                   => admin_url( 'admin-ajax.php' ),
				'invoice_url'                => esc_url_raw( content_url( '/customer_invoices' ) ),
				'nonce'                      => wp_create_nonce( 'quote_nonce' ),
				'quote_options'              => $this->get_quote_options(),
				'letter_pricing_table'       => $this->get_letter_pricing_table(),
				'letter_pricing_tables'      => $this->get_letter_pricing_tables(),
				'parent_id'                  => $this->get_parent_id(),
				'logo_pricing_tables'        => $this->get_logo_pricing_tables(),
				'fonts'                      => $this->get_fonts(),
				'upload_rest'                => esc_url_raw( rest_url( '/nova/v1/upload-quote-file' ) ),
				'logged_in'                  => is_user_logged_in(),
				'user_role'                  => $this->get_current_user_role_slugs(),
				'user_id'                    => get_current_user_id(),
				'product'                    => get_the_ID(),
				'quote_url'                  => get_permalink( get_the_ID() ),
				'mockup_account_url'         => esc_url_raw( home_url( '/my-account/mockups/all' ) ),
				'is_editting'                => $this->is_editting(),
				'signage'                    => $this->get_signage(),
				'not_author_but_admin'       => $this->not_author_but_admin(),
				'nova_quote_product'         => get_field( 'nova_quote_product', 'option' ),
				'current_quote_id'           => isset( $_GET['qid'] ) ? $_GET['qid'] : null,
				'current_quote_title'        => isset( $_GET['qid'] ) ? get_field( 'frontend_title', $_GET['qid'] ) : null,
				'dropbox_app_key'            => get_field( 'dropbox_app_key', 'option' ),
				'dropbox_secret'             => get_field( 'dropbox_secret_key', 'option' ),
				'dropbox_token'              => get_field( 'dropbox_token_access', 'option' ),
				'dropbox_refresh_token'      => get_field( 'dropbox_refresh_token', 'option' ),
				'business_id'                => get_field( 'business_id', 'user_' . get_current_user_id() ),
				'single_quote_options'       => get_field( 'single_quote_options' ),
				'generated_product_id'       => isset( $_GET['qid'] ) ? get_post_meta( $_GET['qid'], 'nova_product_generated_id', true ) : null,
				'metal_stainless_pricing'    => get_field( 'lasercut_stainless_metal_pricing' ),
				'quote_status'               => isset( $_GET['qid'] ) ? get_field( 'quote_status', $_GET['qid'] ) : '',
				'small_punctuations_pricing' => $this->small_punctuations_pricing(),
				'lowercase_pricing'          => $this->lowercase_pricing(),
				'quote_div_id'               => get_field( 'quote_div_id' ),
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

	public function get_letter_pricing_table() {

		if ( ( get_field( 'letter_pricing_table' ) && get_field( 'letter_pricing_table' )['pricing_table'] === '' ) || get_field( 'letter_pricing_table' ) === null ) {
			$parent_id = wp_get_post_parent_id( get_the_ID() );
			return get_field( 'letter_pricing_table', $parent_id );
		}

		return get_field( 'letter_pricing_table' );
	}

	public function get_letter_pricing_tables() {

		$table = get_field( 'letter_pricing_tables' );

		return $table;
	}

	public function lowercase_pricing() {

		$pricing = get_field( 'lowercase_pricing' );

		if ( ! $pricing ) {
			$parent_id = wp_get_post_parent_id( get_the_ID() );
			$pricing   = get_field( 'lowercase_pricing', $parent_id );
		}

		return $pricing;
	}

	public function small_punctuations_pricing() {
		$pricing = get_field( 'small_punctuations_pricing' );

		if ( ! $pricing ) {
			$parent_id = wp_get_post_parent_id( get_the_ID() );
			$pricing   = get_field( 'small_punctuations_pricing', $parent_id );
		}

		return $pricing;
	}

	public function get_logo_pricing_tables() {

		$table = get_field( 'logo_pricing_tables' );

		if ( ! $table ) {
			$parent_id = wp_get_post_parent_id( get_the_ID() );
			$table     = get_field( 'logo_pricing_tables', $parent_id );
		}

		return $table;
	}

	public function get_quote_options() {
		$parent_id = wp_get_post_parent_id( get_the_ID() );
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
			$regular = 'Arial Regular,Arial Bold,Arial Rounded,Futura,Futura Md BT - Bold Italic,Futura Extra Black BT - Extra Black,Helvetica Regular,Helvetica - Bold,Segoe Print - Bold,Malvie,Garamond Regular,Garamond Bold,Times New Roman,Century Schoolbook,Optima,Optima Semibold,Palatino Semibold,Trajan Bold,Twentieth Century,Comfortaa,Fredoka,Montserrat Bold,Bai Jamjeree Semibold,Boogaloo Regular,Cooper Black,Coiny Regular,Muloka Karesh,Zilla Slab Semibold,Patua One,Antonio Bold,Bebas Neue,Versa,Chateau de Garage,Heavitas,';

			$popular_arr = explode( ',', $popular );
			foreach ( $popular_arr as $font ) {
				$value[] = array(
					'field_6552c810e7252' => $font,
				);
			}
		}
	}

	public function is_editting() {

		$user = wp_get_current_user();

		if ( isset( $_GET['qid'] ) && ! empty( $_GET['qid'] ) ) {
			if ( isset( $_GET['qedit'] ) && $_GET['qedit'] == 1 ) {
				if ( in_array( 'administrator', (array) $user->roles ) || in_array( 'customer_rep', (array) $user->roles ) || get_field( 'partner', $_GET['qid'] ) === get_current_user_id() ) {
					return true;
				}
			}
		}

		return false;
	}

	public function not_author_but_admin() {
		$user = wp_get_current_user();
		if ( ( in_array( 'administrator', (array) $user->roles ) || in_array( 'customer_rep', (array) $user->roles ) ) && ( isset( $_GET['qid'] ) && get_field( 'partner', $_GET['qid'] ) !== get_current_user_id() ) ) {
			return 'yes';
		}
		return 'no';
	}

	public function get_signage() {

		if ( $this->is_editting() ) {
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
		if ( ! isset( $_GET['page'] ) || 'nova-options' !== $_GET['page'] ) {
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
