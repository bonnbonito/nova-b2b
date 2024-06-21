import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import {
	colorOptions,
	metalFinishColors,
} from '../../../../utils/ColorOptions';
import ColorsDropdown from '../../../../utils/ColorsDropdown';
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

import { calculateLetterPrice, spacerPricing } from '../../../../utils/Pricing';

import { useAppContext } from '../../../../AppProvider';

export const Letters = ({ item }) => {
	const { signage, setSignage, setMissing } = useAppContext();

	const [letterPricing, setLetterPricing] = useState([]);

	const [letters, setLetters] = useState(item.letters ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [font, setFont] = useState(item.font ?? '');
	const [customFont, setCustomFont] = useState(item.customFont ?? '');
	const [customColor, setCustomColor] = useState(item.customColor ?? '');
	const [acrylicBase, setAcrylicBase] = useState(
		item.acrylicBase ?? { name: 'Black', color: '#000000' }
	);
	const [openFont, setOpenFont] = useState(false);
	const [openAcrylicColor, setOpenAcrylicColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');

	const [waterProofSelections, setWaterProofSelections] =
		useState(waterProofOptions);

	const [selectedThickness, setSelectedThickness] = useState(
		item.acrylicThickness ?? ''
	);

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [fontFileName, setFontFileName] = useState(item.fontFileName ?? '');
	const [fontFileUrl, setFontFileUrl] = useState(item.fontFileUrl ?? '');
	const [fontFilePath, setFontFilePath] = useState(item.fontFilePath ?? '');
	const [fontFile, setFontFile] = useState(item.fontFile ?? '');

	const [letterHeightOptions, setLetterHeightOptions] = useState('');
	const [metalLaminate, setMetalLaminate] = useState(item.metalLaminate ?? '');

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight ?? ''
	);

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [lettersHeight, setLettersHeight] = useState({ min: '1', max: '43' });

	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');

	const [studLength, setStudLength] = useState(item.studLength ?? '');
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);
	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [color, setColor] = useState('#000000');

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeMount = (e) => {
		const target = e.target.value;
		setSelectedMounting(target);

		if (target === 'Plain' || target === 'Double-sided tape') {
			setStudLength('');
		}
		if (target !== STUD_WITH_SPACER) {
			setSpacerStandoffDistance('');
		}

		if (target === 'Double-sided tape') {
			setWaterProofSelections(
				waterProofOptions.filter(
					(option) => option.option == INDOOR_NOT_WATERPROOF
				)
			);
		} else {
			setWaterProofSelections(waterProofOptions);
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

	const acrylicRef = useRef(null);
	const fontRef = useRef(null);

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

	const computePricing = () => {
		if (
			letterPricing.length > 0 &&
			selectedLetterHeight &&
			selectedThickness &&
			waterproof &&
			letters.trim().length > 0
		) {
			const pricingDetail = letterPricing[selectedLetterHeight - 1];
			const baseLetterPrice = pricingDetail[selectedThickness.value];
			const noLowerCase = NovaQuote.no_lowercase.includes(font);
			const lettersArray = letters.trim().split('');
			let tempTotal = 0;

			lettersArray.forEach((letter) => {
				tempTotal += calculateLetterPrice(letter, baseLetterPrice, noLowerCase);
			});

			tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.1;
			tempTotal *= acrylicBase?.name === 'Black' ? 1 : 1.1;
			tempTotal *= METAL_ACRYLIC_PRICING;

			if (selectedMounting === STUD_WITH_SPACER) {
				let spacer = spacerPricing(tempTotal);
				spacer = parseFloat(spacer.toFixed(2));
				tempTotal += parseFloat(spacer.toFixed(2));
			}

			/** if Layered 3D */
			if (item.isLayered) {
				tempTotal *= 1.4;
			}

			const total = tempTotal * sets;

			return {
				singlePrice: tempTotal.toFixed(2) ?? 0,
				total: total?.toFixed(2) ?? 0,
			};
		} else {
			return {
				singlePrice: 0,
				total: 0,
			};
		}
	};

	function updateSignage() {
		const updatedSignage = signage.map((sign, index) => {
			if (sign.id === item.id) {
				return {
					...sign,
					title: item.isLayered ? `Layer ${index + 1}` : item.title,
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
					usdSinglePrice,
					cadSinglePrice,
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
				return {
					title: item.isLayered ? `Layer ${index + 1}` : item.title,
					...sign,
				};
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

		if (parseInt(target) > 11 && parseInt(selectedLetterHeight) === 1) {
			setSelectedLetterHeight('');
		}

		if (parseInt(target) === 3) {
			if (parseInt(selectedLetterHeight) > 24) {
				setSelectedLetterHeight('');
			}
			if (
				selectedMounting === STUD_MOUNT ||
				selectedMounting === STUD_WITH_SPACER ||
				selectedMounting === 'Pad' ||
				selectedMounting === 'Pad - Combination All'
			) {
				setSelectedMounting('');
				setStudLength('');
				setSpacerStandoffDistance('');
			}
		}
	};

	const handleOnChangeLetterHeight = (e) => {
		setSelectedLetterHeight(e.target.value);
	};

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
		let newMountingOptions = mountingDefaultOptions;

		if (selectedThickness?.value === '3') {
			newMountingOptions = mountingDefaultOptions.filter(
				(option) =>
					option.mounting_option !== STUD_MOUNT &&
					option.mounting_option !== STUD_WITH_SPACER &&
					option.mounting_option !== 'Pad' &&
					option.mounting_option !== 'Pad - Combination All'
			);
		} else {
			newMountingOptions = mountingDefaultOptions;
		}

		if (waterproof) {
			if (waterproof === 'Outdoor (Waterproof)') {
				if (selectedMounting === 'Double-sided tape') {
					setSelectedMounting('');
				}

				newMountingOptions = newMountingOptions.filter(
					(option) => option.mounting_option !== 'Double-sided tape'
				);
			} else {
			}
		}

		setMountingOptions(newMountingOptions);
	}, [selectedThickness, waterproof, selectedMounting]);

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
		if (!waterproof) missingFields.push('Select Environment');
		if (!selectedMounting) missingFields.push('Select Mounting');
		if (
			selectedMounting === STUD_WITH_SPACER ||
			selectedMounting === STUD_MOUNT ||
			selectedMounting === 'Pad' ||
			selectedMounting === 'Pad - Combination All'
		) {
			if (!studLength) missingFields.push('Select Stud Length');
		}
		if (selectedMounting === STUD_WITH_SPACER) {
			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
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
		selectedLetterHeight,
		selectedThickness,
		letters,
		waterproof,
		lettersHeight,
		acrylicBase,
		sets,
		font,
		selectedMounting,
		letterPricing,
	]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [
		letters,
		comments,
		font,
		selectedThickness,
		waterproof,
		acrylicBase,
		usdPrice,
		cadPrice,
		usdSinglePrice,
		cadSinglePrice,
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
					close={() => {
						setOpenAcrylicColor(false);
					}}
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

				<ColorsDropdown
					ref={acrylicRef}
					title="Acrylic Base"
					colorName={acrylicBase.name}
					toggleColor={() => {
						setOpenAcrylicColor((prev) => !prev);
						setOpenFont(false);
					}}
					openColor={openAcrylicColor}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setAcrylicBase(color);
						setOpenAcrylicColor(false);
					}}
				/>

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
					options={waterProofSelections.map((option) => (
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

				{(selectedMounting === STUD_WITH_SPACER ||
					selectedMounting === 'Pad' ||
					selectedMounting === 'Pad - Combination All' ||
					selectedMounting === STUD_MOUNT) && (
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
				{selectedMounting === STUD_WITH_SPACER && (
					<>
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

				{!item.hideQuantity && (
					<Dropdown
						title="Quantity"
						onChange={handleOnChangeSets}
						options={setOptions}
						value={sets}
						onlyValue={true}
					/>
				)}
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
};
