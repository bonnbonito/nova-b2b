import React, { useMemo, useState } from 'react';

export default function PendingOrderTable({
	orders,
	orderTotalSort,
	setOrderTotalSort,
	sortTotal,
	dueDateSort,
	setDueDateSort,
	sortDueDate,
}) {
	// State to manage selected orders
	const [selectedOrders, setSelectedOrders] = useState([]);

	// Determine if all orders are selected
	const isAllSelected =
		orders.length > 0 && selectedOrders.length === orders.length;

	// Function to handle toggling all orders
	const handleSelectAll = () => {
		if (isAllSelected) {
			// Deselect all orders
			setSelectedOrders([]);
		} else {
			// Select all orders
			const allOrderIds = orders.map((order) => order.id);
			setSelectedOrders(allOrderIds);
		}
	};

	// Function to handle individual order selection
	const handleSelectOrderChange = (orderId) => (event) => {
		const isChecked = event.target.checked;
		if (isChecked) {
			// Add order ID to selectedOrders if not already selected
			setSelectedOrders((prevSelected) => [...prevSelected, orderId]);
		} else {
			// Remove order ID from selectedOrders
			setSelectedOrders((prevSelected) =>
				prevSelected.filter((id) => id !== orderId)
			);
		}
	};

	const toggleSortTotal = () => {
		if (orderTotalSort === 'none') {
			setOrderTotalSort('asc');
			sortTotal('asc');
		} else if (orderTotalSort === 'asc') {
			setOrderTotalSort('desc');
			sortTotal('desc');
		} else {
			setOrderTotalSort('none');
			sortTotal('none');
		}
	};

	const toggleSortDueDate = () => {
		if (dueDateSort === 'none') {
			setDueDateSort('asc');
			sortDueDate('asc');
		} else if (dueDateSort === 'asc') {
			setDueDateSort('desc');
			sortDueDate('desc');
		} else {
			setDueDateSort('none');
			sortDueDate('none');
		}
	};

	const nonce = window.NovaOrders?.nonce || '';

	// Calculate the total sum of selected orders
	const totalSumOfOrders = useMemo(() => {
		const sum = orders
			.filter((order) => selectedOrders.includes(order.id))
			.reduce((acc, order) => acc + parseFloat(order.order_total), 0);

		return sum.toFixed(2);
	}, [selectedOrders, orders]);

	return (
		<>
			<div className="table-responsive overflow-x-auto">
				<table className="shop_table border-collapse w-full min-w-[800px]">
					<thead>
						<tr>
							<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
								{/* Check All */}
								<input
									type="checkbox"
									onChange={handleSelectAll}
									checked={isAllSelected}
								/>
							</th>
							<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
								Order
							</th>
							<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
								Date
							</th>
							<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
								Payment Type
							</th>
							{NovaOrders.has_payment_types.length > 0 && (
								<th
									className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase cursor-pointer"
									onClick={toggleSortDueDate}
								>
									Due Date <span className={`sort-by ${dueDateSort}`}></span>
								</th>
							)}
							<th
								className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase cursor-pointer"
								onClick={toggleSortTotal}
							>
								Total <span className={`sort-by ${orderTotalSort}`}></span>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm">
						{orders.map((order) => (
							<tr
								key={order.id}
								className={`hover:bg-gray-100 ${order.status}`}
							>
								<td className="py-4 px-4">
									<input
										type="checkbox"
										checked={selectedOrders.includes(order.id)}
										onChange={handleSelectOrderChange(order.id)}
									/>
								</td>
								<td className="py-4 px-4">
									<a href={order.order_url} className="text-nova-primary">
										#{order.order_number}
									</a>
								</td>
								<td className="py-4 px-4">{order.date}</td>
								<td
									className={`py-4 px-4 capitalize order-actions ${
										order.status
									} ${
										order.is_overdue ? 'text-red-500 flex items-center' : ''
									}`}
								>
									{order.payment_select}
								</td>
								{NovaOrders.has_payment_types && (
									<td className="py-4 px-4">{order.due_date}</td>
								)}
								<td
									dangerouslySetInnerHTML={{ __html: order.total }}
									className="py-4 px-4 font-title"
								></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Show a button that says "Pay Selected Invoice" if there are selected orders */}
			{selectedOrders.length > 0 && (
				<form method="post" action="">
					<input type="hidden" name="pay_multiple_orders_nonce" value={nonce} />
					{selectedOrders.map((orderId) => (
						<input
							key={orderId}
							type="hidden"
							name="order_ids[]"
							value={orderId}
						/>
					))}
					<input type="hidden" name="customer_id" value="pay_multiple_orders" />
					<button
						type="submit"
						name="pay_multiple_orders_submit"
						className="bg-nova-primary text-white py-2 px-4 rounded-md mt-4"
					>
						Pay Selected Invoice (Total: ${totalSumOfOrders})
					</button>
				</form>
			)}
		</>
	);
}
