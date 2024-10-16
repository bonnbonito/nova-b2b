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
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'pending_payment_processing_email_old' ), 40, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'pending_payment_processing_email' ), 40, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'complete_payment_processing_email' ), 41, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'fully_paid_payment_processing_email' ), 42, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'ups_tracking' ), 50, 5 );
		add_filter( 'woocommerce_email_additional_content_customer_processing_order', array( $this, 'pending_payment_additional_content_old' ), 40, 3 );
		add_filter( 'woocommerce_email_additional_content_customer_processing_order', array( $this, 'pending_payment_additional_content' ), 40, 3 );
		add_filter( 'woocommerce_email_additional_content_customer_completed_order', array( $this, 'complete_payment_additional_content' ), 41, 3 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'complete_payment_heading' ), 41, 3 );
		add_filter( 'woocommerce_email_additional_content_customer_completed_order', array( $this, 'fully_paid_payment_additional_content' ), 42, 3 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'fully_paid_payment_heading' ), 42, 3 );
		add_filter( 'woocommerce_email_subject_customer_processing_order', array( $this, 'pending_payment_subject' ), 40, 2 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'completed_payment_subject' ), 41, 2 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'fully_paid_payment_subject' ), 42, 2 );
		add_filter( 'woocommerce_email_recipient_new_order', array( $this, 'filter_woocommerce_email_recipient_new_order' ), 10, 2 );
		// add_filter( 'woocommerce_email_attachments', array( $this, 'insert_invoice' ), 10, 4 );
		// Remove "On Hold" email notification
		// add_filter( 'woocommerce_email_enabled_customer_on_hold_order', '__return_false' );
		// add_filter( 'woocommerce_email_enabled_new_order', array( $this, 'disable_admin_new_order_email_on_hold' ), 10, 3 );
		add_action( 'quote_to_processing', array( $this, 'for_quotation_email' ) );
		add_action( 'quote_to_payment', array( $this, 'for_payment_email' ), 90 );
		add_action( 'quote_to_payment', array( $this, 'for_payment_admin_email' ), 91, 2 );
		add_action( 'admin_init', array( $this, 'process_send_mockup_email' ) );
		// add_action( 'wpo_wcpdf_after_item_meta', array( $this, 'display_signage_details' ), 20, 3 );
		add_filter( 'wpo_wcpdf_order_items_data', array( $this, 'add_signage_to_invoice' ), 10, 3 );
		add_action( 'dp_duplicate_post', array( $this, 'duplicate_post' ), 10, 2 );
		// add_filter( 'woocommerce_order_get_billing_email', array( $this, 'custom_billing_email' ), 20, 2 );
		add_filter( 'woocommerce_email_recipient_customer_completed_order', array( $this, 'custom_billing_email' ), 11, 2 );
		add_filter( 'woocommerce_email_recipient_customer_processing_order', array( $this, 'custom_billing_email' ), 11, 2 );
		add_filter( 'woocommerce_email_recipient_customer_on_hold_order', array( $this, 'custom_billing_email' ), 11, 2 );
		add_filter( 'woocommerce_email_recipient_customer_refunded_order', array( $this, 'custom_billing_email' ), 11, 2 );
	}

	public function custom_billing_email( $recipient, $order ) {

		if ( ! is_a( $order, 'WC_Order' ) ) {
			return $recipient;
		}

		// Get customer ID and check if there is an additional email.
		$customer_id = $order->get_customer_id();
		if ( $customer_id ) {
			$additional_email = get_user_meta( $customer_id, 'additional_order_email', true );

			// If 'additional_order_email' exists and is a valid email, set it as the recipient.
			if ( ! empty( $additional_email ) && is_email( $additional_email ) ) {
				return $additional_email; // Replaces the original recipient.
			}
		}

		return $recipient; // If no additional email, keep the original recipient.
	}

	public function duplicate_post( $new_post_id, $post ) {
		update_post_meta( $new_post_id, '_is_copy', $post->ID );
	}

	public function disable_admin_new_order_email_on_hold( $enabled, $order, $email ) {
		if ( is_a( $order, 'WC_Order' ) && $order->has_status( 'on-hold' ) && $email->id === 'new_order' ) {
			return false;
		}
		return $enabled;
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

	public function pending_payment_additional_content_old( $additional_content, $order, $email ) {
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

	public function pending_payment_additional_content( $additional_content, $order, $email ) {
		$order_id = $order->get_id();

		$deposit_chosen = get_post_meta( $order_id, '_deposit_chosen', true );
		$needs_payment  = get_post_meta( $order_id, 'needs_payment', true );

		if ( ! $deposit_chosen && ! $needs_payment ) {
			return $additional_content;
		}

		$processing_email   = get_field( 'processing_email', $deposit_chosen );
		$additional_content = $processing_email['additional_content'] ? $processing_email['additional_content'] : $additional_content;
		$additional_content = str_replace( '{payment_link}', $order->get_checkout_payment_url(), $additional_content );

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

	public function pending_payment_processing_email_old( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
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

	public function pending_payment_processing_email( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$order_id = $order->get_id();
		$key      = $email->id;

		$deposit_chosen = get_post_meta( $order_id, '_deposit_chosen', true );
		$needs_payment  = get_post_meta( $order_id, 'needs_payment', true );

		if ( $needs_payment && $deposit_chosen && $key === 'customer_processing_order' ) {

			$processing_email = get_field( 'processing_email', $deposit_chosen );

			$body_text = $processing_email['body_text'];

			$pending_amount = get_post_meta( $order_id, '_pending_amount', true );

			$body_text = str_replace( '{order_date}', wc_format_datetime( $order->get_date_created() ), $body_text );
			$body_text = str_replace( '{pending_payment}', $pending_amount, $body_text );
			$body_text = str_replace( '{order_number}', $order->get_order_number(), $body_text );
			$body_text = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_name}', $order->get_billing_first_name(), $body_text );
			$body_text = str_replace( '{customer_last_name}', $order->get_billing_last_name(), $body_text );
			$body_text = str_replace( '{customer_full_name}', $order->get_formatted_billing_full_name(), $body_text );
			$body_text = str_replace( '{customer_company}', $order->get_billing_company(), $body_text );
			$body_text = str_replace( '{customer_email}', $order->get_billing_email(), $body_text );
			$body_text = str_replace( '{payment_link}', $order->get_checkout_payment_url(), $body_text );
		}
		return $body_text;
	}

	public function complete_payment_processing_email( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$order_id = $order->get_id();
		$key      = $email->id;

		if ( ! $this->is_deposit_order( $order_id ) ) {
			return $body_text;
		}

		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( ! $payment_select ) {
			return $body_text;
		}

		if ( $key !== 'customer_completed_order' ) {
			return $body_text;
		}

		$original_order_id = $order->get_meta( '_from_order_id' );

		if ( ! $original_order_id ) {
			return $body_text;
		}

		$original_order = wc_get_order( $original_order_id );

		$pending = \NOVA_B2B\Pending_Payment::get_instance();

		$payment        = $pending->get_payment_date( $order_id );
		$payment_select = $payment->payment_select;

		$completed_date_obj = $original_order->get_date_completed();

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

		return $body_text;
	}

	public function ups_tracking( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$order_id = $order->get_id();
		$key      = $email->id;
		if ( 'customer_completed_order' !== $key ) {
			return $body_text;
		}
		$tracking_number  = get_post_meta( $order_id, '_tracking_number', true );
		$shipping_carrier = get_post_meta( $order_id, '_shipping_carrier', true );

		if ( 'UPS' === $shipping_carrier && $tracking_number ) {
			$body_text .= '<p><strong>' . __( 'Tracking Number:', 'nova-b2b' ) . ' ' . $tracking_number . '</strong><br>';
			$body_text .= '<a href="https://www.ups.com/track?track=yes&trackNums=' . $tracking_number . '" target="_blank">' . __( 'Track Shipment', 'nova-b2b' ) . '</a></p>';
		}

		return $body_text;
	}

	public function fully_paid_payment_processing_email( $body_text, $order, $sent_to_admin, $plain_text, $email ) {

		$order_id = $order->get_id();
		$key      = $email->id;

		if ( 'customer_completed_order' !== $key ) {
			return $body_text;
		}

		$payment_select = get_post_meta( $order_id, '_payment_select', true );

		if ( $this->is_payment_order( $order_id ) && $payment_select && $key === 'customer_completed_order' ) {

			$original_order_id   = $order->get_meta( '_from_order_id' );
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

		$pending = \NOVA_B2B\Pending_Payment::get_instance();
		if ( $pending ) {
			ob_start();
			add_filter( 'woocommerce_get_order_item_totals', array( $pending, 'insert_payment_date' ), 30, 3 );
			do_action( 'woocommerce_email_order_details', $order, false, false, '' );
			remove_filter( 'woocommerce_get_order_item_totals', array( $pending, 'insert_payment_date' ), 30, 3 );
			$order_details = ob_get_clean();
		}

		$content = str_replace( '{order_details}', $order_details, $content );
		$content = str_replace( '{payment_link}', $payment_order->get_checkout_payment_url(), $content );

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

	public function for_payment_admin_email( $post_id, $author_id ) {

		$user_id   = get_field( 'partner', $post_id );
		$user_info = get_userdata( $user_id );

		// Retrieve admin customer rep emails
		$to_admin = $this->to_admin_customer_rep_emails();
		if ( ! $to_admin ) {
			return;
		}

		/** if $user_id has a role of 'customer-rep' or 'admin', then return */
		if ( in_array( 'customer-rep', (array) $user_info->roles ) || in_array( 'administrator', (array) $user_info->roles ) ) {
			$to_admin = array( 'bonn.j@hineon.com', 'kristelle.m@hineon.com' );
		}

		$business_id   = get_field( 'business_id', 'user_' . $user_id );
		$company       = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$first_name = $user_info->first_name;

		$headers   = array();
		$headers[] = 'Content-Type: text/html; charset=UTF-8';
		$headers[] = 'From: NOVA Signage <quotes@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <quotes@novasignage.com>';

		$admin_subject = 'NOVA INTERNAL - Quote Sent To: ' . $first_name . ' from ' . $company . ' ' . $business_id . ' - Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );

		$admin_message = '<p>Hello,</p>';

		$updated_by = get_user_by( 'id', $author_id );

		if ( $updated_by ) {
			$admin_message .= '<p>This quotation was approved by:<br>';
			$admin_message .= '<strong>' . $updated_by->display_name . ' - ' . $updated_by->user_email . '</strong></p>';
		}

		$admin_message .= '<p>You sent a quotation to:</p>';
		$admin_message .= '<ul>';
		$admin_message .= '<li><strong>Customer:</strong> ' . $first_name . ' - ' . $business_id . '</li>';
		$admin_message .= '<li><strong>Company:</strong> ' . $company . '</li>';
		$admin_message .= '<li><strong>Quote ID:</strong> #Q-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT ) . '</li>';

		$admin_message .= '<p>You may review the quotation you sent here:</p>';
		$admin_message .= '<a href="' . $edit_post_url . '">' . $edit_post_url . '</a>';

		$role_instance = \NOVA_B2B\Roles::get_instance();

		if ( $role_instance ) {
			$role_instance->send_email( $to_admin, $admin_subject, $admin_message, $headers, array() );

			/** to joshua */
			$to_zendesk        = array( 'joshua@hineon.com' );
			$to_user           = $user_info->user_email;
			$headers_zendesk   = array();
			$headers_zendesk[] = 'Content-Type: text/html; charset=UTF-8';
			$headers_zendesk[] = 'From: ' . $first_name . ' <' . $to_user . '>';
			$headers_zendesk[] = 'Reply-To: ' . $first_name . ' <' . $to_user . '>';

			$role_instance->send_email( $to_zendesk, $admin_subject, $admin_message, $headers_zendesk, array() );

		}
	}

	public function for_quotation_email( $post_id ) {

		if ( get_post_meta( $post_id, '_is_copy', true ) ) {
			return;
		}

		$post = get_post( $post_id );

		$author = get_user_by( 'id', $post->post_author );

		/** if author has a role of 'customer-rep' or 'admin', then return */
		// if ( in_array( 'customer-rep', (array) $author->roles ) || in_array( 'administrator', (array) $author->roles ) ) {
		// return;
		// }

		// Retrieve the partner user ID from the post's custom field
		$user_id = get_field( 'partner', $post_id );
		if ( ! $user_id ) {
			return;
		}

		// Retrieve user information
		$user_info = get_userdata( $user_id );
		if ( ! $user_info ) {
			return;
		}

		// Retrieve admin customer rep emails
		$to_admin = $this->to_admin_customer_rep_emails();
		if ( ! $to_admin ) {
			return;
		}

		$from_admin = false;

		/** if $user_id has a role of 'customer-rep' or 'admin', then return */
		if ( in_array( 'customer-rep', (array) $user_info->roles ) || in_array( 'administrator', (array) $user_info->roles ) ) {
			$to_admin   = array( 'bonn.j@hineon.com', 'kristelle.m@hineon.com' );
			$from_admin = true;
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

		$headers_admin   = array();
		$headers_admin[] = 'Content-Type: text/html; charset=UTF-8';
		$headers_admin[] = 'From: NOVA Signage <noreply@novasignage.com>';
		$headers_admin[] = 'Reply-To: NOVA Signage <noreply@novasignage.com>';

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
			if ( ! $from_admin ) {
				$role_instance->send_email( 'joshua@hineon.com', $josh_subject, $to_admin_message, $headers, array() );
				$role_instance->send_email( 'quotes@novasignage.com', $admin_subject, $to_admin_message, $headers_admin, array() );
			}
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
			return;
		}

		// Retrieve user information
		$user_info = get_userdata( $user_id );
		if ( ! $user_info ) {
			return;
		}

		// Retrieve admin customer rep emails
		$to_admin = $this->to_admin_customer_rep_emails();
		if ( ! $to_admin ) {
			return;
		}

		$from_admin = false;

		/** if $user_id has a role of 'customer-rep' or 'admin' */
		if ( in_array( 'customer-rep', (array) $user_info->roles ) || in_array( 'administrator', (array) $user_info->roles ) ) {
			$to_admin   = array( 'bonn.j@hineon.com', 'kristelle.m@hineon.com' );
			$from_admin = true;
		}

		/** remove joshua@hineon.com to $to_admin array */
		$to_admin = array_diff( $to_admin, array( 'joshua@hineon.com' ) );

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
		$headers[] = 'From: NOVA Signage <noreply@novasignage.com>';
		$headers[] = 'Reply-To: NOVA Signage <noreply@novasignage.com>';

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
			if ( ! $from_admin ) {
				$role_instance->send_email( 'joshua@hineon.com', $josh_subject, $to_admin_message, $headers, array() );
				$role_instance->send_email( 'quotes@novasignage.com', $josh_subject, $to_admin_message, $headers, array() );
			}
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

		$file_link = home_url() . '/customer_invoice/qid/' . $post_id . '/';

		$message .= '<p>Access the PDF copy of your quote here:<br><a href="' . esc_url( $file_link ) . '">' . esc_url( $file_link ) . '</a></p>';

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

		$user_id   = get_field( 'partner', $post_id );
		$user_info = get_userdata( $user_id );

		/** if user has a role of 'customer-rep' or 'admin' except for kristelle.m@hineon.com, then return */
		if ( $user_id != 23 && ( in_array( 'customer-rep', (array) $user_info->roles ) || in_array( 'administrator', (array) $user_info->roles ) ) ) {
			return;
		}

		$project_name = get_field( 'frontend_title', $post_id );
		$business_id  = get_field( 'business_id', 'user_' . $user_id );

		$billing_country = get_user_meta( $user_id, 'billing_country', true );
		$currency        = ( $billing_country === 'CA' ) ? 'CAD' : 'USD';

		$filename      = $business_id . '-INV-Q-' . $post_id . '-' . $currency . '.pdf';
		$company       = get_field( 'business_name', 'user_' . $user_id ) ? get_field( 'business_name', 'user_' . $user_id ) : 'None';
		$edit_post_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

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

		$file_link = home_url() . '/customer_invoice/qid/' . $post_id . '/';

		$message .= '<p>Access the PDF copy of your quote here:<br><a href="' . esc_url( $file_link ) . '">' . esc_url( $file_link ) . '</a></p>';

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


	public function display_signage_details( $type, $item, $order ) {

		$product      = $item['quote_id'];
		$product_line = $item['product_line'];

		$instance = \NOVA_B2B\Nova_Quote::get_instance();
		if ( ! $instance ) {
			return;
		}
		$attributes = $instance->allAttributes();

		$html  = '<p style="font-size: 100%; margin-top: 0;margin-bottom: 0;">Quote ID: Q-' . str_pad( $product, 4, '0', STR_PAD_LEFT ) . '</p>';
		$html .= '<p style="font-size: 100%; margin-top: 0; margin-bottom: 0;">Product: ' . $product_line . '</p>';

		foreach ( $item['signage'] as $object ) {

			$html .= '<div style="display: block;">';

			$html .= '<table style="padding: 2px; border-collapse: collapse;font-size: 80%; margin-bottom: 10px;">
    <tbody>';

			foreach ( $attributes as $key => $attr ) {

				if ( isset( $object->$key ) && ! empty( $object->$key ) ) {

					if ( is_array( $attr ) ) {
						if ( $attr['isLink'] ?? false && isset( $object->fontFileUrl, $object->fontFileName ) && ! empty( $object->fontFileUrl ) && ! empty( $object->fontFileName ) ) {
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 5px;">' . $attr['label'] . ':</td><td style="border: 1px solid #dddddd; padding: 4px;"><a href="' . htmlspecialchars( $object->fontFileUrl ) . '" target="_blank">' . htmlspecialchars( $object->fontFileName ) . '</a></td></tr>';
						} elseif ( $attr['isVinyl'] ?? false && isset( $object->vinylWhite->code ) && ! empty( $object->vinylWhite->name ) && ! empty( $object->vinylWhite->code ) ) {
							if ( ( isset( $object->acrylicFront ) && $object->acrylicFront === '3M Vinyl' ) || ( isset( $object->frontOption ) && $object->frontOption === '3M Vinyl' ) || ( isset( $object->frontAcrylicCover ) && $object->frontAcrylicCover === '3M Vinyl' ) ) {
								$html .= '<tr><td style="border: 1px solid #dddddd; padding: 5px;">' . $attr['label'] . ':</td><td style="border: 1px solid #dddddd; padding: 5px;">' . htmlspecialchars( $object->vinylWhite->name ) . ' - [' . htmlspecialchars( $object->vinylWhite->code ) . ']</td></tr>';
							}
						} elseif ( $attr['isFile'] ?? false && isset( $object->fileUrl, $object->fileName ) && ! empty( $object->fileUrl ) && ! empty( $object->fileName ) ) {
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 5px;">' . $attr['label'] . ':</td><td style="border: 1px solid #dddddd; padding: 4px;"><a href="' . htmlspecialchars( $object->fileUrl ) . '" target="_blank">' . htmlspecialchars( $object->fileName ) . '</a></td></tr>';
						} elseif ( $attr['isFiles'] ?? false && isset( $object->fileUrls, $object->fileNames ) && ! empty( $object->fileUrls ) && ! empty( $object->fileNames ) ) {
							$filesHtml = '';
							foreach ( $object->fileUrls as $index => $fileUrl ) {
								$fileName   = $object->fileNames[ $index ] ?? $fileUrl;
								$filesHtml .= '<a href="' . htmlspecialchars( $fileUrl, ENT_QUOTES, 'UTF-8' ) . '" target="_blank">' . htmlspecialchars( $fileName, ENT_QUOTES, 'UTF-8' ) . '</a><br>';
							}
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 5px;">' . $attr['label'] . ':</td><td style="border: 1px solid #dddddd; padding: 5px;">' . $filesHtml . '</td></tr>';
						}
					} else {
						$value = $object->$key;
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
							$html .= '<tr><td style="border: 1px solid #dddddd; padding: 5px;">' . $attr . ':</td><td style="border: 1px solid #dddddd; padding: 5px;">' . htmlspecialchars( $value ) . ( $key === 'letterHeight' ? '"' : '' ) . '</td></tr>';
						}
					}
				}
			}

			$html .= '</tbody></table>';

			$html .= '</div>';

		}

		echo $html;
	}

	public function add_signage_to_invoice( $data_list, $order, $type ) {

		$items = $order->get_items();

		foreach ( $items as $item_id => $item ) {
			$signage                               = $item->get_meta( 'signage' );
			$quote_id                              = $item->get_meta( 'quote_id' );
			$product_line                          = get_the_title( $item->get_meta( 'product_line' ) );
			$name                                  = get_field( 'frontend_title', $item->get_meta( 'quote_id' ) ) ? ucwords( get_field( 'frontend_title', $item->get_meta( 'quote_id' ) ) ) : $data_list[ $item_id ]['name'];
			$data_list[ $item_id ]['signage']      = $signage;
			$data_list[ $item_id ]['quote_id']     = $quote_id;
			$data_list[ $item_id ]['name']         = $name;
			$data_list[ $item_id ]['product_line'] = $product_line;
		}

		return $data_list;
	}
}
