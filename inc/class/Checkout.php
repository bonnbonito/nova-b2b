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
		add_action( 'woocommerce_review_order_after_order_total', array( $this, 'add_po_number_checkout_field' ) );
		add_action( 'woocommerce_checkout_update_order_meta', array( $this, 'save_po_number_checkout_field' ) );
		add_filter( 'woocommerce_email_order_meta_fields', array( $this, 'add_po_number_to_order_emails' ), 10, 3 );
		add_action( 'woocommerce_admin_order_totals_after_tax', array( $this, 'add_po_number' ) );
		add_filter( 'woocommerce_get_order_item_totals', array( $this, 'add_po_number_row' ), 30, 2 );
	}

	public function add_po_number_row( $total_rows, $order ) {
		$po_number = get_post_meta( $order->get_id(), '_po_number', true );

		if ( $po_number ) {
			$total_rows['po_number'] = array(
				'label' => __( 'PO#' ),
				'value' => $po_number,
			);
		}

		return $total_rows;
	}

	public function add_po_number( $order_id ) {
		$po_number = get_post_meta( $order_id, '_po_number', true );

		if ( $po_number ) {
			?>
<tr>
	<td class="label"><?php echo 'PO#'; ?>:</td>
	<td width="1%"></td>
	<td class="po_number">
		<strong><?php echo $po_number; ?></strong>
	</td>
</tr>
			<?php
		}
	}

	public function add_po_number_to_order_emails( $fields, $sent_to_admin, $order ) {
		$po_number = get_post_meta( $order->get_id(), '_po_number', true );
		if ( $po_number ) {
			$fields['po_number'] = array(
				'label' => __( 'PO#' ),
				'value' => $po_number,
			);
		}

		return $fields;
	}

	public function save_po_number_checkout_field( $order_id ) {
		if ( ! empty( $_POST['po_number'] ) ) {
			update_post_meta( $order_id, '_po_number', sanitize_text_field( $_POST['po_number'] ) );
		}
	}

	public function add_po_number_checkout_field() {
		echo '<tr class="po_number_checkout_field"><th></th><td colspan="2"><div class="po-wrap flex gap-4 justify-end items-center"><h4 class="mb-0">PO#</h4>';

		woocommerce_form_field(
			'po_number',
			array(
				'type'        => 'text',
				'class'       => array( 'form-row-wide' ),
				'label'       => false, // Remove the label inside the table row
				'placeholder' => __( 'Enter your PO number' ),
			),
			WC()->checkout->get_value( 'po_number' )
		);

		echo '</div></td></tr>';
	}
}
