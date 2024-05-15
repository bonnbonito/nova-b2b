import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import convert_json from '../../../../utils/ConvertJson';
import {
	getLogoPricingTablebyThickness,
	spacerPricing,
} from '../../../../utils/Pricing';

import {
	finishingOptions,
	mountingDefaultOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	EXCHANGE_RATE,
	GLOSS_FINISH,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { useAppContext } from '../../../../AppProvider';

const NovaSingleOptions = NovaQuote.single_quote_options;

const UV_PRICE = 1.05;

export function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();

	const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');
	const [selectedThickness, setSelectedThickness] = useState(
		item.acrylicThickness ?? ''
	);
	const [width, setWidth] = useState(item.width ?? '');
	const [maxWidthHeight, setMaxWidthHeight] = useState(23);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);
	const [pieces, setPieces] = useState(item.pieces ?? '');
	const [customColor, setCustomColor] = useState(item.customColor ?? '');
	const [baseColor, setBaseColor] = useState(item.baseColor);
	const [selectedFinishing, setSelectedFinishing] = useState(
		item.finishing ?? ''
	);
	const [printPreference, setPrintPreference] = useState(item.printPreference);
	const [maxWidthOptions, setMaxWidthOptions] = useState(
		Array.from(
			{
				length: maxWidthHeight,
			},
			(_, index) => {
				const val = 1 + index;
				return (
					<option key={index} value={val}>
						{val}"
					</option>
				);
			}
		)
	);
	const [height, setHeight] = useState(item.height ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);

	const [studLength, setStudLength] = useState(item.studLength ?? '');
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);
	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeMount = (e) => {
		const target = e.target.value;
		setSelectedMounting(target);

		if (target === STUD_WITH_SPACER || target === STUD_MOUNT) {
			if (target === STUD_MOUNT) {
				setSpacerStandoffDistance('');
			}
		} else {
			setStudLength('');
			setSpacerStandoffDistance('');
		}
	};

	const handleonChangeStudLength = (e) => {
		const target = e.target.value;
		setStudLength(target); // Directly set the value without a callback

		if (target === '1.5"') {
			setSpacerStandoffOptions([{ value: '0.5"' }, { value: '1"' }]);
			if (!['0.5"', '1"'].includes(spacerStandoffDistance)) {
				setSpacerStandoffDistance(''); // Reset if not one of the valid options
			}
		} else if (['3.2"', '4"'].includes(target)) {
			setSpacerStandoffOptions([
				{ value: '0.5"' },
				{ value: '1"' },
				{ value: '1.5"' },
				{ value: '2"' },
			]);
			if (['3"', '4"'].includes(spacerStandoffDistance)) {
				setSpacerStandoffDistance(''); // Reset if the distance is invalid for these options
			}
		} else {
			setSpacerStandoffOptions(spacerStandoffDefaultOptions); // Reset to default if none of the conditions are met
		}

		if (target === '') {
			setSpacerStandoffDistance(''); // Always reset if the target is empty
		}
	};

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const [logoPricingObject, setlogoPricingObject] = useState([]);

	useEffect(() => {
		async function fetchLogoPricing() {
			try {
				const response = await fetch(NovaQuote.logo_pricing_api + item.product);
				const data = await response.json();
				setlogoPricingObject(data);
			} catch (error) {
				console.error('Error fetching logo pricing:', error);
			}
		}

		fetchLogoPricing();
	}, []);
	useEffect(() => {
		let newMountingOptions = mountingDefaultOptions;

		if (selectedThickness?.value === '3') {
			if (
				selectedMounting === STUD_MOUNT ||
				selectedMounting === STUD_WITH_SPACER
			) {
				setSelectedMounting('');
				setStudLength('');
				setSpacerStandoffDistance('');
			}
			newMountingOptions = newMountingOptions.filter(
				(option) =>
					option.mounting_option !== STUD_MOUNT &&
					option.mounting_option !== STUD_WITH_SPACER
			);
		}

		if (waterproof === 'Outdoor (Waterproof)') {
			if (selectedMounting === 'Double-sided tape') {
				setSelectedMounting('');
			}

			newMountingOptions = newMountingOptions.filter(
				(option) => option.mounting_option !== 'Double-sided tape'
			);
		}

		setMountingOptions(newMountingOptions);

		setMaxWidthOptions(() =>
			Array.from(
				{
					length: parseInt(maxWidthHeight) + 1,
				},
				(_, index) => {
					const val = 1 + index;
					return (
						<option key={index} value={val}>
							{val}"
						</option>
					);
				}
			)
		);
	}, [
		selectedThickness,
		selectedMounting,
		waterproof,
		maxWidthHeight,
		setSelectedMounting,
		setMountingOptions,
	]);

	function handleComments(e) {
		setComments(e.target.value);
	}

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = thicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
	};

	useEffect(() => {
		if (parseInt(selectedThickness?.value) > 3) {
			setMaxWidthHeight(42);
		} else {
			setMaxWidthHeight(23);
			if (height > 25) {
				setHeight('');
			}
			if (width > 25) {
				setWidth('');
			}
		}
	}, [selectedThickness]);

	const handleChangeFinishing = (e) => {
		setSelectedFinishing(e.target.value);
	};

	const printOptions = [
		{
			option: 'Print on top',
		},
		{
			option: 'Print from back layer',
		},
	];

	const baseColorOptions = [
		{
			option: 'Black',
		},
		{
			option: 'Custom Color',
		},
	];

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments,
					acrylicThickness: selectedThickness,
					mounting: selectedMounting,
					waterproof,
					width,
					height,
					usdPrice,
					cadPrice,
					finishing: selectedFinishing,
					files,
					fileNames,
					filePaths,
					fileUrls,
					baseColor,
					customColor,
					printPreference,
					sets,
					studLength,
					spacerStandoffDistance,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!selectedThickness) missingFields.push('Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!printPreference) missingFields.push('Select Printing Preference');
		if (!baseColor) missingFields.push('Select Base Color');
		if (!waterproof) missingFields.push('Select Environment');
		if (!selectedMounting) missingFields.push('Select Mounting Option');

		if (selectedMounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (selectedMounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (!selectedFinishing) missingFields.push('Select Finishing Option');

		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');
		if (baseColor === 'Custom Color' && !customColor)
			missingFields.push('Add the Pantone color code of your custom color');
		if (!sets) missingFields.push('Select Quantity');
		if (missingFields.length > 0) {
			setMissing((prevMissing) => {
				const existingIndex = prevMissing.findIndex(
					(entry) => entry.id === item.id
				);

				if (existingIndex !== -1) {
					const updatedMissing = [...prevMissing];
					updatedMissing[existingIndex] = {
						...updatedMissing[existingIndex],
						missingFields: missingFields,
					};
					return updatedMissing;
				} else if (missingFields.length > 0) {
					return [
						...prevMissing,
						{
							id: item.id,
							title: item.title,
							missingFields: missingFields,
						},
					];
				}

				console.log(prevMissing);

				return prevMissing;
			});
		} else {
			setMissing((current) => {
				const updatedMissing = current.filter((sign) => sign.id !== item.id);
				return updatedMissing;
			});
		}
	};

	useEffect(() => {
		checkAndAddMissingFields();
	}, [
		selectedThickness,
		selectedMounting,
		waterproof,
		width,
		height,
		fileUrls,
		fileNames,
		selectedFinishing,
		files,
		filePaths,
		baseColor,
		printPreference,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	useEffect(() => {
		updateSignage();
	}, [
		comments,
		selectedThickness,
		selectedMounting,
		waterproof,
		width,
		height,
		usdPrice,
		cadPrice,
		fileUrls,
		fileNames,
		customColor,
		selectedFinishing,
		files,
		filePaths,
		printPreference,
		baseColor,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	useEffect(() => {
		if (
			width &&
			height &&
			selectedThickness &&
			waterproof &&
			logoPricingObject !== null
		) {
			const logoPricing = getLogoPricingTablebyThickness(
				`${selectedThickness.value}mm`,
				logoPricingObject
			);
			if (logoPricing !== undefined) {
				const logoPricingTable =
					logoPricing !== undefined ? convert_json(logoPricing) : [];

				const computed =
					logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

				let multiplier = 0;
				if (waterproof) {
					multiplier = waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.1;
				}

				let total = parseFloat((computed * multiplier).toFixed(2));
				total *= selectedFinishing === GLOSS_FINISH ? 1.1 : 1;
				total *= baseColor === 'Custom Color' ? UV_PRICE : 1;

				total *= 1.2;

				if (selectedMounting === STUD_WITH_SPACER) {
					let spacer = spacerPricing(total);
					spacer = parseFloat(spacer.toFixed(2));

					total += spacer;
				}

				total *= sets;

				setUsdPrice(parseFloat(total.toFixed(2)));
				setCadPrice((total * parseFloat(EXCHANGE_RATE)).toFixed(2));
			} else {
				setUsdPrice(0);
				setCadPrice(0);
			}
		} else {
			setUsdPrice(0);
			setCadPrice(0);
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		baseColor,
		selectedMounting,
		sets,
	]);

	return (
		<>
			{item.productLine && (
				<div className="py-4 mb-4">
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
				</div>
			)}
			<div className="quote-grid mb-6">
				<Dropdown
					title="Acrylic Thickness"
					value={selectedThickness?.value}
					onChange={handleOnChangeThickness}
					options={thicknessOptions.map((thickness) => (
						<option
							value={thickness.value}
							selected={thickness === selectedThickness}
						>
							{thickness.thickness}
						</option>
					))}
				/>

				<Dropdown
					title="Logo Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Printing Preference"
					value={printPreference}
					onChange={(e) => setPrintPreference(e.target.value)}
					options={printOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == printPreference}
						>
							{option.option}
						</option>
					))}
				/>

				<Dropdown
					title="Base Color"
					value={baseColor}
					onChange={(e) => setBaseColor(e.target.value)}
					options={baseColorOptions.map((option) => (
						<option value={option.option} selected={option.option == baseColor}>
							{option.option}
						</option>
					))}
				/>

				<Dropdown
					title="Finishing Options"
					onChange={handleChangeFinishing}
					options={finishingOptions.map((finishing) => (
						<option
							value={finishing.name}
							selected={finishing.name === selectedFinishing}
						>
							{finishing.name}
						</option>
					))}
					value={selectedFinishing}
				/>

				<Dropdown
					title="Environment"
					onChange={(e) => setWaterproof(e.target.value)}
					options={waterProofOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
				/>

				<Dropdown
					title="Mounting Options"
					onChange={handleOnChangeMount}
					options={mountingOptions.map((option) => (
						<option
							value={option.mounting_option}
							selected={option.mounting_option === selectedMounting}
						>
							{option.mounting_option}
						</option>
					))}
					value={selectedMounting}
				/>

				{selectedMounting === STUD_WITH_SPACER && (
					<>
						<Dropdown
							title="Stud Length"
							onChange={handleonChangeStudLength}
							options={studLengthOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == studLength}
								>
									{option.value}
								</option>
							))}
							value={studLength}
						/>
						<Dropdown
							title="STANDOFF SPACE"
							onChange={handleonChangeSpacerDistance}
							options={spacerStandoffOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == spacerStandoffDistance}
								>
									{option.value}
								</option>
							))}
							value={spacerStandoffDistance}
						/>
					</>
				)}

				{selectedMounting === STUD_MOUNT && (
					<>
						<Dropdown
							title="Stud Length"
							onChange={handleonChangeStudLength}
							options={studLengthOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == studLength}
								>
									{option.value}
								</option>
							))}
							value={studLength}
						/>
					</>
				)}

				<Dropdown
					title="Quantity"
					onChange={handleOnChangeSets}
					options={setOptions}
					value={sets}
					onlyValue={true}
				/>
			</div>

			{selectedMounting === STUD_WITH_SPACER && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{baseColor === 'Custom Color' && (
					<div className="px-[1px] col-span-4">
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							CUSTOM COLOR
						</label>
						<input
							className="w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400"
							type="text"
							value={customColor}
							onChange={(e) => setCustomColor(e.target.value)}
							placeholder="ADD THE PANTONE COLOR CODE"
						/>
					</div>
				)}

				<div className="px-[1px] col-span-4">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						COMMENTS
					</label>
					<textarea
						className="w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md placeholder:text-slate-400"
						value={comments}
						onChange={handleComments}
						placeholder="ADD COMMENTS"
						rows={4}
					/>
				</div>
				<UploadFiles
					setFilePaths={setFilePaths}
					setFiles={setFiles}
					filePaths={filePaths}
					fileUrls={fileUrls}
					fileNames={fileNames}
					setFileUrls={setFileUrls}
					setFileNames={setFileNames}
				/>
			</div>
		</>
	);
}
