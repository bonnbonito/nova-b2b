import React, { useState } from 'react';
import OrderTable from './OrderTable';
import Pagination from './Pagination';
import Search from './Search';

function Orders() {
	const [orders, setOrders] = useState(NovaOrders.orders);
	const [orderTotalSort, setOrderTotalSort] = useState('none');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const totalPages = Math.ceil(orders.length / itemsPerPage);

	const currentOrders = orders.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePageChange = (pageNum) => {
		setCurrentPage(pageNum);
	};

	const handleFilter = (filters) => {
		const {
			searchTerm,
			searchStatus,
			startDate,
			endDate,
			orderTotal,
			totalSort,
		} = filters;

		console.log(filters);

		let filteredOrders = NovaOrders.orders;

		// Filter by search term
		if (searchTerm.length > 0) {
			filteredOrders = filteredOrders.filter((order) =>
				order.order_number.includes(searchTerm)
			);
		}

		// Filter by status
		if (searchStatus !== 'all') {
			// if overdue
			if (searchStatus === 'overdue') {
				filteredOrders = filteredOrders.filter(
					(order) => order.is_overdue === true
				);
			}
			// if not overdue
			else {
				filteredOrders = filteredOrders.filter(
					(order) => order.status === searchStatus
				);
			}
		}

		// Filter by date range
		if (startDate || endDate) {
			filteredOrders = filteredOrders.filter((order) => {
				const orderDate = new Date(order.date);

				let isValid = false;

				if (startDate) {
					const start = new Date(startDate);
					if (orderDate >= start) {
						isValid = true;
					}
				}

				if (endDate) {
					const end = new Date(endDate); // Convert end date to Date object
					if (orderDate <= end) {
						isValid = true;
					}
				}

				return isValid;
			});
		}

		// Filter by order total
		if (parseFloat(orderTotal) > 0) {
			switch (totalSort) {
				case 'equals':
					filteredOrders = filteredOrders.filter(
						(order) => parseFloat(order.order_total) === parseFloat(orderTotal)
					);
					break;
				case 'less':
					filteredOrders = filteredOrders.filter(
						(order) => parseFloat(order.order_total) <= parseFloat(orderTotal)
					);
					break;
				case 'greater':
					filteredOrders = filteredOrders.filter(
						(order) => parseFloat(order.order_total) >= parseFloat(orderTotal)
					);
					break;
				default:
					break;
			}
		}

		if (orderTotalSort === 'asc') {
			filteredOrders = filteredOrders.sort(
				(a, b) => a.order_total - b.order_total
			);
		}

		if (orderTotalSort === 'desc') {
			filteredOrders = filteredOrders.sort(
				(a, b) => b.order_total - a.order_total
			);
		}

		setOrders(filteredOrders);
		setCurrentPage(1);
	};

	const handleReset = (reset) => {
		if (reset) {
			setOrders(NovaOrders.orders);
			setCurrentPage(1);
		}
	};

	const sortTotal = (sort) => {
		if (sort === 'asc') {
			setOrders((prev) =>
				[...prev].sort(
					(a, b) => parseFloat(a.order_total) - parseFloat(b.order_total)
				)
			);
		}
		if (sort === 'desc') {
			setOrders((prev) =>
				[...prev].sort(
					(a, b) => parseFloat(b.order_total) - parseFloat(a.order_total)
				)
			);
		}
		if (sort === 'none') {
			setOrders((prev) =>
				[...prev].sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
			);
		}
	};

	return (
		<>
			<Search
				filters={handleFilter}
				reset={handleReset}
				setOrderTotalSort={setOrderTotalSort}
			/>
			{orders.length > 0 ? (
				<>
					<OrderTable
						orders={currentOrders}
						orderTotalSort={orderTotalSort}
						setOrderTotalSort={setOrderTotalSort}
						sortTotal={sortTotal}
					/>
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
				</>
			) : (
				<div
					class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<span class="block sm:inline text-sm">
						No orders found for the given search criteria.
					</span>
				</div>
			)}
		</>
	);
}

export default Orders;
