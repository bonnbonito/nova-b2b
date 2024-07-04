<?php

namespace NOVA_B2B;

class NovaEmails {
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
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'pending_payment_processing_email' ), 40, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'complete_payment_processing_email' ), 41, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'fully_paid_payment_processing_email' ), 42, 5 );
		add_filter( 'woocommerce_email_additional_content_customer_processing_order', array( $this, 'pending_payment_additional_content' ), 40, 3 );
		add_filter( 'woocommerce_email_additional_content_customer_completed_order', array( $this, 'complete_payment_additional_content' ), 41, 3 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'complete_payment_heading' ), 41, 3 );
		add_filter( 'woocommerce_email_additional_content_customer_completed_order', array( $this, 'fully_paid_payment_additional_content' ), 42, 3 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'fully_paid_payment_heading' ), 42, 3 );
		add_filter( 'woocommerce_email_subject_customer_processing_order', array( $this, 'pending_payment_subject' ), 40, 2 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'completed_payment_subject' ), 41, 2 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'fully_paid_payment_subject' ), 42, 2 );
		add_filter( 'woocommerce_email_recipient_new_order', array( $this, 'filter_woocommerce_email_recipient_new_order' ), 10, 2 );
		add_filter( 'woocommerce_email_recipient_new_order', array( $this, 'filter_woocommerce_email_recipient_new_order' ), 10, 2 );
		// add_filter( 'woocommerce_email_attachments', array( $this, 'insert_invoice' ), 10, 4 );
		add_filter( 'woocommerce_email_attachments', array( $this, 'insert_invoice' ), 10, 4 );
		// Remove "On Hold" email notification
		add_filter( 'woocommerce_email_enabled_customer_on_hold_order', '__return_false' );
		add_filter( 'woocommerce_email_enabled_new_order', array( $this, 'disable_admin_new_order_email_on_hold' ), 10, 3 );
		add_action( 'quote_to_processing', array( $this, 'for_quotation_email' ) );
		add_action( 'quote_to_payment', array( $this, 'for_payment_email' ), 90 );
		add_action( 'quote_to_payment', array( $this, 'for_payment_admin_email' ) );
		add_action( 'admin_init', array( $this, 'process_send_mockup_email' ) );
	}

	public function disable_admin_new_order_email_on_hold( $enabled, $order, $email ) {
		if ( is_a( $order, 'WC_Order' ) && $order->has_status( 'on-hold' ) && $email->id === 'new_order' ) {
			return false;
		}
		return $enabled;
	}

	public function insert_invoice( $attachments, $email_id, $order, $email ) {

		if ( $order->get_meta( '_adjusted_duplicate_order_id' ) || $order->get_meta( '_from_order_id' ) ) {

			// Check if the email ID matches the ones you want to add the attachment to
			if ( in_array( $email_id, array( 'customer_processing_order', 'customer_completed_order' ) ) ) {
				// Add the custom attachment

				if ( $email_id === 'customer_completed_order' && $order->get_meta( '_from_order_id' ) ) {
					return $attachments;
				}

				$content    = $this->order_invoice_content( $order );
				$nova_quote = \NOVA_B2B\Nova_Quote::get_instance();

				$nova_quote->generate_invoice_pdf(
					$order->get_user_id(),
					$order->get_order_number(),
					$content
				);

				$order_number = $order->get_order_number();
				$business_id  = get_field( 'business_id', 'user_' . $order->get_user_id() );

				$filename = $business_id . '-' . $order_number . '.pdf';

				$file = WP_CONTENT_DIR . '/uploads/order_invoices/' . $filename;

				if ( file_exists( $file ) ) {
					$attachments[] = $file;
				}
			}
		}

		return $attachments;
	}

	public function filter_woocommerce_email_recipient_new_order( $recipient, $order ) {
		if ( $order instanceof \WC_Order ) {
			$order_id      = $order->get_id();
			$from_order_id = get_post_meta( $order_id, '_from_order_id', true );

			// Check if the order has the _from_order_id meta
			if ( ! empty( $from_order_id ) ) {
				// Remove the customer email from the recipients
				$recipient = '';
			}
		}

		return $recipient;
	}



	public static function get_username_from_id( $id ) {
		if ( empty( $id ) || 'guest' === $id ) {
			return __( 'Guest', 'kadence-woocommerce-email-designer' );
		}
		$user = get_user_by( 'id', $id );
		if ( is_object( $user ) ) {
			$username = $user->user_login;
		} else {
			$username = __( 'Guest', 'kadence-woocommerce-email-designer' );
		}
		return $username;
	}

	public function is_deposit_order( $order_id ) {
		return get_post_meta( $order_id, '_adjusted_duplicate_order_id', true ) ? true : false;
	}

	public function is_payment_order( $order_id ) {
		return get_post_meta( $order_id, '_from_order_id', true ) ? true : false;
	}

	public function fully_paid_payment_subject( $subject, $order ) {
		$order_id       = $order->get_id();
		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $this->is_payment_order( $order_id ) ) {
			return $subject;
		}

		if ( $payment_select ) {
			$payment_select = get_post_meta( $order_id, '_payment_select', true );
			$paid_email     = get_field( 'paid_email', $payment_select );
			$subject        = $paid_email['subject'] ? $paid_email['subject'] : $subject;

			$subject = str_replace( '{order_number}', $order->get_order_number(), $subject );
		}

		return $subject;
	}

	public function completed_payment_subject( $subject, $order ) {
		$order_id       = $order->get_id();
		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $subject;
		}

		if ( $payment_select ) {
			$payment_select  = get_post_meta( $order_id, '_payment_select', true );
			$completed_email = get_field( 'completed_email', $payment_select );
			$subject         = $completed_email['subject'] ? $completed_email['subject'] : $subject;

			$subject = str_replace( '{order_number}', $order->get_order_number(), $subject );
		}

		return $subject;
	}

	public function pending_payment_subject( $subject, $order ) {
		$order_id       = $order->get_id();
		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $subject;
		}

		if ( $payment_select ) {
			$payment_select   = get_post_meta( $order_id, '_payment_select', true );
			$processing_email = get_field( 'processing_email', $payment_select );
			$subject          = $processing_email['subject'] ? $processing_email['subject'] : $subject;

			$subject = str_replace( '{order_number}', $order->get_order_number(), $subject );
		}

		return $subject;
	}

	public function pending_payment_additional_content( $additional_content, $order, $email ) {
		$order_id         = $order->get_id();
		$payment_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$payment_order    = wc_get_order( $payment_order_id );

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $additional_content;
		}

		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( $payment_select ) {
			$processing_email   = get_field( 'processing_email', $payment_select );
			$additional_content = $processing_email['additional_content'] ? $processing_email['additional_content'] : $additional_content;
			$additional_content = str_replace( '{payment_link}', $payment_order->get_checkout_payment_url(), $additional_content );
		}

		return $additional_content;
	}

	public function complete_payment_heading( $heading, $order, $email ) {
		$order_id         = $order->get_id();
		$payment_select   = get_post_meta( $order_id, '_payment_select', true );
		$payment_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$payment_order    = wc_get_order( $payment_order_id );

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $heading;
		}

		if ( $payment_order_id && $payment_select ) {
			$completed_email = get_field( 'completed_email', $payment_select );
			$heading         = $completed_email['heading'] ? $completed_email['heading'] : $heading;
			$heading         = str_replace( '{order_number}', $order->get_order_number(), $heading );
		}

		return $heading;
	}

	public function complete_payment_additional_content( $additional_content, $order, $email ) {
		$order_id         = $order->get_id();
		$payment_select   = get_post_meta( $order_id, '_payment_select', true );
		$payment_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$payment_order    = wc_get_order( $payment_order_id );

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $additional_content;
		}

		if ( $payment_order_id && $payment_select ) {
			$completed_email    = get_field( 'completed_email', $payment_select );
			$additional_content = $completed_email['additional_content'] ? $completed_email['additional_content'] : $additional_content;
			$additional_content = str_replace( '{payment_link}', $payment_order->get_checkout_payment_url(), $additional_content );
		}

		return $additional_content;
	}

	public function fully_paid_payment_heading( $heading, $order, $email ) {
		$order_id       = $order->get_id();
		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $this->is_payment_order( $order_id ) ) {
			return $heading;
		}

		$paid_email = get_field( 'paid_email', $payment_select );

		$heading = $paid_email['heading'] ? $paid_email['heading'] : $heading;
		$heading = str_replace( '{order_number}', $order->get_order_number(), $heading );

		return $heading;
	}

	public function fully_paid_payment_additional_content( $additional_content, $order, $email ) {
		$order_id       = $order->get_id();
		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $this->is_payment_order( $order_id ) ) {
			return $additional_content;
		}

		$paid_email = get_field( 'paid_email', $payment_select );
		return $paid_email['additional_content'] ? $paid_email['additional_content'] : $additional_content;
	}

	public function pending_payment_processing_email( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$order_id = $order->get_id();
		$key      = $email->id;

		$payment_select   = get_post_meta( $order_id, '_payment_select', true );
		$payment_order_id = get_post_meta( $order_id, '_adjusted_duplicate_order_id', true );
		$payment_order    = wc_get_order( $payment_order_id );

		if ( $payment_order_id && $payment_select && $key === 'customer_processing_order' ) {

			$payment_select = get_post_meta( $order_id, '_payment_select', true );

			$processing_email = get_field( 'processing_email', $payment_select );

			$body_text = $processing_email['body_text'];

			$pending_payment = get_post_meta( $order_id, '_pending_payment', true );

			$body_text = str_replace( '{order_date}', wc_format_datetime( $order->get_date_created() ), $body_text );
			$body_text = str_replace( '{pending_payment}', $pending_payment, $body_text );
			$body_text = str_replace( '{order_number}', $order->get_order_number(), $body_text );
			$body_text = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_last_name}', $order->get_billing_last_name(), $body_text );
			$body_text = str_replace( '{customer_full_name}', $order->get_formatted_billing_full_name(), $body_text );
			$body_text = str_replace( '{customer_company}', $order->get_billing_company(), $body_text );
			$body_text = str_replace( '{customer_email}', $order->get_billing_email(), $body_text );
			$body_text = str_replace( '{payment_link}', $payment_order->get_checkout_payment_url(), $body_text );
		}

		return $body_text;
	}


	public function complete_payment_processing_email( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$order_id = $order->get_id();
		$key      = $email->id;

		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $body_text;
		}

		if ( $payment_select && $key === 'customer_completed_order' ) {

			$pending = \NOVA_B2B\Pending_Payment::get_instance();

			$payment        = $pending->get_payment_date( $order_id );
			$payment_select = $payment->payment_select;

			$completed_date_obj  = $order->get_date_completed();
			$shipped_date        = $completed_date_obj->date( 'F d, Y' );
			$days_after_shipping = get_field( 'days_after_shipping', $payment_select );
			$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
			$payment_date        = date( 'F d, Y', $deadline );

			$completed_email = get_field( 'completed_email', $payment_select );

			$body_text = $completed_email['body_text'];

			$pending_payment = get_post_meta( $order_id, '_pending_payment', true );

			$body_text = str_replace( '{order_date}', wc_format_datetime( $order->get_date_created() ), $body_text );
			$body_text = str_replace( '{pending_payment}', $pending_payment, $body_text );
			$body_text = str_replace( '{order_number}', $order->get_order_number(), $body_text );
			$body_text = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_last_name}', $order->get_billing_last_name(), $body_text );
			$body_text = str_replace( '{customer_full_name}', $order->get_formatted_billing_full_name(), $body_text );
			$body_text = str_replace( '{customer_company}', $order->get_billing_company(), $body_text );
			$body_text = str_replace( '{customer_email}', $order->get_billing_email(), $body_text );
			$body_text = str_replace( '{deadline}', $payment_date, $body_text );
			$body_text = str_replace( '{payment_link}', $order->get_checkout_payment_url(), $body_text );

		}

		return $body_text;
	}

	public function fully_paid_payment_processing_email( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$order_id = $order->get_id();
		$key      = $email->id;

		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( $this->is_payment_order( $order_id ) && $payment_select && $key === 'customer_completed_order' ) {

			$pending = \NOVA_B2B\Pending_Payment::get_instance();

			$payment = $pending->get_payment_date( $order_id );

			$original_order_id   = $payment->original_order;
			$original_order      = wc_get_order( $original_order_id );
			$completed_date_obj  = $original_order->get_date_completed();
			$shipped_date        = $completed_date_obj->date( 'F d, Y' );
			$days_after_shipping = get_field( 'days_after_shipping', $payment_select );
			$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
			$payment_date        = date( 'F d, Y', $deadline );

			$paid_email = get_field( 'paid_email', $payment_select );

			$body_text = $paid_email['body_text'];

			$pending_payment = get_post_meta( $order_id, '_pending_payment', true );

			$body_text = str_replace( '{order_date}', wc_format_datetime( $order->get_date_created() ), $body_text );
			$body_text = str_replace( '{pending_payment}', $pending_payment, $body_text );
			$body_text = str_replace( '{order_number}', $order->get_order_number(), $body_text );
			$body_text = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_last_name}', $order->get_billing_last_name(), $body_text );
			$body_text = str_replace( '{customer_full_name}', $order->get_formatted_billing_full_name(), $body_text );
			$body_text = str_replace( '{customer_company}', $order->get_billing_company(), $body_text );
			$body_text = str_replace( '{customer_email}', $order->get_billing_email(), $body_text );
			$body_text = str_replace( '{deadline}', $payment_date, $body_text );
			$body_text = str_replace( '{payment_link}', $order->get_checkout_payment_url(), $body_text );

		}

		return $body_text;
	}

	public function order_invoice_content( $order ) {
		$payment_order_id = $order->get_meta( '_adjusted_duplicate_order_id' );
		$payment_order    = $order;
		if ( $payment_order_id ) {
			$payment_order = wc_get_order( $payment_order_id );
		}

		$content  = '<table>';
		$content .= '<tr><td style="margin-top: 0; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #000;">';
		$content .= '<img src="' . get_stylesheet_directory() . '/assets/img/nova-logo.png' . '" alt="Nova Signage">';
		$content .= '</td></tr>';
		$content .= '</table>';

		$content .= '<p>Hi, {customer_name}!</p>';
		$content .= 'Here are the details of your order:';
		$content .= '{order_details}';
		$content .= '&nbsp;';
		$content .= '<p>Please click here to pay: {payment_link}';
		$content .= '<p>Thank you for choosing NOVA Signage!';
		$content .= '<p>NOVA Signage Team';

		$content = str_replace( '{customer_name}', $order->get_billing_first_name(), $content );
		ob_start();
		do_action( 'woocommerce_email_order_details', $order, false, false, '' );
		$order_details = ob_get_clean();
		$content       = str_replace( '{order_details}', $order_details, $content );
		$content       = str_replace( '{payment_link}', $payment_order->get_checkout_payment_url(), $content );

		return $content;
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

	public function for_payment_admin_email( $post_id ) {

		$user_id       = get_field( 'partner', $post_id );
		$user_info     = get_userdata( $user_id );
		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$company       = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$first_name = $user_info->first_name;

		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		$to_admin = $this->to_admin_customer_rep_emails();

		$admin_subject = 'NOVA INTERNAL - Quote Sent To: ' . $first_name . ' from ' . $company . ' ' . $business_id . ' - Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		$admin_message = '<p>Hello,</p>';

		$admin_message .= '<p>You sent a quotation to:</p>';
		$admin_message .= '<ul>';
		$admin_message .= '<li><strong>Customer:</strong> ' . $first_name . ' - ' . $business_id . '</li>';
		$admin_message .= '<li><strong>Company:</strong> ' . $company . '</li>';
		$admin_message .= '<li><strong>Quote ID:</strong> #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';
		$admin_message .= '</ul><br>';

		$admin_message .= '<p>You may review the quotation you sent here:</p>';
		$admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a>';

		$role_instance = \NOVA_B2B\Roles::get_instance();

		if ( $role_instance ) {
			$role_instance->send_email( $to_admin, $admin_subject, $admin_message, $headers, array() );
		}
	}

	public function for_quotation_email( $post_id ) {

		// Retrieve the partner user ID from the post's custom field
		$user_id = get_field( 'partner', $post_id );
		if ( ! $user_id ) {
			error_log( 'No partner user ID found for post ID ' . $post_id );
			return;
		}

		// Retrieve user information
		$user_info = get_userdata( $user_id );
		if ( ! $user_info ) {
			error_log( 'No user info found for user ID ' . $user_id );
			return;
		}

		// Get business ID, default to 'N/A' if not found
		$business_id = get_field( 'business_id', 'user_' . $user_id ) ?: 'N/A';

		// Get business name, default to 'None' if not found
		$company = get_field( 'business_name', 'user_' . $user_id ) ?: 'None';

		// Construct the edit post URL
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		// Retrieve the user's first name
		$first_name = $user_info->first_name ?: 'Customer';

		// Set up email headers
		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		// Retrieve admin customer rep emails
		$to_admin = $this->to_admin_customer_rep_emails();
		if ( ! $to_admin ) {
			error_log( 'No admin customer rep emails found' );
			return;
		}

		/** remove joshua@hineon.com to $to_admin array */
		$to_admin = array_diff( $to_admin, array( 'joshua@hineon.com' ) );

		// Construct the subject for the admin email
		$admin_subject = 'NOVA INTERNAL - Quote Request From: ' . $first_name . ' from ' . $company . ' ' . $business_id . ' - #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );
		$josh_subject  = 'NOVA INTERNAL (Action Required) - Quote Request From: ' . $first_name . ' from ' . $company . ' ' . $business_id . ' - #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		// Construct the message for the admin email
		$to_admin_message  = '<p>Hello,</p>';
		$to_admin_message .= '<p>Client sent a quotation request:</p>';
		$to_admin_message .= '<ul>';
		$to_admin_message .= '<li><strong>Customer:</strong> ' . $first_name . ' - ' . $business_id . '</li>';
		$to_admin_message .= '<li><strong>Company:</strong> ' . $company . '</li>';
		$to_admin_message .= '<li><strong>Quote ID:</strong> #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';
		$to_admin_message .= '</ul><br>';
		$to_admin_message .= '<p>You may review the quotation you sent here:<br>';
		$to_admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a></p>';

		// Get the instance of the Roles class and send the email
		$role_instance = \NOVA_B2B\Roles::get_instance();
		if ( $role_instance ) {
			$role_instance->send_email( $to_admin, $admin_subject, $to_admin_message, $headers, array() );
			$role_instance->send_email( 'joshua@hineon.com', $josh_subject, $to_admin_message, $headers, array() );
		} else {
			error_log( 'NOVA_B2B\Roles::get_instance() returned null' );
		}
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

	public function for_quotation_admin_email( $post_id ) {

		// Retrieve the partner user ID from the post's custom field
		$user_id = get_field( 'partner', $post_id );
		if ( ! $user_id ) {
			error_log( 'No partner user ID found for post ID ' . $post_id );
			return;
		}

		// Retrieve user information
		$user_info = get_userdata( $user_id );
		if ( ! $user_info ) {
			error_log( 'No user info found for user ID ' . $user_id );
			return;
		}

		// Get business ID, default to 'N/A' if not found
		$business_id = get_field( 'business_id', 'user_' . $user_id ) ?: 'N/A';

		// Get business name, default to 'None' if not found
		$company = get_field( 'business_name', 'user_' . $user_id ) ?: 'None';

		// Construct the edit post URL
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		// Retrieve the user's first name
		$first_name = $user_info->first_name ?: 'Customer';

		// Set up email headers
		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		// Retrieve admin customer rep emails
		$to_admin = $this->to_admin_customer_rep_emails();
		if ( ! $to_admin ) {
			error_log( 'No admin customer rep emails found' );
			return;
		}

		// Construct the subject for the admin email
		$admin_subject = 'NOVA INTERNAL - Quote Request From: ' . $first_name . ' from ' . $company . ' ' . $business_id . ' - #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		// Construct the message for the admin email
		$to_admin_message  = '<p>Hello,</p>';
		$to_admin_message .= '<p>Client sent a quotation request:</p>';
		$to_admin_message .= '<ul>';
		$to_admin_message .= '<li><strong>Customer:</strong> ' . $first_name . ' - ' . $business_id . '</li>';
		$to_admin_message .= '<li><strong>Company:</strong> ' . $company . '</li>';
		$to_admin_message .= '<li><strong>Quote ID:</strong> #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';
		$to_admin_message .= '</ul><br>';
		$to_admin_message .= '<p>You may review the quotation you sent here:<br>';
		$to_admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a></p>';

		// Get the instance of the Roles class and send the email
		$role_instance = \NOVA_B2B\Roles::get_instance();
		if ( $role_instance ) {
			$role_instance->send_email( $to_admin, $admin_subject, $to_admin_message, $headers, array() );
		} else {
			error_log( 'NOVA_B2B\Roles::get_instance() returned null' );
		}
	}

	public function for_mockup_update_email( $post_id ) {

		$user_id      = get_field( 'partner', $post_id );
		$user_info    = get_userdata( $user_id );
		$project_name = get_field( 'frontend_title', $post_id );
		$business_id  = get_field( 'business_id', 'user_' . $user_id );

		$billing_country = get_user_meta( $user_id, 'billing_country', true );
		$currency        = ( $billing_country === 'CA' ) ? 'CAD' : 'USD';

		$filename      = $business_id . '-INV-Q-' . $post_id . '-' . $currency . '.pdf';
		$company       = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );
		$file_link     = content_url( '/customer_invoices/' . $filename );
		$file_path     = WP_CONTENT_DIR . '/customer_invoices/' . $filename;

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject = 'Revised Quote: (' . $project_name . ') - #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		$message  = '<p>Dear ' . $first_name . ',</p>';
		$message .= '<p>Your request has been revised and quoted. Please review the quotation for:</p>';

		$message .= '<ul>';
		$message .= '<li><strong>Project:</strong> ' . $project_name . '</li>';
		$message .= '<li><strong>Quote ID:</strong> Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';
		$message .= '</ul><br><br>';

		$message .= '<p>Kindly click the link to the website and proceed to checkout if everything looks good.<br>';
		$message .= '<a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';

		if ( file_exists( $file_path ) ) {
			$message .= '<p>Access the PDF copy of your quote here:<br><a href="' . esc_url( $file_link ) . '">' . esc_url( $file_link ) . '</a></p>';
		}

		$message .= '<p>Please check the NOTES section if there are any remarks.</p>';

		$message .= '<p>Let us know if you have any questions or concerns.</p>';

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		$role_instance = \NOVA_B2B\Roles::get_instance();

		if ( $role_instance ) {
			$sent = $role_instance->send_email( $to, $subject, $message, $headers, array() );
		}

		if ( $sent ) {
			add_action(
				'admin_notices',
				function () use ( $to ) {
						echo '<div class="notice notice-success is-dismissible"><p>Email successfully sent to ' . esc_html( $to ) . '.</p></div>';
				}
			);
		}
	}

	public function for_mockup_draft_email( $post_id ) {

		$user_id         = get_field( 'partner', $post_id );
		$user_info       = get_userdata( $user_id );
		$project_name    = get_field( 'frontend_title', $post_id );
		$business_id     = get_field( 'business_id', 'user_' . $user_id );
		$billing_country = get_user_meta( $user_id, 'billing_country', true );
		$currency        = ( $billing_country === 'CA' ) ? 'CAD' : 'USD';
		$filename        = $business_id . '-INV-Q-' . $post_id . '-' . $currency . '.pdf';
		$company         = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$edit_post_url   = admin_url( 'post.php?post=' . $post_id . '&action=edit' );
		$file_link       = content_url( '/customer_invoices/' . $filename );
		$file_path       = WP_CONTENT_DIR . '/customer_invoices/' . $filename;

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject = 'Revised Draft: (' . $project_name . ') - #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		$message  = '<p>Dear ' . $first_name . ',</p>';
		$message .= '<p>Your custom sign draft has been updated by our team.</p>';

		$message .= '<ul>';
		$message .= '<li><strong>Project:</strong> ' . $project_name . '</li>';
		$message .= '<li><strong>Quote ID:</strong> Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';
		$message .= '</ul>';

		$message .= '<p>You can use this link to finalize your project and submit it for a quote:</p>';

		$message .= '<p><a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';

		$message .= '<p>You may now add this project to your cart.</p>';

		$message .= '<p>Let us know if you need any adjustments.</p>';

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		$role_instance = \NOVA_B2B\Roles::get_instance();

		if ( $role_instance ) {
			$sent = $role_instance->send_email( $to, $subject, $message, $headers, array() );

			if ( $sent ) {
				add_action(
					'admin_notices',
					function () use ( $to ) {
							echo '<div class="notice notice-success is-dismissible"><p>Email successfully sent to ' . esc_html( $to ) . '.</p></div>';
					}
				);
			}
		}
	}

	public function process_send_mockup_email() {

		if ( isset( $_POST['send_mockup_update_email'], $_POST['post_id'] ) && check_admin_referer( 'send_mockup_email_action', 'send_mockup_email_nonce' ) ) {
			$post_id = intval( $_POST['post_id'] );

			if ( $post_id ) {
				$this->for_mockup_update_email( $post_id );
			}
		}

		if ( isset( $_POST['send_mockup_draft_email'], $_POST['post_id'] ) && check_admin_referer( 'send_mockup_email_action', 'send_mockup_email_nonce' ) ) {
			$post_id = intval( $_POST['post_id'] );

			if ( $post_id ) {
				$this->for_mockup_draft_email( $post_id );
			}
		}
	}

	public function for_payment_email( $post_id ) {

		$user_id      = get_field( 'partner', $post_id );
		$user_info    = get_userdata( $user_id );
		$project_name = get_field( 'frontend_title', $post_id );
		$business_id  = get_field( 'business_id', 'user_' . $user_id );

		$billing_country = get_user_meta( $user_id, 'billing_country', true );
		$currency        = ( $billing_country === 'CA' ) ? 'CAD' : 'USD';

		$filename      = $business_id . '-INV-Q-' . $post_id . '-' . $currency . '.pdf';
		$company       = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );
		$file_link     = content_url( '/customer_invoices/' . $filename );
		$file_path     = WP_CONTENT_DIR . '/customer_invoices/' . $filename;

		$to         = $user_info->user_email;
		$first_name = $user_info->first_name;

		$subject = 'Quote Status Updated: (' . $project_name . ') - #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		$message  = '<p>Hello ' . $first_name . ',</p>';
		$message .= '<p>Your request has been quoted. Please review the quotation for:</p>';

		$message .= '<ul>';
		$message .= '<li><strong>Project:</strong> ' . $project_name . '</li>';
		$message .= '<li><strong>Quote ID:</strong> Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';
		$message .= '</ul><br><br>';

		$message .= '<p>Kindly click the link to the website and proceed to checkout if everything looks good.<br>';
		$message .= '<a href="' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '">' . home_url() . '/my-account/mockups/view/?qid=' . $post_id . '</a></p>';

		if ( file_exists( $file_path ) ) {
			$message .= '<p>Access the PDF copy of your quote here:<br><a href="' . esc_url( $file_link ) . '">' . esc_url( $file_link ) . '</a></p>';
		}

		$message .= '<p>Let us know if you have any questions or concerns.</p>';

		$message .= '<p>Thank you,<br>';
		$message .= 'NOVA Signage Team</p>';

		$role_instance = \NOVA_B2B\Roles::get_instance();

		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		if ( $role_instance ) {
			$role_instance->send_email( $to, $subject, $message, $headers, array() );
		}
	}
}
