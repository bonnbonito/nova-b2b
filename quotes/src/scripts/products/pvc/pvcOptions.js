import {
	GLOSS_FINISH,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../utils/defaults';

export const finishingOptions = [
	{
		name: 'Matte',
	},
	{
		name: GLOSS_FINISH,
	},
];

export const installationOptions = [
	{
		value: 'Plain',
	},
	{
		value: 'Double-sided tape',
	},
	{
		value: 'Pad - Combination All',
	},
	{
		value: STUD_MOUNT,
	},
	{
		value: STUD_WITH_SPACER,
	},
];

export const mountingOptions = [
	{
		value: 'Plain',
	},
	{
		value: 'Double-sided tape',
	},
	{
		value: 'Pad - Combination All',
	},
	{
		value: STUD_MOUNT,
	},
	{
		value: STUD_WITH_SPACER,
	},
];

export const thicknessOptions = [
	{
		thickness: '1/2"',
		value: '12mm',
	},
	{
		thickness: '3/4"',
		value: '20mm',
	},
	{
		thickness: '1"',
		value: '25mm',
	},
	{
		thickness: '1 1/2"',
		value: '40mm',
	},
];

export const metalLaminateOptions = [
	{
		option: 'Stainless Steel Brushed',
	},
	{
		option: 'Stainless Steel Polished',
	},
	{
		option: 'Black Titanium Brushed',
	},
	{
		option: 'Black Titanium Polished',
	},
	{
		option: 'Gold Brushed',
	},
	{
		option: 'Gold Polished',
	},
];
