export const handleFileUpload = async (file, setFileUrl) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('nonce', NovaQuote.nonce);
	formData.append('action', 'upload_acrylic_file');

	fetch(NovaQuote.ajax_url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Cache-Control': 'no-cache',
		},
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.code == '2' && data.file) {
				console.log(data.file.url);
				setFileUrl(data.file.url);
			}
		})
		.catch((error) => console.error('Error:', error));
};

export const handleRemoveFile = async (fileUrl, setFileUrl) => {
	const formData = new FormData();
	formData.append('file', fileUrl);
	formData.append('nonce', NovaQuote.nonce);
	formData.append('action', 'remove_acrylic_file');

	fetch(NovaQuote.ajax_url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Cache-Control': 'no-cache',
		},
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.code == '2') {
				setFileUrl('');
			}
		})
		.catch((error) => console.error('Error:', error));
};
