import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

export default function AccordionGroup({ group, products }) {
	const [isOpen, setIsOpen] = useState(false);

	function handleIsOpen(value) {
		setIsOpen(value);
	}
	return (
		<div
			className={`border-gray-200 rounded-md border mb-2 bg-slate-50 overflow-hidden`}
		>
			<AccordionItem
				title={group.post_title}
				products={products}
				isOpen={handleIsOpen}
			/>
		</div>
	);
}
