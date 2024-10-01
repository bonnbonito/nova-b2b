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

const anodizedColorOptions = [
	'Black',
	'Brown',
	'Clear',
	'Gold',
	'Champagne Gold',
];

const graphicsStyleOptions = ['Raised', 'Recessed'];

const edgesOptionsDefault = ['Square'];

const mountingOptionsDefault = [
	'Double sided tape',
	'Plain',
	'Welded Stud - 1"',
	'Pre-drilled Holes',
];

const studLengthOptions = [
	'1.5" (4cm)',
	'3.2" (8cm)',
	'4" (10cm)',
	'6" (15cm)',
];

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
	const [graphicsStyle, setGraphicsStyle] = useState(
		item.etchedGraphicsStyle ?? ''
	);
	const [edges, setEdges] = useState(item.etchedEdges ?? 'Square');
	const [edgesOptions, setEdgesOptions] = useState(edgesOptionsDefault);
	const [studLength, setStudLength] = useState(item.studLength ?? '');

	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');
	const [mountingOptions, setMountingOptions] = useState(
		mountingOptionsDefault
	);
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
					etchedGraphicsStyle: graphicsStyle,
					studLength,
					etchedEdges: edges,
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
		edges,
		customColor,
		mounting,
		material,
		metalThickness,
		finishing,
		studLength,
		electroplated,
		graphicsStyle,
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

		if (!graphicsStyle) missingFields.push('Select Graphics Style');

		if (!edges) missingFields.push('Select Edges');

		if (!mounting) missingFields.push('Select Mounting');

		if (
			metalThickness === '1/4" (6mm)' ||
			metalThickness === '3/8" (9mm)' ||
			metalThickness === '1/2" (12mm)'
		) {
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
		material,
		studLength,
		metalThickness,
		finishing,
		electroplated,
		anodizedColor,
		graphicsStyle,
		edges,
		customColor,
	]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	const computePricing = () => {
		if (
			!width ||
			!height ||
			!material ||
			!metalThickness ||
			!waterproof ||
			!sets
		) {
			return {
				singlePrice: false,
				total: false,
			};
		}

		let factor;

		if (material === 'Flat Cut Stainless Steel') {
			if (metalThickness === '1/25" (1mm)') {
				factor = 0.29;
			}
			if (metalThickness === '1/16" (1.6mm)') {
				factor = 0.34;
			}
			if (metalThickness === '1/8" (3mm)') {
				factor = 0.49;
			}
			if (metalThickness === '1/4" (6mm)') {
				factor = 0.8;
			}
			if (metalThickness === '3/8" (9mm)') {
				factor = 1.17;
			}
		}

		if (material === 'Flat Cut Aluminum') {
			if (metalThickness === '1/25" (1mm)') {
				factor = 0.28;
			}
			if (metalThickness === '1/16" (1.6mm)') {
				factor = 0.32;
			}
			if (metalThickness === '1/8" (3mm)') {
				factor = 0.38;
			}
			if (metalThickness === '1/4" (6mm)') {
				factor = 0.59;
			}
			if (metalThickness === '3/8" (9mm)') {
				factor = 0.75;
			}
			if (metalThickness === '1/2" (12mm)') {
				factor = 1;
			}
		}

		if (material === 'Flat Cut Brass') {
			if (metalThickness === '1/25" (1mm)') {
				factor = 0.36;
			}
			if (metalThickness === '1/16" (1.6mm)') {
				factor = 0.46;
			}
			if (metalThickness === '1/8" (3mm)') {
				factor = 0.63;
			}
			if (metalThickness === '1/4" (6mm)') {
				factor = 1.24;
			}
			if (metalThickness === '3/8" (9mm)') {
				factor = 1.67;
			}
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

		if (
			finishing === 'Anodized Brushed' ||
			finishing === 'Anodized Sandblasted Matte'
		) {
			tempTotal *= 1.25;
		}

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

					if (
						metalThickness === '1/4" (6mm)' ||
						metalThickness === '3/8" (9mm)' ||
						metalThickness === '1/2" (12mm)'
					) {
						setEdgesOptions(['Square', 'Rounded']);
						setMountingOptions(['Stud', 'Plain', 'Pre–drilled Holes']);
					} else {
						setEdgesOptions(['Square']);
						setEdges('Square');
						setMountingOptions(mountingOptionsDefault);
					}
				} else {
					if (metalThickness === '1/2" (12mm)') {
						setMetalThickness('');
					}
					setMetalThicknessOptions(metalThicknessOptionsDefault);
					setFinishingOptions(stainlessFinishing);
					setAnodizedColor('');
					setEdgesOptions(['Square']);
					setEdges('Square');

					if (
						metalThickness === '1/25" (1mm)' ||
						metalThickness === '1/16" (1.6mm)' ||
						metalThickness === '1/8" (3mm)'
					) {
						setMountingOptions(mountingOptionsDefault);
					} else {
						setMountingOptions(['Stud Mount', 'Plain', 'Pre–drilled Holes']);
					}
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
				setAnodizedColor('');
				setEdgesOptions(['Square']);
				setEdges('Square');
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

		if (
			target !== 'Anodized Brushed' &&
			target !== 'Anodized Sandblasted Matte'
		) {
			setAnodizedColor('');
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

	const handleOnChangeMetalThickness = (e) => {
		const target = e.target.value;
		setMetalThickness(target);
		if (
			target === '1/4" (6mm)' ||
			target === '3/8" (9mm)' ||
			target === '1/2" (12mm)'
		) {
			if (material === 'Flat Cut Aluminum') {
				setEdgesOptions(['Square', 'Rounded']);
				setMountingOptions(['Stud', 'Plain', 'Pre–drilled Holes']);
				if (
					mounting !== 'Stud' &&
					mounting !== 'Plain' &&
					mounting !== 'Pre–drilled Holes'
				) {
					setMounting('');
				}
			} else {
				setMountingOptions(['Stud Mount', 'Plain', 'Pre–drilled Holes']);
				if (
					mounting !== 'Stud Mount' &&
					mounting !== 'Plain' &&
					mounting !== 'Pre–drilled Holes'
				) {
					setMounting('');
				}
				setEdgesOptions(['Square']);
			}
		} else {
			setEdgesOptions(['Square']);
			setEdges('Square');
			// if mounting is not in mountingOptionsDefault, set blank
			if (!mountingOptionsDefault.includes(mounting)) {
				setMounting('');
			}
			setMountingOptions(mountingOptionsDefault);
			setStudLength('');
		}
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
		material,
		metalThickness,
		width,
		height,
		waterproof,
		edges,
		finishing,
		mounting,
		sets,
	]);

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
						options={anodizedColorOptions.map((option) => (
							<option
								key={option}
								value={option}
								defaultValue={option === anodizedColor}
							>
								{option}
							</option>
						))}
						value={anodizedColor}
					/>
				)}

				<Dropdown
					title="GRAPHICS STYLE"
					onChange={(e) => setGraphicsStyle(e.target.value)}
					options={graphicsStyleOptions.map((option) => (
						<option
							key={option}
							value={option}
							defaultValue={option === graphicsStyle}
						>
							{option}
						</option>
					))}
					value={graphicsStyle}
				/>

				<Dropdown
					title="EDGES"
					onChange={(e) => setEdges(e.target.value)}
					options={edgesOptions.map((option) => (
						<option key={option} value={option} defaultValue={option === edges}>
							{option}
						</option>
					))}
					value={edges}
				/>

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
				{(metalThickness === '1/4" (6mm)' ||
					metalThickness === '3/8" (9mm)' ||
					metalThickness === '1/2" (12mm)') && (
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
