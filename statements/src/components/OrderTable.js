import React from 'react';
import { CancelIcon, EyeIcon, InvoiceIcon, PayIcon } from './Icons';

export default function OrderTable({
	orders,
	orderTotalSort,
	setOrderTotalSort,
	sortTotal,
	dueDateSort,
	setDueDateSort,
	sortDueDate,
}) {
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

	const printInvoice = (url) => {
		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const fileURL = URL.createObjectURL(blob);
				const printWindow = window.open(fileURL);
				printWindow.addEventListener('load', () => {
					printWindow.print();
				});
			})
			.catch((error) => console.error('Error fetching the file:', error));
	};

	return (
		<div className="table-responsive overflow-x-auto">
			<table className="shop_table border-collapse w-full min-w-[800px]">
				<thead>
					<tr>
						<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
							Order
						</th>
						<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
							Date
						</th>
						<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase">
							Status
						</th>
						{NovaOrders.has_payment_types && (
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
						<th className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase"></th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{orders.map((order) => (
						<tr key={order.id} className={`hover:bg-gray-100 ${order.status}`}>
							<td className="py-4 px-4">
								<a href={order.order_url} className="text-nova-primary">
									#{order.order_number}
								</a>
							</td>
							<td className="py-4 px-4">{order.date}</td>
							<td
								className={`py-4 px-4 capitalize order-actions ${
									order.status
								} ${order.is_overdue ? 'text-red-500 flex items-center' : ''}`}
							>
								{order.is_overdue
									? 'Overdue'
									: `${order.status.replace('-', ' ')} ${
											order.status === 'pending' ? ' Payment' : ''
									  }`}
								{order.is_overdue && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="red"
										className="size-5"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</td>
							{NovaOrders.has_payment_types && (
								<td className="py-4 px-4">{order.due_date}</td>
							)}
							<td
								dangerouslySetInnerHTML={{ __html: order.total }}
								className="py-4 px-4 font-title"
							></td>
							<td className="py-4 px-4 text-xs">
								<div className="flex gap-x-4 justify-end uppercase">
									{Object.entries(order.actions).map(
										([actionKey, actionValue]) => {
											let content, title;

											switch (actionValue.name.toLowerCase()) {
												case 'invoice':
													content = (
														<InvoiceIcon className="mr-1 hover:text-nova-primary" />
													);
													title = 'Print Invoice';
													break;
												case 'cancel':
													content = (
														<CancelIcon className="size-[14px] mr-1 hover:text-nova-primary" />
													);
													title = 'Cancel Order';
													break;
												case 'pay':
													content = (
														<PayIcon className="size-[14px] mr-1 hover:text-nova-primary" />
													);
													title = 'Pay Order';
													break;
												default:
													content = (
														<EyeIcon className="mr-1 hover:text-nova-primary" />
													);
													title = 'View Order';
													break;
											}

											return (
												<a
													className={`text-black uppercase flex items-center hover:text-nova-primary print-link ${actionKey}`}
													key={actionKey}
													href={actionValue.url}
													title={title}
													onClick={
														actionKey === 'invoice'
															? (e) => {
																	e.preventDefault();
																	printInvoice(actionValue.url);
															  }
															: undefined
													}
												>
													{content}
												</a>
											);
										}
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
