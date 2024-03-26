import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFile from '../../../../UploadFile';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import {
	metalFinishOptions,
	metalInstallationOptions,
	metalThicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import { QuoteContext } from '../LaserCutAluminum';

const NovaOptions = NovaQuote.quote_options;
const exchangeRate = 1.3;

const lowerCasePricing = parseFloat(
	NovaQuote.lowercase_pricing ? NovaQuote.lowercase_pricing : 1
);
const smallPunctuations = parseFloat(
	NovaQuote.small_punctuations_pricing
		? NovaQuote.small_punctuations_pricing
		: 1
);
//const AcrylicLetterPricing = JSON.parse(NovaOptions.letter_x_logo_pricing);

export default function Letters({ item }) {
	const { signage, setSignage, setMissing, tempFolder } =
		useContext(QuoteContext);
	const [letters, setLetters] = useState(item.letters);
	const [comments, setComments] = useState(item.comments);
	const [font, setFont] = useState(item.font);
	const [openFont, setOpenFont] = useState(false);
	const [color, setColor] = useState(item.color);
	const [isLoading, setIsLoading] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);

	const [fileName, setFileName] = useState(item.fileName);
	const [fileUrl, setFileUrl] = useState(item.fileUrl);
	const [filePath, setFilePath] = useState(item.filePath);
	const [file, setFile] = useState(item.file);

	const [fontFileName, setFontFileName] = useState(item.fontFileName);
	const [fontFileUrl, setFontFileUrl] = useState(item.fontFileUrl);
	const [fontFilePath, setFontFilePath] = useState(item.fontFilePath);
	const [fontFile, setFontFile] = useState(item.fontFile);

	const [letterHeightOptions, setLetterHeightOptions] = useState([]);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);
	const [customFont, setCustomFont] = useState(item.customFont);
	const [customColor, setCustomColor] = useState(item.customColor);

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);

	const [lettersHeight, setLettersHeight] = useState(
		NovaOptions.letters_height
	);
	const [installation, setInstallation] = useState(item.installation);

	const colorRef = useRef(null);
	const fontRef = useRef(null);

	const letterPricing =
		NovaQuote.letter_pricing_table?.pricing_table.length > 0
			? convert_json(NovaQuote.letter_pricing_table.pricing_table)
			: [];

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

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters: letters,
					comments: comments,
					font: font,
					thickness: selectedThickness,
					installation: installation,
					waterproof: waterproof,
					color: color,
					letterHeight: selectedLetterHeight,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					file: file,
					fileName: fileName,
					filePath: filePath,
					fileUrl: fileUrl,
					fontFile: fontFile,
					fontFileName: fontFileName,
					fontFilePath: fontFilePath,
					fontFileUrl: fontFileUrl,
					finishing: selectedFinishing,
					customFont: customFont,
					customColor: customColor,
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

	const handleOnChangeInstallation = (e) => setInstallation(e.target.value);

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

	useEffect(() => {
		if (
			letterPricing.length > 0 &&
			selectedLetterHeight &&
			selectedThickness &&
			waterproof
		) {
			const pricingDetail = letterPricing[selectedLetterHeight - 1];
			const baseLetterPrice = pricingDetail[selectedThickness.value];

			let totalLetterPrice = 0;
			const lettersArray = letters.trim().split('');

			lettersArray.forEach((letter) => {
				let letterPrice = baseLetterPrice;

				if (letter === ' ') {
					// If the character is a space, set the price to 0 and skip further checks
					letterPrice = 0;
				} else if (letter.match(/[a-z]/)) {
					// Check for lowercase letter
					letterPrice *= lowerCasePricing; // 80% of the base price
				} else if (letter.match(/[A-Z]/)) {
					// Check for uppercase letter
					// Uppercase letters use 100% of base price, so no change needed
				} else if (letter.match(/[`~"*,.\-']/)) {
					// Check for small punctuation marks
					letterPrice *= smallPunctuations; // 30% of the base price
				} else if (letter.match(/[^a-zA-Z]/)) {
					// Check for symbol (not a letter or small punctuation)
					// Symbols use 100% of base price, so no change needed
				}

				// Adjusting for waterproof and finishing
				letterPrice *= waterproof === 'Indoor' ? 1 : 1.05;
				letterPrice *= selectedFinishing === 'Gloss' ? 1.1 : 1;

				totalLetterPrice += letterPrice;
			});

			setUsdPrice(totalLetterPrice.toFixed(2));
			setCadPrice((totalLetterPrice * parseFloat(exchangeRate)).toFixed(2));
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
		lettersHeight,
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

	useEffect(() => {
		updateSignage();
	}, [
		letters,
		comments,
		font,
		selectedThickness,
		installation,
		waterproof,
		color,
		usdPrice,
		cadPrice,
		selectedLetterHeight,
		fileUrl,
		fileName,
		file,
		fontFileUrl,
		fontFileName,
		fontFilePath,
		fontFile,
		selectedFinishing,
		customFont,
		customColor,
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
		if (!selectedFinishing) missingFields.push('Select Finish Option');
		if (selectedFinishing === 'Painted') {
			if (!color.name) missingFields.push('Select Color');
		}
		if (
			selectedFinishing === 'Painted' &&
			color?.name === 'Custom Color' &&
			!customColor
		) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!waterproof) missingFields.push('Select Waterproof');
		if (!installation) missingFields.push('Select Installation');

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
		installation,
		waterproof,
		selectedLetterHeight,
		fileUrl,
		fileName,
		file,
		fontFileUrl,
		selectedFinishing,
		customFont,
		customColor,
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
		setOpenColor(false);
		setOpenFont(false);
	});

	useEffect(() => {
		color != 'Custom Color' && setCustomColor('');
		font != 'Custom font' && setFontFileUrl('');
	}, [color, font]);

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
							fontFamily: font,
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
					Letters
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
					fonts={NovaOptions.fonts}
					fontRef={fontRef}
					openFont={openFont}
					setOpenFont={setOpenFont}
					handleSelectFont={handleSelectFont}
				/>

				{font == 'Custom font' && (
					<UploadFont
						setFontFilePath={setFontFilePath}
						setFontFile={setFontFile}
						fontFilePath={fontFilePath}
						fontFileUrl={fontFileUrl}
						isLoading={isLoading}
						setFontFileUrl={setFontFileUrl}
						setFontFileName={setFontFileName}
						tempFolder={tempFolder}
					/>
				)}

				<Dropdown
					title="Thickness"
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
					title="Letter Height"
					onChange={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={item.letterHeight}
				/>

				<Dropdown
					title="Finish Option"
					onChange={handleChangeFinishing}
					options={metalFinishOptions.map((finishing) => (
						<option
							value={finishing.option}
							selected={finishing.option === item.finishing}
						>
							{finishing.option}
						</option>
					))}
					value={item.finishing}
				/>

				{selectedFinishing === 'Painted' && (
					<div className="px-[1px] relative" ref={colorRef}>
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							Color
						</label>
						<div
							className={`flex px-2 items-center select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
								color.name ? 'text-black' : 'text-[#dddddd]'
							}`}
							onClick={() => setOpenColor((prev) => !prev)}
						>
							<span
								className="rounded-full w-[18px] h-[18px] border mr-2"
								style={{ backgroundColor: color.color }}
							></span>
							{color.name === '' ? 'CHOOSE OPTION' : color.name}
						</div>
						{openColor && (
							<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
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
												style={{ backgroundColor: color.color }}
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
							selected={option.option == item.waterproof}
						>
							{option.option}
						</option>
					))}
					value={item.waterproof}
				/>

				<Dropdown
					title="Installation Option"
					onChange={handleOnChangeInstallation}
					options={metalInstallationOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option === installation}
						>
							{option.option}
						</option>
					))}
					value={item.installation}
				/>
			</div>

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

				<div className="px-[1px] col-span-3">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						COMMENTS
					</label>
					<input
						className="w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400"
						type="text"
						value={comments}
						onChange={handleComments}
						placeholder="ADD COMMENTS"
					/>
				</div>

				<UploadFile
					setFilePath={setFilePath}
					setFile={setFile}
					filePath={filePath}
					fileUrl={fileUrl}
					isLoading={isLoading}
					setFileUrl={setFileUrl}
					setFileName={setFileName}
					tempFolder={tempFolder}
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
