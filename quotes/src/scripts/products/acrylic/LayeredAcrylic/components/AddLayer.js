import React from 'react';

const AddLayer = ({ product, type }) => {
	return (
		<button className="flex leading-none items-center rounded-md border bg-white border-gray-200  border-solid p-4 cursor-pointer justify-between hover:bg-slate-600 font-title text-black hover:text-white">
			{type}
		</button>
	);
};

export default AddLayer;
