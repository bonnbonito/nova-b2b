const colorOptions = [
	{
		name: 'Custom Color',
		color: '#fff',
	},
	{
		name: 'Black',
		color: '#000000',
	},
	{
		name: 'White',
		color: '#ffffff',
	},
	{
		name: 'Pantone 428 C - Light Gray',
		color: '#c1c6c8',
	},
	{
		name: 'Pantone 429 C - Gray',
		color: '#A2AAAD',
	},
	{
		name: 'Pantone 431 C - Stone Gray',
		color: '#5b6770',
	},
	{
		name: 'Pantone 7506 C - Sand',
		color: '#efdbb2',
	},
	{
		name: 'Pantone 602 C - Canary Yellow',
		color: '#f0e87b',
	},
	{
		name: 'Pantone 102 C - Lemon Yellow',
		color: '#fce300',
	},
	{
		name: 'Pantone 116 C - Yellow',
		color: '#ffcd00',
	},
	{
		name: 'Pantone 137 C - Radiant Yellow',
		color: '#ffa300',
	},
	{
		name: 'Pantone 1505 C - Orange',
		color: '#ff6900',
	},
	{
		name: 'Pantone 1655 C - Burnt Orange',
		color: '#fc4c02',
	},
	{
		name: 'Pantone 1785 C - Salmon Pink',
		color: '#f8485e',
	},
	{
		name: 'Pantone 185 C - Red',
		color: '#e4002b',
	},
	{
		name: 'Pantone 186 C - Brick Red',
		color: '#c8102e',
	},
	{
		name: 'Pantone 201 C - Maroon',
		color: '#9d2235',
	},
	{
		name: 'Pantone 209 C - Mauve',
		color: '#6f263d',
	},
	{
		name: 'Pantone 220 C - Deep Pink',
		color: '#a50050',
	},
	{
		name: 'Pantone 211 C - Perwinkle Pink',
		color: '#f57eb6',
	},
	{
		name: 'Pantone 2665 C - Purple',
		color: '#7d55c7',
	},
	{
		name: 'Pantone 277 C - Light Blue',
		color: '#abcae9',
	},
	{
		name: 'Pantone 300 C - Blue',
		color: '#005eb8',
	},
	{
		name: 'Pantone 294 C - Peacock Blue',
		color: '#002f6c',
	},
	{
		name: 'Pantone 2756 C - Blue Violet',
		color: '#151f6d',
	},
	{
		name: 'Pantone 5395 C - Midnight Blue',
		color: '#081f2c',
	},
	{
		name: 'Pantone 320 C - Teal Blue',
		color: '#009CA6',
	},
	{
		name: 'Pantone 809 C - Safety Green',
		color: '#e3e829',
	},
	{
		name: 'Pantone 355 C - Sap Green',
		color: '#009639',
	},
	{
		name: 'Pantone 349 C - Emerald Green',
		color: '#046a38',
	},
	{
		name: 'Pantone 3455 C - Hunter Green',
		color: '#154734',
	},
	{
		name: 'Pantone 3308 C - Forest Green',
		color: '#034638',
	},
	{
		name: 'Pantone 476 C - Brown',
		color: '#4e3629',
	},
	{
		name: 'Pantone 4715 C - Spice Brown',
		color: '#956c58',
	},
	{
		name: 'Pantone 124 C - Brilliant Gold',
		color: '#eaaa00',
	},
	{
		name: 'Pantone 465 C - Gold',
		color: '#b9975b',
	},
	{
		name: 'Pantone 7407 C - Aztec Gold',
		color: '#cba052',
	},
	{
		name: 'Pantone 2319 C - Bronze',
		color: '#7f5f36',
	},
	{
		name: 'Pantone 209 C - Copper',
		color: '#6f263d',
	},
	{
		name: 'Silver',
		color: '#a6a9aa',
	},
];

const metalFinishColors = [
	{
		name: 'Stainless Steel Brushed',
		color: '#caccce',
	},
	{
		name: 'Stainless Steel Polished',
		color: '#caccce',
	},
	{
		name: 'Black Titanium Brushed',
		color: '#14130E',
	},
	{
		name: 'Black Titanium Polished',
		color: '#14130E',
	},
	{
		name: 'Gold Brushed',
		color: '#ffbf00',
	},
	{
		name: 'Gold Polished',
		color: '#ffbf00',
	},
];

const whiteOptions = [
	{
		option: 'White',
	},
	{
		option: '3M Vinyl',
	},
];

const whiteOptionsResin = [
	{
		option: 'White',
	},
	{
		option: '3M Vinyl',
	},
	{
		option: 'UV Printed',
	},
];

const translucentGraphicFilms = [
	{
		name: 'Ivory',
		color: '#ded1b4',
		code: '3630-005',
	},
	{
		name: 'Light Beige',
		color: '#c9bbae',
		code: '3630-149',
	},
	{
		name: 'Silver',
		color: '#b5b4bc',
		code: '3630-121',
	},
	{
		name: 'Gold Nugget',
		color: '#bf9152',
		code: '3630-141',
	},
	{
		name: 'Gold Metallic',
		color: '#a4896d',
		code: '3630-131',
	},
	{
		name: 'Bronze',
		color: '#b76e4b',
		code: '3630-129',
	},
	{
		name: 'Shadow Grey',
		color: '#8b858a',
		code: '3630-71',
	},
	{
		name: 'Silver Grey',
		color: '#858b91',
		code: '3630-51',
	},
	{
		name: 'Slate Grey',
		color: '#4e6478',
		code: '3630-61',
	},
	{
		name: 'Black',
		color: '#272e32',
		code: '3630-22',
	},
	{
		name: 'Duranodic',
		color: '#444041',
		code: '3630-69',
	},
	{
		name: 'Dark Brown',
		color: '#473434',
		code: '3630-59',
	},
	{
		name: 'Rust Brown',
		color: '#62322d',
		code: '3630-63',
	},
	{
		name: 'Light Rust Brown',
		color: '#6f332a',
		code: '3630-109',
	},
	{
		name: 'Burgundy',
		color: '#781729',
		code: '3630-49',
	},
	{
		name: 'Raspberry',
		color: '#ae044b',
		code: '3630-133',
	},
	{
		name: 'Vivid Rose',
		color: '#ca0f43',
		code: '3630-78',
	},
	{
		name: 'Rose Mauve',
		color: '#d96690',
		code: '3630-68',
	},
	{
		name: 'Cardinal Red',
		color: '#b10e22',
		code: '3630-53',
	},
	{
		name: 'Dark Red',
		color: '#b40b22',
		code: '3630-73',
	},
	{
		name: 'Red',
		color: '#bf1527',
		code: '3630-33',
	},
	{
		name: 'Regal Red',
		color: '#be1632',
		code: '3630-83',
	},
	{
		name: 'Poppy Red',
		color: '#d20d1a',
		code: '3630-143',
	},
	{
		name: 'Light Tomato Red',
		color: '#c90c15',
		code: '3630-43',
	},
	{
		name: 'Orange',
		color: '#d53b14',
		code: '3630-44',
	},
	{
		name: 'Tangerine',
		color: '#ed6c0b',
		code: '3630-84',
	},
	{
		name: 'Kumquat Orange',
		color: '#a4896d',
		code: '3630-74',
	},
	{
		name: 'Marigold',
		color: '#e59d00',
		code: '3630-75',
	},
	{
		name: 'Sunflower',
		color: '#dd9603',
		code: '3630-25',
	},
	{
		name: 'Golden Yellow',
		color: '#f0a901',
		code: '3630-125',
	},
	{
		name: 'Yellow',
		color: '#ecbf00',
		code: '3630-015',
	},
	{
		name: 'Light Lemon Yellow',
		color: '#d3ce05',
		code: '3630-115',
	},
	{
		name: 'Brilliant Green',
		color: '#43b110',
		code: '3630-106',
	},
	{
		name: 'Lime Green',
		color: '#35b225',
		code: '3630-136',
	},
	{
		name: 'Vivid Green',
		color: '#058342',
		code: '3630-156',
	},
	{
		name: 'Light Kelly Green',
		color: '#009a6b',
		code: '3630-146',
	},
	{
		name: 'Bright Jade Green',
		color: '#009b75',
		code: '3630-116',
	},
	{
		name: 'Green',
		color: '#026031',
		code: '3630-26',
	},
	{
		name: 'Holly Green',
		color: '#10502e',
		code: '3630-76',
	},
	{
		name: 'Dark Emerald Green',
		color: '#09502c',
		code: '3630-126',
	},
	{
		name: 'Torquioise',
		color: '#00898b',
		code: '3630-236',
	},
	{
		name: 'Teal Green',
		color: '#00788b',
		code: '3630-246',
	},
	{
		name: 'Evening Blue',
		color: '#879ac5',
		code: '3630-317',
	},
	{
		name: 'Light European Blue',
		color: '#0978bb',
		code: '3630-147',
	},
	{
		name: 'Olympic Blue',
		color: '#0478b6',
		code: '3630-57',
	},
	{
		name: 'Process Blue',
		color: '#0773c2',
		code: '3630-337',
	},
	{
		name: 'Intense Blue',
		color: '#0a5fb2',
		code: '3630-127',
	},
	{
		name: 'Bright Blue',
		color: '#0248a1',
		code: '3630-167',
	},
	{
		name: 'Bristol Blue',
		color: '#033998',
		code: '3630-97',
	},
	{
		name: 'Sultan Blue',
		color: '#062285',
		code: '3630-157',
	},
	{
		name: 'European Blue',
		color: '#152462',
		code: '3630-137',
	},
	{
		name: 'Blue',
		color: '#0e1466',
		code: '3630-36',
	},
	{
		name: 'Royal Blue',
		color: '#0e0173',
		code: '3630-87',
	},
	{
		name: 'Plum Purple',
		color: '#502960',
		code: '3630-128',
	},
	{
		name: 'Intense Magenta',
		color: '#a62579',
		code: '3630-118',
	},
	{
		name: 'Pink',
		color: '#da6bb4',
		code: '3630-108',
	},
];

export {
	colorOptions,
	metalFinishColors,
	translucentGraphicFilms,
	whiteOptions,
	whiteOptionsResin,
};
