export const processQuote = async (formData) => {
	try {
		const response = await fetch(NovaQuote.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		});

		const data = await response.json();
		console.log(data); // Optional: to log the response data for debugging
		if (data.status === 'success') {
			return 'success';
		} else {
			return 'error';
		}
	} catch (error) {
		console.error('Error:', error);
		return 'error'; // Return 'error' in case of an exception
	}
};
