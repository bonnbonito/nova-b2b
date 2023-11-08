<?php
/**
 * Autoloader for theme
 */

namespace NOVA_B2B\INC\Helpers;

function autoloader( $class ) {
	// Corrected function to use the file path instead of URI
	$class_path = get_stylesheet_directory() . '/inc/classes/' . $class . '.php';
	if ( file_exists( $class_path ) ) {
		include $class_path;
	}
}

// spl_autoload_register( '\NOVA_B2B\INC\Helpers\autoloader' );

require NOVA_DIR_PATH . '/inc/classes/Styles.php';
require NOVA_DIR_PATH . '/inc/classes/Woocommerce.php';
require NOVA_DIR_PATH . '/inc/classes/Quote.php';
