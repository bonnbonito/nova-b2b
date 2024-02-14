function novaLogin(formID) {
	const novaLoginForm = document.getElementById(formID);
	const loginStatus = document.getElementById('loginStatus');

	if (novaLoginForm)
		novaLoginForm.addEventListener('submit', function (event) {
			event.preventDefault();
			loginStatus.innerHTML = ``;
			const submitBtn = document.getElementById('submitBtn');

			submitBtn.classList.add('cursor-not-allowed', 'flex', 'justify-center');
			submitBtn.setAttribute('disabled', '');
			submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Please wait...`;

			var formData = new FormData(this);

			formData.append('nonce', NovaLogin.nonce);

			fetch(NovaLogin.ajax_url, {
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
						submitBtn.remove();
						loginStatus.innerHTML = `<div class="login-status">Refreshing...</div>`;
						if (data.is_product == 'yes' || data.reload == 'yes') {
							location.reload(true);
						} else {
							window.location.href = NovaLogin.dashboard_url;
						}
					} else {
						loginStatus.innerHTML = `<div class="login-status error">${data.error}</div>`;
					}

					submitBtn.classList.remove(
						'cursor-not-allowed',
						'flex',
						'justify-center'
					);
					submitBtn.removeAttribute('disabled', '');
					submitBtn.innerHTML = `Login`;
				})
				.catch((error) => console.error('Error:', error));
		});
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', novaLogin('novaLoginForm'));
} else {
	// `DOMContentLoaded` has already fired
	novaLogin('novaLoginForm');
}
