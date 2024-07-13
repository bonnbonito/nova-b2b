<?php
/**
 * My Account Dashboard
 *
 * Shows the first intro screen on the account dashboard.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/dashboard.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$allowed_html = array(
	'a' => array(
		'href' => array(),
	),
);
?>

<div class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'edit-account' ) ); ?>"
		class="border border-solid border-[#D2D2D2] p-4 rounded-md">
		<h4 class="flex gap-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
				viewBox="0 0 16 16" fill="none">
				<path
					d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z"
					fill="#F22E00" />
			</svg> MANAGE ACCOUNT</h4>
		<p class="tracking-[1.4px] text-black text-[14px] leading-loose">Update personal information and preferences.
		</p>
	</a>
	<a href=" <?php echo esc_url( wc_get_endpoint_url( 'mockups/all' ) ); ?>"
		class="border border-solid border-[#D2D2D2] p-4 rounded-md">
		<h4 class="flex gap-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20"
				viewBox="0 0 18 20" fill="none">
				<path
					d="M0 20V2H6.175C6.35833 1.41667 6.71667 0.9375 7.25 0.5625C7.78333 0.1875 8.36667 0 9 0C9.66667 0 10.2625 0.1875 10.7875 0.5625C11.3125 0.9375 11.6667 1.41667 11.85 2H18V20H0ZM2 18H16V4H14V7H4V4H2V18ZM9 4C9.28333 4 9.52083 3.90417 9.7125 3.7125C9.90417 3.52083 10 3.28333 10 3C10 2.71667 9.90417 2.47917 9.7125 2.2875C9.52083 2.09583 9.28333 2 9 2C8.71667 2 8.47917 2.09583 8.2875 2.2875C8.09583 2.47917 8 2.71667 8 3C8 3.28333 8.09583 3.52083 8.2875 3.7125C8.47917 3.90417 8.71667 4 9 4Z"
					fill="#F22E00" />
			</svg>VIEW MOCKUPS</h4>

		<p class="tracking-[1.4px] text-black text-[14px] leading-loose">Preview and customize your signage projects in
			real-time to see it before production.</p>
	</a>
	<a href="<?php echo esc_url( wc_get_endpoint_url( 'orders' ) ); ?>"
		class="border border-solid border-[#D2D2D2] p-4 rounded-md">
		<h4 class="flex gap-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20"
				viewBox="0 0 16 20" fill="none">
				<path d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM0 20V0H10L16 6V20H0ZM9 7V2H2V18H14V7H9Z" fill="#F22E00" />
			</svg> VIEW ORDERS</h4>

		<p class="tracking-[1.4px] text-black text-[14px] leading-loose">Track your orders seamlessly and stay informed
			about the status and progress of your projects.
		</p>
	</a>
	<a href="#" class="border border-solid border-[#D2D2D2] p-4 rounded-md hidden">
		<h4 class="flex gap-3 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
				viewBox="0 0 18 18" fill="none">
				<path
					d="M0 18V0H11V2H2V16H16V7H18V18H0ZM14 6V4H12V2H14V0H16V2H18V4H16V6H14ZM3 14H15L11.25 9L8.25 13L6 10L3 14ZM2 8V16V2V8Z"
					fill="#F22E00" />
			</svg> SEND COMPLETED PHOTOS</h4>

		<p class="tracking-[1.4px] text-black text-[14px] leading-loose">Share your order’s photo to us so we can
			feature your sign on our channels.
		</p>
	</a>
</div>


<?php
	/**
	 * My Account dashboard.
	 *
	 * @since 2.6.0
	 */
	do_action( 'woocommerce_account_dashboard' );

	/**
	 * Deprecated woocommerce_before_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_before_my_account' );

	/**
	 * Deprecated woocommerce_after_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_after_my_account' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
