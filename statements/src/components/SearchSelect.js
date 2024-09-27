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
			<select
				onChange={(event) => set(event.target.value)}
				className="w-full p-2 text-sm"
			>
				<option value="all" defaultValue={value === 'all'}>
					Select {label}
				</option>
				<option value="pending" defaultValue={value === 'pending'}>
					Pending Payment
				</option>
				<option value="on-hold" defaultValue={value === 'on-hold'}>
					On Hold
				</option>
				<option value="cancelled" defaultValue={value === 'cancelled'}>
					Cancelled
				</option>
				<option value="processing" defaultValue={value === 'processing'}>
					Processing
				</option>
				<option value="completed" defaultValue={value === 'completed'}>
					Completed
				</option>
				<option value="overdue" defaultValue={value === 'overdue'}>
					Overdue
				</option>
			</select>
		</div>
	);
}
