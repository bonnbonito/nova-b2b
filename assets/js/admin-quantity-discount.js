function displayQuantityDiscountTable() {
	const quantityPricingTable = AdminSignage.multiple_quantity_discount;

	if (quantityPricingTable && quantityPricingTable.pricing_table) {
		const quantityPricingTableJson = convertJson(
			quantityPricingTable.pricing_table
		);

		if (quantityPricingTableJson.length > 0) {
			let headers = Object.keys(quantityPricingTableJson[0]);

			// Sort headers numerically, keeping 'Height' at the start
			headers = headers.sort((a, b) => {
				if (a === 'Height' || a === 'Depth') return -1;
				if (b === 'Height' || b === 'Depth') return 1;
				return parseFloat(a) - parseFloat(b);
			});

			const discountTable = createTable(quantityPricingTableJson, headers);
			const outputElement = document.getElementById('quatityTableDiscount');

			if (outputElement) {
				outputElement.appendChild(discountTable);
			}
		}
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', displayQuantityDiscountTable);
} else {
	displayQuantityDiscountTable();
}

function convertJson(tableString) {
	const rows = tableString.trim().split('\n');
	const headers = ['Quantity', 'Discount'];

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
				header === 'Quantity' ? document.createElement('th') : row.insertCell();
			const value = item[header];
			cell.textContent = value;
			row.appendChild(cell);
		});
	});

	return table;
}
