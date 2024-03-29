export const CollapseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="6"
		height="11"
		viewBox="0 0 6 11"
		fill="none"
	>
		<path
			d="M0.933333 11L0 10.0375L3 6.94375L6 10.0375L5.06667 11L3 8.86875L0.933333 11ZM3 4.05625L0 0.9625L0.933333 0L3 2.13125L5.06667 0L6 0.9625L3 4.05625Z"
			fill="black"
		/>
	</svg>
);

export const TrashIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="11"
		height="13"
		viewBox="0 0 11 13"
		fill="none"
	>
		<path
			d="M0.6875 13V2.16667H0V0.722222H3.4375V0H7.5625V0.722222H11V2.16667H10.3125V13H0.6875ZM2.0625 11.5556H8.9375V2.16667H2.0625V11.5556ZM3.4375 10.1111H4.8125V3.61111H3.4375V10.1111ZM6.1875 10.1111H7.5625V3.61111H6.1875V10.1111Z"
			fill="black"
		/>
	</svg>
);

export const ClearIcon = ({ loading }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className={`w-4 h-4 ${loading && 'animate-spin'}`}
	>
		<path
			fillRule="evenodd"
			d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const DuplicateIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="12"
		height="14"
		viewBox="0 0 12 14"
		fill="none"
	>
		<path
			d="M2.82353 11.2V0H12V11.2H2.82353ZM4.23529 9.8H10.5882V1.4H4.23529V9.8ZM0 14V2.8H1.41176V12.6H9.17647V14H0Z"
			fill="black"
		/>
	</svg>
);

export const PlusIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
	>
		<line
			x1="7"
			y1="1"
			x2="7"
			y2="13"
			stroke="black"
			stroke-width="2"
			stroke-linecap="square"
			stroke="currentColor"
		/>
		<line
			x1="13"
			y1="7"
			x2="1"
			y2="7"
			stroke="black"
			stroke-width="2"
			stroke-linecap="square"
			stroke="currentColor"
		/>
	</svg>
);

export const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-6 h-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

export const LoadingIcon = ({ text }) => (
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
		{text}
	</div>
);
