import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFile from '../../../../UploadFile';
import convert_json from '../../../../utils/ConvertJson';
import {
	calculateMountingOptions,
	mountingDefaultOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	METAL_ACRYLIC_PRICING,
	QuoteContext,
	acrylicBaseOptions,
} from '../MetalLaminate';

import {
	colorOptions,
	metalFinishColors,
} from '../../../../utils/ColorOptions';

const exchangeRate = wcumcs_vars_data.currency_data.rate;

export default function Logo({ item }) {
	const { signage, setSignage, setMissing } = useContext(QuoteContext);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(23);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState(item.fileName);
	const [fileUrl, setFileUrl] = useState(item.fileUrl);
	const [filePath, setFilePath] = useState(item.filePath);
	const [file, setFile] = useState(item.file);
	const [metalLaminate, setMetalLaminate] = useState(item.metalLaminate);
	const [acrylicBase, setAcrylicBase] = useState(item.acrylicBase);
	const [openAcrylicColor, setOpenAcrylicColor] = useState(false);
	const [customColor, setCustomColor] = useState(item.customColor);
	const [maxWidthOptions, setMaxWidthOptions] = useState(
		Array.from(
			{
				length: maxWidthHeight,
			},
			(_, index) => {
				const val = 1 + index;
				return (
					<option key={index} value={val}>
						{val}"
					</option>
				);
			}
		)
	);
	const [height, setHeight] = useState(item.height);
	const [comments, setComments] = useState('');
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [mountingOptions, setMountingOptions] = useState(
		mountingDefaultOptions
	);

	const logoPricingObject = NovaQuote.quote_options.logo_pricing;

	useEffect(() => {
		if (!selectedThickness || selectedThickness.value === undefined) return;

		const { newMountingOptions, updatedSelectedMounting } =
			calculateMountingOptions(selectedThickness, selectedMounting, waterproof);

		setSelectedMounting(updatedSelectedMounting); // Update the selected mounting if needed
		setMountingOptions(newMountingOptions);

		setMaxWidthOptions(() =>
			Array.from(
				{
					length: parseInt(maxWidthHeight) + 1,
				},
				(_, index) => {
					const val = 1 + index;
					return (
						<option key={index} value={val}>
							{val}"
						</option>
					);
				}
			)
		);
	}, [selectedThickness, selectedMounting, waterproof, maxWidthHeight]);

	function handleComments(e) {
		setComments(e.target.value);
	}

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = thicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
		target > 3 ? setMaxWidthHeight(42) : setMaxWidthHeight(23);
		if (target == 3) {
			if (height > 25) {
				setHeight(24);
			}

			if (width > 25) {
				setWidth(24);
			}
		}
	};

	const acrylicRef = useRef(null);

	const handleChangeMetalLaminate = (e) => {
		setMetalLaminate(e.target.value);
	};

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments: comments,
					thickness: selectedThickness,
					mounting: selectedMounting,
					waterproof: waterproof,
					width: width,
					height: height,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					metalLaminate: metalLaminate,
					file: file,
					fileName: fileName,
					filePath: filePath,
					fileUrl: fileUrl,
					acrylicBase: acrylicBase,
					customColor: customColor,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		setComments(item.comments);
	}, []);

	useEffect(() => {
		updateSignage();
	}, [
		comments,
		selectedThickness,
		selectedMounting,
		waterproof,
		width,
		height,
		usdPrice,
		cadPrice,
		fileUrl,
		fileName,
		metalLaminate,
		file,
		filePath,
		acrylicBase,
		customColor,
	]);

	useEffect(() => {
		// Ensure width, height, and selectedThickness are provided
		if (width && height && selectedThickness) {
			const logoKey = `logo_pricing_${selectedThickness.value}mm`;
			const logoPricingTable =
				logoPricingObject[logoKey]?.length > 0
					? convert_json(logoPricingObject[logoKey])
					: [];
			const computed =
				logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

			let multiplier = 0;
			if (waterproof) {
				multiplier = waterproof === 'Indoor' ? 1 : 1.1;
			}

			let total = (computed * multiplier * METAL_ACRYLIC_PRICING).toFixed(2);
			total *= acrylicBase?.name === 'Black' ? 1 : 1.1;

			setUsdPrice(total);
			setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
		} else {
			setUsdPrice(0);
			setCadPrice(0);
		}
	}, [width, height, selectedThickness, waterproof, acrylicBase]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!selectedThickness) missingFields.push('Acrylic Thickness');
		if (!width) missingFields.push('Logo Width');
		if (!height) missingFields.push('Logo Height');
		if (!metalLaminate) missingFields.push('Metal Laminate');
		if (!acrylicBase) missingFields.push('Acrylic Base');
		if (acrylicBase?.name === 'Custom Color' && !customColor) {
			missingFields.push('Custom Color Missing');
		}
		if (!waterproof) missingFields.push('Waterproof');
		if (!selectedMounting) missingFields.push('Mounting');
		if (!fileUrl) missingFields.push('PDF/AI File');

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
	};

	useEffect(() => {
		checkAndAddMissingFields();
	}, [
		selectedThickness,
		selectedMounting,
		waterproof,
		acrylicBase,
		width,
		height,
		metalLaminate,
		fileUrl,
		fileName,
		filePath,
		file,
		customColor,
	]);

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				<Dropdown
					title="Thickness"
					value={item.thickness?.value}
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
					title="Logo Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Waterproof Option"
					onChange={(e) => setWaterproof(e.target.value)}
					options={waterProofOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == item.waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
				/>

				<Dropdown
					title="Mounting Options"
					onChange={(e) => setSelectedMounting(e.target.value)}
					options={mountingOptions.map((option) => (
						<option
							value={option.mounting_option}
							selected={option.mounting_option === selectedMounting}
						>
							{option.mounting_option}
						</option>
					))}
					value={selectedMounting}
				/>

				<Dropdown
					title="Metal Laminate"
					onChange={handleChangeMetalLaminate}
					options={metalFinishColors.map((laminate) => (
						<option
							value={laminate.name}
							selected={laminate.name === item.metalLaminate}
						>
							{laminate.name}
						</option>
					))}
					value={metalLaminate}
				/>

				<Dropdown
					title="Acrylic Base"
					onChange={(e) => setAcrylicBase(e.target.value)}
					options={acrylicBaseOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == item.acrylicBase}
						>
							{option.option}
						</option>
					))}
					value={item.acrylicBase}
				/>

				<div className="px-[1px] relative" ref={acrylicRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Acrylic Base
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							acrylicBase.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => setOpenAcrylicColor((prev) => !prev)}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{ backgroundColor: acrylicBase.color }}
						></span>
						{acrylicBase.name === '' ? 'CHOOSE OPTION' : acrylicBase.name}
					</div>
					{openAcrylicColor && (
						<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
							{colorOptions.map((color) => {
								return (
									<div
										className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
										onClick={() => {
											setAcrylicBase(color);
											setOpenAcrylicColor(false);
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
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{acrylicBase?.name == 'Custom Color' && (
					<div className="px-[1px] col-span-4">
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							Custom Color
						</label>
						<input
							className="w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400"
							type="text"
							value={customColor}
							onChange={(e) => setCustomColor(e.target.value)}
							placeholder="DESCRIBE CUSTOM COLOR"
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
						value={item.comments}
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
				/>
			</div>
		</>
	);
}
