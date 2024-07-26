function novaMyAccount() {
	const quotationBtns = document.querySelectorAll('a[data-type="quotation"]');
	const checkoutBtns = document.querySelectorAll('a[data-type="checkout"]');
	const deleteBtns = document.querySelectorAll('a[data-type="delete"]');

	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const del = confirm('Are you sure you want to delete?');
			if (del) {
				deleteQuote(btn);
			}
		});
	});

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

function deleteQuote(btn) {
	const quoteID = btn.dataset.id;
	const parentElement = btn.parentNode;
	parentElement.classList.add('loading');
	const formData = new FormData();
	formData.append('action', 'delete_quote');
	formData.append('quote_id', quoteID);
	formData.append('nonce', NovaQuote.nonce);
	formData.append('role', NovaQuote.user_role[0]);
	parentElement.querySelector('.loading').classList.remove('hidden');

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
			if (data.code == 2) {
				location.reload(true);
				parentElement.style.opacity = '0';
				parentElement.style.transition = '.4s';
				parentElement.style.height = '0px';
				parentElement.style.padding = '0px';
				parentElement.style.margin = '0px';
				parentElement.style.overflow = 'hidden';
			} else {
				alert(data.error);
				location.reload(true);
			}
		})
		.catch((error) => console.error('Error:', error));
}

function process(btn, action) {
	const quoteID = btn.dataset.id;

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
		formData.append('product_id', btn.dataset.product_id);
		formData.append('product_line', btn.dataset.product_line);
	}

	console.log(action);

	fetch(NovaMyAccount.ajax_url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Cache-Control': 'no-cache',
		},
		body: formData,
	})
		.then((response) => {
			console.log(response);
			if (response.status === 200) {
				if (action === 'to_checkout') {
					const cartTotal = document.querySelector('.header-cart-total');
					cartTotal.innerText = parseInt(cartTotal.innerText) + 1;
					btn.innerHTML = `Added to Cart`;
					btn.classList.remove(
						'bg-green-600',
						'hover:bg-green-400',
						'cursor-pointer'
					);
					btn.classList.add('bg-gray-400', 'cursor-not-allowed');
					alert('Added to cart');
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
