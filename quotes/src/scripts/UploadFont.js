import React, { useRef, useState } from 'react';
import { useAppContext } from './AppProvider';
import { processQuote } from './utils/QuoteFunctions';

export default function UploadFont({
	itemId,
	setFontFilePath,
	fontFilePath,
	setFontFileUrl,
	setFontFile,
	fontFileUrl,
	setFontFileName,
}) {
	const fileRef = useRef(null);

	const { signage, tempFolder, isLoading, setIsLoading } = useAppContext();

	const [accessToken, setAccessToken] = useState('');

	const handleButtonClick = () => {
		fileRef.current.click();
	};

	const handleChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFontFile(file);
			handleFileUpload(
				file,
				setFontFileUrl,
				setFontFileName,
				setFontFilePath,
				tempFolder
			);
			event.target.value = '';
		} else {
			console.log('no file to upload');
		}
	};

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

	function getFormattedDate() {
		const today = new Date();
		return today.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
	}

	const checkAndCreateFolder = async (accessToken) => {
		const folderPath = `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}/Fonts`;

		console.log(folderPath);

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

	const checkForExistingSharedLink = async (token, fontFilePath) => {
		const response = await fetch(
			'https://api.dropboxapi.com/2/sharing/list_shared_links',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ path: fontFilePath, direct_only: true }), // `direct_only: true` to get direct links only
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

	const handleFileUpload = async (
		file,
		setFontFileUrl,
		setFontFileName,
		setFontFilePath,
		tempFolder
	) => {
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
			path: `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}/Fonts/${file.name}`,
			mode: 'add',
			autorename: true,
			mute: false,
			strict_conflict: true,
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

			setFontFilePath(uploadData.path_display);

			let dataLink = '';

			// Check for existing shared links
			const existingLink = await checkForExistingSharedLink(
				token,
				uploadData.path_display
			);

			if (existingLink) {
				console.log('Existing shared link found:', existingLink.url);
				setFontFileUrl(existingLink.url); // Use the existing shared link
				dataLink = existingLink.url;
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
				setFontFileUrl(sharedLinkData.url); // Use the newly created shared link
				dataLink = sharedLinkData.url;
			}

			setFontFileName(uploadData.name);

			if (parseInt(NovaQuote.is_editting) === 1 && itemId) {
				await updateSignageAdd(
					uploadData.name,
					dataLink,
					uploadData.path_display
				);
			}
		} catch (error) {
			console.error('Error:', error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveFile = async () => {
		setIsLoading(true);
		let currentAccessToken = accessToken;

		if (!currentAccessToken) {
			console.log('no access token');
			const token = await getRefreshToken();

			if (!token) {
				console.error('Failed to obtain access token');
				setIsLoading(false);
				return;
			}

			setAccessToken(token);
			currentAccessToken = token;
		}

		console.log(fontFilePath);
		try {
			const response = await fetch(
				'https://api.dropboxapi.com/2/files/delete_v2',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${currentAccessToken}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						path: fontFilePath, // Assuming fontFileUrl contains the path of the file in Dropbox
					}),
				}
			);

			const data = await response.json();

			if (response.ok) {
				console.log('File removed:', data);
				setFontFileUrl('');
				setFontFilePath('');
				setFontFileName('');
				await updateSignageDelete();
			} else {
				throw new Error(
					data.error_summary || 'Unknown error during file deletion'
				);
			}
		} catch (error) {
			console.error('Error:', error);
			setFontFileUrl('');
			setFontFilePath('');
			setFontFileName('');
			await updateSignageDelete();
		} finally {
			if (fileRef.current) {
				fileRef.current.value = '';
			}
			setIsLoading(false);
		}
	};

	const updateSignageAdd = async (fontFileName, fontFilePath, fontFileUrl) => {
		if (parseInt(NovaQuote.is_editting) === 1 && itemId) {
			const updateDetails = {
				fontFileName,
				fontFilePath,
				fontFileUrl,
			};

			const updatedSignage = signage.map((sign) =>
				sign.id === itemId ? { ...sign, ...updateDetails } : sign
			);

			try {
				const formData = new FormData();
				const newSignage = JSON.stringify(updatedSignage);
				formData.append('nonce', NovaQuote.nonce);
				formData.append('action', 'update_quote');
				formData.append('signage', newSignage);
				formData.append('quote_id', NovaQuote.current_quote_id);

				const data = await processQuote(formData);

				if (data.status !== 'success') {
					throw new Error('Error updating quote');
				}

				console.log('Quote updated successfully');
			} catch (err) {
				// Handle errors
				console.log(err);
			}
		}
	};

	const updateSignageDelete = async () => {
		if (parseInt(NovaQuote.is_editting) === 1 && itemId) {
			const updateDetails = {
				fontFile: '',
				fontFileName: '',
				fontFilePath: '',
				fontFileUrl: '',
			};

			const updatedSignage = signage.map((sign) =>
				sign.id === itemId ? { ...sign, ...updateDetails } : sign
			);

			try {
				const formData = new FormData();
				const newSignage = JSON.stringify(updatedSignage);
				console.log(newSignage);
				formData.append('nonce', NovaQuote.nonce);
				formData.append('action', 'update_quote');
				formData.append('signage', newSignage);
				formData.append('quote_id', NovaQuote.current_quote_id);

				const data = await processQuote(formData);

				if (data.status !== 'success') {
					throw new Error('Error updating quote');
				}

				console.log('Quote updated successfully');
			} catch (err) {
				// Handle errors
				console.log(err);
			}
		}
	};

	return (
		<div className="px-[1px]">
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				UPLOAD TTF/OTF File
			</label>

			{!fontFileUrl ? (
				<button
					className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]"
					onClick={handleButtonClick}
					aria-label="Upload font file"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex justify-center items-center">Uploading...</div>
					) : (
						'Upload Font'
					)}
				</button>
			) : (
				<button
					className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-red-600 hover:bg-red-400 font-title leading-[1em]"
					onClick={handleRemoveFile}
					aria-label="Remove front file"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex justify-center items-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Removing...
						</div>
					) : (
						<div className="flex items-center justify-center">
							Remove Font file
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
					)}
				</button>
			)}
			<input
				type="file"
				ref={fileRef}
				class="hidden"
				onChange={handleChange}
				accept=".ttf,.otf,.woff,.woff2,.zip,.rar,.png,.jpg,.jpeg,.pdf,.ai"
				aria-label="Font File input"
			/>
		</div>
	);
}
