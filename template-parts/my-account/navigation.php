<div class="nova-account-navaigation  w-full border border-solid border-[#D2D2D2] p-4 rounded self-start">
	<?php do_action( 'nova_inner_account_nav' ); ?>

	<div class="">
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'my-account' ) ); ?>"
			class="block mt-10 block text-[14px] font-title text-black uppercase mb-2">DASHBOARD</a>
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'edit-account' ) ); ?>"
			class="block text-[14px] font-title text-black uppercase mb-2">ACCOUNT</a>
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'edit-address' ) ); ?>"
			class="block text-[14px] font-title text-black uppercase mb-2">ADDRESS</a>
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/all' ) ); ?>"
			class="block mt-4 md:mt-0 text-[14px] font-title text-black uppercase mb-2">MOCKUPS</a>
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/drafts' ) ); ?>"
			class="block text-[12px] text-black uppercase mb-2 pl-4">DRAFTS</a>
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/processing' ) ); ?>"
			class="block text-[12px] text-black uppercase mb-2 pl-4">PROCESSING</a>
		<a href="<?php echo esc_url( wc_get_endpoint_url( 'mockups/payments' ) ); ?>"
			class="block text-[12px] text-black uppercase mb-2 pl-4">QUOTED</a>

		<a href="<?php echo esc_url( wc_get_endpoint_url( 'orders' ) ); ?>"
			class="block text-[14px] font-title text-black uppercase mb-2">ORDERS</a>

		<a href="<?php echo esc_url( wc_get_endpoint_url( 'invoice-history' ) ); ?>"
			class="text-[14px] font-title text-black uppercase mb-2 hidden">Invoice History</a>

	</div>


	<div class="block mt-4 md:mt-10">
		<div class="flex text-nova-primary text-sm uppercase font-title items-center">
			<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
				<path
					d="M10.5 20.125V18.375H16.625V17.5H13.125V10.5H16.625V9.625C16.625 7.93333 16.0271 6.48958 14.8313 5.29375C13.6354 4.09792 12.1917 3.5 10.5 3.5C8.80833 3.5 7.36458 4.09792 6.16875 5.29375C4.97292 6.48958 4.375 7.93333 4.375 9.625V10.5H7.875V17.5H2.625V9.625C2.625 8.54583 2.83281 7.52865 3.24844 6.57344C3.66406 5.61823 4.22917 4.78333 4.94375 4.06875C5.65833 3.35417 6.49323 2.78906 7.44844 2.37344C8.40365 1.95781 9.42083 1.75 10.5 1.75C11.5792 1.75 12.5964 1.95781 13.5516 2.37344C14.5068 2.78906 15.3417 3.35417 16.0562 4.06875C16.7708 4.78333 17.3359 5.61823 17.7516 6.57344C18.1672 7.52865 18.375 8.54583 18.375 9.625V20.125H10.5ZM4.375 15.75H6.125V12.25H4.375V15.75ZM14.875 15.75H16.625V12.25H14.875V15.75Z"
					fill="#F22E00" />
			</svg>
			<span class="ml-2">NOVA SUPPORT</span>
		</div>
		<p class="text-[10px] block mt-4 mb-5">Call, email or live chat us for support</p>
		<a href="/contact-us"
			class="px-4 py-2 text-xs uppercase font-title text-nova-gray block border rounded-sm text-center hover:bg-nova-gray hover:text-white">Contact
			Us</a>
	</div>



</div>
