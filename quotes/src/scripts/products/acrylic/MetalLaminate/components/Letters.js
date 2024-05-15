import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import {
	colorOptions,
	metalFinishColors,
} from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import {
	mountingDefaultOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import { METAL_ACRYLIC_PRICING } from '../MetalLaminate';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { useAppContext } from '../../../../AppProvider';

const NovaOptions = NovaQuote.quote_options;

const lowerCasePricing = parseFloat(
	NovaQuote.lowercase_pricing ? NovaQuote.lowercase_pricing : 1
);
const smallPunctuations = parseFloat(
	NovaQuote.small_punctuations_pricing
		? NovaQuote.small_punctuations_pricing
		: 1
);
//const AcrylicLetterPricing = JSON.parse(NovaOptions.letter_x_logo_pricing);

export const Letters = ({ item }) => {
	const { signage, setSignage, setMissing } = useAppContext();

	const [letters, setLetters] = useState(item.letters);
	const [comments, setComments] = useState(item.comments);
	const [font, setFont] = useState(item.font);
	const [customFont, setCustomFont] = useState(item.customFont);
	const [customColor, setCustomColor] = useState(item.customColor);
	const [acrylicBase, setAcrylicBase] = useState(item.acrylicBase);
	const [openFont, setOpenFont] = useState(false);
	const [openAcrylicColor, setOpenAcrylicColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [selectedThickness, setSelectedThickness] = useState(
		item.acrylicThickness
	);

	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);

	const [fontFileName, setFontFileName] = useState(item.fontFileName);
	const [fontFileUrl, setFontFileUrl] = useState(item.fontFileUrl);
	const [fontFilePath, setFontFilePath] = useState(item.fontFilePath);
	const [fontFile, setFontFile] = useState(item.fontFile);

	const [letterHeightOptions, setLetterHeightOptions] = useState([]);
	const [metalLaminate, setMetalLaminate] = useState(item.metalLaminate);

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);

	const [lettersHeight, setLettersHeight] = useState({ min: '1', max: '43' });

	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);

	const [studLength, setStudLength] = useState(item.studLength);
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);
	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance
	);

	const [color, setColor] = useState('#000000');

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

	const [sets, setSets] = useState(item.sets);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const acrylicRef = useRef(null);
	const fontRef = useRef(null);

	const [letterPricing, setLetterPricing] = useState([]);

	useEffect(() => {
		async function fetchLetterPricing() {
			try {
				const response = await fetch(
					NovaQuote.letters_pricing_api + item.product
				);
				const data = await response.json();
				const pricing = convert_json(data?.pricing_table);
				setLetterPricing(pricing);
			} catch (error) {
				console.error('Error fetching letter pricing:', error);
			}
		}

		fetchLetterPricing();
	}, []);

	useEffect(() => {
		console.log('Attempting to preload fonts...');
		async function preloadFonts() {
			try {
				await loadingFonts();
			} catch (error) {
				console.error('Error loading fonts:', error);
			}
		}
		preloadFonts();
	}, []);

	const loadingFonts = async () => {
		const loadPromises = NovaQuote.fonts.map((font) => loadFont(font));
		await Promise.all(loadPromises);
	};

	async function loadFont({ name, src }) {
		const fontFace = new FontFace(name, `url(${src})`);

		try {
			await fontFace.load();
			document.fonts.add(fontFace);
		} catch (e) {
			console.error(`Font ${name} failed to load`);
		}
	}

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

	const handleChangeMetalLaminate = (e) => {
		const selectedLaminate = metalFinishColors.find(
			(laminate) => laminate.name === e.target.value
		);
		// Assuming setMetalLaminate and setColor are state setter functions
		setMetalLaminate(selectedLaminate.name);
		setColor(selectedLaminate.color);
	};

	function updateSignage() {
		console.log('updateSignage');
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters,
					comments,
					font,
					acrylicThickness: selectedThickness,
					mounting: selectedMounting,
					waterproof,
					acrylicBase,
					letterHeight: selectedLetterHeight,
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
					metalLaminate,
					customFont,
					customColor,
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

	const handleOnChangeLetters = (e) => setLetters(() => e.target.value);

	const handleComments = (e) => setComments(e.target.value);

	const handleSelectFont = (value) => setFont(value);

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = thicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
		if (parseInt(target) === 3 && parseInt(selectedLetterHeight) > 24) {
			setSelectedLetterHeight('');
		}
		if (parseInt(target) > 11 && parseInt(selectedLetterHeight) === 1) {
			setSelectedLetterHeight('');
		}
	};

	const handleOnChangeLetterHeight = (e) => {
		setSelectedLetterHeight(e.target.value);
	};

	useEffect(() => {
		if (
			letterPricing.length === 0 ||
			!selectedLetterHeight ||
			!selectedThickness ||
			!waterproof ||
			!letters
		) {
			setUsdPrice(0);
			setCadPrice(0);
			return;
		}

		const pricingDetail = letterPricing[selectedLetterHeight - 1];
		const baseLetterPrice = pricingDetail[selectedThickness.value];
		const noLowerCase = NovaQuote.no_lowercase.includes(font);

		const totalLetterPrice = letters
			.trim()
			.split('')
			.reduce((total, letter) => {
				let letterPrice = baseLetterPrice;

				if (letter === ' ') {
					letterPrice = 0;
				} else if (letter.match(/[a-z]/)) {
					letterPrice *= noLowerCase ? 1 : lowerCasePricing;
				} else if (letter.match(/[`~"*,.\-']/)) {
					letterPrice *= smallPunctuations;
				}

				letterPrice *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.1;
				letterPrice *= METAL_ACRYLIC_PRICING;
				letterPrice *= acrylicBase?.name === 'Black' ? 1 : 1.1;

				return total + letterPrice;
			}, 0);

		let adjustedPrice = totalLetterPrice;

		if (selectedMounting === STUD_WITH_SPACER) {
			const maxVal = wcumcs_vars_data.currency === 'USD' ? 25 : 25 * 1.3;
			const spacer =
				totalLetterPrice * 1.02 > maxVal ? maxVal : totalLetterPrice * 1.02;
			adjustedPrice += parseFloat(spacer.toFixed(2));
		}

		const finalPrice = adjustedPrice * sets;
		setUsdPrice(finalPrice.toFixed(2));
		setCadPrice((finalPrice * parseFloat(EXCHANGE_RATE)).toFixed(2));
	}, [
		selectedLetterHeight,
		selectedThickness,
		letters,
		waterproof,
		lettersHeight,
		acrylicBase,
		sets,
		font,
		selectedMounting,
		letterPricing, // Assuming letterPricing is not expected to change frequently
	]);

	useEffect(() => {
		let newMountingOptions = mountingDefaultOptions;

		if (selectedThickness?.value === '3') {
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
	}, [selectedThickness, waterproof, setSelectedMounting, setMountingOptions]);

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

	useEffect(() => {
		updateSignage();
	}, [
		letters,
		comments,
		font,
		selectedThickness,
		waterproof,
		acrylicBase,
		usdPrice,
		cadPrice,
		selectedLetterHeight,
		fileUrls,
		fileNames,
		files,
		filePaths,
		fontFileUrl,
		fontFileName,
		fontFilePath,
		fontFile,
		metalLaminate,
		customFont,
		customColor,
		sets,
		selectedMounting,
		studLength,
		spacerStandoffDistance,
	]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!letters) missingFields.push('Add Line Text');
		if (!font) missingFields.push('Select Font');
		if (font == 'Custom font' && !fontFileUrl) {
			missingFields.push('Upload your custom font.');
		}
		if (!selectedLetterHeight) missingFields.push('Select Letter Height');
		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
		if (!metalLaminate) missingFields.push('Select Metal Laminate');
		if (!acrylicBase) missingFields.push('Select Acrylic Base');
		if (acrylicBase?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!waterproof) missingFields.push('Select Waterproof');
		if (!selectedMounting) missingFields.push('Select Mounting');
		if (selectedMounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}
		if (selectedMounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}
		if (!sets) missingFields.push('Select Quantity');
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
		letters,
		font,
		selectedThickness,
		selectedMounting,
		studLength,
		spacerStandoffDistance,
		waterproof,
		selectedLetterHeight,
		metalLaminate,
		acrylicBase,
		customColor,
		fontFileUrl,
		sets,
	]);

	useEffect(() => {
		const newHeightOptions = letterPricing?.filter((item) => {
			const value = item[selectedThickness?.value];
			return (
				value !== '' &&
				value !== null &&
				value !== undefined &&
				value !== false &&
				!isNaN(value)
			);
		});

		if (newHeightOptions.length > 0) {
			setLettersHeight(() => ({
				min: newHeightOptions[0].Height,
				max: newHeightOptions[newHeightOptions.length - 1].Height,
			}));
		}
	}, [selectedThickness]);

	useOutsideClick([acrylicRef, fontRef], () => {
		if (!openFont && !openAcrylicColor) return;
		setOpenAcrylicColor(false);
		setOpenFont(false);
	});

	useEffect(() => {
		font != 'Custom font' && setFontFileUrl('');
		acrylicBase?.name != 'Custom Color' && setCustomColor('');
	}, [font, acrylicBase]);

	return (
		<>
			<div className="mt-4 p-4 border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md">
				<div className="w-full self-center">
					<div
						className="self-center text-center"
						ref={headlineRef}
						style={{
							margin: '0',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							fontFamily: font === 'Custom font' ? '' : font,
							color: color,
							textShadow: `-1px 1px 3px ${
								acrylicBase?.name ? acrylicBase?.color : '#000000'
							}, 0 0 1px #000000`,
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
					font={font}
					fontRef={fontRef}
					openFont={openFont}
					setOpenFont={setOpenFont}
					handleSelectFont={handleSelectFont}
					setOpenColor={() => {
						setOpenAcrylicColor(false);
					}}
				/>

				{font == 'Custom font' && (
					<UploadFont
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
					title="Letter Height"
					onChange={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={selectedLetterHeight}
				/>

				<Dropdown
					title="Metal Laminate"
					onChange={handleChangeMetalLaminate}
					options={metalFinishColors.map((laminate) => (
						<option
							value={laminate.name}
							selected={laminate.name === item.metalLaminate}
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
						onClick={() => {
							console.log('Click');
							setOpenAcrylicColor((prev) => !prev);
							setOpenFont(false);
						}}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									acrylicBase?.name == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: acrylicBase?.color,
							}}
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

			<div className="text-xs text-[#9F9F9F] pt-4">
				We size the letters in proportion to your chosen font. Some
				uppercase/lowercase letters may appear shorter or taller than your
				selected height on the form to maintain visual harmony.
			</div>
		</>
	);
};
