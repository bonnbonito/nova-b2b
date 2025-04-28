document.addEventListener('DOMContentLoaded', () => {
	const button = document.querySelector('.mark-received-btn');
	if (!button) return;

	button.addEventListener('click', async (e) => {
		e.preventDefault();

		if (!confirm('Are you sure you want to mark this product as received?')) {
			return;
		}

		const orderId = button.dataset.orderId;
		button.disabled = true;

		try {
			const response = await fetch(novaLeadTime.ajaxurl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					action: 'mark_product_received',
					order_id: orderId,
					nonce: novaLeadTime.nonce,
				}),
			});

			const data = await response.json();

			if (data.success) {
				document.querySelector('.lead-time-current-status strong').textContent =
					data.data.new_status;
				button.remove();
			} else {
				button.disabled = false;
				alert('Error: ' + data.data);
			}
		} catch (error) {
			button.disabled = false;
			alert('Error updating status. Please try again.');
		}
	});
});
