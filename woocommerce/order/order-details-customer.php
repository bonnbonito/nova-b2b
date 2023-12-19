<?php
/**
 * Order Customer Details
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/order-details-customer.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 5.6.0
 */

defined( 'ABSPATH' ) || exit;

$show_shipping = ! wc_ship_to_billing_address_only() && $order->needs_shipping_address();
?>
<div class="woocommerce-customer-details">

	<?php if ( $show_shipping ) : ?>

	<div class="woocommerce-columns woocommerce-columns--addresses addresses">
		<div class="woocommerce-column  woocommerce-column--billing-address mb-20">

			<?php endif; ?>

			<h4 class="woocommerce-column__title uppercase tracking-[2.4px] mb-9">
				<?php esc_html_e( 'Billing details', 'woocommerce' ); ?>
			</h4>

			<address class="border-none pl-0">

				<?php if ( get_field( 'business_id', 'user_' . $order->get_customer_id() ) ) : ?>
				<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
					<h6 class="uppercase tracking-[1.6px] mb-0">Business ID:</h6>
					<span
						class="text-sm"><?php echo get_field( 'business_id', 'user_' . $order->get_customer_id() ); ?></span>
				</div>
				<?php endif; ?>

				<?php if ( $order->get_billing_first_name() && $order->get_billing_last_name() ) : ?>
				<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
					<h6 class="uppercase tracking-[1.6px] mb-0">Name:</h6>
					<span
						class="text-sm"><?php echo $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(); ?></span>
				</div>
				<?php endif; ?>

				<?php
				if ( $order->get_billing_phone() ) :
					?>
				<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
					<h6 class="uppercase tracking-[1.6px] mb-0">Phone:</h6>
					<span class="text-sm"><?php echo $order->get_billing_phone(); ?></span>
				</div>
				<?php endif; ?>

				<?php
				$billing_address_1 = $order->get_billing_address_1();
				$billing_address_2 = $order->get_billing_address_2();
				$billing_city      = $order->get_billing_city();
				$billing_state     = $order->get_billing_state();
				$billing_postcode  = $order->get_billing_postcode();
				$billing_country   = $order->get_billing_country();
				$billing_address   = $billing_address_1;
				if ( ! empty( $billing_address_2 ) ) {
					$billing_address .= ', <br>' . $billing_address_2;
				}
				$billing_address .= ', ' . $billing_city;
				$billing_address .= ',<br> ' . $billing_state;
				$billing_address .= ', ' . $billing_postcode;
				$billing_address .= ', ' . $billing_country;
				?>

				<div class="grid grid-cols-[180px_1fr] items-start py-1 gap-10">
					<h6 class="uppercase tracking-[1.6px] mb-0">Billing Address:</h6>
					<address class="border-none p-0 text-sm"><?php echo $billing_address; ?></address>
				</div>

				<?php
				if ( $order->get_billing_email() ) :
					?>
				<div class="grid grid-cols-[180px_1fr] items-center py-1 gap-10">
					<h6 class="uppercase tracking-[1.6px] mb-0">Email:</h6>
					<span class="text-sm"><?php echo $order->get_billing_email(); ?></span>
				</div>
				<?php endif; ?>


			</address>

			<?php if ( $show_shipping ) : ?>

		</div><!-- /.col-1 -->

		<div class="woocommerce-column woocommerce-column--2 woocommerce-column--shipping-address col-2">
			<h4 class="woocommerce-column__title uppercase tracking-[2.4px] mb-9">
				<?php esc_html_e( 'Shipping details', 'woocommerce' ); ?>
			</h4>
			<address class="border-none pl-0">
				<?php echo wp_kses_post( $order->get_formatted_shipping_address( esc_html__( 'N/A', 'woocommerce' ) ) ); ?>

				<?php if ( $order->get_shipping_phone() ) : ?>
				<p class="woocommerce-customer-details--phone"><?php echo esc_html( $order->get_shipping_phone() ); ?>
				</p>
				<?php endif; ?>
			</address>
		</div><!-- /.col-2 -->

	</div><!-- /.col2-set -->

	<?php endif; ?>

	<?php do_action( 'woocommerce_order_details_after_customer_details', $order ); ?>

</div>
