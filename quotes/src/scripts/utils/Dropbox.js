const getRefreshToken = async () => {
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
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data.access_token;
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

const checkAndCreateFolder = async (accessToken) => {
	const folderPath = `/NOVA-CRM/${NovaQuote.business_id}`;

	try {
		// Check if the folder exists
		let response = await fetch(
			'https://api.dropboxapi.com/2/files/get_metadata',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					path: folderPath,
				}),
			}
		);

		const metadata = await response.json();

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
				body: JSON.stringify({
					autorename: false,
					path: folderPath,
				}),
			}
		);

		const data = await response.json();

		if (response.ok) {
			console.log('Folder created successfully:', data);
		} else {
			throw new Error(
				data.error_summary || 'Unknown error during folder creation'
			);
		}
	} catch (error) {
		// Handle errors for both checking and creating the folder
		console.error('Error:', error);
	}
};

const checkForExistingSharedLink = async (token, filePath) => {
	const response = await fetch(
		'https://api.dropboxapi.com/2/sharing/list_shared_links',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ path: filePath, direct_only: true }), // `direct_only: true` to get direct links only
		}
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error_summary);
	}

	// Check if any shared links exist for the file
	if (data.links && data.links.length > 0) {
		return data.links[0]; // Return the first shared link if available
	}

	return null; // Return null if no shared links exist
};

const handleFileUpload = async (file, setFileUrl, setFileName, setFilePath) => {
	setIsLoading(true);
	const token = await getRefreshToken();

	if (!token) {
		console.error('Failed to obtain access token');
		setIsLoading(false);
		return;
	}

	setAccessToken(token);
	await checkAndCreateFolder(token);

	const dropboxArgs = {
		path: `/NOVA-CRM/${NovaQuote.business_id}/${file.name}`,
		mode: 'overwrite',
		autorename: false,
		mute: false,
	};

	try {
		const uploadResponse = await fetch(
			'https://content.dropboxapi.com/2/files/upload',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Dropbox-API-Arg': JSON.stringify(dropboxArgs),
					'Content-Type': 'application/octet-stream',
				},
				body: file,
			}
		);

		const uploadData = await uploadResponse.json();
		if (!uploadResponse.ok) throw new Error(uploadData.error_summary);

		console.log('File updated successfully:', uploadData.path_display);

		setFilePath(uploadData.path_display);

		// Check for existing shared links
		const existingLink = await checkForExistingSharedLink(
			token,
			uploadData.path_display
		);

		if (existingLink) {
			console.log('Existing shared link found:', existingLink.url);
			setFileUrl(existingLink.url); // Use the existing shared link
		} else {
			// Create a new shared link if none exist
			const sharedLinkResponse = await fetch(
				'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						path: uploadData.path_display,
						settings: {},
					}),
				}
			);

			if (!sharedLinkResponse.ok) {
				console.error('Error response:', await sharedLinkResponse.text());
				throw new Error(
					`Error creating shared link: ${sharedLinkResponse.statusText}`
				);
			}

			const sharedLinkData = await sharedLinkResponse.json();
			setFileUrl(sharedLinkData.url); // Use the newly created shared link
		}

		setFileName(uploadData.name);
	} catch (error) {
		console.error('Error:', error.message);
	} finally {
		setIsLoading(false);
	}
};

const handleRemoveFile = async () => {
	setIsLoading(true);
	console.log(accessToken);
	console.log(filePath);
	try {
		const response = await fetch(
			'https://api.dropboxapi.com/2/files/delete_v2',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					path: filePath, // Assuming fileUrl contains the path of the file in Dropbox
				}),
			}
		);

		const data = await response.json();

		if (response.ok) {
			console.log('File removed:', data);
			setFileUrl('');
			setFilePath('');
			setFileName('');
		} else {
			throw new Error(
				data.error_summary || 'Unknown error during file deletion'
			);
		}
	} catch (error) {
		console.error('Error:', error);
	} finally {
		if (fileRef.current) {
			fileRef.current.value = '';
		}
		setIsLoading(false);
	}
};

export { handleFileUpload, handleRemoveFile };
