import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import FontsDropdown from './FontsDropdown';
import { NovaContext } from './NovaQuote';
import UploadFile from './UploadFile';
import useOutsideClick from './utils/ClickOutside';
import convert_json from './utils/ConvertJson';

const NovaOptions = NovaQuote.quote_options;
const lowerCasePricing = parseFloat(
	NovaOptions.lowercase_pricing ? NovaOptions.lowercase_pricing : 1
);
const smallPunctuations = parseFloat(
	NovaOptions.small_punctuations_pricing
		? NovaOptions.small_punctuations_pricing
		: 1
);
//const AcrylicLetterPricing = JSON.parse(NovaOptions.letter_x_logo_pricing);

export default function Letters({ item }) {
	const { signage, setSignage } = useContext(NovaContext);
	const [letters, setLetters] = useState(item.letters);
	const [comments, setComments] = useState(item.comments);
	const [font, setFont] = useState(item.font);
	const [color, setColor] = useState(item.color);
	const [isLoading, setIsLoading] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const thicknessOptions = NovaOptions.acrylic_thickness_options;
	const [fileUrl, setFileUrl] = useState(item.file);
	const [fileName, setFileName] = useState(item.fileName);
	const [letterHeightOptions, setLetterHeightOptions] = useState([]);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [mountingOptions, setMountingOptions] = useState(
		NovaOptions.mounting_options
	);

	const [lettersHeight, setLettersHeight] = useState(
		NovaOptions.letters_height
	);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);

	const colorRef = useRef(null);

	const colorOptions = NovaOptions.colors;
	const finishingOptions = NovaOptions.finishing_options;
	const letterPricing =
		NovaOptions.letter_height_x_logo_pricing.length > 0
			? convert_json(NovaOptions.letter_height_x_logo_pricing)
			: [];
	let perLetterPrice = 0;

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
					mounting: selectedMounting,
					waterproof: waterproof,
					color: color,
					letterHeight: selectedLetterHeight,
					usdPrice: usdPrice,
					file: fileUrl,
					fileName: fileName,
					finishing: selectedFinishing,
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

	const handleonChangeMount = (e) => setSelectedMounting(e.target.value);

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = thicknessOptions.filter(
			(option) => option.value === target
		);
		console.log(selected[0]);
		setSelectedThickness(() => selected[0]);
		target > 9 ? setSelectedLetterHeight(2) : setSelectedLetterHeight(1);
	};

	const handleOnChangeLetterHeight = (e) => {
		console.log(e.target.value);
		setSelectedLetterHeight(e.target.value);
	};

	const handleChangeFinishing = (e) => {
		setSelectedFinishing(e.target.value);
	};

	useEffect(() => {
		// Log to ensure we're getting the expected value

		let newMountingOptions;
		if (selectedThickness.value === '3') {
			if (selectedMounting === 'Flush stud') {
				setSelectedMounting(
					() => NovaOptions.mounting_options[0].mounting_option
				);
			}

			newMountingOptions = NovaOptions.mounting_options.filter(
				(option) => option.mounting_option !== 'Flush stud'
			);
		} else {
			if (selectedMounting === 'Stud with Block') {
				setSelectedMounting(
					() => NovaOptions.mounting_options[0].mounting_option
				);
			}
			// Exclude 'Stud with Block' option
			newMountingOptions = NovaOptions.mounting_options.filter(
				(option) => option.mounting_option !== 'Stud with Block'
			);
		}

		if (waterproof === 'Outdoor') {
			if (selectedMounting === 'Double sided tape') {
				setSelectedMounting(
					() => NovaOptions.mounting_options[0].mounting_option
				);
			}

			newMountingOptions = newMountingOptions.filter(
				(option) => option.mounting_option !== 'Double sided tape'
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
		selectedLetterHeight,
		fileUrl,
		fileName,
		selectedFinishing,
	]);

	useEffect(() => {
		const newHeightOptions = letterPricing.filter((item) => {
			const value = item[selectedThickness.value];
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

	useEffect(() => {
		if (letterPricing.length > 0) {
			const pricingDetail = letterPricing[selectedLetterHeight - 1];
			const baseLetterPrice = pricingDetail[selectedThickness.value];

			let totalLetterPrice = 0;
			const lettersArray = letters.trim().split('');

			lettersArray.forEach((letter) => {
				let letterPrice = baseLetterPrice;

				if (letter.match(/[a-z]/)) {
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
				letterPrice *= waterproof === 'Indoor' ? 1 : 1.1;
				letterPrice *= selectedFinishing === 'Gloss' ? 1.1 : 1;

				totalLetterPrice += letterPrice;
			});

			setUsdPrice(totalLetterPrice.toFixed(2));
		}
	}, [
		selectedLetterHeight,
		selectedThickness,
		selectedFinishing,
		letters,
		waterproof,
		lettersHeight,
	]);

	useOutsideClick(colorRef, () => {
		setOpenColor(false);
	});

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
							color: color.color,
							textShadow: '0px 0px 1px rgba(0, 0, 0, 1)',
						}}
					>
						{letters}
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

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				<Dropdown
					title="Thickness"
					value={selectedThickness.value}
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
					title="Letters Height"
					onChange={handleOnChangeLetterHeight}
					onBlur={handleOnChangeLetterHeight}
					options={letterHeightOptions}
					value={item.letterHeight}
				/>

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Color
					</label>
					<div
						className="flex items-center select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer"
						onClick={() => setOpenColor((prev) => !prev)}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{ backgroundColor: color.color }}
						></span>
						{color.name === '' ? 'SELECT COLOR' : color.name}
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

				<FontsDropdown
					font={item.font}
					fonts={NovaOptions.fonts}
					handleSelectFont={handleSelectFont}
				/>

				<Dropdown
					title="Waterproof Option"
					onChange={handleOnChangeWaterproof}
					options={NovaOptions.waterproof_options.map((option) => (
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
					onChange={handleonChangeMount}
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
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
					file={item.file}
					fileUrl={fileUrl}
					isLoading={isLoading}
					setFileUrl={setFileUrl}
					setFileName={setFileName}
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
