export function getLogoPricingTablebyThickness(thickness, logoPricingObject) {
	const table = logoPricingObject?.find(
		(element) => element.logo_pricing.logo_size === thickness
	);

	return table ? table.logo_pricing.logo_pricing_table : undefined;
}

export function getLetterPricingTableByTitle(title, letterPricingObject) {
	const table = letterPricingObject?.find(
		(element) => element.letter_pricing.title === title
	);

	return table ? table.letter_pricing.letter_pricing_table : undefined;
}

export function spacerPricing(total) {
	let maxVal = 25;

	let spacer = total * 0.02 > maxVal ? maxVal : total * 0.02;
	spacer = parseFloat(spacer.toFixed(2));

	return spacer;
}
