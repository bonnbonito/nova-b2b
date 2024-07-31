export const renameFolder = async (oldPath, newPath) => {
	if (!oldPath || !newPath) return false;
	const accessToken = await getRefreshToken();
	if (!accessToken) {
		console.error('Failed to get access token');
		return false; // indicate failure
	}

	const moveUrl = 'https://api.dropboxapi.com/2/files/move_v2';
	const moveParams = JSON.stringify({
		from_path: oldPath,
		to_path: newPath,
		autorename: false,
	});

	try {
		const moveResponse = await fetch(moveUrl, {
			method: 'POST',
			body: moveParams,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!moveResponse.ok) {
			const error = await moveResponse.text(); // Get the text of the error response
			//console.error('Failed to move folder. Response:', error);
			throw new Error('Failed to move folder');
		}

		const moveData = await moveResponse.json();
		console.log('Folder moved successfully:', moveData);
		return true; // indicate success
	} catch (error) {
		console.error('Error moving folder:', error);
		return false; // indicate failure
	}
};

export const getRefreshToken = async () => {
	const clientId = NovaQuote.dropbox_app_key;
	const clientSecret = NovaQuote.dropbox_secret;
	const refreshToken = NovaQuote.dropbox_refresh_token;

	const url = 'https://api.dropboxapi.com/oauth2/token';
	const params = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: clientId,
		client_secret: clientSecret,
	});

	try {
		const response = await fetch(url, {
			method: 'POST',
			body: params,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		if (!response.ok) {
			const error = await response.text();
			console.error('Error getting access token:', error);
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data.access_token;
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

export const checkAndCreateFolder = async (folderPath) => {
	const accessToken = await getRefreshToken();
	if (!accessToken) {
		console.error('Failed to get access token');
		return false; // indicate failure
	}

	try {
		let response = await fetch(
			'https://api.dropboxapi.com/2/files/get_metadata',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ path: folderPath }),
			}
		);

		if (response.ok) {
			return;
		}

		response = await fetch(
			'https://api.dropboxapi.com/2/files/create_folder_v2',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ path: folderPath }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				data.error_summary || 'Unknown error during folder creation'
			);
		}
	} catch (error) {
		console.error('Error:', error);
	}
};
