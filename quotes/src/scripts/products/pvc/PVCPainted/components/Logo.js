import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFile from '../../../../UploadFile';
import convert_json from '../../../../utils/ConvertJson';
import { getLogoPricingTablebyThickness } from '../../../../utils/Pricing';
import { waterProofOptions } from '../../../../utils/SignageOptions';

import {
	finishingOptions,
	installationOptions,
	thicknessOptions,
} from '../../pvcOptions';

import { QuoteContext } from '../PVCPainted';

const exchangeRate = 1.3;

export default function Logo({ item }) {
	const { signage, setSignage, setMissing, tempFolder } =
		useContext(QuoteContext);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(36);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState(item.fileName);
	const [installation, setInstallation] = useState(item.installation);
	const [fileUrl, setFileUrl] = useState(item.fileUrl);
	const [filePath, setFilePath] = useState(item.filePath);
	const [file, setFile] = useState(item.file);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);

	const [maxWidthOptions, setMaxWidthOptions] = useState(
		Array.from(
			{
				length: maxWidthHeight,
			},
			(_, index) => {
				const val = 4 + index;
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

	const handleOnChangeInstallation = (e) => setInstallation(e.target.value);

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

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments: comments,
					thickness: selectedThickness,
					installation: installation,
					waterproof: waterproof,
					width: width,
					height: height,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					finishing: selectedFinishing,
					file: file,
					fileName: fileName,
					filePath: filePath,
					fileUrl: fileUrl,
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
		waterproof,
		width,
		height,
		installation,
		usdPrice,
		cadPrice,
		fileUrl,
		fileName,
		selectedFinishing,
		file,
		filePath,
	]);

	const logoPricingObject = NovaQuote.logo_pricing_tables;

	useEffect(() => {
		if (
			width &&
			height &&
			selectedThickness &&
			waterproof &&
			logoPricingObject !== null
		) {
			console.log(selectedThickness.value);
			const logoPricing = getLogoPricingTablebyThickness(
				`${selectedThickness.value}`,
				logoPricingObject
			);

			if (logoPricing !== undefined) {
				const logoPricingTable =
					logoPricing !== undefined ? convert_json(logoPricing) : [];
				const computed =
					logoPricingTable.length > 0 ? logoPricingTable[width - 4][height] : 0;

				let multiplier = 0;
				if (waterproof) {
					multiplier = waterproof === 'Indoor' ? 1 : 1.03;
				}

				let total = (computed * multiplier).toFixed(2);

				total *= selectedFinishing === 'Gloss' ? 1.03 : 1;
				total *= installation === 'Double-sided tape' ? 1.01 : 1;

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
		installation,
	]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!waterproof) missingFields.push('Select Waterproof');
		if (!installation) missingFields.push('Select Installation');
		if (!selectedFinishing) missingFields.push('Select Finishing');
		if (!fileUrl) missingFields.push('Upload a PDF/AI File');

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
		width,
		height,
		selectedThickness,
		installation,
		waterproof,
		fileUrl,
		fileName,
		file,
		selectedFinishing,
	]);

	return (
		<>
			<div className="quote-grid mb-6">
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
					title="Installation"
					onChange={handleOnChangeInstallation}
					options={installationOptions.map((option) => (
						<option
							value={option.value}
							selected={option.value === installation}
						>
							{option.value}
						</option>
					))}
					value={item.installation}
				/>
			</div>

			<div className="quote-grid">
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
					tempFolder={tempFolder}
				/>
			</div>
		</>
	);
}
