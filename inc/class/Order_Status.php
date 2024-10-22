<?php


namespace NOVA_B2B;

use function wc_get_order;

class Order_Status {
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
		// Add custom order statuses
		$this->add_custom_order_status( 'Shipped', 'shipped', '#3498db' );
		$this->add_custom_order_status( 'In Production', 'production', '#333' );
		add_action( 'woocommerce_order_note_added', array( $this, 'change_status_on_shipstation_note' ), 10, 2 );
		add_action( 'woocommerce_shipstation_shipnotify', array( $this, 'change_status_to_shipped' ), 10, 2 );
		add_filter( 'woocommerce_email_classes', array( $this, 'custom_init_emails' ) );
		add_filter( 'woocommerce_email_actions', array( $this, 'email_actions' ) );
		add_filter( 'kadence_woomail_email_types', array( $this, 'email_types' ), 10, 1 );
		add_filter( 'kadence_woomail_customized_email_types', array( $this, 'email_types' ), 10, 1 );
		add_filter( 'kadence_woomail_email_type_class_name_array', array( $this, 'kadence_email_classes' ) );
		add_filter( 'woocommerce_get_order_status_labels', array( $this, 'order_status_labels' ), 10, 2 );
		add_filter( 'wc_order_statuses', array( $this, 'add_custom_statuses_to_order_statuses' ) );
	}

	public function add_custom_statuses_to_order_statuses( $statuses ) {
		$statuses['wc-production'] = _x( 'In Production', 'Order status', 'woocommerce' );
		$statuses['wc-shipped']    = _x( 'Shipped', 'Order status', 'woocommerce' );

		return $statuses;
	}

	public function order_status_labels( $status_names, $order ) {
		$status_names['production'] = __( 'Order is now in shipstation.', 'nova-b2b' );
		$status_names['shipped']    = __( 'Shipped', 'nova-b2b' );
		return $status_names;
	}

	public function kadence_email_classes( $emails ) {
		if ( class_exists( 'WC_Email_Customer_Production_Order' ) ) {
			$emails['customer_production_order'] = 'WC_Email_Customer_Production_Order';
		}
		if ( class_exists( 'WC_Email_Customer_Shipped_Order' ) ) {
			$emails['customer_shipped_order'] = 'WC_Email_Customer_Shipped_Order';
		}
		return $emails;
	}

	public function email_types( $types ) {
		$types['customer_production_order'] = __( 'Customer Production Order', 'nova-b2b' );
		$types['customer_shipped_order']    = __( 'Customer Shipped Order', 'nova-b2b' );
		return $types;
	}

	public function email_actions( $actions ) {
		$actions[] = 'woocommerce_order_status_production';
		$actions[] = 'woocommerce_order_status_shipped';
		return $actions;
	}

	public function custom_init_emails( $emails ) {

		$emails['WC_Email_Customer_Production_Order'] = include_once 'emails/class-wc-email-customer-production-order.php';
		$emails['WC_Email_Customer_Shipped_Order']    = include_once 'emails/class-wc-email-customer-shipped-order.php';

		return $emails;
	}

	public function change_status_to_shipped( $order, $details ) {
		$order->update_status( 'shipped', 'Order status automatically changed to shipped.' );
	}

	public function change_status_on_shipstation_note( $comment_id, $order ) {
		$comment      = get_comment( $comment_id );
		$note_content = $comment->comment_content;

		if ( strpos( $note_content, 'Order has been exported to Shipstation' ) !== false ) {
			// Change the order status to "production".
			$order->update_status( 'production', 'Order status automatically changed to production after being exported to Shipstation.' );
		}
	}

	/**
	 * Function to add custom order statuses dynamically
	 *
	 * @param string $status_name Name of the custom status (e.g., 'Shipped')
	 * @param string $status_slug Slug for the status (e.g., 'shipped')
	 * @param string $label_color Hex color code for the label in the admin (optional)
	 */
	private function add_custom_order_status( $status_name, $status_slug, $label_color = '#f7b84b' ) {
		// Register custom order status
		add_action(
			'init',
			function () use ( $status_name, $status_slug ) {
				register_post_status(
					'wc-' . $status_slug,
					array(
						'label'                     => _x( $status_name, 'Order status', 'nova-b2b' ),
						'public'                    => true,
						'exclude_from_search'       => false,
						'show_in_admin_all_list'    => true,
						'show_in_admin_status_list' => true,
						'label_count'               => _n_noop( $status_name . ' <span class="count">(%s)</span>', $status_name . ' <span class="count">(%s)</span>', 'nova-b2b' ),
					)
				);
			}
		);

		// Add custom status to bulk actions
		add_filter(
			'bulk_actions-edit-shop_order',
			function ( $bulk_actions ) use ( $status_name, $status_slug ) {
				$bulk_actions[ 'mark_' . $status_slug ] = __( 'Change status to ' . $status_slug, 'nova-b2b' );
				return $bulk_actions;
			}
		);

		// Add custom status to order actions dropdown
		add_filter(
			'woocommerce_order_actions',
			function ( $actions ) use ( $status_name, $status_slug ) {
				$actions[ 'mark_' . $status_slug ] = __( 'Mark as ' . $status_slug, 'nova-b2b' );
				return $actions;
			}
		);

		// Add custom CSS to style the order status in the admin
		add_action(
			'admin_head',
			function () use ( $status_slug, $label_color ) {
				echo '<style>
				.order-status.status-' . $status_slug . ' {
					background: ' . esc_attr( $label_color ) . ';
					color: white;
				}
			</style>';
			}
		);
	}
}
