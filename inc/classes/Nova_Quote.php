<?php
namespace NOVA_B2B\INC\CLASSES;

class Nova_Quote {
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
		add_action( 'wp_enqueue_scripts', array( $this, 'acrylic_nova_scripts' ) );
		add_action( 'rest_api_init', array( $this, 'nova_rest_quote_file' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_acrylic_script' ) );
		add_action( 'wp_ajax_acrylic_pricing_table', array( $this, 'acrylic_pricing_table' ) );
		// add_filter( 'acf/init', array( $this, 'afc_load_popular_fonts' ), 10, 3 );
		add_action( 'wp_ajax_upload_acrylic_file', array( $this, 'upload_acrylic_file' ) );
		add_action( 'wp_ajax_remove_acrylic_file', array( $this, 'remove_acrylic_file' ) );
		add_filter( 'upload_mimes', array( $this, 'enable_ai_files' ), 1, 1 );
	}

	public function enable_ai_files( $mimes ) {
		$mimes['svg'] = 'image/svg+xml';
		$mimes['ai']  = 'application/postscript';
		return $mimes;
	}

	public function remove_acrylic_file() {
		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		$upload_dir = wp_upload_dir();

		$file_path = str_replace( $upload_dir['baseurl'], $upload_dir['basedir'], $_POST['file'] );

		if ( file_exists( $file_path ) ) {
			// Attempt to delete the file
			if ( unlink( $file_path ) ) {
				$status['code']    = 2;
				$status['message'] = 'File successfully deleted.';
			} else {
				$status['code']    = 3;
				$status['message'] = 'Error: Unable to delete the file.';
			}
		} else {
			$status['code']  = 4;
			$status['error'] = 'Error: File does not exist.';
		}

		wp_send_json( $status );
	}

	public function upload_acrylic_file() {
		$status = array(
			'code'     => 1,
			'uploaded' => 0,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'quote_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		if ( ! function_exists( 'wp_handle_upload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}

		$file               = $_FILES['file'];
		$status['fileName'] = $file['name'];

		// Set a custom upload directory based on the current user's username.
		add_filter(
			'upload_dir',
			function ( $dir ) {
				$user     = wp_get_current_user();
				$username = $user->user_login;

				// Create the custom path.
				$custom_dir = '/' . $username;

				return array(
					'path'   => $dir['basedir'] . $custom_dir,
					'url'    => $dir['baseurl'] . $custom_dir,
					'subdir' => $custom_dir,
				) + $dir;
			}
		);

		$upload_overrides = array( 'test_form' => false );
		$movefile         = wp_handle_upload( $file, $upload_overrides );

		if ( $movefile && ! isset( $movefile['error'] ) ) {
			$status['code']    = 2;
			$status['message'] = "File is valid, and was successfully uploaded.\n";
		} else {
			$status['message'] = $movefile['error'];
		}

		// Remove the filter so it doesn't affect subsequent uploads
		remove_filter( 'upload_dir', 'custom_upload_directory' );

		$status['file'] = $movefile;
		wp_send_json( $status );
	}


	public function acrylic_pricing_table() {
		$status = array(
			'code' => 1,
		);

		if ( ! wp_verify_nonce( $_POST['nonce'], 'nova_admin_nonce' ) ) {
			wp_send_json( 'Nonce Error' );
		}

		$id = $_POST['id'];

		$acrylic_options = get_field( 'acrylic_quote_options', $id );

		$pricing = $acrylic_options['letter_height_x_logo_pricing'];

		$status['code']    = 2;
		$status['pricing'] = $pricing;
		wp_send_json( $status );
	}

	public function admin_acrylic_script( $hook ) {

		global $post;

		// First, make sure we are on the post edit screen.
		if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
			return;
		}

		wp_register_script( 'admin-acrylic', get_stylesheet_directory_uri() . '/assets/js/admin-acrylic.js', array(), '1.0', true );

		wp_localize_script(
			'admin-acrylic',
			'AcrylicAdmin',
			array(
				'ajax_url'      => admin_url( 'admin-ajax.php' ),
				'nonce'         => wp_create_nonce( 'nova_admin_nonce' ),
				'ID'            => $_GET['post'],
				'quote_options' => $this->get_quote_options(),
			)
		);

		// Check if the global $post object is set and if we're on a product post type.
		if ( $post && 'product' === $post->post_type ) {
			// Get the categories of the current post
			$categories = wp_get_post_terms( $post->ID, 'product_cat', array( 'fields' => 'slugs' ) );

			// Check if 'acrylic' category is assigned to the post
			if ( in_array( 'acrylic', $categories ) ) {
				// Enqueue the script
				wp_enqueue_script( 'admin-acrylic' );
			}
		}

		wp_enqueue_style( 'nova-admin', get_stylesheet_directory_uri() . '/assets/css/admin.css' );
	}

	public function nova_rest_quote_file() {
		register_rest_route(
			'nova/v1',
			'/upload-quote-file',
			array(
				'methods'  => 'POST',
				'callback' => array( $this, 'handle_quote_file_upload' ),
			)
		);
	}

	public function handle_quote_file_upload( $request ) {
		return 'DONE';
		// $files = $request->get_file_params();
		// $file  = $files['file'];

		// // Define the upload directory and options.
		// $upload = wp_upload_bits( $file['name'], null, file_get_contents( $file['tmp_name'] ) );
		// if ( ! $upload['error'] ) {
		// $filename = $upload['file'];

		// Move the file to your uploads/quote directory.
		// $quote_directory = WP_CONTENT_DIR . '/uploads/quote/';
		// if ( ! file_exists( $quote_directory ) ) {
		// wp_mkdir_p( $quote_directory );
		// }
		// $new_file_path = $quote_directory . basename( $filename );
		// if ( rename( $filename, $new_file_path ) ) {
		// return new WP_REST_Response( 'File uploaded successfully', 200 );
		// }
		// }

		// return new WP_Error( 'upload_error', $upload['error'], array( 'status' => 500 ) );
	}

	public function acrylic_nova_scripts() {
		wp_register_script(
			'acrylic-quote',
			get_theme_file_uri( '/quotes/acrylic/build/index.js' ),
			array( 'wp-element' ),
			wp_get_theme()->get( 'Version' ),
			true
		);

		wp_register_style( 'acrylic-quote', get_stylesheet_directory_uri() . '/quotes/acrylic/build/index.css', array(), wp_get_theme()->get( 'Version' ) );

		wp_localize_script(
			'acrylic-quote',
			'AcrylicQuote',
			array(
				'ajax_url'      => admin_url( 'admin-ajax.php' ),
				'nonce'         => wp_create_nonce( 'quote_nonce' ),
				'quote_options' => $this->get_quote_options(),
				'fonts'         => $this->get_fonts(),
				'upload_rest'   => esc_url_raw( rest_url( '/nova/v1/upload-quote-file' ) ),
				'logged_in'     => is_user_logged_in(),
			)
		);

		if ( is_product( 'product' ) ) {
			wp_enqueue_script( 'acrylic-quote' );
			wp_enqueue_style( 'acrylic-quote' );
		}
	}

	public function get_quote_options() {
		return get_field( 'acrylic_quote_options' );
	}

	public function get_fonts() {
		$list_files = get_stylesheet_directory() . '/assets/fonts';
		if ( ! function_exists( 'list_files' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		$files = list_files( $list_files );
		$fonts = array();

		foreach ( $files as $file ) {
			// Encode the basename to handle spaces in filenames
			$encoded_basename = rawurlencode( basename( $file ) );

			$fonts[] = array(
				'name' => pathinfo( $file, PATHINFO_FILENAME ),
				'src'  => get_stylesheet_directory_uri() . '/assets/fonts/' . $encoded_basename,
			);
		}

		return $fonts;
	}

	public function afc_load_popular_fonts( $value, $post_id, $field ) {
		if ( get_post_type( $post_id ) === 'product' ) {
			$popular = 'Arial,Futura,Helvetica,Garamond,Palatino,Optima,Montserrat,Patua One,Bebas Neue,Versa';
			$regular = 'Arial Regular,Arial Bold,Arial Rounded,Futura,Futura Md BT - Bold Italic,Futura Extra Black BT - Extra Black,Helvetica Regular,Helvetica - Bold,Arima - Semibold,Segoe Print - Bold,Malvie,Garamond Regular,Garamond Bold,Times New Roman,Century Schoolbook,Optima,Optima Semibold,Palatino Semibold,Trajan Bold,Twentieth Century,Comfortaa Bold,Fredoka Semibold,Montserrat Bold,Bai Jamjeree Semibold,Boogaloo Regular,Cooper Black,Coiny Regular,Muloka Karesh,Zilla Slab Semibold,Patua One,Antonio Bold,Bebas Neue,Versa,Chateau de Garage,Heavitas,';

			$popular_arr = explode( ',', $popular );
			foreach ( $popular_arr as $font ) {
				$value[] = array(
					'field_6552c810e7252' => $font,
				);
			}
		}
	}
}

Nova_Quote::get_instance();
