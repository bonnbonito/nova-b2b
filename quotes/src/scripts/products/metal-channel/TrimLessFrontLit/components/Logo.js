import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions, whiteOptions } from '../../../../utils/ColorOptions';
import ColorsDropdown from '../../../../utils/ColorsDropdown';
import VinylColors from '../../../../utils/VinylColors';

import {
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import {
	depthOptions,
	ledLightColors,
	maxHeightOptions,
	maxWidthOptions,
	mountingDefaultOptions,
} from '../../metalChannelOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { spacerPricing } from '../../../../utils/Pricing';

import { useAppContext } from '../../../../AppProvider';

export function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [comments, setComments] = useState(item.comments ?? '');

	const [width, setWidth] = useState(item.width ?? '');
	const [height, setHeight] = useState(item.height ?? '');

	const [color, setColor] = useState(
		item.returnColor ?? { name: 'Black', color: '#000000' }
	);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');

	const [depth, setDepth] = useState(item.depth);

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

	const [openAcrylicCover, setOpenAcrylicCover] = useState(false);

	const [studLength, setStudLength] = useState(item.studLength ?? '');

	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const [vinylWhite, setVinylWhite] = useState(
		item.vinylWhite ?? { name: '', color: '', code: '' }
	);
	const [frontAcrylicCover, setFrontAcrylicCover] = useState(
		item.frontAcrylicCover ?? 'White'
	);

	const [mounting, setMounting] = useState(item.mounting ?? '');

	const [ledLightColor, setLedLightColor] = useState(item.ledLightColor);

	const colorRef = useRef(null);
	const acrylicColorRef = useRef(null);

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments,
					depth,
					waterproof,
					returnColor: color,
					usdPrice,
					cadPrice,
					cadSinglePrice,
					usdSinglePrice,
					files,
					fileNames,
					filePaths,
					fileUrls,
					customColor,
					ledLightColor,
					frontAcrylicCover,
					vinylWhite,
					mounting,
					studLength,
					spacerStandoffDistance,
					sets,
					width,
					height,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const handleComments = (e) => setComments(e.target.value);

	const handleOnChangeMounting = (e) => {
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

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handleOnChangeLedLight = (e) => setLedLightColor(e.target.value);

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeWhite = (e) => {
		const target = e.target.value;
		setFrontAcrylicCover(target);
		if (target !== '3M Vinyl') {
			setVinylWhite({
				name: '',
				color: '',
			});
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

	const handleOnChangeDepth = (e) => {
		const target = e.target.value;
		const selected = depthOptions.filter((option) => option.value === target);

		setDepth(() => selected[0]);
	};

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!depth) missingFields.push('Select Metal Depth');

		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');

		if (!color?.name) missingFields.push('Select Color');
		if (color?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (!waterproof) missingFields.push('Select Environment');

		if (!mounting) missingFields.push('Select Mounting');

		if (mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (!ledLightColor) missingFields.push('Select LED Light Color');

		if (!frontAcrylicCover) missingFields.push('Select Front Acrylic Cover');

		if (frontAcrylicCover === '3M Vinyl') {
			if (!vinylWhite?.name) missingFields.push('Select 3M Vinyl');
		}

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
		depth,
		comments,
		waterproof,
		color,
		frontAcrylicCover,
		vinylWhite,
		usdPrice,
		cadPrice,
		ledLightColor,
		fileUrls,
		fileNames,
		files,
		filePaths,
		customColor,
		mounting,
		studLength,
		spacerStandoffDistance,
		width,
		height,
		cadSinglePrice,
		usdSinglePrice,
	]);

	if (frontAcrylicCover === '3M Vinyl') {
		useOutsideClick([colorRef, acrylicColorRef], () => {
			if (!openColor && !openAcrylicCover) return;
			setOpenColor(false);
			setOpenAcrylicCover(false);
		});
	} else {
		useOutsideClick([colorRef], () => {
			if (!openColor) return;
			setOpenColor(false);
		});
	}

	const computePricing = () => {
		if (!width || !height || !depth?.value) return 0;

		let P = 0;
		let S = 0;
		const F = 35;
		let X = parseInt(width);
		let Y = parseInt(height);

		switch (depth?.value) {
			case '3.5':
				console.log(depth);
				P = 0.25;
				S = 0.12;
				break;
			case '5':
				console.log(depth);
				P = 0.27;
				S = 0.14;
				break;
			default:
				console.log(depth);
				P = 0.28;
				S = 0.18;
		}

		let tempTotal = X * Y * P + (X + 4) * (Y + 4) * S + F;
		console.log(tempTotal);

		/* Oversize surcharge */
		if (X > 41 || Y > 41) {
			console.log('surcharge');
			tempTotal += 150;
		}

		if (frontAcrylicCover === '3M Vinyl') {
			tempTotal *= 1.1;
			console.log('front', tempTotal);
		}

		if (waterproof && waterproof !== INDOOR_NOT_WATERPROOF) {
			tempTotal *= 1.03;
			console.log('waterproof', tempTotal);
		}

		if (studLength && spacerStandoffDistance) {
			const spacer = spacerPricing(tempTotal);
			tempTotal += parseFloat(spacer.toFixed(2));
			console.log('spacer', tempTotal);
		}

		let total = tempTotal * parseInt(sets);

		total = total.toFixed(1);

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
	}, [
		depth,
		width,
		height,
		waterproof,
		studLength,
		spacerStandoffDistance,
		frontAcrylicCover,
		sets,
	]);

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
	}, [color]);

	return (
		<>
			{item.productLine && (
				<div clasName="py-4 my-4">
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
				</div>
			)}

			<div className="quote-grid mb-6">
				<Dropdown
					title="Metal Depth"
					value={depth?.value}
					onChange={handleOnChangeDepth}
					options={depthOptions.map((thickness) => (
						<option value={thickness.value} selected={thickness === depth}>
							{thickness.depth}
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
					options={maxHeightOptions}
				/>

				<ColorsDropdown
					title="Return Color"
					ref={colorRef}
					colorName={color?.name}
					openColor={openColor}
					toggleColor={() => {
						setOpenColor((prev) => !prev);
						setOpenFont(false);
						setOpenAcrylicCover(false);
					}}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setColor(color);
						setOpenColor(false);
					}}
				/>

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
					title="Front Acrylic Cover"
					onChange={handleOnChangeWhite}
					options={whiteOptions.map((option) => (
						<option
							value={option.option}
							selected={option == frontAcrylicCover}
						>
							{option.option}
						</option>
					))}
					value={frontAcrylicCover}
				/>

				{frontAcrylicCover === '3M Vinyl' && (
					<>
						<VinylColors
							ref={acrylicColorRef}
							vinylWhite={vinylWhite}
							openVinylWhite={openAcrylicCover}
							toggleVinyl={() => {
								setOpenAcrylicCover((prev) => !prev);
								setOpenColor(false);
								setOpenFont(false);
							}}
							selectVinylColor={(color) => {
								setVinylWhite(color);
								setOpenAcrylicCover(false);
							}}
						/>
					</>
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
					title="Mounting"
					onChange={handleOnChangeMounting}
					options={mountingDefaultOptions.map((mounting) => (
						<option
							value={mounting.value}
							selected={mounting.value == mounting}
						>
							{mounting.value}
						</option>
					))}
					value={mounting}
				/>

				{(mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) && (
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

				<Dropdown
					title="Quantity"
					onChange={handleOnChangeSets}
					options={setOptions}
					value={sets}
					onlyValue={true}
				/>
			</div>

			{(mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) && (
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

			<div className="text-xs text-[#9F9F9F] pt-4">
				We size the letters in proportion to your chosen font. Some
				uppercase/lowercase letters may appear shorter or taller than your
				selected height on the form to maintain visual harmony.
			</div>
		</>
	);
}
