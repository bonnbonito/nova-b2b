import {
	GLOSS_FINISH,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from './defaults';

const finishingOptions = [{ name: 'Matte' }, { name: GLOSS_FINISH }];

const defaultFinishOptions = [
	{
		name: 'Matte',
	},
	{
		name: GLOSS_FINISH,
	},
];

const thicknessOptions = [
	{
		thickness: '1/8"',
		value: '3',
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
	{
		thickness: '3/4"',
		value: '19',
	},
	{
		thickness: '1"',
		value: '25',
	},
	{
		thickness: '1.5"',
		value: '38',
	},
];

const metalThicknessOptions = [
	{
		thickness: '1/8"',
		value: '3',
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
	{
		thickness: '3/4"',
		value: '20',
	},
	{
		thickness: '1"',
		value: '26',
	},
];

const metalFinishOptions = [
	{
		option: 'Brushed',
	},
	{
		option: 'Painted',
	},
];

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
	{
		option: 'Outdoor (Waterproof)',
	},
];

const mountingDefaultOptions = [
	{
		mounting_option: 'Plain',
	},
	{
		mounting_option: 'Double-sided tape',
	},
	{
		mounting_option: 'Pad',
	},
	{
		mounting_option: 'Pad - Combination All',
	},
	{
		mounting_option: STUD_MOUNT,
	},
	{
		mounting_option: STUD_WITH_SPACER,
	},
];

const installationDefaultOptions = [
	{
		option: 'Plain',
	},
	{
		option: 'Double-sided tape',
	},
	{
		option: 'Pad',
	},
	{
		option: 'Pad - Combination All',
	},
	{
		option: STUD_MOUNT,
	},
	{
		option: STUD_WITH_SPACER,
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

const piecesOptions = ['30 pieces or fewer'];

const setOptions = Array.from(
	{
		length: 100,
	},
	(_, index) => {
		const val = 1 + index;
		return (
			<option key={index} value={val}>
				{val}
			</option>
		);
	}
);

const spacerStandoffDefaultOptions = [
	{
		value: '0.5"',
	},
	{
		value: '1"',
	},
	{
		value: '1.5"',
	},
	{
		value: '2"',
	},
	{
		value: '3"',
	},
	{
		value: '4"',
	},
];

const studLengthOptions = [
	{
		value: '1.5"',
	},
	{
		value: '3.2"',
	},
	{
		value: '4"',
	},
	{
		value: '6"',
	},
];

const metalLaminateOptions = [
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

const arrayRange = (start, stop, step, inches = true) =>
	Array.from({ length: (stop - start) / step + 1 }, (value, index) => (
		<option value={`${start + index * step}${inches ? '"' : "'"}`}>
			{start + index * step}
			{inches ? '"' : "'"}
		</option>
	));

export {
	arrayRange,
	defaultFinishOptions,
	finishingOptions,
	installationDefaultOptions,
	metalFinishOptions,
	metalInstallationOptions,
	metalLaminateOptions,
	metalThicknessOptions,
	mountingDefaultOptions,
	piecesOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
};
