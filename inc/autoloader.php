<?php
/**
 * Autoloader for theme
 */


function autoloader( $class ) {
	// Replace namespace separator with directory separator

	$namespace = 'NOVA_B2B';

	if ( strpos( $class, $namespace ) !== 0 ) {
		return false;
	}

	$class = str_replace( $namespace . '\\', '', $class );

	// Construct the full path to the class file
	$class_path = NOVA_CLASS_PATH . '/' . $class . '.php';

	// Check if the file exists before including
	if ( file_exists( $class_path ) ) {
		require $class_path;
	}
}

spl_autoload_register( 'autoloader' );

$instances = array(
	'Shortcodes',
	'Post',
	'Roles',
	'Admin',
	'Scripts',
	'Woocommerce',
	'Order_Shipped',
	'Nova_Product',
	'Nova_Quote',
	'NovaEmails',
	'Pending_Payment',
	'Deposit',
	'QuotesArchived',
	// 'Pending_Orders',
	// 'Zoho',
	// 'Streak',
	// 'GoogleSheets',
	'Dropbox',
	'FAQ',
	'Order_History',
	'Checkout',
	'OrderApprove',
	'AutoLogin',
	'ExportOrder',
	'AI',
	'PhotoRegistration',
	'Zendesk',
	'UserReminder',
	'Slack',
);

foreach ( $instances as $instance ) {
	$class = "NOVA_B2B\\$instance";
	$class::get_instance();
}

if ( get_field( 'brevo_integration', 'option' ) ) {
	NOVA_B2B\Brevo::get_instance();
}