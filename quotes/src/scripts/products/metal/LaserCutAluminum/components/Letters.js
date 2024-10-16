import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
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

import {
	anodizedPricing,
	calculateLetterPrice,
	spacerPricing,
} from '../../../../utils/Pricing';

import { useAppContext } from '../../../../AppProvider';

export function Letters({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [letters, setLetters] = useState(item.letters ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [font, setFont] = useState(item.font ?? '');
	const [openFont, setOpenFont] = useState(false);
	const [color, setColor] = useState(item.metalColor);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [selectedThickness, setSelectedThickness] = useState(
		item.metalThickness
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
	const [selectedFinishing, setSelectedFinishing] = useState(
		item.aluminumFinishing ?? ''
	);

	const [anodizedFinishing, setAnodizedFinishing] = useState(
		item.anodizedFinishing ?? ''
	);

	const [anodizedColor, setAnodizedColor] = useState(item.anodizedColor ?? '');

	const [customFont, setCustomFont] = useState(item.customFont);
	const [customColor, setCustomColor] = useState(item.metalCustomColor);
	const [metalMountingOptions, setMetalMountingOptions] = useState(
		metalInstallationOptions
	);

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

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

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
					metalThickness: selectedThickness,
					mounting,
					waterproof,
					metalColor: color,
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
					aluminumFinishing: selectedFinishing,
					anodizedFinishing,
					anodizedColor,
					customFont,
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

	const handleOnChangeLetters = (e) => setLetters(() => e.target.value);

	const handleComments = (e) => setComments(e.target.value);

	const handleSelectFont = (value) => setFont(value);

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

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = metalThicknessOptions.filter(
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

		const pricingDetail = letterPricing[selectedLetterHeight - 1];
		const baseLetterPrice = pricingDetail[selectedThickness.value];

		let tempTotal = 0;
		const lettersArray = letters.trim().split('');
		const noLowerCase = NovaQuote.no_lowercase.includes(font);

		lettersArray.forEach((letter) => {
			tempTotal += calculateLetterPrice(letter, baseLetterPrice, noLowerCase);
		});

		if (waterproof)
			tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.02;

		if ('Anodized' === selectedFinishing) {
			let anodizedPrice = anodizedPricing(tempTotal);
			anodizedPrice = parseFloat(anodizedPrice.toFixed(2));
			tempTotal += anodizedPrice;
		}

		if (mounting && mounting === STUD_WITH_SPACER) {
			let spacer = spacerPricing(tempTotal);
			spacer = parseFloat(spacer.toFixed(2));

			tempTotal += spacer;
		}

		const total = tempTotal * parseInt(sets);

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
		sets,
		font,
		mounting,
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

	useEffect(() => {
		updateSignage();
	}, [
		letters,
		comments,
		font,
		selectedThickness,
		anodizedFinishing,
		anodizedColor,
		mounting,
		waterproof,
		color,
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
		selectedFinishing,
		customFont,
		sets,
		customColor,
		studLength,
		spacerStandoffDistance,
		usdSinglePrice,
		cadSinglePrice,
	]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!letters) missingFields.push('Add Line Text');
		if (!font) missingFields.push('Select Font');
		if (font == 'Custom font') {
			if (fontFileUrl.length === 0 && fileUrls.length === 0) {
				missingFields.push('Upload your custom font or files.');
			}
		}
		if (!selectedLetterHeight) missingFields.push('Select Letter Height');
		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
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
		if (!waterproof) missingFields.push('Select Environment');
		if (!mounting) missingFields.push('Select Mounting');

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

	useEffect(() => {
		checkAndAddMissingFields();
	}, [
		letters,
		font,
		color,
		selectedThickness,
		anodizedFinishing,
		anodizedColor,
		mounting,
		waterproof,
		selectedLetterHeight,
		fileUrls,
		fileNames,
		files,
		filePaths,
		fontFileUrl,
		selectedFinishing,
		studLength,
		spacerStandoffDistance,
		customFont,
		customColor,
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

	if (selectedFinishing === 'Painted') {
		useOutsideClick([colorRef, fontRef], () => {
			if (!openColor && !openFont) return;
			setOpenColor(false);
			setOpenFont(false);
		});
	} else {
		useOutsideClick([fontRef], () => {
			if (!openFont) return;
			setOpenFont(false);
		});
	}

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
		font != 'Custom font' && setFontFileUrl('');
	}, [color, font]);

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
							color: color?.color,
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
					font={font}
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
					title="Metal Thickness"
					value={selectedThickness?.value}
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
					title="Letter Height"
					onChange={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={selectedLetterHeight}
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
					<>
						<ColorsDropdown
							ref={colorRef}
							title="Color"
							colorName={color.name}
							openColor={openColor}
							toggleColor={() => {
								setOpenFont(false);
								setOpenColor((prev) => !prev);
							}}
							colorOptions={colorOptions}
							selectColor={(color) => {
								setColor(color);
								setOpenColor(false);
							}}
						/>
					</>
				)}

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
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
					value={mounting}
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
				{color?.name == 'Custom Color' && (
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
