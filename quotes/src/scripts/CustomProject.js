import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectWrap from './ProjectWrap';
import { PlusIcon } from './svg/Icons';
import { processQuote } from './utils/QuoteFunctions';

export const ProjectContext = createContext(null);

export default function CustomProject() {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	function setDefaultProjects() {
		const savedStorage = JSON.parse(
			localStorage.getItem(
				window.location.href + NovaQuote.user_id + '-custom-project'
			)
		);
		console.log(savedStorage);
		if (savedStorage?.length > 0) {
			setProjects(savedStorage);
		} else {
			setProjects([
				{
					id: uuidv4(),
					title: 'PROJECT 1',
					description: '',
					custom_id: '',
					filePath: '',
					fileName: '',
					fileUrl: '',
					file: '',
				},
			]);
		}
	}

	useEffect(() => {
		setDefaultProjects();
	}, []);

	function addProject() {
		setProjects((prevProjects) => {
			const count = projects.length;
			let args = {
				id: uuidv4(),
				title: `Project ${count + 1}`,
				description: '',
				custom_id: '',
				filePath: '',
				fileName: '',
				fileUrl: '',
				file: '',
			};
			const newProjects = {
				...args,
			};

			return [...prevProjects, newProjects];
		});
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault(); // Prevent default form submission

		setIsLoading(true);

		// Validate projects before submission
		const isAllProjectsValid = projects.every((project) => {
			// Add more validation logic as needed
			return project.description && project.file;
		});

		if (!isAllProjectsValid) {
			alert('Please ensure all projects have a description, and file.');
			setIsLoading(false);
			return;
		}

		// Form submission logic here
		try {
			const currentDate = new Date();

			const formattedDate =
				currentDate.toLocaleDateString('en-US', {
					month: 'short',
					day: '2-digit',
					year: 'numeric',
				}) +
				' ' +
				currentDate
					.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,
					})
					.toUpperCase();

			const formData = new FormData();
			formData.append('nonce', NovaQuote.nonce);
			formData.append('title', NovaQuote.business_id + ' ' + formattedDate);
			formData.append('action', 'save_custom_project');
			formData.append('user', NovaQuote.user_id);
			formData.append('projects', JSON.stringify(projects));
			const status = await processQuote(formData);
			console.log(status);
			if (status === 'success') {
				alert('Project submitted successfully 1234');
				setProjects(() => []);
				setProjects(() => [
					{
						id: uuidv4(),
						title: 'PROJECT 1',
						description: '',
						custom_id: '',
						file: '',
						fileName: '',
						fileUrl: '',
						filePath: '',
					},
				]);
			} else {
				alert('Error');
			}
		} catch (err) {
			// Handle errors
			setError('Failed to save custom project. Please try again.');
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ProjectContext.Provider value={{ projects, setProjects, addProject }}>
			<div id="nova" className="custom-project">
				<div className="md:flex gap-6">
					<div className="md:w-3/4 w-full relative">
						{isLoading && (
							<div className="h-full w-full absolute top-0 left-0 bg-slate-100 opacity-40 flex justify-center items-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-10 w-10 text-black"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							</div>
						)}

						{projects.map((item, index) => (
							<ProjectWrap index={index} id={item.id} item={item}></ProjectWrap>
						))}
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addProject()}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD PROJECT
							<PlusIcon />
						</button>
					</div>
					<div className="md:w-1/4 w-full mt-8 md:mt-0">
						<div className="rounded-md border border-gray-200 p-4 sticky top-36">
							<button
								onClick={handleFormSubmit}
								className="font-title rounded-md text-white w-full text-center bg-[#f22e00] text-sm h-[49px] hover:bg-[#ff5e3d]"
							>
								{isLoading ? (
									<div className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Submitting...
									</div>
								) : (
									'Submit'
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</ProjectContext.Provider>
	);
}
