<?php
namespace NOVA_B2B;

use TCPDF;
use WP_Query;
use WP_Error;


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
		add_action( 'rest_api_init', array( $this, 'nova_rest_pricing_tables' ) );

		add_action( 'wp_ajax_signage_pricing_table', array( $this, 'signage_pricing_table' ) );
		// add_filter( 'acf/init', array( $this, 'afc_load_popular_fonts' ), 10, 3 );
		add_action( 'wp_ajax_upload_signage_file', array( $this, 'upload_signage_file' ) );
		add_action( 'wp_ajax_save_quote', array( $this, 'save_quote' ) );
		add_action( 'wp_ajax_update_quote', array( $this, 'update_quote' ) );
		add_action( 'wp_ajax_update_dropbox_path', array( $this, 'update_dropbox_path' ) );
		add_action( 'wp_ajax_remove_signage_file', array( $this, 'remove_signage_file' ) );
		add_action( 'wp_ajax_quote_to_processing', array( $this, 'quote_to_processing' ) );
		add_action( 'wp_ajax_update_signage', array( $this, 'update_signage' ) );
		add_action( 'wp_ajax_to_checkout', array( $this, 'nova_to_checkout' ) );
		add_action( 'wp_ajax_delete_quote', array( $this, 'delete_quote' ) );
		add_action( 'wp_ajax_update_project_folder_status', array( $this, 'update_project_folder_status' ) );
		add_action( 'wp_ajax_save_custom_project', array( $this, 'save_custom_project' ) );
		add_filter( 'upload_mimes', array( $this, 'enable_ai_files' ), 1, 1 );
		add_filter( 'acf/prepare_field/name=signage', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=final_price', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=partner', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=projects', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=partner_email', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=frontend_title', array( $this, 'acf_diable_field' ) );
		add_filter( 'acf/prepare_field/name=dropbox_token_access', array( $this, 'acf_diable_field' ) );
		add_action( 'template_redirect', array( $this, 'redirect_if_loggedin' ) );
		add_action( 'acf/init', array( $this, 'add_options_page' ) );
		add_action( 'admin_init', array( $this, 'handle_dropbox_oauth_redirect' ) );
		add_action( 'acf/save_post', array( $this, 'quote_actions' ), 5, 1 );
		add_action( 'acf/save_post', array( $this, 'move_dropbox_folder_to_partner' ), 4, 1 );
		add_action( 'acf/save_post', array( $this, 'show_partner_email' ), 10, 1 );
		// add_action( 'save_post', array( $this, 'regenerate_pdf' ), 10, 3 );
		add_action( 'quote_to_payment', array( $this, 'create_nova_quote_product' ) );
		add_action( 'wp', array( $this, 'single_quote_redirect' ) );
		add_action( 'nova_product_instant_quote', array( $this, 'nova_product_instant_quote' ) );
		add_action( 'init', array( $this, 'custom_rewrite_rule' ), 10, 0 );
		add_filter( 'query_vars', array( $this, 'custom_query_vars' ) );
		add_action( 'admin_notices', array( $this, 'show_dropbox_oauth_errors' ) );
		add_action( 'kadence_single_before_inner_content', array( $this, 'show_product_dropdown' ) );
		add_action( 'add_meta_boxes', array( $this, 'nova_mockup_update_email' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'nova_quote_add_admin_meta_box' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'nova_quote_admin_changed' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'update_dropbox_folder' ), 10, 2 );
		add_action( 'add_meta_boxes', array( $this, 'generated_product_id' ), 10, 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'dequeue_lightbox_on_mockups_view' ), 100 );

		add_action( 'template_redirect', array( $this, 'custom_quote_redirect' ) );
		add_action( 'init', array( $this, 'register_custom_post_status' ) );
		add_action( 'init', array( $this, 'pdf_rewrite_rules' ) );
		add_filter( 'display_post_states', array( $this, 'display_post_states' ), 10, 2 );
		add_filter( 'views_edit-nova_quote', array( $this, 'add_custom_post_status_links' ) );
		add_action( 'admin_footer-post.php', array( $this, 'append_post_status_list' ) );
		add_action( 'admin_footer-edit.php', array( $this, 'append_post_status_list' ) );
		add_action( 'template_redirect', array( $this, 'download_pdf_redirect' ) );
	}

	public function pdf_rewrite_rules() {
		add_rewrite_rule( '^customer_invoice/qid/([0-9]+)/?', 'index.php?customer_invoice=$matches[1]', 'top' );
	}

	public function download_pdf_redirect() {
		$invoice_id = get_query_var( 'customer_invoice' );

		if ( $invoice_id ) {
			$user_id   = get_field( 'partner', $invoice_id );
			$user_info = get_userdata( $user_id );

			$billing_country = get_user_meta( $user_id, 'billing_country', true );
			$currency        = ( $billing_country === 'CA' ) ? 'CAD' : 'USD';

			$html = $this->html_invoice( $invoice_id, $currency );
			$pdf  = $this->generate_pdf( $invoice_id, $html, $currency, 'D' );
			return $pdf;
		}
	}

	public function update_project_folder_status() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['status'] = 'error';
			$status['error']  = 'Nonce error';
			wp_send_json( $status );
		}

		$post_id = $_POST['post_id'];
		$value   = $_POST['status'];

		update_post_meta( $post_id, 'folder_project_status', $value );

		$status['post']   = $_POST;
		$status['status'] = 'success';

		wp_send_json( $status );
	}

	public function append_post_status_list() {
		global $post;
		if ( isset( $post->post_type ) && $post->post_type == 'nova_quote' ) {
			echo "<script>
        document.addEventListener('DOMContentLoaded', function() {
            var select = document.querySelector('select[name=\"post_status\"]');
            if (select) {
                var option = document.createElement('option');
                option.value = 'checked_out';
                option.text = 'Checked Out';
                select.appendChild(option);
            }
        });
        </script>";
		}
	}

	public function add_custom_post_status_links( $views ) {
		global $wp_query;
		if ( isset( $_REQUEST['post_type'] ) && $_REQUEST['post_type'] == 'nova_quote' ) {
			// Count the number of posts with the 'checked_out' status
			$checked_out_count = get_posts(
				array(
					'post_type'   => 'nova_quote',
					'post_status' => 'checked_out',
					'numberposts' => -1,
				)
			);

			// Create the link for the custom status
			$views['checked_out'] = sprintf(
				'<a href="%s">%s <span class="count">(%d)</span></a>',
				add_query_arg(
					array(
						'post_type'   => 'nova_quote',
						'post_status' => 'checked_out',
					),
					admin_url( 'edit.php' )
				),
				__( 'Checked Out' ),
				count( $checked_out_count )
			);
		}
		return $views;
	}

	public function display_post_states( $states, $post ) {
		if ( $post->post_type == 'nova_quote' ) {
			if ( $post->post_status == 'checked_out' ) {
				return array( 'Checked Out' );
			}
		}
		return $states;
	}

	public function register_custom_post_status() {
		register_post_status(
			'checked_out',
			array(
				'label'                     => _x( 'Checked Out', 'post' ),
				'public'                    => false,
				'exclude_from_search'       => true,
				'show_in_admin_all_list'    => true,
				'show_in_admin_status_list' => true,
				'label_count'               => _n_noop( 'Checked Out <span class="count">(%s)</span>', 'Checked Out <span class="count">(%s)</span>' ),
			)
		);
	}



	public function custom_quote_redirect() {
		if ( ! current_user_can( 'administrator' ) && is_singular( 'signage' ) && get_post_field( 'post_name', get_post() ) === 'custom-quote' ) {
			wp_redirect( home_url() );
			exit;
		}
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
		$data                = $signage ? json_decode( $signage, true ) : null;
		$show                = false;
		$user_folder_arr     = array();
		$font_folder_arr     = '';

		if ( $data ) {
			foreach ( $data as $item ) {
				if ( isset( $item['filePaths'] ) ) {
					foreach ( $item['filePaths'] as $filePath ) {
						$parts = explode( '/', $filePath );
						if ( isset( $parts[2] ) ) {
							$user_folder_arr[] = $parts[2];
						}
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

			if ( ! empty( $user_folder_arr ) ) {
				$old_folder = $user_folder_arr[0];
				if ( $old_folder !== $partner_business_id ) {
					$show = true;
				}
			}

			if ( isset( $old_folder ) && $font_folder_arr && $old_folder !== $partner_business_id ) {
				$show = true;
			}
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
		$data                = $signage ? json_decode( $signage, true ) : null;
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

		if ( ! empty( $user_folder_arr ) || isset( $user_folder_arr[0] ) || ! empty( $font_folder_arr ) || isset( $font_folder_arr ) ) {

			$old_folder = $user_folder_arr[0];
			$old_path   = '/NOVA-CRM/' . $old_folder . '/Q-' . $post->ID;
			$new_path   = '/NOVA-CRM/' . $partner_business_id . '/Q-' . $post->ID;
			if ( count( $user_folder_arr ) > 0 && $old_folder !== $partner_business_id ) {
				?>
<a class="button button-primary button-large mb-4 block" id="updateDropboxFolder" data-btn="updateDropbox"
    data-id="<?php echo $post->ID; ?>" data-new="<?php echo $new_path; ?>" data-old="<?php echo $old_path; ?>"
    style="margin-bottom: 10px;">Update
    Dropbox Folder</a>
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

	public function get_who_updated( $post ) {
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

			return $user_info->first_name . ' ' . $user_info->last_name;
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

			update_post_meta( $post->ID, '_approved_by', $revision_author_id );

			echo '<p><strong>' . esc_html( $user_info->first_name ) . '</strong> (' . $user_info->user_email . ')</p>';
		} else {
			echo '<p>No revisions found.</p>';
		}
	}

	public function nova_mockup_update_email( $post_type, $post ) {
		if ( $post_type !== 'nova_quote' ) {
			return;
		}

		if ( ! function_exists( 'get_field' ) ) {
			return;
		}

		if ( isset( get_field( 'quote_status', $post->ID )['value'] ) && get_field( 'quote_status', $post->ID )['value'] === 'draft' ) {
			add_meta_box(
				'nova_admin_mockup_draft_email',
				__( 'Send Draft Email', 'nova-b2b' ),
				array( $this, 'nova_admin_mockup_draft_email_callback' ),
				'nova_quote',
				'side',
				'high'
			);

		} else {
			add_meta_box(
				'nova_admin_mockup_update_email',
				__( 'Send Update Email', 'nova-b2b' ),
				array( $this, 'nova_admin_mockup_update_email_callback' ),
				'nova_quote',
				'side',
				'high'
			);
		}
	}

	public function nova_admin_mockup_draft_email_callback( $post ) {
		?>
<form action="" method="post">
    <?php wp_nonce_field( 'send_mockup_email_action', 'send_mockup_email_nonce' ); ?>
    <input type="hidden" name="post_id" value="<?php echo $post->ID; ?>">
    <input id="sendDraft" type="submit" name="send_mockup_draft_email" class="button button-primary"
        value="<?php esc_attr_e( 'Send Draft Email', 'nova-b2b' ); ?>">
</form>
<script>
const sendDraft = document.getElementById('sendDraft');
sendDraft.addEventListener('click', e => {
    sendDraft.value = "Sending...";
    sendDraft.attr.disabled = true;
})
</script>
<?php
	}

	public function nova_admin_mockup_update_email_callback( $post ) {
		?>
<form action="" method="post">
    <?php wp_nonce_field( 'send_mockup_email_action', 'send_mockup_email_nonce' ); ?>
    <input type="hidden" name="post_id" value="<?php echo $post->ID; ?>">
    <input id="sendMockup" type="submit" name="send_mockup_update_email" class="button button-primary"
        value="<?php esc_attr_e( 'Send Mockup Email', 'nova-b2b' ); ?>">
</form>
<script>
const sendMockup = document.getElementById('sendMockup');
sendMockup.addEventListener('click', e => {
    sendMockup.value = "Sending...";
    sendMockup.attr.disabled = true;
})
</script>
<?php
	}

	public function nova_quote_add_admin_meta_box( $post_type, $post ) {
		if ( $post_type !== 'nova_quote' ) {
			return;
		}
		add_meta_box(
			'nova_admin_view_quote',
			__( 'View Details', 'nova-b2b' ),
			array( $this, 'nova_admin_view_quote_callback' ),
			'nova_quote',
			'side',
			'default'
		);
	}

	public function nova_admin_view_quote_callback() {
		$details = home_url( '/my-account/mockups/view/?qid=' . get_the_ID() );

		$product_id   = get_field( 'product' );
		$edit_url     = get_permalink( $product_id ) . '?qedit=1&qid=' . get_the_ID();
		$quote_status = get_field( 'quote_status' );
		?>

<a href="<?php echo esc_url( $details ); ?>" target="_blank" class="button button-primary button-large">View Details</a>
<?php if ( $product_id && $quote_status['value'] != 'ready' ) : ?>
<br>
<a style="margin-top: 10px;" href="<?php echo esc_url( $edit_url ); ?>" target="_blank"
    class="button button-primary button-large">Edit Quote</a>
<?php
	endif;
	}


	public function show_product_dropdown() {
		if ( ! is_page( 'custom' ) || ! is_page( 'custom-project' ) ) {
			return;
		}
		echo do_shortcode( '[product_dropdown_nav]' );
	}

	public function custom_query_vars( $vars ) {
		$vars[] = 'pagetab';
		$vars[] = 'customer_invoice';
		return $vars;
	}

	public function custom_rewrite_rule() {
		add_rewrite_rule( '^custom/([^/]*)/([^/]*)/(installation|tech-specs|faqs|sample-board|quote|overview)/?$', 'index.php?signage=$matches[1]/$matches[2]&pagetab=$matches[3]', 'top' );
	}

	public function nova_product_instant_quote() {
		?>
<?php if ( ! is_user_logged_in() ) : ?>
<?php echo do_shortcode( '[kadence_element id=" 202"]' ); ?>
<?php
		elseif ( get_field( 'quote_div_id' ) ) :
			?>
<div id="QuoteApp"></div>
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
		$signage      = get_field( 'signage', $post_id ) ? json_decode( get_field( 'signage', $post_id ) ) : null;
		$note         = get_field( 'note', $post_id );

		$status['final_price'] = get_field( 'final_price', $post_id );
		$status['note']        = $note;
		$status['quote']       = $signage;

		$product_meta = array(
			'usd_price'    => $final_price,
			'signage'      => $signage,
			'nova_quote'   => true,
			'nova_title'   => $title,
			'quote_id'     => $post_id,
			'nova_note'    => $note,
			'product'      => $product_name,
			'product_name' => $product_name,
			'product_id'   => $product_id,
			'note'         => $note,
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

		if ( get_field( 'sold_individually', $product_id ) ) {
			$product_data['meta_input']['_sold_individually'] = 'yes';
		}

		// $existing_product_id = $this->product_exists_by_title( wp_strip_all_tags( $title ) );
		// if ( ! $existing_product_id ) {
		// $existing_product_id = wp_insert_post( $product_data );
		// wp_set_object_terms( $existing_product_id, 'nova_quote', 'product_type' );
		// }

		$existing_product_id = wp_insert_post( $product_data );
		wp_set_object_terms( $existing_product_id, 'nova_quote', 'product_type' );

		foreach ( $product_meta as $meta_key => $meta_value ) {
			update_post_meta( $existing_product_id, $meta_key, $meta_value );
		}

		$old_nova_product_generated_id = get_post_meta( $post_id, 'nova_product_generated_id', true );

		// if $nova_product_generated_id exists, delete the product
		if ( $old_nova_product_generated_id ) {
			// remove it also in the cart if it exists
			if ( function_exists( 'WC' ) && WC()->cart ) {

				$cart = WC()->cart;
				foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {
					if ( $cart_item['product_id'] == $old_nova_product_generated_id ) {
						$cart->remove_cart_item( $cart_item_key );
						break;
					}
				}
			}

			wp_delete_post( $old_nova_product_generated_id, true );
		}

		update_post_meta( $post_id, 'nova_product_generated_id', $existing_product_id );
	}



	public function to_admin_customer_rep_emails() {
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

	public function move_dropbox_folder_to_partner( $post_id ) {
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( 'nova_quote' !== get_post_type( $post_id ) ) {
			return;
		}

		$signage = get_field( 'signage', $post_id );

		$project_folder = get_field( 'project_id_folder', $post_id );

		$new_partner_id = $_POST['acf']['field_655822df0cca6'];

		// if ( $new_partner_id == get_field( 'partner', $post_id ) ) {
		// return;
		// }

		$partner_business_id = get_field( 'business_id', 'user_' . $new_partner_id );
		$data                = $signage ? json_decode( $signage, true ) : null;
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

		if ( ! empty( $user_folder_arr ) && isset( $user_folder_arr[0] ) ) {

			$old_folder = $user_folder_arr[0];

			$old_path = $project_folder ? '/NOVA-CRM/' . $old_folder . '/' . $project_folder . '/Q-' . $post_id : '/NOVA-CRM/' . $old_folder . '/Q-' . $post_id;
			$new_path = $project_folder ? '/NOVA-CRM/' . $partner_business_id . '/' . $project_folder . '/Q-' . $post_id : '/NOVA-CRM/' . $partner_business_id . '/Q-' . $post_id;
			if ( count( $user_folder_arr ) > 0 && $old_folder !== $partner_business_id ) {

				/** Move Quote Folder */
				$dropbox = Dropbox::get_instance();

				if ( $dropbox ) {
					$dropbox->rename_dropbox_folder( $old_path, $new_path );
				}
			} else {
				return;
			}
		}
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
				do_action( 'quote_to_payment', $post_id, get_current_user_id() );
			}

			if ( get_field( 'quote_status', $post_id )['value'] === 'draft' && $_POST['acf']['field_655821f69cbab'] === 'processing' ) {
				do_action( 'quote_to_processing', $post_id, get_current_user_id() );
			}
		}
	}

	public function update_product_meta( $post_id ) {
		$product_id = get_post_meta( $post_id, 'nova_product_generated_id', true );
		if ( ! $product_id ) {
			return;
		}

		$newjson = get_field( 'signage', $post_id ) ? json_decode( get_field( 'signage', $post_id ) ) : null;
		if ( $newjson ) {
			update_field( 'signage', $newjson, $product_id );
		}
	}

	public function regenerate_pdf( $post_id, $post, $update ) {
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( 'nova_quote' !== get_post_type( $post_id ) ) {
			return;
		}

		if ( ! $update ) {
			return;
		}
		$html = $this->html_invoice( $post_id );
		if ( $html ) {
			$this->generate_pdf( $post_id, $html, 'USD' );
		}
		$html_cad = $this->html_invoice( $post_id, 'CAD' );
		if ( $html_cad ) {
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
		$data = $body ? json_decode( $body, true ) : null;

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

		$product_id = get_post_meta( $post_id, 'nova_product_generated_id', true );

		if ( wp_trash_post( $post_id ) ) {
			$status['status'] = 'success';
			$status['code']   = '2';

			if ( $product_id ) {
				$status['product_id'] = $product_id;
				$cart                 = WC()->cart;
				foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {
					if ( $cart_item['product_id'] == $product_id ) {
						$cart->remove_cart_item( $cart_item_key );
						break;
					}
				}
			}
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

		$nova_emails = NovaEmails::get_instance();
		if ( $nova_emails ) {
			$nova_emails->for_quotation_email( $_POST['quote'] );
		}

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
		$signage      = get_field( 'signage', $post_id ) ? json_decode( get_field( 'signage', $post_id ) ) : null;
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

	public function html_invoice( $post_id, $currency = 'USD' ) {
		ob_start();
		$instance = \NOVA_B2B\Scripts::get_instance();
		$user_id  = get_field( 'partner', $post_id );

		$final_price = floatval( get_field( 'final_price', $post_id ) );

		if ( $currency === 'CAD' ) {
			$final_price = $final_price * NOVA_EXCHANGE_RATE;
		}

		$final_price = number_format( $final_price, 2, '.', '' );

		$product = get_field( 'product', $post_id );

		if ( ! $product ) {
			return;
		}

		$product_id   = $product->ID;
		$product_name = $product->post_title;
		$signage      = get_field( 'signage', $post_id ) ? json_decode( get_field( 'signage', $post_id ) ) : null;
		$note         = get_field( 'note', $post_id );

		$min_price = 800;
		$flat_rate = 14.75;

		$above_min = 0;
		$below_min = 0;

		if ( $currency === 'CAD' ) {
			$flat_rate = 14.75 * NOVA_EXCHANGE_RATE;
			$min_price = 800 * NOVA_EXCHANGE_RATE;
		}

		if ( $final_price < $min_price ) {
			$standard_rate = $final_price * 0.09 > $flat_rate ? $final_price * 0.09 : $flat_rate; // 9%
		} else {

			$below_min  = $min_price * 0.09;
			$difference = $final_price - $min_price;
			$above_min  = $difference * 0.08;

			$standard_rate = $below_min + $above_min;

		}

		$estimated_shipping = $final_price > 0 ? number_format( max( $flat_rate, $standard_rate ), 2, '.', '' ) : 0;

		$instance            = \NOVA_B2B\Scripts::get_instance();
		$tax_rate            = 0;
		$tax_compute         = 0;
		$price_with_shipping = $final_price + $estimated_shipping;
		$tax_rate            = false;
		$tax_rate_name       = false;
		$tax_compute         = 0;
		$tax                 = false;
		if ( $instance ) {
			$tax = $instance->get_woocommerce_tax_rate_by_country_and_state( $user_id, '', '' );
			if ( $tax ) {
				$tax_rate_name = $tax->tax_rate_name;
				$tax_rate      = floatval( $tax->tax_rate / 100 );
				$tax_compute   = number_format( $price_with_shipping * $tax_rate, 2, '.', '' );
			}
		}

		$estimate_total = $price_with_shipping + $tax_compute;
		$estimate_total = number_format( $estimate_total, 2, '.', '' );
		?>
<style>
h4,
h6 {
    margin-bottom: 0pt;
    margin-top: 0px;
}
</style>
<table style="margin-bottom: 20px;">
    <tr>
        <td style="margin-top: 0; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #000;">
            <img src="<?php echo get_stylesheet_directory() . '/assets/img/nova-logo.png'; ?>" alt="Nova Signage"
                style="margin-top: 0;" />
        </td>
    </tr>
    <tr>
        <td style="padding: 30px;"></td>
    </tr>
    <tr>
        <td>
            <h4 style="font-size: 14pt; margin-bottom: 0;">QUOTE ID:
                Q-<?php echo str_pad( $post_id, 4, '0', STR_PAD_LEFT ); ?>
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
				if ( $currency === 'CAD' ) {
					$price = $projectArray['cadPrice'];
				}

				?>
            <table style="margin-top: 40px; margin-bottom: 20px;">
                <tr style="font-size: 17px; font-weight: bold;">
                    <td><?php echo $projectArray['title']; ?></td>
                    <td style="text-align: right;"><?php echo $currency; ?>$ <?php echo $price; ?></td>
                </tr>
                <?php
				if ( isset( $projectArray['letters'] ) && ! empty( $projectArray['letters'] ) ) {
					$color = '#000000';
					if ( isset( $projectArray['vinylWhite']->color ) && ! empty( $projectArray['vinylWhite']->color ) ) {
						$color = 'color: ' . $projectArray['vinylWhite']->color;
					} elseif ( isset( $projectArray['color']->color ) && ! empty( $projectArray['color']->color ) ) {
						$color = 'color: ' . $projectArray['color']->color;
					}
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
        <td style="font-family: Arial">
            <?php echo $note; ?>
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
                        <h5 style="font-size: 13pt"><?php echo $currency; ?>$
                            <?php echo $final_price; ?></h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h5 style="font-size: 13pt">PACKAGING &amp; SHIPPING:</h5>
                    </td>
                    <td style="text-align: right;">
                        <h5 style="font-size: 13pt"><?php echo $currency; ?>$
                            <?php echo $estimated_shipping; ?></h5>
                    </td>
                </tr>
                <?php if ( $tax ) { ?>
                <tr>
                    <td>
                        <h5 style="font-size: 13pt"><?php echo $tax_rate_name; ?>:</h5>
                    </td>
                    <td style="text-align: right;">
                        <h5 style="font-size: 13pt"><?php echo $currency; ?>$
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
                        <h4 style="font-size: 14pt;"><?php echo $currency; ?>$
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

	public function html_invoice_x( $post_id ) {
		if ( ! $post_id ) {
			return;
		}
		ob_start();

		$user_id = get_field( 'partner', $post_id );

		$final_price = floatval( get_field( 'final_price', $post_id ) );

		$product = get_field( 'product', $post_id );

		if ( ! $product ) {
			return;
		}

		$product_id = get_field( 'product', $post_id )->ID;

		$product_name = get_field( 'product', $post_id )->post_title;
		$signage      = get_field( 'signage', $post_id ) ? json_decode( get_field( 'signage', $post_id ) ) : null;
		$note         = get_field( 'note', $post_id );

		$flat_rate     = 14.75;
		$standard_rate = $final_price * 0.075;

		$estimated_shipping = $final_price > 0 ? number_format( max( $flat_rate, $standard_rate ), 2, '.', '' ) : 0;

		$instance            = \NOVA_B2B\Scripts::get_instance();
		$tax_rate            = 0;
		$tax_compute         = 0;
		$price_with_shipping = $final_price + $estimated_shipping;

		if ( $instance ) {
			$tax           = $instance->get_woocommerce_tax_rate_by_country_and_state( $user_id, '', '' );
			$tax_rate_name = $tax->tax_rate_name;
			$tax_rate      = floatval( $tax->tax_rate / 100 );
			$tax_compute   = number_format( $price_with_shipping * $tax_rate, 2, '.', '' );
		}

		$estimate_total = $price_with_shipping + $tax_compute;
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
        <td style="margin-top: 0; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #000;">
            <img src="<?php echo get_stylesheet_directory() . '/assets/img/nova-logo.png'; ?>" alt="Nova Signage"
                style="margin-top: 0;" />
        </td>
    </tr>
    <tr>
        <td style="padding: 30px;"></td>
    </tr>
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
				if ( isset( $projectArray['letters'] ) && ! empty( $projectArray['letters'] ) ) {
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
        <td style="font-family: Arial">
            <?php
			echo $note;
			?>
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
                            <?php echo $estimated_shipping; ?></h5>
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

	public function allAttributes() {
		return array(
			'title'                   => 'TITLE',
			'material'                => 'MATERIAL',
			'productLine'             => 'PRODUCT LINE',
			'letters'                 => 'TEXT',
			'font'                    => 'FONT',
			'customFont'              => 'CUSTOM FONT',
			'fontFile'                => array(
				'label'  => 'FONT FILE',
				'isLink' => true,
			),
			'etchedMaterial'          => 'MATERIAL',
			'etchedWidth'             => 'WIDTH',
			'etchedHeight'            => 'HEIGHT',
			'etchedMetalThickness'    => 'METAL THICKNESS',
			'etchedFinishing'         => 'FINISHING',
			'etchedPaintedColor'      => 'PAINTED COLOR',
			'etchedElectroplated'     => 'ELECTROPLATED FINISHING',
			'etchedAnodizedColor'     => 'ANODIZED COLOR',
			'etchedGraphicsStyle'     => 'GRAPHICS STYLE',
			'etchedEdges'             => 'EDGES',
			'metal'                   => 'METAL',
			'thickness'               => 'THICKNESS',
			'metalDepth'              => 'METAL DEPTH',
			'acrylicThickness'        => 'ACRYLIC THICKNESS',
			'acrylicChannelThickness' => 'ACRYLIC THICKNESS',
			'metalThickness'          => 'METAL THICKNESS',
			'depth'                   => 'METAL DEPTH',
			'letterHeight'            => 'LETTER HEIGHT',
			'acrylicReturn'           => 'RETURN',
			'width'                   => 'LOGO WIDTH',
			'height'                  => 'LOGO HEIGHT',
			'frontOption'             => 'FRONT OPTION',
			'paintColor'              => 'PAINT COLOR',
			'acrylicFront'            => 'ACRYLIC FRONT',
			'backLitFinishing'        => 'FINISHING',
			'backLitMetalFinish'      => 'METAL FINISH',
			'faceReturnColor'         => 'FACE & RETURN COLOR',
			'neonSignWidth'           => 'NEON SIGN WIDTH',
			'neonSignHeight'          => 'NEON SIGN HEIGHT',
			'neonUsed'                => 'NEON USED(ft)',
			'neonThickness'           => 'NEON THICKNESS',
			'neonLength'              => 'NEON LENGTH(ft)',
			'rigidWaterproof'         => 'ENVIRONMENT',
			'neonColor'               => 'NEON COLORS',
			'neonLength8mm'           => '8mm NEON LENGTH',
			'neonLength10mm'          => '10mm NEON LENGTH',
			'neonLength14mm'          => '14mm NEON LENGTH',
			'neonLength20mm'          => '20mm NEON LENGTH',
			'metalFinish'             => 'FINISHING',
			'stainLessMetalFinish'    => 'METAL FINISH',
			'stainlessSteelPolished'  => 'STEEL POLISH',
			'layers'                  => 'LAYERS',
			'metalLaminate'           => 'METAL LAMINATE',
			'pvcBaseColor'            => 'PVC BASE COLOR',
			'acrylicBase'             => 'ACRYLIC BASE',
			'printPreference'         => 'PRINT PREFERENCE',
			'color'                   => 'COLOR',
			'returnColor'             => 'RETURN COLOR',
			'customColor'             => 'CUSTOM COLOR',
			'finishing'               => 'FINISHING',
			'aluminumFinishing'       => 'ALUMINUM FINISHING',
			'anodizedFinishing'       => 'ANODIZED FINISHING',
			'anodizedColor'           => 'ANODIZED COLOR',
			'metalColor'              => 'COLOR',
			'metalCustomColor'        => 'CUSTOM COLOR',
			'returnPaintColor'        => 'RETURN PAINT COLOR',
			'acrylicReveal'           => 'ACRYLIC REVEAL',
			'frontAcrylicCover'       => 'FRONT ACRYLIC COVER',
			'vinylWhite'              => array(
				'label'   => '3M 3630 VINYL',
				'isVinyl' => true,
			),
			'vinyl3635'               => '3M 3635 VINYL',
			'frontBackVinyl'          => 'FRONT &amp; BACK VINYL',
			'acrylicReturnPaintColor' => 'RETURN PAINT COLOR',
			'ledLightColor'           => 'LED LIGHT COLOR',
			'acrylicBackingOption'    => 'BACKING',
			'rigidBacking'            => 'BACKING',
			'paintedPCColor'          => 'PAINTED PC COLOR',
			'pcCustomColor'           => 'PC CUSTOM COLOR',
			'baseColor'               => 'BASE COLOR',
			'baseCustomColor'         => 'BASE CUSTOM COLOR',
			'paintedPCFinish'         => 'PAINTED PC FINISH',
			'lightboxType'            => 'LIGHT BOX TYPE',
			'uvPrintedCover'          => 'UV PRINTED COVER',
			'waterproof'              => 'ENVIRONMENT',
			'backOption'              => 'BACK OPTION',
			'mounting'                => 'MOUNTING',
			'rigidM4StudLength'       => 'M4 STUD LENGTH',
			'studLength'              => 'STUD LENGTH',
			'spacerStandoffDistance'  => 'STANDOFF SPACE',
			'trimLessWaterproof'      => 'ENVIRONMENT',
			'lightingPackaged'        => 'INCLUDED ITEMS',
			'includedItems'           => 'INCLUDED ITEMS',
			'remoteControl'           => 'REMOTE CONTROL',
			'wireExitLocation'        => 'WIRE EXIT LOCATION',
			'wireType'                => 'WIRE TYPE',
			'metalFinishing'          => 'METAL FINISHING',
			'installation'            => 'INSTALLATION',
			'pieces'                  => 'PIECES',
			'sets'                    => 'QUANTITY',
			'comments'                => 'COMMENTS',
			'description'             => 'DESCRIPTION',
			'file'                    => array(
				'label'  => 'FILE',
				'isFile' => true,
			),
			'fileNames'               => array(
				'label'   => 'FILES',
				'isFiles' => true,
			),
		);
	}

	public function output_project_item( $project ) {
		echo '<table style="padding: 10px; border-collapse: collapse; width: 100%; font-size: 90%; margin-bottom: 20px;">';
		$projectArray = get_object_vars( $project );

		$attributes = $this->allAttributes();

		foreach ( $attributes as $key => $attr ) {
			if ( isset( $projectArray[ $key ] ) && ! empty( $projectArray[ $key ] ) ) {
				if ( is_array( $attr ) ) {
					if ( $attr['isLink'] ?? false && isset( $projectArray['fontFileUrl'], $projectArray['fontFileName'] ) ) {
						echo '<tr style="font-size: 14px;"><td style="width: 160px; padding: 8px; border: 1px solid #000;"><strong style="text-transform: uppercase;">' . $attr['label'] . ': </strong></td><td style="width: 160px; padding: 8px; border: 1px solid #000;"><font face="lato"><a href="' . $projectArray['fontFileUrl'] . '" target="_blank">' . $projectArray['fontFileName'] . '</a></font></td></tr>';
					} elseif ( $attr['isVinyl'] ?? false && isset( $projectArray['vinylWhite']->name, $projectArray['vinylWhite']->code ) && ! empty( $projectArray['vinylWhite']->name ) && ! empty( $projectArray['vinylWhite']->code ) ) {
						if ( ( isset( $projectArray['acrylicFront'] ) && $projectArray['acrylicFront'] === '3M Vinyl' ) || ( isset( $projectArray['frontOption'] ) && $projectArray['frontOption'] === '3M Vinyl' ) || ( isset( $projectArray['frontAcrylicCover'] ) && $projectArray['frontAcrylicCover'] === '3M Vinyl' ) ) {
							echo '<tr style="font-size: 14px;"><td style="width: 160px; padding: 8px; border: 1px solid #000;"><strong style="text-transform: uppercase;">' . $attr['label'] . ': </strong></td><td style="width: 160px; padding: 8px; border: 1px solid #000;"><font face="lato">' . $projectArray['vinylWhite']->name . ' - [' . $projectArray['vinylWhite']->code . ']</font></td></tr>';
						}
					} elseif ( $attr['isFile'] ?? false && isset( $projectArray['fileUrl'], $projectArray['fileName'] ) ) {
						echo '<tr style="font-size: 14px;"><td style="width: 160px; padding: 8px; border: 1px solid #000;"><strong style="text-transform: uppercase;">' . $attr['label'] . ': </strong></td><td style="width: 160px; padding: 8px; border: 1px solid #000;"><font face="lato"><a href="' . $projectArray['fileUrl'] . '" target="_blank">' . $projectArray['fileName'] . '</a></font></td></tr>';
					} elseif ( $attr['isFiles'] ?? false && isset( $projectArray['fileUrls'], $projectArray['fileNames'] ) ) {
						$filesHtml = '';
						foreach ( $projectArray['fileUrls'] as $index => $fileUrl ) {
							$fileName   = $projectArray['fileNames'][ $index ] ?? $fileUrl;
							$filesHtml .= '<a href="' . htmlspecialchars( $fileUrl, ENT_QUOTES, 'UTF-8' ) . '" target="_blank">' . htmlspecialchars( $fileName, ENT_QUOTES, 'UTF-8' ) . '</a><br>';
						}
						echo '<tr style="font-size: 14px;"><td style="width: 160px; padding: 8px; border: 1px solid #000;"><strong style="text-transform: uppercase;">' . $attr['label'] . ': </strong></td><td style="width: 160px; padding: 8px; border: 1px solid #000;"><font face="lato">' . $filesHtml . '</font></td></tr>';
					}
				} else {
					$value = $projectArray[ $key ];
					if ( is_object( $value ) ) {
						if ( isset( $value->thickness ) ) {
							$value = $value->thickness;
						} elseif ( isset( $value->depth ) ) {
							$value = $value->depth;
						} elseif ( isset( $value->name ) ) {
							$value = $value->name;
						}
					}
					if ( isset( $value ) && ! empty( $value ) ) {
						echo '<tr style="font-size: 14px;"><td style="width: 160px; padding: 8px; border: 1px solid #000;"><strong style="text-transform: uppercase;">' . $attr . ': </strong></td><td style="width: 160px; padding: 8px; border: 1px solid #000;"><font face="lato">' . $value . ( $key === 'letterHeight' ? '"' : '' ) . '</font></td></tr>';
					}
				}
			}
		}

		echo '<tr><td colspan="2" style="padding: 10px;"></td></tr>';

		echo '</table>';
	}

	public function update_quote() {
		$status = array(
			'code' => 1,
		);
		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			$status['status'] = 'error';
			$status['error']  = 'Nonce error';
			wp_send_json( $status );
		}

		$post_id = $_POST['quote_id'];

		update_field( 'signage', $_POST['signage'], $post_id );
		$status['status'] = 'success';

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

			$partner_id = $_POST['partner'];

			$args = array(
				'post_type'   => 'nova_quote',
				'post_title'  => $_POST['title'],
				'post_status' => 'publish',
			);

			if ( $partner_id ) {
				$args['post_author'] = $partner_id;
			}

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

			$user_id = $_POST['user_id'];
			$user    = get_userdata( $user_id );

			$created_by = isset( $_POST['created_by'] ) ? $_POST['created_by'] : false;

			if ( $created_by ) {
				update_post_meta( $post_id, 'created_by', $created_by );
			}

			update_field( 'frontend_title', $_POST['title'], $post_id );
			update_field( 'partner', $user_id, $post_id );
			update_field( 'partner_email', $user->user_email, $post_id );
			update_field( 'signage', $_POST['signage'], $post_id );
			update_field( 'final_price', $_POST['total'], $post_id );
			update_field( 'product', $_POST['product'], $post_id );
			update_field( 'quote_status', $_POST['quote_status'], $post_id );
			update_field( 'currency', $_POST['currency'], $post_id );

			if ( 'processing' == $_POST['quote_status'] ) {
				$html     = $this->html_invoice( $post_id );
				$html_cad = $this->html_invoice( $post_id, 'CAD' );
				/*Remove for quotation email*/
				$this->generate_pdf( $post_id, $html, 'USD' );
				$this->generate_pdf( $post_id, $html_cad, 'CAD' );

				$email_instance = \NOVA_B2B\NovaEmails::get_instance();
				if ( $email_instance ) {
					$email_instance->for_quotation_admin_email( $post_id );
				} else {
					error_log( 'NOVA_B2B\NovaEmails::get_instance() returned null' );
				}
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



	public function generate_invoice_pdf( $user_id, $order_number, $html, $output = 'F' ) {
		require_once get_stylesheet_directory() . '/tcpdf/tcpdf.php';

		$business_id = get_field( 'business_id', 'user_' . $user_id ) ? get_field( 'business_id', 'user_' . $user_id ) : 'NONE';

		$pdf = new TCPDF( PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false );

		$filename = $business_id . '-' . $order_number . '.pdf';

		// set document information
		$pdf->SetCreator( PDF_CREATOR );
		$pdf->SetAuthor( 'NOVA Signage' );
		$pdf->SetTitle( 'Order Invoice - ' . $order_number );
		$pdf->SetSubject( '' );
		$pdf->SetKeywords( '' );

		// remove default header/footer
		$pdf->setPrintHeader( false );
		$pdf->setFooterData( array( 0, 0, 0 ), array( 0, 0, 0 ) );

		// set default monospaced font
		$pdf->SetDefaultMonospacedFont( PDF_FONT_MONOSPACED );

		// set margins
		$pdf->SetMargins( PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT );
		$pdf->SetHeaderMargin( 0 );
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

		$file = $_SERVER['DOCUMENT_ROOT'] . 'wp-content/uploads/order_invoices/' . $filename;

		if ( file_exists( $file ) ) {
			unlink( $file );
		}

		$pdf->Output( $file, $output );
	}

	public function generate_pdf( $post_id, $html, $currency = 'USD', $output = 'F' ) {
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
		$pdf->setFooterData( array( 0, 0, 0 ), array( 0, 0, 0 ) );

		// set default monospaced font
		$pdf->SetDefaultMonospacedFont( PDF_FONT_MONOSPACED );

		// set margins
		$pdf->SetMargins( PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT );
		$pdf->SetHeaderMargin( 0 );
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

		return $pdf->Output( $_SERVER['DOCUMENT_ROOT'] . 'wp-content/customer_invoices/' . $filename, $output );
	}

	public function create_order_invoice_folder() {
		$upload_dir = wp_upload_dir();
		$base_dir   = $upload_dir['basedir'] . '/order_invoices';

		if ( file_exists( $base_dir ) ) {
			return true;
		}

		if ( ! wp_mkdir_p( $base_dir ) ) {
			return new \WP_Error( 'base_directory_creation_failed', __( 'Failed to create base directory for order invoices.', 'nova-b2b' ) );
		}

		return true;
	}


	public function create_customer_invoice_folder( $business_id ) {
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

	public function nova_rest_pricing_tables() {
		register_rest_route(
			'nova/v1',
			'/pricingletters/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_pricing_letter_table' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'nova/v1',
			'/multipricingletters/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_multipricing_letter_tables' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'nova/v1',
			'/pricinglogos/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_pricing_logo_table' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'nova/v1',
			'/quantity-discount/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_multiple_quantity_discount_table' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public function handle_multiple_quantity_discount_table( \WP_REST_Request $request ) {
		$id = $request['id'];

		$table = get_field( 'multiple_quantity_discount', $id );

		return $table;
	}

	public function handle_pricing_logo_table( \WP_REST_Request $request ) {
		$id = $request['id'];

		$table = get_field( 'logo_pricing_tables', $id );

		if ( ! $table ) {
			$parent_id = wp_get_post_parent_id( $id );
			$table     = get_field( 'logo_pricing_tables', $parent_id );
		}

		return $table;
	}


	public function handle_multipricing_letter_tables( \WP_REST_Request $request ) {
		$id = $request['id'];

		return get_field( 'letter_pricing_tables', $id );
	}

	public function handle_pricing_letter_table( \WP_REST_Request $request ) {
		$id = $request['id'];

		if ( ( get_field( 'letter_pricing_table', $id ) && get_field( 'letter_pricing_table', $id )['pricing_table'] === '' ) || get_field( 'letter_pricing_table', $id ) === null ) {
			$parent_id = wp_get_post_parent_id( $id );
			return get_field( 'letter_pricing_table', $parent_id );
		}

		return get_field( 'letter_pricing_table', $id );
	}

	public function nova_rest_quote_file() {
		register_rest_route(
			'nova/v1',
			'/upload-quote-file',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_quote_file_upload' ),
				'permission_callback' => '__return_true',
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
				return new \WP_REST_Response( 'File uploaded successfully', 200 );
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
				'no_lowercase'               => $this->no_lowercase(),
				'upload_rest'                => esc_url_raw( rest_url( '/nova/v1/upload-quote-file' ) ),
				'logged_in'                  => is_user_logged_in(),
				'user_role'                  => $this->get_current_user_role_slugs(),
				'user_id'                    => $this->get_partner_id(),
				'product'                    => get_the_ID(),
				'quote_url'                  => get_permalink( get_the_ID() ),
				'mockup_account_url'         => esc_url_raw( home_url( '/my-account/mockups/all' ) ),
				'mockup_drafts_url'          => esc_url_raw( home_url( '/my-account/mockups/drafts' ) ),
				'mockup_quoted_url'          => esc_url_raw( home_url( '/my-account/mockups/payments' ) ),
				'mockup_processing_url'      => esc_url_raw( home_url( '/my-account/mockups/processing' ) ),
				'dashboard_url'              => esc_url_raw( home_url( '/my-account/' ) ),
				'is_editting'                => $this->is_editting(),
				'signage'                    => $this->get_signage(),
				'is_admin'                   => $this->is_admin(),
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
				'is_added_to_cart'           => $this->is_added_to_cart(),
				'product_lines_accordion'    => get_field( 'product_lines_accordion', 'option' ),
				'letters_pricing_api'        => rest_url() . 'nova/v1/pricingletters/',
				'letters_multi_pricing_api'  => rest_url() . 'nova/v1/multipricingletters/',
				'logo_pricing_api'           => rest_url() . 'nova/v1/pricinglogos/',
				'quantity_discount_api'      => rest_url() . 'nova/v1/quantity-discount/',
				'show_all_partners'          => $this->show_all_partners(),
				'product_layers'             => get_field( 'product_layers', $this->get_id_layer_product() ),
				'project_folder_status'      => isset( $_GET['qid'] ) ? $this->get_project_folder() : null,
				'layered_product_id'         => $this->get_id_layer_product(),

			)
		);

		if ( ( is_product( 'product' ) || is_account_page() || is_page( 'custom' ) || is_page( 'custom-project' ) ) && is_user_logged_in() || get_post_type() === 'signage' ) {
			wp_enqueue_script( 'nova-quote' );
			wp_enqueue_style( 'nova-quote' );
		}
	}

	public function get_id_layer_product() {
		return get_field( 'layered_product_id', 'option' );
	}

	public function get_project_folder() {
		if ( isset( $_GET['qid'] ) ) {
			$id     = $_GET['qid'];
			$status = get_post_meta( $_GET['qid'], 'folder_project_status', true );

			if ( $status ) {
				return get_field( 'project_id_folder', $id );
			} else {
				return false;
			}
		}
	}

	public function containsKeywords( $string, $keywords ) {
		$lowerString = strtolower( $string ); // Convert string to lower case once
		foreach ( $keywords as $keyword ) {
			if ( strpos( $lowerString, $keyword ) !== false ) {
				return true;
			}
		}
		return false;
	}

	public function show_all_partners() {
		$args    = array(
			'role'    => 'partner',
			'orderby' => 'registered',
			'order'   => 'ASC',
		);
		$users   = get_users( $args );
		$results = array();

		$keywords = array( 'test', 'demo' );

		foreach ( $users as $user ) {

			$first_name = $user->first_name;
			$last_name  = $user->last_name;
			$email      = $user->user_email;

			// Skip user if any field contains the keywords
			if ( self::containsKeywords( $first_name, $keywords ) ||
				self::containsKeywords( $last_name, $keywords ) ||
				self::containsKeywords( $email, $keywords ) ) {
				continue;
			}

			// Retrieve country or default to 'NONE'
			$country = get_user_meta( $user->ID, 'billing_country', true );
			if ( empty( $country ) ) {
				$country = 'NONE';
			}

			$state = get_user_meta( $user->ID, 'billing_state', true );
			if ( empty( $state ) ) {
				$state = 'NONE';
			}

			$results[] = array(
				'value' => $user->ID,
				'label' => get_field( 'business_id', 'user_' . $user->ID ) . ' - ' . $first_name . ' ' . $last_name . '(' . $email . ') - ' . get_field( 'business_name', 'user_' . $user->ID ),
			);
		}

		return $results;
	}

	public function is_added_to_cart() {
		if ( ! isset( $_GET['qid'] ) ) {
			return false;
		}
		$generated_id = get_post_meta( $_GET['qid'], 'nova_product_generated_id', true ) ? get_post_meta( $_GET['qid'], 'nova_product_generated_id', true ) : 0;

		return in_array( $generated_id, array_column( WC()->cart->get_cart(), 'product_id' ) );
	}

	public function get_partner_id() {
		if ( $this->is_editting() ) {

			return get_field( 'partner', $_GET['qid'] );

		}

		return get_current_user_id();
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
		if ( is_object( $post ) && isset( $post->post_parent, $post->ID ) ) {
			return $post->post_parent != 0 ? $post->post_parent : $post->ID;
		}
		return null;
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

	public function no_lowercase() {
		$fonts = array(
			'Versa',
			'Trajan Bold',
			'Heavitas',
			'Chateau de Garage',
			'Bebas Neue',
		);

		return $fonts;
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

	public function is_admin() {
		$user = wp_get_current_user();
		if ( ( in_array( 'administrator', (array) $user->roles ) || in_array( 'customer_rep', (array) $user->roles ) ) && ( isset( $_GET['qid'] ) ) ) {
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