import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import FontsDropdown from '../../../../FontsDropdown';
import UploadFiles from '../../../../UploadFiles';
import UploadFont from '../../../../UploadFont';
import useOutsideClick from '../../../../utils/ClickOutside';
import {
	colorOptions,
	translucentGraphicFilms,
	whiteOptions,
} from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import {
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import {
	aluminumResinDepthOptions,
	ledLightColors,
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

const lowerCasePricing = parseFloat(
	NovaQuote.lowercase_pricing ? NovaQuote.lowercase_pricing : 1
);
const smallPunctuations = parseFloat(
	NovaQuote.small_punctuations_pricing
		? NovaQuote.small_punctuations_pricing
		: 1
);

export function Letters({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [letters, setLetters] = useState(item.letters ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [font, setFont] = useState(item.font ?? '');
	const [openFont, setOpenFont] = useState(false);

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

	const [lettersHeight, setLettersHeight] = useState({
		min: 5,
		max: 40,
	});

	const [openAcrylicCover, setOpenAcrylicCover] = useState(false);
	const [studLength, setStudLength] = useState(item.studLength ?? '');

	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [vinylWhite, setVinylWhite] = useState(
		item.vinylWhite ?? { name: '', color: '', code: '' }
	);
	const [frontAcrylicCover, setFrontAcrylicCover] = useState(
		item.frontAcrylicCover ?? 'White'
	);

	const [mounting, setMounting] = useState(item.mounting ?? '');

	const [ledLightColor, setLedLightColor] = useState(
		item.ledLightColor ?? '6500K White'
	);

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const [depthOptions, setDepthOptions] = useState(aluminumResinDepthOptions);

	const colorRef = useRef(null);
	const fontRef = useRef(null);
	const acrylicColorRef = useRef(null);

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

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters,
					comments,
					depth,
					font,
					waterproof,
					returnColor: color,
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
					customColor,
					ledLightColor,
					mounting,
					studLength,
					spacerStandoffDistance,
					frontAcrylicCover,
					vinylWhite,
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

	const handleOnChangeWaterproof = (e) => {
		const target = e.target.value;
		setWaterproof(() => target);
	};

	useEffect(() => {
		if (!waterproof) return;

		if (waterproof !== INDOOR_NOT_WATERPROOF) {
			if (parseInt(depth?.value) === 3) {
				setDepth('');
			}

			if (parseInt(selectedLetterHeight) === 5) {
				setSelectedLetterHeight('');
			}

			const newDepthOptions = [
				{
					depth: '2"',
					value: '5',
				},
				{
					depth: '3.2"',
					value: '8',
				},
			];

			setDepthOptions((prev) => {
				if (JSON.stringify(prev) !== JSON.stringify(newDepthOptions)) {
					return newDepthOptions;
				}
				return prev;
			});

			if (lettersHeight.min === 5) {
				setLettersHeight((prev) => ({ ...prev, min: 6 }));
			}
		} else {
			setDepthOptions((prev) => {
				if (
					JSON.stringify(prev) !== JSON.stringify(aluminumResinDepthOptions)
				) {
					return aluminumResinDepthOptions;
				}
				return prev;
			});

			if (lettersHeight.min === 6 && depth?.depth === '3.5') {
				setLettersHeight((prev) => ({ ...prev, min: 5 }));
			}
		}
	}, [
		waterproof,
		lettersHeight,
		depth,
		selectedLetterHeight,
		letterHeightOptions,
	]);

	const handleOnChangeLedLight = (e) => setLedLightColor(e.target.value);

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

	const handleOnChangeDepth = (e) => {
		const target = e.target.value;
		const selected = depthOptions.filter((option) => option.value === target);

		setDepth(() => selected[0]);
	};

	const handleOnChangeLetterHeight = (e) => {
		setSelectedLetterHeight(e.target.value);
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
	}, [lettersHeight]);

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
		if (!depth) missingFields.push('Select Metal Depth');
		if (!selectedLetterHeight) missingFields.push('Select Letter Height');

		if (!color?.name) missingFields.push('Select Color');
		if (color?.name === 'Custom Color' && !customColor) {
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
		if (!ledLightColor) missingFields.push('Select LED Light Color');
		if (!frontAcrylicCover) missingFields.push('Select Front Acrylic Cover');

		if (frontAcrylicCover === '3M Vinyl') {
			if (!vinylWhite?.name) missingFields.push('Select 3M 3630 Vinyl');
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
		updateSignage();
		checkAndAddMissingFields();
	}, [
		letters,
		depth,
		comments,
		font,
		waterproof,
		color,
		frontAcrylicCover,
		usdPrice,
		cadPrice,
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
		frontAcrylicCover,
		vinylWhite,
		sets,
	]);

	useEffect(() => {
		if (depth?.value) {
			const newHeightOptions = letterPricing?.filter((item) => {
				const value = item[depth?.value];
				return (
					value !== '' &&
					value !== null &&
					value !== undefined &&
					value !== false &&
					!isNaN(value)
				);
			});

			if (newHeightOptions.length > 0) {
				if (parseInt(selectedLetterHeight) < newHeightOptions[0].Depth) {
					setSelectedLetterHeight('');
				}

				setLettersHeight(() => ({
					min: newHeightOptions[0].Depth,
					max: newHeightOptions[newHeightOptions.length - 1].Depth,
				}));
			}
		}
	}, [depth]);

	if (frontAcrylicCover === '3M Vinyl') {
		useOutsideClick([colorRef, fontRef, acrylicColorRef], () => {
			if (!openColor && !openFont && !openAcrylicCover) return;
			setOpenColor(false);
			setOpenFont(false);
			setOpenAcrylicCover(false);
		});
	} else {
		useOutsideClick([colorRef, fontRef], () => {
			if (!openColor && !openFont) return;
			setOpenColor(false);
			setOpenFont(false);
		});
	}

	useEffect(() => {
		if (letterPricing.length > 0 && selectedLetterHeight && depth) {
			const pricingDetail = letterPricing[selectedLetterHeight - 5];
			const baseLetterPrice = pricingDetail[depth.value];

			let totalLetterPrice = 0;
			const lettersArray = letters.trim().split('');
			const noLowerCase = NovaQuote.no_lowercase.includes(font);

			if (
				lettersArray.length > 0 &&
				selectedLetterHeight &&
				waterproof &&
				depth
			) {
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
					letterPrice *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.02;

					letterPrice *= vinylWhite?.name ? 1.1 : 1;

					totalLetterPrice += letterPrice;
				});

				if (mounting === STUD_WITH_SPACER) {
					let spacer = spacerPricing(totalLetterPrice);
					spacer = parseFloat(spacer.toFixed(2));

					totalLetterPrice += spacer;
				}

				totalLetterPrice *= sets;

				setUsdPrice(parseFloat(totalLetterPrice).toFixed(2));
				setCadPrice((totalLetterPrice * parseFloat(EXCHANGE_RATE)).toFixed(2));
			} else {
				setUsdPrice(0);
				setCadPrice(0);
			}
		}
	}, [
		selectedLetterHeight,
		letters,
		waterproof,
		lettersHeight,
		vinylWhite,
		mounting,
		sets,
		font,
	]);

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
						setOpenAcrylicCover(false);
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

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Return Color
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							color?.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => {
							setOpenColor((prev) => !prev);
							setOpenFont(false);
							setOpenAcrylicCover(false);
						}}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									color?.name == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: color?.color,
							}}
						></span>
						{color?.name === '' ? 'CHOOSE OPTION' : color?.name}
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
													color?.name == 'Custom Color'
														? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
														: color?.color,
											}}
										></span>
										{color?.name}
									</div>
								);
							})}
						</div>
					)}
				</div>

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
					<div className="px-[1px] relative" ref={acrylicColorRef}>
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							3M VINYL
						</label>
						<div
							className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
								vinylWhite.name ? 'text-black' : 'text-[#dddddd]'
							}`}
							onClick={() => {
								setOpenAcrylicCover((prev) => !prev);
								setOpenColor(false);
								setOpenFont(false);
							}}
						>
							<span
								className="rounded-full w-[18px] h-[18px] border mr-2"
								style={{ backgroundColor: vinylWhite.color }}
							></span>
							{vinylWhite.name === '' ? 'CHOOSE OPTION' : vinylWhite.name}
						</div>
						{openAcrylicCover && (
							<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
								{translucentGraphicFilms.map((color) => {
									return (
										<div
											className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
											onClick={() => {
												setVinylWhite(color);
												setOpenAcrylicCover(false);
											}}
										>
											<span
												className="w-[18px] h-[18px] inline-block rounded-full border"
												style={{
													background:
														color?.name == 'Custom Color'
															? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
															: color?.color,
												}}
											></span>
											{color?.name}
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}

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

				{mounting === STUD_WITH_SPACER && (
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

				{mounting === STUD_MOUNT && (
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
}
