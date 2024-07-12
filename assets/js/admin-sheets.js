document.addEventListener('DOMContentLoaded', function () {
	const updateCRMSheet = document.getElementById('updateCRMSheet');
	updateCRMSheet.addEventListener('click', handleUpdateCRM);

	async function handleUpdateCRM(e) {
		e.preventDefault();
		updateCRMSheet.disabled = true;
		updateCRMSheet.innerText = 'Getting partners...';

		try {
			const data = await fetchPartners();
			await clearSheet();
			await insertPartners(data);
			updateCRMSheet.innerText = 'Update Complete!';
		} catch (error) {
			console.error('Error:', error);
			updateCRMSheet.innerText = 'Update Failed';
		} finally {
			updateCRMSheet.disabled = true;
		}
	}

	async function fetchPartners() {
		const formData = new FormData();
		formData.append('action', 'update_crm_sheet');
		const response = await fetch(ajaxurl, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		});
		const data = await response.json();
		if (data.code !== 2) throw new Error('Failed to fetch partners');
		return data.data;
	}

	async function clearSheet() {
		const response = await fetch(
			`${GoogleSheets.web_app_url}?action=clear&path=Partners (Master Copy)`,
			{ method: 'GET' }
		);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const text = await response.text();
		console.log('Clear Sheet Response:', text);
		return text;
	}

	async function insertPartners(data) {
		for (const user of data) {
			updateCRMSheet.innerText = `Inserting ${user.name} into Google Sheets...`;
			await insertPartner(user);
		}
	}

	async function insertPartner(user) {
		const url = new URL(GoogleSheets.web_app_url);
		url.searchParams.append('action', 'write');
		url.searchParams.append('path', 'Partners (Master Copy)');
		for (const [key, value] of Object.entries(user)) {
			url.searchParams.append(key, value);
		}

		const response = await fetch(url, { method: 'GET' });
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const text = await response.text();
		console.log('Insert Partner Response:', text);
		return text;
	}
});
