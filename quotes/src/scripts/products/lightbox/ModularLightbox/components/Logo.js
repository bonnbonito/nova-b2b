import React, { useEffect, useState } from 'react';
import Description from '../../../../Description';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';

import { useAppContext } from '../../../../AppProvider';

import { EXCHANGE_RATE } from '../../../../utils/defaults';

import {
	INDOOR_NOT_WATERPROOF,
	LIGHTING_INDOOR,
} from '../../../../utils/defaults';

import { setOptions } from '../../../../utils/SignageOptions';

import convert_json from '../../../../utils/ConvertJson';

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
];

const lightBoxTypeOptions = [
	{
		option: '12" Square',
		value: '12"',
	},
	{
		option: '16" Circle',
		value: '16"',
	},
];

const uvPrintedCoverOptions = [
	{
		option: 'Yes',
	},
	{
		option: 'No (White Blank Cover)',
	},
];

export function Logo({ item }) {
	const { signage, setSignage, setMissing, updateSignageItem } =
		useAppContext();

	const [lightboxType, setLightboxType] = useState(item.lightboxType ?? '');
	const [uvPrintedCover, setUvPrintedCover] = useState(
		item.uvPrintedCover ?? ''
	);

	const [waterproof, setWaterproof] = useState(
		item.waterproof ?? INDOOR_NOT_WATERPROOF
	);

	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [usdPrice, setUsdPrice] = useState(item.usdPrice ?? 0);
	const [cadPrice, setCadPrice] = useState(item.cadPrice ?? 0);
	const [usdSinglePrice, setUsdSinglePrice] = useState(
		item.usdSinglePrice ?? 0
	);
	const [cadSinglePrice, setCadSinglePrice] = useState(
		item.cadSinglePrice ?? 0
	);
	const [usdDiscount, setUsdDiscount] = useState(item.usdDiscount ?? 0);
	const [cadDiscount, setCadDiscount] = useState(item.cadDiscount ?? 0);

	const [logoPricingObject, setLogoPricingObject] = useState([]);

	const [sets, setSets] = useState(item.sets ?? 1);

	function updateSignage() {
		// Only proceed if the item to update exists in the signage array
		if (!signage.some((sign) => sign.id === item.id)) return;

		// Consolidate updated properties into a single object
		const updateDetails = {
			lightboxType: lightboxType,
			uvPrintedCover,
			waterproof,
			usdPrice,
			cadPrice,
			files,
			fileNames,
			filePaths,
			fileUrls,
			sets,
			usdSinglePrice,
			cadSinglePrice,
		};

		setSignage((prevSignage) =>
			prevSignage.map((sign) =>
				sign.id === item.id ? { ...sign, ...updateDetails } : sign
			)
		);
	}

	const handleComments = (e) => {
		updateSignageItem(item.id, 'comments', e.target.value);
	};

	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const handleOnChangeLightBox = (e) => {
		setLightboxType(e.target.value);
	};

	const handleOnChangeWaterproof = (e) => setWaterproof(e.target.value);

	const computePricing = () => {
		if (!lightboxType && !logoPricingObject.length > 0) return 0;

		let tempTotal = 0;

		const lightboxTable = logoPricingObject[0]?.logo_pricing.logo_pricing_table;

		if (lightboxTable && lightboxType) {
			const table = convert_json(lightboxTable);

			const filtered = table.find(
				(element) => parseInt(element.Sets) === parseInt(sets)
			);

			const val = lightBoxTypeOptions.find(
				(element) => element.option === lightboxType
			);

			tempTotal = parseFloat(filtered[val.value]);

			if (val && uvPrintedCover && uvPrintedCover === 'Yes') {
				if (val.value === '12"') {
					tempTotal += 5;
				} else {
					tempTotal += 6;
				}
			}

			let total = tempTotal * parseInt(sets);

			return {
				singlePrice: tempTotal ?? 0,
				total: total ?? 0,
			};
		} else {
			return {
				singlePrice: 0,
				total: 0,
			};
		}
	};

	useEffect(() => {
		const { singlePrice, total } = computePricing();
		if (total && singlePrice) {
			setUsdPrice(total);
			setCadPrice((total * EXCHANGE_RATE).toFixed(1));
			setUsdSinglePrice(singlePrice);
			setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(1));
		} else {
			setUsdPrice(0);
			setCadPrice(0);
			setUsdSinglePrice(0);
			setCadSinglePrice(0);
		}
	}, [lightboxType, logoPricingObject, uvPrintedCover, sets]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!lightboxType) missingFields.push('Select Light Box Type');

		if (!uvPrintedCover) missingFields.push('Select UV Printed Cover');

		if (uvPrintedCover && uvPrintedCover === 'Yes') {
			if (!fileUrls || fileUrls.length === 0)
				missingFields.push('Upload a PDF/AI File');
		}

		if (!waterproof) missingFields.push('Select Environment');

		if (!sets) missingFields.push('Select Quantity');

		if (uvPrintedCover === 'Yes' && !fileUrls) {
			missingFields.push('Upload a PDF/AI File');
		}

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
	}, [lightboxType, uvPrintedCover, waterproof, fileUrls, sets]);

	useEffect(() => {
		async function fetchLogoPricing() {
			try {
				const response = await fetch(NovaQuote.logo_pricing_api + item.product);
				const data = await response.json();
				setLogoPricingObject(data);
			} catch (error) {
				console.error('Error fetching logo pricing:', error);
			}
		}

		fetchLogoPricing();
	}, []);

	useEffect(() => {
		updateSignage();
	}, [
		lightboxType,
		uvPrintedCover,
		waterproof,
		fileUrls,
		sets,
		usdPrice,
		cadPrice,
		usdSinglePrice,
		cadSinglePrice,
	]);

	return (
		<>
			{item.productLine && (
				<div clasName="py-4 my-4">
					PRODUCT LINE: <span className="font-title">{item.productLine}</span>
				</div>
			)}

			<div className="quote-grid mb-6">
				<Dropdown
					title="Light Box Type"
					value={lightboxType}
					onChange={handleOnChangeLightBox}
					options={lightBoxTypeOptions.map((lightbox) => (
						<option
							value={lightbox.option}
							selected={lightbox.option === lightboxType}
						>
							{lightbox.option}
						</option>
					))}
				/>

				<Dropdown
					title="UV Printed Cover"
					value={uvPrintedCover}
					onChange={(e) => setUvPrintedCover(e.target.value)}
					options={uvPrintedCoverOptions.map((cover) => (
						<option
							value={cover.option}
							selected={cover.option === uvPrintedCover}
						>
							{cover.option}
						</option>
					))}
				/>

				<Dropdown
					title="Environment"
					onChange={handleOnChangeWaterproof}
					options={waterProofOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
					onlyValue={true}
				/>

				{waterproof === INDOOR_NOT_WATERPROOF && (
					<Dropdown
						title="Included Items"
						options={
							<option value={LIGHTING_INDOOR} selected={LIGHTING_INDOOR}>
								{LIGHTING_INDOOR}
							</option>
						}
						value={LIGHTING_INDOOR}
						onlyValue={true}
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
				<Description value={item.comments} handleComments={handleComments} />

				{uvPrintedCover === 'Yes' && (
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
				)}
			</div>
		</>
	);
}
