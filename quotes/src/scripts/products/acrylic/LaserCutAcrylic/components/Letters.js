import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import convert_json from '../../../../utils/ConvertJson';
import {
	finishingOptions,
	mountingDefaultOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import { spacerPricing } from '../../../../utils/Pricing';

import { colorOptions } from '../ColorOptions';

import ColorsDropdown from '../../../../utils/ColorsDropdown';

import { useAppContext } from '../../../../AppProvider';

import {
	CLEAR_COLOR,
	EXCHANGE_RATE,
	FROSTED_CLEAR_COLOR,
	GLOSS_FINISH,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

export function Letters({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [letters, setLetters] = useState(item.letters ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [font, setFont] = useState(item.font ?? '');
	const [openFont, setOpenFont] = useState(false);
	const [color, setColor] = useState(item.color ?? { name: '', color: '' });
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [selectedThickness, setSelectedThickness] = useState(
		item.acrylicThickness ?? ''
	);

	const [waterProofSelections, setWaterProofSelections] =
		useState(waterProofOptions);
	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [fileName, setFileName] = useState(item.fileName ?? '');
	const [fileUrl, setFileUrl] = useState(item.fileUrl ?? '');
	const [filePath, setFilePath] = useState(item.filePath ?? '');
	const [file, setFile] = useState(item.file ?? '');

	const [fontFileName, setFontFileName] = useState(item.fontFileName ?? '');
	const [fontFileUrl, setFontFileUrl] = useState(item.fontFileUrl ?? '');
	const [fontFilePath, setFontFilePath] = useState(item.fontFilePath ?? '');
	const [fontFile, setFontFile] = useState(item.fontFile ?? '');

	const [letterHeightOptions, setLetterHeightOptions] = useState([]);
	const [selectedFinishing, setSelectedFinishing] = useState(
		item.finishing ?? ''
	);
	const [customFont, setCustomFont] = useState(item.customFont ?? '');
	const [customColor, setCustomColor] = useState(item.customColor ?? '');

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight ?? ''
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);

	const [lettersHeight, setLettersHeight] = useState({
		min: 2,
		max: 43,
	});

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
		if (file) {
			setFiles([file]);
		}
		if (fileName) {
			setFileNames([fileName]);
		}
		if (filePath) {
			setFilePaths([filePath]);
		}
		if (fileUrl) {
			setFileUrls([fileUrl]);
		}
	}, [file, fileName, filePath, fileUrl]);

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
			acrylicThickness: selectedThickness,
			mounting: selectedMounting,
			waterproof,
			color,
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
			finishing: selectedFinishing,
			customFont,
			customColor,
			sets,
			studLength,
			spacerStandoffDistance,
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

	const handleChangeFinishing = (e) => {
		setSelectedFinishing(e.target.value);
	};

	const handleChangePieces = (e) => {
		setPieces(e.target.value);
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

	// Helper function to determine letter price adjustments
	function calculateLetterPrice(
		letter,
		baseLetterPrice,
		noLowerCase,
		waterproof,
		selectedFinishing,
		color
	) {
		let letterPrice = baseLetterPrice;

		// Pricing adjustments based on character type
		if (letter === ' ') return 0;
		if (letter.match(/[a-z]/)) letterPrice *= noLowerCase ? 1 : 0.8;
		if (letter.match(/[`~"*,.\-']/)) letterPrice *= 0.3;

		// Waterproof and finishing adjustments
		letterPrice *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.1;
		letterPrice *= selectedFinishing === GLOSS_FINISH ? 1.1 : 1;

		// Color adjustments
		if (color?.name === CLEAR_COLOR) letterPrice *= 0.9;
		if (color?.name === FROSTED_CLEAR_COLOR) letterPrice *= 0.95;

		return letterPrice;
	}

	useEffect(() => {
		if (
			letterPricing.length > 0 &&
			selectedLetterHeight &&
			selectedThickness &&
			waterproof &&
			letters.trim().length > 0
		) {
			const pricingDetail = letterPricing[selectedLetterHeight - 1];
			const baseLetterPrice = pricingDetail[selectedThickness.value];
			let totalLetterPrice = 0;
			const lettersArray = letters.trim().split('');
			const noLowerCase = NovaQuote.no_lowercase.includes(font);

			lettersArray.forEach((letter) => {
				totalLetterPrice += calculateLetterPrice(
					letter,
					baseLetterPrice,
					noLowerCase,
					waterproof,
					selectedFinishing,
					color
				);
			});

			if (spacerStandoffDistance) {
				const spacer = spacerPricing(totalLetterPrice);
				totalLetterPrice += parseFloat(spacer.toFixed(2));
			}

			totalLetterPrice *= sets;

			setUsdPrice(parseFloat(totalLetterPrice).toFixed(2));
			setCadPrice((totalLetterPrice * parseFloat(EXCHANGE_RATE)).toFixed(2));
		} else {
			setUsdPrice(0);
			setCadPrice(0);
		}
	}, [
		selectedLetterHeight,
		selectedThickness,
		selectedFinishing,
		letters,
		waterproof,
		color,
		sets,
		font,
		spacerStandoffDistance,
		letterPricing,
	]);

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

		if (!letters) missingFields.push('Add your Line Text');
		if (!font) missingFields.push('Select Font');
		if (font == 'Custom font' && !fontFileUrl) {
			missingFields.push('Upload your custom font.');
		}
		if (!selectedLetterHeight) missingFields.push('Select Letter Height');
		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
		if (!color.name) missingFields.push('Select Color');
		if (color?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!selectedFinishing) missingFields.push('Select Finishing');
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
		selectedThickness,
		selectedMounting,
		waterproof,
		selectedLetterHeight,
		fileUrls,
		fontFileUrl,
		selectedFinishing,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	useEffect(() => {
		updateSignage();
	}, [
		letters,
		comments,
		font,
		selectedThickness,
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
		selectedFinishing,
		customFont,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
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

	useOutsideClick([colorRef, fontRef], () => {
		if (!openColor && !openFont) return;
		setOpenColor(false);
		setOpenFont(false);
	});

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
		font != 'Custom font' && setFontFileUrl('');
	}, [color, font]);

	return (
		<>
			{item.productLine && (
				<div clasName="py-4 my-4">
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
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
							color: color.color,
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
					handleSelectFont={handleSelectFont}
					close={() => {
						setOpenColor(false);
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

				<ColorsDropdown
					ref={colorRef}
					title="Color"
					colorName={color.name}
					openColor={openColor}
					toggleColor={() => {
						setOpenColor((prev) => !prev);
						setOpenFont(false);
					}}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setColor(color);
						setOpenColor(false);
					}}
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
					onChange={handleOnChangeWaterproof}
					options={waterProofSelections?.map((option) => (
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
