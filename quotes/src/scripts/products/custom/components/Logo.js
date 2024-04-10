import React, { useContext, useEffect, useState } from 'react';
import UploadFiles from '../../../UploadFiles';
import { QuoteContext } from '../CustomProject';

export default function Logo({ item }) {
	const {
		signage,
		setSignage,
		missing,
		setMissing,
		tempFolder,
		isLoading,
		setIsLoading,
	} = useContext(QuoteContext);
	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);

	const [description, setDescription] = useState(item.description);

	const handleOnChangeDescription = (e) => setDescription(e.target.value);

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					files: files,
					fileNames: fileNames,
					filePaths: filePaths,
					fileUrls: fileUrls,
					description: description,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const checkAndAddMissingFields = () => {
		const missingFields = [];

		if (!description) missingFields.push('Add your description');

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
	}, [fileUrls, fileNames, files, filePaths, description]);

	return (
		<>
			<div className="quote-grid">
				<div className="px-[1px] col-span-4">
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
