import React, { useRef, useState } from 'react';

export default function UploadFiles({
	setFilePaths,
	filePaths,
	setFileUrls,
	fileUrls,
	setFileNames,
	fileNames,
	tempFolder,
	isLoading,
	setIsLoading,
}) {
	const fileRef = useRef(null);
	const [accessToken, setAccessToken] = useState('');
	const maxFiles = 5;

	const handleButtonClick = () => {
		console.log(fileNames);
		if (fileNames?.length >= maxFiles) {
			alert(`You can upload a maximum of ${maxFiles} files.`);
			return;
		}
		fileRef.current.click();
	};

	const handleChange = async (event) => {
		const totalAllowedUploads = maxFiles - (fileNames?.length || 0); // Calculate how many more files can be uploaded
		if (totalAllowedUploads <= 0) {
			alert(`You have reached the maximum upload limit of ${maxFiles} files.`);
			event.target.value = ''; // Reset the file input
			return;
		}

		const files = Array.from(event.target.files).slice(0, totalAllowedUploads); // Only take as many files as can still be uploaded
		if (files.length > 0) {
			for (const file of files) {
				await handleFileUpload(
					file,
					setFileUrls,
					setFileNames,
					setFilePaths,
					tempFolder
				);
			}
			event.target.value = ''; // Reset the file input after processing
		} else {
			console.log('No file to upload');
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

	const checkAndCreateFolder = async (accessToken) => {
		const folderPath = `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}/FromClient`;

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

	const checkForExistingSharedLink = async (token, filePath) => {
		const response = await fetch(
			'https://api.dropboxapi.com/2/sharing/list_shared_links',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ path: filePath, direct_only: true }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error_summary);
		}

		if (data.links && data.links.length > 0) {
			return data.links[0];
		}

		return null;
	};

	const handleFileUpload = async (
		file,
		setFileUrls,
		setFileNames,
		setFilePaths,
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
			path: `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}/FromClient/${file.name}`,
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

			setFilePaths((prev) =>
				Array.isArray(prev)
					? [...prev, uploadData.path_display]
					: [uploadData.path_display]
			);

			const existingLink = await checkForExistingSharedLink(
				token,
				uploadData.path_display
			);

			if (existingLink) {
				setFileUrls((prev) =>
					Array.isArray(prev) ? [...prev, existingLink.url] : [existingLink.url]
				);
			} else {
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

				const sharedLinkData = await sharedLinkResponse.json();
				setFileUrls((prev) =>
					Array.isArray(prev)
						? [...prev, sharedLinkData.url]
						: [sharedLinkData.url]
				);
			}

			setFileNames((prev) =>
				Array.isArray(prev) ? [...prev, uploadData.name] : [uploadData.name]
			);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveFile = async (index) => {
		setIsLoading(true);
		let currentAccessToken = accessToken || (await getRefreshToken());

		if (!currentAccessToken) {
			console.error('Failed to obtain access token');
			setIsLoading(false);
			return;
		}

		const filePath = filePaths[index];

		try {
			const response = await fetch(
				'https://api.dropboxapi.com/2/files/delete_v2',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${currentAccessToken}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ path: filePath }),
				}
			);

			const data = await response.json();

			if (response.ok) {
				setFileUrls(fileUrls.filter((_, i) => i !== index));
				setFilePaths(filePaths.filter((_, i) => i !== index));
				setFileNames(fileNames.filter((_, i) => i !== index));
			} else {
				throw new Error(
					data.error_summary || 'Unknown error during file deletion'
				);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="px-[1px]">
				<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
					UPLOAD PDF/AI FILE
				</label>
				<button
					className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]"
					onClick={handleButtonClick}
					aria-label="Upload design file"
					disabled={isLoading}
				>
					{isLoading ? 'Please wait...' : 'Upload Design'}
				</button>

				<input
					type="file"
					ref={fileRef}
					className="hidden"
					onChange={handleChange}
					accept=".pdf,.ai,.png,.jpg,.jpeg"
					aria-label="File input"
					multiple
				/>
			</div>
			<div className="col-span-4 mb-4">
				{fileNames?.length > 0 && (
					<div className="grid grid-cols-1 gap-2 text-sm border p-3 bg-slate-100">
						{fileNames.map((fileName, index) => (
							<div key={index} className="flex gap-4 items-center">
								{fileName}
								<button
									onClick={() => handleRemoveFile(index)}
									className="text-xs"
								>
									Remove
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
