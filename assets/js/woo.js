function updateCheckoutTotal(paymentSelected) {
	// Prepare data for AJAX request
	var data = new FormData();
	data.append('action', 'update_checkout_total');
	data.append('payment_select', paymentSelected);
	console.log(paymentSelected);

	// AJAX request to update the total

	fetch(wc_checkout_params.ajax_url, {
		method: 'POST',
		body: data,
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.success) {
				document.body.dispatchEvent(new Event('update_checkout'));
			}
		})
		.catch((error) => console.error('Error:', error));
}
