function display_letters_pricing_table() {
	console.info('DOM loaded');

	const letterPricingTable = AdminSignage.letter_pricing_table;

	if (letterPricingTable) {
		const letterPricingTableJson = convert_json(
			letterPricingTable.pricing_table
		);

		const headers =
			letterPricingTableJson.length > 0
				? [
						'Height',
						...Object.keys(letterPricingTableJson[0]).filter(
							(key) => key !== 'Height'
						),
				  ]
				: [];

		if (headers.length > 0) {
			const letterHeightTable = createTable(letterPricingTableJson, headers);

			document
				.getElementById('outputLetterTable')
				.appendChild(letterHeightTable);
		}
	}
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', display_letters_pricing_table);
} else {
	// `DOMContentLoaded` has already fired
	display_letters_pricing_table();
}

function convert_json(tableString) {
	const rows = tableString.trim().split('\n');

	// Use the first row as headers
	const headers = rows[0].trim().split('\t');

	// Map over the remaining rows to create objects
	return rows.slice(1).map((row) => {
		const values = row.split('\t');
		let obj = headers.reduce((acc, header, index) => {
			// Remove commas and convert to the appropriate type
			const value = values[index]
				? parseFloat(values[index].replace(/,/g, ''))
				: null;
			acc[header] = value;
			return acc;
		}, {});
		return obj;
	});
}

function createTable(dataArray, headers) {
	// Create the table element and add class
	const table = document.createElement('table');
	table.className = 'pricing-table';

	// Generate the header row
	const thead = table.createTHead();
	const headerRow = thead.insertRow();
	headers.forEach((text) => {
		const th = document.createElement('th');
		th.textContent = text;
		headerRow.appendChild(th);
	});

	// Generate the data rows
	const tbody = table.createTBody();
	dataArray.forEach((item) => {
		const row = tbody.insertRow();

		// Add the 'Height' as the first cell in the row, as a header cell
		const th = document.createElement('th');
		th.textContent = item.Height;
		row.appendChild(th);

		// Append data cells for each key, excluding 'Height' as it's already added
		headers.slice(1).forEach((key) => {
			// Skip the first header 'Height'
			const cell = row.insertCell();
			// If the value is not null, remove commas and parse it as a float
			// Otherwise, keep it as an empty string
			const floatValue = parseFloat((item[key] + '').replace(/,/g, ''));
			cell.textContent = !isNaN(floatValue) ? floatValue.toFixed(2) : '';
		});
	});

	return table;
}
