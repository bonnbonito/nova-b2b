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

export function anodizedPricing(total, minVal = 30, percent = 0.25) {
	let price = total * percent < minVal ? minVal : total * percent;
	price = parseFloat(price.toFixed(2));

	return price;
}

export const quantityDiscount = (sets, quantityDiscountTable) => {
	if (!quantityDiscountTable) return 1;
	const discount = quantityDiscountTable.find(
		(item) => item.Quantity === sets.toString()
	);
	return discount?.Discount ?? 1;
};

export const calculateLetterPrice = (letter, baseLetterPrice, noLowerCase) => {
	let letterPrice = baseLetterPrice;

	if (letter === ' ') return 0;
	if (letter.match(/[a-z]/)) letterPrice *= noLowerCase ? 1 : 0.8;
	if (letter.match(/[`~"*,.\-']/)) letterPrice *= 0.3;

	return letterPrice;
};
