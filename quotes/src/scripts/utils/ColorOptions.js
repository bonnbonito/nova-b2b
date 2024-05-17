const colorOptions = [
	{
		name: 'Custom Color',
		color: '',
	},
	{
		name: 'White',
		color: '#ffffff',
	},
	{
		name: 'Black',
		color: '#000000',
	},
	{
		name: 'Dove Grey',
		color: '#6d6c6c',
	},
	{
		name: 'Grey',
		color: '#808080',
	},
	{
		name: 'Desert Sand',
		color: '#edc9af',
	},
	{
		name: 'Ivory',
		color: '#fffff0',
	},
	{
		name: 'Lemon Yellow',
		color: '#fffff0',
	},
	{
		name: 'Yellow',
		color: '#ffff00',
	},
	{
		name: 'Citrus Yellow',
		color: '#fef250',
	},
	{
		name: 'Sundance Yellow',
		color: '#ffae00',
	},
	{
		name: 'Schoolbus Yellow',
		color: '#e8a317',
	},
	{
		name: 'Orange',
		color: '#ffa500',
	},
	{
		name: 'Red-Orange',
		color: '#ff5349',
	},
	{
		name: 'Rampart Orange',
		color: '#ef5e54',
	},
	{
		name: 'Red',
		color: '#ff0000',
	},
	{
		name: 'Brick Red',
		color: '#cb4154',
	},
	{
		name: 'Black Cherry',
		color: '#5e0013',
	},
	{
		name: 'Maroon',
		color: '#800000',
	},
	{
		name: 'Magenta',
		color: '#ff00ff',
	},
	{
		name: 'Violet Toner',
		color: '#3d4d97',
	},
	{
		name: 'Purple',
		color: '#800080',
	},
	{
		name: 'Midnight Blue',
		color: '#191970',
	},
	{
		name: 'Dark Blue',
		color: '#00008b',
	},
	{
		name: 'Medium Blue',
		color: '#0000cd',
	},
	{
		name: 'Blue',
		color: '#0000ff',
	},
	{
		name: 'Light Blue',
		color: '#add8e6',
	},
	{
		name: 'Marine Reef Blue',
		color: '#305279',
	},
	{
		name: 'Teal',
		color: '#008080',
	},
	{
		name: 'Safety Green',
		color: '#c6d219',
	},
	{
		name: 'Spring Green',
		color: '#00ff7f',
	},
	{
		name: 'Emerald Green',
		color: '#50c878',
	},
	{
		name: 'Federal Green',
		color: '#005d39',
	},
	{
		name: 'Light Green',
		color: '#90ee90',
	},
	{
		name: 'Dark Green',
		color: '#013220',
	},
	{
		name: 'Hunter Green',
		color: '#355e3b',
	},
	{
		name: 'Brown',
		color: '#964b00',
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
