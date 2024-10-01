import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useAppContext } from '../../../../AppProvider';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import { convertJson } from '../../../../utils/ConvertJson';
import { quantityDiscount } from '../../../../utils/Pricing';
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

const materialOptions = [
	'Flat Cut Stainless Steel',
	'Flat Cut Aluminum',
	'Flat Cut Brass',
];

const metalThicknessOptionsDefault = [
	'1/25" (1mm)',
	'1/16" (1.6mm)',
	'1/8" (3mm)',
	'1/4" (6mm)',
	'3/8" (9mm)',
];

const electroplatedOptions = [
	'Electroplated Gold Brushed',
	'Electroplated Gold Polished',
	'Electroplated Black Titanium Brushed',
	'Electroplated Black Titanium Polished',
	'Electroplated Bronze Brushed',
	'Electroplated Red Copper Brushed',
];

const stainlessFinishing = ['Painted', 'Brushed', 'Polished', 'Electroplated'];
const aluminumFinishing = [
	'Painted',
	'Brushed',
	'Anodized Brushed',
	'Anodized Sandblasted Matte',
];
const brassFinishing = ['Brushed'];

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
	const [material, setMaterial] = useState(item.etchedMaterial ?? '');
	const [height, setHeight] = useState(item.etchedHeight ?? '');
	const [metalThickness, setMetalThickness] = useState(
		item.etchedMetalThickness ?? ''
	);
	const [metalThicknessOptions, setMetalThicknessOptions] = useState(
		metalThicknessOptionsDefault
	);
	const [finishing, setFinishing] = useState(item.etchedFinishing ?? '');
	const [electroplated, setElectroplated] = useState(
		item.etchedElectroplated ?? ''
	);
	const [finishingOptions, setFinishingOptions] = useState([]);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [widthOptions, setWidthOptions] = useState([]);
	const [heightOptions, setHeightOptions] = useState([]);
	const [anodizedColor, setAnodizedColor] = useState(
		item.etchedAnodizedColor ?? ''
	);

	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? 'Standard Nails');
	const [sets, setSets] = useState(item.sets ?? 1);

	const colorRef = useRef(null);

	const updateSignage = useCallback(() => {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					waterproof,
					mounting,
					etchedMaterial: material,
					etchedWidth: width,
					etchedHeight: height,
					etchedMetalThickness: metalThickness,
					etchedFinishing: finishing,
					etchedPaintedColor: color?.name,
					etchedElectroplated: electroplated,
					etchedAnodizedColor: anodizedColor,
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
		material,
		metalThickness,
		finishing,
		electroplated,
		anodizedColor,
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

		if (!material) missingFields.push('Select Material');

		if (!width) missingFields.push('Select Width');

		if (!height) missingFields.push('Select Height');

		if (!metalThickness) missingFields.push('Select Metal Thickness');

		if (!finishing) missingFields.push('Select Finishing');

		if (!finishing) missingFields.push('Select Finishing');

		if (finishing === 'Painted') {
			if (!color) missingFields.push('Select Painted Color');
		}

		if (finishing === 'Electroplated') {
			if (!electroplated) missingFields.push('Select Electroplated Finishing');
		}

		if (
			finishing === 'Anodized Brushed' ||
			finishing === 'Anodized Sandblasted Matte'
		) {
			if (!anodizedColor) missingFields.push('Select Anodized Color');
		}

		if (color?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (!mounting) missingFields.push('Select Mounting');

		if (!waterproof) missingFields.push('Select Environment');

		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');

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
	}, [fileUrls, color, waterproof, mounting, sets, width, height, material]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	const computePricing = () => {
		return {
			singlePrice: tempTotal ?? 0,
			total: totalWithDiscount?.toFixed(2) ?? 0,
			totalWithoutDiscount: total,
			discount: discountPrice,
		};
	};

	const handleOnChangeSets = (e) => {
		const value = e.target.value;
		setSets(value);
	};

	const handleSelectedMaterial = (e) => {
		const target = e.target.value;
		setMaterial(target);

		if (target) {
			setFinishing('');
			setColor('');

			if (
				target === 'Flat Cut Stainless Steel' ||
				target === 'Flat Cut Aluminum'
			) {
				if (target === 'Flat Cut Aluminum') {
					setFinishingOptions(aluminumFinishing);

					setMetalThicknessOptions([
						...metalThicknessOptionsDefault,
						'1/2" (12mm)',
					]);
					setElectroplated('');
				} else {
					if (metalThickness === '1/2" (12mm)') {
						setMetalThickness('');
					}
					setMetalThicknessOptions(metalThicknessOptionsDefault);
					setFinishingOptions(stainlessFinishing);
				}

				setWidthOptions(arrayRange(2, 94, 1));
				setHeightOptions(arrayRange(2, 47, 1));
			} else {
				if (parseInt(width) > 58) {
					setWidth('');
				}
				if (parseInt(height) > 23) {
					setHeight('');
				}

				setWidthOptions(arrayRange(2, 58, 1));
				setHeightOptions(arrayRange(2, 23, 1));
				if (metalThickness === '1/2" (12mm)') {
					setMetalThickness('');
				}
				setMetalThicknessOptions(metalThicknessOptionsDefault);
				setFinishingOptions(brassFinishing);
				setElectroplated('');
			}
		}
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

	const handleonChangeAnodized = (e) => {
		const target = e.target.value;
		setAnodizedColor(target);
	};

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
					title="Material"
					onChange={handleSelectedMaterial}
					options={materialOptions.map((option, index) => (
						<option
							key={index}
							value={option}
							defaultValue={option === material}
						>
							{option}
						</option>
					))}
					value={material}
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
					title="Metal Thickness"
					value={metalThickness}
					onChange={(e) => setMetalThickness(e.target.value)}
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

				{(finishing === 'Anodized Brushed' ||
					finishing === 'Anodized Sandblasted Matte') && (
					<Dropdown
						title="ANODIZED COLOR"
						onChange={handleonChangeAnodized}
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
