import React, { useEffect, useRef, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import {
	frontBackVinylOptions,
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
} from '../../../../utils/SignageOptions';

import { spacerPricing } from '../../../../utils/Pricing';

import { ledLightColors } from '../../../metal-channel/metalChannelOptions';

import {
	colorOptions,
	vinlyl3635Options,
	whiteOptionsResin,
} from '../../../../utils/ColorOptions';

import ColorsDropdown from '../../../../utils/ColorsDropdown';
import VinylColors from '../../../../utils/VinylColors';

import { acrylicChannelThicknessOptions } from '../options';

import { useAppContext } from '../../../../AppProvider';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	LIGHTING_INDOOR,
	STUD_MOUNT,
	STUD_WITH_SPACER,
} from '../../../../utils/defaults';

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
];

const mountingDefaultOptions = [
	{
		mounting_option: STUD_MOUNT,
	},
	{
		mounting_option: STUD_WITH_SPACER,
	},
];

const maxWidthOptions = Array.from(
	{
		length: 86,
	},
	(_, index) => {
		const val = 1 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

const maxHeightOptions = Array.from(
	{
		length: 43,
	},
	(_, index) => {
		const val = 1 + index;
		return (
			<option key={index} value={val}>
				{val}"
			</option>
		);
	}
);

const backOptionOptions = [
	{
		option: 'Backlit',
	},
];

export function Logo({ item }) {
	const { signage, setSignage, setMissing, hasUploadedFile } = useAppContext();
	const [width, setWidth] = useState(item.width ?? '');
	const [height, setHeight] = useState(item.height ?? '');
	const [comments, setComments] = useState(item.comments ?? '');
	const [color, setColor] = useState(item.acrylicReturnPaintColor ?? 'Black');
	const [openColor, setOpenColor] = useState(false);
	const [waterproof, setWaterproof] = useState(
		item.trimLessWaterproof ?? INDOOR_NOT_WATERPROOF
	);
	const [acrylicChannelThickness, setAcrylicChannelThickness] = useState(
		item.acrylicChannelThickness ?? '1.2"'
	);

	const [ledLightColor, setLedLightColor] = useState(
		item.ledLightColor ?? '6500K White'
	);

	const handleOnChangeLedLight = (e) => setLedLightColor(e.target.value);

	const [frontAcrylicCover, setFrontAcrylicCover] = useState(
		item.frontAcrylicCover ?? 'White'
	);

	const [openVinylWhite, setOpenVinylWhite] = useState(false);

	const [vinylWhite, setVinylWhite] = useState(
		item.vinylWhite ?? { name: '', color: '', code: '' }
	);

	const [vinyl3635, setVinyl3635] = useState(item.vinyl3635 ?? '');

	const [frontBackVinyl, setFrontBackVinyl] = useState(
		item.frontBackVinyl ?? ''
	);

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [customColor, setCustomColor] = useState(item.customColor ?? '');

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdDiscount, setUsdDiscount] = useState(item.usdDiscount ?? 0);
	const [cadDiscount, setCadDiscount] = useState(item.cadDiscount ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [selectedMounting, setSelectedMounting] = useState(item.mounting ?? '');
	const [studLength, setStudLength] = useState(item.studLength ?? '');
	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);

	const [backOption, setBackOption] = useState(item.backOption ?? 'Backlit');

	const handleOnChangeBackOption = (e) => setBackOption(e.target.value);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [sets, setSets] = useState(item.sets ?? 1);

	const colorRef = useRef(null);
	const vinyl3MRef = useRef(null);

	function updateSignage() {
		// Only proceed if the item to update exists in the signage array
		if (!signage.some((sign) => sign.id === item.id)) return;

		// Consolidate updated properties into a single object
		const updateDetails = {
			comments,
			width,
			height,
			acrylicChannelThickness,
			mounting: selectedMounting,
			trimLessWaterproof: waterproof,
			acrylicReturnPaintColor: color,
			ledLightColor,
			usdPrice,
			cadPrice,
			files,
			fileNames,
			filePaths,
			fileUrls,
			vinylWhite,
			vinyl3635,
			frontBackVinyl,
			customColor,
			sets,
			studLength,
			spacerStandoffDistance,
			frontAcrylicCover,
			usdSinglePrice,
			cadSinglePrice,
			backOption,
			includedItems: LIGHTING_INDOOR,
		};

		setSignage((prevSignage) =>
			prevSignage.map((sign) =>
				sign.id === item.id ? { ...sign, ...updateDetails } : sign
			)
		);
	}

	const handleComments = (e) => setComments(e.target.value);

	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const handleOnChangeMount = (e) => {
		const target = e.target.value;
		setSelectedMounting(target);

		if (target === STUD_WITH_SPACER || target === STUD_MOUNT) {
			if (target === STUD_MOUNT) {
				setSpacerStandoffDistance('');
			}
		} else {
			setStudLength('');
			setSpacerStandoffDistance('');
		}
	};

	const handleOnChangeVinyl3635 = (e) => {
		const target = e.target.value;
		setVinyl3635(target);
	};

	const handleOnChangeFrontBackVinyl = (e) => {
		const target = e.target.value;
		setFrontBackVinyl(target);
	};

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		setAcrylicChannelThickness(() => target);
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

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!acrylicChannelThickness)
			missingFields.push('Select Acrylic Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!color) missingFields.push('Select Return Paint Color');
		if (color === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}
		if (!waterproof) missingFields.push('Select Environment');
		if (!selectedMounting) missingFields.push('Select Mounting');

		if (selectedMounting === STUD_MOUNT) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (selectedMounting === STUD_WITH_SPACER) {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (!frontAcrylicCover) missingFields.push('Select Acrylic Front');

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

		if (!sets) missingFields.push('Select Quantity');

		if (!hasUploadedFile) {
			if (!fileUrls || fileUrls.length === 0)
				missingFields.push('Upload a PDF/AI File');
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
		checkAndAddMissingFields();
	}, [signage, hasUploadedFile]);

	useEffect(() => {
		updateSignage();
	}, [
		comments,
		width,
		height,
		acrylicChannelThickness,
		selectedMounting,
		waterproof,
		color,
		usdPrice,
		cadPrice,
		fileUrls,
		fileNames,
		filePaths,
		files,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
		frontAcrylicCover,
		vinylWhite,
		vinyl3635,
		frontBackVinyl,
		ledLightColor,
		usdSinglePrice,
		cadSinglePrice,
		backOption,
	]);

	if (frontAcrylicCover === '3M 3630 Vinyl') {
		useOutsideClick([colorRef, vinyl3MRef], () => {
			if (!openColor && !openVinylWhite) return;
			setOpenColor(false);
			setOpenVinylWhite(false);
		});
	} else {
		useOutsideClick([colorRef], () => {
			if (!openColor) return;
			setOpenColor(false);
		});
	}

	useEffect(() => {
		color?.name != 'Custom Color' && setCustomColor('');
	}, [color]);

	const computePricing = () => {
		if (!width || !height)
			return {
				singlePrice: false,
				total: false,
			};

		const perInch = 0.8;

		let tempTotal = parseInt(width) * parseInt(height) * perInch;

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

		if (frontAcrylicCover === 'UV Printed') {
			tempTotal *= 1.15;
		}

		if (selectedMounting === STUD_WITH_SPACER) {
			const spacer = spacerPricing(tempTotal);
			tempTotal += parseFloat(spacer.toFixed(2));
		}

		/* oversize surcharge */
		if (parseInt(width) > 43) {
			tempTotal += 150;
		}

		/* minimum price */
		tempTotal = tempTotal > 50 ? tempTotal : 50;

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
		width,
		height,
		frontAcrylicCover,
		selectedMounting,
		sets,
		frontBackVinyl,
	]);

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
					title="Acrylic Thickness"
					value={acrylicChannelThickness}
					onChange={handleOnChangeThickness}
					options={acrylicChannelThicknessOptions.map((thickness) => (
						<option
							key={thickness.value}
							value={thickness.value}
							defaultValue={thickness.value === acrylicChannelThickness}
						>
							{thickness.value}
						</option>
					))}
					onlyValue={true}
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

				<Dropdown
					title="Acrylic Front Cover"
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
					<VinylColors
						ref={vinyl3MRef}
						vinylWhite={vinylWhite}
						openVinylWhite={openVinylWhite}
						toggleVinyl={() => {
							setOpenVinylWhite((prev) => !prev);
							setOpenColor(false);
						}}
						selectVinylColor={(color) => {
							setVinylWhite(color);
							setOpenVinylWhite(false);
						}}
					/>
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
							onChange={handleOnChangeFrontBackVinyl}
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

				<ColorsDropdown
					ref={colorRef}
					title="Return Paint Color"
					colorName={color}
					toggleColor={() => {
						setOpenColor((prev) => !prev);
						setOpenVinylWhite(false);
					}}
					openColor={openColor}
					colorOptions={colorOptions}
					selectColor={(color) => {
						setColor(color.name);
						setOpenColor(false);
					}}
				/>

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
					title="Back Option"
					onChange={handleOnChangeBackOption}
					options={backOptionOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option.option == backOption}
						>
							{option.option}
						</option>
					))}
					value={backOption}
					onlyValue={true}
				/>

				<Dropdown
					title="Mounting Options"
					onChange={handleOnChangeMount}
					options={mountingDefaultOptions.map((option) => (
						<option
							key={option.mounting_option}
							value={option.mounting_option}
							defaultValue={option.mounting_option === selectedMounting}
						>
							{option.mounting_option}
						</option>
					))}
					value={selectedMounting}
				/>

				{selectedMounting === STUD_WITH_SPACER && (
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
						<Dropdown
							title="SPACER DISTANCE"
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

				{selectedMounting === STUD_MOUNT && (
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
					onlyValue={true}
				/>

				{waterproof === INDOOR_NOT_WATERPROOF && (
					<Dropdown
						title="Included Items"
						options={
							<option value={LIGHTING_INDOOR} defaultValue={LIGHTING_INDOOR}>
								{LIGHTING_INDOOR}
							</option>
						}
						value={LIGHTING_INDOOR}
						onlyValue={true}
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

			{selectedMounting === STUD_WITH_SPACER && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{color == 'Custom Color' && (
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
