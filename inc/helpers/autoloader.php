<?php
/**
 * Autoloader for theme
 */

namespace NOVA_B2B\Inc\Helpers;

function autoloader( $class ) {
	// Corrected function to use the file path instead of URI
	$class_path = get_stylesheet_directory() . '/inc/classes/' . $class . '.php';
	error_log( `{$class_path} classpath\n`, 3, NOVA_DIR_PATH . '/error.log' );
	if ( file_exists( $class_path ) ) {
		error_log( $class_path, 3, NOVA_DIR_PATH . '/error.log' );
		include $class_path;
	} else {
		error_log( `NOT foound {$class_path}`, 3, NOVA_DIR_PATH . '/error.log' );
	}
}

// spl_autoload_register( '\NOVA_B2B\Inc\Helpers\autoloader' );


require NOVA_DIR_PATH . '/inc/classes/Roles.php';
require NOVA_DIR_PATH . '/inc/classes/Admin.php';
require NOVA_DIR_PATH . '/inc/classes/Scripts.php';
require NOVA_DIR_PATH . '/inc/classes/Woocommerce.php';
require NOVA_DIR_PATH . '/inc/classes/Nova_Product.php';
require NOVA_DIR_PATH . '/inc/classes/Nova_Quote.php';
require NOVA_DIR_PATH . '/inc/classes/NovaEmails.php';
require NOVA_DIR_PATH . '/inc/classes/Shortcodes.php';
require NOVA_DIR_PATH . '/inc/classes/Pending_Payment.php';
require NOVA_DIR_PATH . '/inc/classes/Zoho.php';
if ( get_field( 'brevo_integration', 'option' ) ) {
	require NOVA_DIR_PATH . '/inc/classes/Brevo.php';
}
// require NOVA_DIR_PATH . '/inc/classes/GoogleSheets.php';
