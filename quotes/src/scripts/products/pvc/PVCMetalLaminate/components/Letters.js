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
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	finishingOptions,
	mountingOptions,
	thicknessOptions,
} from '../../pvcOptions';

import {
	EXCHANGE_RATE,
	GLOSS_FINISH,
	INDOOR_NOT_WATERPROOF,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { calculateLetterPrice, spacerPricing } from '../../../../utils/Pricing';

import { useAppContext } from '../../../../AppProvider';

export function Letters({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [letters, setLetters] = useState(item.letters ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [font, setFont] = useState(item.font ?? '');
	const [openFont, setOpenFont] = useState(false);
	const [pvcBaseColor, setPvcBaseColor] = useState(item.pvcBaseColor);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [waterProofSelections, setWaterProofSelections] =
		useState(waterProofOptions);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [color, setColor] = useState('#000000');

	const [fontFileName, setFontFileName] = useState(item.fontFileName ?? '');
	const [fontFileUrl, setFontFileUrl] = useState(item.fontFileUrl ?? '');
	const [fontFilePath, setFontFilePath] = useState(item.fontFilePath ?? '');
	const [fontFile, setFontFile] = useState(item.fontFile ?? '');

	const [letterHeightOptions, setLetterHeightOptions] = useState([]);
	const [selectedFinishing, setSelectedFinishing] = useState(
		item.finishing ?? ''
	);
	const [customFont, setCustomFont] = useState(item.customFont);
	const [mounting, setMounting] = useState(item.mounting ?? '');

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

	const [customColor, setCustomColor] = useState(item.customColor ?? '');

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight ?? ''
	);

	const [metalLaminate, setMetalLaminate] = useState(item.metalLaminate ?? '');
	const handleChangeMetalLaminate = (e) => {
		const selectedLaminate = metalFinishColors.find(
			(laminate) => laminate.name === e.target.value
		);
		// Assuming setMetalLaminate and setColor are state setter functions
		setMetalLaminate(selectedLaminate.name);
		setColor(selectedLaminate.color);
	};

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [mountingSelections, setMountingSelections] = useState(mountingOptions);

	const [lettersHeight, setLettersHeight] = useState({
		min: 4,
		max: 39,
	});

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
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters,
					comments,
					font,
					thickness: selectedThickness,
					waterproof,
					pvcBaseColor,
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
					finishing: selectedFinishing,
					customFont,
					customColor,
					mounting,
					sets,
					studLength,
					spacerStandoffDistance,
					metalLaminate,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		if ('Outdoor (Waterproof)' === waterproof) {
			if ('Double-sided tape' === mounting) {
				setMounting('');
			}
			let newOptions = mountingOptions.filter(
				(option) => option.value !== 'Double-sided tape'
			);

			setMountingSelections(newOptions);
		} else {
			setMountingSelections(mountingOptions);
		}
	}, [waterproof]);

	const handleOnChangeLetters = (e) => setLetters(() => e.target.value);

	const handleComments = (e) => setComments(e.target.value);

	const handleSelectFont = (value) => setFont(value);

	const handleOnChangeMounting = (e) => {
		const target = e.target.value;
		setMounting(target);

		if (target === 'Plain' || target === 'Double-sided tape') {
			setStudLength('');
		}
		if (target !== STUD_WITH_SPACER) {
			setSpacerStandoffDistance('');
		}

		if (target === 'Double-sided tape') {
			setWaterProofSelections(
				waterProofOptions.filter(
					(option) => option.option === INDOOR_NOT_WATERPROOF
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

		if (parseInt(target) === 40 && parseInt(selectedLetterHeight) === 4) {
			setSelectedLetterHeight('');
		}
	};

	const handleOnChangeLetterHeight = (e) => {
		setSelectedLetterHeight(e.target.value);
	};

	const handleChangeFinishing = (e) => {
		setSelectedFinishing(e.target.value);
	};

	const computePricing = () => {
		if (
			!letterPricing.length ||
			!selectedLetterHeight ||
			!selectedThickness ||
			!waterproof
		) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		const pricingDetail = letterPricing[selectedLetterHeight - 4];
		const baseLetterPrice = pricingDetail[selectedThickness.thickness];

		let tempTotal = 0;
		const lettersArray = letters.trim().split('');
		const noLowerCase = NovaQuote.no_lowercase.includes(font);

		lettersArray.forEach((letter) => {
			tempTotal += calculateLetterPrice(letter, baseLetterPrice, noLowerCase);
		});

		if (waterproof) {
			tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.03;
		}

		if (selectedFinishing) {
			tempTotal *= selectedFinishing === GLOSS_FINISH ? 1.03 : 1;
		}

		if (mounting) {
			tempTotal *= mounting === 'Double-sided tape' ? 1.01 : 1;
		}

		if (pvcBaseColor) {
			tempTotal *= pvcBaseColor?.name !== 'Black' ? 1.1 : 1;
		}

		if (mounting === STUD_WITH_SPACER) {
			const spacer = spacerPricing(tempTotal);
			tempTotal += parseFloat(spacer.toFixed(2));
		}

		let total = tempTotal * parseInt(sets);

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
		selectedLetterHeight,
		selectedThickness,
		selectedFinishing,
		letters,
		waterproof,
		lettersHeight,
		mounting,
		font,
		sets,
		pvcBaseColor,
		letterPricing,
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
							defaultValue={val === selectedLetterHeight}
						>
							{val}"
						</option>
					);
				}
			)
		);
	}, [lettersHeight]);

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
		if (!selectedThickness) missingFields.push('Select Thickness');

		if (!metalLaminate) missingFields.push('Select Metal Laminate');

		if (!pvcBaseColor?.name) missingFields.push('Select PVC Base Color');
		if (pvcBaseColor?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (!selectedFinishing) missingFields.push('Select Finishing');
		if (!waterproof) missingFields.push('Select Environment');
		if (!mounting) missingFields.push('Select Mounting');

		if (
			mounting === STUD_WITH_SPACER ||
			mounting === STUD_MOUNT ||
			mounting === 'Pad' ||
			mounting === 'Pad - Combination All'
		) {
			if (!studLength) missingFields.push('Select Stud Length');
		}
		if (mounting === STUD_WITH_SPACER) {
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
		pvcBaseColor,
		selectedThickness,
		waterproof,
		selectedLetterHeight,
		fileUrls,
		fontFileUrl,
		selectedFinishing,
		customColor,
		mounting,
		sets,
		studLength,
		spacerStandoffDistance,
		metalLaminate,
	]);

	useEffect(() => {
		updateSignage();
	}, [
		letters,
		comments,
		font,
		selectedThickness,
		waterproof,
		pvcBaseColor,
		usdPrice,
		cadPrice,
		usdSinglePrice,
		cadSinglePrice,
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
		mounting,
		sets,
		studLength,
		spacerStandoffDistance,
		metalLaminate,
	]);

	useEffect(() => {
		const newHeightOptions = letterPricing?.filter((item) => {
			const value = item[selectedThickness?.thickness];
			return (
				value !== '' &&
				value !== null &&
				value !== undefined &&
				value !== false &&
				value !== 0 &&
				value !== '0' &&
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
		pvcBaseColor?.name != 'Custom Color' && setCustomColor('');
		font != 'Custom font' && setFontFileUrl('');
	}, [pvcBaseColor, font]);

	return (
		<>
			{item.productLine && (
				<div className="py-4 my-4">
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
							color: color,
							textShadow: `-1px 1px 3px ${pvcBaseColor?.color}, 0 0 1px #000000`,
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
					close={() => setOpenColor(false)}
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
					title="Thickness"
					value={selectedThickness?.value}
					onChange={handleOnChangeThickness}
					options={thicknessOptions.map((thickness) => (
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
					title="Letter Height"
					onChange={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={item.letterHeight}
				/>

				<Dropdown
					title="Metal Laminate"
					onChange={handleChangeMetalLaminate}
					options={metalFinishColors.map((laminate) => (
						<option
							key={laminate.name}
							value={laminate.name}
							defaultValue={laminate.name === item.metalLaminate}
						>
							{laminate.name}
						</option>
					))}
					value={metalLaminate}
				/>

				<ColorsDropdown
					ref={colorRef}
					title="PVC BASE COLOR"
					colorName={pvcBaseColor?.name}
					openColor={openColor}
					toggleColor={() => {
						setOpenColor((prev) => !prev);
					}}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setPvcBaseColor(color);
						setOpenColor(false);
					}}
					samePrice={false}
				/>

				<Dropdown
					title="Finishing Options"
					onChange={handleChangeFinishing}
					options={finishingOptions.map((finishing) => (
						<option
							key={finishing.name}
							value={finishing.name}
							defaultValue={finishing.name === item.finishing}
						>
							{finishing.name}
						</option>
					))}
					value={item.finishing}
				/>

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
					options={waterProofSelections.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option.option == item.waterproof}
						>
							{option.option}
						</option>
					))}
					value={item.waterproof}
				/>

				<Dropdown
					title="MOUNTING"
					onChange={handleOnChangeMounting}
					options={mountingSelections.map((option) => (
						<option
							key={option.value}
							value={option.value}
							defaultValue={option.value === mounting}
						>
							{option.value}
						</option>
					))}
					value={item.mounting}
				/>

				{(mounting === STUD_WITH_SPACER ||
					mounting === 'Pad' ||
					mounting === 'Pad - Combination All' ||
					mounting === STUD_MOUNT) && (
					<>
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
					</>
				)}
				{mounting === STUD_WITH_SPACER && (
					<>
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

			{mounting === STUD_WITH_SPACER && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{pvcBaseColor?.name == 'Custom Color' && (
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
