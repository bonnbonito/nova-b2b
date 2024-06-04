import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import convertJson from '../../../../utils/ConvertJson';
import {
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
} from '../../../../utils/SignageOptions';

import { spacerPricing } from '../../../../utils/Pricing';

import { ledLightColors } from '../../../metal-channel/metalChannelOptions';

import {
	colorOptions,
	translucentGraphicFilms,
} from '../../../../utils/ColorOptions';

import {
	acrylicChannelThicknessOptions,
	acrylicFrontOptions,
} from '../../options';

import { useAppContext } from '../../../../AppProvider';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
];

const mountingDefaultOptions = [
	{
		mounting_option: STUD_MOUNT,
	},
	{
		mounting_option: STUD_WITH_SPACER,
	},
];

const maxHeightOptions = Array.from(
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

const maxWidthOptions = Array.from(
	{
		length: 86,
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

export function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [width, setWidth] = useState(item.width ?? '');
	const [height, setHeight] = useState(item.height ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [color, setColor] = useState(item.acrylicReturnPaintColor ?? 'Black');
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [acrylicChannelThickness, setAcrylicChannelThickness] = useState(
		item.acrylicChannelThickness ?? '1.2"'
	);

	const [ledLightColor, setLedLightColor] = useState(
		item.ledLightColor ?? '6500K White'
	);

	const handleOnChangeLedLight = (e) => setLedLightColor(e.target.value);

	const [acrylicFront, setAcrylicFront] = useState(
		item.acrylicFront ?? 'White'
	);

	const [openVinylWhite, setOpenVinylWhite] = useState(false);

	const [vinylWhite, setVinylWhite] = useState(
		item.vinylWhite ?? { name: '', color: '', code: '' }
	);

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [customColor, setCustomColor] = useState(item.customColor ?? '');

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdDiscount, setUsdDiscount] = useState(item.usdDiscount ?? 0);
	const [cadDiscount, setCadDiscount] = useState(item.cadDiscount ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);

	const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');
	const [studLength, setStudLength] = useState(item.studLength ?? '');
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [sets, setSets] = useState(item.sets ?? 1);

	const colorRef = useRef(null);
	const vinyl3MRef = useRef(null);

	function updateSignage() {
		// Only proceed if the item to update exists in the signage array
		if (!signage.some((sign) => sign.id === item.id)) return;

		// Consolidate updated properties into a single object
		const updateDetails = {
			comments,
			width,
			height,
			acrylicChannelThickness,
			mounting: selectedMounting,
			waterproof,
			acrylicReturnPaintColor: color,
			ledLightColor,
			usdPrice,
			cadPrice,
			files,
			fileNames,
			filePaths,
			fileUrls,
			vinylWhite,
			customColor,
			sets,
			studLength,
			spacerStandoffDistance,
			acrylicFront,
			usdSinglePrice,
			cadSinglePrice,
		};

		setSignage((prevSignage) =>
			prevSignage.map((sign) =>
				sign.id === item.id ? { ...sign, ...updateDetails } : sign
			)
		);
	}

	const handleComments = (e) => setComments(e.target.value);

	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
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

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		setAcrylicChannelThickness(() => target);
	};

	const handleOnChangeWhite = (e) => {
		const target = e.target.value;
		setAcrylicFront(target);
		if (target !== '3M Vinyl') {
			setVinylWhite({
				name: '',
				color: '',
			});
		}
	};

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

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!acrylicChannelThickness)
			missingFields.push('Select Acrylic Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!color) missingFields.push('Select Return Paint Color');
		if (color === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!waterproof) missingFields.push('Select Environment');
		if (!selectedMounting) missingFields.push('Select Mounting');

		if (selectedMounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (selectedMounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (!acrylicFront) missingFields.push('Select Acrylic Front');
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
		color,
		width,
		height,
		acrylicChannelThickness,
		selectedMounting,
		waterproof,
		fileUrls,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	useEffect(() => {
		updateSignage();
	}, [
		comments,
		width,
		height,
		acrylicChannelThickness,
		selectedMounting,
		waterproof,
		color,
		usdPrice,
		cadPrice,
		fileUrls,
		fileNames,
		filePaths,
		files,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
		acrylicFront,
		vinylWhite,
		ledLightColor,
		usdSinglePrice,
		cadSinglePrice,
	]);

	if (acrylicFront === '3M Vinyl') {
		useOutsideClick([colorRef, vinyl3MRef], () => {
			if (!openColor && !openVinylWhite) return;
			setOpenColor(false);
			setOpenVinylWhite(false);
		});
	} else {
		useOutsideClick([colorRef], () => {
			if (!openColor) return;
			setOpenColor(false);
		});
	}

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
	}, [color]);

	const computePricing = () => {
		if (!width || !height) return 0;

		const perInch = 0.7;

		let tempTotal = parseInt(width) * parseInt(height) * perInch;

		if (acrylicFront === '3M Vinyl') {
			tempTotal *= 1.1;
		}

		if (acrylicFront === 'UV Printed') {
			tempTotal *= 1.15;
		}

		if (selectedMounting === STUD_WITH_SPACER) {
			const spacer = spacerPricing(tempTotal);
			tempTotal += parseFloat(spacer.toFixed(2));
		}

		/* oversize surcharge */
		if (parseInt(width) > 43) {
			tempTotal += 150;
		}

		/* minimum price */
		tempTotal = tempTotal > 50 ? tempTotal : 50;

		let total = tempTotal * parseInt(sets);

		const discount = 1;

		let totalWithDiscount = total * discount;

		let discountPrice = total - totalWithDiscount;

		return {
			singlePrice: tempTotal ?? 0,
			total: totalWithDiscount?.toFixed(2) ?? 0,
			totalWithoutDiscount: total,
			discount: discountPrice,
		};
	};

	useEffect(() => {
		const { singlePrice, total, discount } = computePricing();
		if (total && singlePrice) {
			setUsdPrice(total);
			setCadPrice((total * EXCHANGE_RATE).toFixed(2));
			setUsdSinglePrice(singlePrice);
			setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(2));
			setUsdDiscount(discount.toFixed(2));
			setCadDiscount((discount * EXCHANGE_RATE).toFixed(2));
		}
	}, [width, height, acrylicFront, selectedMounting, sets]);

	return (
		<>
			{item.productLine && (
				<div clasName="py-4 my-4">
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
				</div>
			)}

			<div className="quote-grid mb-6">
				<Dropdown
					title="Acrylic Thickness"
					value={acrylicChannelThickness}
					onChange={handleOnChangeThickness}
					options={acrylicChannelThicknessOptions.map((thickness) => (
						<option
							value={thickness.value}
							selected={thickness.value === acrylicChannelThickness}
						>
							{thickness.value}
						</option>
					))}
					onlyValue={true}
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
					options={maxHeightOptions}
				/>

				<Dropdown
					title="Acrylic Front"
					onChange={handleOnChangeWhite}
					options={acrylicFrontOptions.map((option) => (
						<option value={option.option} selected={option == acrylicFront}>
							{option.option}
						</option>
					))}
					value={acrylicFront}
				/>

				{acrylicFront === '3M Vinyl' && (
					<div className="px-[1px] relative" ref={vinyl3MRef}>
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							3M VINYL
						</label>
						<div
							className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
								vinylWhite.name ? 'text-black' : 'text-[#dddddd]'
							}`}
							onClick={() => {
								setOpenVinylWhite((prev) => !prev);
								setOpenColor(false);
							}}
						>
							<span
								className="rounded-full w-[18px] h-[18px] border mr-2"
								style={{
									background:
										vinylWhite?.name == 'Custom Color'
											? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
											: vinylWhite?.color,
								}}
							></span>
							{vinylWhite.name === '' ? 'CHOOSE OPTION' : vinylWhite.name}
						</div>
						{openVinylWhite && (
							<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
								{translucentGraphicFilms.map((color) => {
									return (
										<div
											className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
											onClick={() => {
												setVinylWhite(color);
												setOpenVinylWhite(false);
											}}
										>
											<span
												className="w-[18px] h-[18px] inline-block rounded-full border"
												style={{
													background:
														color?.name == 'Custom Color'
															? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
															: color?.color,
												}}
											></span>
											{color?.name}
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Return Paint Color
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							color ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => {
							setOpenColor((prev) => !prev);
							setOpenVinylWhite(false);
						}}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									color == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: colorOptions.find((option) => option.name === color)
												.color,
							}}
						></span>
						{color === '' ? 'CHOOSE OPTION' : color}
					</div>
					{openColor && (
						<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
							{colorOptions.map((color) => {
								return (
									<div
										className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
										onClick={() => {
											setColor(color.name);
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

				<Dropdown
					title="LED Light Color"
					onChange={handleOnChangeLedLight}
					options={ledLightColors.map((color) => (
						<option value={color} selected={color == ledLightColor}>
							{color}
						</option>
					))}
					value={ledLightColor}
				/>

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
					onChange={handleOnChangeMount}
					options={mountingDefaultOptions.map((option) => (
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
				{color == 'Custom Color' && (
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

			<div className="text-xs text-[#9F9F9F] pt-4">
				We size the letters in proportion to your chosen font. Some
				uppercase/lowercase letters may appear shorter or taller than your
				selected height on the form to maintain visual harmony.
			</div>
		</>
	);
}
