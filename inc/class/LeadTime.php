<?php

namespace NOVA_B2B;

class LeadTime {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Option page name
	 *
	 * @var string
	 */
	private $option_page = 'nova_lead_time_page';

	/**
	 * Option group name
	 *
	 * @var string
	 */
	private $option_group = 'lead_time_settings';


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
		add_action( 'admin_menu', array( $this, 'add_options_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_timeline_styles' ) );

		add_action( 'add_meta_boxes', array( $this, 'add_lead_time_metabox' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_lead_time_status_metabox' ) );

		add_action( 'save_post_shop_order', array( $this, 'save_lead_time' ) );

		add_action( 'woocommerce_new_order', array( $this, 'set_initial_lead_time_status' ) );
		add_action( 'order_approval_sent', array( $this, 'order_approval_sent_lead_time' ) );
		add_action( 'order_customer_approved', array( $this, 'order_customer_approved_lead_time' ) );
		add_action( 'woocommerce_order_status_shipped', array( $this, 'order_status_shipped_lead_time' ), 10, 1 );
		add_action( 'trello_card_moved', array( $this, 'trello_card_moved_lead_time' ), 10, 4 );
		add_action( 'trello_card_updated', array( $this, 'trello_card_updated_lead_time' ), 10, 3 );

		add_action( 'wp_ajax_mark_product_received', array( $this, 'mark_product_received' ) );
	}

	public function order_status_shipped_lead_time( $order_id ) {
		$order_lead_time_meta = get_post_meta( $order_id, 'lead_time_status', true );


		if ( ! $order_lead_time_meta ) {
			return;
		}

		$order_lead_time_meta['shipped']['timestamp'] = current_time( 'timestamp' );
		$order_lead_time_meta['shipped']['is_active'] = true;

		update_post_meta( $order_id, 'lead_time_status', $order_lead_time_meta );
	}

	public function trello_card_updated_lead_time( $card_data, $old_data, $order_id ) {
		$dhl_list_id = get_option( 'trello_dhl_tracking_list' );

		// Check if card is in DHL tracking list
		if ( $card_data['idList'] !== $dhl_list_id ) {
			return;
		}

		// Get latest comment containing "DHL"
		$dhl_comment = '';
		if ( ! empty( $card_data['actions'] ) ) {
			foreach ( $card_data['actions'] as $action ) {
				if ( $action['type'] === 'commentCard' &&
					stripos( $action['data']['text'], 'DHL' ) !== false ) {
					$dhl_comment = $action['data']['text'];
					break;
				}
			}
		}

		if ( empty( $dhl_comment ) ) {
			return;
		}

		// Update lead time status with DHL tracking info
		$lead_time_status = get_post_meta( $order_id, 'lead_time_status', true );
		if ( ! $lead_time_status ) {
			return;
		}

		$lead_time_status['dhl_tracking']['description'] = sanitize_text_field( $dhl_comment );
		$lead_time_status['dhl_tracking']['timestamp'] = current_time( 'timestamp' );
		$lead_time_status['dhl_tracking']['is_active'] = true;

		update_post_meta( $order_id, 'lead_time_status', $lead_time_status );
	}

	public function trello_card_moved_lead_time( $card_data, $old_list_id, $new_list_id, $order_id ) {

		$dhl_list_id = get_option( 'trello_dhl_tracking_list' );

		if ( $new_list_id !== $dhl_list_id ) {
			return;
		}

		$lead_time_status = get_post_meta( $order_id, 'lead_time_status', true );

		if ( ! $lead_time_status ) {
			return;
		}

		$lead_time_status['dhl_tracking']['timestamp'] = current_time( 'timestamp' );
		$lead_time_status['dhl_tracking']['is_active'] = true;

		update_post_meta( $order_id, 'lead_time_status', $lead_time_status );
	}

	public function order_customer_approved_lead_time( $order_id ) {
		$order_lead_time_meta = get_post_meta( $order_id, 'lead_time_status', true );

		if ( ! $order_lead_time_meta ) {
			return;
		}

		$order_lead_time_meta['drawing_approved']['timestamp'] = current_time( 'timestamp' );
		$order_lead_time_meta['drawing_approved']['is_active'] = true;
		$order_lead_time_meta['in_production']['timestamp'] = current_time( 'timestamp' );
		$order_lead_time_meta['in_production']['is_active'] = true;

		update_post_meta( $order_id, 'lead_time_status', $order_lead_time_meta );
	}

	public function order_approval_sent_lead_time( $order_id ) {

		$order_lead_time_meta = get_post_meta( $order_id, 'lead_time_status', true );

		if ( ! $order_lead_time_meta ) {
			return;
		}

		$order_lead_time_meta['waiting_for_drawing']['timestamp'] = current_time( 'timestamp' );
		$order_lead_time_meta['waiting_for_drawing']['is_active'] = true;
		$order_lead_time_meta['waiting_for_drawing']['description'] = 'Approval sent by ' . get_post_meta( $order_id, 'order_approved_email', true );

		update_post_meta( $order_id, 'lead_time_status', $order_lead_time_meta );



	}

	public function lead_time_status() {
		$status = array(
			'order_received' => array(
				'label' => __( 'Order Received', 'nova-b2b' ),
				'customer_label' => __( 'Order Received', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => true,
				'has_lead_time' => false,
				'timestamp' => current_time( 'timestamp' ),
			),
			'waiting_for_drawing' => array(
				'label' => __( 'Waiting for Drawing', 'nova-b2b' ),
				'customer_label' => __( 'Waiting for Drawing', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => false,
				'has_lead_time' => false,
				'timestamp' => null,
			),
			'drawing_approved' => array(
				'label' => __( 'Drawing Approved', 'nova-b2b' ),
				'customer_label' => __( 'Drawing Approved', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => false,
				'has_lead_time' => false,
				'timestamp' => null,
			),
			'in_production' => array(
				'label' => __( 'In Production', 'nova-b2b' ),
				'customer_label' => __( 'In Production', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => false,
				'has_lead_time' => true,
				'timestamp' => null,
			),
			'dhl_tracking' => array(
				'label' => __( 'DHL Tracking', 'nova-b2b' ),
				'customer_label' => __( 'In Production', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => false,
				'is_active' => false,
				'has_lead_time' => true,
				'timestamp' => null,
			),
			'received_the_product' => array(
				'label' => __( 'Received the Product', 'nova-b2b' ),
				'customer_label' => __( 'Ready for Packing', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => false,
				'has_lead_time' => false,
				'timestamp' => null,
			),
			'shipped' => array(
				'label' => __( 'Shipped', 'nova-b2b' ),
				'customer_label' => __( 'Shipped', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => false,
				'has_lead_time' => false,
				'timestamp' => null,
			),
			'delivered' => array(
				'label' => __( 'Delivered', 'nova-b2b' ),
				'customer_label' => __( 'Delivered', 'nova-b2b' ),
				'customer_description' => '',
				'description' => '',
				'lead_time' => '',
				'external' => true,
				'is_active' => false,
				'has_lead_time' => false,
				'timestamp' => null,
			),
		);

		return apply_filters( 'nova_lead_time_status', $status );
	}

	/**
	 * Register settings
	 */
	public function register_settings() {
		register_setting(
			$this->option_group,
			'trello_dhl_tracking_list',
			array(
				'type' => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'default' => ''
			)
		);
	}

	/**
	 * Add options page to admin menu
	 */
	public function add_options_page() {
		add_options_page(
			__( 'Trello DHL', 'nova-b2b' ),
			__( 'Trello DHL', 'nova-b2b' ),
			'manage_options',
			$this->option_page,
			array( $this, 'render_options_page' )
		);
	}

	/**
	 * Render options page
	 */
	public function render_options_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( $this->option_group );
				?>
				<div class="trello-lists">
					<?php $this->display_trello_lists(); ?>
				</div>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	/**
	 * Display Trello Lists
	 */
	private function display_trello_lists() {
		try {
			$lists = $this->get_trello_lists();
			$selected_list = get_option( 'trello_dhl_tracking_list', '' );

			if ( ! empty( $lists ) ) {
				echo '<table class="form-table" role="presentation">';
				echo '<tbody>';
				echo '<tr>';
				echo '<th scope="row">' . esc_html__( 'DHL Tracking List', 'nova-b2b' ) . '</th>';
				echo '<td>';
				echo '<select name="trello_dhl_tracking_list" class="regular-text">';
				echo '<option value="">' . esc_html__( '-- Select List --', 'nova-b2b' ) . '</option>';

				foreach ( $lists as $list ) {
					echo '<option value="' . esc_attr( $list['id'] ) . '" ' .
						selected( $selected_list, $list['id'], false ) . '>' .
						esc_html( $list['name'] ) . '</option>';
				}

				echo '</select>';
				echo '<p class="description">' .
					esc_html__( 'Select the Trello list where DHL tracking information will be found.', 'nova-b2b' ) .
					'</p>';
				echo '</td>';
				echo '</tr>';
				echo '</tbody>';
				echo '</table>';
			} else {
				echo '<p>' . esc_html__( 'No Trello lists found.', 'nova-b2b' ) . '</p>';
			}
		} catch (\Exception $e) {
			echo '<div class="notice notice-error"><p>' .
				esc_html__( 'Error fetching Trello lists: ', 'nova-b2b' ) .
				esc_html( $e->getMessage() ) .
				'</p></div>';
		}
	}

	/**
	 * Get Trello Lists using Trello class
	 */
	private function get_trello_lists() {
		$board_id = get_field( 'trello_board_id', 'option' );

		if ( empty( $board_id ) ) {
			throw new \Exception( __( 'Trello board ID not configured', 'nova-b2b' ) );
		}

		$trello = \NOVA_B2B\Trello::get_instance();

		if ( ! $trello ) {
			throw new \Exception( __( 'Trello instance not found', 'nova-b2b' ) );
		}

		$url = $trello->api_url . "/boards/{$board_id}/lists";


		$response = wp_remote_get( add_query_arg( array(
			'key' => get_field( 'trello_api_key', 'option' ),
			'token' => get_field( 'trello_api_token', 'option' )
		), $url ) );

		if ( is_wp_error( $response ) ) {
			throw new \Exception( $response->get_error_message() );
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			throw new \Exception( 'Invalid JSON response' );
		}

		return $data;
	}

	/**
	 * Set initial lead time status when order is created
	 *
	 * @param int $order_id Order ID
	 */
	public function set_initial_lead_time_status( $order_id ) {
		if ( ! $order_id ) {
			return;
		}

		$initial_status = $this->lead_time_status();
		$initial_status['order_received']['timestamp'] = current_time( 'timestamp' );
		$initial_status['order_received']['is_active'] = true;

		error_log( 'initial_status: ' . json_encode( $initial_status ) );

		update_post_meta( $order_id, 'lead_time_status', $initial_status );
	}

	/**
	 * Add lead time timeline metabox
	 */
	public function add_lead_time_metabox() {
		add_meta_box(
			'nova_lead_time_timeline',
			__( 'Lead Time Timeline', 'nova-b2b' ),
			array( $this, 'render_lead_time_timeline' ),
			'shop_order',
			'advanced',
			'low'
		);
	}

	/**
	 * Add lead time status metabox
	 */
	public function add_lead_time_status_metabox() {
		add_meta_box(
			'nova_lead_time_status',
			__( 'Lead Time Status', 'nova-b2b' ),
			array( $this, 'render_lead_time_status' ),
			'shop_order',
			'side',
			'high'
		);
	}

	/**
	 * Enqueue timeline styles
	 */
	public function enqueue_timeline_styles( $hook ) {
		if ( get_post_type() !== 'shop_order' ) {
			return;
		}

		wp_enqueue_style(
			'nova-timeline',
			get_stylesheet_directory_uri() . '/assets/css/admin/timeline.css',
			array(),
			filemtime( get_stylesheet_directory() . '/assets/css/admin/timeline.css' )
		);

		wp_add_inline_style( 'nova-timeline', '
			.lead-time-current-status {
				padding: 10px;
				background: #f0f0f1;
				border-radius: 4px;
				margin: 0;
				text-align: center;
			}
			.lead-time-current-status strong {
				color: #000;
				font-size: 14px;
			}
			.mark-received-btn {
				display: block;
				width: 100%;
				margin-top: 10px;
				text-align: center;
			}
		' );

		wp_enqueue_script(
			'nova-lead-time',
			get_stylesheet_directory_uri() . '/assets/js/admin/lead-time.js',
			array(),
			filemtime( get_stylesheet_directory() . '/assets/js/admin/lead-time.js' ),
			true
		);

		wp_localize_script( 'nova-lead-time', 'novaLeadTime', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'mark_product_received' )
		) );
	}

	/**
	 * Render lead time timeline
	 * 
	 * @param WP_Post $post Post object
	 */
	public function render_lead_time_timeline( $post ) {
		$lead_time_status = get_post_meta( $post->ID, 'lead_time_status', true );
		if ( ! $lead_time_status ) {
			echo '<p class="p-4 text-gray-500">' . esc_html__( 'No timeline data available.', 'nova-b2b' ) . '</p>';
			return;
		}
		?>
		<div class="flex gap-4">
			<div class="flex-1">
				<h4>Internal Lead Time</h4>
				<div class="timeline-container">
					<div class="timeline-line"></div>
					<?php foreach ( $lead_time_status as $status_key => $status_data ) :
						$is_active = $status_data['is_active'];
						?>
						<div class="timeline-item <?php echo $is_active ? 'active' : 'inactive'; ?>">
							<div class="timeline-dot"></div>
							<div class="timeline-content">
								<?php $this->render_timeline_content( $status_key, $status_data ); ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="flex-1">
				<h4>Customer Lead Time</h4>
				<div class="timeline-container">
					<div class="timeline-line"></div>
					<?php foreach ( $lead_time_status as $status_key => $status_data ) :
						$is_active = $status_data['is_active'];
						$external = $status_data['external'];
						if ( ! $external ) {
							continue;
						}
						?>
						<div class="timeline-item <?php echo $is_active ? 'active' : 'inactive'; ?>">
							<div class="timeline-dot"></div>
							<div class="timeline-content">
								<?php $this->render_timeline_content( $status_key, $status_data, true ); ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>


		</div>
		<?php
	}

	/**
	 * Render timeline content
	 * 
	 * @param string $status_key Status key
	 * @param array $status_data Status data
	 */
	private function render_timeline_content( $status_key, $status_data, $external = false ) {
		?>
		<div class="timeline-title">
			<?php echo esc_html( $external ? $status_data['customer_label'] : $status_data['label'] ); ?>
		</div>

		<?php if ( $status_data['timestamp'] ) : ?>
			<div class="timeline-date">
				<?php echo esc_html( date_i18n( 'F j, Y g:i a', $status_data['timestamp'] ) ); ?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $status_data['customer_description'] ) && $external ) : ?>
			<div class="timeline-description">
				<?php echo esc_html( $status_data['customer_description'] ); ?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $status_data['description'] ) && ! $external ) : ?>
			<div class="timeline-description">
				<?php echo esc_html( $status_data['description'] ); ?>
			</div>
		<?php endif;

		?>

		<div class="timeline-lead-time flex">
			<?php if ( ! $external ) : ?>
				<?php $this->editing_status_lead_time( $status_key, $status_data ); ?>
			<?php else : ?>
				<?php echo esc_html( $status_data['lead_time'] ? 'Estimated days: ' . $status_data['lead_time'] . ' days' : '' ); ?>
			<?php endif; ?>
		</div>

		<?php
	}

	public function editing_status_lead_time( $status_key, $status_data ) {
		if ( 'in_production' !== $status_key && 'dhl_tracking' !== $status_key ) {
			return;
		}
		?>
		<div class="grid gap-2 edit-lead-time-container">
			<div>
				<label
					for="lead_time_<?php echo esc_attr( $status_key ); ?>"><?php esc_html_e( 'Estimated days:', 'nova-b2b' ); ?></label>
				<input type="number" class="timeline-lead-time-input" name="lead_time_<?php echo esc_attr( $status_key ); ?>"
					value="<?php echo esc_attr( $status_data['lead_time'] ); ?>" />
			</div>

			<div>
				<label
					for="description_<?php echo esc_attr( $status_key ); ?>"><?php esc_html_e( 'Description:', 'nova-b2b' ); ?></label>
				<textarea class="timeline-lead-time-textarea"
					name="description_<?php echo esc_attr( $status_key ); ?>"><?php echo esc_textarea( $status_data['description'] ); ?></textarea>
			</div>

			<div>
				<label
					for="customer_description_<?php echo esc_attr( $status_key ); ?>"><?php esc_html_e( 'Customer Description:', 'nova-b2b' ); ?></label>
				<textarea class="timeline-lead-time-textarea"
					name="customer_description_<?php echo esc_attr( $status_key ); ?>"><?php echo esc_textarea( $status_data['customer_description'] ); ?></textarea>
			</div>
		</div>

		<div>
			<label for="is_active_<?php echo esc_attr( $status_key ); ?>"><?php esc_html_e( 'Is Active:', 'nova-b2b' ); ?></label>
			<input type="checkbox" name="is_active_<?php echo esc_attr( $status_key ); ?>" <?php checked( $status_data['is_active'] ); ?> />
		</div>

		<?php

	}

	/**
	 * Render lead time status
	 * 
	 * @param \WP_Post $post Post object
	 */
	public function render_lead_time_status( $post ) {
		$lead_time_status = get_post_meta( $post->ID, 'lead_time_status', true );
		if ( ! $lead_time_status ) {
			echo '<p>' . esc_html__( 'No status available.', 'nova-b2b' ) . '</p>';
			return;
		}

		$latest_active = null;
		$latest_key = null;
		foreach ( $lead_time_status as $key => $status ) {
			if ( $status['is_active'] ) {
				$latest_active = $status;
				$latest_key = $key;
			}
		}


		if ( $latest_active ) {
			echo '<p class="lead-time-current-status"><strong>' . esc_html( $latest_active['label'] ) . '</strong></p>';

			if ( $latest_key === 'dhl_tracking' ) {
				echo '<button type="button" class="mark-received-btn" data-order-id="' . esc_attr( $post->ID ) . '">' .
					esc_html__( 'Set to Product Received', 'nova-b2b' ) .
					'</button>';
			}
		} else {
			echo '<p>' . esc_html__( 'No active status.', 'nova-b2b' ) . '</p>';
		}
	}

	/**
	 * Save lead time values from POST data
	 * 
	 * @param int $order_id Order ID
	 */
	public function save_lead_time( $order_id ) {
		if ( ! $order_id ) {
			return;
		}

		$lead_time_status = get_post_meta( $order_id, 'lead_time_status', true );
		if ( ! $lead_time_status ) {
			return;
		}

		foreach ( $lead_time_status as $status_key => &$status_data ) {
			if ( $status_key === 'order_received' ) {
				continue;
			}
			$lead_time = 'lead_time_' . $status_key;
			$description = 'description_' . $status_key;
			$customer_description = 'customer_description_' . $status_key;
			$is_active = 'is_active_' . $status_key;

			if ( isset( $_POST[ $lead_time ] ) ) {
				$status_data['lead_time'] = sanitize_text_field( $_POST[ $lead_time ] );
			}
			if ( isset( $_POST[ $description ] ) ) {
				$status_data['description'] = sanitize_textarea_field( $_POST[ $description ] );
			}
			if ( isset( $_POST[ $customer_description ] ) ) {
				$status_data['customer_description'] = sanitize_textarea_field( $_POST[ $customer_description ] );
			}

			$status_data['is_active'] = isset( $_POST[ $is_active ] );
		}

		error_log( 'save_lead_time: ' . json_encode( $lead_time_status ) );

		update_post_meta( $order_id, 'lead_time_status', $lead_time_status );
	}

	public function mark_product_received() {
		check_ajax_referer( 'mark_product_received', 'nonce' );

		if ( ! current_user_can( 'edit_shop_orders' ) ) {
			wp_send_json_error( 'Permission denied' );
			return;
		}

		$order_id = isset( $_POST['order_id'] ) ? intval( $_POST['order_id'] ) : 0;
		if ( ! $order_id ) {
			wp_send_json_error( 'Invalid order ID' );
			return;
		}

		$lead_time_status = get_post_meta( $order_id, 'lead_time_status', true );
		if ( ! $lead_time_status ) {
			wp_send_json_error( 'No lead time status found' );
			return;
		}

		$lead_time_status['received_the_product']['is_active'] = true;
		$lead_time_status['received_the_product']['timestamp'] = current_time( 'timestamp' );

		update_post_meta( $order_id, 'lead_time_status', $lead_time_status );

		wp_send_json_success( array(
			'message' => __( 'Product marked as received', 'nova-b2b' ),
			'new_status' => $lead_time_status['received_the_product']['label']
		) );
	}
}