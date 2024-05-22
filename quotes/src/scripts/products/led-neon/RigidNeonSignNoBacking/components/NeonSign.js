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
import {
	arrayRange,
	setOptions,
	spacerStandoffDefaultOptions,
} from '../../../../utils/SignageOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
	M4_STUD_WITH_SPACER,
} from '../../../../utils/defaults';

import {
	baseColorOptions,
	neonColorOptions,
	remoteControlOptions,
} from '../../neonSignOptions';

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
	{
		option: 'Outdoor (Not Waterproof)',
	},
];

const rigidNoBackingMountingOptions = [
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
	const [color, setColor] = useState(item.baseColor ?? '');
	const [openNeonColor, setOpenNeonColor] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [width, setWidth] = useState(item.neonSignWidth ?? '');
	const [customColor, setCustomColor] = useState(item.customColor ?? '');
	const [neonLength8mm, setNeonLength8mm] = useState(item.neonLength8mm ?? '');
	const [rigidStandOffSpace, setRigidStandOffSpace] = useState(
		item.rigidStandOffSpace ?? ''
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
	const [remoteControl, setRemoteControl] = useState(
		item.remoteControl ?? 'No'
	);

	const neonSignsWidthHeight = useMemo(() => {
		return arrayRange(5, 95, 1);
	}, []);

	const neonLength = useMemo(() => {
		return arrayRange(2, 100, 2);
	}, []);

	const [waterproof, setWaterproof] = useState(item.rigidWaterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');
	const [sets, setSets] = useState(item.sets ?? 1);

	const neonColorRef = useRef(null);
	const colorRef = useRef(null);

	const colorSelections = useMemo(
		() => (
			<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
				{neonColorOptions.map((color) => (
					<div
						key={color.id} // Assuming each color has a unique 'id'
						className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
						onClick={() => {
							setNeonColor(color);
							setOpenNeonColor(false);
						}}
					>
						<span
							className="w-[18px] h-[18px] inline-block rounded-full border"
							style={{
								background:
									color.name === 'Custom Color'
										? `conic-gradient(from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: color.color,
							}}
						></span>
						{color.name}
					</div>
				))}
			</div>
		),
		[neonColorOptions]
	);

	const updateSignage = useCallback(() => {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					rigidWaterproof: waterproof,
					neonColor: neonColor?.name,
					baseColor: color?.name,
					mounting,
					fileNames,
					filePaths,
					fileUrls,
					files,
					sets,
					usdPrice,
					cadPrice,
					neonLength8mm,
					neonLength10mm,
					neonLength14mm,
					neonLength20mm,
					remoteControl,
					customColor,
					neonSignWidth: width,
					neonSignHeight: height,
					rigidStandOffSpace,
				};
			}
			return sign;
		});
		setSignage(updatedSignage);
	}, [
		waterproof,
		neonColor,
		customColor,
		color,
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
		rigidStandOffSpace,
		usdPrice,
		cadPrice,
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

		if (mounting && mounting === M4_STUD_WITH_SPACER) {
			if (!rigidStandOffSpace) missingFields.push('Select Standoff Space');
		}

		if (!remoteControl) missingFields.push('Select Remote Control');
		if (!color) missingFields.push('Select Color');

		if (color?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (!neonColor) missingFields.push('Select Neon Color');

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
		sets,
		width,
		height,
		remoteControl,
		neonLength8mm,
		neonLength10mm,
		neonLength14mm,
		neonLength20mm,
		rigidStandOffSpace,
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
			parseInt(width) * parseInt(height) * 0.2 +
			10;

		if (waterproof) {
			tempTotal *=
				waterproof === INDOOR_NOT_WATERPROOF || waterproof === 'N/A' ? 1 : 1.35;
		}

		if (mounting === M4_STUD_WITH_SPACER) {
			tempTotal *= 1.05;
		}

		if (color?.name && color?.name !== 'White') {
			tempTotal *= 1.1;
		}

		let remotePrice = 0;

		if (remoteControl === 'Yes') {
			remotePrice = 16;
		}

		tempTotal += remotePrice;

		tempTotal *= parseInt(sets);

		return tempTotal.toFixed(2);
	};

	useEffect(() => {
		const total = computePricing();
		if (total !== undefined || total !== 0) {
			setUsdPrice(total);
			setCadPrice((total * EXCHANGE_RATE).toFixed(2));
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
		color,
		rigidStandOffSpace,
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

	const handleOnSpacer = (e) => {
		setRigidStandOffSpace(e.target.value);
	};

	const handleOnChangeMounting = (e) => {
		const target = e.target.value;
		setMounting(target);
		if (target === M4_STUD_WITH_SPACER) {
			setRigidStandOffSpace('1.5"');
		}
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
					onlyValue={true}
				/>

				{mounting === M4_STUD_WITH_SPACER && (
					<Dropdown
						title="Standoff Space"
						onChange={handleOnSpacer}
						options={spacerStandoffDefaultOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
								selected={option.value === rigidStandOffSpace}
							>
								{option.value}
							</option>
						))}
						value={rigidStandOffSpace}
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

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Base Color
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							color.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => {
							setOpenColor((prev) => !prev);
							setOpenNeonColor(false);
						}}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									color.name == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: color.color,
							}}
						></span>
						{color.name === '' ? 'CHOOSE OPTION' : color.name}
					</div>
					{openColor && (
						<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
							{baseColorOptions.map((color) => {
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
											style={{
												background:
													color.name == 'Custom Color'
														? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
														: color.color,
											}}
										></span>
										{color.name}
									</div>
								);
							})}
						</div>
					)}
				</div>

				<div className="px-[1px] relative" ref={neonColorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Neon Color
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							neonColor.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => {
							setOpenNeonColor((prev) => !prev);
							setOpenColor(false);
						}}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									neonColor.name == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: neonColor.color,
							}}
						></span>
						{neonColor.name === '' ? 'CHOOSE OPTION' : neonColor.name}
					</div>
					{openNeonColor && colorSelections}
				</div>

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
