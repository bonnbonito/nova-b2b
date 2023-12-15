export const checkAndCreateFolder = async () => {
	const folderPath = `/NOVA-CRM/${NovaQuote.business_id}`;

	try {
		// Check if the folder exists
		let response = await fetch(
			'https://api.dropboxapi.com/2/files/get_metadata',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${NovaQuote.dropbox_token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					path: folderPath,
				}),
			}
		);

		const metadata = await response.json();

		if (response.ok) {
			console.log('Folder already exists:', metadata);
			return;
		}

		response = await fetch(
			'https://api.dropboxapi.com/2/files/create_folder_v2',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${NovaQuote.dropbox_token}`,
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
