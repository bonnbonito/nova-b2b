function nova_order_approve() {
	const reviewLink = document.getElementById('reviewLink');
	const sendMockupEmail = document.getElementById('sendMockupEmail');

	reviewLink.innerHTML = OrderApprove.review_url;

	sendMockupEmail.addEventListener('click', async function (event) {
		event.preventDefault();

		/** if disabled, don't do anything */
		if (sendMockupEmail.disabled) {
			return;
		}

		const confirm = window.confirm(
			'Are you sure you want to send a mockup email to the customer?'
		);
		if (!confirm) {
			return;
		}

		sendMockupEmail.textContent = 'Please wait...';
		sendMockupEmail.disabled = true;

		const formData = new FormData();
		formData.append('action', 'update_email_mockup');
		formData.append('order_id', OrderApprove.order_id);
		formData.append('nonce', OrderApprove.nonce);

		const response = await fetch(OrderApprove.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		});
		const data = await response.json();
		if (data.success) {
			sendMockupEmail.textContent = 'Email sent';
		} else {
			sendMockupEmail.textContent = 'Error sending email';
		}
	});
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', nova_order_approve);
} else {
	// `DOMContentLoaded` has already fired
	nova_order_approve();
}
