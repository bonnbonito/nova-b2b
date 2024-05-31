import React from 'react';

const Note = ({ title, children }) => {
	return (
		<div
			className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-8"
			role="alert"
		>
			<p className="font-bold mb-2">{title}</p>
			{children}
		</div>
	);
};

export default Note;
