export default function convert_json(tableString) {
	const rows = tableString.trim().split('\n');

	// Use the first row as headers
	const headers = rows[0].trim().split('\t');

	// Map over the remaining rows to create objects
	return rows.slice(1).map((row) => {
		const values = row.split('\t');
		let obj = headers.reduce((acc, header, index) => {
			// Convert to the appropriate type; assuming all non-header values are numbers
			acc[header] = values[index]
				? parseFloat(values[index].replace(/,/g, ''))
				: null;
			return acc;
		}, {});
		return obj;
	});
}

export function convertJson(tableString) {
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
