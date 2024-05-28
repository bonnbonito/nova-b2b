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
import { NeonColors } from '../../components/NeonColors';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
} from '../../../../utils/defaults';

import {
	acrylicBackingOptions,
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
	const [neonLength, setNeonLength] = useState(item.neonLength ?? '');
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

	const neonSignsWidth = useMemo(() => {
		return arrayRange(5, 92, 1);
	}, []);

	const neonSignsHeight = useMemo(() => {
		return arrayRange(5, 46, 1);
	}, []);

	const neonLengthOptions = useMemo(() => {
		return arrayRange(2, 100, 2, false);
	}, []);

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
					neonColor: color,
					mounting,
					fileNames,
					filePaths,
					fileUrls,
					files,
					sets,
					usdPrice,
					cadPrice,
					neonLength,
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
		neonLength,
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
		if (!neonLength) missingFields.push('Select Neon Used(ft)');
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
		neonLength,
		acrylicBackingOption,
		remoteControl,
		wireExitLocation,
	]);

	useEffect(() => {
		updateSignage();
		checkAndAddMissingFields();
	}, [updateSignage, checkAndAddMissingFields]);

	const computePricing = () => {
		if (
			!width ||
			!height ||
			!neonLength ||
			!waterproof ||
			!acrylicBackingOption
		)
			return 0;
		let tempTotal =
			(parseInt(width) + 3) * (parseInt(height) + 3) * 0.1 +
			parseInt(neonLength) * 6.9 +
			10;

		/* minimum price */
		tempTotal = tempTotal > 59 ? tempTotal : 59;

		/*oversize surcharge*/
		tempTotal += parseInt(width) > 41 || parseInt(height) > 41 ? 150 : 0;

		tempTotal *= waterproof === INDOOR_NOT_WATERPROOF ? 1 : 1.15;

		let additional = 0;

		if (acrylicBackingOption === 'UV Printed Acrylic') {
			additional = parseInt(width) * parseInt(height) * 0.05;
			tempTotal += additional;
		}
		if (acrylicBackingOption === 'Frosted Clear Acrylic') {
			additional = parseInt(width) * parseInt(height) * 0.05;
			tempTotal += additional;
		}
		if (acrylicBackingOption === 'Clear Acrylic') {
			additional = parseInt(width) * parseInt(height) * 0.07;
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
		neonLength,
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

	const handledSelectedColors = (selectedColors) => {
		setColor(selectedColors.map((option) => option.name).join(', '));
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
				<Dropdown
					title="Neon Length(ft)"
					value={neonLength}
					onChange={(e) => setNeonLength(e.target.value)}
					options={neonLengthOptions}
				/>
				<Dropdown
					title="Backing"
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

				<NeonColors
					colorRef={colorRef}
					colors={color}
					toggle={() => {
						setOpenColor((prev) => !prev);
					}}
					openColor={openColor}
					setToogle={setOpenColor}
					getSelectedColors={handledSelectedColors}
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
