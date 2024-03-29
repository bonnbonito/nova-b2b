function displayLettersPricingTable() {
	console.info('DOM loaded');

	const letterPricingTable = AdminSignage.letter_pricing_table;
	const letterPricingTables = AdminSignage.letter_pricing_tables;
	console.log(letterPricingTables);

	if (letterPricingTables) {
		const letterOutput = document.querySelectorAll('.letter-output');

		letterPricingTables.forEach((table, index) => {
			const pricingTable = convertJson(
				table.letter_pricing.letter_pricing_table
			);

			if (pricingTable.length > 0) {
				let headers = Object.keys(pricingTable[0]);

				// Sort headers numerically, keeping 'Height' at the start
				headers = headers.sort((a, b) => {
					if (a === 'Height' || a === 'Depth') return -1;
					if (b === 'Height' || b === 'Depth') return 1;
					return parseFloat(a) - parseFloat(b);
				});

				const letterHeightTable = createTable(pricingTable, headers);

				letterOutput[index].appendChild(letterHeightTable);
			}
		});
	}

	if (letterPricingTable && letterPricingTable.pricing_table) {
		const letterPricingTableJson = convertJson(
			letterPricingTable.pricing_table
		);

		if (letterPricingTableJson.length > 0) {
			let headers = Object.keys(letterPricingTableJson[0]);

			// Sort headers numerically, keeping 'Height' at the start
			headers = headers.sort((a, b) => {
				if (a === 'Height' || a === 'Depth') return -1;
				if (b === 'Height' || b === 'Depth') return 1;
				return parseFloat(a) - parseFloat(b);
			});

			const letterHeightTable = createTable(letterPricingTableJson, headers);
			const outputElement = document.getElementById('outputLetterTable');

			if (outputElement) {
				outputElement.appendChild(letterHeightTable);
			}
		}
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', displayLettersPricingTable);
} else {
	displayLettersPricingTable();
}

function convertJson(tableString) {
	const rows = tableString.trim().split('\n');
	const headers = rows.shift().trim().split('\t');

	return rows.map((row) => {
		const values = row.split('\t');
		return headers.reduce((acc, header, index) => {
			const rawValue = values[index];
			acc[header] = rawValue
				? (index !== 0 ? parseFloat(rawValue.replace(/,/g, '')) : rawValue) ||
				  rawValue
				: null;
			return acc;
		}, {});
	});
}

function createTable(dataArray, headers) {
	const table = document.createElement('table');
	table.className = 'pricing-table';

	const thead = table.createTHead();
	const headerRow = thead.insertRow();
	headers.forEach((text) => {
		const th = document.createElement('th');
		th.textContent = text.toString();
		headerRow.appendChild(th);
	});

	const tbody = table.createTBody();
	dataArray.forEach((item) => {
		const row = tbody.insertRow();
		headers.forEach((header) => {
			const cell =
				header === 'Height' ? document.createElement('th') : row.insertCell();
			const value = item[header];
			cell.textContent = typeof value === 'number' ? value.toFixed(2) : value;
			row.appendChild(cell);
		});
	});

	return table;
}
