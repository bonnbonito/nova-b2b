import React from 'react';
import { useCombineQuote } from '../CombineQuoteContext';

export const AddLayer = ({ type, product, component, title, children }) => {
	const addSignage = useCombineQuote();
	return (
		<div
			className="flex leading-none items-center rounded-md border bg-white border-gray-200  border-solid p-4 cursor-pointer justify-between hover:bg-slate-600 font-title text-black hover:text-white"
			onClick={() => {
				console.log('Layer');
				addSignage(
					product.post_title + ' - ' + type,
					product.ID,
					type,
					component,
					title,
					true,
					true,
					true
				);
			}}
		>
			{children}
		</div>
	);
};

export default AddLayer;
