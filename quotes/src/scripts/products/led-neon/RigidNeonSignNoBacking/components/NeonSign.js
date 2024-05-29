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
import { convertJson } from '../../../../utils/ConvertJson';
import { quantityDiscount } from '../../../../utils/Pricing';
import {
	arrayRange,
	spacerStandoffDefaultOptions,
} from '../../../../utils/SignageOptions';
import { NeonColors } from '../../components/NeonColors';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	M4_STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import {
	ledSpacerStandoffDefaultOptions,
	remoteControlOptions,
} from '../../neonSignOptions';

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
	{
		option: 'Outdoor (Waterproof)',
	},
];

const rigidNoBackingMountingOptions = [
	{
		option: 'Plastic Nails',
	},
	{
		option: 'M4 Stud',
	},
	{
		option: M4_STUD_WITH_SPACER,
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
	const [openNeonColor, setOpenNeonColor] = useState(false);
	const [width, setWidth] = useState(item.neonSignWidth ?? '');
	const [neonLength8mm, setNeonLength8mm] = useState(item.neonLength8mm ?? '');
	const [rigidM4StudLength, setRigidM4StudLength] = useState(
		item.rigidM4StudLength ?? ''
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
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [remoteControl, setRemoteControl] = useState(
		item.remoteControl ?? 'No'
	);

	const [wireTypeOptions, setWireTypeOptions] = useState([
		{
			option: '6ft open wires',
		},
		{
			option: '10ft open wires',
		},
	]);

	const [wireType, setWireType] = useState(item.wireType ?? '');

	const neonSignsWidthHeight = useMemo(() => {
		return arrayRange(3, 200, 1);
	}, []);

	const neonLength = useMemo(() => {
		return arrayRange(1, 100, 1, false);
	}, []);

	const [waterproof, setWaterproof] = useState(item.rigidWaterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');
	const [sets, setSets] = useState(item.sets ?? 1);
	const [setOptions, setSetOptions] = useState([<option value="1">1</option>]);

	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState([
		{ value: '0.5"' },
		{ value: '1"' },
	]);

	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance ?? ''
	);

	const [quantityDiscountTable, setQuantityDiscountTable] = useState([]);

	useEffect(() => {
		async function fetchQuantityDiscountPricing() {
			try {
				const response = await fetch(
					NovaQuote.quantity_discount_api + item.product
				);
				const data = await response.json();
				const tableJson = data.pricing_table
					? convertJson(data.pricing_table)
					: [];
				setQuantityDiscountTable(tableJson);

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

	const handledSelectedColors = (selectedColors) => {
		setNeonColor(selectedColors.map((option) => option.name).join(', '));
	};

	const handleOnChangeWireType = (e) => {
		const value = e.target.value;
		setWireType(value);
	};

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleOnChangeStudLength = (e) => {
		const target = e.target.value;
		setRigidM4StudLength(target);

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

	const updateSignage = useCallback(() => {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					rigidWaterproof: waterproof,
					neonColor: neonColor,
					mounting,
					spacerStandoffDistance,
					fileNames,
					filePaths,
					fileUrls,
					files,
					sets,
					usdPrice,
					cadPrice,
					cadSinglePrice,
					usdSinglePrice,
					neonLength8mm,
					neonLength10mm,
					neonLength14mm,
					neonLength20mm,
					remoteControl,
					neonSignWidth: width,
					neonSignHeight: height,
					wireType,
					rigidM4StudLength,
				};
			}
			return sign;
		});
		setSignage(updatedSignage);
	}, [
		waterproof,
		neonColor,
		mounting,
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
		rigidM4StudLength,
		spacerStandoffDistance,
		usdPrice,
		cadPrice,
		cadSinglePrice,
		usdSinglePrice,
		wireType,
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

		if (mounting && mounting !== 'Plastic Nails') {
			if (!rigidM4StudLength) missingFields.push('Select M4 Stud Length');
			if (!spacerStandoffDistance) missingFields.push('Select Standoff Space');
		}

		if (!remoteControl) missingFields.push('Select Remote Control');

		if (!neonColor) missingFields.push('Select Neon Colors');

		if (!waterproof) missingFields.push('Select Environment');

		if (!wireType) missingFields.push('Select Wire Type');

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
		neonColor,
		waterproof,
		mounting,
		sets,
		width,
		height,
		remoteControl,
		neonLength8mm,
		neonLength10mm,
		neonLength14mm,
		neonLength20mm,
		rigidM4StudLength,
		spacerStandoffDistance,
		wireType,
	]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	const computePricing = () => {
		if (!width || !height) return 0;

		const L1 = neonLength8mm ? parseInt(neonLength8mm) : 0;
		const L2 = neonLength10mm ? parseInt(neonLength10mm) : 0;
		const L3 = neonLength14mm ? parseInt(neonLength14mm) : 0;
		const L4 = neonLength20mm ? parseInt(neonLength20mm) : 0;

		let tempTotal =
			L1 * 15 +
			L2 * 13 +
			L3 * 15 +
			L4 * 25 +
			(parseInt(width) + 1) * (parseInt(height) + 1) * 0.075 +
			10;

		tempTotal = tempTotal > 79 ? tempTotal : 79;

		if (waterproof) {
			tempTotal *=
				waterproof === INDOOR_NOT_WATERPROOF || waterproof === 'N/A' ? 1 : 1.3;
		}

		let remotePrice = 0;

		if (remoteControl === 'Yes') {
			remotePrice = 16;
		}

		tempTotal += remotePrice;

		let total = tempTotal * parseInt(sets);

		const discount = quantityDiscount(sets, quantityDiscountTable);

		total *= discount;

		return {
			singlePrice: tempTotal,
			total: total.toFixed(2),
		};
	};

	useEffect(() => {
		const { singlePrice, total } = computePricing();
		if (total && singlePrice) {
			setUsdPrice(total);
			setCadPrice((total * EXCHANGE_RATE).toFixed(2));
			setUsdSinglePrice(singlePrice);
			setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(2));
		}
	}, [
		width,
		height,
		waterproof,
		mounting,
		remoteControl,
		neonLength8mm,
		neonLength10mm,
		neonLength14mm,
		neonLength20mm,
		rigidM4StudLength,
		sets,
		quantityDiscountTable,
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

		setWireType(
			target === INDOOR_NOT_WATERPROOF ? '6ft open wires' : '10ft open wires'
		);
		setWireTypeOptions(
			target === INDOOR_NOT_WATERPROOF
				? [
						{
							option: '6ft open wires',
						},
				  ]
				: [
						{
							option: '10ft open wires',
						},
				  ]
		);
	};

	const handleOnChangeRemote = (e) => {
		const value = e.target.value;
		setRemoteControl(value);
	};

	const handleOnSpacer = (e) => {
		setRigidM4StudLength(e.target.value);
	};

	const handleOnChangeMounting = (e) => {
		const target = e.target.value;
		if (target === 'Plastic Nails') {
			setRigidM4StudLength('');
			setSpacerStandoffDistance('');
		}
		if (target !== 'Plastic Nails' && !rigidM4StudLength) {
			setRigidM4StudLength('1.5"');
		}
		setMounting(target);
	};

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
					options={neonSignsWidthHeight}
				/>

				<Dropdown
					title="Neon Sign Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={neonSignsWidthHeight}
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

				{waterproof !== 'Outdoor (Not Waterproof)' && (
					<>
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
					</>
				)}

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
					title="Mounting Options"
					onChange={handleOnChangeMounting}
					options={rigidNoBackingMountingOptions.map((option) => (
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

				{(mounting === 'M4 Stud' || mounting === M4_STUD_WITH_SPACER) && (
					<Dropdown
						title="M4 Stud Length"
						onChange={handleOnChangeStudLength}
						options={ledSpacerStandoffDefaultOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
								selected={option.value === rigidM4StudLength}
							>
								{option.value}
							</option>
						))}
						value={rigidM4StudLength}
					/>
				)}

				{mounting === M4_STUD_WITH_SPACER && (
					<Dropdown
						title="STANDOFF SPACE"
						onChange={handleonChangeSpacerDistance}
						options={spacerStandoffOptions.map((option) => (
							<option
								value={option.value}
								selected={option.value == spacerStandoffDistance}
							>
								{option.value}
							</option>
						))}
						value={spacerStandoffDistance}
					/>
				)}

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

				<NeonColors
					colorRef={neonColorRef}
					colors={neonColor}
					toggle={() => {
						setOpenNeonColor((prev) => !prev);
					}}
					openColor={openNeonColor}
					setToogle={setOpenNeonColor}
					getSelectedColors={handledSelectedColors}
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
