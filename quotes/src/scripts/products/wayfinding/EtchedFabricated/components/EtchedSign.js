import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../../AppProvider';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import {
	arrayRange,
	setOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
} from '../../../../utils/defaults';

import { colorOptions } from '../../../../utils/ColorOptions';
import ColorsDropdown from '../../../../utils/ColorsDropdown';

const metalThicknessOptions = ['0.5"', '1"', '1.5"', '2"'];

const electroplatedOptions = [
	'Electroplated Gold Brushed',
	'Electroplated Gold Polished',
	'Electroplated Black Titanium Brushed',
	'Electroplated Black Titanium Polished',
	'Electroplated Bronze Brushed',
	'Electroplated Red Copper Brushed',
];

const finishingOptions = ['Painted', 'Brushed', 'Polished', 'Electroplated'];

const mountingOptions = ['Stud Mount', 'Stud with Spacer', 'PVC Backer'];

const studLengthOptions = [
	'1.5" (4cm)',
	'3.2" (8cm)',
	'4" (10cm)',
	'6" (15cm)',
];

const widthOptions = arrayRange(2, 94, 1);

const heightOptions = arrayRange(2, 47, 1);

export const EtchedSign = ({ item }) => {
	const { signage, setSignage, setMissing, updateSignageItem } =
		useAppContext();

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);
	const [color, setColor] = useState(item.etchedPaintedColor ?? '');
	const [openColor, setOpenColor] = useState(false);
	const [customColor, setCustomColor] = useState(item.customColor ?? '');
	const [width, setWidth] = useState(item.etchedWidth ?? '');
	const [height, setHeight] = useState(item.etchedHeight ?? '');
	const [metalThickness, setMetalThickness] = useState(
		item.etchedMetalThickness ?? ''
	);

	const [finishing, setFinishing] = useState(item.etchedFinishing ?? '');
	const [electroplated, setElectroplated] = useState(
		item.etchedElectroplated ?? ''
	);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);

	const [studLength, setStudLength] = useState(item.studLength ?? '');

	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');

	const [sets, setSets] = useState(item.sets ?? 1);

	const colorRef = useRef(null);

	const updateSignage = useCallback(() => {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					waterproof,
					mounting,
					etchedWidth: width,
					etchedHeight: height,
					etchedMetalThickness: metalThickness,
					etchedFinishing: finishing,
					etchedPaintedColor: color?.name,
					etchedElectroplated: electroplated,
					studLength,
					customColor,
					fileNames,
					filePaths,
					fileUrls,
					files,
					sets,
					usdPrice,
					cadPrice,
					cadSinglePrice,
					usdSinglePrice,
				};
			}
			return sign;
		});
		setSignage(updatedSignage);
	}, [
		waterproof,
		color,
		customColor,
		mounting,
		metalThickness,
		finishing,
		studLength,
		electroplated,
		fileNames,
		filePaths,
		fileUrls,
		files,
		sets,
		width,
		height,
		usdPrice,
		cadPrice,
		cadSinglePrice,
		usdSinglePrice,
	]);

	const checkAndAddMissingFields = useCallback(() => {
		const missingFields = [];

		if (!width) missingFields.push('Select Width');

		if (!height) missingFields.push('Select Height');

		if (!metalThickness) missingFields.push('Select Metal Thickness');

		if (!finishing) missingFields.push('Select Finishing');

		if (finishing === 'Painted') {
			if (!color) missingFields.push('Select Painted Color');
		}

		if (finishing === 'Electroplated') {
			if (!electroplated) missingFields.push('Select Electroplated Finishing');
		}

		if (color?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (!mounting) missingFields.push('Select Mounting');

		if (metalThickness) {
			if (!studLength) missingFields.push('Select Stud Length');
		}

		if (!waterproof) missingFields.push('Select Environment');

		if (!sets) missingFields.push('Select Quantity');

		setMissing((prevMissing) => {
			const existingIndex = prevMissing.findIndex(
				(entry) => entry.id === item.id
			);
			if (existingIndex !== -1) {
				const updatedMissing = [...prevMissing];
				updatedMissing[existingIndex] = {
					...updatedMissing[existingIndex],
					missingFields,
				};
				return updatedMissing;
			} else if (missingFields.length > 0) {
				return [
					...prevMissing,
					{ id: item.id, title: item.title, missingFields },
				];
			}
			return prevMissing;
		});
	}, [
		fileUrls,
		color,
		waterproof,
		mounting,
		sets,
		width,
		height,
		studLength,
		metalThickness,
		finishing,
		electroplated,
		customColor,
	]);

	const computePricing = () => {
		if (!width || !height || !metalThickness || !waterproof || !sets) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		let factor;

		if (metalThickness === '0.5"') {
			factor = 0.5;
		} else if (metalThickness === '1"') {
			factor = 0.58;
		} else if (metalThickness === '1.5"') {
			factor = 0.65;
		} else if (metalThickness === '2"') {
			factor = 0.71;
		}

		let tempTotal = (parseInt(width) + 1) * (parseInt(height) + 1) * factor;

		tempTotal = tempTotal > 10 ? tempTotal : 10;

		if (parseInt(width) > 20 || parseInt(height) > 20) {
			tempTotal = tempTotal + 40;
		}

		if (parseInt(width) > 43 || parseInt(height) > 43) {
			tempTotal = tempTotal + 100;
		}

		tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.2;

		if (finishing === 'Polished') {
			tempTotal *= 1.1;
		}

		if (finishing === 'Electroplated') {
			tempTotal *= 1.2;
		}

		// if (graphicsStyle === 'Extra Recessed') {
		// 	tempTotal *= 1.2;
		// }

		// if (graphicsStyle === 'Raised') {
		// 	tempTotal *= 1.1;
		// }

		let total = tempTotal * parseInt(sets);

		return {
			singlePrice: tempTotal.toFixed(2) ?? 0,
			total: total?.toFixed(2) ?? 0,
		};
	};

	const handleOnChangeSets = (e) => {
		const value = e.target.value;
		setSets(value);
	};

	const handleComments = (e) => {
		updateSignageItem(item.id, 'comments', e.target.value);
	};

	const handleOnChangeWaterproof = (e) => {
		setWaterproof(e.target.value);
	};

	const handleonChangeFinishing = (e) => {
		const target = e.target.value;
		if (target !== 'Painted') {
			setColor('');
			setCustomColor('');
		}

		if (target !== 'Electroplated') {
			setElectroplated('');
		}

		setFinishing(target);
	};

	const handleonChangeElectroplated = (e) => {
		const target = e.target.value;
		setElectroplated(target);
	};

	const handleOnChangeMetalThickness = (e) => {
		const target = e.target?.value;
		if (!target) return;

		setMetalThickness(target);
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
	}, [metalThickness, width, height, waterproof, finishing, mounting, sets]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	return (
		<>
			{item.productLine && (
				<div className="py-4 mb-4">
					PRODUCT LINE:{' '}
					<span
						className="font-title"
						dangerouslySetInnerHTML={{ __html: item.productLine }}
					/>
				</div>
			)}
			<div className="quote-grid mb-6">
				<Dropdown
					title="Metal Thickness"
					value={metalThickness}
					onChange={handleOnChangeMetalThickness}
					options={metalThicknessOptions.map((option) => (
						<option
							className="lowercase"
							key={option}
							value={option}
							defaultValue={option === metalThickness}
						>
							{option}
						</option>
					))}
				/>
				<Dropdown
					title="Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={widthOptions}
				/>

				<Dropdown
					title="Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={heightOptions}
				/>

				<Dropdown
					title="Finishing"
					onChange={handleonChangeFinishing}
					options={finishingOptions.map((option) => (
						<option
							key={option}
							value={option}
							defaultValue={option === finishing}
						>
							{option}
						</option>
					))}
					value={finishing}
				/>

				{finishing === 'Painted' && (
					<ColorsDropdown
						ref={colorRef}
						title="Painted Color"
						colorName={color?.name ?? ''}
						openColor={openColor}
						toggleColor={() => {
							setOpenColor((prev) => !prev);
						}}
						colorOptions={colorOptions}
						selectColor={(color) => {
							setColor(color);
							setOpenColor(false);
						}}
					/>
				)}

				{finishing === 'Electroplated' && (
					<Dropdown
						title="ELECTROPLATED"
						onChange={handleonChangeElectroplated}
						options={electroplatedOptions.map((option) => (
							<option
								key={option}
								value={option}
								defaultValue={option === electroplated}
							>
								{option}
							</option>
						))}
						value={electroplated}
					/>
				)}

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
					options={waterProofOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option.option === waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
				/>

				<Dropdown
					title="Mounting"
					onChange={(e) => setMounting(e.target.value)}
					options={mountingOptions.map((option) => (
						<option
							key={option}
							value={option}
							defaultValue={option === mounting}
						>
							{option}
						</option>
					))}
					value={mounting}
				/>
				{metalThickness && (
					<Dropdown
						title="STUD LENGTH"
						onChange={(e) => setStudLength(e.target.value)}
						options={studLengthOptions.map((option) => (
							<option
								key={option}
								value={option}
								defaultValue={option === studLength}
							>
								{option}
							</option>
						))}
						value={studLength}
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
				<Description value={item.comments} handleComments={handleComments} />

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
		</>
	);
};

export default memo(EtchedSign);
