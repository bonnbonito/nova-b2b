import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import {
	getLogoPricingTablebyThickness,
	spacerPricing,
} from '../../../../utils/Pricing';
import {
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import {
	finishOptions,
	metalFinishOptions,
	metalInstallationOptions,
	metalOptions,
	metalThicknessOptions,
	stainlessSteelPolishedOptions,
} from '../../metalOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { useAppContext } from '../../../../AppProvider';

export function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [selectedThickness, setSelectedThickness] = useState(
		item.metalThickness
	);
	const [width, setWidth] = useState(item.width ?? '');
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);
	const [color, setColor] = useState(item.color ?? {});
	const [openColor, setOpenColor] = useState(false);
	const [customColor, setCustomColor] = useState(item.customColor ?? '');
	const [selectedFinishing, setSelectedFinishing] = useState(item.metalFinish);

	const [metal, setMetal] = useState(item.metal);
	const [stainLessMetalFinish, setStainLessMetalFinish] = useState(
		item.stainLessMetalFinish
	);
	const [stainlessSteelPolished, setStainlessSteelPolished] = useState(
		item.stainlessSteelPolished
	);

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

	const [metalMountingOptions, setMetalMountingOptions] = useState(
		metalInstallationOptions
	);

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const colorRef = useRef(null);

	function handleComments(e) {
		setComments(e.target.value);
	}

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

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handelMetalFinishChange = (e) => {
		const value = e.target.value;
		if (
			'Stainless Steel Polished' !== value &&
			'Electroplated Gold Polished' !== value &&
			'Electroplated Black Titanium Polished' !== value
		) {
			setStainlessSteelPolished('');
		}

		setStainLessMetalFinish(e.target.value);
	};

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = metalThicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
	};

	const handleChangeFinishing = (e) => {
		const value = e.target.value;
		if (value === '') {
			setStainLessMetalFinish('');
			setColor({ name: '', color: '' });
			setStainlessSteelPolished('');
		}
		if ('Metal Finish' === value) {
			setColor({ name: '', color: '' });
		}

		if ('Painted Finish' === value) {
			setStainLessMetalFinish('');
		}

		setSelectedFinishing(e.target.value);
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
					color,
					customColor,
					mounting,
					width,
					height,
					usdPrice,
					cadPrice,
					metalFinish: selectedFinishing,
					files,
					metal,
					fileNames,
					filePaths,
					fileUrls,
					stainlessSteelPolished,
					stainLessMetalFinish,
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

		if (!metal) missingFields.push('Metal Option');
		if (!selectedThickness) missingFields.push('Select Metal Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');

		if (!selectedFinishing) missingFields.push('Select Finishing Options');
		if (selectedFinishing === 'Painted Finish') {
			if (!color.name) missingFields.push('Select Color');
			if (color?.name === 'Custom Color' && !customColor) {
				missingFields.push('Add the Pantone color code of your custom color.');
			}
		}
		if (selectedFinishing === 'Metal Finish') {
			if (!stainLessMetalFinish)
				missingFields.push('Select Metal Finishing Options');
		}

		if (
			stainLessMetalFinish &&
			stainLessMetalFinish === 'Stainless Steel Polished'
		) {
			if (!stainlessSteelPolished) missingFields.push('Select Steel Polished');
		}

		if (!waterproof) missingFields.push('Select Environment');
		if (!mounting) missingFields.push('Select Installation');
		if (mounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (mounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

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
		updateSignage();
		checkAndAddMissingFields();
	}, [
		comments,
		selectedThickness,
		mounting,
		waterproof,
		width,
		height,
		usdPrice,
		cadPrice,
		fileUrls,
		fileNames,
		selectedFinishing,
		stainLessMetalFinish,
		stainlessSteelPolished,
		files,
		filePaths,
		mounting,
		color,
		customColor,
		metal,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

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

				let multiplier = 1;
				if (waterproof) {
					multiplier = waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.02;
					multiplier = parseFloat(multiplier).toFixed(2);
				}

				let total = parseFloat((computed * multiplier).toFixed(2));

				total *= metal === '316 Stainless Steel' ? 1.3 : 1;
				total = parseFloat(total.toFixed(2));

				if (stainlessSteelPolished) {
					if ('Standard (Face)' === stainlessSteelPolished) {
						total *= 1.3;
					}

					if ('Premium (Face & Side)' === stainlessSteelPolished) {
						total *= 1.7;
					}
					total = parseFloat(total.toFixed(2));
				}

				if (
					stainLessMetalFinish &&
					stainLessMetalFinish !== 'Stainless Steel Brushed' &&
					stainLessMetalFinish !== 'Stainless Steel Polished'
				) {
					total *= 1.2;
				}

				total = parseFloat(total.toFixed(2));

				if (mounting === STUD_WITH_SPACER) {
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
		metal,
		stainLessMetalFinish,
		stainlessSteelPolished,
		sets,
		mounting,
	]);

	useOutsideClick([colorRef], () => {
		if (!openColor) return;
		setOpenColor(false);
	});

	useEffect(() => {
		let newMountingOptions = metalInstallationOptions;
		if (selectedThickness?.value === '4') {
			if (mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) {
				setMounting('');
				setStudLength('');
				setSpacerStandoffDistance('');
			}
			newMountingOptions = metalInstallationOptions.filter(
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
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
				</div>
			)}
			<div className="quote-grid mb-6">
				<Dropdown
					title="Metal Option"
					onChange={(e) => setMetal(e.target.value)}
					options={metalOptions.map((metal) => (
						<option value={metal.option} selected={metal.option === item.metal}>
							{metal.option}
						</option>
					))}
					value={metal}
				/>
				<Dropdown
					title="Metal Thickness"
					value={selectedThickness?.value}
					onChange={handleOnChangeThickness}
					options={metalThicknessOptions.map((thickness) => (
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
					options={maxWidthHeightOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthHeightOptions}
				/>

				<Dropdown
					title="Finishing Options"
					onChange={handleChangeFinishing}
					options={finishOptions.map((finishing) => (
						<option
							value={finishing.option}
							selected={finishing.option === selectedFinishing}
						>
							{finishing.option}
						</option>
					))}
					value={selectedFinishing}
				/>

				{selectedFinishing === 'Metal Finish' && (
					<Dropdown
						title="Metal Finish"
						onChange={handelMetalFinishChange}
						options={metalFinishOptions.map((metalFinish) => (
							<option
								value={metalFinish.option}
								selected={metalFinish.option === stainLessMetalFinish}
							>
								{metalFinish.option}
							</option>
						))}
						value={stainLessMetalFinish}
					/>
				)}

				{(stainLessMetalFinish === 'Stainless Steel Polished' ||
					stainLessMetalFinish === 'Electroplated Gold Polished' ||
					stainLessMetalFinish === 'Electroplated Black Titanium Polished') && (
					<Dropdown
						title="Steel Polish"
						onChange={(e) => setStainlessSteelPolished(e.target.value)}
						options={stainlessSteelPolishedOptions.map((steelPolished) => (
							<option
								value={steelPolished.option}
								selected={steelPolished.option === item.stainlessSteelPolished}
							>
								{steelPolished.option}
							</option>
						))}
						value={item.stainlessSteelPolished}
					/>
				)}

				{selectedFinishing === 'Painted Finish' && (
					<div className="px-[1px] relative" ref={colorRef}>
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							Painted Color
						</label>
						<div
							className={`flex px-2 items-center select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
								color.name ? 'text-black' : 'text-[#dddddd]'
							}`}
							onClick={() => setOpenColor((prev) => !prev)}
						>
							<span
								className="rounded-full w-[18px] h-[18px] border mr-2"
								style={{
									background:
										color.name == 'Custom Color'
											? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
											: color.color,
								}}
							></span>
							{color.name === '' ? 'CHOOSE OPTION' : color.name}
						</div>
						{openColor && (
							<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto shadow-lg">
								{colorOptions.map((color) => {
									return (
										<div
											className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
											onClick={() => {
												setColor(color);
												setOpenColor(false);
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
				)}

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
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
					onChange={handleOnChangeInstallation}
					options={metalMountingOptions.map((option) => (
						<option value={option.option} selected={option.option === mounting}>
							{option.option}
						</option>
					))}
					value={mounting}
				/>

				{mounting === STUD_WITH_SPACER && (
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

				{mounting === STUD_MOUNT && (
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

			{(mounting === STUD_WITH_SPACER ||
				mounting === 'Pad' ||
				mounting === 'Pad - Combination All' ||
				mounting === STUD_MOUNT) && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{color?.name == 'Custom Color' && (
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
