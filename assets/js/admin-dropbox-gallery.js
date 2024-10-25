function dropboxFetchImages() {
	const fetchBtn = document.getElementById('dropboxFetchImages');
	const folderPath = document.getElementById('dropbox_folder').value;
	const divActions = document.getElementById('divActions');

	fetchBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		divActions.classList.add('loading'); // Show loading spinner
		fetchBtn.disabled = true;
		fetchBtn.textContent = 'Checking folder...';

		const path = folderPath.replace(/%20/g, ' '); // Correct space handling
		const folderExists = await isFolderExist(path); // Check if folder exists

		if (!folderExists) {
			alert('Folder does not exist');
			fetchBtn.disabled = false;
			fetchBtn.textContent = 'Fetch Images';
			divActions.classList.remove('loading');
			return;
		}

		fetchBtn.textContent = 'Fetching images...';
		const images = await fetchImages(path); // Fetch images from Dropbox

		if (!images.length) {
			alert('No images found');
			fetchBtn.disabled = false;
			fetchBtn.textContent = 'Fetch Images';
			divActions.classList.remove('loading');
			return;
		}

		// Save images to post meta via AJAX
		const postID = NovaDropboxGallery.post_id; // Post ID
		const ajaxResponse = await saveFetchedImagesToPostMeta(postID, images);

		if (ajaxResponse.success) {
			console.log('Images successfully saved to post meta');
		} else {
			alert('Failed to save images to post meta');
			console.error(ajaxResponse.error);
		}

		// Display fetched images in the DOM
		const galleryDiv = document.getElementById('fetched-images');
		galleryDiv.innerHTML = ''; // Clear previous content
		images.forEach((image) => {
			const imgElement = document.createElement('img');
			imgElement.src = image.sharedLink;
			imgElement.alt = image.name;
			galleryDiv.appendChild(imgElement);
		});

		fetchBtn.textContent = 'Done';
		divActions.classList.remove('loading');
	});
}

async function saveFetchedImagesToPostMeta(postID, images) {
	try {
		const response = await fetch(ajaxurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				action: 'save_fetched_images',
				post_id: postID,
				images: JSON.stringify(images), // Send the array as a JSON string
			}),
		});

		const result = await response.json();

		if (!response.ok || !result.success) {
			throw new Error(result.error || 'Failed to save images');
		}

		return result;
	} catch (error) {
		console.error('Error saving fetched images to post meta:', error);
		return { success: false, error: error.message };
	}
}

async function checkExistingSharedLink(token, file) {
	const url = `https://api.dropboxapi.com/2/sharing/list_shared_links`;
	const params = {
		path: file,
		direct_only: true, // Only return links that point directly to the file
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});

		if (response.ok) {
			const data = await response.json();
			if (data.links && data.links.length > 0) {
				// Return the first shared link found
				return data.links[0].url.replace(/dl=0/, 'raw=1');
			} else {
				return null; // No shared link exists
			}
		} else {
			const error = await response.text();
			console.error('Error checking existing shared link:', error);
			return null;
		}
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}

async function generateSharedLink(token, file) {
	const url = `https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings`;
	const params = {
		path: file,
		settings: {
			requested_visibility: 'public',
		},
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});

		if (response.ok) {
			const data = await response.json();
			return data.url.replace(/dl=0/, 'raw=1'); // Return direct image link
		} else {
			const error = await response.text();
			console.error('Error generating shared link:', error);
			return null;
		}
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}

async function fetchImages(folderPath) {
	const accessToken = await getRefreshToken(); // Get the access token
	if (!accessToken) {
		console.error('Failed to get access token');
		return [];
	}

	try {
		const response = await fetch(
			'https://api.dropboxapi.com/2/files/list_folder',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					path: folderPath,
					recursive: true,
					include_media_info: false,
					include_deleted: false,
					include_has_explicit_shared_members: false,
				}),
			}
		);

		if (response.ok) {
			const data = await response.json();
			const entries = data.entries;
			const images = entries.filter(
				(entry) =>
					entry['.tag'] === 'file' && entry.name.match(/\.(jpg|jpeg|png|gif)$/i)
			);

			// Process each image to get or create shared links
			const processedImages = [];
			for (const image of images) {
				// Check if a shared link already exists
				let sharedLink = await checkExistingSharedLink(
					accessToken,
					image.path_lower
				);
				if (!sharedLink) {
					// If no shared link exists, create one
					sharedLink = await generateSharedLink(accessToken, image.path_lower);
				}

				if (sharedLink) {
					processedImages.push({
						name: image.name,
						size: image.size,
						sharedLink: sharedLink,
					});
				}
			}
			return processedImages;
		} else {
			if (response.status === 409) {
				console.error('Folder does not exist');
			} else {
				console.error('Error fetching images:', await response.text());
			}
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}

async function isFolderExist(folderPath) {
	const accessToken = await getRefreshToken(); // Get the access token
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

const getRefreshToken = async () => {
	const clientId = NovaDropboxGallery.dropbox_app_key;
	const clientSecret = NovaDropboxGallery.dropbox_secret;
	const refreshToken = NovaDropboxGallery.dropbox_refresh_token;

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

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		dropboxFetchImages();
	});
} else {
	dropboxFetchImages();
}
