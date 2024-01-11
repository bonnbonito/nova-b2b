<?php

namespace NOVA_B2B\INC\CLASSES;

use WP_Query;
use Kadence\Theme;
use WC;

class Woocommerce {
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
		// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_specs' ), 10 );
		add_action( 'nova_product_specs', array( $this, 'nova_product_faqs' ), 11 );
		add_filter( 'woocommerce_get_query_vars', array( $this, 'add_mockups_endpoint_query_var' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'add_mockups_link_my_account' ) );
		add_filter( 'woocommerce_account_menu_items', array( $this, 'add_mockups_endpoints' ) );
		add_action( 'woocommerce_account_mockups_endpoint', array( $this, 'add_mockups_content' ) );
		add_action( 'woocommerce_account_mockups-drafts_endpoint', array( $this, 'mockups_drafts_content' ) );
		add_action( 'woocommerce_account_mockups-processing_endpoint', array( $this, 'mockups_processing_content' ) );
		add_action( 'woocommerce_account_mockups-payments_endpoint', array( $this, 'mockups_payments_content' ) );
		add_action( 'woocommerce_account_mockups-view_endpoint', array( $this, 'mockups_view_content' ) );
		add_filter( 'woocommerce_endpoint_mockups_title', array( $this, 'mockups_endpoint_title' ), 10, 2 );
		add_action( 'init', array( $this, 'add_nested_mockups_rewrite_rules' ) );
		add_action( 'nova_account_navigation', array( $this, 'nova_account_navigation' ) );
		add_action( 'nova_inner_account_nav', array( $this, 'myaccount_nav_avatar' ) );
		add_action( 'woocommerce_account_content', array( $this, 'nova_account_title' ), 5 );
		add_filter( 'woocommerce_add_cart_item_data', array( $this, 'nova_add_to_cart_meta' ), 10, 3 );
		add_filter( 'woocommerce_cart_item_name', array( $this, 'nova_change_product_name' ), 10, 3 );
		add_filter( 'woocommerce_cart_item_thumbnail', array( $this, 'remove_thumbnail_for_nova_product' ), 10, 3 );
		add_action( 'woocommerce_before_calculate_totals', array( $this, 'nova_custom_price_refresh' ) );
		add_action( 'woocommerce_after_cart_item_name', array( $this, 'nova_quote_display_signage' ), 20, 2 );
		add_action( 'woocommerce_order_item_name', array( $this, 'nova_quote_order_name' ), 10, 3 );
		add_action( 'woocommerce_checkout_create_order_line_item', array( $this, 'nova_create_order_line_item' ), 10, 4 );
		// add_action( 'woocommerce_order_item_meta_end', array( $this, 'woocommerce_order_item_meta_end' ), 10, 4 );
		// add_action( 'woocommerce_before_order_itemmeta', array( $this, 'nova_order_item_meta' ), 10, 3 );
		add_filter( 'woocommerce_order_item_class', array( $this, 'nova_woocommerce_order_item_class' ), 10, 3 );
		add_filter( 'woocommerce_hidden_order_itemmeta', array( $this, 'nova_hidden_order_itemmeta' ) );
		add_action( 'woocommerce_before_order_itemmeta', array( $this, 'nova_before_order_itemmeta' ), 10, 3 );
		add_filter( 'woocommerce_display_item_meta', array( $this, 'nova_display_item_meta' ), 10, 3 );
		add_action( 'woocommerce_checkout_order_created', array( $this, 'nova_checkout_order_created' ), 10, 1 );
		add_action( 'after_setup_theme', array( $this, 'edit_cart_summary_title' ) );
		add_action( 'woocommerce_cart_actions', array( $this, 'update_quantity_script' ) );
		add_action( 'woocommerce_after_add_to_cart_button', array( $this, 'update_single_quantity_script' ) );
		add_action( 'woocommerce_before_cart', array( $this, 'edit_cart_form_wrap_before' ), 1 );
		add_action( 'woocommerce_checkout_after_customer_details', array( $this, 'remove_checkout_coupon_form' ), 10 );
		add_filter( 'woocommerce_cart_totals_order_total_html', array( $this, 'woocommerce_cart_totals_order_total_html' ) );
		add_filter( 'woocommerce_endpoint_order-received_title', array( $this, 'order_received_title' ), 20, 2 );
		add_filter( 'woocommerce_thankyou_order_received_text', array( $this, 'woocommerce_thankyou_order_received_text' ) );
		add_shortcode( 'product_features', array( $this, 'product_features' ) );
		add_shortcode( 'product_dropdown_nav', array( $this, 'product_dropdown_nav' ) );
		add_action( 'woocommerce_before_single_product', array( $this, 'show_product_dropdown_nav' ) );
		add_action( 'woocommerce_edit_account_form', array( $this, 'my_account_billing_shipping_fields' ), 5 );
		add_action( 'woocommerce_save_account_details', array( $this, 'save_my_account_billing_shipping_fields' ) );
	}

	public function product_dropdown_nav() {
		ob_start();
		?>
<div class="md:flex md:gap-10 p-dropdown-wrap mb-24 mt-10">
    <div class="p-dropdown cursor-pointer mb-4 md:mb-0">
        <div id="productCat" class="p-dropdown-current overflow-hidden">
            <div id="productCatCurrent"><img
                    src="<?php echo get_stylesheet_directory_uri() . '/assets/img/p-icon.png'; ?>">
                Acrylic</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                <path d="M13.3516 2L7.8861 6.54054L2.00021 2" stroke="black" stroke-width="2" stroke-linecap="square"
                    stroke-linejoin="round" />
            </svg>
        </div>
        <div id="productCat-list">

        </div>
    </div>

    <div class="p-dropdown cursor-pointer">
        <div id="novaProduct" class="p-dropdown-current overflow-hidden">
            <div id="novaProductCurrent"><img
                    src="<?php echo get_stylesheet_directory_uri() . '/assets/img/p-icon.png'; ?>">
                <span class="truncate"><?php the_title(); ?></span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                <path d="M13.3516 2L7.8861 6.54054L2.00021 2" stroke="black" stroke-width="2" stroke-linecap="square"
                    stroke-linejoin="round" />
            </svg>
        </div>
        <div id="novaProduct-list">

        </div>
    </div>

</div>
<?php
		return ob_get_clean();
	}

	public function show_product_dropdown_nav() {
		echo do_shortcode( '[product_dropdown_nav]' );
	}

	public function product_features() {
		ob_start();
		if ( have_rows( 'features' ) ) :
			?>
<div class="md:flex justify-between product-features-icons gap-12">
    <?php
			while ( have_rows( 'features' ) ) :
				the_row();
				$image = get_sub_field( 'icon' );
				?>
    <div class="text-center md:mb-0 mb-[40px]">
        <div class="img-wrap h-[55px]">
            <img class="mx-auto" src="<?php echo esc_url( $image['url'] ); ?>"
                alt="<?php echo esc_attr( $image['alt'] ); ?>" />
        </div>
        <h5 class="uppercase tracking-[1.8px] mt-9"><?php the_sub_field( 'name' ); ?></h5>
    </div>
    <?php endwhile; ?>
</div>

<?php
		endif;
		return ob_get_clean();
	}

	public function woocommerce_thankyou_order_received_text( $text ) {
		return 'Your payment is being processed.';
	}

	public function order_received_title( $title, $order_id ) {
		return 'Thank You!';
	}

	public function woocommerce_cart_totals_order_total_html( $value ) {
		$value = preg_replace( '/<strong\b[^>]*>(.*?)<\/strong>/', '$1', $value );
		return $value;
	}

	public function remove_checkout_coupon_form() {
		remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );
	}

	public function update_quantity_script() {
		?>
<script>
function initializeQuantityButtons() {
    const cartForm = document.querySelector('form.woocommerce-cart-form');
    const updateCartButton = document.querySelector('button[name="update_cart"]');
    const quantityChanges = document.querySelectorAll('.quantity-change');

    quantityChanges.forEach(q => {
        const decrease = q.querySelector('.decrease');
        const increase = q.querySelector('.increase');
        const input = q.querySelector('input.qty');

        // Remove existing event listeners
        increase.removeEventListener('click', increaseClickListener);
        decrease.removeEventListener('click', decreaseClickListener);

        // Add new event listeners
        increase.addEventListener('click', increaseClickListener);
        decrease.addEventListener('click', decreaseClickListener);

        function increaseClickListener(e) {
            increaseHandler(e, input);
        }

        function decreaseClickListener(e) {
            decreaseHandler(e, input);
        }
    });

    function increaseHandler(e, input) {
        e.preventDefault();
        let currentValue = parseInt(input.value, 10);
        input.value = currentValue + 1;
        updateCartButton.disabled = false;
    }

    function decreaseHandler(e, input) {
        e.preventDefault();
        let currentValue = parseInt(input.value, 10);
        if (currentValue > 1) {
            input.value = currentValue - 1;
            updateCartButton.disabled = false;
        }
    }
}


document.addEventListener('DOMContentLoaded', initializeQuantityButtons);
jQuery(document.body).on('updated_cart_totals', initializeQuantityButtons);
</script>
<?php
	}


	public function update_single_quantity_script() {
		global $product;
		?>
<script>
function initializeQuantityButtons() {
    const quantityChanges = document.querySelectorAll('.quantity-change');
    const currentPrice = '<?php echo $product->get_price(); ?>';
    const currencySymbol = '<?php echo get_woocommerce_currency_symbol(); ?>';

    function computePrice(qty) {

        let computeprice = qty * parseFloat(currentPrice);
        console.log(computeprice);
        computeprice = computeprice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById("watchPrice").innerHTML = currencySymbol + computeprice;

    }


    quantityChanges.forEach(q => {
        const decrease = q.querySelector('.decrease');
        const increase = q.querySelector('.increase');
        const input = q.querySelector('input.qty');

        // Remove existing event listeners
        increase.removeEventListener('click', increaseClickListener);
        decrease.removeEventListener('click', decreaseClickListener);

        // Add new event listeners
        increase.addEventListener('click', increaseClickListener);
        decrease.addEventListener('click', decreaseClickListener);



        function increaseClickListener(e) {
            increaseHandler(e, input);
        }

        function decreaseClickListener(e) {
            decreaseHandler(e, input);
        }
    });

    function increaseHandler(e, input) {
        e.preventDefault();
        let currentValue = parseInt(input.value, 10);
        input.value = currentValue + 1;

        console.log(input.value);

        computePrice(input.value);


    }

    function decreaseHandler(e, input) {
        e.preventDefault();
        let currentValue = parseInt(input.value, 10);
        if (currentValue > 1) {
            input.value = currentValue - 1;
            computePrice(input.value)
        }
        console.log(input.value);
    }
}

document.addEventListener('DOMContentLoaded', initializeQuantityButtons);
</script>
<?php
	}



	public function edit_cart_summary_title() {
		$kadence_theme_class = \Kadence\Theme::instance();
		remove_action( 'woocommerce_before_cart_table', array( $kadence_theme_class->components['woocommerce'], 'cart_summary_title' ) );
		add_action(
			'woocommerce_before_cart_table',
			function () {
				echo '<div class="cart-summary"><h2>' . esc_html__( 'PRODUCTS', 'kadence' ) . '</h2></div>';
			}
		);
	}

	public function edit_cart_form_wrap_before() {
		$kadence_theme_class = \Kadence\Theme::instance();
		remove_action( 'woocommerce_before_cart', array( $kadence_theme_class->components['woocommerce'], 'cart_form_wrap_before' ) );
		add_action(
			'woocommerce_before_cart',
			function () {
				echo '<div class="nova-woo-cart-form-wrap">';
			}
		);
	}

	public function nova_checkout_order_created( $order ) {
		$items = $order->get_items();

		foreach ( $items as $item_id => $item ) {
			$signage  = $item->get_meta( 'signage' );
			$quote_id = $item->get_meta( 'quote_id' );
			if ( ! empty( $signage ) && isset( $quote_id ) ) {
				wp_delete_post( $quote_id );
			}
		}
	}

	public function nova_display_item_meta( $html, $item, $args ) {
		if ( $item['signage'] ) {
			return '';
		}
		return $html;
	}

	public function nova_quote_order_name( $title, $item, $visible ) {
		if ( $item['nova_title'] ) {
			$title = $item['nova_title'];
		}
		return $title;
	}

	public function nova_before_order_itemmeta( $item_id, $item, $product ) {
		if ( isset( $item['signage'] ) && isset( $item['nova_title'] ) ) {
			echo '<p style="font-size: 16px;">Quote Name: <strong>' . $item['nova_title'] . '</strong></p>';
			echo $this->generate_html_table_from_array( $item['signage'], $item['product'] );
			if ( isset( $item['nova_note'] ) ) {
				echo '<p><strong>NOTE:</strong><br>' . $item['nova_note'] . '</p>';
			}
			if ( isset( $item['quote_id'] ) ) {
				echo '<p><strong>Quote ID:</strong> ' . $item['quote_id'] . '</p>';
			}
			if ( isset( $item['signage'] ) ) {
				echo '<p><strong>Product:</strong> ' . get_the_title( $item['signage'][0]->product ) . '</p>';
			}
		}
	}

	public function nova_hidden_order_itemmeta( $array ) {
		$array[] = 'nova_title';
		$array[] = 'quote_id';
		$array[] = 'nova_note';
		return $array;
	}


	public function nova_woocommerce_order_item_class( $class, $item, $order ) {
		if ( $item->get_meta( 'signage' ) ) {
			$class .= ' nova-signage';
		}
		return $class;
	}

	public function nova_order_item_meta( $item_id, $item, $product ) {
		if ( is_admin() && $item->get_type() === 'line_item' ) {
			$nova_title = wc_get_order_item_meta( $item_id, 'nova_title', true );
			if ( ! empty( $nova_title ) ) {
				// Directly update the order item name in the database
				global $wpdb;
				$wpdb->update(
					$wpdb->prefix . 'woocommerce_order_items',
					array( 'order_item_name' => $nova_title ),
					array( 'order_item_id' => $item_id )
				);
			}
		}
	}

	public function nova_create_order_line_item( $item, $cart_item_key, $values, $order ) {
		if ( isset( $values['nova_quote'] ) && ! empty( $values['nova_title'] ) ) {
			$item->add_meta_data( 'nova_title', $values['nova_title'] );
			$item->add_meta_data( 'signage', $values['signage'] );
			$item->add_meta_data( 'quote_id', $values['quote_id'] );
			$item->add_meta_data( 'product', $values['quote_id'] );

			if ( isset( $values['nova_note'] ) && ! empty( $values['nova_note'] ) ) {
				$item->add_meta_data( 'nova_note', $values['nova_note'] );
			}
		}
	}

	public function woocommerce_order_item_meta_end( $item_id, $item, $order, $bool ) {

		if ( $item->get_meta( 'signage' ) ) {
			echo $this->generate_html_table_from_array( $item->get_meta( 'signage' ), $item->get_meta( 'product' ) );
		}
		if ( $item->get_meta( 'nova_note' ) ) {
				echo '<p><strong>NOTE:</strong><br>' . $item->get_meta( 'nova_note' ) . '</p>';
		}
	}

	public function note_order_name( $name, $item ) {
		$nova_title = $item->get_meta( 'nova_title' );
		if ( ! empty( $nova_title ) ) {
			return $nova_title;
		}

		return $name;
	}

	public function nova_quote_display_signage( $cart_item, $cart_item_key ) {
		if ( isset( $cart_item['signage'] ) && $cart_item['nova_title'] ) {
			if ( is_admin() ) {
				echo '<p>' . $cart_item['nova_title'] . '</p>';
			}

			echo $this->generate_html_table_from_array( $cart_item['signage'], $cart_item['product'] );

			if ( isset( $cart_item['nova_note'] ) && ! empty( $cart_item['nova_note'] ) ) {
				echo '<p>NOTE:<br>' . $cart_item['nova_note'] . '</p>';
			}
		}
	}

	public function generate_html_table_from_array( $array, $product ) {
		$html = '<h6>Projects</h6>';

		foreach ( $array as $object ) {

			$html .= '<div style="padding: 10px; border: 1pxz solid #d2d2d2 !important;">';

			// Each property of the object gets its own row

			$html .= '<p style="font-size: 125%; margin-bottom: 8px;">' . htmlspecialchars( $object->title ) . '</p>';

			$html .= '<p>';
			if ( isset( $object->type ) && ! empty( $object->type ) ) {
				$html .= '<strong>Type: </strong>' . htmlspecialchars( $object->type ) . '<br>';
			}

			if ( isset( $object->width ) && ! empty( $object->width ) ) {
				$html .= '<strong>Width: </strong>' . htmlspecialchars( $object->width ) . '<br>';
			}

			if ( isset( $object->height ) && ! empty( $object->height ) ) {
				$html .= '<strong>Height: </strong>' . htmlspecialchars( $object->height ) . '<br>';
			}

			if ( isset( $object->letters ) && ! empty( $object->letters ) ) {
				$html .= '<strong>Letters: </strong>' . htmlspecialchars( $object->letters ) . '<br>';
			}
			if ( isset( $object->mounting ) && ! empty( $object->mounting ) ) {
				$html .= '<strong>Mounting: </strong>' . htmlspecialchars( $object->mounting ) . '<br>';
			}
			if ( isset( $object->font ) && ! empty( $object->font ) ) {
				$html .= '<strong>Font: </strong>' . htmlspecialchars( $object->font ) . '<br>';
			}
			if ( isset( $object->waterproof ) && ! empty( $object->waterproof ) ) {
				$html .= '<strong>Environment: </strong>' . htmlspecialchars( $object->waterproof ) . '<br>';
			}
			if ( isset( $object->thickness ) && ! empty( $object->thickness ) ) {
				$html .= '<strong>Thickness: </strong>' . htmlspecialchars( $object->thickness->thickness ) . '<br>';
			}
			if ( isset( $object->color->name ) && ! empty( $object->color->name ) ) {
				$html .= '<strong>Color: </strong>' . htmlspecialchars( $object->color->name ) . '<br>';
			}
			if ( isset( $object->letterHeight ) && ! empty( $object->letterHeight ) ) {
				$html .= '<strong>Letter Height: </strong>' . htmlspecialchars( $object->letterHeight ) . '<br>';
			}
			if ( isset( $object->finishing ) && ! empty( $object->finishing ) ) {
				$html .= '<strong>Finishing: </strong>' . htmlspecialchars( $object->finishing ) . '<br>';
			}

			if ( isset( $object->file ) && ! empty( $object->file ) ) {
				$html .= '<strong>File: </strong>' . htmlspecialchars( $object->file ) . '<br>';
			}

			$html .= '</div>';

		}

		return $html;
	}

	public function generate_html_table_from_array2( $array, $product ) {
		$html = '<h6>Projects</h6>';

		foreach ( $array as $object ) {

			$html .= '<table border="1" style="margin-bottom: 20px !important; border-collapse: collapse; border-color: #d5d5d5 !important; margin-bottom: 10px;">';

			// Each property of the object gets its own row
			$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important; width: 50%;">Type</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important; width: 50%; text-transform: uppercase;
			">' . htmlspecialchars( $object->type ) . '</td></tr>';

			$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Title</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->title ) . '</td></tr>';

			if ( isset( $object->width ) && ! empty( $object->width ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Width</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->width ) . '</td></tr>';
			}

			if ( isset( $object->height ) && ! empty( $object->height ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Height</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->height ) . '</td></tr>';
			}

			if ( isset( $object->letters ) && ! empty( $object->letters ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Letters</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->letters ) . '</td></tr>';
			}
			if ( isset( $object->mounting ) && ! empty( $object->mounting ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Mounting</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->mounting ) . '</td></tr>';
			}
			if ( isset( $object->font ) && ! empty( $object->font ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Font</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->font ) . '</td></tr>';
			}
			if ( isset( $object->waterproof ) && ! empty( $object->waterproof ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Environment</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->waterproof ) . '</td></tr>';
			}
			if ( isset( $object->thickness ) && ! empty( $object->thickness ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Thickness</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->thickness->thickness ) . '</td></tr>';
			}
			if ( isset( $object->color->name ) && ! empty( $object->color->name ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Color</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->color->name ) . '</td></tr>';
			}
			if ( isset( $object->letterHeight ) && ! empty( $object->letterHeight ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Letter Height</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->letterHeight ) . '</td></tr>';
			}
			if ( isset( $object->height ) && ! empty( $object->finishing ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">Finishing</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->finishing ) . '</td></tr>';
			}

			if ( isset( $object->file ) && ! empty( $object->file ) ) {
				$html .= '<tr><th style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">File</th><td style="padding: 10px !important; border: 1px solid #d5d5d5 !important;">' . htmlspecialchars( $object->file ) . '</td></tr>';
			}

			$html .= '</table>';

		}

		return $html;
	}

	public function nova_custom_price_refresh( $cart_object ) {

		foreach ( $cart_object->get_cart() as $item ) {

			if ( array_key_exists( 'usd_price', $item ) && array_key_exists( 'nova_quote', $item ) ) {

				$item['data']->set_price( $item['usd_price'] );
			}
		}
	}
	public function remove_thumbnail_for_nova_product( $thumbnail, $cart_item, $cart_item_key ) {
		$product = $cart_item['data'];
		if ( is_a( $product, 'WC_Product' ) && $product->is_type( 'nova_quote' ) ) {
			return '';
		}

		return $thumbnail;
	}

	public function nova_change_product_name( $title, $cart_item, $cart_item_key ) {
		if ( isset( $cart_item['nova_title'] ) ) {
			$title = $cart_item['nova_title'];
		}
		return $title;
	}

	public function nova_add_to_cart_meta( $cart_item_data, $product_id, $variation_id ) {
		if ( get_field( 'nova_quote_product', 'option' )->ID === $product_id && isset( $_POST['nova_title'] ) && isset( $_POST['quote_id'] ) ) {
			$cart_item_data['nova_title'] = sanitize_text_field( $_POST['nova_title'] );
			$cart_item_data['signage']    = $_POST['signage'];
			$cart_item_date['quote_id']   = $_POST['quote_id'];
			$cart_item_date['product']    = $_POST['product'];
			$cart_item_date['nova_quote'] = true;
			if ( isset( $_POST['nova_note'] ) ) {
				$cart_item_date['nova_note'] = $_POST['nova_note'];
			}
		}
		return $cart_item_data;
	}

	public function nova_account_title() {
		$endpoint = WC()->query->get_current_endpoint();
		switch ( $endpoint ) {
			case 'downloads':
				$endpoint_title = 'Downloads';
				break;
			case 'orders':
				$endpoint_title = 'Orders';
				break;
			case 'mockups':
			case 'mockups-drafts':
			case 'mockups-processing':
			case 'mockups-payments':
			case 'mockups-view':
				$endpoint_title = 'Mockups';
				break;
			case 'edit-account':
				$endpoint_title = 'Account';
				break;
			default:
				$endpoint_title = 'Dashboard';
				break;
		}
		?>
<h2 class="pb-4 mb-4 uppercase mt-0"><?php echo $endpoint_title; ?></h2>
<?php
	}

	public function nova_account_navigation() {
		get_template_part( 'template-parts/my-account/navigation' );
	}

	public function mockups_view_content() {
		get_template_part( 'template-parts/my-account/view' );
	}

	public function add_nested_mockups_rewrite_rules() {
		add_rewrite_endpoint( 'mockups-drafts', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-processing', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-payments', EP_ROOT | EP_PAGES );
		add_rewrite_endpoint( 'mockups-view', EP_ROOT | EP_PAGES );
	}

	public function add_mockups_endpoints( $items ) {
		$new_items = array();

		foreach ( $items as $key => $value ) {
			$new_items[ $key ] = $value;

			if ( 'mockups' === $key ) {
				$new_items['mockups-drafts']     = 'Mockups Drafts';
				$new_items['mockups-payments']   = 'Mockups Payments';
				$new_items['mockups-processing'] = 'Mockups Processing';
				$new_items['mockups-view']       = 'View Mockup';
			}
		}

		return $new_items;
	}

	public function mockups_endpoint_title( $title, $endpoint ) {
		if ( $endpoint === 'mockups' ) {
			$title = 'Mockups';
		}
		return $title;
	}


	public function mockups_processing_content() {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'processing',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'   => 'nova_quote',
				'meta_query'  => $meta_query,
				'post_status' => 'publish',
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_drafts_content() {
		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'draft',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'   => 'nova_quote',
				'meta_query'  => $meta_query,
				'post_status' => 'publish',
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_payments_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
			array(
				'key'     => 'quote_status',
				'value'   => 'ready',
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'   => 'nova_quote',
				'meta_query'  => $meta_query,
				'post_status' => 'publish',
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function add_mockups_content() {

		$user_id = get_current_user_id();

		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'partner',
				'value'   => $user_id,
				'compare' => '=',
			),
		);

		$query = new WP_Query(
			array(
				'post_type'   => 'nova_quote',
				'meta_query'  => $meta_query,
				'post_status' => 'publish',
			)
		);

		$this->mockups_nav();

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				get_template_part( 'template-parts/quote' );
			}
			wp_reset_postdata();
		}
	}

	public function mockups_nav() {
		global $wp_query;
		?>
<div class="border-b font-title uppercase flex gap-6 md:gap-11 mb-8">
    <a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/all' ) ); ?>"
        class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/all'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">ALL
        Mockups</a>
    <a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/drafts' ) ); ?>"
        class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/drafts'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Drafts</a>
    <a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/processing' ) ); ?>"
        class="py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/processing'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Processing</a>
    <a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/payments' ) ); ?>"
        class="py-4 py-4 border-b-4 <?php echo ( isset( $wp_query->query_vars['mockups/payments'] ) ? 'border-black' : 'border-transparent' ); ?> mb-[-4px] text-black">Quoted</a>
</div>
<?php
	}

	public function add_mockups_link_my_account( $items ) {
		unset( $items['downloads'] );
		$items['mockups'] = 'Mockups'; // Add a new menu item for your endpoint.

		return $items;
	}

	public function add_mockups_endpoint_query_var( $vars ) {
		$vars['mockups']            = 'mockups/all';
		$vars['mockups-drafts']     = 'mockups/drafts';
		$vars['mockups-processing'] = 'mockups/processing';
		$vars['mockups-payments']   = 'mockups/payments';
		$vars['mockups-view']       = 'mockups/view';
		return $vars;
	}


	public function nova_product_specs() {
		if ( have_rows( 'tech_specs_group' ) ) :
			?>
<div class="nova_product_specs_group">
    <?php
			while ( have_rows( 'tech_specs_group' ) ) :
				the_row();
				?>
    <h2><?php the_sub_field( 'title' ); ?></h2>
    <?php
				if ( have_rows( 'specs' ) ) :
					?>
    <div class="spec-group">
        <?php
					while ( have_rows( 'specs' ) ) :
						the_row();
						?>
        <div class="spec-item">
            <div class="spec-label">
                <?php the_sub_field( 'name' ); ?>
            </div>
            <div class="spec-value">
                <?php the_sub_field( 'value' ); ?>
            </div>
        </div>

        <?php
						endwhile;
					?>
    </div>
    <?php
		endif;
				?>

    <?php endwhile; ?>
</div>
<?php
		endif;
	}

	public function nova_product_faqs() {
		if ( have_rows( 'faqs' ) ) {
			?>
<div id="faqItems" class="has-faq accordion">
    <h2 class="uppercase text-center mb-10">Frequently asked Questions</h2>
    <?php
			while ( have_rows( 'faqs' ) ) {
				the_row();
				?>
    <div class="faq-item visible">
        <p class="faq-question"><?php the_sub_field( 'question' ); ?> <svg width="14" height="14" viewBox="0 0 14 14"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="1" x2="7" y2="13" stroke="black" stroke-width="2" stroke-linecap="round">
                </line>
                <line x1="13" y1="7" x2="1" y2="7" stroke="black" stroke-width="2" stroke-linecap="round">
                </line>
            </svg></p>
        <div class="expander">
            <div class="expander-content">
                <div class="content-wrapper">
                    <?php if ( get_sub_field( 'answer' ) ) : ?>
                    <div class="post-content-container" style="padding-top: 2em;">
                        <?php the_sub_field( 'answer' ); ?>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <?php
			}
			?>
</div>
<?php
		}
	}

	public function myaccount_nav_avatar() {
		$current_user = wp_get_current_user();
		?>
<div class="kadence-account-avatar">
    <div class="kadence-customer-image">
        <a class="kt-link-to-gravatar" href="https://gravatar.com/" target="_blank" rel="no"
            title="<?php echo esc_attr__( 'Update Profile Photo', 'kadence' ); ?>">
            <?php echo get_avatar( $current_user->ID, 40, null, null, array( 'class' => array( 'rounded-full' ) ) ); ?>
        </a>
    </div>
</div>
<div class="kadence-customer-name">
    <h5 class="uppercase mt-2 mb-0 block"><?php echo esc_html( $current_user->display_name ); ?></h5>
    <div class="block text-[14px] text-black uppercase"><span class="font-title text-[12px]">BUSINESS ID:</span>
        <?php echo get_field( 'business_id', 'user_' . get_current_user_id() ); ?></div>
    <a href="<?php echo wp_logout_url( '/' ); ?>" class="text-black text-[10px]">LOG OUT</a>
</div>
<?php
	}

	public function show_details_order( $signage, $quoteID, $subtotal ) {
		ob_start();
		?>
<div id="quote-<?php echo $quoteID; ?>" style="display:none;max-width:550px; width: 100%;">
    <div class="pb-8 mb-8 border-b-nova-light border-b">
        <?php
		foreach ( $signage as $item ) {
			?>

        <div class="block">
            <div class="flex justify-between py-2 font-title uppercase">
                <?php echo $item->title; ?>
                <span>$<?php echo number_format( $item->usdPrice, 2 ); ?> USD</span>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">TYPE</div>
                <div class="text-left text-[10px] uppercase">
                    <?php echo $item->type; ?>
                </div>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">THICKNESS</div>
                <div class="text-left text-[10px] uppercase">
                    <?php echo $item->thickness->thickness; ?>
                </div>
            </div>

            <?php if ( $item->type === 'logo' ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">WIDTH</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->width; ?>"
                </div>
            </div>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">HEIGHT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->height; ?>"
                </div>
            </div>
            <?php
			endif;
			?>

            <?php if ( $item->type === 'letters' ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">LETTER HEIGHT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->letterHeight; ?>"
                </div>
            </div>
            <?php endif; ?>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">MOUNTING</div>
                <div class="text-left text-[10px]"><?php echo $item->mounting; ?></div>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">WATERPROOF</div>
                <div class="text-left text-[10px]"><?php echo $item->waterproof; ?></div>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">FINISHING</div>
                <div class="text-left text-[10px]"><?php echo $item->finishing; ?></div>
            </div>

            <?php if ( $item->type === 'letters' ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">COLOR</div>
                <div class="text-left text-[10px]"><?php echo $item->color->name; ?></div>
            </div>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">FONT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->font; ?>
                </div>
            </div>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">LINE TEXT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->letters; ?>
                </div>
            </div>
            <?php endif; ?>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">COMMENTS</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->comments; ?>
                </div>
            </div>
            <?php if ( ! empty( $item->file ) ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">FILE</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->fileName; ?>
                </div>
            </div>
            <?php endif; ?>
        </div>


        <?php
		}
		?>
    </div>
    <h6 class="uppercase flex">Subtotal: <span class="ml-auto"><?php echo $subtotal; ?></span></h6>
</div>
<?php
			echo ob_get_clean();
	}

	public function show_details( $signage, $quoteID ) {
		ob_start();
		?>
<div id="quote-<?php echo $quoteID; ?>" style="display:none;max-width:550px; width: 100%;">
    <div class="pb-8 mb-8 border-b-nova-light border-b">
        <?php
		foreach ( $signage as $item ) {
			?>

        <div class="block">
            <div class="flex justify-between py-2 font-title uppercase">
                <?php echo $item->title; ?>
                <span>$<?php echo number_format( $item->usdPrice, 2 ); ?> USD</span>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">TYPE</div>
                <div class="text-left text-[10px] uppercase">
                    <?php echo $item->type; ?>
                </div>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">THICKNESS</div>
                <div class="text-left text-[10px] uppercase">
                    <?php echo $item->thickness->thickness; ?>
                </div>
            </div>

            <?php if ( $item->type === 'logo' ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">WIDTH</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->width; ?>"
                </div>
            </div>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">HEIGHT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->height; ?>"
                </div>
            </div>
            <?php
			endif;
			?>

            <?php if ( $item->type === 'letters' ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">LETTER HEIGHT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->letterHeight; ?>"
                </div>
            </div>
            <?php endif; ?>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">MOUNTING</div>
                <div class="text-left text-[10px]"><?php echo $item->mounting; ?></div>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">WATERPROOF</div>
                <div class="text-left text-[10px]"><?php echo $item->waterproof; ?></div>
            </div>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">FINISHING</div>
                <div class="text-left text-[10px]"><?php echo $item->finishing; ?></div>
            </div>

            <?php if ( $item->type === 'letters' ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">COLOR</div>
                <div class="text-left text-[10px]"><?php echo $item->color->name; ?></div>
            </div>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">FONT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->font; ?>
                </div>
            </div>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">LINE TEXT</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->letters; ?>
                </div>
            </div>
            <?php endif; ?>

            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">COMMENTS</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->comments; ?>
                </div>
            </div>
            <?php if ( ! empty( $item->file ) ) : ?>
            <div class="grid grid-cols-2 py-[2px]">
                <div class="text-left text-xs font-title">FILE</div>
                <div class="text-left text-[10px] break-words">
                    <?php echo $item->fileName; ?>
                </div>
            </div>
            <?php endif; ?>
        </div>


        <?php
		}
		?>
    </div>
</div>
<?php
			echo ob_get_clean();
	}

	public function my_account_billing_shipping_fields() {
		$customer_id = get_current_user_id();

		if ( ! $customer_id ) {
			return;
		}

		$customer = new \WC_Customer( $customer_id );

		// Combine billing and shipping fields
		$fields = array_merge(
			WC()->countries->get_address_fields( '', 'billing_' ),
			WC()->countries->get_address_fields( '', 'shipping_' )
		);

		foreach ( $fields as $key => $field ) {
			// Use specific methods for billing and shipping fields
			if ( strpos( $key, 'billing_' ) === 0 ) {
				$value = $customer->{'get_billing_' . substr( $key, 8 )}();
			} elseif ( strpos( $key, 'shipping_' ) === 0 ) {
				$value = $customer->{'get_shipping_' . substr( $key, 9 )}();
			} else {
				$value = get_user_meta( $customer_id, $key, true );
			}

			woocommerce_form_field( $key, $field, $value );
		}
	}

	public function save_my_account_billing_shipping_fields( $customer_id ) {
		$customer = new \WC_Customer( $customer_id );

		// Saving billing fields
		foreach ( WC()->countries->get_address_fields( '', 'billing_' ) as $key => $field ) {
			if ( isset( $_POST[ $key ] ) ) {
				$customer->{'set_billing_' . substr( $key, 8 )}( sanitize_text_field( $_POST[ $key ] ) );
			}
		}

		// Saving shipping fields
		foreach ( WC()->countries->get_address_fields( '', 'shipping_' ) as $key => $field ) {
			if ( isset( $_POST[ $key ] ) ) {
				$customer->{'set_shipping_' . substr( $key, 9 )}( sanitize_text_field( $_POST[ $key ] ) );
			}
		}

		// Save the data
		$customer->save();
	}
}

Woocommerce::get_instance();