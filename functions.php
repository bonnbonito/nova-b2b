<?php
/**
 * Theme Functions.
 *
 * @package Nova B2B
 */

// require_once get_stylesheet_directory() . '/vendor/autoload.php';
require get_stylesheet_directory() . '/bonn-update-checker/plugin-update-checker.php';


$namespace = 'NOVA_B2B';


use Bonn\PluginUpdateChecker\v5\PucFactory;

$nova_update_checker = PucFactory::buildUpdateChecker(
	'https://github.com/bonnbonito/nova-b2b/',
	__FILE__,
	'nova-b2b'
);

add_filter(
	'ai1wm_exclude_themes_from_export',
	function ( $exclude_filters ) {
		$exclude_filters[] = '/node_modules';
		return $exclude_filters;
	}
);

$nova_update_checker->setBranch( 'deposit' );

if ( ! defined( 'NOVA_DIR_PATH' ) ) {
	define( 'NOVA_DIR_PATH', untrailingslashit( get_stylesheet_directory() ) );
}

if ( ! defined( 'NOVA_CLASS_PATH' ) ) {
	define( 'NOVA_CLASS_PATH', untrailingslashit( get_stylesheet_directory() . '/inc/class' ) );
}

if ( ! defined( 'NOVA_DIR_URI' ) ) {
	define( 'NOVA_DIR_URI', untrailingslashit( get_stylesheet_directory_uri() ) );
}

if ( ! defined( 'NOVA_ARCHIVE_POST_PER_PAGE' ) ) {
	define( 'NOVA_ARCHIVE_POST_PER_PAGE', 9 );
}

if ( ! defined( 'NOVA_SEARCH_RESULTS_POST_PER_PAGE' ) ) {
	define( 'NOVA_SEARCH_RESULTS_POST_PER_PAGE', 9 );
}

if ( ! defined( 'NOVA_EXCHANGE_RATE' ) ) {
	define( 'NOVA_EXCHANGE_RATE', 1.35 );
}

/** if Woocommerce activated */
if ( class_exists( 'woocommerce' ) ) {

	// add_filter( 'option_woocommerce_currency', 'nova_modify_woocommerce_currency_based_on_user' );

	function modify_woocommerce_currency_based_on_user( $default_currency ) {

		if ( ! is_user_logged_in() || current_user_can( 'administrator' ) ) {
			return $default_currency;
		}

		$user_id         = get_current_user_id();
		$billing_country = get_user_meta( $user_id, 'billing_country', true );

		$new_currency = $billing_country === 'CA' ? 'CAD' : 'USD';

		return $new_currency;
	}

	// Add action before the order table in the email
	add_action( 'woocommerce_email_before_order_table', 'nova_modify_based_currency', 10, 4 );

	function nova_modify_based_currency( $order, $sent_to_admin, $plain_text, $email ) {
		// Get the currency of the current order
		$order_currency = $order->get_currency();

		// Add a filter to modify the currency option temporarily
		add_filter(
			'option_woocommerce_currency',
			function ( $currency ) use ( $order_currency ) {
				return $order_currency;
			}
		);

		// Ensure the filter is removed after the email is sent
		add_action( 'woocommerce_email_after_order_table', 'nova_restore_based_currency', 10, 4 );
	}

	// Function to remove the currency filter
	function nova_restore_based_currency( $order, $sent_to_admin, $plain_text, $email ) {
		// Remove the filter added earlier
		remove_filter( 'option_woocommerce_currency', 'nova_currency_filter_callback' );
	}

	// Since anonymous functions cannot be removed directly, define a named function
	function nova_currency_filter_callback( $currency ) {
		// This function body will not be used directly
		return $currency;
	}


	require NOVA_DIR_PATH . '/inc/class/Order_Shipped.php';
}

add_action( 'acf/init', 'nova_b2b_acf_init', 1 );

function nova_b2b_acf_init() {
	require NOVA_DIR_PATH . '/inc/autoloader.php';
}



/**
 * Add custom functions here
 */
