/*
function updateCheckoutTotal(percentage) {
	// Prepare data for AJAX request
	var data = new FormData();
	data.append('action', 'update_checkout_total');
	data.append('percentage', percentage);

	// AJAX request to update the total
	fetch(wc_checkout_params.ajax_url, {
		method: 'POST',
		body: data,
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.success) {
				// Trigger update of the checkout page

				// // Get the current total
				// var currentTotal = parseFloat(
				// 	document
				// 		.querySelector('.order-total .woocommerce-Price-amount')
				// 		.textContent.replace(/[^0-9.-]+/g, '')
				// );

				// // Calculate new total
				// var newTotal =
				// 	percentage != 100 ? currentTotal * (percentage / 100) : currentTotal;

				// // Update the total on the page
				// document
				// 	.querySelectorAll('.order-total .woocommerce-Price-amount')
				// 	.forEach(function (elem) {
				// 		elem.textContent = newTotal.toFixed(2);
				// 	});

				document.body.dispatchEvent(new Event('update_checkout'));
			}
		})
		.catch((error) => console.error('Error:', error));
}
*/
