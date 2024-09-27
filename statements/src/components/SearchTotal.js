import React from 'react';

export default function SearchTotal({
	orderTotal,
	setOrderTotal,
	totalSort,
	setTotalSort,
}) {
	return (
		<div>
			<label className={`block text-sm text-[#5E5E5E] font-title mb-2`}>
				ORDER TOTAL
			</label>
			<div className="grid grid-cols-2 gap-x-2">
				<select
					onChange={(event) => {
						return setTotalSort(event.target.value);
					}}
					className={`w-full p-2 text-sm`}
				>
					<option value="equals" defaultValue={totalSort === 'equals'}>
						=
					</option>
					<option value="less" defaultValue={totalSort === 'less'}>
						LESS
					</option>
					<option value="greater" defaultValue={totalSort === 'greater'}>
						GREATER
					</option>
				</select>
				<input
					type="text"
					placeholder="$"
					value={orderTotal > 0 ? orderTotal : ''}
					onChange={(event) => {
						const value = event.target.value;
						return setOrderTotal(value);
					}}
					className="w-full border-none rounded-sm p-2 placeholder:text-slate-400 placeholder:font-title text-sm"
				/>
			</div>
		</div>
	);
}
