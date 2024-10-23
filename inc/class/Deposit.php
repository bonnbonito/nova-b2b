<?php

namespace NOVA_B2B;

class Deposit {

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
		// Hook to initialize payment functionality
		add_action( 'init', array( $this, 'create_payment_table' ) );
		// add_action( 'woocommerce_before_thankyou', array( $this, 'insert_payment_record' ) );
		add_action( 'woocommerce_before_thankyou', array( $this, 'insert_nova_meta' ), 10, 1 );
		add_action( 'woocommerce_thankyou', array( $this, 'thank_you_actions' ), 10, 1 );
		add_action( 'woocommerce_order_after_calculate_totals', array( $this, 'adjust_order_total_based_on_payments' ), 9999, 2 );
		add_action( 'woocommerce_admin_order_totals_after_total', array( $this, 'display_payments_in_admin' ) );
		add_action( 'woocommerce_checkout_update_order_review', array( $this, 'handle_deposit_option' ) );
		add_filter( 'woocommerce_calculated_total', array( $this, 'apply_deposit_percentage' ), 9999, 2 );
		add_action( 'woocommerce_checkout_order_processed', array( $this, 'insert_payment_record' ), 20, 3 );
		// add_action( 'woocommerce_after_pay_action', array( $this, 'second_payment_meta' ), 20, 1 );
		add_filter( 'woocommerce_payment_successful_result', array( $this, 'second_payment_meta' ), 20, 2 );
		add_filter( 'woocommerce_order_needs_payment', array( $this, 'order_needs_payment' ), 10, 2 );
		add_filter( 'woocommerce_order_get_date_paid', array( $this, 'order_get_date_paid' ), 10, 2 );
		add_filter( 'wc_order_is_editable', array( $this, 'order_is_editable' ), 10, 2 );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'deposit_insert_order_total_row' ), 90, 2 );
		add_filter( 'woocommerce_order_is_paid', array( $this, 'order_is_paid' ), 10, 2 );
		add_action( 'nova_pending_payments_after_content', array( $this, 'pending_page_after_content' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_nova_scripts' ) );
		add_action( 'woocommerce_order_status_completed', array( $this, 'order_status_completed' ), 99 );
		// add_action( 'woocommerce_order_status_delivered', array( $this, 'insert_delivered_date' ) );
		add_action( 'woocommerce_order_status_shipped', array( $this, 'order_status_shipped' ), 20, 1 );
		add_action( 'woocommerce_before_cart', array( $this, 'remove_wc_sessions_on_cart' ) );
		add_action( 'woocommerce_review_order_before_payment', array( $this, 'output_deposit_selection' ) );
		add_filter( 'woocommerce_payment_complete_order_status', array( $this, 'change_payment_status' ), 10, 3 );
		// add_filter( 'woocommerce_bacs_process_payment_order_status', array( $this, 'change_onhold_status' ), 99, 2 );
		add_action( 'woocommerce_admin_order_totals_after_tax', array( $this, 'add_deposit_row' ) );
		add_filter( 'woocommerce_payment_successful_result', array( $this, 'successful_payment' ), 20, 2 );
		add_filter( 'woocommerce_cod_process_payment_order_status', array( $this, 'cod_status' ), 20, 2 );
		add_action( 'woocommerce_payment_complete', array( $this, 'update_original_orders_after_payment' ), 20, 1 );
		add_filter( 'woocommerce_email_heading_customer_completed_order', array( $this, 'second_payment_heading' ), 50, 3 );
		add_filter( 'woocommerce_email_subject_customer_completed_order', array( $this, 'second_payment_subject' ), 50, 2 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'fully_paid_content' ), 41, 5 );
		add_filter( 'kadence_woomail_order_body_text', array( $this, 'in_production_content' ), 40, 5 );
		add_action( 'wp_ajax_delete_pending_payment_order', array( $this, 'delete_pending_payment_order' ) );
		add_action( 'check_pending_payments_action_hook', array( $this, 'check_pending_payments' ) );
		add_action( 'wp', array( $this, 'schedule_pending_payment_checker' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_needs_payment_metabox' ) );
		add_action( 'save_post_shop_order', array( $this, 'save_needs_payment_metabox' ) );
	}

	public function save_needs_payment_metabox( $post_id ) {
		if ( ! isset( $_POST['needs_payment_metabox_nonce'] ) || ! wp_verify_nonce( $_POST['needs_payment_metabox_nonce'], 'save_needs_payment_metabox' ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$needs_payment = isset( $_POST['needs_payment_checkbox'] ) ? 1 : 0;

		update_post_meta( $post_id, 'needs_payment', $needs_payment );
	}

	public function needs_payment_metabox_callback( $post ) {

		wp_nonce_field( 'save_needs_payment_metabox', 'needs_payment_metabox_nonce' );

		$needs_payment = get_post_meta( $post->ID, 'needs_payment', true );

		echo '<label for="needs_payment_checkbox">';
		echo '<input type="checkbox" id="needs_payment_checkbox" name="needs_payment_checkbox" value="1" ' . checked( 1, $needs_payment, false ) . ' />';
		echo ' Needs Payment?';
		echo '</label>';
	}

	public function add_needs_payment_metabox() {
		global $post;

		$deposit_chosen = get_post_meta( $post->ID, '_deposit_chosen', true );

		if ( ! $deposit_chosen ) {
			// If it doesn't, don't display the metabox
			return;
		}

		add_meta_box(
			'needs_payment_metabox', // Unique ID
			__( 'Needs Payment', 'woocommerce' ), // Title
			array( $this, 'needs_payment_metabox_callback' ), // Callback
			'shop_order', // Post type
			'side', // Context
			'default' // Priority
		);
	}

	public function check_pending_payments() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		// Get all data from the table
		$results = $wpdb->get_results(
			$wpdb->prepare( "SELECT * FROM $table_name" )
		);

		foreach ( $results as $result ) {

			$order_id       = $result->order_id;
			$order          = wc_get_order( $order_id );
			$needs_payment  = $order->get_meta( 'needs_payment' );
			$deposit_chosen = $order->get_meta( '_deposit_chosen' );

			if ( ! $order ) {
				continue;
			}

			if ( $order->get_status() === 'completed' ) {
				continue;
			}

			if ( ! $needs_payment ) {
				continue;
			}

			if ( ! $deposit_chosen ) {
				continue;
			}

			// $this->send_payment_reminder_email( $order_id );

			// $this->check_overdue( $result );

		}
	}

	public function send_payment_reminder_email( $order_id ) {

		$order = wc_get_order( $order_id );

		$deposit_chosen = $order->get_meta( '_deposit_chosen' );

		$manual_delivered_date = get_field( 'manual_delivered_date', $order_id );

		if ( isset( $manual_delivered_date ) && ! empty( $manual_delivered_date ) ) {
			return;
		}

		$currency = $order->get_currency();

		$shipped_date        = false;
		$days_after_shipping = get_field( 'days_after_shipping', $deposit_chosen );
		$deadline            = strtotime( $shipped_date . ' +' . intval( $days_after_shipping ) . ' days' );
		$payment_date        = date( 'F d, Y', $deadline );

		$today = date( 'F d, Y' );

		$first_name               = $order->get_billing_first_name();
		$customer_email           = $order->get_billing_email();
		$user_id                  = $order->get_user_id() ? $order->get_user_id() : 0;
		$additional_billing_email = get_user_meta( $user_id, 'additional_billing_email', true );

		if ( $additional_billing_email ) {
			$customer_email = $additional_billing_email;
		}

		if ( ! $order ) {
			return;
		}
		if ( ! $customer_email ) {
			return;
		}

		$payment_url = $order->get_checkout_payment_url();

		$pending_total = $order->get_meta( '_pending_amount' );

		if ( have_rows( 'payment_emails', $deposit_chosen ) ) :

			while ( have_rows( 'payment_emails', $deposit_chosen ) ) :
				the_row();
				$days = get_sub_field( 'send_after_days' );

				if ( $days !== false ) {

					$days_later = strtotime( $shipped_date . ' +' . intval( $days ) . ' days' );
					$date_later = date( 'F d, Y', $days_later );

					if ( $today == $date_later ) {

						$subject = get_sub_field( 'subject' );
						$subject = str_replace( '{customer_name}', $first_name, $subject );
						$subject = str_replace( '{deadline}', $payment_date, $subject );
						$subject = str_replace( '{order_number}', $order->get_order_number(), $subject );

						$message = get_sub_field( 'content' );
						$message = str_replace( '{customer_name}', $first_name, $message );
						$message = str_replace( '{invoice_amount}', $currency . '$ ' . round( floatval( $pending_total ), 2 ), $message );
						$message = str_replace( '{pending_payment}', $currency . '$ ' . round( floatval( $pending_total ), 2 ), $message );
						$message = str_replace( '{payment_link}', $payment_url, $message );
						$message = str_replace( '{deadline}', $payment_date, $message );
						$message = str_replace( '{order_number}', $order->get_order_number(), $message );

						// Get the order details
						ob_start();
						add_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
						do_action( 'woocommerce_email_order_details', $order, false, false, '' );
						remove_filter( 'woocommerce_get_order_item_totals', array( $this, 'insert_payment_date' ), 30, 3 );
						$order_details = ob_get_clean();

						$message = str_replace( '{order_details}', $order_details, $message );

						if ( $customer_email ) {
							$headers = array( 'Content-Type: text/html; charset=UTF-8' );

							$role_instance = \NOVA_B2B\Roles::get_instance();

							if ( $role_instance ) {

								$attachments = array();

								if ( class_exists( '\WPO\WC\PDF_Invoices\Main' ) ) {
									$attachments = \WPO\WC\PDF_Invoices\Main::instance()->attach_document_to_email( array(), 'customer_invoice', $order, null );
								}

								$role_instance->send_email( $customer_email, $subject, $message, $headers, $attachments );

							}

							$label = get_sub_field( 'email_label' );

							if ( $label == 'Deadline email' ) {
								// $this->admin_notification_deadline_email( $original_order, $role_instance, $headers, $first_name, $payment_date, $pending_total );

								$current_overdue = get_user_meta( $user_id, 'overdue_orders', true );

								update_post_meta( $order_id, 'is_overdue', true );

								if ( $current_overdue ) {
									$current_overdue   = explode( ',', $current_overdue );
									$current_overdue[] = $order_id;
									update_user_meta( $user_id, 'overdue_orders', implode( ',', $current_overdue ) );
								} else {
									update_user_meta( $user_id, 'overdue_orders', $order_id );
								}
							}

							$key = 'payment_email_key_' . get_row_index();
							update_post_meta( $order_id, $key, 'sent' );

						}
					}
				}

			endwhile;
		endif;
	}

	public function schedule_pending_payment_checker() {
		if ( ! wp_next_scheduled( 'check_needs_payment_action_hook' ) ) {
			wp_schedule_event( time(), 'daily', 'check_needs_payment_action_hook' );
		}
	}

	public function delete_pending_payment_order() {
		$order_id = $_POST['order_id'];
		if ( ! wp_verify_nonce( $_POST['security'], 'nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}
		if ( ! $order_id ) {
			wp_send_json( 'Order ID not found' );
		}
		$this->delete_payments_by_order_id( $order_id );

		wp_send_json(
			array(
				'success' => true,
				'message' => 'Payment record deleted successfully',
			)
		);
	}

	public function in_production_content( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$key = $email->id;

		$deposit_chosen = $order->get_meta( '_deposit_chosen' );

		if ( ! $deposit_chosen ) {
			return $body_text;
		}

		if ( 'customer_production_order' !== $key ) {
			return $body_text;
		}

		$production_email = get_field( 'production_email', $deposit_chosen );
		$body_text        = $production_email['body_text'];
		$body_text        = str_replace( '{order_number}', $order->get_order_number(), $body_text );
		$body_text        = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
		$body_text        = str_replace( '{customer_name}', $order->get_billing_first_name(), $body_text );
		$body_text        = str_replace( '{customer_last_name}', $order->get_billing_last_name(), $body_text );
		$body_text        = str_replace( '{customer_full_name}', $order->get_formatted_billing_full_name(), $body_text );
		$body_text        = str_replace( '{customer_company}', $order->get_billing_company(), $body_text );
		$body_text        = str_replace( '{customer_email}', $order->get_billing_email(), $body_text );

		$body_text = str_replace( '{order_date}', wc_format_datetime( $order->get_date_created() ), $body_text );

		return $body_text;
	}

	public function fully_paid_content( $body_text, $order, $sent_to_admin, $plain_text, $email ) {
		$key = $email->id;

		$deposit_chosen = $order->get_meta( '_deposit_chosen' );

		if ( ! $deposit_chosen ) {
			return $body_text;
		}

		$second_payment = $order->get_meta( 'second_payment' );

		if ( ! $second_payment ) {
			return $body_text;
		}

		if ( 'customer_completed_order' !== $key ) {
			return $body_text;
		}

		$paid_email = get_field( 'paid_email', $deposit_chosen );
		$body_text  = $paid_email['body_text'];
		$body_text  = str_replace( '{order_number}', $order->get_order_number(), $body_text );
		$body_text  = str_replace( '{customer_first_name}', $order->get_billing_first_name(), $body_text );
		$body_text  = str_replace( '{customer_name}', $order->get_billing_first_name(), $body_text );
		$body_text  = str_replace( '{customer_last_name}', $order->get_billing_last_name(), $body_text );
		$body_text  = str_replace( '{customer_full_name}', $order->get_formatted_billing_full_name(), $body_text );
		$body_text  = str_replace( '{customer_company}', $order->get_billing_company(), $body_text );
		$body_text  = str_replace( '{customer_email}', $order->get_billing_email(), $body_text );

		$body_text = str_replace( '{order_date}', wc_format_datetime( $order->get_date_created() ), $body_text );

		return $body_text;
	}

	public function second_payment_subject( $subject, $order ) {
		$second_payment = $order->get_meta( 'second_payment' );
		if ( ! $second_payment ) {
			return $subject;
		}

		$subject = __( 'Payment Received', 'woocommerce' );
		return $subject;
	}

	public function second_payment_heading( $heading, $order, $email ) {

		$second_payment = $order->get_meta( 'second_payment' );
		if ( ! $second_payment ) {
			return $heading;
		}

		$heading = __( 'Payment Received', 'woocommerce' );

		return $heading;
	}

	public function update_original_orders_after_payment( $order_id ) {
		$order = wc_get_order( $order_id );

		$original_order_ids = $order->get_meta( '_original_order_ids' );

		if ( $original_order_ids && is_array( $original_order_ids ) ) {
			foreach ( $original_order_ids as $original_order_id ) {
				$original_order = wc_get_order( $original_order_id );
				if ( $original_order ) {
					$original_order->payment_complete( $order->get_transaction_id() );
					$original_order->add_order_note( sprintf( __( 'Payment completed via combined order #%s', 'nova-b2b' ), $order->get_order_number() ) );
				}
			}
			// Optionally, update the combined order status
			$order->update_status( 'completed' );
		}
	}

	public function cod_status( $status, $order ) {
		$second_payment = $order->get_meta( 'second_payment' );
		$combined_order = $order->get_meta( '_original_order_ids' );
		if ( $combined_order ) {
			return 'wc-completed';
		}
		if ( $second_payment ) {
			$order_status = $order->get_status();
			return $order_status;
		}
		return $status;
	}

	public function successful_payment( $result, $order_id ) {

		$order      = wc_get_order( $order_id );
		$nova_order = $order->get_meta( '_nova_order' );
		if ( ! $nova_order ) {
			return $result;
		}
		$needs_payment  = $order->get_meta( 'needs_payment' );
		$second_payment = $order->get_meta( 'second_payment' );
		if ( $needs_payment && $second_payment ) {
			delete_post_meta( $order_id, 'needs_payment' );
		}
		return $result;
	}

	public function add_deposit_row( $order_id ) {

		$order = wc_get_order( $order_id );

		$deposit_title = $order->get_meta( '_deposit_chosen_title' );
		if ( $deposit_title ) {
			echo '<tr>';
			echo '<td class="label">Payment Type:</td>';
			echo '<td width="1%"></td>';
			echo '<td class="amount">' . $deposit_title . '</td>';
			echo '</tr>';
		}
	}

	public function change_onhold_status( $on_hold, $order ) {
		$status = $order->get_status();

		$deposit_chosen = $order->get_meta( '_deposit_chosen' );
		/** if current user is admin */
		if ( $deposit_chosen ) {
			return $status;
		}

		return $on_hold;
	}

	public function change_payment_status( $order_status, $order_id, $order ) {

		$nova_order = $order->get_meta( '_nova_order' );
		$status     = $order->get_status();
		if ( ! $nova_order ) {
			return $order_status;
		}

		if ( WC()->session ) {
			if ( WC()->session->get( 'first_payment' ) ) {
				WC()->session->__unset( 'first_payment' );
				return 'processing';
			}
		}

		if ( $order->get_meta( 'needs_payment' ) && $order->get_meta( 'second_payment' ) ) {
			delete_post_meta( $order_id, 'needs_payment' );
			return $status;
		}

		$delivered_date = get_post_meta( $order_id, 'delivered_date', true );

		if ( ! $delivered_date ) {
			return $status;
		}

		return $order_status;
	}

	public function remove_wc_sessions_on_cart() {
		WC()->session->__unset( 'deposit_chosen' );
		WC()->session->__unset( 'deposit_amount' );
		WC()->session->__unset( 'pending_amount' );
	}

	public function insert_emails_meta( $order, $deposit_chosen ) {

		if ( have_rows( 'payment_emails', $deposit_chosen ) ) {
			while ( have_rows( 'payment_emails', $deposit_chosen ) ) {
				the_row();
				$key = 'payment_email_key_' . $deposit_chosen . '_' . get_row_index();
				$order->update_meta_data( $key, false );
			}
		}
	}

	public function insert_delivered_date( $order_id ) {
		$today = date( 'Ymd' );
		update_post_meta( $order_id, 'delivered_date', $today );
	}
	public function order_status_shipped( $order_id ) {
		$today = date( 'Ymd' );
		$order = wc_get_order( $order_id );
		update_post_meta( $order_id, 'shipped_date', $today );

		$needs_payment = get_post_meta( $order_id, 'needs_payment', true );
		if ( ! $needs_payment ) {
			$order->set_status( 'completed' );
			$order->save();
		} else {
			$order->set_status( 'pending' );
			$order->save();
		}
	}

	public function order_status_completed( $order_id ) {
		$order          = wc_get_order( $order_id );
		$needs_payment  = $order->get_meta( 'needs_payment' );
		$second_payment = $order->get_meta( 'second_payment' );
		if ( $needs_payment && $second_payment ) {
			delete_post_meta( $order_id, 'needs_payment' );
		}

		$original_order_ids = $order->get_meta( '_original_order_ids' );

		if ( $original_order_ids && is_array( $original_order_ids ) ) {
			foreach ( $original_order_ids as $original_order_id ) {
				$original_order = wc_get_order( $original_order_id );
				if ( $original_order ) {
					$original_order->set_status( 'completed' );
					$original_order->save();
					$original_order->add_order_note( sprintf( __( 'Order completed via combined order #%s', 'nova-b2b' ), $order->get_order_number() ) );
				}
			}
		}
	}

	public function thank_you_actions( $order_id ) {
		$first_payment = WC()->session->get( 'first_payment' );
		if ( $first_payment ) {
			// echo '<h1>HELLO</h1>';
			// $order = wc_get_order( $order_id );
			// $order->set_status( 'processing' );
			// $order->save();
			WC()->session->__unset( 'first_payment' );
		}
		if ( WC()->session->get( 'deposit_chosen' ) ) {
			WC()->session->__unset( 'deposit_chosen' );
		}
		if ( WC()->session->get( 'deposit_amount' ) ) {
			WC()->session->__unset( 'deposit_amount' );
		}
		if ( WC()->session->get( 'pending_amount' ) ) {
			WC()->session->__unset( 'pending_amount' );
		}
	}

	public function insert_nova_meta( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( $order ) {
			update_post_meta( $order_id, '_nova_new_order', true );
		}
	}

	public function order_actions( $order ) {
		$actions = array();

		if ( $order->get_status() === 'pending' ) {
			$actions['pay'] = array(
				'name'  => __( 'Pay', 'woocommerce' ),
				'url'   => $order->get_checkout_payment_url(),
				'class' => 'button',
			);
		}

		return $actions;
	}

	public function get_pending_payments() {

		global $wpdb;
		$pending_payments = array();

		$table_name = $wpdb->prefix . 'order_payments';

		// Get all data from the table
		$results = $wpdb->get_results(
			$wpdb->prepare( "SELECT * FROM $table_name" )
		);

		foreach ( $results as $result ) {

			$order_id      = $result->order_id;
			$order         = wc_get_order( $order_id );
			$time_diff     = '';
			$due_date      = '';
			$needs_payment = $order->get_meta( 'needs_payment' );

			if ( ! $order ) {
				continue;
			}

			if ( $order->has_status( array( 'completed', 'cancelled' ) ) ) {
				continue;
			}

			if ( ! $needs_payment ) {
				continue;
			}

			$deposit_chosen = $order->get_meta( '_deposit_chosen' );

			$days = get_field( 'days_after_shipping', $deposit_chosen );

			$payment_date = $result->payment_date;

			$shipped_date = $order->get_meta( 'shipped_date' );

			// ** due date is $shipped_date + $days */
			if ( $shipped_date ) {
				$due_date  = date( 'Y-m-d', strtotime( '+' . $days . ' days', strtotime( $shipped_date ) ) );
				$time_diff = human_time_diff( current_time( 'timestamp' ), strtotime( $due_date ) );
				$ago       = strtotime( $due_date ) < current_time( 'timestamp' );
			}

			$manual_delivered_date = get_field( 'manual_delivered_date', $order->get_id() );

			$delivered_date = false;

			if ( $manual_delivered_date ) {
				$date_obj = \DateTime::createFromFormat( 'd/m/Y', $manual_delivered_date );
				if ( $date_obj ) {
					$delivered_date = $date_obj->format( 'F d, Y' );
				}
			}

			$emails = array();

			if ( have_rows( 'payment_emails', $deposit_chosen ) ) {
				while ( have_rows( 'payment_emails', $deposit_chosen ) ) {
					the_row( 'payment_emails', $deposit_chosen );

					$row_index  = get_row_index();
					$key        = 'payment_email_key_' . $row_index;
					$email_sent = get_post_meta( $order_id, $key, true );

					$emails[] = array(
						'email_label' => get_sub_field( 'email_label' ),
						'email_key'   => $key,
						'order_id'    => $order_id,
						'email_sent'  => $email_sent,
					);
				}
			}

			$total = $order->get_total();

			$pending_payments[] = array(
				'order_id'          => $result->order_id,
				'ago'               => $shipped_date ? $ago : '',
				'order_number'      => '#' . $order->get_order_number(),
				'deposit_chosen'    => $order->get_meta( '_deposit_chosen_title' ),
				'deposit_amount'    => wc_price( $order->get_meta( '_deposit_amount' ), array( 'currency' => $order->get_currency() ) ),
				'total'             => $total,
				'total_amount'      => wc_price( $total, array( 'currency' => $order->get_currency() ) ),
				'payment_date'      => $payment_date,
				'customer_name'     => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
				'order_status'      => wc_get_order_status_name( $order->get_status() ),
				'delivered_date'    => $delivered_date,
				'order_admin_url'   => admin_url( 'post.php?post=' . $order_id . '&action=edit' ),
				'order_actions'     => $this->order_actions( $order ),
				'deposit_chosen_id' => $order->get_meta( '_deposit_chosen' ),
				'due_date'          => $shipped_date ? $due_date : '',
				'shipped_date'      => $shipped_date,
				'time_diff'         => $shipped_date ? $time_diff : '',
				'emails'            => $emails,
			);

		}

		return $pending_payments;
	}

	public function enqueue_nova_scripts() {
		// Get the current screen
		$screen = get_current_screen();

		// Check if we're on the pending payments page
		if ( isset( $screen->id ) && 'woocommerce_page_pending-payments' === $screen->id ) {
			wp_enqueue_style( 'nova-deposits', get_stylesheet_directory_uri() . '/deposits/assets/css/dist/output.css', array(), wp_get_theme()->get( 'Version' ) );

			wp_enqueue_script( 'nova-deposits', get_stylesheet_directory_uri() . '/deposits/build/index.js', array( 'wp-element' ), wp_get_theme()->get( 'Version' ), true );

			wp_localize_script(
				'nova-deposits',
				'NovaDeposits',
				array(
					'ajax_url'         => admin_url( 'admin-ajax.php' ),
					'nonce'            => wp_create_nonce( 'nonce' ),
					'pending_payments' => $this->get_pending_payments(),
				)
			);

		}
	}

	/**
	 * Create custom payment table
	 */
	public function create_payment_table() {
		global $wpdb;
		$table_name      = $wpdb->prefix . 'order_payments';
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
			id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			order_id bigint(20) UNSIGNED NOT NULL,
			amount decimal(10, 2) NOT NULL,
			payment_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
			needs_payment tinyint(1) NOT NULL DEFAULT 0,
			customer_id bigint(20) UNSIGNED NOT NULL,
			PRIMARY KEY  (id)
		) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}

	public function delete_payments_by_order_id( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		// Ensure that the order_id is an integer to prevent SQL injection
		$order_id = intval( $order_id );

		// Delete records from the table where order_id matches
		$wpdb->delete( $table_name, array( 'order_id' => $order_id ), array( '%d' ) );
	}

	public function second_payment_action( $order_id, $posted_data, $order ) {
	}

	public function second_payment_meta( $result, $order_id ) {
		$order = wc_get_order( $order_id );

		if ( $order->get_meta( '_deposit_chosen' ) ) {
			$today = current_time( 'mysql' );
			$order->update_meta_data( 'second_payment_date', $today );
			$order->update_meta_data( 'second_payment', true );
			$order->save();

		}

		return $result;
	}

	/**
	 * Insert payment record into the custom table
	 */
	public function insert_payment_record( $order_id, $posted_data, $order ) {

		if ( $order->has_status( 'failed' ) ) {
			return;
		}

		/* updated nova order */
		update_post_meta( $order_id, '_nova_order', true );

		$deposit_chosen = WC()->session->get( 'deposit_chosen' );

		if ( ! $deposit_chosen || $deposit_chosen == '0' ) {
			return;
		}

		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$order = wc_get_order( $order_id );

		/** Check if order_id is already in the table */

		$order_id_in_table = $wpdb->get_var(
			"
		SELECT order_id
		FROM {$table_name}
		WHERE order_id = {$order_id}
		"
		);

		if ( $order_id_in_table ) {
			return;
		}

		$inserted = $wpdb->insert(
			$table_name,
			array(
				'order_id'      => $order_id,
				'amount'        => $order->get_total(),
				'payment_date'  => current_time( 'mysql' ),
				'needs_payment' => 1,
				'customer_id'   => $order->get_customer_id(),
			),
			array( '%d', '%f', '%s', '%d', '%d' )
		);

		if ( $inserted ) {

			$deposit_amount = WC()->session->get( 'deposit_amount' );
			$pending_amount = WC()->session->get( 'pending_amount' );

			update_post_meta( $order_id, '_deposit_chosen', $deposit_chosen );
			update_post_meta( $order_id, '_deposit_chosen_title', get_the_title( $deposit_chosen ) );
			update_post_meta( $order_id, '_pending_amount', $pending_amount );
			update_post_meta( $order_id, '_deposit_amount', $deposit_amount );
			update_post_meta( $order_id, 'needs_payment', true );

			// $this->insert_emails_meta( $order, $deposit_chosen );

			WC()->session->__unset( 'deposit_chosen' );
			WC()->session->__unset( 'deposit_amount' );
			WC()->session->__unset( 'pending_amount' );

			$order->calculate_totals();
		}
	}

	/**
	 * Adjust order total based on payments in the custom table
	 */
	public function adjust_order_total_based_on_payments( $and_taxes, $order ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$payments = $wpdb->get_results(
			$wpdb->prepare( "SELECT amount FROM $table_name WHERE order_id = %d", $order->get_id() )
		);

		if ( $payments ) {
			$total = $order->get_total();
			$paid  = 0.00;

			foreach ( $payments as $payment ) {
				$paid += $payment->amount;
			}

			$new_total = $total - $paid;
			$order->set_total( $new_total );

			if ( $new_total > 0 ) {
				// $order->set_status( 'processing' );
			}
			$order->save();
		}
	}

	/**
	 * Display payments in the WooCommerce admin order totals section
	 */
	public function display_payments_in_admin( $order_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'order_payments';

		$order = wc_get_order( $order_id );

		$payments = $wpdb->get_results(
			$wpdb->prepare( "SELECT * FROM $table_name WHERE order_id = %d", $order_id )
		);

		if ( $payments ) {
			echo '<tr><td class="label">Payments:</td><td width="1%"></td><td class="total"><ul style="margin:0">';
			foreach ( $payments as $payment ) {
				echo '<li style="margin:0">' . wc_price( $payment->amount, array( 'currency' => $order->get_currency() ) ) . ' (' . date( 'd-m-y', strtotime( $payment->payment_date ) ) . ')</li>';
			}
			echo '</ul></td></tr>';
		}
	}

	/**
	 * Handle deposit options on checkout page
	 */
	public function handle_deposit_option( $posted_data ) {
		parse_str( $posted_data, $output );
		$deposit_chosen = isset( $output['deposit_chosen'] ) ? $output['deposit_chosen'] : 0;
		WC()->session->set( 'deposit_chosen', $deposit_chosen );
		if ( $deposit_chosen ) {
			WC()->session->set( 'first_payment', true );
		}
	}

	/**
	 * Apply deposit percentage on total
	 */
	public function apply_deposit_percentage( $total, $cart ) {
		$payment_select = WC()->session->get( 'deposit_chosen' );
		if ( ! $payment_select || $payment_select == '0' ) {
			WC()->session->set( 'deposit_amount', 0 );
			WC()->session->set( 'deposit_amount', 0 );
			WC()->session->set( 'pending_amount', 0 );
			return $total;
		}
		$deposit   = get_field( 'deposit', $payment_select ) / 100;
		$new_total = $total * $deposit;
		WC()->session->set( 'pending_amount', $total - $new_total );
		return $new_total;
	}

	public function order_needs_payment( $needs_payment, $order ) {
		if ( $order->get_meta( 'needs_payment' ) && $order->get_status() !== 'completed' ) {
			return true;
		}
		return $needs_payment;
	}

	public function order_is_paid( $is_paid, $order ) {
		$needs_payment = $order->get_meta( 'needs_payment' );
		if ( $needs_payment ) {
			return false;
		}
		return $is_paid;
	}

	public function order_get_date_paid( $date_paid, $order ) {
		if ( $order->get_meta( 'needs_payment' ) ) {
			return false;
		}
		return $date_paid;
	}

	public function order_is_editable( $editable, $order ) {
		if ( $order->get_meta( 'needs_payment' ) && $order->get_status() !== 'completed' ) {
			return true;
		}
		return $editable;
	}

	public function deposit_insert_order_total_row( $total_rows, $order ) {
		$deposit_title = get_post_meta( $order->get_id(), '_deposit_chosen_title', true );
		if ( $deposit_title ) {
			$deposit_amount = get_post_meta( $order->get_id(), '_deposit_amount', true );
			$new_rows       = array();

			foreach ( $total_rows as $key => $total ) {
				// Insert the deposit details before the order total
				if ( 'order_total' === $key ) {
					// Add deposit title and amount rows
					$new_rows['deposit_title']  = array(
						'label' => __( 'Payment Type:', 'nova-b2b' ),
						'value' => $deposit_title,
					);
					$new_rows['deposit_amount'] = array(
						'label' => __( 'Deposit:', 'nova-b2b' ),
						'value' => '-' . wc_price( $deposit_amount, array( 'currency' => $order->get_currency() ) ),
					);
				}

				// Always add the existing rows
				$new_rows[ $key ] = $total;
			}

			return $new_rows;
		}

		return $total_rows;
	}

	public function pending_page_after_content() {
		?>
<div class="wrap">
	<div id="depositTable"></div>
</div>
		<?php
	}

	public function output_deposit_selection() {
		$woo_instance = \NOVA_B2B\Woocommerce::get_instance();
		if ( ! $woo_instance ) {
			return;
		}
		$payments_selection = $woo_instance->get_payment_selections();

		if ( ! $payments_selection ) {
			return;
		}

		$chosen = WC()->session->get( 'deposit_chosen' );
		$chosen = empty( $chosen ) ? WC()->checkout->get_value( 'deposit_chosen' ) : $chosen;
		$chosen = empty( $chosen ) ? '0' : $chosen;
		?>
<fieldset>
	<legend class="px-4 uppercase"><span><?php esc_html_e( 'Payment Type', 'woocommerce' ); ?></span></legend>
	<div class="grid md:grid-cols-3 gap-4 update_totals_on_change">
		<div class="cursor-pointer h-full">
			<label for="payment_0"
				class="block h-full justify-end p-3 border rounded-md w-full max-w-sm cursor-pointer hover:border-slate-500 hover:bg-slate-200 hover:shadow-lg">
				<input class="bg-none" id="payment_0" type="radio" name="deposit_chosen" value="0"
					<?php echo ( '0' == $chosen ? 'checked' : '' ); ?>>
				<span>Full</span>
				<span class="text-sm font-body block mt-2 hidden">Description</span>
			</label>
		</div>
		<?php
		foreach ( $payments_selection as $key => $selection ) {
			?>
		<div class="cursor-pointer h-full">
			<label for="payment_<?php echo $selection['id']; ?>"
				class="block h-full justify-end p-3 border rounded-md w-full max-w-sm cursor-pointer hover:border-slate-500 hover:bg-slate-200 hover:shadow-lg">
				<input class="bg-none" id="payment_<?php echo $selection['id']; ?>" type="radio" name="deposit_chosen"
					value="<?php echo $selection['id']; ?>" id="payment_<?php echo $selection['id']; ?>"
					<?php echo ( $selection['id'] == $chosen ? 'checked' : '' ); ?>>
				<span><?php echo $selection['title']; ?></span>
				<span class="text-sm font-body block mt-2"><?php echo $selection['description']; ?></span>
			</label>
		</div>
		<?php } ?>
	</div>
</fieldset>

		<?php
	}
}
