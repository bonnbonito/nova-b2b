import React from 'react';

export default function SearchInput({ term, setTerm }) {
	return (
		<div>
			<label
				htmlFor="search-order-number"
				className="block text-sm text-[#5E5E5E] font-title mb-2"
			>
				Search
			</label>
			<input
				id="search-order-number"
				type="text"
				placeholder="="
				className="w-full border-none rounded-sm p-2 text-black text-sm"
				value={term}
				onChange={(event) => {
					setTerm(event.target.value);
				}}
			/>
		</div>
	);
}
