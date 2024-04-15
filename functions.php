<?php
/**
 * Theme Functions.
 *
 * @package Nova B2B
 */

// require_once get_stylesheet_directory() . '/vendor/autoload.php';
require get_stylesheet_directory() . '/bonn-update-checker/plugin-update-checker.php';


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

$nova_update_checker->setBranch( 'main' );

if ( ! defined( 'NOVA_DIR_PATH' ) ) {
	define( 'NOVA_DIR_PATH', untrailingslashit( get_stylesheet_directory() ) );
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


require_once NOVA_DIR_PATH . '/inc/helpers/autoloader.php';



/**
 * Add custom functions here
 */
