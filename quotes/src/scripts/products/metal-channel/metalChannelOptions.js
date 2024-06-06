import { STUD_MOUNT, STUD_WITH_SPACER } from '../../utils/defaults';

const mountingDefaultOptions = [
	{
		value: STUD_MOUNT,
	},
	{
		value: STUD_WITH_SPACER,
	},
];

const finishingOptions = [
	{
		value: 'Painted',
	},
	{
		value: 'Metal',
	},
];

const depthOptions = [
	{
		depth: '1.4"',
		value: '3.5',
	},
	{
		depth: '2"',
		value: '5',
	},
	{
		depth: '3.2"',
		value: '8',
	},
];

const frontBackdepthOptions = [
	{
		depth: '2"',
		value: '5',
	},
	{
		depth: '3.2"',
		value: '8',
	},
];

const aluminumResinDepthOptions = [
	{
		depth: '1.4"',
		value: '3.5',
	},
	{
		depth: '2"',
		value: '5',
	},
	{
		depth: '3.2"',
		value: '8',
	},
];

const ledLightColors = [
	'6500K White',
	'3000K Warm White',
	'Red',
	'Green',
	'Blue',
];

const acrylicRevealOptions = ['0', '1/5"', '2/5"', '3/5"'];

export const maxHeightOptions = Array.from(
	{
		length: 66,
	},
	(_, index) => {
		const val = 5 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

export const maxWidthOptions = Array.from(
	{
		length: 106,
	},
	(_, index) => {
		const val = 5 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

export {
	acrylicRevealOptions,
	aluminumResinDepthOptions,
	depthOptions,
	finishingOptions,
	frontBackdepthOptions,
	ledLightColors,
	mountingDefaultOptions,
};
