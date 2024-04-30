import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid'; // Make sure to import uuid
import EditableText from './EditableText';
import { ClearIcon, CollapseIcon, DuplicateIcon, TrashIcon } from './svg/Icons';

export default function Signage({
	item,
	index,
	signage,
	setSignage,
	children,
	setMissing,
	storage,
}) {
	const [open, setOpen] = useState(true);
	const [itemTitle, setItemTitle] = useState(item.title);
	const [loading, setLoading] = useState(false);

	function recountSignageTitles(updatedSignage) {
		const count = {}; // Object to keep track of the count of each type
		return updatedSignage.map((sign) => {
			const currentCount = (count[sign.type] || 0) + 1;
			count[sign.type] = currentCount;
			return { ...sign };
		});
	}

	function removeSignage(itemToRemove) {
		setSignage((currentSignage) => {
			const updatedSignage = currentSignage.filter(
				(sign) => sign.id !== itemToRemove.id
			);
			return recountSignageTitles(updatedSignage);
		});
		setMissing((current) => {
			const updatedMissing = current.filter(
				(sign) => sign.id !== itemToRemove.id
			);
			return updatedMissing;
		});
	}

	function duplicateSignage(item, index) {
		const duplicated = {
			...item,
			id: uuidv4() + '-' + 'asdfadsf',
			filePaths: [],
			fileNames: [],
			fileUrls: [],
			files: [],
			fontFile: '',
			fontFileName: '',
			fontFilePath: '',
			fontFileUrl: '',
		};

		console.log(`Duplicate`, duplicated);

		setSignage((current) => {
			const updated = [
				...current.slice(0, index + 1),
				duplicated,
				...current.slice(index + 1),
			];
			return recountSignageTitles(updated);
		});
	}

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					title: itemTitle,
				};
			} else {
				return sign;
			}
		});
		setSignage(() => updatedSignage);
	}

	const clearStorage = (e) => {
		e.preventDefault();
		setLoading(true);
		localStorage.removeItem(storage);
		window.location.href = window.location.pathname;
	};

	const updateMissingTitle = () => {
		setMissing((prevMissing) => {
			const existingIndex = prevMissing.findIndex(
				(entry) => entry.id === item.id
			);

			if (existingIndex !== -1) {
				const updatedMissing = [...prevMissing];
				updatedMissing[existingIndex] = {
					...updatedMissing[existingIndex],
					title: itemTitle,
				};
				return updatedMissing;
			}
			return prevMissing;
		});
	};

	useEffect(() => {
		updateSignage();
		updateMissingTitle();
	}, [itemTitle]);

	function handleOnChangeTitle(value) {
		return setItemTitle(value);
	}

	return (
		<div className="rounded-md border border-gray-200 p-4 mb-8">
			<div className={`flex justify-between ${open ? 'mb-4' : 'mb-0'}`}>
				<EditableText
					id={item.id}
					text={item.title}
					onChange={handleOnChangeTitle}
				/>

				<div className="flex gap-6">
					<Tooltip id={item.id} />
					<div
						className="cursor-pointer"
						onClick={clearStorage}
						data-tooltip-id={`${item.id}`}
						data-tooltip-content="Create from scratch"
					>
						<ClearIcon loading={loading} />
					</div>
					<div
						className="cursor-pointer"
						onClick={() => setOpen(!open)}
						data-tooltip-id={`${item.id}`}
						data-tooltip-content={open ? 'Collapse' : 'Expand'}
					>
						<CollapseIcon />
					</div>
					{signage.length < 10 && (
						<div
							className="cursor-pointer"
							onClick={() => duplicateSignage(item, index)}
							data-tooltip-id={`${item.id}`}
							data-tooltip-content="Duplicate"
						>
							<DuplicateIcon />
						</div>
					)}

					{signage.length > 1 && (
						<div
							className="cursor-pointer"
							onClick={() => removeSignage(item)}
							data-tooltip-id={item.id}
							data-tooltip-content="Delete"
						>
							<TrashIcon />
						</div>
					)}
				</div>
			</div>
			<div className={`signage-content ${open ? 'open' : ''}`}>
				<div className={item.type === 'letters' ? 'overflow-hidden' : ''}>
					{children}
				</div>
			</div>
		</div>
	);
}
