async function moveProjectFolder() {
	const moveProjectFolderbtn = document.getElementById('moveProjectFolder');
	if (!moveProjectFolderbtn) return;

	const projectPath = `/NOVA-CRM/A-Uncatergorize Project/${QuoteAdmin.project_id_folder}`;
	const newPath = `/NOVA-CRM/${QuoteAdmin.partner_business_id}/${QuoteAdmin.project_id_folder}`;

	moveProjectFolderbtn.addEventListener('click', async (e) => {
		e.preventDefault();
		moveProjectFolderbtn.textContent = 'Checking folder...';
		moveProjectFolderbtn.disabled = true;

		const folderExists = await isFolderExist(projectPath);
		if (!folderExists) {
			updateButton(moveProjectFolderbtn, 'Folder does not exist');
			const updateMeta = await updateUserMetaData(false);
			if (updateMeta) {
				console.log(updateMeta);
			}
			return;
		}

		const clientFolder = `/NOVA-CRM/A-Uncatergorize Project/${QuoteAdmin.project_id_folder}/Client Files`;

		if (
			!(await moveFilesInFolder(
				moveProjectFolderbtn,
				projectPath,
				clientFolder,
				'Creating Clients Folder...',
				'Creating Clients Folder Successful',
				'Error Creating Clients Folder'
			))
		) {
			const updateMeta = await updateUserMetaData(false);
			if (updateMeta) {
				console.log(updateMeta);
			}
			return;
		}

		if (
			!(await renameFolderWithFeedback(
				moveProjectFolderbtn,
				projectPath,
				newPath,
				'Moving...',
				'Moving Project Folder Successful',
				'Error Moving Folder'
			))
		) {
			const updateMeta = await updateUserMetaData(false);
			if (updateMeta) {
				console.log(updateMeta);
			}
			return;
		}

		const quoteFolder = `/NOVA-CRM/${QuoteAdmin.partner_business_id}/Q-${QuoteAdmin.quote_id}`;
		const newQuotePath = `/NOVA-CRM/${QuoteAdmin.partner_business_id}/${QuoteAdmin.project_id_folder}/Q-${QuoteAdmin.quote_id}`;

		const projectFolderStatus = await renameFolderWithFeedback(
			moveProjectFolderbtn,
			quoteFolder,
			newQuotePath,
			'Moving Quote Folder...',
			'Moving Quote Folder Successful',
			'Error Moving Quote Folder'
		);
		if (projectFolderStatus) {
			console.log(projectFolderStatus);
			const updateMeta = await updateUserMetaData(true);
			if (updateMeta) {
				console.log(updateMeta);
			}
		} else {
			const updateMeta = await updateUserMetaData(false);
			if (updateMeta) {
				console.log(updateMeta);
			}
		}
	});
}

function updateButton(button, message) {
	button.textContent = message;
	button.disabled = true;
}

async function renameFolderWithFeedback(
	button,
	oldPath,
	newPath,
	inProgressMessage,
	successMessage,
	errorMessage
) {
	try {
		button.textContent = inProgressMessage;
		const status = await renameDropboxFolder(oldPath, newPath);
		if (status) {
			button.textContent = successMessage;
			return true;
		} else {
			button.textContent = 'Move Failed';
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
		button.textContent = errorMessage;
		return false;
	}
}

async function isFolderExist(folderPath) {
	const accessToken = await getRefreshToken();
	if (!accessToken) {
		console.error('Failed to get access token');
		return false;
	}

	try {
		const response = await fetch(
			'https://api.dropboxapi.com/2/files/get_metadata',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					path: folderPath,
					include_media_info: false,
					include_deleted: false,
					include_has_explicit_shared_members: false,
				}),
			}
		);

		if (response.ok) {
			const data = await response.json();
			return data['.tag'] === 'folder';
		} else {
			if (response.status === 409) {
				console.error('Folder does not exist');
			} else {
				console.error('Error checking folder:', await response.text());
			}
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}

async function updateUserMetaData(status) {
	const formData = new FormData();
	formData.append('nonce', QuoteAdmin.nonce);
	formData.append('action', 'update_project_folder_status');
	formData.append('post_id', QuoteAdmin.quote_id);
	formData.append('status', status);

	try {
		console.log(formData);
		const response = await fetch(QuoteAdmin.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		});

		if (!response.ok) {
			const error = await response.text();
			console.error('Error updating user metadata:', error);
			throw new Error('Error updating user metadata');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}

async function updateDropboxFolder() {
	const updateDropboxFolderButtons = document.querySelectorAll(
		'a[data-btn="updateDropbox"]'
	);

	updateDropboxFolderButtons.forEach((button) => {
		button.addEventListener('click', async (e) => {
			e.preventDefault();

			button.textContent = 'Please wait'; // Change text content of each button
			// Disable all buttons and change text to "Please wait"
			updateDropboxFolderButtons.forEach((btn) => {
				btn.disabled = true;
			});

			const oldPath = button.dataset.old;
			const newPath = button.dataset.new;
			const postID = button.dataset.id;
			console.log(oldPath, newPath);

			try {
				const status = await renameDropboxFolder(oldPath, newPath);

				if (status) {
					const formData = new FormData();
					formData.append('action', 'update_signage');
					formData.append('nonce', QuoteAdmin.nonce);
					formData.append('old_path', oldPath);
					formData.append('new_path', newPath);
					formData.append('post_id', postID);
					formData.append('signage', QuoteAdmin.signage);

					const response = await fetch(QuoteAdmin.ajax_url, {
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Cache-Control': 'no-cache',
						},
						body: formData,
					});
					const data = await response.json();
					console.log(data);
					if (data.code == 2) {
						location.reload(); // Uncomment to reload the page if needed
					}
				}
			} catch (error) {
				console.error('Error:', error);
			} finally {
				// Re-enable all buttons and restore original text after operation
				updateDropboxFolderButtons.forEach((btn) => {
					btn.disabled = false;
					btn.textContent = 'Update Dropbox'; // Change back to original text or relevant text
				});
			}
		});
	});
}

async function renameDropboxFolder(oldPath, newPath) {
	const accessToken = await getRefreshToken();
	if (!accessToken) {
		console.error('Failed to get access token');
		return false; // indicate failure
	}

	const moveUrl = 'https://api.dropboxapi.com/2/files/move_v2';
	const moveParams = JSON.stringify({
		from_path: oldPath,
		to_path: newPath,
		autorename: true,
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
			console.error('Failed to move folder. Response:', error);
			throw new Error('Failed to move folder');
		}

		const moveData = await moveResponse.json();
		console.log('Folder moved successfully:', moveData);
		return true; // indicate success
	} catch (error) {
		console.error('Error moving folder:', error);
		return false; // indicate failure
	}
}

const getRefreshToken = async () => {
	const clientId = QuoteAdmin.dropbox_app_key;
	const clientSecret = QuoteAdmin.dropbox_secret;
	const refreshToken = QuoteAdmin.dropbox_refresh_token;

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

async function moveFilesInFolder(
	button,
	oldPath,
	newFolderPath,
	inProgressMessage,
	successMessage,
	errorMessage
) {
	const accessToken = await getRefreshToken();
	if (!accessToken) {
		console.error('Failed to get access token');
		updateButton(button, errorMessage);
		return false;
	}

	try {
		button.textContent = inProgressMessage;

		// Create the new folder inside the oldPath
		const createFolderUrl =
			'https://api.dropboxapi.com/2/files/create_folder_v2';
		const createFolderParams = JSON.stringify({ path: newFolderPath });

		const createFolderResponse = await fetch(createFolderUrl, {
			method: 'POST',
			body: createFolderParams,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!createFolderResponse.ok) {
			const error = await createFolderResponse.text();
			console.error('Failed to create folder. Response:', error);
			throw new Error('Failed to create folder');
		}

		// List the files in the oldPath
		const listFilesUrl = 'https://api.dropboxapi.com/2/files/list_folder';
		const listFilesParams = JSON.stringify({ path: oldPath });

		const listFilesResponse = await fetch(listFilesUrl, {
			method: 'POST',
			body: listFilesParams,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!listFilesResponse.ok) {
			const error = await listFilesResponse.text();
			console.error('Failed to list files. Response:', error);
			throw new Error('Failed to list files');
		}

		const listFilesData = await listFilesResponse.json();
		const files = listFilesData.entries.filter(
			(entry) => entry['.tag'] === 'file'
		);

		// Move each file to the new folder
		for (const file of files) {
			const moveFileUrl = 'https://api.dropboxapi.com/2/files/move_v2';
			const moveFileParams = JSON.stringify({
				from_path: file.path_lower,
				to_path: `${newFolderPath}/${file.name}`,
			});

			const moveFileResponse = await fetch(moveFileUrl, {
				method: 'POST',
				body: moveFileParams,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!moveFileResponse.ok) {
				const error = await moveFileResponse.text();
				console.error('Failed to move file. Response:', error);
				throw new Error('Failed to move file');
			}
		}

		button.textContent = successMessage;
		return true;
	} catch (error) {
		console.error('Error:', error);
		button.textContent = errorMessage;
		return false;
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		updateDropboxFolder();
		moveProjectFolder();
	});
} else {
	updateDropboxFolder();
	moveProjectFolder();
}
