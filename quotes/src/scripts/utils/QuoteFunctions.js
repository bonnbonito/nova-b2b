const processQuote = async (formData) => {
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
		return data;
	} catch (error) {
		console.error('Error:', error);
		return 'error'; // Return 'error' in case of an exception
	}
};

const SignageCount = (signage, type) =>
	signage.filter((sign) => sign.type === type).length;

export { SignageCount, processQuote };
