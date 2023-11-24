import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

export default function EditableText({ id, text, onChange }) {
	const [label, setLabel] = useState(text);
	const [editing, setEditing] = useState(false);

	const handleOnChange = (e) => {
		setLabel(e.target.value);
	};

	useEffect(() => {}, [label]);

	function handleOnCancel() {
		console.log('Cancelling');
		setEditing(!editing);
		setLabel(text);
	}

	const CancelIcon = () => (
		<div
			onClick={handleOnCancel}
			data-tooltip-id={id}
			data-tooltip-content={'Cancel'}
			className="cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="red"
				class="w-3 h-3"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</div>
	);

	function handleOnSave() {
		setEditing(!editing);
		onChange(label);
	}

	const SaveIcon = () => (
		<div
			onClick={handleOnSave}
			data-tooltip-id={id}
			data-tooltip-content={'Save'}
			className="cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#008000"
				class="w-3 h-3"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.5 12.75l6 6 9-13.5"
				/>
			</svg>
		</div>
	);

	const EditIcon = () => (
		<div
			onClick={() => setEditing(!editing)}
			data-tooltip-id={id}
			data-tooltip-content={'Edit Project Name'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-3 h-3 cursor-pointer"
				aria-label={editing ? 'Confirm changes' : 'Edit label'}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
				/>
			</svg>
			<Tooltip id={id} />
		</div>
	);

	return (
		<>
			{editing ? (
				<div className="flex gap-2">
					<input type="text" value={label} onChange={handleOnChange} />
					{label.length > 0 && <SaveIcon />}
					<CancelIcon />
				</div>
			) : (
				<div className="flex gap-2">
					<h3 className="signage-title">{text}</h3>
					<EditIcon />
				</div>
			)}
		</>
	);
}
