function dropbox_api() {
	const dropboxApi = document.getElementById('dropboxAPI');

	dropboxApi.addEventListener('click', (e) => {
		e.preventDefault();
		dropboxApi.innerText = 'Connecting...';

		// Define the necessary parameters
		const clientId = DropboxNova.app_key; // Replace with your Dropbox app's client ID
		const redirectUri = encodeURIComponent(DropboxNova.redirect_uri); // Replace with your redirect URI
		const state = DropboxNova.nonce; // Function to generate a unique state string

		// Redirect to Dropbox authorization page
		window.location.href = `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=code&token_access_type=offline&state=${state}&redirect_uri=${redirectUri}`;
	});
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', dropbox_api);
} else {
	// `DOMContentLoaded` has already fired
	dropbox_api();
}
