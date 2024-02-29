import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFile from '../../../../UploadFile';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import { waterProofOptions } from '../../../../utils/SignageOptions';
import {
	finishOptions,
	metalFinishOptions,
	metalInstallationOptions,
	metalOptions,
	metalThicknessOptions,
	stainlessSteelPolishedOptions,
} from '../../metalOptions';

import { QuoteContext } from '../FabricatedStainless';

const exchangeRate = wcumcs_vars_data.currency_data.rate;

const PricingTable = NovaQuote.metal_stainless_pricing?.logo_pricing;

export default function Logo({ item }) {
	const { signage, setSignage, setMissing } = useContext(QuoteContext);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);
	const [fileName, setFileName] = useState(item.fileName);
	const [fileUrl, setFileUrl] = useState(item.fileUrl);
	const [filePath, setFilePath] = useState(item.filePath);
	const [file, setFile] = useState(item.file);
	const [color, setColor] = useState(item.color);
	const [openColor, setOpenColor] = useState(false);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);

	const [metal, setMetal] = useState(item.metal);
	const [stainLessMetalFinish, setStainLessMetalFinish] = useState(
		item.stainLessMetalFinish
	);
	const [stainlessSteelPolished, setStainlessSteelPolished] = useState(
		item.stainlessSteelPolished
	);

	const maxWidthHeightOptions = Array.from(
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
	const [height, setHeight] = useState(item.height);
	const [comments, setComments] = useState('');
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [installation, setInstallation] = useState(item.installation);

	const colorRef = useRef(null);

	function handleComments(e) {
		setComments(e.target.value);
	}

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const handelMetalFinishChange = (e) => {
		const value = e.target.value;
		if ('Stainless Steel Polished' !== value) {
			setStainlessSteelPolished('');
		}
		setStainLessMetalFinish(e.target.value);
	};

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = metalThicknessOptions.filter(
			(option) => option.value === target
		);
		console.log(selected[0]);
		setSelectedThickness(() => selected[0]);
	};

	const handleChangeFinishing = (e) => {
		const value = e.target.value;
		if (value === '') {
			setStainLessMetalFinish('');
			setColor({ name: '', color: '' });
			setStainlessSteelPolished('');
		}
		if ('Metal Finish' === value) {
			setColor({ name: '', color: '' });
		}

		if ('Painted Finish' === value) {
			setStainLessMetalFinish('');
		}

		setSelectedFinishing(e.target.value);
	};

	const handleOnChangeInstallation = (e) => setInstallation(e.target.value);

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments: comments,
					thickness: selectedThickness,
					waterproof: waterproof,
					color: color,
					installation: installation,
					width: width,
					height: height,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					finishing: selectedFinishing,
					file: file,
					metal: metal,
					fileName: fileName,
					filePath: filePath,
					fileUrl: fileUrl,
					stainlessSteelPolished: stainlessSteelPolished,
					stainLessMetalFinish: stainLessMetalFinish,
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

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!metal) missingFields.push('Select Metal Option');
		if (!selectedThickness) missingFields.push('Select Metal Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!fileUrl) missingFields.push('Upload a PDF/AI File');

		if (!selectedFinishing) missingFields.push('Select Finish Option');
		if (selectedFinishing === 'Painted Finish') {
			if (!color.name) missingFields.push('Select Color');
		}
		if (selectedFinishing === 'Metal Finish') {
			if (!stainLessMetalFinish)
				missingFields.push('Select Metal Finish Option');
		}

		if (
			stainLessMetalFinish &&
			stainLessMetalFinish === 'Stainless Steel Polished'
		) {
			if (!stainlessSteelPolished) missingFields.push('Select Steel Polished');
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
		selectedFinishing,
		stainLessMetalFinish,
		stainlessSteelPolished,
		file,
		filePath,
		installation,
		color,
		metal,
	]);

	useEffect(() => {
		// Ensure width, height, and selectedThickness are provided
		if (width && height && selectedThickness) {
			const logoKey = `logo_pricing_${selectedThickness.value}mm`;
			const logoPricingTable =
				PricingTable[logoKey]?.length > 0
					? convert_json(PricingTable[logoKey])
					: [];

			console.log(logoPricingTable);
			const computed =
				logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

			let multiplier = 0;
			if (waterproof) {
				multiplier = waterproof === 'Indoor' ? 1 : 1.05;
			}

			let total = (computed * multiplier).toFixed(2);

			total *= metal === '316 Stainless Steel' ? 1.3 : 1;

			if (stainlessSteelPolished) {
				if ('Standard (Face)' === stainlessSteelPolished) {
					total *= 1.3;
				}

				if ('Premium (Face & Side)' === stainlessSteelPolished) {
					total *= 1.7;
				}
			}

			if (
				stainLessMetalFinish &&
				stainLessMetalFinish !== 'Stainless Steel Brushed' &&
				stainLessMetalFinish !== 'Stainless Steel Polished'
			) {
				total *= 1.2;
			}

			setUsdPrice(total);
			setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		metal,
		stainLessMetalFinish,
		stainlessSteelPolished,
	]);

	useOutsideClick(colorRef, () => {
		setOpenColor(false);
	});

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				<Dropdown
					title="Metal Option"
					onChange={(e) => setMetal(e.target.value)}
					options={metalOptions.map((metal) => (
						<option value={metal.option} selected={metal.option === item.metal}>
							{metal.option}
						</option>
					))}
					value={item.metal}
				/>
				<Dropdown
					title="Metal Thickness"
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
					title="Logo Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthHeightOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthHeightOptions}
				/>

				<Dropdown
					title="Finish Option"
					onChange={handleChangeFinishing}
					options={finishOptions.map((finishing) => (
						<option
							value={finishing.option}
							selected={finishing.option === selectedFinishing}
						>
							{finishing.option}
						</option>
					))}
					value={item.finishing}
				/>

				{selectedFinishing === 'Metal Finish' && (
					<Dropdown
						title="Metal Finish"
						onChange={handelMetalFinishChange}
						options={metalFinishOptions.map((metalFinish) => (
							<option
								value={metalFinish.option}
								selected={metalFinish.option === stainLessMetalFinish}
							>
								{metalFinish.option}
							</option>
						))}
						value={item.stainLessMetalFinish}
					/>
				)}

				{stainLessMetalFinish === 'Stainless Steel Polished' && (
					<Dropdown
						title="Steel Polished"
						onChange={(e) => setStainlessSteelPolished(e.target.value)}
						options={stainlessSteelPolishedOptions.map((steelPolished) => (
							<option
								value={steelPolished.option}
								selected={steelPolished.option === item.stainlessSteelPolished}
							>
								{steelPolished.option}
							</option>
						))}
						value={item.stainlessSteelPolished}
					/>
				)}

				{selectedFinishing === 'Painted Finish' && (
					<div className="px-[1px] relative" ref={colorRef}>
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							Painted Color
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
					title="Waterproof Option"
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

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
					setFileUrl={setFileUrl}
					setFileName={setFileName}
				/>
			</div>
		</>
	);
}