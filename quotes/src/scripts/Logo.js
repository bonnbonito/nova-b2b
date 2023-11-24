import React, { useContext, useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { NovaContext } from './NovaQuote';
import UploadFile from './UploadFile';
import convert_json from './utils/ConvertJson';
const NovaOptions = NovaQuote.quote_options;

export default function Logo({ item }) {
	const { signage, setSignage } = useContext(NovaContext);
	const [selectedMounting, setSelectedMounting] = useState(item.mounting);
	const [selectedThickness, setSelectedThickness] = useState(item.thickness);
	const [width, setWidth] = useState(item.width);
	const [maxWidthHeight, setMaxWidthHeight] = useState(23);
	const [fileUrl, setFileUrl] = useState(item.file);
	const [usdPrice, setUsdPrice] = useState(item.usdPrice);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedFinishing, setSelectedFinishing] = useState(item.finishing);
	const finishingOptions = NovaOptions.finishing_options;
	const [maxWidthOptions, setMaxWidthOptions] = useState(
		Array.from(
			{
				length: maxWidthHeight,
			},
			(_, index) => {
				const val = 1 + index;
				return (
					<option key={index} value={val}>
						{val}"
					</option>
				);
			}
		)
	);
	const [height, setHeight] = useState(item.height);
	const thicknessOptions = NovaOptions.acrylic_thickness_options;
	const [comments, setComments] = useState('');
	const [waterproof, setWaterproof] = useState(item.waterproof);
	const [mountingOptions, setMountingOptions] = useState(
		NovaOptions.mounting_options
	);

	const logoPricingObject = NovaQuote.quote_options.logo_pricing;

	useEffect(() => {
		// Log to ensure we're getting the expected value

		let newMountingOptions;
		if (selectedThickness.value === '3') {
			if (selectedMounting === 'Flush stud') {
				setSelectedMounting(
					() => NovaOptions.mounting_options[0].mounting_option
				);
			}

			newMountingOptions = NovaOptions.mounting_options.filter(
				(option) => option.mounting_option !== 'Flush stud'
			);
		} else {
			if (selectedMounting === 'Stud with Block') {
				setSelectedMounting(
					() => NovaOptions.mounting_options[0].mounting_option
				);
			}
			// Exclude 'Stud with Block' option
			newMountingOptions = NovaOptions.mounting_options.filter(
				(option) => option.mounting_option !== 'Stud with Block'
			);
		}

		if (waterproof === 'Outdoor') {
			if (selectedMounting === 'Double sided tape') {
				setSelectedMounting(
					() => NovaOptions.mounting_options[0].mounting_option
				);
			}

			newMountingOptions = newMountingOptions.filter(
				(option) => option.mounting_option !== 'Double sided tape'
			);
		}

		// Update the state
		setMountingOptions(newMountingOptions);

		setMaxWidthOptions(() =>
			Array.from(
				{
					length: parseInt(maxWidthHeight) + 1,
				},
				(_, index) => {
					const val = 1 + index;
					return (
						<option key={index} value={val}>
							{val}"
						</option>
					);
				}
			)
		);
	}, [selectedThickness, waterproof, maxWidthHeight]);

	function handleComments(e) {
		setComments(e.target.value);
	}

	const handleOnChangeThickness = (e) => {
		const target = e.target.value;
		const selected = thicknessOptions.filter(
			(option) => option.value === target
		);
		setSelectedThickness(() => selected[0]);
		target > 3 ? setMaxWidthHeight(42) : setMaxWidthHeight(23);
		if (target == 3) {
			if (height > 25) {
				setHeight(24);
			}

			if (width > 25) {
				setWidth(24);
			}
		}
	};

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
					mounting: selectedMounting,
					waterproof: waterproof,
					width: width,
					height: height,
					usdPrice: usdPrice,
					file: fileUrl,
					finishing: selectedFinishing,
				};
			} else {
				return sign;
			}
		});
		setSignage(updatedSignage);
	}

	useEffect(() => {
		setComments(item.comments);
	}, []);

	useEffect(() => {
		updateSignage();
	}, [
		comments,
		selectedThickness,
		selectedMounting,
		waterproof,
		width,
		height,
		usdPrice,
		fileUrl,
		selectedFinishing,
	]);

	useEffect(() => {
		const logoKey = `logo_pricing_${selectedThickness.value}mm`;
		const logoPricingTable =
			logoPricingObject[logoKey]?.length > 0
				? convert_json(logoPricingObject[logoKey])
				: [];
		const computed =
			logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;
		const total = (computed * (waterproof === 'Indoor' ? 1 : 1.1)).toFixed(2);
		setUsdPrice(total);
	}, [width, height, selectedThickness, waterproof]);

	const handleFileUpload = async (file) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('nonce', NovaQuote.nonce);
		formData.append('action', 'upload_acrylic_file');

		fetch(NovaQuote.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.code == '2' && data.file) {
					console.log(data.file.url);
					setFileUrl(data.file.url);
					setIsLoading(false);
				}
			})
			.catch((error) => console.error('Error:', error));
	};

	const handleRemoveFile = async () => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', fileUrl);
		formData.append('nonce', NovaQuote.nonce);
		formData.append('action', 'remove_acrylic_file');

		fetch(NovaQuote.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.code == '2') {
					setFileUrl('');
					setIsLoading(false);
				}
			})
			.catch((error) => console.error('Error:', error));
	};

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				<Dropdown
					title="Thickness"
					value={item.thickness.value}
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
					title="Width"
					value={item.width}
					onChange={(e) => setWidth(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Height"
					value={item.height}
					onChange={(e) => setHeight(e.target.value)}
					options={maxWidthOptions}
				/>

				<Dropdown
					title="Waterproof Option"
					onChange={(e) => setWaterproof(e.target.value)}
					options={NovaOptions.waterproof_options.map((option) => (
						<option
							value={option.option}
							selected={option.option == item.waterproof}
						>
							{option.option}
						</option>
					))}
					value={item.waterproof}
				/>

				<Dropdown
					title="Mounting Options"
					onChange={(e) => setSelectedMounting(e.target.value)}
					options={mountingOptions.map((option) => (
						<option
							value={option.mounting_option}
							selected={option.mounting_option === selectedMounting}
						>
							{option.mounting_option}
						</option>
					))}
					value={item.mounting}
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
					value={item.finishing}
				/>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="px-[1px] col-span-3">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						COMMENTS
					</label>
					<input
						className="w-full py-4 px-2 border-gray-200 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400"
						type="text"
						value={item.comments}
						onChange={handleComments}
						placeholder="ADD COMMENTS"
					/>
				</div>
				<UploadFile
					file={item.file}
					handleFileUpload={handleFileUpload}
					handleRemoveFile={handleRemoveFile}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
}
