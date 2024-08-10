import React, { useState } from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
	const [inputValue, setInputValue] = useState(currentPage);

	const handlePageClick = (pageNum) => {
		onPageChange(pageNum);
		setInputValue(pageNum);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
			setInputValue(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
			setInputValue(currentPage - 1);
		}
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		if (value === '' || (Number(value) >= 1 && Number(value) <= totalPages)) {
			setInputValue(value);
		}
	};

	const handleInputSubmit = (event) => {
		if (event.key === 'Enter' && inputValue) {
			const pageNum = Number(inputValue);
			onPageChange(pageNum);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		if (currentPage > 3) {
			pageNumbers.push(
				<button key={1} onClick={() => handlePageClick(1)}>
					1
				</button>
			);
			pageNumbers.push(<span key="dots1">...</span>);
		}

		let startPage = Math.max(2, currentPage - 2);
		let endPage = Math.min(totalPages - 1, currentPage + 2);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<button
					key={i}
					className={`text-xs ${i === currentPage ? 'active' : ''} text-xs`}
					onClick={() => handlePageClick(i)}
				>
					{i}
				</button>
			);
		}

		if (currentPage < totalPages - 2) {
			pageNumbers.push(<span key="dots2">...</span>);
			pageNumbers.push(
				<button
					className="text-xs"
					key={totalPages}
					onClick={() => handlePageClick(totalPages)}
				>
					{totalPages}
				</button>
			);
		}

		return pageNumbers;
	};

	return (
		<div className="pagination flex gap-x-4 justify-between text-xs">
			<div>
				Page {currentPage} of {totalPages}
			</div>
			<div className="flex gap-x-4">
				<button
					className="text-xs"
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					Prev
				</button>
				<input
					type="number"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputSubmit}
					min="1"
					max={totalPages}
					className="page-input text-xs"
				/>
				<button
					className="text-xs"
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default Pagination;
