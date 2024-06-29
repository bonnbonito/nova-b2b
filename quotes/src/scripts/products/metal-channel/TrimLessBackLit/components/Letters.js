import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import ColorsDropdown from '../../../../utils/ColorsDropdown';
import convert_json from '../../../../utils/ConvertJson';

import { getLetterPricingTableByTitle } from '../../../../utils/Pricing';
import {
	lightingPackagedOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import {
	acrylicRevealOptions,
	depthOptions,
	finishingOptions,
	ledLightColors,
	mountingDefaultOptions,
} from '../../metalChannelOptions';

import { metalFinishOptions } from '../../../metal/metalOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	LIGHTING_INDOOR,
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

	const [color, setColor] = useState(
		item.faceReturnColor ?? { name: '', color: '' }
	);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.trimLessWaterproof ?? '');

	const [letterPricing, setLetterPricing] = useState([]);

	const [depth, setDepth] = useState(item.depth ?? '');
	const [acrylicReveal, setAcrylicReveal] = useState(item.acrylicReveal);

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

	const [selectedFinishing, setSelectedFinishing] = useState(
		item.backLitFinishing
	);

	const [metalFinish, setMetalFinish] = useState(item.backLitMetalFinish);

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight ?? ''
	);

	const [lightingOptions, setLightingOptions] = useState(
		lightingPackagedOptions
	);

	const [includedItems, setIncludedItems] = useState('');

	const [letterPricingTables, setLetterPricingTables] = useState('');

	useEffect(() => {
		async function fetchLetterPricing() {
			try {
				const response = await fetch(
					NovaQuote.letters_multi_pricing_api + item.product
				);
				const data = await response.json();
				setLetterPricingTables(data);
			} catch (error) {
				console.error('Error fetching letter pricing:', error);
			}
		}

		fetchLetterPricing();
	}, []);

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [lettersHeight, setLettersHeight] = useState({
		min: 5,
		max: 40,
	});

	const [studLength, setStudLength] = useState(item.studLength ?? '');

	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [mounting, setMounting] = useState(item.mounting ?? '');

	const [ledLightColor, setLedLightColor] = useState(item.ledLightColor);

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const colorRef = useRef(null);
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

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters,
					comments,
					depth,
					font,
					trimLessWaterproof: waterproof,
					includedItems,
					faceReturnColor: color,
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
					customColor,
					ledLightColor,
					mounting,
					studLength,
					backLitFinishing: selectedFinishing,
					spacerStandoffDistance,
					backLitMetalFinish: metalFinish,
					acrylicReveal: acrylicReveal,
					sets,
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

	const handleOnChangeincludedItems = (e) => setIncludedItems(e.target.value);

	const handleOnChangeAcrylicReveal = (e) => {
		const target = e.target.value;
		setAcrylicReveal(() => target);
	};

	const handleOnChangeLedLight = (e) => setLedLightColor(e.target.value);

	const handleChangeFinishing = (e) => {
		const target = e.target.value;
		if (target === 'Metal') {
			setColor({ name: '', color: '' });
		} else {
			setColor({ name: 'Black', color: '#000000' });
			setMetalFinish('');
		}
		setSelectedFinishing(e.target.value);
	};

	const handelMetalFinishChange = (e) => {
		setMetalFinish(e.target.value);
	};

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeDepth = (e) => {
		const target = e.target.value;
		const selected = depthOptions.filter((option) => option.value === target);

		setDepth(() => selected[0]);

		if (parseFloat(target) === 5 && parseInt(selectedLetterHeight) < 6) {
			setSelectedLetterHeight('');
		}
		if (
			parseFloat(target) < 6 &&
			parseFloat(target) > 1.5 &&
			parseInt(selectedLetterHeight) < 7
		) {
			setSelectedLetterHeight('');
		}
		if (parseFloat(target) === 6 && parseInt(selectedLetterHeight) < 11) {
			setSelectedLetterHeight('');
		}
	};

	const handleOnChangeLetterHeight = (e) => {
		setSelectedLetterHeight(e.target.value);
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
		if (font == 'Custom font') {
			if (fontFileUrl.length === 0 && fileUrls.length === 0) {
				missingFields.push('Upload your custom font or files.');
			}
		}
		if (!depth) missingFields.push('Select Metal Depth');
		if (!selectedLetterHeight) missingFields.push('Select Letter Height');

		if (!selectedFinishing) missingFields.push('Select Finishing');

		if (selectedFinishing === 'Painted') {
			if (!color.name) missingFields.push('Select Face & Return Color');

			if (color?.name === 'Custom Color' && !customColor) {
				missingFields.push('Add the Pantone color code of your custom color.');
			}
		}

		if (selectedFinishing === 'Metal') {
			if (!metalFinish) missingFields.push('Select Metal Finish');
		}

		if (!waterproof) missingFields.push('Select Environment');

		if (!includedItems) missingFields.push('Select Included Items');

		if (!mounting) missingFields.push('Select Mounting');

		if (mounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (mounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (!ledLightColor) missingFields.push('Select LED Light Color');

		if (!sets) missingFields.push('Select Quantity');

		if (!acrylicReveal) {
			missingFields.push('Select Acrylic Reveal');
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
		letters,
		depth,
		comments,
		font,
		waterproof,
		includedItems,
		color,
		usdPrice,
		cadPrice,
		usdSinglePrice,
		cadSinglePrice,
		selectedLetterHeight,
		ledLightColor,
		fileUrls,
		fileNames,
		files,
		filePaths,
		customColor,
		fontFileUrl,
		fontFileName,
		fontFilePath,
		fontFile,
		mounting,
		studLength,
		spacerStandoffDistance,
		selectedFinishing,
		metalFinish,
		acrylicReveal,
		sets,
	]);

	useEffect(() => {
		if (depth?.value && letterPricingTables) {
			const table = convert_json(
				getLetterPricingTableByTitle(depth?.depth, letterPricingTables)
			);
			setLetterPricing(() => table);

			if (depth.value == 8) {
				if (selectedLetterHeight < 12) {
					setSelectedLetterHeight('');
				}
				setLettersHeight(() => ({
					min: 12,
					max: 40,
				}));
			} else {
				setLettersHeight(() => ({
					min: 5,
					max: 40,
				}));
			}
		}
	}, [depth, selectedLetterHeight, letterPricingTables]);

	const computePricing = () => {
		if (
			!letterPricingTables ||
			!letterPricing ||
			!selectedLetterHeight ||
			!depth ||
			!waterproof ||
			!acrylicReveal
		) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		const pricingDetail = letterPricing[selectedLetterHeight - 5];

		if (!pricingDetail) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		let mm = 0;
		if (acrylicReveal == '1/5"') {
			mm = '5mm';
		} else if (acrylicReveal == '2/5"') {
			mm = '10mm';
		} else if (acrylicReveal == '3/5"') {
			mm = '15mm';
		} else {
			mm = 0;
		}

		const baseLetterPrice = pricingDetail[mm];

		let tempTotal = 0;
		const lettersArray = letters.trim().split('');
		const noLowerCase = NovaQuote.no_lowercase.includes(font);

		lettersArray.forEach((letter) => {
			tempTotal += calculateLetterPrice(letter, baseLetterPrice, noLowerCase);
		});

		if (waterproof) {
			tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.03;
		}

		if (metalFinish && metalFinish.includes('Polished')) {
			tempTotal *= 1.3;
		}

		if (metalFinish && metalFinish.includes('Electroplated')) {
			tempTotal *= 1.2;
		}

		if (mounting === STUD_WITH_SPACER) {
			let spacer = spacerPricing(tempTotal);
			spacer = parseFloat(spacer.toFixed(2));
			tempTotal += spacer;
		}

		/** minimum price is 89 usd */
		tempTotal = tempTotal < 89 ? 89 : tempTotal;

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
		letters,
		waterproof,
		lettersHeight,
		letterPricing,
		depth,
		acrylicReveal,
		metalFinish,
		sets,
		font,
		mounting,
		letterPricingTables,
	]);

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
		if (waterproof) {
			if (waterproof === INDOOR_NOT_WATERPROOF) {
				setIncludedItems(LIGHTING_INDOOR);
				setLightingOptions(
					lightingPackagedOptions.filter(
						(option) => option.value === LIGHTING_INDOOR
					)
				);
			} else {
				setIncludedItems(
					'Low Voltage LED Driver, 10ft open wires, 1:1 blueprint'
				);
				setLightingOptions(
					lightingPackagedOptions.filter(
						(option) => option.value !== LIGHTING_INDOOR
					)
				);
			}
		} else {
			setLightingOptions(lightingPackagedOptions);
		}
	}, [waterproof]);

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
							color: color?.color || '#000000',
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
					title="Letter Height"
					onChange={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={selectedLetterHeight}
				/>

				<Dropdown
					title="Finishing"
					onChange={handleChangeFinishing}
					options={finishingOptions.map((finishing) => (
						<option
							value={finishing.value}
							selected={finishing.value === selectedFinishing}
						>
							{finishing.value}
						</option>
					))}
					value={selectedFinishing}
				/>

				{selectedFinishing === 'Metal' && (
					<Dropdown
						title="Metal Finish"
						onChange={handelMetalFinishChange}
						options={metalFinishOptions.map((finish) => (
							<option
								value={finish.option}
								selected={finish.option === metalFinish}
							>
								{finish.option}
							</option>
						))}
						value={metalFinish}
					/>
				)}

				{selectedFinishing === 'Painted' && (
					<>
						<ColorsDropdown
							title="Face & Return Color"
							ref={colorRef}
							colorName={color?.name}
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
					</>
				)}

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
					title="Acrylic Reveal"
					onChange={handleOnChangeAcrylicReveal}
					options={acrylicRevealOptions.map((option) => (
						<option value={option} selected={option == acrylicReveal}>
							{option}
						</option>
					))}
					value={acrylicReveal}
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
				)}

				{mounting === STUD_WITH_SPACER && (
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
					title="Included Items"
					onChange={handleOnChangeincludedItems}
					options={lightingOptions.map((option) => (
						<option
							value={option.value}
							selected={option.value == includedItems}
						>
							{option.value}
						</option>
					))}
					value={includedItems}
				/>

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
}
