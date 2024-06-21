import React from 'react';
import { useLayerAcrylic } from '../LayeredAcrylicContext';

const AddLayer = ({ type, product, component, children }) => {
	const addSignage = useLayerAcrylic();
	return (
		<div
			className="flex leading-none items-center rounded-md border bg-white border-gray-200  border-solid p-4 cursor-pointer justify-between hover:bg-slate-600 font-title text-black hover:text-white"
			onClick={() =>
				addSignage(
					product.post_title + ' - ' + type,
					product.ID,
					type,
					component
				)
			}
		>
			{children}
		</div>
	);
};

export default AddLayer;
