import React from 'react';
import AccordionItem from './AccordionItem';

export default function AccordionGroup({ group, products }) {
	return (
		<div className={`border-gray-200 rounded-md border mb-2`}>
			<AccordionItem title={group.post_title} products={products} />
		</div>
	);
}
