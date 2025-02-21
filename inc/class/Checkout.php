<?php

namespace NOVA_B2B;

class Checkout {
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
		// Add PO number field to checkout
		add_action( 'woocommerce_review_order_after_order_total', array( $this, 'add_po_number_checkout_field' ) );
		add_action( 'woocommerce_checkout_update_order_meta', array( $this, 'save_po_number_checkout_field' ) );

		// Display PO number in admin order totals and order emails
		add_action( 'woocommerce_admin_order_totals_after_tax', array( $this, 'add_po_number' ) );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'add_po_number_row' ), 30, 2 );

		// Add meta box in the order backend
		add_action( 'add_meta_boxes', array( $this, 'add_po_number_meta_box' ) );
		add_action( 'save_post_shop_order', array( $this, 'save_po_number_meta_box' ), 10, 1 );

		//add input fields to override price and shipping
		add_action( 'add_meta_boxes', array( $this, 'add_overrides_metabox' ) );
		add_action( 'save_post_shop_order', array( $this, 'save_override_meta_box' ), 10, 1 );
		add_filter( 'woocommerce_order_get_total', array( $this, 'override_total' ), 999, 2 );
		add_filter( 'woocommerce_order_get_total_tax', array( $this, 'override_tax' ), 99999, 2 );

		add_filter( 'wpo_wcpdf_woocommerce_totals', array( $this, 'override_pdf_totals' ), 20, 3 );

	}

	/**
	 * Add PO number to the order totals in emails and order view pages.
	 */
	public function add_po_number_row( $total_rows, $order ) {
		$po_number = get_post_meta( $order->get_id(), '_po_number', true );

		if ( $po_number ) {
			$total_rows['po_number'] = array(
				'label' => __( 'PO#', 'nova_b2b' ),
				'value' => esc_html( $po_number ),
			);
		}

		return $total_rows;
	}

	/**
	 * Display PO number in the admin order totals.
	 */
	public function add_po_number( $order_id ) {
		$po_number = get_post_meta( $order_id, '_po_number', true );

		if ( $po_number ) {
			?>
			<tr>
				<td class="label"><?php esc_html_e( 'PO#', 'nova_b2b' ); ?>:</td>
				<td width="1%"></td>
				<td class="po_number">
					<strong><?php echo esc_html( $po_number ); ?></strong>
				</td>
			</tr>
			<?php
		}
	}

	/**
	 * Save the PO number from the checkout field into order meta.
	 */
	public function save_po_number_checkout_field( $order_id ) {
		if ( ! empty( $_POST['po_number'] ) ) {
			update_post_meta( $order_id, '_po_number', sanitize_text_field( $_POST['po_number'] ) );
		}
	}

	/**
	 * Add a PO number field to the checkout page.
	 */
	public function add_po_number_checkout_field() {
		echo '<tr class="po_number_checkout_field"><th></th><td colspan="2"><div class="po-wrap flex gap-4 justify-end items-center"><h4 class="mb-0">' . esc_html__( 'PO#', 'nova_b2b' ) . '</h4>';

		woocommerce_form_field(
			'po_number',
			array(
				'type' => 'text',
				'class' => array( 'form-row-wide' ),
				'label' => false,
				'placeholder' => __( 'Enter your PO number', 'nova_b2b' ),
			),
			WC()->checkout->get_value( 'po_number' )
		);

		echo '</div></td></tr>';
	}

	/**
	 * Add a meta box to the order edit screen in the backend.
	 */
	public function add_po_number_meta_box() {
		add_meta_box(
			'nova_b2b_po_number',
			__( 'PO Number', 'nova_b2b' ),
			array( $this, 'display_po_number_meta_box' ),
			'shop_order',
			'side',
			'default'
		);
	}

	/**
	 * Summary of add_overrides_metabox
	 */
	public function add_overrides_metabox() {
		add_meta_box(
			'nova_b2b_po_number',
			__( 'Override Prices', 'nova_b2b' ),
			array( $this, 'display_overrides_meta_box' ),
			'shop_order',
			'side',
			'default'
		);
	}



	/**
	 * Display the PO number field in the meta box.
	 */
	public function display_po_number_meta_box( $post ) {
		$po_number = get_post_meta( $post->ID, '_po_number', true );
		wp_nonce_field( 'nova_b2b_save_po_number', 'nova_b2b_po_number_nonce' );

		echo '<p><label for="nova_b2b_po_number_field">' . esc_html__( 'PO#', 'nova_b2b' ) . ':</label></p>';
		echo '<p><input type="text" id="nova_b2b_po_number_field" name="nova_b2b_po_number_field" value="' . esc_attr( $po_number ) . '" /></p>';
	}

	/**
	 * Summary of display_overrides_meta_box
	 * @return void
	 */
	public function display_overrides_meta_box( $post ) {
		$price = get_post_meta( $post->ID, '_override_price', true );
		$item_price = get_post_meta( $post->ID, '_override_item_price', true );
		$shipping = get_post_meta( $post->ID, '_override_shipping', true );
		$tax = get_post_meta( $post->ID, '_override_tax', true );
		$tax_name = get_post_meta( $post->ID, '_override_tax_name', true );
		wp_nonce_field( 'nova_b2b_save_overrides', 'nova_b2b_overrides_nonce' );

		echo '<p><label for="nova_b2b_override_item_price">' . esc_html__( 'Override Item Price', 'nova_b2b' ) . ':</label></p>';
		echo '<p><input type="text" id="nova_b2b_override_item_price" name="nova_b2b_override_item_price" value="' . esc_attr( $item_price ) . '" /></p>';

		echo '<p><label for="nova_b2b_override_shipping">' . esc_html__( 'Override Shipping', 'nova_b2b' ) . ':</label></p>';
		echo '<p><input type="text" id="nova_b2b_override_shipping" name="nova_b2b_override_shipping" value="' . esc_attr( $shipping ) . '" /></p>';
		echo '<p><label for="nova_b2b_override_tax_name">' . esc_html__( 'Override Tax Name', 'nova_b2b' ) . ':</label></p>';
		echo '<p><input type="text" id="nova_b2b_override_tax_name" name="nova_b2b_override_tax_name" value="' . esc_attr( $tax_name ) . '" /></p>';
		echo '<p><label for="nova_b2b_override_tax">' . esc_html__( 'Override Total Tax', 'nova_b2b' ) . ':</label></p>';
		echo '<p><input type="text" id="nova_b2b_override_tax" name="nova_b2b_override_tax" value="' . esc_attr( $tax ) . '" /></p>';
		echo '<p><label for="nova_b2b_override_price">' . esc_html__( 'Override Total Price', 'nova_b2b' ) . ':</label></p>';
		echo '<p><input type="text" id="nova_b2b_override_price" name="nova_b2b_override_price" value="' . esc_attr( $price ) . '" /></p>';

	}

	/**
	 * Summary of save_override_meta_box
	 * @param mixed $post_id
	 * @return void
	 */
	public function save_override_meta_box( $post_id ) {
		// Verify nonce
		if ( ! isset( $_POST['nova_b2b_overrides_nonce'] ) || ! wp_verify_nonce( $_POST['nova_b2b_overrides_nonce'], 'nova_b2b_save_overrides' ) ) {
			return;
		}

		// Check user permissions
		if ( ! current_user_can( 'edit_shop_order', $post_id ) ) {
			return;
		}

		// Sanitize and save the override price
		if ( isset( $_POST['nova_b2b_override_price'] ) ) {
			update_post_meta( $post_id, '_override_price', sanitize_text_field( $_POST['nova_b2b_override_price'] ) );
		}
		if ( isset( $_POST['nova_b2b_override_shipping'] ) ) {
			update_post_meta( $post_id, '_override_shipping', sanitize_text_field( $_POST['nova_b2b_override_shipping'] ) );
		}
		if ( isset( $_POST['nova_b2b_override_tax'] ) ) {
			update_post_meta( $post_id, '_override_tax', sanitize_text_field( $_POST['nova_b2b_override_tax'] ) );
		}
		if ( isset( $_POST['nova_b2b_override_tax_name'] ) ) {
			update_post_meta( $post_id, '_override_tax_name', sanitize_text_field( $_POST['nova_b2b_override_tax_name'] ) );
		}
		if ( isset( $_POST['nova_b2b_override_item_price'] ) ) {
			update_post_meta( $post_id, '_override_item_price', sanitize_text_field( $_POST['nova_b2b_override_item_price'] ) );
		}
	}

	/**
	 * Summary of override_total
	 * @param mixed $and_taxes
	 * @param mixed $order
	 * @return void
	 */
	public function override_total( $total, $order ) {
		$override_price = $order->get_meta( '_override_price' );



		if ( $override_price ) {
			return $override_price;
		}

		return $total;
	}

	public function override_tax( $total, $order ) {
		$override_tax = $order->get_meta( '_override_tax' );

		if ( $override_tax ) {
			return $override_tax;
		}

		return $total;
	}

	public function override_shipping( $total, $order ) {
		$override_shipping = $order->get_meta( '_override_shipping' );

		if ( $override_shipping ) {
			return $override_shipping;
		}

		return $total;
	}

	/**
	 * Save the PO number when the order is updated in the backend.
	 */
	public function save_po_number_meta_box( $post_id ) {
		// Verify nonce
		if ( ! isset( $_POST['nova_b2b_po_number_nonce'] ) || ! wp_verify_nonce( $_POST['nova_b2b_po_number_nonce'], 'nova_b2b_save_po_number' ) ) {
			return;
		}

		// Check user permissions
		if ( ! current_user_can( 'edit_shop_order', $post_id ) ) {
			return;
		}

		// Sanitize and save the PO number
		if ( isset( $_POST['nova_b2b_po_number_field'] ) ) {
			update_post_meta( $post_id, '_po_number', sanitize_text_field( $_POST['nova_b2b_po_number_field'] ) );
		}
	}

	public function override_pdf_totals( $totals, $order, $type ) {
		$price = $order->get_meta( '_override_price' );
		$item_price = $order->get_meta( '_override_item_price' );
		$shipping = $order->get_meta( '_override_shipping' );
		$tax = $order->get_meta( '_override_tax' );
		$tax_name = $order->get_meta( '_override_tax_name' );
		if ( $price ) {
			$desired_keys = [ 
				'payment_select' => true,
			];

			$new_total = array_intersect_key( $totals, $desired_keys );

			if ( $item_price ) {
				$new_total['item_subtotal'] = array(
					'label' => 'Item Total',
					'value' => wc_price( $item_price )
				);
			}

			if ( $tax && $tax_name ) {
				$new_total['original_tax'] = array(
					'label' => $tax_name,
					'value' => wc_price( $tax )
				);
			}

			$new_total['order_total'] = array(
				'label' => 'Total',
				'value' => wc_price( $price )
			);



			return $new_total;
		}

		/** if completed order, add deposit and pending amounts	 */
		if ( $order->get_status() === 'completed' ) {
			$deposit_amount = $order->get_meta( '_deposit_amount' );
			$pending_amount = $order->get_meta( '_pending_amount' );

			if ( $deposit_amount && $pending_amount ) {

				$overall = $deposit_amount + $pending_amount;

				$totals['order_total'] = array(
					'label' => 'Total',
					'value' => wc_price( $overall )
				);


			}

		}

		return $totals;
	}
}