export const acrylicChannelThicknessOptions = [
	{
		value: '1.2" (30mm)',
	},
];

export const acrylicFrontOptions = [
	{
		option: 'White',
	},
	{
		option: '3M 3630 Vinyl',
	},
	{
		option: '3M 3635 Vinyl',
	},
	{
		option: 'UV Printed',
	},
];

export const sideOptions = [
	{
		option: 'Metal Laminate',
	},
	{
		option: 'Painted',
	},
	{
		option: 'UV Printed',
	},
];

export const maxHeightOptions = Array.from(
	{
		length: 43,
	},
	(_, index) => {
		const val = 1 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

export const maxWidthOptions = Array.from(
	{
		length: 86,
	},
	(_, index) => {
		const val = 1 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);
