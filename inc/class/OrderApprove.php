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
	}

	public function update_email_mockup() {
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'order_approve_nonce' ) ) {
			wp_send_json_error( 'Security check failed.' );
			wp_die();
		}

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;
		$order    = wc_get_order( $order_id );
		if ( ! $order ) {
			wp_send_json_error( 'Order not found.' );
			wp_die();
		}

		// Get customer email and name.
		$customer_email = $order->get_billing_email();
		// Get user email not billing email.
		$user_email = get_user_by( 'id', $order->get_user_id() )->user_email;
		if ( $user_email ) {
			$customer_email = $user_email;
		}
		$customer_name = $order->get_billing_first_name();

		$headers     = array( 'Content-Type: text/html; charset=UTF-8' );
		$attachments = array();

		if ( class_exists( '\WPO\WC\PDF_Invoices\Main' ) ) {
			$attachments = \WPO\WC\PDF_Invoices\Main::instance()->attach_document_to_email( array(), 'customer_invoice', $order, null );
		}

		$role_instance = \NOVA_B2B\Roles::get_instance();

		if ( $role_instance ) {
			$subject  = 'Your Revised Mockup (Order ' . $order->get_order_number() . ') is Ready for Review';
			$heading  = 'Order #' . $order->get_order_number() . ' is Ready for Review';
			$message  = '<p>Dear ' . $customer_name . ',</p>' . "\n\n";
			$message .= "<p>We've completed the requested revisions to your mockup and it's now ready for your review</p>" . "\n\n";
			$message .= '<p>Next steps:</p>';
			$message .= '<ol>';
			$message .= '<li>Please review the updated mockup: <a href"' . home_url() . '/review-mockup?order_id=' . $order_id . '">' . home_url() . '/review-mockup?order_id=' . $order_id . '</a></li>';
			$message .= "<li>Select 'Approve' if all details are correct, or add a comment for additional feedback.</li>";
			$message .= "<li>Once approved, we'll move directly to production.</li>";
			$message .= '</ol>';
			$message .= '<p>We look forward to your feedback.</p>' . "\n\n";
			$message .= '<p>Best regards,' . "\n\n";
			$message .= 'Nova Signage</p>' . "\n\n";

			$role_instance->send_email( $customer_email, $subject, $message, $headers, $attachments, $heading );

			wp_send_json_success( 'Email sent successfully.' );
			wp_die();
		}
	}


	public function admin_enqueu_scripts( $hook ) {
		/** only order edit page */
		$screen = get_current_screen();
		wp_register_script( 'order-approve-admin', get_stylesheet_directory_uri() . '/assets/js/admin-order-approve.js', array(), wp_get_theme()->get( 'Version' ), false, false );

		wp_localize_script(
			'order-approve-admin',
			'OrderApprove',
			array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
				'order_id'   => get_the_ID(),
				'review_url' => home_url() . '/review-mockup?order_id=' . get_the_ID(),
				'nonce'      => wp_create_nonce( 'order_approve_nonce' ),
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

		wp_register_script( 'order-approve', get_stylesheet_directory_uri() . '/assets/js/order-approve.js', array(), wp_get_theme()->get( 'Version' ), false, false );

		wp_localize_script(
			'order-approve',
			'order_approve_ajax',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'order_approve_nonce' ),
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

		$order_id       = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;
		$approve        = isset( $_POST['approve'] ) ? sanitize_text_field( $_POST['approve'] ) : '';
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
		$current_user = wp_get_current_user();
		if ( $order->get_user_id() != get_current_user_id() ) {
			wp_send_json_error( 'You are not authorized to access this order.' );
			wp_die();
		}

		// Prepare email content
		$to = 'quotes@novasignage.com';

		if ( $approve === 'approve' ) {
			$subject = '[NOVA INTERNAL] Approved Mockup for Order #' . $order_id;
			$message = '<p>The customer has approved the designs for Order #' . $order_id . '.</p>';
			// Get order edit link
			$message .= '<p>View the order here: ' . get_edit_post_link( $order_id ) . '</p>';
			// Optionally add order note
			$order->add_order_note( 'Customer approved the designs.' );
			update_field( 'order_approved', true, $order_id );
			update_field( 'order_approved_date', date( 'F d, Y' ), $order_id );
		} elseif ( $approve === 'revision' ) {
			if ( empty( $revision_notes ) ) {
				wp_send_json_error( 'Please provide revision notes.' );
				wp_die();
			}
			$subject  = '[NOVA INTERNAL] Mockup Review for Order #' . $order_id;
			$message  = '<p>The customer has requested revisions for Order #' . $order_id . '.</p>' . "\n\n";
			$message .= '<p>View the order here: ' . get_edit_post_link( $order_id ) . '</p>';
			$message .= '<p>Revision Notes:</p>' . "\n" . nl2br( esc_html( $revision_notes ) );
			// Optionally add order note
			$order->add_order_note( 'Customer requested revisions: ' . $revision_notes );
		} else {
			wp_send_json_error( 'Invalid selection.' );
			wp_die();
		}

		// Get customer email and name
		$customer_email = $order->get_billing_email();
		$customer_name  = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();

		// Set email headers with customer's email as the 'From' address
		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			'From: Nova Signage <quotes@novasignage.com>',
		);

		// Send the email
		$mail_sent = wp_mail( $to, $subject, $message, $headers );

		if ( $mail_sent ) {
			wp_send_json(
				array(
					'success' => true,
					'action'  => $approve,
					'message' => 'Email sent successfully.',
				)
			);
		} else {
			wp_send_json_error( 'Failed to send email.' );
		}

		wp_die();
	}
}
