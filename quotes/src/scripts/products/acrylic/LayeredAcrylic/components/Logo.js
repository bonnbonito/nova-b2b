import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFile from '../../../../UploadFile';
import { QuoteContext } from '../LayeredAcrylic';

import {
	calculateMountingOptions,
	defaultFinishOptions,
	mountingDefaultOptions,
	piecesOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

const NovaSingleOptions = NovaQuote.single_quote_options;

export default function Logo({ item }) {
	const { signage, setSignage } = useContext(QuoteContext);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(23);
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState(item.fileName);
	const [fileUrl, setFileUrl] = useState(item.fileUrl);
	const [filePath, setFilePath] = useState(item.filePath);
	const [file, setFile] = useState(item.file);
	const [pieces, setPieces] = useState(item.pieces);
	const [baseColor, setBaseColor] = useState(item.baseColor);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);
	const [description, setDescription] = useState(item.description);
	const [printPreference, setPrintPreference] = useState(item.printPreference);
	const finishingOptions = NovaSingleOptions.finishing_options
		? NovaSingleOptions.finishing_options
		: defaultFinishOptions;
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

	const handleOnChangeDescription = (e) => setDescription(e.target.value);

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
					finishing: selectedFinishing,
					file: file,
					fileName: fileName,
					filePath: filePath,
					fileUrl: fileUrl,
					pieces: pieces,
					baseColor: baseColor,
					printPreference: printPreference,
					description: description,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		updateSignage();
	}, [
		selectedThickness,
		selectedMounting,
		waterproof,
		width,
		height,
		fileUrl,
		fileName,
		selectedFinishing,
		file,
		filePath,
		pieces,
		description,
		printPreference,
	]);

	/*
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

			let total = (computed * multiplier).toFixed(2);
			total *= selectedFinishing === 'Gloss' ? 1.1 : 1;
			total *= baseColor === 'Custom Color' ? UV_PRICE : 1;
			setUsdPrice(total);
			setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		baseColor,
	]);
	*/

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

				<Dropdown
					title="Pieces/Cutouts"
					onlyValue={true}
					onChange={handleChangePieces}
					options={piecesOptions.map((piece) => (
						<option value={piece} selected={piece === item.pieces}>
							{piece}
						</option>
					))}
					value={pieces}
				/>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="px-[1px] col-span-3">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						DESCRIPTION
					</label>
					<textarea
						className="h-[160px] rounded-md text-sm"
						onChange={handleOnChangeDescription}
					>
						{description}
					</textarea>
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
