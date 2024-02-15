import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../../../Dropdown';
import UploadFile from '../../../UploadFile';
import { QuoteContext } from '../CustomProject';

import {
	calculateMountingOptions,
	defaultFinishOptions,
	mountingDefaultOptions,
	piecesOptions,
	thicknessOptions,
	waterProofOptions,
} from '../../../utils/SignageOptions';

const NovaSingleOptions = NovaQuote.single_quote_options;

export default function Logo({ item }) {
	const { signage, setSignage } = useContext(QuoteContext);
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState(item.fileName);
	const [fileUrl, setFileUrl] = useState(item.fileUrl);
	const [filePath, setFilePath] = useState(item.filePath);
	const [file, setFile] = useState(item.file);

	const [description, setDescription] = useState(item.description);

	const handleOnChangeDescription = (e) => setDescription(e.target.value);

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					file: file,
					fileName: fileName,
					filePath: filePath,
					fileUrl: fileUrl,
					description: description,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	useEffect(() => {
		updateSignage();
	}, [fileUrl, fileName, file, filePath, description]);

	/*
	useEffect(() => {
		// Ensure width, height, and selectedThickness are provided
		if (width && height && selectedThickness) {
			const logoKey = `logo_pricing_${selectedThickness.value}mm`;
			const logoPricingTable =
				logoPricingObject[logoKey]?.length > 0
					? convert_json(logoPricingObject[logoKey])
					: [];
			const computed =
				logoPricingTable.length > 0 ? logoPricingTable[width - 1][height] : 0;

			let multiplier = 0;
			if (waterproof) {
				multiplier = waterproof === 'Indoor' ? 1 : 1.1;
			}

			let total = (computed * multiplier).toFixed(2);
			total *= selectedFinishing === 'Gloss' ? 1.1 : 1;
			total *= baseColor === 'Custom Color' ? UV_PRICE : 1;
			setUsdPrice(total);
			setCadPrice((total * parseFloat(exchangeRate)).toFixed(2));
		}
	}, [
		width,
		height,
		selectedThickness,
		waterproof,
		selectedFinishing,
		baseColor,
	]);
	*/

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="px-[1px] col-span-3">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						DESCRIPTION
					</label>
					<textarea
						className="h-[160px] rounded-md text-sm"
						onChange={handleOnChangeDescription}
					>
						{description}
					</textarea>
				</div>
				<UploadFile
					setFilePath={setFilePath}
					setFile={setFile}
					filePath={filePath}
					fileUrl={fileUrl}
					isLoading={isLoading}
					setFileUrl={setFileUrl}
					setFileName={setFileName}
				/>
			</div>
		</>
	);
}
