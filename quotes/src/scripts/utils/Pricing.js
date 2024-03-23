export function getLogoPricingTablebyThickness(thickness, logoPricingObject) {
	const table = logoPricingObject?.find(
		(element) => element.logo_pricing.logo_size === thickness
	);

	return table ? table.logo_pricing.logo_pricing_table : undefined;
}
