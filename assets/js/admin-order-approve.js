function nova_order_approve() {
	const reviewLink = document.getElementById('reviewLink');
	reviewLink.innerHTML = OrderApprove.review_url;
	if (OrderApprove.ticket_id) {
		has_zendesk_ticket();
	} else {
		const button = document.createElement('a');
		const sendMockupEmailDiv = document.getElementById('sendMockupEmailDiv');
		const zendeskTicket = document.getElementById('zendesk_ticket_id');
		button.id = 'createZendeskTicket';
		button.className = 'button button-primary';
		button.textContent = 'Add Zendesk Ticket';
		button.style.marginTop = '10px';
		button.href = '#zendesk_ticket_id';
		sendMockupEmailDiv.appendChild(button);
	}
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', nova_order_approve);
} else {
	// `DOMContentLoaded` has already fired
	nova_order_approve();
}

function has_zendesk_ticket() {
	const sendMockupEmailDiv = document.getElementById('sendMockupEmailDiv');
	const zendeskUsers = OrderApprove.zendesk_users;

	// Add styles
	const styles = `
		.zendesk-select-container {
			margin: 15px 0;
		}
		.zendesk-select {
			padding: 8px 12px;
			border: 1px solid #ddd;
			border-radius: 4px;
			font-size: 14px;
			width: 100%;
			max-width: 300px;
			margin-bottom: 10px;
		}
		.send-mockup-btn {
			background-color: #0073aa;
			color: white;
			padding: 8px 16px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 14px;
			transition: background-color 0.2s;
			display: none;
		}
		.send-mockup-btn:hover {
			background-color: #005c8a;
		}
		.send-mockup-btn:disabled {
			background-color: #ccc;
			cursor: not-allowed;
		}
	`;

	const styleSheet = document.createElement('style');
	styleSheet.textContent = styles;
	document.head.appendChild(styleSheet);

	// Create select element
	const selectContainer = document.createElement('div');
	selectContainer.className = 'zendesk-select-container';

	const selectUsers = document.createElement('select');
	selectUsers.className = 'zendesk-select';
	selectUsers.innerHTML = `
		<option value="">Select a Zendesk user...</option>
		${zendeskUsers
			.map((user) => `<option value="${user.email}">${user.email}</option>`)
			.join('')}
	`;

	// Create send mockup button
	const button = document.createElement('button');
	button.id = 'sendMockupEmail';
	button.className = 'send-mockup-btn';
	button.textContent = 'Send Mockup Email';

	// Add elements to container
	selectContainer.appendChild(selectUsers);
	selectContainer.appendChild(button);
	sendMockupEmailDiv.appendChild(selectContainer);

	// Show/hide button based on selection
	selectUsers.addEventListener('change', function () {
		button.style.display = this.value ? 'inline-block' : 'none';
	});

	button.addEventListener('click', async function (event) {
		event.preventDefault();

		/** if disabled, don't do anything */
		if (button.disabled) {
			return;
		}

		const confirm = window.confirm(
			'Are you sure you want to send a mockup email to the customer?'
		);
		if (!confirm) {
			return;
		}

		button.textContent = 'Please wait...';
		button.disabled = true;

		const formData = new FormData();
		formData.append('action', 'update_email_mockup');
		formData.append('order_id', OrderApprove.order_id);
		formData.append('nonce', OrderApprove.nonce);
		formData.append('zendesk_user', selectUsers.value);
		formData.append('ticket_id', OrderApprove.ticket_id);

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
			button.textContent = 'Email sent';
		} else {
			button.textContent = 'Error sending email';
		}
	});
}
