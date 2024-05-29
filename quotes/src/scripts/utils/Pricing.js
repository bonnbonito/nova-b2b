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

export function spacerPricing(total, maxVal = 25, percent = 0.02) {
	let spacer = total * percent > maxVal ? maxVal : total * percent;
	spacer = parseFloat(spacer.toFixed(2));

	return spacer;
}

export const quantityDiscount = (sets, quantityDiscountTable) => {
	if (!quantityDiscountTable) return 1;
	const discount = quantityDiscountTable.find(
		(item) => item.Quantity === sets.toString()
	);
	return discount?.Discount ?? 1;
};
