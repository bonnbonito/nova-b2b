function display_logo_pricing_table() {
	const logoPricingTables = AdminSignage.logo_pricing_tables;
	const logoOutput = document.querySelectorAll('.logo-output');

	if (logoPricingTables.length > 0) {
		const logoSizes = logoPricingTables.map(
			(item) => item.logo_pricing.logo_size
		);

		logoPricingTables.forEach((table, index) => {
			const pricingTable = convertTableToJson(
				table.logo_pricing.logo_pricing_table
			);

			console.log(index);

			if (pricingTable) {
				const tableContent = jsonToTable(pricingTable);
				logoOutput[index].appendChild(tableContent);
			}

			console.log(pricingTable);
		});
	}
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', display_logo_pricing_table);
} else {
	// `DOMContentLoaded` has already fired
	display_logo_pricing_table();
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

function convertTableToJson(table) {
	// Split the input by rows
	const rows = table.trim().split('\n');

	// Get the headers by splitting the first row by tabs
	const headers = rows.shift().trim().split('\t');

	// Map the rest of the rows into objects
	const jsonArray = rows.map((row) => {
		const values = row.trim().split('\t');
		let object = headers.reduce((acc, header, index) => {
			acc[header] = values[index];
			return acc;
		}, {});
		return object;
	});

	return jsonArray;
}

function jsonToTable(jsonData) {
	// Create a div element to wrap the table
	const divWrapper = document.createElement('div');
	divWrapper.className = 'pricing-table-wrap';

	// Create a table element
	const table = document.createElement('table');
	table.className = 'pricing-table';

	// Add table header
	const thead = table.createTHead();
	const headerRow = thead.insertRow();
	const firstObject = jsonData[0];
	Object.keys(firstObject).forEach((key) => {
		const th = document.createElement('th');
		th.textContent = key;
		headerRow.appendChild(th);
	});

	// Add table body
	const tbody = table.createTBody();
	jsonData.forEach((obj) => {
		const row = tbody.insertRow();
		Object.values(obj).forEach((text, columnIndex) => {
			// If it's the first column, use 'th' instead of 'td'
			const cell =
				columnIndex === 0 ? document.createElement('th') : row.insertCell();
			cell.textContent = text;
			row.appendChild(cell);
		});
	});

	// Append the table to the div wrapper
	divWrapper.appendChild(table);

	return divWrapper;
}
