<?php

namespace NOVA_B2B;

use function wc_get_order;

class Pending_Orders {
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
		add_action( 'woocommerce_order_note_added', array( $this, 'change_status_on_shipstation_note' ), 10, 2 );
		add_action( 'save_post_shop_order', array( $this, 'save_nova_order_update_metabox' ), 10, 1 );
		add_action( 'add_meta_boxes', array( $this, 'add_needs_order_update_metabox' ) );
		add_action( 'woocommerce_shipstation_shipnotify', array( $this, 'shipstation_order_update_to_shipped' ), 10, 2 );
	}

	public function order_update_to_production( $order_id ) {
		wp_mail( get_option( 'admin_email' ), 'Nova Order Update', 'Order has been updated to production' );
	}

	public function order_update_to_shipped( $order_id ) {
		$order         = wc_get_order( $order_id );
		$needs_payment = $order->get_meta( 'needs_payment' );
		if ( $needs_payment ) {
			wp_mail( get_option( 'admin_email' ), 'Nova Order Update', 'Order has been updated to shipped' );
		}
	}

	public function shipstation_order_update_to_shipped( $order, $details ) {
		$order->update_meta_data( 'nova_order_update', 'shipped' );
		$order->save_meta_data();
		$order_id = $order->get_id();
		do_action( 'nova_order_update_shipped', $order_id );
	}

	public function add_needs_order_update_metabox() {
		global $post;

		$deposit_chosen = get_post_meta( $post->ID, '_deposit_chosen', true );

		if ( ! $deposit_chosen ) {
			// If it doesn't, don't display the metabox
			return;
		}

		add_meta_box(
			'nova_order_update', // Unique ID
			__( 'Order Update', 'woocommerce' ), // Title
			array( $this, 'nova_order_update_callback' ), // Callback
			'shop_order', // Post type
			'side', // Context
			'high' // Priority
		);
	}

	public function nova_order_update_callback( $post ) {

		wp_nonce_field( 'nova_order_update_metabox', 'nova_order_update_metabox_nonce' );

		// Retrieve the current value of the meta field
		$order_update = get_post_meta( $post->ID, 'nova_order_update', true );

		?>
<p>
	<label for="nova_order_update">
		<?php _e( 'Current Update', 'woocommerce' ); ?>
	</label>
	<select name="nova_order_update" id="nova_order_update">
		<option value="" <?php selected( $order_update, '' ); ?>>
			<?php _e( '-- Select Status --', 'woocommerce' ); ?>
		</option>
		<option value="production" <?php selected( $order_update, 'production' ); ?>>
			<?php _e( 'Production', 'woocommerce' ); ?>
		</option>
		<option value="shipped" <?php selected( $order_update, 'shipped' ); ?>>
			<?php _e( 'Shipped', 'woocommerce' ); ?>
		</option>
	</select>
</p>
		<?php
	}

	public function save_nova_order_update_metabox( $post_id ) {

		// Check if our nonce is set
		if ( ! isset( $_POST['nova_order_update_metabox_nonce'] ) ) {
			return $post_id;
		}

		$nonce = $_POST['nova_order_update_metabox_nonce'];

		// Verify that the nonce is valid
		if ( ! wp_verify_nonce( $nonce, 'nova_order_update_metabox' ) ) {
			return $post_id;
		}

		// Check the user's permissions
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		// Avoid autosave and revisions
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return $post_id;
		}

		// Ensure we are working with the 'shop_order' post type
		if ( 'shop_order' !== get_post_type( $post_id ) ) {
			return $post_id;
		}

		// Sanitize user input
		$new_meta_value = ( isset( $_POST['nova_order_update'] ) ) ? sanitize_text_field( $_POST['nova_order_update'] ) : '';

		// Get the previous meta value
		$old_meta_value = get_post_meta( $post_id, 'nova_order_update', true );

		// Update the meta field in the database
		update_post_meta( $post_id, 'nova_order_update', $new_meta_value );

		// Trigger action only if the meta value has changed
		if ( $new_meta_value !== $old_meta_value ) {
			if ( ! empty( $new_meta_value ) ) {
				$order = wc_get_order( $post_id );
				if ( $order->has_status( 'processing' ) ) {
					do_action( 'nova_order_update_' . $new_meta_value, $post_id );
				}
			}
		}
	}

	public function change_status_on_shipstation_note( $comment_id, $order ) {
		$comment      = get_comment( $comment_id );
		$note_content = $comment->comment_content;

		if ( strpos( $note_content, 'Order has been exported to Shipstation' ) !== false ) {
			$order->update_meta_data( 'nova_order_update', 'production' );
			$order->save_meta_data();
			$order_id = $order->get_id();
			do_action( 'nova_order_update_production', $order_id );
		}
	}
}
