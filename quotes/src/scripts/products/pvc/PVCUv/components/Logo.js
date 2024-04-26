import React, { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../../../../Dropdown';
import UploadFiles from '../../../../UploadFiles';
import useOutsideClick from '../../../../utils/ClickOutside';
import { colorOptions } from '../../../../utils/ColorOptions';
import convert_json from '../../../../utils/ConvertJson';
import { getLogoPricingTablebyThickness } from '../../../../utils/Pricing';
import {
	setOptions,
	spacerStandoffDefaultOptions,
	studLengthOptions,
	waterProofOptions,
} from '../../../../utils/SignageOptions';

import {
	finishingOptions,
	installationOptions,
	thicknessOptions,
} from '../../pvcOptions';

import { QuoteContext } from '../PVCUv';

const exchangeRate = 1.3;

export default function Logo({ item }) {
	const {
		signage,
		setSignage,
		setMissing,
		tempFolder,
		isLoading,
		setIsLoading,
	} = useContext(QuoteContext);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(36);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [cadPrice, setCadPrice] = useState(item.cadPrice);
	const [fileName, setFileName] = useState(item.fileName);
	const [openColor, setOpenColor] = useState(false);
	const [pvcBaseColor, setPvcBaseColor] = useState(item.pvcBaseColor);
	const [customColor, setCustomColor] = useState(item.customColor);
	const [installation, setInstallation] = useState(item.installation);

	const [sets, setSets] = useState(item.sets);
	const handleOnChangeSets = (e) => {
		setSets(e.target.value);
	};

	const [studLength, setStudLength] = useState(item.studLength);

	const [spacerStandoffOptions, setSpacerStandoffOptions] = useState(
		spacerStandoffDefaultOptions
	);
	const [spacerStandoffDistance, setSpacerStandoffDistance] = useState(
		item.spacerStandoffDistance
	);

	const handleonChangeSpacerDistance = (e) => {
		setSpacerStandoffDistance(e.target.value);
	};

	const handleonChangeStudLength = (e) => {
		const target = e.target.value;
		setStudLength(target); // Directly set the value without a callback

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

	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);
	const [installationSelections, setInstallationSelections] =
		useState(installationOptions);

	const [maxWidthOptions, setMaxWidthOptions] = useState(
		Array.from(
			{
				length: maxWidthHeight,
			},
			(_, index) => {
				const val = 4 + index;
				return (
					<option key={index} value={val}>
						{val}"
					</option>
				);
			}
		)
	);

	const colorRef = useRef(null);

	const [height, setHeight] = useState(item.height);
	const [comments, setComments] = useState('');
	const [waterproof, setWaterproof] = useState(item.waterproof);

	const handleOnChangeInstallation = (e) => {
		const target = e.target.value;
		setInstallation(target);

		if (target === 'Stud with spacer' || target === 'Stud Mount') {
			if (target === 'Stud Mount') {
				setSpacerStandoffDistance('');
			}
		} else {
			setStudLength('');
			setSpacerStandoffDistance('');
		}
	};

	function handleComments(e) {
		setComments(e.target.value);
	}

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = thicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
	};

	useEffect(() => {
		if (parseInt(selectedThickness.value) > 3) {
			setMaxWidthHeight(42);
		} else {
			setMaxWidthHeight(23);
			if (height > 25) {
				setHeight('');
			}
			if (width > 25) {
				setWidth('');
			}
		}
	}, [selectedThickness]);

	const handleChangeFinishing = (e) => {
		setSelectedFinishing(e.target.value);
	};

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments: comments,
					thickness: selectedThickness,
					installation: installation,
					waterproof: waterproof,
					width: width,
					height: height,
					usdPrice: usdPrice,
					cadPrice: cadPrice,
					finishing: selectedFinishing,
					files: files,
					fileNames: fileNames,
					filePaths: filePaths,
					fileUrls: fileUrls,
					pvcBaseColor: pvcBaseColor,
					customColor: customColor,
					sets: sets,
					studLength: studLength,
					spacerStandoffDistance: spacerStandoffDistance,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		setComments(item.comments);
	}, []);

	useEffect(() => {
		updateSignage();
	}, [
		comments,
		selectedThickness,
		waterproof,
		width,
		height,
		installation,
		usdPrice,
		cadPrice,
		fileUrls,
		fileNames,
		selectedFinishing,
		files,
		filePaths,
		pvcBaseColor,
		customColor,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	const logoPricingObject = NovaQuote.logo_pricing_tables;

	useEffect(() => {
		if (
			width &&
			height &&
			selectedThickness &&
			waterproof &&
			logoPricingObject !== null
		) {
			const logoPricing = getLogoPricingTablebyThickness(
				`${selectedThickness.value}`,
				logoPricingObject
			);

			if (logoPricing !== undefined) {
				const logoPricingTable =
					logoPricing !== undefined ? convert_json(logoPricing) : [];
				const computed =
					logoPricingTable.length > 0 ? logoPricingTable[width - 4][height] : 0;

				let multiplier = 0;
				if (waterproof) {
					multiplier = waterproof === 'Indoor' ? 1 : 1.03;
				}

				let total = parseFloat((computed * multiplier).toFixed(2));

				total *= selectedFinishing === 'Gloss' ? 1.03 : 1;
				total *= installation === 'Double-sided tape' ? 1.01 : 1;
				total *= pvcBaseColor?.name === 'Black' ? 1.2 : 1.1;

				if (installation === 'Stud with spacer') {
					let spacer = total * 0.03 > 35 ? 35 : total * 0.03;
					spacer = parseFloat(spacer.toFixed(2));

					total += spacer;
				}

				total *= sets;

				setUsdPrice(parseFloat(total.toFixed(2)));
				setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
			} else {
				setUsdPrice(0);
				setCadPrice(0);
			}
		} else {
			setUsdPrice(0);
			setCadPrice(0);
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		installation,
		pvcBaseColor,
		installation,
		sets,
	]);

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!selectedThickness) missingFields.push('Select Acrylic Thickness');
		if (!width) missingFields.push('Select Logo Width');
		if (!height) missingFields.push('Select Logo Height');
		if (!waterproof) missingFields.push('Select Waterproof');
		if (!installation) missingFields.push('Select Installation');

		if (!pvcBaseColor.name) missingFields.push('Select PVC Base Color');
		if (pvcBaseColor?.name === 'Custom Color' && !customColor) {
			missingFields.push('Add the Pantone color code of your custom color.');
		}

		if (installation === 'Stud with spacer') {
			if (!studLength) missingFields.push('Select Stud Length');

			if (!spacerStandoffDistance) missingFields.push('Select STANDOFF SPACE');
		}

		if (!selectedFinishing) missingFields.push('Select Finishing');

		if (!fileUrls || fileUrls.length === 0)
			missingFields.push('Upload a PDF/AI File');

		if (!sets) missingFields.push('Select Quantity');

		if (!comments) missingFields.push('Add Comments');

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

				console.log(prevMissing);

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
	}, [
		width,
		comments,
		height,
		selectedThickness,
		installation,
		waterproof,
		fileUrls,
		fileNames,
		files,
		filePaths,
		selectedFinishing,
		sets,
		studLength,
		spacerStandoffDistance,
	]);

	useEffect(() => {
		if ('Outdoor' === waterproof) {
			if ('Double-sided tape' === installation) {
				setInstallation('');
			}
			let newOptions = installationOptions.filter(
				(option) => option.value !== 'Double-sided tape'
			);

			setInstallationSelections(newOptions);
		} else {
			setInstallationSelections(installationOptions);
		}
	}, [waterproof]);

	useOutsideClick([colorRef], () => {
		if (!openColor) return;
		setOpenColor(false);
	});

	useEffect(() => {
		pvcBaseColor?.name != 'Custom Color' && setCustomColor('');
	}, [pvcBaseColor]);

	return (
		<>
			<div className="quote-grid mb-6">
				<Dropdown
					title="Thickness"
					value={item.thickness?.value}
					onChange={handleOnChangeThickness}
					options={thicknessOptions.map((thickness) => (
						<option
							value={thickness.value}
							selected={thickness === item.thickness}
						>
							{thickness.thickness}
						</option>
					))}
				/>

				<Dropdown
					title="Logo Width"
					value={width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Logo Height"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthOptions}
				/>

				<div className="px-[1px] relative" ref={colorRef}>
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						PVC BASE COLOR
					</label>
					<div
						className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
							pvcBaseColor.name ? 'text-black' : 'text-[#dddddd]'
						}`}
						onClick={() => setOpenColor((prev) => !prev)}
					>
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									pvcBaseColor.name == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: pvcBaseColor.color,
							}}
						></span>
						{pvcBaseColor.name === '' ? 'CHOOSE OPTION' : pvcBaseColor.name}
					</div>
					{openColor && (
						<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
							{colorOptions.map((color) => {
								return (
									<div
										className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
										onClick={() => {
											setPvcBaseColor(color);
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

				<Dropdown
					title="Environment"
					onChange={(e) => setWaterproof(e.target.value)}
					options={waterProofOptions.map((option) => (
						<option
							value={option.option}
							selected={option.option == item.waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
				/>

				<Dropdown
					title="Finishing Options"
					onChange={handleChangeFinishing}
					options={finishingOptions.map((finishing) => (
						<option
							value={finishing.name}
							selected={finishing.name === item.finishing}
						>
							{finishing.name}
						</option>
					))}
					value={selectedFinishing}
				/>

				<Dropdown
					title="Installation"
					onChange={handleOnChangeInstallation}
					options={installationSelections.map((option) => (
						<option
							value={option.value}
							selected={option.value === installation}
						>
							{option.value}
						</option>
					))}
					value={item.installation}
				/>

				{installation === 'Stud with spacer' && (
					<>
						<Dropdown
							title="Stud Length"
							onChange={handleonChangeStudLength}
							options={studLengthOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == item.studLength}
								>
									{option.value}
								</option>
							))}
							value={item.studLength}
						/>
						<Dropdown
							title="STANDOFF SPACE"
							onChange={handleonChangeSpacerDistance}
							options={spacerStandoffOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == item.spacerStandoffDistance}
								>
									{option.value}
								</option>
							))}
							value={item.spacerStandoffDistance}
						/>
					</>
				)}

				{installation === 'Stud Mount' && (
					<>
						<Dropdown
							title="Stud Length"
							onChange={handleonChangeStudLength}
							options={studLengthOptions.map((option) => (
								<option
									value={option.value}
									selected={option.value == item.studLength}
								>
									{option.value}
								</option>
							))}
							value={item.studLength}
						/>
					</>
				)}

				<Dropdown
					title="Quantity"
					onChange={handleOnChangeSets}
					options={setOptions}
					value={sets}
					onlyValue={true}
				/>
			</div>

			{installation === 'Stud with spacer' && (
				<div className="text-xs text-[#9F9F9F] mb-4">
					*Note: The spacer will be black (default) or match the painted sign's
					color.
				</div>
			)}

			<div className="quote-grid">
				{pvcBaseColor?.name == 'Custom Color' && (
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
						value={comments}
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
					tempFolder={tempFolder}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
			</div>
		</>
	);
}
