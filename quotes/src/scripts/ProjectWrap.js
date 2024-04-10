import React, { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid'; // Make sure to import uuid
import { ProjectContext } from './CustomProject';
import EditableText from './EditableText';
import UploadFile from './UploadFile';
import { CollapseIcon, DuplicateIcon, TrashIcon } from './svg/Icons';

export default function ProjectWrap({ item, index }) {
	const [open, setOpen] = useState(true);
	const { projects, setProjects } = useContext(ProjectContext);
	const [isLoading, setIsLoading] = useState(false);
	const [fileNames, setFileNames] = useState(item.fileNames);
	const [fileUrls, setFileUrls] = useState(item.fileUrls);
	const [filePaths, setFilePaths] = useState(item.filePaths);
	const [files, setFiles] = useState(item.files);
	const [description, setDescription] = useState(item.description);
	const [custom_id, setCustom_id] = useState(item.custom_id);
	const [title, setTitle] = useState(item.title);

	const handleOnChangeTitle = (value) => setTitle(value);

	const handleOnChangeDescription = (e) => setDescription(e.target.value);

	const handleCustomIDChange = (e) => setCustom_id(e.target.value);

	function duplicateProject(item, index) {
		const duplicated = { ...item, id: uuidv4() };
		console.log(duplicated);

		setProjects((current) => {
			const updated = [
				...current.slice(0, index + 1),
				duplicated,
				...current.slice(index + 1),
			];
			return updated;
		});
	}

	function removeProject(itemToRemove) {
		const updatedProject = projects.filter(
			(item) => item.id !== itemToRemove.id
		);
		setProjects(updatedProject);
	}

	useEffect(() => {
		const updatedProjects = projects.map((project) => {
			if (project.id === item.id) {
				return {
					...project,
					files: files,
					filePath: filePath,
					fileName: fileName,
					fileUrl: fileUrl,
					description: description,
					custom_id: custom_id,
				};
			} else {
				return project;
			}
		});
		setProjects(updatedProjects);
	}, [fileUrl, description, custom_id]);

	return (
		<div className="rounded-md border border-gray-200 p-4 mb-8">
			<div className="flex justify-between mb-4">
				<EditableText
					id={item.id}
					text={title}
					onChange={handleOnChangeTitle}
				/>

				<div className="flex gap-6">
					<div
						className="cursor-pointer"
						onClick={() => setOpen(!open)}
						data-tooltip-id={item.id}
						data-tooltip-content={open ? 'Collapse' : 'Expand'}
					>
						<CollapseIcon />
					</div>
					<div
						className="cursor-pointer"
						onClick={() => duplicateProject(item, index)}
						data-tooltip-id={item.id}
						data-tooltip-content="Duplicate"
					>
						<DuplicateIcon />
					</div>

					{projects.length > 1 && (
						<div
							className="cursor-pointer"
							onClick={() => removeProject(item)}
							data-tooltip-id={item.id}
							data-tooltip-content="Delete"
						>
							<TrashIcon />
							<Tooltip id={item.id} />
						</div>
					)}
				</div>
			</div>
			<div className={`signage-content ${open ? 'open' : ''}`}>
				<div className="flex gap-6">
					<div className="w-3/4">
						<h5 className="uppercase font-title text-sm tracking-[1.4px]">
							PROJECT DESCRIPTION
						</h5>
						<textarea
							className="h-[160px] rounded-sm"
							onChange={handleOnChangeDescription}
						>
							{description}
						</textarea>
					</div>
					<div className="w-1/4 flex flex-col justify-between">
						<div className="mb-4">
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
						<div>
							<h5 className="uppercase font-title text-sm tracking-[1.4px] px-2">
								CUSTOM ID <small>(OPTIONAL)</small>
							</h5>
							<input
								type="text"
								className="w-full rounded-sm mb-[8px]"
								value={item.custom_id}
								onChange={handleCustomIDChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
