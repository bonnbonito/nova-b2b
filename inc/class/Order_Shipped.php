<?php

namespace NOVA_B2B;

class Order_Shipped {
	/**
	 * Instance of this class
	 *
	 * @var Order_Shipped|null
	 */
	private static $instance = null;

	/**
	 * Get the singleton instance.
	 *
	 * @return Order_Shipped
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
		// Register Custom Order Status
		add_action( 'init', array( $this, 'register_shipped_order_status' ) );

		// Add to list of WooCommerce Order Statuses
		add_filter( 'wc_order_statuses', array( $this, 'add_shipped_to_order_statuses' ) );

		// Add Shipped Status to Order Filters
		add_filter( 'woocommerce_order_statuses', array( $this, 'add_shipped_to_order_filters' ) );

		// Add Custom Status to Order Actions Metabox
		add_filter( 'woocommerce_order_actions', array( $this, 'add_shipped_to_order_actions' ) );

		// Add Custom Status to Bulk Actions Dropdown
		add_filter( 'bulk_actions-edit-shop_order', array( $this, 'add_shipped_to_bulk_actions' ) );

		// Process the Custom Bulk Action
		add_action( 'load-edit.php', array( $this, 'process_bulk_action_mark_shipped' ) );

		// Add Custom Status to Admin Order List CSS
		add_action( 'admin_head', array( $this, 'add_shipped_order_status_style' ) );

		// Include Shipped Status in Reports
		add_filter( 'woocommerce_reports_order_statuses', array( $this, 'include_shipped_in_reports' ) );
	}

	/**
	 * Register the custom order status 'shipped'.
	 */
	public function register_shipped_order_status() {
		register_post_status(
			'wc-shipped',
			array(
				'label'                     => _x( 'Shipped', 'Order status', 'nova-b2b' ),
				'public'                    => true,
				'exclude_from_search'       => false,
				'show_in_admin_all_list'    => true,
				'show_in_admin_status_list' => true,
				'label_count'               => _n_noop( 'Shipped <span class="count">(%s)</span>', 'Shipped <span class="count">(%s)</span>', 'nova-b2b' ),
			)
		);
	}

	/**
	 * Add the 'shipped' status to the list of WooCommerce order statuses.
	 *
	 * @param array $order_statuses Existing order statuses.
	 * @return array Modified order statuses.
	 */
	public function add_shipped_to_order_statuses( $order_statuses ) {
		$new_order_statuses = array();

		// Add new order status after 'processing'
		foreach ( $order_statuses as $key => $status ) {
			$new_order_statuses[ $key ] = $status;

			if ( 'wc-processing' === $key ) {
				$new_order_statuses['wc-shipped'] = _x( 'Shipped', 'Order status', 'nova-b2b' );
			}
		}

		return $new_order_statuses;
	}

	/**
	 * Add 'shipped' status to WooCommerce order filters.
	 *
	 * @param array $order_statuses Existing order statuses.
	 * @return array Modified order statuses.
	 */
	public function add_shipped_to_order_filters( $order_statuses ) {
		$order_statuses['wc-shipped'] = _x( 'Shipped', 'Order status', 'nova-b2b' );
		return $order_statuses;
	}

	/**
	 * Add 'shipped' status to order actions dropdown in order edit page.
	 *
	 * @param array $actions Existing order actions.
	 * @return array Modified order actions.
	 */
	public function add_shipped_to_order_actions( $actions ) {
		$actions['mark_shipped'] = __( 'Mark as shipped', 'nova-b2b' );
		return $actions;
	}

	/**
	 * Add 'shipped' status to bulk actions dropdown in orders list.
	 *
	 * @param array $bulk_actions Existing bulk actions.
	 * @return array Modified bulk actions.
	 */
	public function add_shipped_to_bulk_actions( $bulk_actions ) {
		$bulk_actions['mark_shipped'] = __( 'Change status to shipped', 'nova-b2b' );
		return $bulk_actions;
	}

	/**
	 * Process the custom bulk action to mark orders as 'shipped'.
	 */
	public function process_bulk_action_mark_shipped() {
		global $typenow;
		$post_type = $typenow;

		if ( $post_type == 'shop_order' ) {
			// Get the action
			$wp_list_table = _get_list_table( 'WP_Posts_List_Table' );
			$action        = $wp_list_table->current_action();

			$allowed_actions = array( 'mark_shipped' );
			if ( ! in_array( $action, $allowed_actions ) ) {
				return;
			}

			// Security check
			check_admin_referer( 'bulk-posts' );

			// Make sure IDs are submitted
			if ( isset( $_REQUEST['post'] ) && is_array( $_REQUEST['post'] ) ) {
				$post_ids = array_map( 'intval', $_REQUEST['post'] );

				foreach ( $post_ids as $post_id ) {
					$order = wc_get_order( $post_id );
					if ( $order ) {
						$order->update_status( 'shipped', __( 'Order marked as shipped via bulk action.', 'nova-b2b' ) );
					}
				}
			}
		}
	}

	/**
	 * Add custom CSS to style the 'shipped' status in the admin orders list.
	 */
	public function add_shipped_order_status_style() {
		echo '<style>
            .order-status.status-shipped {
                background: #3498db;
                color: white;
            }
        </style>';
	}

	/**
	 * Include 'shipped' status in WooCommerce reports.
	 *
	 * @param array $statuses Existing report statuses.
	 * @return array Modified report statuses.
	 */
	public function include_shipped_in_reports( $statuses ) {
		$statuses[] = 'shipped';
		return $statuses;
	}
}

Order_Shipped::get_instance();
