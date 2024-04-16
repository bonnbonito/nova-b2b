import React, { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid'; // Make sure to import uuid
import EditableText from './EditableText';
import { CollapseIcon, DuplicateIcon, TrashIcon } from './svg/Icons';

export default function Project({ item, index }) {
	const { signage, setSignage } = useContext(NovaContext);
	const [open, setOpen] = useState(true);
	const [itemTitle, setItemTitle] = useState(item.title);

	function recountSignageTitles(updatedSignage) {
		const count = {}; // Object to keep track of the count of each type
		return updatedSignage.map((sign) => {
			const currentCount = (count[sign.type] || 0) + 1;
			count[sign.type] = currentCount;
			return { ...sign, title: `${sign.type} ${currentCount}` };
		});
	}

	function removeSignage(itemToRemove) {
		const updatedSignage = signage.filter(
			(sign) => sign.id !== itemToRemove.id
		);
		setSignage(recountSignageTitles(updatedSignage));
	}

	function duplicateSignage(item, index) {
		const duplicated = { ...item, id: uuidv4() };

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

	useEffect(() => {
		updateSignage();
	}, [itemTitle]);

	function handleOnChangeTitle(value) {
		return setItemTitle(value);
	}

	return (
		<div className="rounded-md border border-gray-200 p-4 mb-8">
			<div className="flex justify-between mb-4">
				<EditableText
					id={item.id}
					text={itemTitle}
					onChange={handleOnChangeTitle}
				/>

				<div className="flex gap-6">
					<div
						className="cursor-pointer"
						onClick={() => setOpen(!open)}
						data-tooltip-id={`${item.id}`}
						data-tooltip-content={open ? 'Collapse' : 'Expand'}
					>
						<CollapseIcon />
					</div>
					{signage.length < 5 && (
						<div
							className="cursor-pointer"
							onClick={() => duplicateSignage(item, index)}
							data-tooltip-id={`${item.id}`}
							data-tooltip-content="Duplicate"
						>
							<DuplicateIcon />
						</div>
					)}

					<div
						className="cursor-pointer"
						onClick={() => removeSignage(item)}
						data-tooltip-id={item.id}
						data-tooltip-content="Delete"
					>
						<TrashIcon />
						<Tooltip id={item.id} />
					</div>
				</div>
			</div>
			<div className={`signage-content ${open ? 'open' : ''}`}>
				<div>
					{item.type === 'letters' ? (
						<Letters item={item} />
					) : (
						<Logo item={item} />
					)}
				</div>
			</div>
		</div>
	);
}
