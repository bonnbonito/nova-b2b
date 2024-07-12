document.addEventListener('DOMContentLoaded', function () {
	const updateCRMSheet = document.getElementById('updateCRMSheet');
	updateCRMSheet.addEventListener('click', handleUpdateCRM);

	async function handleUpdateCRM(e) {
		e.preventDefault();
		updateCRMSheet.disabled = true;
		updateCRMSheet.innerText = 'Getting partners...';

		try {
			const response = await downloadCRMSheet();
			const data = await response.json();
			console.log('Fetch Partners Response:', data);
			updateCRMSheet.innerText = 'Update Complete!';
		} catch (error) {
			console.error('Error:', error);
			updateCRMSheet.innerText = 'Update Failed';
		} finally {
			updateCRMSheet.disabled = true;
		}
	}

	async function downloadCRMSheet() {
		const formData = new FormData();
		formData.append('action', 'download_crm_sheet');
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

		const csvData = convertToCSV(data.partners);
		const blob = new Blob([csvData], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('download', 'partners.csv');
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		return data.partners;
	}

	function convertToCSV(data) {
		const array = typeof data !== 'object' ? JSON.parse(data) : data;
		let str = '';
		let row = '';

		for (const index in array[0]) {
			row += index + ',';
		}
		row = row.slice(0, -1);
		str += row + '\r\n';

		for (let i = 0; i < array.length; i++) {
			let line = '';
			for (const index in array[i]) {
				if (line !== '') line += ',';
				line += array[i][index];
			}
			str += line + '\r\n';
		}
		return str;
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
		const url = `${GoogleSheets.web_app_url}?action=clear&path=Partners (Master Copy)`;
		console.log('Clear Sheet URL:', url);
		const response = await fetch(url, { method: 'GET', mode: 'no-cors' });
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

		const response = await fetch(url, { method: 'GET', mode: 'no-cors' });
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const text = await response.text();
		console.log('Insert Partner Response:', text);
		return text;
	}
});
