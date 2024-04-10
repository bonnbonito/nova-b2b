import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import convert_json from '../../../../utils/ConvertJson';
import { getLogoPricingTablebyThickness } from '../../../../utils/Pricing';
import { QuoteContext } from '../UvPrintedAcrylic';

import {
	calculateMountingOptions,
	mountingDefaultOptions,
	piecesOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

const NovaSingleOptions = NovaQuote.single_quote_options;
const exchangeRate = 1.3;

const UV_PRICE = 1.05;

export default function Logo({ item }) {
	const {
		signage,
		setSignage,
		setMissing,
		tempFolder,
		isLoading,
		setIsLoading,
	} = useContext(QuoteContext);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(23);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);
	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);
	const [pieces, setPieces] = useState(item.pieces);
	const [customColor, setCustomColor] = useState(item.customColor);
	const [baseColor, setBaseColor] = useState(item.baseColor);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);
	const [printPreference, setPrintPreference] = useState(item.printPreference);
	const finishingOptions = NovaSingleOptions.finishing_options;
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

	const logoPricingObject = NovaQuote.logo_pricing_tables;

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

	const handleChangeFinishing = (e) => {
		setSelectedFinishing(e.target.value);
	};

	const handleChangePieces = (e) => {
		setPieces(e.target.value);
	};

	const printOptions = [
		{
			option: 'Print on top',
		},
		{
			option: 'Print from back layer',
		},
	];

	const baseColorOptions = [
		{
			option: 'Black',
		},
		{
			option: 'Custom Color',
		},
	];

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
					finishing: selectedFinishing,
					files: files,
					fileNames: fileNames,
					filePaths: filePaths,
					fileUrls: fileUrls,
					baseColor: baseColor,
					customColor: customColor,
					printPreference: printPreference,
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

		if (!selectedThickness) missingFields.push('Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!printPreference) missingFields.push('Select Printing Preference');
		if (!baseColor) missingFields.push('Select Base Color');
		if (!waterproof) missingFields.push('Select Environment');
		if (!selectedMounting) missingFields.push('Select Mounting Option');
		if (!selectedFinishing) missingFields.push('Select Finishing Option');
		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');
		if (baseColor === 'Custom Color' && !customColor)
			missingFields.push('Add the Pantone color code of your custom color');
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
		selectedThickness,
		selectedMounting,
		waterproof,
		width,
		height,
		fileUrls,
		fileNames,
		selectedFinishing,
		files,
		filePaths,
		baseColor,
		printPreference,
		customColor,
	]);

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
		fileUrls,
		fileNames,
		customColor,
		selectedFinishing,
		files,
		filePaths,
		printPreference,
		baseColor,
	]);

	useEffect(() => {
		if (
			width &&
			height &&
			selectedThickness &&
			waterproof &&
			logoPricingObject !== null
		) {
			const logoPricing = getLogoPricingTablebyThickness(
				`${selectedThickness.value}mm`,
				logoPricingObject
			);
			if (logoPricing !== undefined) {
				const logoPricingTable =
					logoPricing !== undefined ? convert_json(logoPricing) : [];

				const computed =
					logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

				let multiplier = 0;
				if (waterproof) {
					multiplier = waterproof === 'Indoor' ? 1 : 1.1;
				}

				let total = (computed * multiplier).toFixed(2);
				total *= selectedFinishing === 'Gloss' ? 1.1 : 1;
				total *= baseColor === 'Custom Color' ? UV_PRICE : 1;

				total *= 1.2;

				setUsdPrice(parseFloat(total).toFixed(2));
				setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
			} else {
				setUsdPrice(0);
				setCadPrice(0);
			}
		} else {
			setUsdPrice(0);
			setCadPrice(0);
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		baseColor,
	]);

	return (
		<>
			<div className="quote-grid mb-6">
				<Dropdown
					title="Acrylic Thickness"
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
					title="Printing Preference"
					value={printPreference}
					onChange={(e) => setPrintPreference(e.target.value)}
					options={printOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == item.printPreference}
						>
							{option.option}
						</option>
					))}
				/>

				<Dropdown
					title="Base Color"
					value={baseColor}
					onChange={(e) => setBaseColor(e.target.value)}
					options={baseColorOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == item.baseColor}
						>
							{option.option}
						</option>
					))}
				/>

				<Dropdown
					title="Environment"
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
					value={selectedFinishing}
				/>
			</div>

			<div className="quote-grid">
				{baseColor === 'Custom Color' && (
					<div className="px-[1px] col-span-4">
						<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
							CUSTOM COLOR
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
		</>
	);
}
