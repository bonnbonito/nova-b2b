import React, { useContext, useEffect, useRef, useState } from 'react';
import { AcrylicContext } from './Acrylic';
import Dropdown from './Dropdown';
import useOutsideClick from './utils/ClickOutside';
import convert_json from './utils/ConvertJson';

const AcrylicOptions = AcrylicQuote.quote_options;
//const AcrylicLetterPricing = JSON.parse(AcrylicOptions.letter_x_logo_pricing);

export default function Letters({ item }) {
	const { signage, setSignage } = useContext(AcrylicContext);
	const [letters, setLetters] = useState(item.letters);
	const [comments, setComments] = useState(item.comments);
	const [font, setFont] = useState(item.font);
	const [color, setColor] = useState(item.color);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const thicknessOptions = AcrylicOptions.acrylic_thickness_options;
	const [letterHeightOptions, setLetterHeightOptions] = useState([]);

	const [selectedLetterHeight, setSelectedLetterHeight] = useState(
		item.letterHeight
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [mountingOptions, setMountingOptions] = useState(
		AcrylicOptions.mounting_options
	);

	const [lettersHeight, setLettersHeight] = useState(
		AcrylicOptions.letters_height
	);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);

	const colorRef = useRef(null);

	const colorOptions = AcrylicOptions.colors;
	const letterPricing =
		AcrylicOptions.letter_height_x_logo_pricing.length > 0
			? convert_json(AcrylicOptions.letter_height_x_logo_pricing)
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
		const loadPromises = AcrylicQuote.fonts.map((font) => loadFont(font));
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
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const handleOnChangeLetters = (e) => setLetters(() => e.target.value);

	const handleComments = (e) => setComments(e.target.value);

	const handleSelectFont = (e) => setFont(e.target.value);

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
		setSelectedLetterHeight(e.target.value);
	};

	useEffect(() => {
		// Log to ensure we're getting the expected value

		let newMountingOptions;
		if (selectedThickness.value === '3') {
			if (selectedMounting === 'Flush stud') {
				setSelectedMounting(
					() => AcrylicOptions.mounting_options[0].mounting_option
				);
			}

			newMountingOptions = AcrylicOptions.mounting_options.filter(
				(option) => option.mounting_option !== 'Flush stud'
			);
		} else {
			if (selectedMounting === 'Stud with Block') {
				setSelectedMounting(
					() => AcrylicOptions.mounting_options[0].mounting_option
				);
			}
			// Exclude 'Stud with Block' option
			newMountingOptions = AcrylicOptions.mounting_options.filter(
				(option) => option.mounting_option !== 'Stud with Block'
			);
		}

		if (waterproof === 'Outdoor') {
			if (selectedMounting === 'Double sided tape') {
				setSelectedMounting(
					() => AcrylicOptions.mounting_options[0].mounting_option
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

	// useEffect(() => {
	// 	setSelectedLetterHeight(() => lettersHeight.min);
	// }, [selectedThickness, lettersHeight]);

	useEffect(() => {
		if (letterPricing.length > 0) {
			const pricingDetail = letterPricing[selectedLetterHeight - 1];
			perLetterPrice = pricingDetail[selectedThickness.value];
			const quantity = letters.trim().length;
			const totalLetterPrice =
				quantity * perLetterPrice * (waterproof === 'Indoor' ? 1 : 1.1);
			setUsdPrice(totalLetterPrice.toFixed(2));
		}
	}, [
		selectedLetterHeight,
		selectedThickness,
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
					value={item.thickness.value}
					onChange={handleOnChangeThickness}
					options={thicknessOptions.map((thickness) => (
						<option
							value={thickness.value}
							selected={thickness === item.thickness}
						>
							{thickness.thickness}
						</option>
					))}
				/>

				<Dropdown
					title="Letters Height"
					onChange={handleOnChangeLetterHeight}
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
						{color.name}
					</div>
					{openColor && (
						<div className="absolute w-full bg-white z-20 border border-gray-200 rounded-md">
							{colorOptions.map((color) => {
								return (
									<div
										className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200"
										onClick={() => {
											setColor(color);
											setOpenColor(false);
										}}
									>
										<span
											className="w-[20px] h-[20px] inline-block rounded-full"
											style={{ backgroundColor: color.color }}
										></span>
										{color.name}
									</div>
								);
							})}
						</div>
					)}
				</div>

				<Dropdown
					title="Fonts"
					onChange={handleSelectFont}
					options={AcrylicQuote.fonts.map((font) => (
						<option
							value={font.name}
							style={{ fontFamily: font.name }}
							selected={font.name === item.font}
						>
							{font.name}
						</option>
					))}
					style={{ fontFamily: font }}
					value={item.font}
				/>

				<Dropdown
					title="Waterproof Option"
					onChange={handleOnChangeWaterproof}
					options={AcrylicOptions.waterproof_options.map((option) => (
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
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						UPLOAD PDF/AI FILE
					</label>

					<button className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]">
						Upload Design
					</button>
				</div>
			</div>

			<div className="text-xs text-[#9F9F9F] pt-4">
				We size the letters in proportion to your chosen font. Some
				uppercase/lowercase letters may appear shorter or taller than your
				selected height on the form to maintain visual harmony.
			</div>
		</>
	);
}
