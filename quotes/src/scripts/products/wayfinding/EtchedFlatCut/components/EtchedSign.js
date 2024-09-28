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
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	EXCHANGE_RATE,
	INDOOR_NOT_WATERPROOF,
} from '../../../../utils/defaults';

export const EtchedSign = ({ item }) => {
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

	const neonSignsWidth = useMemo(() => {
		return arrayRange(5, 92, 1);
	}, []);

	const neonSignsHeight = useMemo(() => {
		return arrayRange(5, 46, 1);
	}, []);

	const neonLengthOptions = useMemo(() => {
		return arrayRange(2, 100, 1, false);
	}, []);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [mounting, setMounting] = useState(item.mounting ?? 'Standard Nails');
	const [sets, setSets] = useState(item.sets ?? 1);

	const [setOptions, setSetOptions] = useState([<option value="1">1</option>]);

	const [quantityDiscountTable, setQuantityDiscountTable] = useState([]);

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
		} catch (error) {
			console.error('Error fetching discount table pricing:', error);
		} finally {
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
		}
	}

	useEffect(() => {
		fetchQuantityDiscountPricing();
	}, []);

	const colorRef = useRef(null);

	const updateSignage = useCallback(() => {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					waterproof,
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
		usdPrice,
		cadPrice,
		cadSinglePrice,
		usdSinglePrice,
		usdDiscount,
		cadDiscount,
	]);

	const checkAndAddMissingFields = useCallback(() => {
		const missingFields = [];

		if (!mounting) missingFields.push('Select Mounting');
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
	}, [fileUrls, color, waterproof, mounting, sets, width, height]);

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

	useEffect(() => {
		if (quantityDiscountTable.length > 0) {
			const { singlePrice, total, totalWithoutDiscount, discount } =
				computePricing();
			if (total && singlePrice) {
				setUsdPrice(total);
				setCadPrice((total * EXCHANGE_RATE).toFixed(2));
				setUsdSinglePrice(singlePrice);
				setCadSinglePrice((singlePrice * EXCHANGE_RATE).toFixed(2));
				setUsdDiscount(discount.toFixed(2));
				setCadDiscount((discount * EXCHANGE_RATE).toFixed(2));
				setCadTotalNoDiscount(
					(totalWithoutDiscount * EXCHANGE_RATE).toFixed(2)
				);
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
		}
	}, [width, height, waterproof, mounting, sets]);

	const handleOnChangeSets = (e) => {
		const value = e.target.value;
		setSets(value);
	};

	const handledSelectedColors = (selectedColors) => {
		setColor(selectedColors.map((option) => option).join(', '));
	};

	const handleComments = (e) => {
		updateSignageItem(item.id, 'comments', e.target.value);
	};

	const handleOnChangeWaterproof = (e) => {
		setWaterproof(e.target.value);
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
