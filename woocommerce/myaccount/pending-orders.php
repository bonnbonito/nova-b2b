<?php
defined( 'ABSPATH' ) || exit;

$customer_orders = wc_get_orders(
	apply_filters(
		'woocommerce_my_account_my_orders_query',
		array(
			'customer' => get_current_user_id(),
			'status'   => 'pending',
			'orderby'  => 'date',
			'order'    => 'DESC',
			'return'   => 'ids',
		)
	)
);

if ( $customer_orders ) : ?>

<h2><?php esc_html_e( 'Pending Orders', 'text-domain' ); ?></h2>

<table
    class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
    <!-- Table content as before -->
</table>

<?php else : ?>

<p><?php esc_html_e( 'You have no pending orders.', 'text-domain' ); ?></p>

<?php endif; ?>