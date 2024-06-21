import React, { memo, useCallback, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from './AppProvider';
import EditableText from './EditableText';
import { ClearIcon, CollapseIcon, DuplicateIcon, TrashIcon } from './svg/Icons';
import { debounce } from './utils/helpers';

const Signage = ({ index, item, children, storage, editable = true }) => {
	const { signage, setSignage, setMissing, updateSignageItem } =
		useAppContext();

	const [open, setOpen] = useState(true);
	const [loading, setLoading] = useState(false);

	const removeSignage = (itemToRemove) => {
		setSignage((currentSignage) => {
			const updatedSignage = currentSignage.filter(
				(sign) => sign.id !== itemToRemove.id
			);
			return updatedSignage;
		});
		setMissing((current) => {
			const updatedMissing = current.filter(
				(sign) => sign.id !== itemToRemove.id
			);
			return updatedMissing;
		});
	};

	const debounceDuplicateSignage = useCallback(
		debounce((item) => {
			const duplicated = {
				...item,
				id: uuidv4(),
				filePaths: [],
				fileNames: [],
				fileUrls: [],
				files: [],
				fontFile: '',
				fontFileName: '',
				fontFilePath: '',
				fontFileUrl: '',
			};

			setSignage((current) => {
				return [...current, duplicated];
			});
		}, 600),
		[signage]
	);

	const duplicateSignage = useCallback((item) => {
		debounceDuplicateSignage(item);
	}, []);

	const clearStorage = useCallback(
		(e) => {
			e.preventDefault();
			setLoading(true);
			localStorage.removeItem(storage);
			window.location.href = window.location.pathname;
		},
		[storage]
	);

	const handleOnChangeTitle = (value) => {
		updateSignageItem(item.id, 'title', value);
	};

	const handleToggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	return (
		<div className="rounded-md border border-gray-200 p-4 mb-8 shadow-sm">
			<div className={`flex justify-between ${open ? 'mb-4' : 'mb-0'}`}>
				{editable ? (
					<EditableText
						id={item.id}
						text={item.title}
						onChange={handleOnChangeTitle}
					/>
				) : (
					<h3 className="signage-title uppercase mb-0">{item.title}</h3>
				)}

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
						className="cursor-pointer select-none"
						onClick={handleToggleOpen}
						data-tooltip-id={`${item.id}`}
						data-tooltip-content={open ? 'Collapse' : 'Expand'}
					>
						<CollapseIcon />
					</div>
					{signage.length < 10 && (
						<div
							className="cursor-pointer select-none"
							onClick={() => duplicateSignage(item, editable, signage)}
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
				<div
					className={(!open || item.type === 'letters') && 'overflow-hidden'}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default memo(Signage);
