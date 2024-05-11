import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import convert_json from '../../../../utils/ConvertJson';
import { getLogoPricingTablebyThickness } from '../../../../utils/Pricing';
import {
	calculateMountingOptions,
	mountingDefaultOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import { METAL_ACRYLIC_PRICING } from '../MetalLaminate';

import { useAppContext } from '../../../../AppProvider';

import {
	colorOptions,
	metalFinishColors,
} from '../../../../utils/ColorOptions';

const exchangeRate = 1.3;

export default function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();

	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [selectedThickness, setSelectedThickness] = useState(
		item.acrylicThickness
	);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(23);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);
	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);
	const [metalLaminate, setMetalLaminate] = useState(item.metalLaminate);
	const [acrylicBase, setAcrylicBase] = useState(item.acrylicBase);
	const [openAcrylicColor, setOpenAcrylicColor] = useState(false);
	const [customColor, setCustomColor] = useState(item.customColor);
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
	const [height, setHeight] = useState(item.height);
	const [comments, setComments] = useState('');
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);

	const [studLength, setStudLength] = useState(item.studLength);
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);
	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance
	);

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeMount = (e) => {
		const target = e.target.value;
		setSelectedMounting(target);
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

	const [sets, setSets] = useState(item.sets);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const logoPricingObject = NovaQuote.logo_pricing_tables;

	useEffect(() => {
		let newMountingOptions = mountingDefaultOptions;

		if (selectedThickness?.value === '3') {
			if (
				selectedMounting === 'Stud Mounth' ||
				selectedMounting === 'Stud with spacer'
			) {
				setSelectedMounting('');
				setStudLength('');
				setSpacerStandoffDistance('');
			}

			newMountingOptions = newMountingOptions.filter(
				(option) =>
					option.mounting_option !== 'Stud Mount' &&
					option.mounting_option !== 'Stud with spacer'
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

	const acrylicRef = useRef(null);

	const handleChangeMetalLaminate = (e) => {
		setMetalLaminate(e.target.value);
	};

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments: comments,
					acrylicThickness: selectedThickness,
					mounting: selectedMounting,
					waterproof: waterproof,
					width: width,
					height: height,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					metalLaminate: metalLaminate,
					files: files,
					fileNames: fileNames,
					filePaths: filePaths,
					fileUrls: fileUrls,
					acrylicBase: acrylicBase,
					customColor: customColor,
					sets: sets,
					studLength: studLength,
					spacerStandoffDistance: spacerStandoffDistance,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		setComments(item.comments);
	}, []);

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
		metalLaminate,
		files,
		filePaths,
		acrylicBase,
		customColor,
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
					multiplier = waterproof === 'Indoor (Not Waterproof)' ? 1 : 1.1;
				}

				let total = (computed * multiplier * METAL_ACRYLIC_PRICING).toFixed(2);
				total *= acrylicBase?.name === 'Black' ? 1 : 1.1;

				if (selectedMounting === 'Stud with spacer') {
					let maxVal = wcumcs_vars_data.currency === 'USD' ? 25 : 25 * 1.3;
					let spacer = total * 1.02 > maxVal ? maxVal : total * 1.02;
					spacer = parseFloat(spacer.toFixed(2));

					total += spacer;
				}

				total *= sets;

				setUsdPrice(parseFloat(total).toFixed(2));
				setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
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
		acrylicBase,
		sets,
		selectedMounting,
	]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!metalLaminate) missingFields.push('Select Metal Laminate');
		if (!acrylicBase) missingFields.push('Select Acrylic Base');
		if (acrylicBase?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!waterproof) missingFields.push('Select Waterproof');
		if (!selectedMounting) missingFields.push('Select Mounting');
		if (selectedMounting === 'Stud with spacer') {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}
		if (selectedMounting === 'Stud Mount') {
			if (!studLength) missingFields.push('Select Stud Length');
		}
		if (!sets) missingFields.push('Select Quantity');

		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');

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
	};

	useEffect(() => {
		checkAndAddMissingFields();
	}, [
		selectedThickness,
		comments,
		selectedMounting,
		waterproof,
		acrylicBase,
		width,
		height,
		metalLaminate,
		fileUrls,
		fileNames,
		filePaths,
		files,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	return (
		<>
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
					title="Metal Laminate"
					onChange={handleChangeMetalLaminate}
					options={metalFinishColors.map((laminate) => (
						<option
							value={laminate.name}
							selected={laminate.name === metalLaminate}
						>
							{laminate.name}
						</option>
					))}
					value={metalLaminate}
				/>

				<div className="px-[1px] relative" ref={acrylicRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Acrylic Base
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							acrylicBase?.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => setOpenAcrylicColor((prev) => !prev)}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{ backgroundColor: acrylicBase.color }}
						></span>
						{acrylicBase?.name === '' ? 'CHOOSE OPTION' : acrylicBase?.name}
					</div>
					{openAcrylicColor && (
						<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
							{colorOptions.map((color) => {
								return (
									<div
										className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
										onClick={() => {
											setAcrylicBase(color);
											setOpenAcrylicColor(false);
										}}
									>
										<span
											className="w-[18px] h-[18px] inline-block rounded-full border"
											style={{
												background:
													color.name == 'Custom Color'
														? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
														: color.color,
											}}
										></span>
										{color.name}
									</div>
								);
							})}
						</div>
					)}
				</div>

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

				{selectedMounting === 'Stud with spacer' && (
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

				{selectedMounting === 'Stud Mount' && (
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

			{selectedMounting === 'Stud with spacer' && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{acrylicBase?.name == 'Custom Color' && (
					<div className="px-[1px] col-span-4">
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							Custom Color
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
