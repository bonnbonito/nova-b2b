import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import convertJson from '../../../../utils/ConvertJson';
import {
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
} from '../../../../utils/SignageOptions';

import { calculateLetterPrice, spacerPricing } from '../../../../utils/Pricing';

import { ledLightColors } from '../../../metal-channel/metalChannelOptions';

import { colorOptions } from '../../../../utils/ColorOptions';

import ColorsDropdown from '../../../../utils/ColorsDropdown';

import VinylColors from '../../../../utils/VinylColors';

import {
	acrylicChannelThicknessOptions,
	acrylicFrontOptions,
} from '../../options';

import { useAppContext } from '../../../../AppProvider';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	LIGHTING_INDOOR,
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

const lettersHeight = {
	min: 2,
	max: 43,
};

export function Letters({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [letters, setLetters] = useState(item.letters ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [font, setFont] = useState(item.font ?? '');
	const [openFont, setOpenFont] = useState(false);
	const [color, setColor] = useState(item.acrylicReturnPaintColor ?? 'Black');
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(
		item.trimLessWaterproof ?? INDOOR_NOT_WATERPROOF
	);
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

	const [fontFileName, setFontFileName] = useState(item.fontFileName ?? '');
	const [fontFileUrl, setFontFileUrl] = useState(item.fontFileUrl ?? '');
	const [fontFilePath, setFontFilePath] = useState(item.fontFilePath ?? '');
	const [fontFile, setFontFile] = useState(item.fontFile ?? '');

	const [letterHeightOptions, setLetterHeightOptions] = useState([]);

	const [customColor, setCustomColor] = useState(item.customColor ?? '');

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight ?? ''
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdDiscount, setUsdDiscount] = useState(item.usdDiscount ?? 0);
	const [cadDiscount, setCadDiscount] = useState(item.cadDiscount ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');
	const [studLength, setStudLength] = useState(item.studLength ?? '');
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [includedItems, setincludedItems] = useState(LIGHTING_INDOOR);

	const [sets, setSets] = useState(item.sets ?? 1);

	const colorRef = useRef(null);
	const fontRef = useRef(null);
	const vinyl3MRef = useRef(null);

	const [letterPricing, setLetterPricing] = useState([]);

	useEffect(() => {
		async function fetchLetterPricing() {
			try {
				const response = await fetch(
					NovaQuote.letters_pricing_api + item.product
				);
				const data = await response.json();
				const pricing = convertJson(data?.pricing_table);
				setLetterPricing(pricing);
			} catch (error) {
				console.error('Error fetching letter pricing:', error);
			}
		}

		fetchLetterPricing();
	}, []);

	const headlineRef = useRef(null);

	const adjustFontSize = () => {
		const container = headlineRef.current.parentNode;
		const headline = headlineRef.current;

		// Reset the font-size to the maximum desired font-size
		headline.style.fontSize = '96px';

		// Check if the headline is wider than its container
		while (
			headline.scrollWidth > container.offsetWidth &&
			parseFloat(window.getComputedStyle(headline).fontSize) > 0
		) {
			// Reduce the font-size by 1px until it fits
			headline.style.fontSize = `${
				parseFloat(window.getComputedStyle(headline).fontSize) - 1
			}px`;
		}
	};

	function updateSignage() {
		// Only proceed if the item to update exists in the signage array
		if (!signage.some((sign) => sign.id === item.id)) return;

		// Consolidate updated properties into a single object
		const updateDetails = {
			letters,
			comments,
			font,
			acrylicChannelThickness,
			mounting: selectedMounting,
			trimLessWaterproof: waterproof,
			acrylicReturnPaintColor: color,
			letterHeight: selectedLetterHeight,
			ledLightColor,
			usdPrice,
			cadPrice,
			files,
			fileNames,
			filePaths,
			fileUrls,
			fontFile,
			fontFileName,
			fontFilePath,
			fontFileUrl,
			vinylWhite,
			customColor,
			sets,
			studLength,
			spacerStandoffDistance,
			acrylicFront,
			usdSinglePrice,
			cadSinglePrice,
			includedItems,
		};

		setSignage((prevSignage) =>
			prevSignage.map((sign) =>
				sign.id === item.id ? { ...sign, ...updateDetails } : sign
			)
		);
	}

	const handleOnChangeLetters = (e) => setLetters(() => e.target.value);

	const handleComments = (e) => setComments(e.target.value);

	const handleSelectFont = (value) => setFont(value);

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

	const handleOnChangeWaterproof = (e) => {
		const target = e.target.value;
		setWaterproof(target);
		if (target === INDOOR_NOT_WATERPROOF) {
			setincludedItems(LIGHTING_INDOOR);
		} else {
			setincludedItems('');
		}
	};

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		setAcrylicChannelThickness(() => target);
	};

	const handleOnChangeLetterHeight = (e) => {
		setSelectedLetterHeight(e.target.value);
	};

	const handleChangePieces = (e) => {
		setPieces(e.target.value);
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

	const computePricing = () => {
		if (
			!letterPricing.length ||
			!selectedLetterHeight ||
			!letters.trim().length
		) {
			return {
				singlePrice: false,
				total: false,
				totalWithoutDiscount: false,
				discount: false,
			};
		}

		const pricingDetail = letterPricing.find(
			(item) => parseInt(item.Height) === parseInt(selectedLetterHeight)
		);

		const baseLetterPrice = parseFloat(pricingDetail?.Frontlit);

		let tempTotal = 0;
		const lettersArray = letters.trim().split('');
		const noLowerCase = NovaQuote.no_lowercase.includes(font);

		lettersArray.forEach((letter) => {
			tempTotal += calculateLetterPrice(letter, baseLetterPrice, noLowerCase);
		});

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
		} else {
			setUsdPrice(0);
			setCadPrice(0);
			setUsdSinglePrice(0);
			setCadSinglePrice(0);
			setUsdDiscount(0);
			setCadDiscount(0);
		}
	}, [
		selectedLetterHeight,
		letters,
		sets,
		font,
		selectedMounting,
		letterPricing,
		acrylicFront,
	]);

	useEffect(() => {
		setLetterHeightOptions(() =>
			Array.from(
				{
					length: parseInt(lettersHeight.max) - parseInt(lettersHeight.min) + 1,
				},
				(_, index) => {
					const val = parseInt(lettersHeight.min) + index;
					return (
						<option
							key={index}
							value={val}
							selected={val === selectedLetterHeight}
						>
							{val}"
						</option>
					);
				}
			)
		);
	}, [lettersHeight, letterHeightOptions]);

	useEffect(() => {
		adjustFontSize();
	}, [letters]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!letters) missingFields.push('Add your Line Text');
		if (!font) missingFields.push('Select Font');
		if (font == 'Custom font') {
			if (fontFileUrl.length === 0 && fileUrls.length === 0) {
				missingFields.push('Upload your custom font or files.');
			}
		}
		if (!selectedLetterHeight) missingFields.push('Select Letter Height');
		if (!acrylicChannelThickness)
			missingFields.push('Select Acrylic Thickness');
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
		if (acrylicFront === '3M Vinyl') {
			if (!vinylWhite?.name) missingFields.push('Select 3M Vinyl');
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
		checkAndAddMissingFields();
	}, [
		letters,
		font,
		color,
		acrylicChannelThickness,
		selectedMounting,
		waterproof,
		selectedLetterHeight,
		fileUrls,
		fontFileUrl,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
		acrylicFront,
		vinylWhite,
	]);

	useEffect(() => {
		updateSignage();
	}, [
		letters,
		comments,
		font,
		acrylicChannelThickness,
		selectedMounting,
		waterproof,
		color,
		usdPrice,
		cadPrice,
		selectedLetterHeight,
		fileUrls,
		fileNames,
		filePaths,
		files,
		fontFileUrl,
		fontFileName,
		fontFilePath,
		fontFile,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
		acrylicFront,
		vinylWhite,
		ledLightColor,
		usdSinglePrice,
		cadSinglePrice,
		includedItems,
	]);

	useOutsideClick(
		[colorRef, fontRef, acrylicFront === '3M Vinyl' ? vinyl3MRef : null].filter(
			Boolean
		),
		() => {
			if (acrylicFront === '3M Vinyl') {
				if (!openColor && !openFont && !openVinylWhite) return;
				setOpenColor(false);
				setOpenFont(false);
				setOpenVinylWhite(false);
			} else {
				if (!openColor && !openFont) return;
				setOpenColor(false);
				setOpenFont(false);
			}
		}
	);

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
		font != 'Custom font' && setFontFileUrl('');
	}, [color, font]);

	return (
		<>
			{item.productLine && (
				<div clasName="py-4 my-4">
					PRODUCT LINE:{' '}
					<span
						className="font-title"
						dangerouslySetInnerHTML={{ __html: item.productLine }}
					/>
				</div>
			)}
			<div className="mt-4 p-4 border-solid border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md">
				<div className="w-full self-center">
					<div
						className="self-center text-center"
						ref={headlineRef}
						style={{
							margin: '0',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							fontFamily: font === 'Custom font' ? '' : font,
							color: item.vinylWhite?.color ?? '#000000',
							textShadow: '0px 0px 1px rgba(0, 0, 0, 1)',
						}}
					>
						{letters ? letters : 'PREVIEW'}
					</div>
				</div>
			</div>

			<div className="py-4">
				<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
					Text
				</label>
				<input
					className="w-full py-4 px-2 color-black border-gray-200 text-sm font-bold rounded-md h-14 placeholder:text-slate-400 "
					type="text"
					onChange={handleOnChangeLetters}
					maxLength={100}
					value={letters}
					placeholder="YOUR TEXT HERE"
				/>
			</div>

			<div className="quote-grid mb-6">
				<FontsDropdown
					font={item.font}
					fontRef={fontRef}
					openFont={openFont}
					setOpenFont={setOpenFont}
					setOpenColor={setOpenColor}
					close={() => {
						setOpenColor(false);
						setOpenVinylWhite(false);
					}}
					handleSelectFont={handleSelectFont}
				/>

				{font == 'Custom font' && (
					<UploadFont
						itemId={item.id}
						setFontFilePath={setFontFilePath}
						setFontFile={setFontFile}
						fontFilePath={fontFilePath}
						fontFileUrl={fontFileUrl}
						setFontFileUrl={setFontFileUrl}
						setFontFileName={setFontFileName}
					/>
				)}

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
					title="Letter Height"
					onChange={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={selectedLetterHeight}
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
					<VinylColors
						ref={vinyl3MRef}
						vinylWhite={vinylWhite}
						openVinylWhite={openVinylWhite}
						toggleVinyl={() => {
							setOpenVinylWhite((prev) => !prev);
							setOpenColor(false);
							setOpenFont(false);
						}}
						selectVinylColor={(color) => {
							setVinylWhite(color);
							setOpenVinylWhite(false);
						}}
					/>
				)}

				<ColorsDropdown
					title="Return Paint Color"
					ref={colorRef}
					colorName={color}
					openColor={openColor}
					toggleColor={() => {
						setOpenColor((prev) => !prev);
						setOpenFont(false);
						setOpenVinylWhite(false);
					}}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setColor(color.name);
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
							title="SPACER DISTANCE"
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
					onlyValue={true}
				/>

				{waterproof === INDOOR_NOT_WATERPROOF && (
					<Dropdown
						title="Included Items"
						options={
							<option value={LIGHTING_INDOOR} selected={LIGHTING_INDOOR}>
								{LIGHTING_INDOOR}
							</option>
						}
						value={LIGHTING_INDOOR}
						onlyValue={true}
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

			<div className="text-xs text-[#9F9F9F] pt-4">
				We size the letters in proportion to your chosen font. Some
				uppercase/lowercase letters may appear shorter or taller than your
				selected height on the form to maintain visual harmony.
			</div>
		</>
	);
}
