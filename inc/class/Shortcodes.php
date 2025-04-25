<?php
namespace NOVA_B2B;

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
		add_shortcode( 'custom_project', array( $this, 'custom_project' ) );
		add_shortcode( 'review_mockup', array( $this, 'review_mockup' ) );
		add_shortcode( 'login_title', array( $this, 'login_title' ) );
	}


	public function login_title() {
		ob_start();
		if ( ! is_woocommerce() ) {
			?>
			<h3>Log in to our business portal</h3>
			<p class="text-xs mt-0">Easily access exclusive partner account through our Business Portal login.</p>

			<?php
		} else {
			?>
			<h3>Log in to access our shop</h3>
			<?php
		}
		$content = ob_get_clean();
		return apply_filters( 'nova_login_title', $content );
	}

	public function review_mockup() {
		// Check if the user is logged in
		if ( ! is_user_logged_in() ) {
			ob_start();
			require NOVA_DIR_PATH . '/inc/shortcodes/loginform.php';
			return ob_get_clean();
		}

		wp_enqueue_script( 'order-approve' );

		// Check if 'order_id' is set in the URL parameters
		if ( ! isset( $_GET['order_id'] ) || empty( $_GET['order_id'] ) ) {
			// No order ID provided
			return '<div class="alert alert-danger"><p>Order Not Found</p></div>';
		}

		// Sanitize and retrieve the order ID
		$order_id = intval( $_GET['order_id'] );
		$order = wc_get_order( $order_id );

		// Check if the order exists
		if ( ! $order ) {
			return '<div class="alert alert-danger"><p>Order not found.</p></div>';
		}

		// Check if the current user is the owner of the order
		if ( $order->get_user_id() != get_current_user_id() ) {
			// if user role is not admin
			if ( ! current_user_can( 'manage_options' ) ) {
				return '<div class="alert alert-danger"><p>You are not authorized to access this order.</p></div>';
			}
		}

		$order_approved = get_field( 'order_approved_by_customer', $order_id );

		if ( $order_approved ) {
			return '<div class="alert alert-danger"><p>This order has already been approved.</p></div>';
		}

		// Start output buffering
		ob_start();
		$dropbox_urls = get_field( 'dropbox_urls', $order_id );
		if ( ! empty( $dropbox_urls ) ) {
			?>
			<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 border-solid" role="alert">
				<h3 class="text-red-600">Important:</h3>
				<p>Please review your designs carefully. <br>By checking <strong>'Approve'</strong>, you confirm that all
					details are correct and authorize production.</p>
			</div>
			<div id="review-approved" class="mt-4 border border-solid p-4" style="display:none;">
				<h4>Design Approved <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
						<path fill-rule="evenodd"
							d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
							clip-rule="evenodd" fill="green" />
					</svg>
				</h4>
				<p class="mb-0">Your signage will now move into production.</p>
				<p>Please check your email for updates on your order timeline and progress.</p>
			</div>
			<div id="review-revised" class="mt-4 border border-solid p-4" style="display:none;">
				<h4>Revision Requested</h4>
				<p class="mb-0">We'll review your changes and send you an updated mockup within 24 hours. </p>
				<p>You'll be notified by email when your new design is ready for review.</p>
			</div>
			<div class="review-mockup">
				<?php
				// Retrieve the Dropbox URLs associated with the order
				$index = 1;
				?>
				<p class="mt-8 mb-0">Provide specific details about any design changes you'd like to make.</p>
				<table class="table-auto mt-4 border-collapse">
					<tbody>
						<?php foreach ( $dropbox_urls as $key => $url ) { ?>
							<tr>
								<td class="border border-slate-400 p-2 pl-4 text-slate-500 dark:text-slate-400 border-solid">
									<a href="<?php echo esc_url( $url['dropbox_url'] ); ?>" target="_blank" class="kt-no-lightbox">
										<!-- SVG Icon -->
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
											<path fill-rule="evenodd"
												d="M11.914 4.086a2 2 0 0 0-2.828 0l-5 5a2 2 0 1 0 2.828 2.828l.556-.555a.75.75 0 0 1 1.06 1.06l-.555.556a3.5 3.5 0 0 1-4.95-4.95l5-5a3.5 3.5 0 0 1 4.95 4.95l-1.972 1.972a2.125 2.125 0 0 1-3.006-3.005L9.97 4.97a.75.75 0 1 1 1.06 1.06L9.058 8.003a.625.625 0 0 0 .884.883l1.972-1.972a2 2 0 0 0 0-2.828Z"
												clip-rule="evenodd" />
										</svg>
										Design #<?php echo $index; ?>
									</a>
								</td>
							</tr>
							<?php
							++$index;
						}
						?>
					</tbody>
				</table>
				<form action="" method="post" id="review-form">
					<div>
						<input type="hidden" name="action" value="approve_mockup" />
						<input type="hidden" name="order_id" value="<?php echo $order_id; ?>" />

					</div>
					<label for="approve" class="flex items-center text-xl"><input class="mr-1" type="radio" name="approve"
							value="approve" id="approve"> Approve</label>
					<label for="revision" class="flex items-center  text-xl"><input class="mr-1" type="radio" name="approve"
							value="revision" id="revision">Revise</label>
					<div class="mt-4" id="revision-wrapper" style="display:none;">
						<h4>Revision Notes:</h4>
						<textarea name="revision_notes" id="revision_notes" cols="30" rows="10"></textarea>
						<p>Our team will send an updated mockup within 24 business hours.</p>
					</div>

					<div class="mt-8 p-4 border border-solid bg-gray-100" id="approve-wrapper" style="display:none;">
						<h4>Design Approval & Liability Release:</h4>
						<p>By approving the attached production files—whether by electronic confirmation, signature, or “Approved”
							checkbox—the Client confirms that all details (including but not limited to dimensions, materials, finishes,
							colors, and mounting methods) are correct and complete. NOVA Signage will manufacture strictly in accordance
							with these approved files. Any discrepancies, errors, or desired changes identified after approval are the sole
							responsibility of the Client. Should the Client request revisions post‑approval, NOVA Signage will assess
							additional charges and extended lead times as necessary. NOVA Signage disclaims all liability for costs, losses,
							or delays arising from Client‑approved designs.</p>
					</div>



					<button type="submit" class="bg-nova-primary text-white px-4 py-2 rounded-md mt-4">Submit</button>
				</form>
			</div>
		<?php } else { ?>
			<p>No Dropbox URLs found.</p>
		<?php } ?>
		</div>
		<?php
		// Return the buffered content
		return ob_get_clean();
	}


	public function custom_project() {
		ob_start();
		?>
		<?php if ( ! is_user_logged_in() ) : ?>
			<?php echo do_shortcode( '[kadence_element id=" 202"]' ); ?>
		<?php else : ?>
			<div id="customProject"></div>
			<?php
		endif;
		return ob_get_clean();
	}

	public function homepage_grid() {
		ob_start();
		if ( have_rows( 'homepage_grid' ) ) :
			?>
			<div class="homepage-layout mobile-slider">
				<?php
				while ( have_rows( 'homepage_grid' ) ) :
					the_row();
					$image = get_sub_field( 'image' )['id'];
					?>

					<div class="homepage-layout-item">
						<?php echo wp_get_attachment_image( $image, 'full' ); ?>
						<div class="homepage-layout-content">
							<h3 class="mb-0"><?php echo get_sub_field( 'title' ); ?></h3>
							<p><?php echo get_sub_field( 'content' ); ?></p>
						</div>
						<?php if ( get_sub_field( 'link' ) ) : ?>
							<a href="<?php echo get_sub_field( 'link' ); ?>"></a>
						<?php endif; ?>
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

		$business_id = get_field( 'business_id', 'user_' . $user_id );
		$user_data = get_userdata( $user_id );
		$user_email = $user_data->user_email;
		$firstName = $user_data->first_name;
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
		if ( is_user_logged_in() ) {
			return;
		}
		wp_enqueue_script( 'nova-registration' );
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