<?php
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.1.0
 *
 * @var WC_Order $order
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="woocommerce-order">

	<?php
	if ( $order ) :

		do_action( 'woocommerce_before_thankyou', $order->get_id() );

		?>

		<?php
		if ( $order->has_status( 'failed' ) ) :
			?>

	<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed">
			<?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?>
	</p>

	<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
		<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>"
			class="button pay"><?php esc_html_e( 'Pay', 'woocommerce' ); ?></a>
			<?php if ( is_user_logged_in() ) : ?>
		<a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>"
			class="button pay"><?php esc_html_e( 'My account', 'woocommerce' ); ?></a>
		<?php endif; ?>
	</p>

	<?php else : ?>

		<?php wc_get_template( 'checkout/order-received.php', array( 'order' => $order ) ); ?>

	<ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">

		<li class="woocommerce-order-overview__order order float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0">
				<?php esc_html_e( 'Order number:', 'woocommerce' ); ?>
			</h5>
			<span
				class="text-[16px]>"><?php echo $order->get_order_number(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		</li>

		<li class="woocommerce-order-overview__date date float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0"><?php esc_html_e( 'Date:', 'woocommerce' ); ?></h5>
			<span
				class="text-[16px]>"><?php echo wc_format_datetime( $order->get_date_created() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		</li>

		<?php if ( is_user_logged_in() && $order->get_user_id() === get_current_user_id() && $order->get_billing_email() ) : ?>
		<li class="woocommerce-order-overview__email email float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0"><?php esc_html_e( 'Email:', 'woocommerce' ); ?></h5>
			<span
				class="text-[16px]>"><?php echo $order->get_billing_email(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		</li>
		<?php endif; ?>


		<?php
		$deposit_amount = $order->get_meta( '_deposit_amount' );
		$deposit_title  = $order->get_meta( '_deposit_chosen_title' );
		if ( $deposit_title ) :
			?>
		<li class="woocommerce-order-overview__deposit-title deposit-title float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0">
				<?php esc_html_e( 'Payment Type:', 'woocommerce' ); ?>
			</h5>
			<span
				class="text-[16px]>"><?php echo $deposit_title; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		</li>
		<li class="woocommerce-order-overview__deposit deposit float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0"><?php esc_html_e( 'Deposit:', 'woocommerce' ); ?>
			</h5>
			<span
				class="text-[16px]>">-<?php echo wc_price( $deposit_amount, array( 'currency' => $order->get_currency() ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		</li>



		<?php endif; ?>

		<li class="woocommerce-order-overview__total total float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0">
				<?php
				$needs_payment = $order->get_meta( 'needs_payment' );
				if ( $needs_payment ) :
					?>
					<?php esc_html_e( 'Total:', 'woocommerce' ); ?>
				<?php else : ?>
					<?php esc_html_e( 'Total:', 'woocommerce' ); ?>
				<?php endif; ?>
			</h5>
			<span
				class="text-[16px]>"><?php echo $order->get_formatted_order_total(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
		</li>

		<?php if ( $order->get_payment_method_title() ) : ?>
		<li class="woocommerce-order-overview__payment-method method float-none">
			<h5 class="font-title uppercase tracking-[1.8px] mb-0">
				<?php esc_html_e( 'Payment method:', 'woocommerce' ); ?>
			</h5>
			<div class="text-[16px]> block">
				<div class="block mb-2"><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></div>
				<?php if ( $order->get_payment_method() === 'bacs' ) : ?>
				<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative inline-flex flex-col"
					role="alert">
					<span class="font-bold text-sm block mb-1">hello@novasignage.com</span>
					<span class="block text-sm">Please set the answer to the security question: <span
							style="font-weight: bold;">neonsigns</span></span>
				</div>

				<?php endif; ?>
			</div>

		</li>
		<?php endif; ?>

	</ul>

	<?php endif; ?>

		<?php do_action( 'woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id() ); ?>
		<?php do_action( 'woocommerce_thankyou', $order->get_id() ); ?>

	<?php else : ?>

		<?php wc_get_template( 'checkout/order-received.php', array( 'order' => false ) ); ?>

	<?php endif; ?>

</div>
