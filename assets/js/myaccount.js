function novaMyAccount() {
	console.log('novaMyAccount');
	const quotationBtns = document.querySelectorAll('a[data-type="quotation"]');
	const checkoutBtns = document.querySelectorAll('a[data-type="checkout"]');

	quotationBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			process(btn, 'quote_to_processing');
		});
	});

	checkoutBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			process(btn, 'to_checkout');
		});
	});
}

function process(btn, action) {
	const quoteID = btn.dataset.id;
	console.log(quoteID);

	btn.setAttribute('disabled', '');
	btn.classList.add(
		'cursor-not-allowed',
		'flex',
		'justify-center',
		'items-center',
		'pointer-events-none'
	);
	btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Wait...`;

	const formData = new FormData();
	formData.append('action', action);
	formData.append('quote', quoteID);
	formData.append('nonce', NovaMyAccount.nonce);
	formData.append('role', NovaQuote.user_role[0]);
	if (action === 'to_checkout') {
		formData.append('nova_product', NovaQuote.nova_quote_product.ID);
		formData.append('product', btn.dataset.product);
	}

	fetch(NovaMyAccount.ajax_url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Cache-Control': 'no-cache',
		},
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			if (data.code == 2) {
				if (action === 'to_checkout') {
					let event = new Event('added_to_cart');
					document.body.dispatchEvent(event);
					btn.innerHTML = `Added to Cart`;
				} else {
					location.reload(true);
				}
			} else {
				alert(data.error);
				location.reload(true);
			}
		})
		.catch((error) => console.error('Error:', error));
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', novaMyAccount);
} else {
	// `DOMContentLoaded` has already fired
	novaMyAccount();
}
