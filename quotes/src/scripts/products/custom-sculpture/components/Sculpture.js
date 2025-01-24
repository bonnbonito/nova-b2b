import { useEffect, useState } from 'react';
import { useAppContext } from '../../../AppProvider';
import UploadFiles from '../../../UploadFiles';
import Dropdown from '../../../Dropdown';
import TextInput from '../../../TextInput';

import { INDOOR_NOT_WATERPROOF } from '../../../utils/defaults';

const setOptions = Array.from(
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
);

const waterProofOptions = [
	{
		option: INDOOR_NOT_WATERPROOF,
	},
	{
		option: 'Outdoor',
	},
];

const materialOptions = [
	'NOVA Suggestion',
	'Resin',
	'Fiberglass Resin',
	'Stainless Steel',
	'Aluminum',
	'Wood',
	'Plush',
	'Interactive Light',
];

export function Sculpture({ item }) {
	const { signage, setSignage, setMissing, hasUploadedFile } = useAppContext();
	const [fileNames, setFileNames] = useState(item.fileNames ?? []);
	const [fileUrls, setFileUrls] = useState(item.fileUrls ?? []);
	const [filePaths, setFilePaths] = useState(item.filePaths ?? []);
	const [files, setFiles] = useState(item.files ?? []);

	const [sculptureMaterial, setSculptureMaterial] = useState(
		item.sculptureMaterial ?? 'NOVA Suggestion'
	);

	const [sculptureSize, setSculptureSize] = useState(item.sculptureSize ?? '');

	const [purpose, setPurpose] = useState(item.purpose ?? '');
	const [projectTimeline, setProjectTimeline] = useState(
		item.projectTimeline ?? ''
	);

	const [waterproof, setWaterproof] = useState(item.waterproof ?? '');
	const [sets, setSets] = useState(item.sets ?? 1);

	const [description, setDescription] = useState(item.description ?? '');

	const handleOnChangeDescription = (e) => setDescription(e.target.value);

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					files,
					fileNames,
					filePaths,
					fileUrls,
					sculptureMaterial,
					sculptureSize,
					purpose,
					projectTimeline,
					description,
					sets,
					waterproof,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!sculptureMaterial) missingFields.push('Select a material');
		if (!sculptureSize) missingFields.push('Add the size');
		if (!waterproof) missingFields.push('Select environment');
		if (!purpose) missingFields.push('Add the purpose');

		if (!projectTimeline) missingFields.push('Add the project timeline');

		if (!sets) missingFields.push('Select the quantity');

		if (!description) missingFields.push('Add your description');

		if (!hasUploadedFile) {
			if (!fileUrls || fileUrls.length === 0) {
				missingFields.push('Upload a PDF/AI File');
			}
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
		updateSignage();
		checkAndAddMissingFields();
	}, [
		fileUrls,
		fileNames,
		files,
		filePaths,
		description,
		hasUploadedFile,
		sculptureMaterial,
		sculptureSize,
		purpose,
		projectTimeline,
		description,
		sets,
		waterproof,
	]);

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
					title="Material Preference"
					value={sculptureMaterial}
					onChange={(e) => setSculptureMaterial(e.target.value)}
					options={materialOptions.map((material) => (
						<option
							key={material}
							value={material}
							defaultValue={material === sculptureMaterial}
						>
							{material}
						</option>
					))}
					info={`Choose <span class="text-nova-primary ">NOVA Suggestion</span> to let us suggest<br> a material based on your design and description`}
				/>

				<TextInput
					title="SIZE (HxWxD)"
					value={sculptureSize}
					onChange={(e) => setSculptureSize(e.target.value)}
					placeholder="INPUT SIZE"
					textTransform={false}
				/>

				<Dropdown
					title="Environment"
					onChange={(e) => setWaterproof(e.target.value)}
					options={waterProofOptions.map((option) => (
						<option
							key={option.option}
							value={option.option}
							defaultValue={option.option === waterproof}
						>
							{option.option}
						</option>
					))}
					value={waterproof}
				/>

				<TextInput
					title="Purpose"
					value={purpose}
					onChange={(e) => setPurpose(e.target.value)}
					placeholder="Please specify where it will be used e.g., Retail, Trade Show, Public Parks"
					className="col-span-4"
				/>

				<TextInput
					title="Project Timeline"
					value={projectTimeline}
					onChange={(e) => setProjectTimeline(e.target.value)}
					placeholder="Please provide the estimated timeline for the project (e.g., 4–5 months)."
					className="col-span-4"
					info="Our project takes at least 15 weeks to be completed.<br>Please keep this in mind while adding the project timeline."
				/>

				<Dropdown
					title="Quantity"
					onChange={(e) => setSets(e.target.value)}
					options={setOptions}
					value={sets}
					onlyValue={true}
				/>
			</div>

			<div className="quote-grid">
				<div className="px-[1px] col-span-4">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						DESCRIPTION
					</label>
					<textarea
						className="h-[160px] rounded-md text-sm"
						onChange={handleOnChangeDescription}
						value={description}
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
}
