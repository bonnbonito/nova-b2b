import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import {
	colorOptions,
	vinlyl3635Options,
	whiteOptionsResin,
} from '../../../../utils/ColorOptions';
import ColorsDropdown from '../../../../utils/ColorsDropdown';
import VinylColors from '../../../../utils/VinylColors';

import {
	frontBackVinylOptions,
	lightingPackagedOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';
import {
	frontBackdepthOptions,
	ledLightColors,
	mountingDefaultOptions,
} from '../../metalChannelOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	LIGHTING_INDOOR,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import { spacerPricing } from '../../../../utils/Pricing';

import { useAppContext } from '../../../../AppProvider';

const maxHeightOptions = Array.from(
	{
		length: 36,
	},
	(_, index) => {
		const val = 5 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

const maxWidthOptions = Array.from(
	{
		length: 36,
	},
	(_, index) => {
		const val = 5 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

export function Logo({ item }) {
	const { signage, setSignage, setMissing } = useAppContext();
	const [comments, setComments] = useState(item.comments ?? '');

	const [width, setWidth] = useState(item.width ?? '');
	const [height, setHeight] = useState(item.height ?? '');

	const [color, setColor] = useState(
		item.returnColor ?? { name: 'Black', color: '#000000' }
	);
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(item.trimLessWaterproof ?? '');

	const [depth, setDepth] = useState(item.depth);

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [customColor, setCustomColor] = useState(item.customColor ?? '');

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [openAcrylicCover, setOpenAcrylicCover] = useState(false);

	const [studLength, setStudLength] = useState(item.studLength ?? '');

	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [includedItems, setIncludedItems] = useState('');

	const [sets, setSets] = useState(item.sets ?? 1);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const [vinylWhite, setVinylWhite] = useState(
		item.vinylWhite ?? { name: '', color: '', code: '' }
	);

	const [vinyl3635, setVinyl3635] = useState(item.vinyl3635 ?? '');

	const [frontBackVinyl, setFrontBackVinyl] = useState(
		item.frontBackVinyl ?? ''
	);

	const [frontAcrylicCover, setFrontAcrylicCover] = useState(
		item.frontAcrylicCover ?? 'White'
	);

	const [mounting, setMounting] = useState(item.mounting ?? '');

	const [ledLightColor, setLedLightColor] = useState(item.ledLightColor);

	const [lightingOptions, setLightingOptions] = useState(
		lightingPackagedOptions
	);

	const colorRef = useRef(null);
	const acrylicColorRef = useRef(null);

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments,
					depth,
					trimLessWaterproof: waterproof,
					includedItems,
					returnColor: color,
					usdPrice,
					cadPrice,
					cadSinglePrice,
					usdSinglePrice,
					files,
					fileNames,
					filePaths,
					fileUrls,
					customColor,
					ledLightColor,
					frontAcrylicCover,
					vinylWhite,
					vinyl3635,
					frontBackVinyl,
					mounting,
					studLength,
					spacerStandoffDistance,
					sets,
					width,
					height,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const handleComments = (e) => setComments(e.target.value);

	const handleOnChangeincludedItems = (e) => setIncludedItems(e.target.value);

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

	const handleOnChangeLedLight = (e) => setLedLightColor(e.target.value);

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeWhite = (e) => {
		const target = e.target.value;
		setFrontAcrylicCover(target);
		if (target !== '3M 3630 Vinyl') {
			setVinylWhite({
				name: '',
				color: '',
			});
			setFrontBackVinyl('');
		}
		if (target !== '3M 3635 Vinyl') {
			setVinyl3635('');
			setFrontBackVinyl('');
		}
	};

	const handleOnChangeVinyl3635 = (e) => {
		const target = e.target.value;
		setVinyl3635(target);
	};

	const handleOnChangeWhiteFrontBackVinyl = (e) => {
		const target = e.target.value;
		setFrontBackVinyl(target);
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
		const selected = frontBackdepthOptions.filter(
			(option) => option.value === target
		);

		setDepth(() => selected[0]);
	};

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!depth) missingFields.push('Select Metal Depth');

		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');

		if (!color?.name) missingFields.push('Select Color');
		if (color?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (!waterproof) missingFields.push('Select Environment');

		if (!includedItems) missingFields.push('Select Included Items');

		if (!mounting) missingFields.push('Select Mounting');

		if (mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (mounting === STUD_WITH_SPACER) {
			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (!ledLightColor) missingFields.push('Select LED Light Color');

		if (!frontAcrylicCover) missingFields.push('Select Front Acrylic Cover');

		if (frontAcrylicCover === '3M 3630 Vinyl') {
			if (!vinylWhite?.name) missingFields.push('Select 3M 3630 Vinyl');
		}

		if (frontAcrylicCover === '3M 3635 Vinyl') {
			if (!vinyl3635) missingFields.push('Select 3M 3635 Vinyl');
		}

		if (
			frontAcrylicCover === '3M 3630 Vinyl' ||
			frontAcrylicCover === '3M 3635 Vinyl'
		) {
			if (!frontBackVinyl) missingFields.push('Select Front &amp; Back Vinyl');
		}

		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');

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
		depth,
		comments,
		waterproof,
		color,
		frontAcrylicCover,
		vinylWhite,
		vinyl3635,
		frontBackVinyl,
		usdPrice,
		cadPrice,
		ledLightColor,
		fileUrls,
		fileNames,
		files,
		filePaths,
		customColor,
		mounting,
		studLength,
		spacerStandoffDistance,
		width,
		height,
		cadSinglePrice,
		usdSinglePrice,
		includedItems,
	]);

	if (frontAcrylicCover === '3M 3630 Vinyl') {
		useOutsideClick([colorRef, acrylicColorRef], () => {
			if (!openColor && !openAcrylicCover) return;
			setOpenColor(false);
			setOpenAcrylicCover(false);
		});
	} else {
		useOutsideClick([colorRef], () => {
			if (!openColor) return;
			setOpenColor(false);
		});
	}

	const computePricing = () => {
		if (!width || !height || !depth?.value) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		let P = 0;
		let S = 0;
		const F = 40;
		let X = parseInt(width);
		let Y = parseInt(height);

		switch (depth?.value) {
			case '8':
				console.log(depth);
				P = 0.39;
				S = 0.2;
				break;
			default:
				console.log(depth);
				P = 0.36;
				S = 0.16;
		}

		let tempTotal = X * Y * P + (X + 4) * (Y + 4) * S + F;
		console.log(tempTotal);

		/* Oversize surcharge */
		if (X > 41 || Y > 41) {
			console.log('surcharge');
			tempTotal += 150;
		}

		if (frontAcrylicCover === 'UV Printed') {
			tempTotal *= 1.1;
		}

		if (frontAcrylicCover === '3M 3630 Vinyl') {
			tempTotal *= 1.15;
			if (frontBackVinyl === 'Front and Back') {
				tempTotal *= 1.15;
			}
		}

		if (frontAcrylicCover === '3M 3635 Vinyl') {
			tempTotal *= 1.2;
			if (frontBackVinyl === 'Front and Back') {
				tempTotal *= 1.15;
			}
		}

		if (waterproof && waterproof !== INDOOR_NOT_WATERPROOF) {
			tempTotal *= 1.03;
		}

		if (mounting === STUD_WITH_SPACER) {
			const spacer = spacerPricing(tempTotal);
			tempTotal += parseFloat(spacer.toFixed(2));
		}

		/** minimum price is 89 usd */
		tempTotal = tempTotal < 89 ? 89 : tempTotal;

		const total = tempTotal * parseInt(sets);

		return {
			singlePrice: tempTotal.toFixed(2) ?? 0,
			total: total.toFixed(2) ?? 0,
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
		depth,
		width,
		height,
		waterproof,
		mounting,
		frontAcrylicCover,
		sets,
		frontBackVinyl,
	]);

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
	}, [color]);

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
				<div className="py-4 my-4">
					PRODUCT LINE:{' '}
					<span
						className="font-title"
						dangerouslySetInnerHTML={{ __html: item.productLine }}
					/>
				</div>
			)}

			<div className="quote-grid mb-6">
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
					title="Metal Depth"
					value={depth?.value}
					onChange={handleOnChangeDepth}
					options={frontBackdepthOptions.map((thickness) => (
						<option
							key={thickness.value}
							value={thickness.value}
							defaultValue={thickness === depth}
						>
							{thickness.depth}
						</option>
					))}
				/>

				<Dropdown
					title="Logo Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxHeightOptions}
				/>

				<ColorsDropdown
					ref={colorRef}
					title="Return Color"
					colorName={color.name}
					openColor={openColor}
					toggleColor={() => {
						setOpenColor((prev) => !prev);
						setOpenAcrylicCover(false);
					}}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setColor(color);
						setOpenColor(false);
					}}
				/>

				<Dropdown
					title="Front Acrylic Cover"
					onChange={handleOnChangeWhite}
					options={whiteOptionsResin.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option == frontAcrylicCover}
						>
							{option.option}
						</option>
					))}
					value={frontAcrylicCover}
				/>

				{frontAcrylicCover === '3M 3630 Vinyl' && (
					<>
						<VinylColors
							ref={acrylicColorRef}
							vinylWhite={vinylWhite}
							setVinylWhite={setVinylWhite}
							openVinylWhite={openAcrylicCover}
							toggleVinyl={() => {
								setOpenAcrylicCover((prev) => !prev);
								setOpenColor(false);
							}}
							selectVinylColor={(color) => {
								setVinylWhite(color);
								setOpenAcrylicCover(false);
							}}
						/>
					</>
				)}

				{frontAcrylicCover === '3M 3635 Vinyl' && (
					<>
						<Dropdown
							title="3M 3635 Vinyl"
							onChange={handleOnChangeVinyl3635}
							options={vinlyl3635Options.map((option) => (
								<option
									key={option.code}
									value={`${option.name} - [${option.code}]`}
									defaultValue={
										`${option.name} - [${option.code}]` == vinyl3635
									}
								>
									{`${option.name} - [${option.code}]`}
								</option>
							))}
							value={vinyl3635}
						/>
					</>
				)}

				{(frontAcrylicCover === '3M 3630 Vinyl' ||
					frontAcrylicCover === '3M 3635 Vinyl') && (
					<>
						<Dropdown
							title="Front &amp; Back Vinyl"
							onChange={handleOnChangeWhiteFrontBackVinyl}
							options={frontBackVinylOptions.map((option) => (
								<option
									key={option.option}
									value={option.option}
									defaultValue={option.option == frontBackVinyl}
								>
									{option.option}
								</option>
							))}
							value={frontBackVinyl}
						/>
					</>
				)}

				<Dropdown
					title="LED Light Color"
					onChange={handleOnChangeLedLight}
					options={ledLightColors.map((color) => (
						<option
							key={color}
							value={color}
							defaultValue={color == ledLightColor}
						>
							{color}
						</option>
					))}
					value={ledLightColor}
				/>

				<Dropdown
					title="Mounting"
					onChange={handleOnChangeMounting}
					options={mountingDefaultOptions.map((mounting) => (
						<option
							key={mounting.value}
							value={mounting.value}
							defaultValue={mounting.value == mounting}
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
					title="Included Items"
					onChange={handleOnChangeincludedItems}
					options={lightingOptions.map((option) => (
						<option
							key={option.value}
							value={option.value}
							defaultValue={option.value == includedItems}
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

			{(mounting === STUD_WITH_SPACER || mounting === STUD_MOUNT) && (
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
