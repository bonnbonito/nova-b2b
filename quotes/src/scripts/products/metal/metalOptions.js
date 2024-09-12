import { STUD_MOUNT, STUD_WITH_SPACER } from '../../utils/defaults';

const metalOptions = [
	{
		option: '304 Stainless Steel',
	},
	{
		option: '316 Stainless Steel',
	},
];

const metalThicknessOptions = [
	{
		thickness: '1/8"',
		value: '4',
	},
	{
		thickness: '1/4"',
		value: '6',
	},
	{
		thickness: '3/8"',
		value: '9',
	},
	{
		thickness: '1/2"',
		value: '12',
	},
];

const fabricatedThicknessOptions = [
	{
		thickness: '0.5"',
		value: '0.5',
	},
	{
		thickness: '1"',
		value: '1',
	},
	{
		thickness: '1.5"',
		value: '1.5',
	},
	{
		thickness: '2"',
		value: '2',
	},
	{
		thickness: '3"',
		value: '3',
	},
	{
		thickness: '4"',
		value: '4',
	},
	{
		thickness: '5"',
		value: '5',
	},
	{
		thickness: '6"',
		value: '6',
	},
];

const finishOptions = [
	{
		option: 'Metal Finish',
	},
	{
		option: 'Painted Finish',
	},
];

const finishOptions2 = [
	{
		option: 'Metal',
	},
	{
		option: 'Painted',
	},
	{
		option: 'UV Printed',
	},
];

const stainlessSteelPolishedOptions = [
	{
		option: 'Standard (Face)',
	},
	{
		option: 'Premium (Face & Side)',
	},
];

const metalFinishOptions = [
	{
		option: 'Stainless Steel Brushed',
	},
	{
		option: 'Stainless Steel Polished',
	},
	{
		option: 'Electroplated Gold Brushed',
	},
	{
		option: 'Electroplated Gold Polished',
	},
	{
		option: 'Electroplated Black Titanium Brushed',
	},
	{
		option: 'Electroplated Black Titanium Polished',
	},
	{
		option: 'Electroplated Bronze Brushed',
	},
	{
		option: 'Electroplated Red Copper Brushed',
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
		name: 'Electroplated Gold Brushed',
		color: '#ffbf00',
	},
	{
		name: 'Electroplated Gold Polished',
		color: '#ffbf00',
	},
	{
		name: 'Electroplated Black Titanium Brushed',
		color: '#14130E',
	},
	{
		name: 'Electroplated Black Titanium Polished',
		color: '#14130E',
	},
	{
		name: 'Electroplated Bronze Brushed',
		color: '#CD7F32',
	},
	{
		name: 'Electroplated Red Copper Brushed',
		color: '#771B0C',
	},
];

const metalInstallationOptions = [
	{
		option: 'Plain',
	},
	{
		option: STUD_MOUNT,
	},
	{
		option: STUD_WITH_SPACER,
	},
];

const fabricatedLogoInstallationOptions = [
	{
		option: 'Plain Mount',
	},
	{
		option: STUD_MOUNT,
	},
];

const fabricatedMetalInstallationOptions = [
	{
		option: 'PVC Backing',
	},
	{
		option: STUD_MOUNT,
	},
	{
		option: STUD_WITH_SPACER,
	},
];

export {
	fabricatedLogoInstallationOptions,
	fabricatedMetalInstallationOptions,
	fabricatedThicknessOptions,
	finishOptions,
	finishOptions2,
	metalFinishColors,
	metalFinishOptions,
	metalInstallationOptions,
	metalOptions,
	metalThicknessOptions,
	stainlessSteelPolishedOptions,
};
