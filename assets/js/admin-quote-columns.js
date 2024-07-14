document.addEventListener('DOMContentLoaded', function () {
	const quoteStatus = document.querySelectorAll(
		'.select-wrap select[name="quote_status"]'
	);

	quoteStatus.forEach(function (item) {
		item.addEventListener('change', function () {
			const selected = this.value;
			const quote_id = this.dataset.quoteId;

			/** disable the select dropdown */
			this.disabled = true;

			/** get the next element .spinner */
			const spinner = this.nextElementSibling;
			spinner.classList.add('is-active');

			/** ajax call to update quote status */
			const data = new FormData();
			data.append('action', 'update_quote_status');
			data.append('quote_status', selected);
			data.append('nonce', AdminQuote.nonce);
			data.append('post_id', quote_id);

			fetch(AdminQuote.ajax_url, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Cache-Control': 'no-cache',
				},
				body: data,
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					this.style.borderColor = data.color;
					this.disabled = false;
					spinner.classList.remove('is-active');
				})
				.catch((error) => {
					this.disabled = false;
					console.error('Error:', error);
					spinner.classList.remove('is-active');
				});
		});
	});
});
