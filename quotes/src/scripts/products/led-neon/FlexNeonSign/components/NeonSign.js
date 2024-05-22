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
import { arrayRange, setOptions } from '../../../../utils/SignageOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
} from '../../../../utils/defaults';

import {
	acrylicBackingOptions,
	neonColorOptions,
	neonSignsMountingOptions,
	remoteControlOptions,
	waterProofOptions,
	wireExitLocationOptions,
} from '../../neonSignOptions';

export const NeonSign = ({ item }) => {
	const { signage, setSignage, setMissing, updateSignageItem } =
		useAppContext();

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);
	const [color, setColor] = useState(item.neonColor ?? '');
	const [openColor, setOpenColor] = useState(false);
	const [width, setWidth] = useState(item.neonSignWidth ?? '');
	const [height, setHeight] = useState(item.neonSignHeight ?? '');
	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [neonUsed, setNeonUsed] = useState(item.neonUsed ?? '');
	const [remoteControl, setRemoteControl] = useState(
		item.remoteControl ?? 'No'
	);
	const [wireExitLocation, setWireExitLocation] = useState(
		item.wireExitLocation ?? 'Bottom Right'
	);
	const [acrylicBackingOption, setAcrylicBackingOption] = useState(
		item.acrylicBackingOption ?? ''
	);

	const acrylicBackingSelections = acrylicBackingOptions.map((item) => (
		<option value={item.option}>{item.option}</option>
	));

	const neonSignsWidthHeight = useMemo(() => {
		return arrayRange(5, 40, 1);
	}, []);

	const neonUsedOptions = useMemo(() => {
		return arrayRange(10, 60, 2);
	}, []);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? '');
	const [sets, setSets] = useState(item.sets ?? 1);

	const colorRef = useRef(null);

	const colorSelections = useMemo(
		() => (
			<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
				{neonColorOptions.map((color) => (
					<div
						key={color.id} // Assuming each color has a unique 'id'
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
					waterproof,
					neonColor: color?.name,
					mounting,
					fileNames,
					filePaths,
					fileUrls,
					files,
					sets,
					usdPrice,
					cadPrice,
					neonUsed,
					neonSignWidth: width,
					neonSignHeight: height,
					acrylicBackingOption,
					wireExitLocation,
				};
			}
			return sign;
		});
		setSignage(updatedSignage);
	}, [
		waterproof,
		color,
		mounting,
		fileNames,
		filePaths,
		fileUrls,
		files,
		sets,
		width,
		height,
		neonUsed,
		acrylicBackingOption,
		remoteControl,
		wireExitLocation,
		usdPrice,
		cadPrice,
	]);

	const checkAndAddMissingFields = useCallback(() => {
		const missingFields = [];

		if (!width) missingFields.push('Select Neon Sign Width');
		if (!height) missingFields.push('Select Neon Sign Height');
		if (!neonUsed) missingFields.push('Select Neon Used(ft)');
		if (!acrylicBackingOption) missingFields.push('Acrylic Backing Option');
		if (!mounting) missingFields.push('Select Mounting');
		if (!remoteControl) missingFields.push('Select Remote Control');
		if (!wireExitLocation) missingFields.push('Select Wire Exit Location');
		if (!color) missingFields.push('Select Color');

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
		waterproof,
		mounting,
		sets,
		width,
		height,
		neonUsed,
		neonUsed,
		acrylicBackingOption,
		remoteControl,
		wireExitLocation,
	]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	const computePricing = () => {
		if (!width || !height || !neonUsed || !waterproof || !acrylicBackingOption)
			return 0;
		let tempTotal =
			(parseInt(width) + 3) * (parseInt(height) + 3) * 0.11 +
			parseInt(neonUsed) * 6.9 +
			25;

		tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.15;

		let additional = 0;

		if (acrylicBackingOption === 'UV Printed Backing') {
			additional = parseInt(width) * parseInt(height) * 0.25;
			tempTotal += additional;
		}
		if (acrylicBackingOption === 'Frosted Clear Backing') {
			additional = parseInt(width) * parseInt(height) * 0.1;
			tempTotal += additional;
		}
		if (acrylicBackingOption === 'Clear Backing') {
			additional = parseInt(width) * parseInt(height) * 0.17;
			tempTotal += additional;
		}

		let mountingPrice = 0;

		if (mounting === 'Advertising Nails(1.5")') {
			mountingPrice = 8;
		}
		if (mounting === 'Hanging Chain') {
			mountingPrice = 10;
		}

		tempTotal += mountingPrice;

		let remotePrice = 0;

		if (remoteControl === 'Yes') {
			remotePrice = 7;
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
		neonUsed,
		waterproof,
		acrylicBackingOption,
		mounting,
		remoteControl,
		sets,
	]);

	const handleOnChangeSets = (e) => {
		const value = e.target.value;
		setSets(value);
	};

	const handleOnChangeRemote = (e) => {
		const value = e.target.value;
		setRemoteControl(value);
	};

	const handleOnChangeWireExitLocation = (e) => {
		const value = e.target.value;
		setWireExitLocation(value);
	};

	const handleComments = (e) => {
		updateSignageItem(item.id, 'comments', e.target.value);
	};

	const handleOnChangeWaterproof = (e) => {
		setWaterproof(e.target.value);
	};

	const handleOnChangeMounting = (e) => {
		setMounting(e.target.value);
	};

	useOutsideClick([colorRef], () => {
		if (!openColor) return;
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
					title="Neon Used(ft)"
					value={neonUsed}
					onChange={(e) => setNeonUsed(e.target.value)}
					options={neonUsedOptions}
				/>
				<Dropdown
					title="Acrylic Backing"
					value={acrylicBackingOption}
					onChange={(e) => setAcrylicBackingOption(e.target.value)}
					options={acrylicBackingSelections}
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
					onlyValue={true}
				/>

				<Dropdown
					title="Remote Control"
					onChange={handleOnChangeRemote}
					options={remoteControlOptions.map((option) => (
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

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Color
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							color.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => {
							setOpenColor((prev) => !prev);
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
					{openColor && colorSelections}
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
