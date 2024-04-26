import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import convert_json from '../../../../utils/ConvertJson';
import {
	mountingDefaultOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import { colorOptions } from '../ColorOptions';
import { QuoteContext } from '../LaserCutAcrylic';

const NovaOptions = NovaQuote.quote_options;
const NovaSingleOptions = NovaQuote.single_quote_options;
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
	const {
		signage,
		setSignage,
		setMissing,
		tempFolder,
		isLoading,
		setIsLoading,
	} = useContext(QuoteContext);
	const [letters, setLetters] = useState(item.letters);
	const [comments, setComments] = useState(item.comments);
	const [font, setFont] = useState(item.font);
	const [openFont, setOpenFont] = useState(false);
	const [color, setColor] = useState(item.color);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [selectedThickness, setSelectedThickness] = useState(
		item.acrylicThickness
	);
	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);

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
	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);

	const [lettersHeight, setLettersHeight] = useState(
		NovaOptions.letters_height
	);

	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [studLength, setStudLength] = useState(item.studLength);
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance
	);

	const [sets, setSets] = useState(item.sets);

	const colorRef = useRef(null);
	const fontRef = useRef(null);

	const finishingOptions = NovaSingleOptions.finishing_options;
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
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters: letters,
					comments: comments,
					font: font,
					acrylicThickness: selectedThickness,
					mounting: selectedMounting,
					waterproof: waterproof,
					color: color,
					letterHeight: selectedLetterHeight,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					files: files,
					fileNames: fileNames,
					filePaths: filePaths,
					fileUrls: fileUrls,
					fontFile: fontFile,
					fontFileName: fontFileName,
					fontFilePath: fontFilePath,
					fontFileUrl: fontFileUrl,
					finishing: selectedFinishing,
					customFont: customFont,
					customColor: customColor,
					sets: sets,
					studLength: studLength,
					spacerStandoffDistance: spacerStandoffDistance,
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

	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const handleOnChangeMount = (e) => {
		const target = e.target.value;
		setSelectedMounting(target);

		if (target === 'Stud with spacer' || target === 'Stud Mount') {
			if (target === 'Stud Mount') {
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
			const noLowerCase = NovaQuote.no_lowercase.includes(font);

			lettersArray.forEach((letter) => {
				let letterPrice = baseLetterPrice;

				if (letter === ' ') {
					// If the character is a space, set the price to 0 and skip further checks
					letterPrice = 0;
				} else if (letter.match(/[a-z]/)) {
					// Check for lowercase letter
					letterPrice *= noLowerCase ? 1 : lowerCasePricing; // 80% of the base price
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
				letterPrice *= waterproof === 'Indoor' ? 1 : 1.1;
				letterPrice *= selectedFinishing === 'Gloss' ? 1.1 : 1;

				if (color?.name === 'Clear') {
					letterPrice *= 0.9;
				}
				if (color?.name === 'Frosted Clear') {
					letterPrice *= 0.95;
				}

				totalLetterPrice += letterPrice;
			});

			if (selectedMounting === 'Stud with spacer') {
				let spacer =
					totalLetterPrice * 0.03 > 35 ? 35 : totalLetterPrice * 0.03;
				spacer = parseFloat(spacer.toFixed(2));

				totalLetterPrice += spacer;
			}

			totalLetterPrice *= sets;

			setUsdPrice(parseFloat(totalLetterPrice).toFixed(2));
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
		color,
		sets,
		selectedMounting,
	]);

	useEffect(() => {
		// Log to ensure we're getting the expected value

		let newMountingOptions;
		if (selectedThickness?.value === '3') {
			if (selectedMounting === 'Flush stud') {
				setSelectedMounting('');
			}

			newMountingOptions = mountingDefaultOptions.filter(
				(option) => option.mounting_option !== 'Flush stud'
			);
		} else {
			if (selectedMounting === 'Stud with Block') {
				setSelectedMounting('');
			}
			// Exclude 'Stud with Block' option
			newMountingOptions = mountingDefaultOptions.filter(
				(option) => option.mounting_option !== 'Stud with Block'
			);
		}

		if (waterproof === 'Outdoor') {
			if (selectedMounting === 'Double-sided tape') {
				setSelectedMounting('');
			}

			newMountingOptions = newMountingOptions.filter(
				(option) => option.mounting_option !== 'Double-sided tape'
			);
		}

		// Update the state
		setMountingOptions(newMountingOptions);
	}, [selectedThickness, waterproof]);

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
		if (!waterproof) missingFields.push('Select Waterproof');
		if (!selectedMounting) missingFields.push('Select Mounting');

		if (selectedMounting === 'Stud Mount') {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (selectedMounting === 'Stud with spacer') {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select STANDOFF SPACE');
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
					fontRef={fontRef}
					openFont={openFont}
					setOpenFont={setOpenFont}
					setOpenColor={setOpenColor}
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
					value={item.letterHeight}
				/>

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Color
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							color.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => {
							setOpenColor((prev) => !prev);
							setOpenFont(false);
						}}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									color.name == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: color.color,
							}}
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
					title="Finishing Options"
					onChange={handleChangeFinishing}
					options={finishingOptions.map((finishing) => (
						<option
							value={finishing.name}
							selected={finishing.name === item.finishing}
						>
							{finishing.name}
						</option>
					))}
					value={item.finishing}
				/>

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
					value={item.mounting}
				/>

				{selectedMounting === 'Stud with spacer' && (
					<>
						<Dropdown
							title="Stud Length"
							onChange={handleonChangeStudLength}
							options={studLengthOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == item.studLength}
								>
									{option.value}
								</option>
							))}
							value={item.studLength}
						/>
						<Dropdown
							title="STANDOFF SPACE"
							onChange={handleonChangeSpacerDistance}
							options={spacerStandoffOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == item.spacerStandoffDistance}
								>
									{option.value}
								</option>
							))}
							value={item.spacerStandoffDistance}
						/>
					</>
				)}

				{selectedMounting === 'Stud Mount' && (
					<>
						<Dropdown
							title="Stud Length"
							onChange={handleonChangeStudLength}
							options={studLengthOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == item.studLength}
								>
									{option.value}
								</option>
							))}
							value={item.studLength}
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

			{selectedMounting === 'Stud with spacer' && (
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
					setFilePaths={setFilePaths}
					setFiles={setFiles}
					filePaths={filePaths}
					fileUrls={fileUrls}
					fileNames={fileNames}
					setFileUrls={setFileUrls}
					setFileNames={setFileNames}
					tempFolder={tempFolder}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
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
