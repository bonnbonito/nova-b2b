const defaultFinishOptions = [
	{
		name: 'Matte',
	},
	{
		name: 'Gloss',
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
		thickness: '7/32"',
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
		option: 'Indoor (Not Waterproof)',
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
		mounting_option: 'Stud Mount',
	},
	{
		mounting_option: 'Stud with spacer',
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
		option: 'Stud Mount',
	},
	{
		option: 'Stud with spacer',
	},
];

const metalInstallationOptions = [
	{
		option: 'Plain',
	},
	{
		option: 'Stud Mount',
	},
	{
		option: 'Stud with spacer',
	},
];

const calculateMountingOptions = (
	selectedThickness,
	selectedMounting,
	waterproof
) => {
	let newMountingOptions;
	let updatedSelectedMounting = selectedMounting;

	if (selectedThickness && selectedThickness.value === '3') {
		newMountingOptions = mountingDefaultOptions.filter(
			(option) => option.mounting_option !== 'Flush stud'
		);
		if (updatedSelectedMounting === 'Flush stud') {
			updatedSelectedMounting = '';
		}
	} else {
		newMountingOptions = mountingDefaultOptions.filter(
			(option) => option.mounting_option !== 'Stud with Block'
		);
		if (updatedSelectedMounting === 'Stud with Block') {
			updatedSelectedMounting = '';
		}
	}

	if (waterproof === 'Outdoor') {
		newMountingOptions = newMountingOptions.filter(
			(option) => option.mounting_option !== 'Double-sided tape'
		);
		if (updatedSelectedMounting === 'Double-sided tape') {
			updatedSelectedMounting =
				mountingDefaultOptions[0]?.mounting_option ?? '';
		}
	}

	return { newMountingOptions, updatedSelectedMounting };
};

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

export {
	calculateMountingOptions,
	defaultFinishOptions,
	installationDefaultOptions,
	metalFinishOptions,
	metalInstallationOptions,
	metalThicknessOptions,
	mountingDefaultOptions,
	piecesOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
};
