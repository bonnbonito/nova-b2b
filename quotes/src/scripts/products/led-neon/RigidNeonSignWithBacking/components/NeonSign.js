import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useAppContext } from '../../../../AppProvider';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import ColorsDropdown from '../../../../utils/ColorsDropdown';
import { convertJson } from '../../../../utils/ConvertJson';
import { quantityDiscount } from '../../../../utils/Pricing';
import { arrayRange } from '../../../../utils/SignageOptions';
import { NeonColors } from '../../components/NeonColors';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
} from '../../../../utils/defaults';

import {
	neonSignsMountingOptions,
	remoteControlOptions,
	rigidBackingOptions,
	wireExitLocationOptions,
} from '../../neonSignOptions';

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
];

const pcFinishOptions = [
	{
		option: 'Matte',
	},
];
const wireTypeOptions = [
	{
		option: '6ft Clear DC5521 female',
	},
	{
		option: '6ft Open Wires',
	},
];

export const NeonSign = ({ item }) => {
	const { signage, setSignage, setMissing, updateSignageItem } =
		useAppContext();

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [rcOptions, setRcOptions] = useState(remoteControlOptions);
	const [files, setFiles] = useState(item.files ?? []);
	const [neonColor, setNeonColor] = useState(item.neonColor ?? '');
	const [color, setColor] = useState(item.paintedPCColor ?? '');
	const [openNeonColor, setOpenNeonColor] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [width, setWidth] = useState(item.neonSignWidth ?? '');
	const [finish, setFinish] = useState(item.paintedPCFinish ?? '');
	const [customColor, setCustomColor] = useState(item.customColor ?? '');
	const [neonLength8mm, setNeonLength8mm] = useState(item.neonLength8mm ?? '');
	const [rigidBacking, setRigidBacking] = useState(
		item.rigidBacking ?? 'Frosted Clear PC'
	);
	const [wireExitLocation, setWireExitLocation] = useState(
		item.wireExitLocation ?? 'Bottom Right'
	);
	const [wireType, setWireType] = useState(
		item.wireType ?? '6ft Clear DC5521 female'
	);
	const [neonLength10mm, setNeonLength10mm] = useState(
		item.neonLength10mm ?? ''
	);
	const [neonLength14mm, setNeonLength14mm] = useState(
		item.neonLength14mm ?? ''
	);
	const [neonLength20mm, setNeonLength20mm] = useState(
		item.neonLength20mm ?? ''
	);
	const [height, setHeight] = useState(item.neonSignHeight ?? '');

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdDiscount, setUsdDiscount] = useState(item.usdDiscount ?? 0);
	const [usdTotalNoDiscount, setUsdTotalNoDiscount] = useState(
		item.usdTotalNoDiscount ?? ''
	);
	const [cadDiscount, setCadDiscount] = useState(item.cadDiscount ?? 0);
	const [cadTotalNoDiscount, setCadTotalNoDiscount] = useState(
		item.cadTotalNoDiscount ?? ''
	);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);

	const [remoteControl, setRemoteControl] = useState(
		item.remoteControl ?? 'No'
	);

	const neonSignsWidth = useMemo(() => {
		return arrayRange(5, 92, 1);
	}, []);
	const neonSignsHeight = useMemo(() => {
		return arrayRange(5, 46, 1);
	}, []);

	const neonLength = useMemo(() => {
		return arrayRange(1, 100, 1, false);
	}, []);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');
	const [sets, setSets] = useState(item.sets ?? 1);
	const [setOptions, setSetOptions] = useState([<option value="1">1</option>]);

	const [quantityDiscountTable, setQuantityDiscountTable] = useState([]);

	useEffect(() => {
		async function fetchQuantityDiscountPricing() {
			try {
				console.log(NovaQuote.quantity_discount_api + item.product);
				const response = await fetch(
					NovaQuote.quantity_discount_api + item.product
				);
				const data = await response.json();
				const tableJson = data.pricing_table
					? convertJson(data.pricing_table)
					: [];
				if (tableJson) setQuantityDiscountTable(tableJson);

				setSetOptions(
					Array.from(
						{
							length: 100,
						},
						(_, index) => {
							const val = 1 + index;
							return (
								<option key={index} value={val}>
									{val}
								</option>
							);
						}
					)
				);
			} catch (error) {
				console.error('Error fetching logo pricing:', error);
			}
		}

		fetchQuantityDiscountPricing();
	}, []);

	const neonColorRef = useRef(null);
	const colorRef = useRef(null);

	const handledSelectedColors = (selectedColors) => {
		setNeonColor(selectedColors.map((option) => option).join(', '));
	};

	const updateSignage = useCallback(() => {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					waterproof,
					neonColor: neonColor,
					paintedPCColor: color?.name,
					paintedPCFinish: finish,
					wireType,
					wireExitLocation,
					rigidBacking,
					mounting,
					fileNames,
					filePaths,
					fileUrls,
					files,
					sets,
					usdPrice,
					cadPrice,
					cadSinglePrice,
					usdSinglePrice,
					usdDiscount,
					usdTotalNoDiscount,
					cadTotalNoDiscount,
					cadDiscount,
					neonLength8mm,
					neonLength10mm,
					neonLength14mm,
					neonLength20mm,
					remoteControl,
					customColor,
					neonSignWidth: width,
					neonSignHeight: height,
				};
			}
			return sign;
		});
		setSignage(updatedSignage);
	}, [
		waterproof,
		neonColor,
		customColor,
		rigidBacking,
		color,
		mounting,
		finish,
		fileNames,
		filePaths,
		fileUrls,
		files,
		sets,
		width,
		height,
		remoteControl,
		neonLength8mm,
		neonLength14mm,
		neonLength10mm,
		neonLength20mm,
		wireType,
		wireExitLocation,
		usdPrice,
		cadPrice,
		cadSinglePrice,
		usdSinglePrice,
		usdDiscount,
		usdTotalNoDiscount,
		cadTotalNoDiscount,
		cadDiscount,
	]);

	const checkAndAddMissingFields = useCallback(() => {
		const missingFields = [];

		if (!width) missingFields.push('Select Neon Sign Width');
		if (!height) missingFields.push('Select Neon Sign Height');

		if (
			!neonLength8mm &&
			!neonLength14mm &&
			!neonLength10mm &&
			!neonLength20mm
		) {
			missingFields.push(
				'Set one of 8mm Neon Length, 10mm Neon Length, 14mm Neon Length, 20mm Neon Length'
			);
		}

		if (!mounting) missingFields.push('Select Mounting');

		if (!remoteControl) missingFields.push('Select Remote Control');

		if (rigidBacking === 'Painted PC') {
			if (!color?.name) missingFields.push('Select Painted PC Color');

			if (!finish) missingFields.push('Select Painted PC Finish');

			if (color?.name === 'Custom Color' && !customColor) {
				missingFields.push('Add the Pantone color code of your custom color.');
			}
		}

		if (!wireType) missingFields.push('Select WireType');

		if (!neonColor) missingFields.push('Select Neon Colors');

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
	}, [
		fileUrls,
		color,
		neonColor,
		customColor,
		waterproof,
		mounting,
		finish,
		sets,
		width,
		height,
		rigidBacking,
		remoteControl,
		neonLength8mm,
		neonLength10mm,
		neonLength14mm,
		neonLength20mm,
		wireType,
		wireExitLocation,
	]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	const computePricing = useCallback(() => {
		if (!width || !height)
			return {
				singlePrice: 0,
				total: 0,
			};

		const L1 = neonLength8mm ? parseInt(neonLength8mm) : 0;
		const L2 = neonLength10mm ? parseInt(neonLength10mm) : 0;
		const L3 = neonLength14mm ? parseInt(neonLength14mm) : 0;
		const L4 = neonLength20mm ? parseInt(neonLength20mm) : 0;

		let tempTotal =
			L1 * 15 +
			L2 * 13 +
			L3 * 15 +
			L4 * 25 +
			(parseInt(width) + 2) * (parseInt(height) + 2) * 0.15 +
			25;

		// Minimum price
		tempTotal = tempTotal > 89 ? tempTotal : 89;

		// Oversize surcharge
		tempTotal += parseInt(width) > 41 || parseInt(height) > 41 ? 150 : 0;

		let rigidBackingPrice = 0;

		switch (rigidBacking) {
			case 'Black PC':
				rigidBackingPrice = parseInt(width) * parseInt(height) * 0.02;
				break;
			case 'Clear Backing':
				rigidBackingPrice = parseInt(width) * parseInt(height) * 0.03;
				break;
			case 'UV Printed on PC':
				rigidBackingPrice = parseInt(width) * parseInt(height) * 0.015;
				break;
			case 'Painted PC':
				rigidBackingPrice = parseInt(width) * parseInt(height) * 0.03;
				break;
			default:
				rigidBackingPrice = 0;
		}

		tempTotal += rigidBackingPrice;

		let mountingPrice = 0;
		switch (mounting) {
			case 'Advertising Nails(1.5")':
				mountingPrice = 8;
				break;
			case 'Hanging Chain':
				mountingPrice = 10;
				break;
			default:
				mountingPrice = 0;
		}

		tempTotal += mountingPrice;

		let remotePrice = remoteControl === 'Yes' ? 16 : 0;

		tempTotal += remotePrice;

		let total = tempTotal * parseInt(sets);

		const discount = quantityDiscount(sets, quantityDiscountTable);

		let totalWithDiscount = total * discount;

		let discountPrice = total - totalWithDiscount;

		return {
			singlePrice: tempTotal ?? 0,
			total: totalWithDiscount?.toFixed(2) ?? 0,
			totalWithoutDiscount: total,
			discount: discountPrice,
		};
	}, [
		width,
		height,
		neonLength8mm,
		neonLength10mm,
		neonLength14mm,
		neonLength20mm,
		rigidBacking,
		mounting,
		remoteControl,
		sets,
		quantityDiscountTable,
	]);

	useEffect(() => {
		const { singlePrice, total, totalWithoutDiscount, discount } =
			computePricing();
		if (total && singlePrice) {
			setUsdPrice(total);
			setCadPrice((total * EXCHANGE_RATE).toFixed(2));
			setUsdSinglePrice(singlePrice);
			setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(2));
			setUsdDiscount(discount.toFixed(2));
			setCadDiscount((discount * EXCHANGE_RATE).toFixed(2));
			setCadTotalNoDiscount((totalWithoutDiscount * EXCHANGE_RATE).toFixed(2));
			setUsdTotalNoDiscount(totalWithoutDiscount.toFixed(2));
		} else {
			setUsdPrice(0);
			setCadPrice(0);
			setUsdSinglePrice(0);
			setCadSinglePrice(0);
			setUsdDiscount('');
			setCadDiscount('');
			setCadTotalNoDiscount('');
			setUsdTotalNoDiscount('');
		}
	}, [
		width,
		height,
		mounting,
		remoteControl,
		neonLength8mm,
		neonLength10mm,
		neonLength14mm,
		neonLength20mm,
		rigidBacking,
		sets,
	]);

	const handleOnChangeSets = (e) => {
		const value = e.target.value;
		setSets(value);
	};

	const handleComments = (e) => {
		updateSignageItem(item.id, 'comments', e.target.value);
	};

	const handleOnChangeWaterproof = (e) => {
		const target = e.target.value;

		if (target !== INDOOR_NOT_WATERPROOF) {
			if (neonLength8mm) {
				setNeonLength8mm('');
			}

			if (neonLength10mm) {
				setNeonLength10mm('');
			}

			setRcOptions([
				{
					option: 'N/A',
				},
			]);
			setRemoteControl('N/A');
		} else {
			if (remoteControl === 'N/A') {
				setRemoteControl('No');
			}
			setRcOptions(remoteControlOptions);
		}
		setWaterproof(target);
	};

	const handleOnChangeRemote = (e) => {
		const value = e.target.value;
		setRemoteControl(value);
	};

	const handleOnChangeWireExitLocation = (e) => {
		const value = e.target.value;
		setWireExitLocation(value);
	};

	const handleOnChangeWireType = (e) => {
		const value = e.target.value;
		setWireType(value);
	};

	const handleOnChangeMounting = (e) => {
		const target = e.target.value;
		setMounting(target);
	};

	const handleOnChangeBacking = (e) => {
		const target = e.target.value;
		if (target !== 'Painted PC') {
			setColor('');
			setFinish('');
		}
		setRigidBacking(target);
	};

	const handleOnFinish = (e) => {
		const target = e.target.value;
		setFinish(target);
	};

	useOutsideClick([neonColorRef, colorRef], () => {
		if (!openNeonColor && !openColor) return;
		setOpenNeonColor(false);
		setOpenColor(false);
	});

	return (
		<>
			{item.productLine && (
				<div className="py-4 mb-4">
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
				</div>
			)}

			<div className="quote-grid mb-6">
				<Dropdown
					title="Neon Sign Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={neonSignsWidth}
				/>

				<Dropdown
					title="Neon Sign Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={neonSignsHeight}
				/>

				<NeonColors
					colorRef={neonColorRef}
					colors={neonColor}
					toggle={() => {
						setOpenNeonColor((prev) => !prev);
						setOpenColor(false);
					}}
					openColor={openNeonColor}
					setToogle={setOpenNeonColor}
					getSelectedColors={handledSelectedColors}
				/>

				<Dropdown
					title="8mm Neon Length"
					value={neonLength8mm}
					onChange={(e) => setNeonLength8mm(e.target.value)}
					options={neonLength}
				/>
				<Dropdown
					title="10mm Neon Length"
					value={neonLength10mm}
					onChange={(e) => setNeonLength10mm(e.target.value)}
					options={neonLength}
				/>

				<Dropdown
					title="14mm Neon Length"
					value={neonLength14mm}
					onChange={(e) => setNeonLength14mm(e.target.value)}
					options={neonLength}
				/>
				<Dropdown
					title="20mm Neon Length"
					value={neonLength20mm}
					onChange={(e) => setNeonLength20mm(e.target.value)}
					options={neonLength}
				/>

				<Dropdown
					title="Backing Options"
					onChange={handleOnChangeBacking}
					options={rigidBackingOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							selected={option.option === rigidBacking}
						>
							{option.option}
						</option>
					))}
					value={rigidBacking}
					onlyValue={true}
				/>

				{rigidBacking === 'Painted PC' && (
					<>
						<ColorsDropdown
							ref={colorRef}
							title="Painted PC Color"
							colorName={color?.name ?? ''}
							openColor={openColor}
							toggleColor={() => {
								setOpenColor((prev) => !prev);
								setOpenNeonColor(false);
							}}
							colorOptions={colorOptions}
							selectColor={(color) => {
								setColor(color);
								setOpenColor(false);
							}}
						/>

						<Dropdown
							title="Painted PC Finish"
							onChange={handleOnFinish}
							options={pcFinishOptions.map((option) => (
								<option
									key={option.option}
									value={option.option}
									selected={option.option === finish}
								>
									{option.option}
								</option>
							))}
							value={finish}
						/>
					</>
				)}

				<Dropdown
					title="Mounting Options"
					onChange={handleOnChangeMounting}
					options={neonSignsMountingOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							selected={option.option === mounting}
						>
							{option.option}
						</option>
					))}
					value={mounting}
				/>

				<Dropdown
					title="Remote Control"
					onChange={handleOnChangeRemote}
					options={rcOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							selected={option.option === remoteControl}
						>
							{option.option}
						</option>
					))}
					value={remoteControl}
					onlyValue={true}
				/>

				<Dropdown
					title="Wire Exit Location"
					onChange={handleOnChangeWireExitLocation}
					options={wireExitLocationOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							selected={option.option === wireExitLocation}
						>
							{option.option}
						</option>
					))}
					value={wireExitLocation}
					onlyValue={true}
				/>

				<Dropdown
					title="Wire Type"
					onChange={handleOnChangeWireType}
					options={wireTypeOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							selected={option.option === wireType}
						>
							{option.option}
						</option>
					))}
					value={wireType}
					onlyValue={true}
				/>

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
					options={waterProofOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							selected={option.option === waterproof}
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
						value={item.comments}
						onChange={handleComments}
						placeholder="ADD COMMENTS"
						rows={4}
					/>
				</div>
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

export default memo(NeonSign);
