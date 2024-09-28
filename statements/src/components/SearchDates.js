import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SearchDates({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
}) {
	const StartDateInput = forwardRef(({ value, onClick }, ref) => (
		<input
			type="text"
			placeholder="FROM"
			onClick={onClick}
			ref={ref}
			value={value}
			className="w-full border-none rounded-sm p-2 placeholder:text-slate-400 placeholder:font-title text-sm"
		/>
	));

	const EndDateInput = forwardRef(({ value, onClick }, ref) => (
		<input
			type="text"
			placeholder="TO"
			onClick={onClick}
			ref={ref}
			value={value}
			className="w-full border-none rounded-sm p-2 placeholder:text-slate-400 placeholder:font-title text-sm"
		/>
	));

	return (
		<div>
			<label className="block text-sm text-[#5E5E5E] font-title mb-2">
				DATE RANGE
			</label>
			<div className="grid grid-cols-2 gap-x-2">
				<div>
					<DatePicker
						defaultValue={startDate}
						onChange={(date) => setStartDate(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						maxDate={endDate}
						dateFormat="MMM dd, yyyy"
						customInput={<StartDateInput />}
					/>
				</div>

				<div>
					<DatePicker
						defaultValue={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						dateFormat="MMM dd, yyyy"
						customInput={<EndDateInput />}
					/>
				</div>
			</div>
		</div>
	);
}
