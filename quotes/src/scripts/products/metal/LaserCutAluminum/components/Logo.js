import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import {
	anodizedPricing,
	getLogoPricingTablebyThickness,
	spacerPricing,
} from '../../../../utils/Pricing';
import {
	aluminumFinishingOptions,
	anodizedColorOptions,
	anodizedFinishingOptions,
	metalInstallationOptions,
	metalThicknessOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import ColorsDropdown from '../../../../utils/ColorsDropdown';

import { useAppContext } from '../../../../AppProvider';

export function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');
	const [selectedThickness, setSelectedThickness] = useState(
		item.metalThickness
	);
	const [width, setWidth] = useState(item.width ?? '');

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);
	const [color, setColor] = useState(item.metalColor);
	const [openColor, setOpenColor] = useState(false);
	const [selectedFinishing, setSelectedFinishing] = useState(
		item.aluminumFinishing ?? ''
	);

	const [anodizedFinishing, setAnodizedFinishing] = useState(
		item.anodizedFinishing ?? ''
	);

	const [anodizedColor, setAnodizedColor] = useState(item.anodizedColor ?? '');

	const [customColor, setCustomColor] = useState(item.metalCustomColor);

	const maxWidthHeightOptions = Array.from(
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
	const [height, setHeight] = useState(item.height ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');

	const [studLength, setStudLength] = useState(item.studLength ?? '');
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);
	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [metalMountingOptions, setMetalMountingOptions] = useState(
		metalInstallationOptions
	);

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
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

	const colorRef = useRef(null);

	const [logoPricingObject, setLogoPricingObject] = useState([]);

	useEffect(() => {
		async function fetchLogoPricing() {
			try {
				const response = await fetch(NovaQuote.logo_pricing_api + item.product);
				const data = await response.json();
				setLogoPricingObject(data);
			} catch (error) {
				console.error('Error fetching logo pricing:', error);
			}
		}

		fetchLogoPricing();
	}, []);
	function handleComments(e) {
		setComments(e.target.value);
	}

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = metalThicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
	};

	const handleChangeFinishing = (e) => {
		const value = e.target.value;
		if ('Brushed' === value) {
			setColor({ name: '', color: '' });
		}
		setSelectedFinishing(e.target.value);
	};

	const handleChangeAnodizedFinishing = (e) => {
		setAnodizedFinishing(e.target.value);
	};

	const handleChangeAnodizedColor = (e) => {
		setAnodizedColor(e.target.value);
	};

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const handleOnChangeInstallation = (e) => {
		const target = e.target.value;
		setMounting(target);

		if (target === STUD_WITH_SPACER || target === STUD_MOUNT) {
			if (target === STUD_MOUNT) {
				setSpacerStandoffDistance('');
			}
		} else {
			setStudLength('');
			setSpacerStandoffDistance('');
		}
	};

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments,
					metalThickness: selectedThickness,
					waterproof,
					metalColor: color,
					mounting,
					width,
					height,
					usdPrice,
					cadPrice,
					aluminumFinishing: selectedFinishing,
					anodizedFinishing,
					anodizedColor,
					files,
					fileNames,
					filePaths,
					fileUrls,
					metalCustomColor: customColor,
					sets,
					studLength,
					spacerStandoffDistance,
					usdSinglePrice,
					cadSinglePrice,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
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
		selectedFinishing,
		files,
		filePaths,
		mounting,
		color,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
		usdSinglePrice,
		cadSinglePrice,
		anodizedFinishing,
		anodizedColor,
	]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!waterproof) missingFields.push('Select Environment');
		if (!selectedFinishing) missingFields.push('Select Aluminum Finishing');
		if (selectedFinishing === 'Painted') {
			if (!color.name) missingFields.push('Select Color');
		}
		if (selectedFinishing === 'Anodized') {
			if (!anodizedFinishing) missingFields.push('Select Anodized Finishing');
			if (!anodizedColor) missingFields.push('Select Anodized Color');
		}
		if (
			selectedFinishing === 'Painted' &&
			color?.name === 'Custom Color' &&
			!customColor
		) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!mounting) missingFields.push('Select Mounting');

		if (mounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}
		if (mounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (!sets) missingFields.push('Select Quantity');
		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');

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

	const computePricing = () => {
		if (
			!width ||
			!height ||
			!selectedThickness ||
			!waterproof ||
			logoPricingObject === null
		) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		const logoPricing = getLogoPricingTablebyThickness(
			`${selectedThickness.value}mm`,
			logoPricingObject
		);

		if (logoPricing === undefined) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		const logoPricingTable =
			logoPricing !== undefined ? convert_json(logoPricing) : [];

		let tempTotal = 0;

		const computed =
			logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

		tempTotal += computed;

		if (waterproof) {
			tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.02;
		}

		if ('Anodized' === selectedFinishing) {
			let anodizedPrice = anodizedPricing(tempTotal);
			anodizedPrice = parseFloat(anodizedPrice.toFixed(2));
			tempTotal += anodizedPrice;
		}

		if (mounting === STUD_WITH_SPACER) {
			let spacer = spacerPricing(tempTotal);
			spacer = parseFloat(spacer.toFixed(2));
			tempTotal += spacer;
		}

		const total = tempTotal * sets;

		return {
			singlePrice: tempTotal.toFixed(2) ?? 0,
			total: total?.toFixed(2) ?? 0,
		};
	};

	useEffect(() => {
		const { singlePrice, total } = computePricing();
		if (total && singlePrice) {
			setUsdPrice(total);
			setCadPrice((total * EXCHANGE_RATE).toFixed(2));
			setUsdSinglePrice(singlePrice);
			setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(2));
		} else {
			setUsdPrice(0);
			setCadPrice(0);
			setUsdSinglePrice(0);
			setCadSinglePrice(0);
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		sets,
		mounting,
		logoPricingObject,
	]);

	useOutsideClick([colorRef], () => {
		if (!openColor) return;
		setOpenColor(false);
	});

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
	}, [color]);

	useEffect(() => {
		let newMountingOptions = metalMountingOptions;

		if (selectedThickness?.value === '3') {
			if (mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) {
				setMounting('');
				setStudLength('');
				setSpacerStandoffDistance('');
			}
			newMountingOptions = newMountingOptions.filter(
				(option) =>
					option.option !== STUD_MOUNT && option.option !== STUD_WITH_SPACER
			);
		} else {
			newMountingOptions = metalInstallationOptions;
		}

		setMetalMountingOptions(newMountingOptions);
	}, [selectedThickness, mounting, setMetalMountingOptions]);

	return (
		<>
			{item.productLine && (
				<div className="py-4 mb-4">
					PRODUCT LINE:{' '}
					<span
						className="font-title"
						dangerouslySetInnerHTML={{ __html: item.productLine }}
					/>
				</div>
			)}
			<div className="quote-grid mb-6">
				<Dropdown
					title="Metal Thickness"
					value={item.metalThickness?.value}
					onChange={handleOnChangeThickness}
					options={metalThicknessOptions.map((thickness) => (
						<option
							key={thickness.value}
							value={thickness.value}
							defaultValue={thickness === selectedThickness}
						>
							{thickness.thickness}
						</option>
					))}
				/>

				<Dropdown
					title="Logo Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthHeightOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthHeightOptions}
				/>

				<Dropdown
					title="Environment"
					onChange={(e) => setWaterproof(e.target.value)}
					options={waterProofOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option.option == waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
				/>

				<Dropdown
					title="Aluminum Finishing"
					onChange={handleChangeFinishing}
					options={aluminumFinishingOptions.map((finishing) => (
						<option
							key={finishing.option}
							value={finishing.option}
							defaultValue={finishing.option === selectedFinishing}
						>
							{finishing.option}
						</option>
					))}
					value={selectedFinishing}
				/>

				{selectedFinishing === 'Anodized' && (
					<>
						<Dropdown
							title="Anodized Finishing"
							onChange={handleChangeAnodizedFinishing}
							options={anodizedFinishingOptions.map((finishing) => (
								<option
									key={finishing.option}
									value={finishing.option}
									defaultValue={finishing.option === anodizedFinishing}
								>
									{finishing.option}
								</option>
							))}
							value={anodizedFinishing}
						/>

						<Dropdown
							title="Anodized Colors"
							onChange={handleChangeAnodizedColor}
							options={anodizedColorOptions.map((color) => (
								<option
									key={color.option}
									value={color.option}
									defaultValue={color.option === anodizedColor}
								>
									{color.option}
								</option>
							))}
							value={anodizedColor}
						/>
					</>
				)}

				{selectedFinishing === 'Painted' && (
					<ColorsDropdown
						ref={colorRef}
						title="Color"
						colorName={color.name}
						openColor={openColor}
						toggleColor={() => {
							setOpenColor((prev) => !prev);
						}}
						colorOptions={colorOptions}
						selectColor={(color) => {
							setColor(color);
							setOpenColor(false);
						}}
					/>
				)}

				<Dropdown
					title="Mounting Options"
					onChange={handleOnChangeInstallation}
					options={metalMountingOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option.option === mounting}
						>
							{option.option}
						</option>
					))}
					value={item.mounting}
				/>

				{(mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) && (
					<Dropdown
						title="Stud Length"
						onChange={handleonChangeStudLength}
						options={studLengthOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
								defaultValue={option.value == studLength}
							>
								{option.value}
							</option>
						))}
						value={studLength}
					/>
				)}

				{mounting === STUD_WITH_SPACER && (
					<Dropdown
						title="STANDOFF SPACE"
						onChange={handleonChangeSpacerDistance}
						options={spacerStandoffOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
								defaultValue={option.value == spacerStandoffDistance}
							>
								{option.value}
							</option>
						))}
						value={spacerStandoffDistance}
					/>
				)}

				<Dropdown
					title="Quantity"
					onChange={handleOnChangeSets}
					options={setOptions}
					value={sets}
					onlyValue={true}
				/>
			</div>

			{mounting === STUD_WITH_SPACER && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{selectedFinishing === 'Painted' && color?.name == 'Custom Color' && (
					<div className="px-[1px] col-span-4">
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							Custom Color
						</label>
						<input
							className="w-full py-4 px-2 border-solid border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400"
							type="text"
							value={customColor}
							onChange={(e) => setCustomColor(e.target.value)}
							placeholder="ADD THE PANTONE COLOR CODE"
						/>
					</div>
				)}

				<Description value={comments} handleComments={handleComments} />

				<UploadFiles
					itemId={item.id}
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
