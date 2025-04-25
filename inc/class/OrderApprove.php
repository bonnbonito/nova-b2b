<?php

namespace NOVA_B2B;

class OrderApprove {
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
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueu_script' ) );
		add_action( 'wp_ajax_approve_mockup', array( $this, 'approve_mockup' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueu_scripts' ) );
		add_action( 'wp_ajax_update_email_mockup', array( $this, 'update_email_mockup' ) );
		add_action( 'wp', array( $this, 'setup_notification_cron' ) );
		add_action( 'check_order_approval_notifications', array( $this, 'process_order_approval_notifications' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_order_approved_date_metabox' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_slack_message_metabox' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_trello_card_metabox' ) );
		add_action( 'save_post', array( $this, 'save_order_approved_date' ) );
		add_action( 'order_customer_approved', array( $this, 'order_customer_approved_function' ) );
		add_action( 'order_customer_approved', array( $this, 'send_slack_message' ), 11, 1 );
		add_action( 'order_customer_approved', array( $this, 'send_trello_message' ), 12, 1 );
		add_action( 'nova_send_slack_message', array( $this, 'send_scheduled_slack_message' ) );
		add_action( 'nova_send_trello_message', array( $this, 'send_scheduled_trello_message' ) );
		add_action( 'nova_send_scheduled_zendesk_message', array( $this, 'send_scheduled_zendesk_message' ), 10, 5 );
		add_action( 'wp_ajax_resend_slack_message', array( $this, 'resend_slack_message' ) );
		add_action( 'wp_ajax_resend_trello_message', array( $this, 'resend_trello_message' ) );
	}

	public function send_slack_message( $order_id ) {
		if ( ! wp_next_scheduled( 'nova_send_slack_message', array( $order_id ) ) ) {
			wp_schedule_single_event( time() + 1, 'nova_send_slack_message', array( $order_id ) );
		}
	}

	public function send_trello_message( $order_id ) {
		if ( ! wp_next_scheduled( 'nova_send_trello_message', array( $order_id ) ) ) {
			wp_schedule_single_event( time() + 1, 'nova_send_trello_message', array( $order_id ) );
		}
	}

	public function send_scheduled_trello_message( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return;
		}

		error_log( 'Sending scheduled trello message for order ' . $order_id );

		$trello = \NOVA_B2B\Trello::get_instance();
		$files = $this->get_dropbox_url_files( $order_id ) ?? [];

		if ( $trello ) {
			$name = $order->get_order_number();
			$desc = 'Order approved by customer';
			$options = array();
			$attachments = $files;
			$trello->create_card( $trello->default_list_id, $name, $desc, $options, $attachments, $order_id );
		}
	}

	public function send_scheduled_slack_message( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return;
		}

		$disable_zendesk = get_field( 'disable_zendesk_ticket', $order_id );

		if ( $disable_zendesk ) {
			return;
		}

		//Get Shipping Method
		$shipping_method = $order->get_shipping_method();
		//order number
		$order_number = '#' . $order->get_order_number();
		//Payment method
		$payment = get_post_meta( $order_id, '_deposit_chosen_title', true );
		$payment_title = $payment ? str_replace( ' ', '', $payment ) : 'Paid';

		$message = $shipping_method . 'Order' . $payment_title . ', ' . $order_number;



		$slack = \NOVA_B2B\Slack::get_instance();
		if ( $slack ) {
			$ts = $slack->send_message( $message );

			//check if the message was sent successfully
			if ( ! is_wp_error( $ts ) ) {

				$order_approved_email = get_post_meta( $order_id, 'order_approved_email', true );

				update_post_meta( $order_id, 'slack_message_sent', current_time( 'timestamp' ) );

				$users = get_field( 'zendesk_users', 'option' );
				$slack_user_id = null;
				if ( $users ) {
					$matching_user = current( array_filter( $users, function ($user) use ($order_approved_email) {
						return $user['email'] === $order_approved_email;
					} ) );
					$slack_user_id = $matching_user ? $matching_user['slack_id'] : null;
				}

				error_log( 'slack_user_id: ' . $slack_user_id );

				if ( $slack_user_id ) {
					//mention the user in the message
					$reply_message = '<@' . $slack_user_id . '> ';

					//upload files to slack
					$files = $this->get_dropbox_url_files( $order_id ) ?? [];

					error_log( 'files: ' . print_r( $files, true ) );

					$sent = $slack->send_thread_reply( $reply_message, $ts, null, $files );

					if ( $sent ) {
						update_post_meta( $order_id, 'slack_message_with_files_sent', current_time( 'timestamp' ) );
					} else {
						error_log( 'Error sending slack message: ' . $sent->get_error_message() );
					}
				}
			}
		}


	}

	public function order_customer_approved_function( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return;
		}

		$disable_zendesk = get_field( 'disable_zendesk_ticket', $order_id );

		if ( $disable_zendesk ) {
			return;
		}

		$to = get_post_meta( $order_id, 'order_approved_email', true );
		$ticket_id = get_post_meta( $order_id, 'zendesk_ticket_id', true );
		$zendesk = \NOVA_B2B\Zendesk::get_instance();

		$customer_name = $order->get_billing_first_name();

		$files_urls = $this->get_dropbox_url_files( $order_id );

		$message = '<p>Hi ' . $customer_name . ',</p>' . "\n\n";
		$message .= '<p>Thank you for approving the mockup for order <strong>#' . $order->get_order_number() . '</strong>. We\'re moving forward with the signage production. </p>' . "\n\n";
		$message .= '<p>We\'ll promptly notify you once your order is prepared for shipment.</p>' . "\n\n";
		$message .= '<p>You may reach out to us for any inquiries or assistance.</p>' . "\n\n";

		if ( $zendesk && ! empty( $files_urls ) && ! empty( $to ) && ! empty( $ticket_id ) ) {

			$this->send_scheduled_zendesk_message( $to, $ticket_id, $message, $files_urls, $order_id );
			// if ( ! wp_next_scheduled( 'nova_send_scheduled_zendesk_message', array( $to, $ticket_id, $message, $files_urls, $order_id ) ) ) {
			// 	wp_schedule_single_event( time() + 1, 'nova_send_scheduled_zendesk_message', array( $to, $ticket_id, $message, $files_urls, $order_id ) );
			// }

		}
	}

	public function send_scheduled_zendesk_message( $to, $ticket_id, $message, $files_urls, $order_id ) {
		$zendesk = \NOVA_B2B\Zendesk::get_instance();
		if ( $zendesk ) {
			error_log( 'Sending scheduled zendesk message for order ' . $order_id );
			$sent = $zendesk->send_zendesk_reply( $to, $ticket_id, $message, $files_urls );
			$zendesk->update_zendesk_tag( $to, $ticket_id, 'order_approved', true );

			if ( $sent ) {
				$order = wc_get_order( $order_id );
				$order->add_order_note( 'Order mockup approved by customer.' );
			}
		}
	}


	public function update_email_mockup() {
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'order_approve_nonce' ) ) {
			wp_send_json_error( 'Security check failed.' );
			wp_die();
		}

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;
		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			wp_send_json_error( 'Order not found.' );
			wp_die();
		}

		$ticket_id = $_POST['ticket_id'];

		$to = $_POST['zendesk_user'];

		$customer_name = $order->get_billing_first_name();

		$files_urls = array();

		//$files_urls = $this->get_dropbox_url_files( $order_id );


		$zendesk = \NOVA_B2B\Zendesk::get_instance();

		if ( $zendesk ) {

			$revision_notes = get_post_meta( $order_id, 'revision_notes', true );

			if ( empty( $revision_notes ) ) {
				$message = "<p>Hi {$customer_name},</p>\n\n";
				$message .= "<p>Please review the mockup and production drawing for Order <strong>#{$order->get_order_number()}</strong>.</p><p>We need your confirmation before the production begins.</p><br>\n\n";
				$message .= "<p>MOCKUPS & PRODUCTION DRAWING HERE:<br>\n\n";
				$message .= "<a href='" . home_url() . "/review-mockup?order_id={$order_id}'>" . home_url() . "/review-mockup?order_id={$order_id}</a></p>";
				$message .= "<p><strong>Approve if:</strong><br>";
				$message .= "All details are correct. Once you approve, changes cannot be made. We will start the production after approval.</p>";
				$message .= "<p><strong>Revise if:</strong><br>";
				$message .= "You need to change a detail. We will revise it based on your comment within 24 business hours.</p>\n\n";
			} else {
				$message = "<p>Hi {$customer_name},</p>\n\n";
				$message .= "<p>Please review the mockup and production drawing for Order <strong>#{$order->get_order_number()}</strong>.</p><p>We need your confirmation before the production begins.</p><br>\n\n";
				$message .= "<p>MOCKUPS & PRODUCTION DRAWING HERE:<br>\n\n";
				$message .= "<a href='" . home_url() . "/review-mockup?order_id={$order_id}'>" . home_url() . "/review-mockup?order_id={$order_id}</a></p>";
				$message .= "<p><strong>Approve if:</strong><br>";
				$message .= "All details are correct. Once you approve, changes cannot be made. We will start the production after approval.</p>";
				$message .= "<p><strong>Revise if:</strong><br>";
				$message .= "You need to change a detail. We will revise it based on your comment within 24 business hours.</p>\n\n";
			}

			$message .= '<p><br/></p>';
			$message .= '<p><strong>Design Approval & Liability Release:</strong><br>';
			$message .= 'By approving the attached production files—whether by electronic confirmation, signature, or "Approved" checkbox—the Client confirms that all details (including but not limited to dimensions, materials, finishes, colors, and mounting methods) are correct and complete. NOVA Signage will manufacture strictly in accordance with these approved files. Any discrepancies, errors, or desired changes identified after approval are the sole responsibility of the Client. Should the Client request revisions post‑approval, NOVA Signage will assess additional charges and extended lead times as necessary. NOVA Signage disclaims all liability for costs, losses, or delays arising from Client‑approved designs.</p>' . "\n\n";

			$sent = $zendesk->send_zendesk_reply( $to, $ticket_id, $message, $files_urls );
			if ( is_wp_error( $sent ) ) {
				wp_send_json_error( $sent->get_error_message() );
			} else {
				$current_date = current_time( 'timestamp' );
				$current_date = date( 'Y-m-d H:i:s', $current_date );
				$current_user = wp_get_current_user();
				$order->add_order_note( "Order approval sent by {$current_user->display_name}" );

				update_post_meta( $order_id, 'order_approved_by', $current_user->user_email );
				update_post_meta( $order_id, 'order_approved_email', $to );
				update_post_meta( $order_id, 'order_approved_date', $current_date );

				delete_post_meta( $order_id, 'first_reminder_sent' );
				delete_post_meta( $order_id, 'second_reminder_sent' );
				delete_post_meta( $order_id, 'third_reminder_sent' );

				$zendesk->update_zendesk_tag( $to, $ticket_id, 'approval_sent', true );

				wp_send_json_success( 'Email sent successfully.' );
			}

		}


		wp_die();

	}

	public function update_email_mockup_old() {
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'order_approve_nonce' ) ) {
			wp_send_json_error( 'Security check failed.' );
			wp_die();
		}

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;
		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			wp_send_json_error( 'Order not found.' );
			wp_die();
		}

		// Get customer email and name.
		$customer_email = $order->get_billing_email();

		$additional_recipients = get_post_meta( $order_id, '_additional_recipients', true );
		if ( ! empty( $additional_recipients ) ) {
			$customer_email_array = array( $customer_email );
			$additional_recipients = trim( $additional_recipients );
			$additional_recipients = explode( ',', $additional_recipients );
			$customer_email = array_merge( $customer_email_array, $additional_recipients );
		}

		$customer_name = $order->get_billing_first_name();

		$headers = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';
		$attachments = array();

		if ( class_exists( '\WPO\WC\PDF_Invoices\Main' ) ) {
			$attachments = \WPO\WC\PDF_Invoices\Main::instance()->attach_document_to_email( array(), 'customer_invoice', $order, null );
		}

		$role_instance = \NOVA_B2B\Roles::get_instance();

		if ( $role_instance ) {
			$subject = 'Order #' . $order->get_order_number() . '- Please Review Mockup and Production Drawing';
			$heading = 'Order #' . $order->get_order_number() . ' is Ready for Review';
			$message = '<p>Hi ' . $customer_name . ',</p>' . "\n\n";
			$message .= '<p>Please review the mockup and production drawing for Order #' . $order->get_order_number() . '. We need your confirmation before the production begins.</p>' . "\n\n";
			$message .= '<p><strong>MOCKUPS & PRODUCTION DRAWING HERE:</strong><br>';
			$message .= '<a href="' . home_url() . '/review-mockup?order_id=' . $order_id . '">' . home_url() . '/review-mockup?order_id=' . $order_id . '</a></p>';
			$message .= '<p><strong>Approve if:</strong><br>';
			$message .= 'All details are correct. Once you approve, changes cannot be made. We will start the production after approval.</p>';
			$message .= '<p><strong>Revise if:</strong><br>';
			$message .= 'You need to change a detail. We will revise it based on your comment within 24 business hours.</p>' . "\n\n";
			$message .= '<p><br/></p>';
			$message .= '<p><strong>Design Approval & Liability Release:</strong><br>';
			$message .= 'By approving the attached production files—whether by electronic confirmation, signature, or "Approved" checkbox—the Client confirms that all details (including but not limited to dimensions, materials, finishes, colors, and mounting methods) are correct and complete. NOVA Signage will manufacture strictly in accordance with these approved files. Any discrepancies, errors, or desired changes identified after approval are the sole responsibility of the Client. Should the Client request revisions post‑approval, NOVA Signage will assess additional charges and extended lead times as necessary. NOVA Signage disclaims all liability for costs, losses, or delays arising from Client‑approved designs.</p>' . "\n\n";
			$message .= '<p>Best regards,<br>';
			$message .= 'Nova Signage</p>' . "\n\n";

			$role_instance->send_email( $customer_email, $subject, $message, $headers, $attachments, $heading );

			wp_send_json_success( 'Email sent successfully.' );
			wp_die();
		}
	}


	public function admin_enqueu_scripts( $hook ) {
		/** only order edit page */
		$screen = get_current_screen();
		wp_register_script( 'order-approve-admin', get_stylesheet_directory_uri() . '/assets/js/admin-order-approve.js', array(), wp_get_theme()->get( 'Version' ), false );

		$quoted_by = get_post_meta( get_the_ID(), 'quoted_by', true ) ? get_post_meta( get_the_ID(), 'quoted_by', true ) : '';

		if ( isset( $quoted_by ) && is_array( $quoted_by ) ) {
			$quoted_by = $quoted_by[0];
		}

		wp_localize_script(
			'order-approve-admin',
			'OrderApprove',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'order_id' => get_the_ID(),
				'review_url' => home_url() . '/review-mockup?order_id=' . get_the_ID(),
				'nonce' => wp_create_nonce( 'order_approve_nonce' ),
				'resend_slack_nonce' => wp_create_nonce( 'resend_slack_message_nonce' ),
				'resend_trello_nonce' => wp_create_nonce( 'resend_trello_message_nonce' ),
				'zendesk_users' => get_field( 'zendesk_users', 'option' ),
				'ticket_id' => get_post_meta( get_the_ID(), 'zendesk_ticket_id', true ),
				'quoted_by' => $quoted_by,
				'dropbox_urls' => $this->get_dropbox_url_files( get_the_ID() ),
			)
		);

		if ( 'post' === $screen->base && 'shop_order' === $screen->post_type ) {
			wp_enqueue_script( 'order-approve-admin' );
		}
	}

	/**
	 * Enqueue Scripts.
	 */
	public function enqueu_script() {
		if ( ! is_user_logged_in() ) {
			return;
		}


		wp_register_script( 'order-approve', get_stylesheet_directory_uri() . '/assets/js/order-approve.js', array(), wp_get_theme()->get( 'Version' ), false );

		wp_localize_script(
			'order-approve',
			'order_approve_ajax',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'order_approve_nonce' ),
			)
		);
	}

	/**
	 * Ajax Approve Mockup.
	 */
	public function approve_mockup() {
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'order_approve_nonce' ) ) {
			wp_send_json_error( 'Security check failed.' );
			wp_die();
		}

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;
		$approve = isset( $_POST['approve'] ) ? sanitize_text_field( $_POST['approve'] ) : '';
		$revision_notes = isset( $_POST['revision_notes'] ) ? sanitize_textarea_field( $_POST['revision_notes'] ) : '';

		if ( ! $order_id ) {
			wp_send_json_error( 'Invalid order ID.' );
			wp_die();
		}

		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			wp_send_json_error( 'Order not found.' );
			wp_die();
		}

		// Ensure the current user owns the order or an admin
		if ( $order->get_user_id() != get_current_user_id() ) {
			wp_send_json_error( 'You are not authorized to access this order.' );
			wp_die();
		}

		// Prepare email content

		$edit_link = get_edit_post_link( $order_id );

		$order_approved_by = get_post_meta( $order_id, 'order_approved_by', true );

		if ( $approve === 'approve' ) {
			$message = '<p>The customer has approved the designs for Order #' . $order->get_order_number() . '.</p>';
			if ( $order_approved_by ) {
				$message .= '<p>Order approval sent by: ' . $order_approved_by . '</p>';
			}
			// Get order edit link
			$message .= '<p>View the order here: <a href="' . $edit_link . '">' . $edit_link . '</a></p>';
			// Optionally add order note
			$order->add_order_note( 'Customer approved the designs.' );
			update_field( 'order_approved_by_customer', true, $order_id );
			update_field( 'order_approved_by_customer_date', date( 'F d, Y' ), $order_id );

			do_action( 'order_customer_approved', $order_id );

		} elseif ( $approve === 'revision' ) {
			if ( empty( $revision_notes ) ) {
				wp_send_json_error( 'Please provide revision notes.' );
				wp_die();
			}
			$message = '<p>The customer has requested revisions for <a href="' . get_edit_post_link( $order_id ) . '"> Order #NV' . $order_id . '</a>.</p>' . "\n\n";
			if ( $order_approved_by ) {
				$message .= '<p>Order approval sent by: ' . $order_approved_by . '</p>';
			}
			$message .= '<p>View the order here: <a href="' . $edit_link . '">' . $edit_link . '</a></p>';
			$message .= '<p>Revision Notes:</p>' . "\n" . nl2br( esc_html( $revision_notes ) );
			// Optionally add order note
			$order->add_order_note( 'Customer requested revisions: ' . $revision_notes );

			update_post_meta( $order_id, 'revision_notes', $revision_notes );

			delete_post_meta( $order_id, 'order_approved_by' );
			delete_post_meta( $order_id, 'order_approved_email' );
			delete_post_meta( $order_id, 'order_approved_date' );

			do_action( 'order_customer_revisions_requested', $order_id );
		} else {
			wp_send_json_error( 'Invalid selection.' );
			wp_die();
		}


		// Set email headers with customer's email as the 'From' address

		$zendesk = \NOVA_B2B\Zendesk::get_instance();

		if ( $zendesk ) {
			$to = $order->get_meta( 'order_approved_email' ) ? $order->get_meta( 'order_approved_email' ) : 'joshua+nova@novasignage.com';
			$ticket_id = get_post_meta( $order_id, 'zendesk_ticket_id', true );
			$sent = $zendesk->send_zendesk_reply( $to, $ticket_id, $message, [], false );

			if ( $sent ) {
				wp_send_json(
					array(
						'success' => true,
						'action' => $approve,
						'message' => 'Zendesk private note added.',
					)
				);
			} else {
				wp_send_json_error( 'Failed adding zendesk note.' );
			}
		}
		wp_die();
	}

	public function get_dropbox_url_files( $order_id ) {
		$dropbox_urls = get_field( 'dropbox_urls', $order_id );
		$urls = array();
		if ( ! empty( $dropbox_urls ) ) {
			foreach ( $dropbox_urls as $url ) {
				$urls[] = str_replace( 'dl=0', 'dl=1', $url['dropbox_url'] );
			}
		}
		return $urls;
	}


	/**
	 * Schedule the cron job if it's not already scheduled
	 */
	public function setup_notification_cron() {
		if ( ! wp_next_scheduled( 'check_order_approval_notifications' ) ) {
			wp_schedule_event( time(), 'daily', 'check_order_approval_notifications' );
		}
	}

	/**
	 * Process order approval notifications
	 */
	public function process_order_approval_notifications() {
		$orders = wc_get_orders( array(
			'meta_key' => 'order_approved_by',
			'meta_compare' => 'EXISTS',
		) );


		$zendesk = \NOVA_B2B\Zendesk::get_instance();

		if ( ! $zendesk ) {
			return;
		}

		foreach ( $orders as $order ) {
			$order_id = $order->get_id();
			$order_approved_date = $order->get_meta( 'order_approved_date' );
			$order_approved_by_customer = get_field( 'order_approved_by_customer', $order_id );
			$disable_zendesk = get_field( 'disable_zendesk_ticket', $order_id );

			if ( $disable_zendesk ) {
				continue;
			}

			if ( ! $order_approved_date || $order_approved_by_customer ) {
				continue;
			}

			$order_approved_date = strtotime( $order_approved_date );
			$current_date = current_time( 'timestamp' );
			$days_since_order_approved = floor( ( $current_date - $order_approved_date ) / ( 60 * 60 * 24 ) );
			$first_reminder_sent = $order->get_meta( 'first_reminder_sent' );
			$second_reminder_sent = $order->get_meta( 'second_reminder_sent' );
			$third_reminder_sent = $order->get_meta( 'third_reminder_sent' );
			$zendesk_ticket_id = $order->get_meta( 'zendesk_ticket_id' );

			$to = $order->get_meta( 'order_approved_email' ) ? $order->get_meta( 'order_approved_email' ) : 'joshua+nova@novasignage.com';

			if ( $days_since_order_approved >= 1 && ! $first_reminder_sent ) {

				$customer_name = $order->get_billing_first_name();

				$files_urls = array();


				$message = '<p>Hello ' . $customer_name . ',</p><br>';
				$message .= '<p>Just a quick reminder to review the mockup and production drawing for your order #' . $order->get_order_number() . '.</p><br/>';
				$message .= '<p>We need your confirmation to proceed with production.</p><br/>';
				$message .= '<p><strong>MOCKUPS & PRODUCTION DRAWING HERE:</strong><br>';
				$message .= '<a href="' . home_url() . '/review-mockup?order_id=' . $order_id . '">' . home_url() . '/review-mockup?order_id=' . $order_id . '</a></p>';
				$message .= '<p><strong>Approve if:</strong><br>';
				$message .= 'All details are correct. Once approved, no further changes can be made.</p><br>';
				$message .= '<p><strong>Revise if:</strong><br>';
				$message .= 'You need changes. We\'ll revise your request within 24 business hours.</p>' . "<br/><br/>";
				$message .= 'Thank you!<br/>';

				$message .= '<p><br/></p>';
				$message .= '<p><strong>Design Approval & Liability Release:</strong><br>';
				$message .= 'By approving the attached production files—whether by electronic confirmation, signature, or "Approved" checkbox—the Client confirms that all details (including but not limited to dimensions, materials, finishes, colors, and mounting methods) are correct and complete. NOVA Signage will manufacture strictly in accordance with these approved files. Any discrepancies, errors, or desired changes identified after approval are the sole responsibility of the Client. Should the Client request revisions post‑approval, NOVA Signage will assess additional charges and extended lead times as necessary. NOVA Signage disclaims all liability for costs, losses, or delays arising from Client‑approved designs.</p>' . "\n\n";



				$order->add_order_note( 'First reminder sent: ' . date( 'F j, Y', $current_date ) );
				$order->update_meta_data( 'first_reminder_sent', $current_date );
				$order->save();

				$zendesk->send_zendesk_reply( $to, $zendesk_ticket_id, $message, $files_urls );
				$zendesk->update_zendesk_tag( $to, $zendesk_ticket_id, 'first_reminder_sent', true );

			}

			if ( $days_since_order_approved >= 3 && ! $second_reminder_sent ) {

				$message = '<p>Hello ' . $customer_name . ',</p><br/>';
				$message .= '<p>Please review the mockup and production drawing for your order. We\'ll wait for your final approval before moving forward with production.</p><br/>';
				$message .= '<p>We need your confirmation to proceed with production.</p><br/>';
				$message .= '<p><strong>Review Mockup:</strong> ';
				$message .= home_url() . '/review-mockup?order_id=' . $order_id . '</p>';
				$message .= '<p><strong>Approve</strong> if everything looks right.<br>';
				$message .= '<strong>Request a revision</strong> if any details need changes.</p>';
				$message .= '<p>We\'ll respond to revision requests within 24 business hours.</p>';
				$message .= '<p>Thanks for your prompt attention!</p>';
				$message .= '<p>Thank you!</p>';

				$message .= '<p><br/></p>';
				$message .= '<p><strong>Design Approval & Liability Release:</strong><br>';
				$message .= 'By approving the attached production files—whether by electronic confirmation, signature, or "Approved" checkbox—the Client confirms that all details (including but not limited to dimensions, materials, finishes, colors, and mounting methods) are correct and complete. NOVA Signage will manufacture strictly in accordance with these approved files. Any discrepancies, errors, or desired changes identified after approval are the sole responsibility of the Client. Should the Client request revisions post‑approval, NOVA Signage will assess additional charges and extended lead times as necessary. NOVA Signage disclaims all liability for costs, losses, or delays arising from Client‑approved designs.</p>' . "\n\n";

				$order->add_order_note( 'Second reminder sent: ' . date( 'F j, Y', $current_date ) );
				$order->update_meta_data( 'second_reminder_sent', $current_date );
				$order->save();


				$zendesk->send_zendesk_reply( $to, $zendesk_ticket_id, $message, $files_urls );
				$zendesk->update_zendesk_tag( $to, $zendesk_ticket_id, 'second_reminder_sent', true );
			}

			if ( $days_since_order_approved >= 5 && ! $third_reminder_sent ) {

				$message = '<p>Hello ' . $customer_name . ',</p><br/>';
				$message .= '<p>This is a final reminder to review the mockup and production drawing for order #' . $order->get_order_number() . '.</p><br/>';
				$message .= '<p><strong>Review Mockup:</strong> ';
				$message .= home_url() . '/review-mockup?order_id=' . $order_id . '</p>';
				$message .= '<p><strong>Approve</strong>  if everything is correct -- production will begin after your approval.<br>';
				$message .= '<strong>Request a revision</strong> if anything needs to be changed -- our team will update the file within 24 business hours.</p>';
				$message .= '<p>If the mockups are not approved or revised, our team will follow up with you to confirm the details before proceeding.</p>';
				$message .= '<p>Let us know if you have any questions. We\'re looking forward to your confirmation!</p>';

				$message .= '<p><br/></p>';
				$message .= '<p><strong>Design Approval & Liability Release:</strong><br>';
				$message .= 'By approving the attached production files—whether by electronic confirmation, signature, or "Approved" checkbox—the Client confirms that all details (including but not limited to dimensions, materials, finishes, colors, and mounting methods) are correct and complete. NOVA Signage will manufacture strictly in accordance with these approved files. Any discrepancies, errors, or desired changes identified after approval are the sole responsibility of the Client. Should the Client request revisions post‑approval, NOVA Signage will assess additional charges and extended lead times as necessary. NOVA Signage disclaims all liability for costs, losses, or delays arising from Client‑approved designs.</p>' . "\n\n";

				$order->add_order_note( 'Third reminder sent: ' . date( 'F j, Y', $current_date ) );
				$order->update_meta_data( 'third_reminder_sent', $current_date );
				$order->save();

				$zendesk->send_zendesk_reply( $to, $zendesk_ticket_id, $message, $files_urls );
				$zendesk->update_zendesk_tag( $to, $zendesk_ticket_id, 'third_reminder_sent', true );

				$role_instance = \NOVA_B2B\Roles::get_instance();
				if ( $role_instance ) {
					$customer_id = $order->get_customer_id();
					$company = get_field( 'business_name', 'user_' . $customer_id ) ? get_field( 'business_name', 'user_' . $customer_id ) : 'None';
					$business_id = get_field( 'business_id', 'user_' . $customer_id ) ? get_field( 'business_id', 'user_' . $customer_id ) : 'None';
					$phone = get_field( 'business_phone', 'user_' . $customer_id ) ? get_field( 'business_phone', 'user_' . $customer_id ) : 'None';

					$customer_email = $order->get_billing_email();

					$message = 'Hi,<br/><br/>';
					$message .= 'The client has not approved, revised, or responded to the mockup and production drawing link after three reminder emails for #' . $order->get_order_number() . '.<br/><br/>';
					$message .= 'Please reach out to the client via phone or direct contact to confirm their feedback before we proceed with production.</p>' . "\n\n";
					$message .= '<strong>Client details</strong><br>';
					$message .= 'Business ID: ' . $business_id . '<br>';
					$message .= 'Company: ' . $company . '<br>';
					$message .= 'Email: ' . $customer_email . '<br>';
					$message .= 'Phone: ' . $phone . '<br>';
					$message .= 'View order <a href="' . admin_url( 'post.php?post=' . $order_id . '&action=edit' ) . '">here</a>.<br/><br/>';

					$subject = '[NOVA INTERNAL] No Response After 3rd Mockup Reminder - Order #' . $order->get_order_number();

					$role_instance->send_email( 'quotes@novasignage.com', $subject, $message );
				}
			}
		}
	}

	public function add_order_approved_date_metabox() {
		// if user id is not 1, return
		if ( get_current_user_id() !== 1 ) {
			return;
		}

		add_meta_box(
			'order_approved_date_metabox',
			'Order Approved Date',
			array( $this, 'render_order_approved_date_metabox' ),
			'shop_order',
			'side',
			'default'
		);
	}

	public function render_order_approved_date_metabox( $post ) {

		$order_approved_date = get_post_meta( $post->ID, 'order_approved_date', true );

		if ( ! $order_approved_date ) {
			return;
		}

		$input_date = date( 'Y-m-d\TH:i:s', strtotime( $order_approved_date ) );

		?>
		<label for="order_approved_date">Approved Date:</label>
		<input type="datetime-local" id="order_approved_date" name="order_approved_date"
			value="<?php echo esc_attr( $input_date ); ?>" />
		<?php
	}

	public function save_order_approved_date( $post_id ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( isset( $_POST['order_approved_date'] ) ) {
			$new_date = sanitize_text_field( $_POST['order_approved_date'] );
			$new_date = date( 'Y-m-d H:i:s', strtotime( $new_date ) );
			update_post_meta( $post_id, 'order_approved_date', $new_date );
		}
	}

	public function add_slack_message_metabox() {
		add_meta_box(
			'slack_message_metabox',
			'Slack Message Status',
			array( $this, 'render_slack_message_metabox' ),
			'shop_order',
			'side',
			'default'
		);
	}

	public function render_slack_message_metabox( $post ) {
		$order_approved_by_customer = get_field( 'order_approved', $post->ID );
		if ( ! $order_approved_by_customer ) {
			echo '<p>Order not approved yet by customer.</p>';
			return;
		}

		$slack_message_sent = get_post_meta( $post->ID, 'slack_message_sent', true );
		$date_format = get_option( 'date_format' ) . ' ' . get_option( 'time_format' );

		wp_nonce_field( 'resend_slack_message_nonce', 'resend_slack_message_nonce' );

		if ( $slack_message_sent ) {
			echo '<p><strong>Last Sent:</strong> ' . date( $date_format, $slack_message_sent ) . '</p>';
		} else {
			echo '<p>No Slack message has been sent yet.</p>';
		}

		echo '<button type="button" class="button" id="resend-slack-message" data-order-id="' . esc_attr( $post->ID ) . '">Resend Slack Message</button>';
		echo '<span class="spinner" style="float:none;"></span>';
		echo '<div class="slack-message-status"></div>';
	}

	public function resend_slack_message() {
		check_ajax_referer( 'resend_slack_message_nonce', 'nonce' );

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;

		if ( ! $order_id ) {
			wp_send_json_error( 'Invalid order ID' );
		}

		$this->send_scheduled_slack_message( $order_id );
		wp_send_json_success( 'Slack message sent successfully' );
	}

	public function add_trello_card_metabox() {
		add_meta_box(
			'trello_card_metabox',
			'Trello Card Status',
			array( $this, 'render_trello_card_metabox' ),
			'shop_order',
			'side',
			'default'
		);
	}

	public function render_trello_card_metabox( $post ) {
		$order_approved_by_customer = get_field( 'order_approved', $post->ID );

		if ( ! $order_approved_by_customer ) {
			echo '<p>Order not approved yet by customer.</p>';
			return;
		}

		$trello_card_id = get_post_meta( $post->ID, 'trello_card_id', true );
		$trello_webhook_id = get_post_meta( $post->ID, 'trello_webhook_id', true );

		wp_nonce_field( 'resend_trello_message_nonce', 'resend_trello_message_nonce' );

		if ( $trello_card_id ) {
			echo '<p><strong>Trello Card ID:</strong> ' . esc_html( $trello_card_id ) . '</p>';
		} else {
			echo '<p>No Trello card has been created yet.</p>';
		}

		echo '<button type="button" class="button" id="resend-trello-message" data-order-id="' . esc_attr( $post->ID ) . '">Create Trello Card</button>';
		echo '<span class="spinner" style="float:none;"></span>';
		echo '<div class="trello-message-status"></div>';

		if ( $trello_webhook_id ) {
			echo '<p><strong>Trello Webhook ID:</strong> ' . esc_html( $trello_webhook_id ) . '</p>';
		} else {
			echo '<p>No Trello webhook has been created yet.</p>';
		}
	}

	public function resend_trello_message() {
		check_ajax_referer( 'resend_trello_message_nonce', 'nonce' );

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;

		if ( ! $order_id ) {
			wp_send_json_error( 'Invalid order ID' );
		}

		$this->send_scheduled_trello_message( $order_id );
		wp_send_json_success( 'Trello card created successfully' );
	}
}