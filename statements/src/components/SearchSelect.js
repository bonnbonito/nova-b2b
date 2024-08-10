import React from 'react';

export default function SearchSelect({ id, label, value, set }) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm text-[#5E5E5E] font-title mb-2"
			>
				{label}
			</label>
			<select onChange={(event) => set(event.target.value)} className="w-full">
				<option value="all" selected={value === 'all'}>
					Select {label}
				</option>
				<option value="pending" selected={value === 'pending'}>
					Pending
				</option>
				<option value="on-hold" selected={value === 'on-hold'}>
					On Hold
				</option>
				<option value="cancelled" selected={value === 'cancelled'}>
					Cancelled
				</option>
				<option value="processing" selected={value === 'processing'}>
					Processing
				</option>
				<option value="completed" selected={value === 'completed'}>
					Completed
				</option>
			</select>
		</div>
	);
}
