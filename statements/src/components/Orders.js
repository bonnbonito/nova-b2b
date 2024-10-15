import React, { useState } from 'react';
import OrderTable from './OrderTable';
import Pagination from './Pagination';
import Search from './Search';

function Orders() {
	const [orders, setOrders] = useState(NovaOrders.orders);
	const [orderTotalSort, setOrderTotalSort] = useState('none');
	const [dueDateSort, setDueDateSort] = useState('none');
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

		let filteredOrders = NovaOrders.orders;

		setDueDateSort('none');

		// Filter by search term
		if (searchTerm.length > 0) {
			filteredOrders = filteredOrders.filter((order) => {
				/** remove non numeric characters to searchTerm */
				const orderID = '#' + order.order_number;

				const poSearch =
					order.po_number && order.po_number.includes(searchTerm);

				return orderID.includes(searchTerm) || poSearch;
			});
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
				let isValid = true; // Start assuming the order is valid

				if (startDate) {
					const start = new Date(startDate);
					if (orderDate < start) {
						isValid = false; // If the order date is before the start date, it's not valid
					}
				}

				if (endDate) {
					const end = new Date(endDate);
					if (orderDate > end) {
						isValid = false; // If the order date is after the end date, it's not valid
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

		if (dueDateSort === 'asc') {
			filteredOrders = filteredOrders
				.filter((order) => order.due_date)
				.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
		}

		if (dueDateSort === 'desc') {
			filteredOrders = filteredOrders
				.filter((order) => order.due_date)
				.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
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
		setDueDateSort('none');
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

	const sortDueDate = (sort) => {
		setOrderTotalSort('none');
		setOrders((prev) => {
			let sortedOrders = [...prev];

			// First, bring orders with due_date and status 'pending' to the front
			sortedOrders.sort((a, b) => {
				if (
					a.due_date &&
					a.status === 'pending' &&
					!(b.due_date && b.status === 'pending')
				)
					return -1;
				if (
					!(a.due_date && a.status === 'pending') &&
					b.due_date &&
					b.status === 'pending'
				)
					return 1;
				return 0;
			});

			// Then sort them by due_date if both orders have due_date and status 'pending'
			if (sort === 'asc') {
				sortedOrders.sort((a, b) => {
					if (
						a.due_date &&
						b.due_date &&
						a.status === 'pending' &&
						b.status === 'pending'
					) {
						return new Date(a.due_date) - new Date(b.due_date);
					}
					return 0;
				});
			} else if (sort === 'desc') {
				sortedOrders.sort((a, b) => {
					if (
						a.due_date &&
						b.due_date &&
						a.status === 'pending' &&
						b.status === 'pending'
					) {
						return new Date(b.due_date) - new Date(a.due_date);
					}
					return 0;
				});
			}

			// Default sorting when 'none' is selected
			if (sort === 'none') {
				sortedOrders.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
			}

			return sortedOrders;
		});
	};

	return (
		<>
			<Search
				filters={handleFilter}
				reset={handleReset}
				setOrderTotalSort={setOrderTotalSort}
				setDueDateSort={setDueDateSort}
			/>
			{orders.length > 0 ? (
				<>
					<OrderTable
						orders={currentOrders}
						orderTotalSort={orderTotalSort}
						setOrderTotalSort={setOrderTotalSort}
						dueDateSort={dueDateSort}
						setDueDateSort={setDueDateSort}
						sortTotal={sortTotal}
						sortDueDate={sortDueDate}
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
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<span className="block sm:inline text-sm">
						No orders found for the given search criteria.
					</span>
				</div>
			)}
		</>
	);
}

export default Orders;
