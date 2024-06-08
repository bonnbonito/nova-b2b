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
		add_filter( 'woocommerce_email_additional_content_customer_completed_order', array( $this, 'fully_paid_payment_additional_content' ), 42, 3 );
		add_filter( 'woocommerce_email_subject_customer_processing_order', array( $this, 'pending_payment_subject' ), 40, 2 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'completed_payment_subject' ), 41, 2 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'fully_paid_payment_subject' ), 42, 2 );
		add_filter( 'woocommerce_email_recipient_new_order', array( $this, 'filter_woocommerce_email_recipient_new_order' ), 10, 2 );
		// add_filter( 'woocommerce_email_attachments', array( $this, 'insert_invoice' ), 10, 4 );
		add_filter( 'woocommerce_email_attachments', array( $this, 'insert_invoice' ), 10, 4 );
	}

	public function insert_invoice( $attachments, $email_id, $order, $email ) {

		if ( $order->get_meta( '_adjusted_duplicate_order_id' ) || $order->get_meta( '_from_order_id' ) ) {

			// Check if the email ID matches the ones you want to add the attachment to
			if ( in_array( $email_id, array( 'customer_processing_order', 'customer_completed_order' ) ) ) {
				// Add the custom attachment

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

			$payment = $pending->get_payment_date( $order_id );

			$payment_date = date( 'F d, Y', strtotime( $payment->payment_date ) );

			$payment_select = get_post_meta( $order_id, '_payment_select', true );

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

			$payment_date = date( 'F d, Y', strtotime( $payment->payment_date ) );

			$payment_select = get_post_meta( $order_id, '_payment_select', true );

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

		$content  = '<p>Hi, {customer_name}!</p>';
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
}
