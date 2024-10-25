<?php

namespace NOVA_B2B;

class Dropbox {

	const GALLERY = 'dropbox-gallery';

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
		// add_action( 'acf/save_post', array( $this, 'update_dropbox_gallery_images' ), 5 );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
		add_action( 'add_meta_boxes', array( $this, 'dropbox_gallery_metabox' ), 10, 2 );
		add_action( 'save_post', array( $this, 'save_dropbox_gallery_meta' ), 10, 2 );
		add_action( 'wp_ajax_save_fetched_images', array( $this, 'save_fetched_images' ) );
		add_shortcode( 'nova_dropbox_gallery', array( $this, 'display_dropbox_gallery' ) );
		add_filter( 'kadence_classic_meta_box_post_types', array( $this, 'remove_post_types' ) );
	}

	public function remove_post_types( $post_types ) {
		return array_diff( $post_types, array( self::GALLERY ) );
	}

	public function frontend_scripts() {
		$theme = wp_get_theme();
		wp_register_style( 'nova-dropbox-gallery', get_stylesheet_directory_uri() . '/assets/css/dropbox-gallery.css', array(), $theme->Version );
		wp_register_script( 'nova-dropbox-gallery', get_stylesheet_directory_uri() . '/assets/js/dropbox-gallery.js', array(), wp_get_theme()->get( 'Version' ), true );
	}

	public function display_dropbox_gallery( $atts ) {
		$atts = shortcode_atts(
			array(
				'id' => '',
			),
			$atts
		);

		$id = $atts['id'];

		$fetched_images = get_post_meta( $id, 'gallery_images', true );

		if ( empty( $fetched_images ) ) {
			return '';
		}

		wp_enqueue_script( 'nova-dropbox-gallery' );
		wp_enqueue_style( 'nova-dropbox-gallery' );
		$output = '<div class="nova-dropbox-gallery">';

		foreach ( $fetched_images as $image ) {
			$output .= '<a href="' . esc_url( $image['sharedLink'] ) . '"><img src="' . esc_url( $image['sharedLink'] ) . '" alt=""></a>';
		}

		$output .= '</div>';

		return $output;
	}

	public function save_fetched_images() {

		// Get the post ID and images from the AJAX request
		$post_id = intval( $_POST['post_id'] );
		$images  = isset( $_POST['images'] ) ? json_decode( stripslashes( $_POST['images'] ), true ) : array();

		if ( empty( $post_id ) || empty( $images ) ) {
			wp_send_json_error( array( 'error' => 'Invalid post ID or images' ) );
		}

		// Update the post meta with the fetched images
		update_post_meta( $post_id, 'gallery_images', $images );

		// Send a success response back to the client
		wp_send_json_success( array( 'message' => 'Images successfully saved to post meta' ) );
	}

	public function save_dropbox_gallery_meta( $post_id, $post ) {
		// Check if our nonce is set.
		if ( ! isset( $_POST['dropbox_gallery_nonce'] ) ) {
			return $post_id;
		}

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $_POST['dropbox_gallery_nonce'], 'save_dropbox_gallery' ) ) {
			return $post_id;
		}

		// Check the user's permissions.
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		// Avoid autosave.
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return $post_id;
		}

		// Check the post type to ensure we're only saving for the correct post type.
		if ( $post->post_type != self::GALLERY ) {
			return $post_id;
		}

		$new_meta_value = ( isset( $_POST['dropbox_folder'] ) ) ? $_POST['dropbox_folder'] : '';

		// Update the meta field.
		update_post_meta( $post_id, 'dropbox_folder', $new_meta_value );
	}


	public function dropbox_gallery_metabox() {
		add_meta_box(
			self::GALLERY,
			__( 'Dropbox Gallery', 'nova-b2b' ),
			array( $this, 'dropbox_gallery_metabox_callback' ),
			self::GALLERY,
			'normal'
		);
	}

	public function dropbox_gallery_metabox_callback( $post ) {
		global $pagenow;
		// Add a nonce field so we can check for it later.
		wp_nonce_field( 'save_dropbox_gallery', 'dropbox_gallery_nonce' );

		$fetched_images = get_post_meta( $post->ID, 'gallery_images', true );

		$dropbox_folder = get_post_meta( $post->ID, 'dropbox_folder', true );
		?>
<h4>[nova_dropbox_gallery id="<?php echo esc_attr( $post->ID ); ?>"]</h4>
<label for="dropbox_folder">
    <?php _e( 'Dropbox Folder', 'nova-b2b' ); ?>
</label>
<input type="text" id="dropbox_folder" name="dropbox_folder" value="<?php echo esc_attr( $dropbox_folder ); ?>" />
<p class="description">
    <?php _e( 'Enter the path of the Dropbox folder containing the images for this gallery.', 'nova-b2b' ); ?>
</p>
<p></p>

<?php
		if ( $pagenow !== 'post-new.php' ) :
			?>
<div class="flex" id="divActions">
    <button type="button" class="button button-primary nova-dropbox-gallery-update" id="dropboxFetchImages">
        <?php _e( 'Fetch Images', 'nova-b2b' ); ?>
    </button>
    <div class="spinner" role="status"></div>
</div>
<div id="fetched-images">
    <?php if ( ! empty( $fetched_images ) ) : ?>
    <?php foreach ( $fetched_images as $image ) : ?>
    <img src="<?php echo esc_url( $image['sharedLink'] ); ?>" alt="">
    <?php endforeach; ?>
    <?php else : ?>
    <h4>No fetched images</h4>
    <?php endif; ?>
</div>
<?php
endif;
	}


	public function admin_scripts( $hook ) {
		global $post;
		$theme = wp_get_theme();

		/** only on dropbox-gallery post type page */
		if ( ! isset( $post ) || $hook !== 'post.php' || $post->post_type !== self::GALLERY ) {
			return;
		}

		wp_enqueue_style( 'admin-dropbox-gallery', get_stylesheet_directory_uri() . '/assets/css/admin-dropbox-gallery.css', array(), $theme->Version );
		wp_enqueue_script( 'admin-dropbox-gallery', get_stylesheet_directory_uri() . '/assets/js/admin-dropbox-gallery.js', array(), $theme->Version, true );

		wp_localize_script(
			'admin-dropbox-gallery',
			'NovaDropboxGallery',
			array(
				'ajax_url'              => admin_url( 'admin-ajax.php' ),
				'nonce'                 => wp_create_nonce( 'nova-dropbox-gallery' ),
				'dropbox_app_key'       => get_field( 'dropbox_app_key', 'option' ),
				'dropbox_secret'        => get_field( 'dropbox_secret_key', 'option' ),
				'dropbox_token'         => get_field( 'dropbox_token_access', 'option' ),
				'dropbox_refresh_token' => get_field( 'dropbox_refresh_token', 'option' ),
				'post_id'               => $post->ID,
			)
		);
	}

	public function update_dropbox_gallery_images( $post_id ) {
		$dropbox_folder = $_POST['acf']['field_671ac6861d962'];
		if ( isset( $dropbox_folder ) && ! empty( $dropbox_folder ) ) {
			$access_token = $this->get_refresh_token();

			// Fetch shared links for images in the Dropbox folder
			$image_links = $this->fetch_dropbox_image_links( $access_token, $dropbox_folder );

			print_r( $image_links );
			die();

			if ( ! empty( $image_links ) ) {
				// Update the post meta with the shared image links
				update_post_meta( $post_id, 'gallery_images', $image_links );
			}
		}
	}

	/**
	 * Function to fetch image links from Dropbox folder
	 */
	public function fetch_dropbox_image_links( $access_token, $folder_path ) {
		$url = 'https://api.dropboxapi.com/2/files/list_folder';

		$headers = array(
			'Authorization: Bearer ' . $access_token,
			'Content-Type: application/json',
		);

		$post_data = json_encode(
			array(
				'path' => $folder_path,
			)
		);

		$response = wp_remote_post(
			$url,
			array(
				'headers' => $headers,
				'body'    => $post_data,
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error fetching files from Dropbox: ' . $response->get_error_message() );
			return array();
		}

		$files = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( isset( $files['error_summary'] ) ) {
			error_log( 'Error from Dropbox API: ' . $files['error_summary'] );
			return array();
		}

		// Process each file and fetch shared links for images
		$image_links = array();
		if ( isset( $files['entries'] ) ) {
			foreach ( $files['entries'] as $file ) {
				if ( isset( $file['.tag'] ) && $file['.tag'] == 'file' ) {
					$sharedLink = $this->create_dropbox_shared_link( $access_token, $file['path_lower'] );
					if ( $sharedLink ) {
						$image_links[] = $sharedLink;
					}
				}
			}
		}

		return $image_links;
	}

	/**
	 * Function to create shared links for Dropbox files
	 */
	public function create_dropbox_shared_link( $access_token, $file_path ) {
		$url = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';

		$headers = array(
			'Authorization: Bearer ' . $access_token,
			'Content-Type: application/json',
		);

		$post_data = json_encode(
			array(
				'path'     => $file_path,
				'settings' => array(
					'requested_visibility' => 'public',
				),
			)
		);

		$response = wp_remote_post(
			$url,
			array(
				'headers' => $headers,
				'body'    => $post_data,
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error creating Dropbox shared link: ' . $response->get_error_message() );
			return null;
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( isset( $data['url'] ) ) {
			// Modify the Dropbox link for direct access (?dl=0 -> ?raw=1)
			return str_replace( '?dl=0', '?raw=1', $data['url'] );
		}

		return null;
	}

	public function get_refresh_token() {
		$client_id     = get_field( 'dropbox_app_key', 'option' );
		$client_secret = get_field( 'dropbox_secret_key', 'option' );
		$refresh_token = get_field( 'dropbox_refresh_token', 'option' );

		$url    = 'https://api.dropboxapi.com/oauth2/token';
		$params = array(
			'grant_type'    => 'refresh_token',
			'refresh_token' => $refresh_token,
			'client_id'     => $client_id,
			'client_secret' => $client_secret,
		);

		$response = wp_remote_post(
			$url,
			array(
				'body'    => $params,
				'headers' => array(
					'Content-Type' => 'application/x-www-form-urlencoded',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error getting access token: ' . $response->get_error_message() );
			return null;
		}

		$data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( isset( $data['access_token'] ) ) {
			return $data['access_token'];
		} else {
			error_log( 'Error: ' . wp_remote_retrieve_body( $response ) );
			return null;
		}
	}

	public function rename_dropbox_folder( $old_path, $new_path ) {
		$access_token = $this->get_refresh_token();
		if ( ! $access_token ) {
			error_log( 'Failed to get access token' );
			return false; // indicate failure
		}

		$move_url    = 'https://api.dropboxapi.com/2/files/move_v2';
		$move_params = json_encode(
			array(
				'from_path'  => $old_path,
				'to_path'    => $new_path,
				'autorename' => true,
			)
		);

		$response = wp_remote_post(
			$move_url,
			array(
				'method'  => 'POST',
				'body'    => $move_params,
				'headers' => array(
					'Authorization' => 'Bearer ' . $access_token,
					'Content-Type'  => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Error moving folder: ' . $response->get_error_message() );
			return false; // indicate failure
		}

		$response_body = wp_remote_retrieve_body( $response );
		$move_data     = json_decode( $response_body, true );

		if ( isset( $move_data['metadata'] ) ) {
			// Folder moved successfully
			return true; // indicate success
		} else {
			error_log( 'Failed to move folder. Response: ' . $response_body );
			return false; // indicate failure
		}
	}

	public function get_access_token() {
		$clientId     = get_field( 'dropbox_app_key', 'option' );
		$clientSecret = get_field( 'dropbox_secret_key', 'option' );
		$redirectUri  = get_field( 'dropbox_redirect_url', 'option' );
		$url          = 'https://api.dropboxapi.com/oauth2/token';
		$params       = array(
			'code'          => $_GET['code'],
			'grant_type'    => 'authorization_code',
			'client_id'     => $clientId,
			'client_secret' => $clientSecret,
			'redirect_uri'  => $redirectUri,
		);
		$response     = wp_remote_post( $url, array( 'body' => $params ) );
		if ( is_wp_error( $response ) ) {
			// Handle error
			return null;
		}
		$body = wp_remote_retrieve_body( $response );
		$data = $body ? json_decode( $body, true ) : null;

		return array(
			'access_token'  => $data['access_token'] ?? null,
			'refresh_token' => $data['refresh_token'] ?? null,
		);
	}

	public function exchangeAuthorizationCodeForAccessToken( $authorizationCode ) {
		$clientId     = get_field( 'dropbox_app_key', 'option' );
		$clientSecret = get_field( 'dropbox_secret_key', 'option' );
		$redirectUri  = get_field( 'dropbox_redirect_url', 'option' );
		$url          = 'https://api.dropboxapi.com/oauth2/token';
		$params       = array(
			'code'          => $authorizationCode,
			'grant_type'    => 'authorization_code',
			'client_id'     => $clientId,
			'client_secret' => $clientSecret,
			'redirect_uri'  => $redirectUri,
		);
		$response     = wp_remote_post( $url, array( 'body' => $params ) );
		if ( is_wp_error( $response ) ) {
			// Handle error
			return null;
		}
		$body = wp_remote_retrieve_body( $response );
		$data = $body ? json_decode( $body, true ) : null;
		return array(
			'access_token'  => $data['access_token'] ?? null,
			'refresh_token' => $data['refresh_token'] ?? null,
		);
	}
}