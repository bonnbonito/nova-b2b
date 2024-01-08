<?php
namespace NOVA_B2B\INC\CLASSES;

class Shortcodes {
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

	public function __construct() {
		add_shortcode( 'nova_signup', array( $this, 'nova_signup' ) );
		add_shortcode( 'activate_account', array( $this, 'activate_account' ) );
		add_shortcode( 'nova_login_form', array( $this, 'nova_login_form' ) );
		add_shortcode( 'blurred_login', array( $this, 'nova_login_form' ) );
		add_shortcode( 'nova_front_login', array( $this, 'nova_front_login' ) );
		add_shortcode( 'signup_activation', array( $this, 'signup_activation' ) );
		add_shortcode( 'homepage_grid', array( $this, 'homepage_grid' ) );
	}

	public function homepage_grid() {
		ob_start();
		if ( have_rows( 'homepage_grid' ) ) :
			?>
<div class="homepage-layout mobile-slider">
    <?php
			while ( have_rows( 'homepage_grid' ) ) :
				the_row();
				?>

    <div class="homepage-layout-item">
        <img src="http://nova.test/wp-content/uploads/2024/01/acrylic.png" alt="">
        <div class="homepage-layout-content">
            <h3 class="mb-0"><?php the_sub_field( 'title' ); ?></h3>
            <p><?php the_sub_field( 'content' ); ?></p>
        </div>
    </div>

    <?php endwhile; ?>
</div>
<?php

		endif;
		?>
<?php
		return ob_get_clean();
	}

	public function signup_activation() {
		ob_start();

		$user_id = $_GET['user_id'];

		$business_id    = get_field( 'business_id', 'user_' . $user_id );
		$user_data      = get_userdata( $user_id );
		$user_email     = $user_data->user_email;
		$firstName      = $user_data->first_name;
		$activation_key = get_user_meta( $user_id, 'account_activation_key', true );

		$subject = 'NOVA Signage: Activate Your Account';

		$message = '<p>Hello ' . $firstName . ',</p>' .
			'<p>Thank you for submitting your application as a NOVA Business Partner. Your <b>Business ID</b> number is: ' . $business_id . '</p>' .
			'<p>Please click the link below to activate your account:</p>' .
			'<p><a href="' . site_url() . '/activate?pu=' . $user_id . '&key=' . $activation_key . '">' .
			site_url() . '/activate?pu=' . $user_id . '&key=' . $activation_key . '</a></p>' .
			'<p>Thank you,<br>' .
			'NOVA Signage Team</p>';

		$mailer = WC()->mailer();

		// Wrap the content with WooCommerce email template
		$wrapped_content = $mailer->wrap_message( $subject, $message );

		// Send the email using WooCommerce's mailer
		// $mailer->send( $user_email, $subject, $wrapped_content, '', '' );

		return ob_get_clean();
	}

	public function nova_front_login() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/front-login.php';

		return ob_get_clean();
	}

	public function nova_signup() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/signup.php';

		return ob_get_clean();
	}

	public function activate_account() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/activate.php';

		return ob_get_clean();
	}

	public function nova_login_form() {
		ob_start();

		require NOVA_DIR_PATH . '/inc/shortcodes/loginform.php';

		return ob_get_clean();
	}
}

Shortcodes::get_instance();