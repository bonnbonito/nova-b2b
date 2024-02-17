function display_acryling_pricing_table() {
	console.info('DOM loaded');

	const adminSignageOptions = AdminSignage.quote_options;

	const acrylicPricing = convert_json(
		adminSignageOptions.letter_height_x_logo_pricing
	);

	if (acrylicPricing.length > 0) {
		const headers = ['Height', '3', '6', '9', '12', '19', '25', '38'];

		const acrylicTable = createTable(acrylicPricing, headers);

		document.getElementById('lettersPricingTable').appendChild(acrylicTable);
	}

	const logoThicknesses = [3, 6, 9, 12, 19, 25, 38];

	logoThicknesses.forEach((thickness) => {
		const pricingKey = `logo_pricing_${thickness}mm`;

		const table = adminSignageOptions.logo_pricing[pricingKey]
			? convertTableToJson(adminSignageOptions.logo_pricing[pricingKey])
			: false;

		if (table) {
			const tableContent = jsonToTable(table);
			document.getElementById(`logo-${thickness}mm`).appendChild(tableContent);
		}
	});
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', display_acryling_pricing_table);
} else {
	// `DOMContentLoaded` has already fired
	display_acryling_pricing_table();
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
