import React, { useState } from 'react';
import SearchDates from './SearchDates';
import SearchInput from './SearchInput';
import SearchSelect from './SearchSelect';
import SearchTotal from './SearchTotal';

export default function Search({ filters, reset, setOrderTotalSort }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchStatus, setSearchStatus] = useState('all');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [orderTotal, setOrderTotal] = useState(0);
	const [totalSort, setTotalSort] = useState('equals');

	const handleOnSubmit = (event) => {
		event.preventDefault();
		filters({
			searchTerm,
			searchStatus,
			startDate,
			endDate,
			orderTotal,
			totalSort,
		});
	};

	const handleClearFields = () => {
		setSearchTerm('');
		setStartDate('');
		setEndDate('');
		setOrderTotal(0);
		setTotalSort('equals');
		setSearchStatus('all');
		setOrderTotalSort('none');
		reset(true);
	};

	return (
		<div className="searchform-order p-4 rounded-sm mb-8 text-sm">
			<p className="font-title text-black mb-4">SEARCH ORDERS</p>

			<form onSubmit={handleOnSubmit} className="form">
				<div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4 gap-x-4 mb-8">
					<SearchInput term={searchTerm} setTerm={setSearchTerm} />
					<SearchSelect
						value={searchStatus}
						set={setSearchStatus}
						id="search-status"
						label="Status"
					/>
					<SearchDates
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
					/>
					<SearchTotal
						orderTotal={orderTotal}
						setOrderTotal={setOrderTotal}
						totalSort={totalSort}
						setTotalSort={setTotalSort}
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 justify-end font-title text-xs mb-8">
					<button
						type="button"
						onClick={handleClearFields}
						className="text-white bg-slate-400 w-full sm:w-auto sm:min-w-[180px]"
					>
						CLEAR FIELDS
					</button>
					<button
						type="submit"
						className="text-white bg-nova-primary w-full  sm:w-auto sm:min-w-[180px]"
					>
						Search
					</button>
				</div>
			</form>
		</div>
	);
}
