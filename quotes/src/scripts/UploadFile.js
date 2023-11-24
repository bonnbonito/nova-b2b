import React, { useRef } from 'react';

export default function UploadFile({
	file,
	setFileUrl,
	handleFileUpload,
	handleRemoveFile,
	isLoading,
}) {
	const fileRef = useRef(null);

	const handleButtonClick = () => {
		fileRef.current.click();
	};

	const handleChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			handleFileUpload(file, setFileUrl);
		}
	};

	return (
		<div className="px-[1px]">
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				UPLOAD PDF/AI FILE
			</label>

			{!file ? (
				<button
					className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]"
					onClick={handleButtonClick}
					aria-label="Upload design file"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex justify-center items-center">Uploading...</div>
					) : (
						'Upload Design'
					)}
				</button>
			) : (
				<button
					className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-red-600 hover:bg-red-400 font-title leading-[1em]"
					onClick={handleRemoveFile}
					aria-label="Remove design file"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex justify-center items-center">
							<svg
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
							Removing...
						</div>
					) : (
						<div className="flex items-center justify-center">
							Remove design
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
					)}
				</button>
			)}
			<input
				type="file"
				ref={fileRef}
				class="hidden"
				onChange={handleChange}
				accept=".pdf,.ai"
				aria-label="File input"
			/>
		</div>
	);
}
