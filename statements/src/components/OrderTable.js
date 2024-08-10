import React from 'react';

export default function OrderTable({
	orders,
	orderTotalSort,
	setOrderTotalSort,
	sortTotal,
}) {
	const toggleSort = () => {
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
						<th
							className="font-medium p-4 pt-0 pb-3 text-black text-left font-title uppercase cursor-pointer"
							onClick={toggleSort}
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
							<td
								dangerouslySetInnerHTML={{ __html: order.total }}
								className="py-4 px-4 font-title"
							></td>
							<td className="py-4 px-4 text-xs">
								<div className="flex gap-x-4 justify-end uppercase">
									{Object.entries(order.actions).map(
										([actionKey, actionValue]) => {
											let content;

											switch (actionValue.name.toLowerCase()) {
												case 'invoice':
													content = (
														<svg
															width="14"
															height="17"
															viewBox="0 0 17 17"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															className="mr-1 hover:text-nova-primary"
														>
															<path
																d="M5.66602 14.875C5.27643 14.875 4.94293 14.7363 4.66549 14.4589C4.38806 14.1814 4.24935 13.8479 4.24935 13.4583V12.0417H2.83268C2.4431 12.0417 2.10959 11.903 1.83216 11.6255C1.55473 11.3481 1.41602 11.0146 1.41602 10.625V7.79167C1.41602 7.18958 1.62261 6.6849 2.03581 6.2776C2.449 5.87031 2.95074 5.66667 3.54102 5.66667H13.4577C14.0598 5.66667 14.5645 5.87031 14.9717 6.2776C15.379 6.6849 15.5827 7.18958 15.5827 7.79167V10.625C15.5827 11.0146 15.444 11.3481 15.1665 11.6255C14.8891 11.903 14.5556 12.0417 14.166 12.0417H12.7493V13.4583C12.7493 13.8479 12.6106 14.1814 12.3332 14.4589C12.0558 14.7363 11.7223 14.875 11.3327 14.875H5.66602ZM2.83268 10.625H4.24935C4.24935 10.2354 4.38806 9.90191 4.66549 9.62448C4.94293 9.34705 5.27643 9.20833 5.66602 9.20833H11.3327C11.7223 9.20833 12.0558 9.34705 12.3332 9.62448C12.6106 9.90191 12.7493 10.2354 12.7493 10.625H14.166V7.79167C14.166 7.59097 14.0981 7.42274 13.9624 7.28698C13.8266 7.15122 13.6584 7.08333 13.4577 7.08333H3.54102C3.34032 7.08333 3.17209 7.15122 3.03633 7.28698C2.90056 7.42274 2.83268 7.59097 2.83268 7.79167V10.625ZM11.3327 5.66667V3.54167H5.66602V5.66667H4.24935V3.54167C4.24935 3.15208 4.38806 2.81858 4.66549 2.54115C4.94293 2.26372 5.27643 2.125 5.66602 2.125H11.3327C11.7223 2.125 12.0558 2.26372 12.3332 2.54115C12.6106 2.81858 12.7493 3.15208 12.7493 3.54167V5.66667H11.3327ZM12.7493 8.85417C12.95 8.85417 13.1183 8.78628 13.254 8.65052C13.3898 8.51476 13.4577 8.34653 13.4577 8.14583C13.4577 7.94514 13.3898 7.77691 13.254 7.64115C13.1183 7.50538 12.95 7.4375 12.7493 7.4375C12.5487 7.4375 12.3804 7.50538 12.2447 7.64115C12.1089 7.77691 12.041 7.94514 12.041 8.14583C12.041 8.34653 12.1089 8.51476 12.2447 8.65052C12.3804 8.78628 12.5487 8.85417 12.7493 8.85417ZM11.3327 13.4583V10.625H5.66602V13.4583H11.3327Z"
																fill="currentColor"
															/>
														</svg>
													);
													break;
												case 'cancel':
													content = (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															className="size-[14px] mr-1 hover:text-nova-primary"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M6 18 18 6M6 6l12 12"
															/>
														</svg>
													);
													break;
												case 'pay':
													content = (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-[14px] mr-1 hover:text-nova-primary"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
															/>
														</svg>
													);
													break;
												default:
													content = (
														<svg
															width="14"
															height="14"
															viewBox="0 0 14 10"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															className="mr-1 hover:text-nova-primary"
														>
															<path
																d="M7 8C7.79545 8 8.47159 7.70833 9.02841 7.125C9.58523 6.54167 9.86364 5.83333 9.86364 5C9.86364 4.16667 9.58523 3.45833 9.02841 2.875C8.47159 2.29167 7.79545 2 7 2C6.20455 2 5.52841 2.29167 4.97159 2.875C4.41477 3.45833 4.13636 4.16667 4.13636 5C4.13636 5.83333 4.41477 6.54167 4.97159 7.125C5.52841 7.70833 6.20455 8 7 8ZM7 6.8C6.52273 6.8 6.11705 6.625 5.78295 6.275C5.44886 5.925 5.28182 5.5 5.28182 5C5.28182 4.5 5.44886 4.075 5.78295 3.725C6.11705 3.375 6.52273 3.2 7 3.2C7.47727 3.2 7.88295 3.375 8.21705 3.725C8.55114 4.075 8.71818 4.5 8.71818 5C8.71818 5.5 8.55114 5.925 8.21705 6.275C7.88295 6.625 7.47727 6.8 7 6.8ZM7 10C5.45152 10 4.04091 9.54722 2.76818 8.64167C1.49545 7.73611 0.572727 6.52222 0 5C0.572727 3.47778 1.49545 2.26389 2.76818 1.35833C4.04091 0.452778 5.45152 0 7 0C8.54848 0 9.95909 0.452778 11.2318 1.35833C12.5045 2.26389 13.4273 3.47778 14 5C13.4273 6.52222 12.5045 7.73611 11.2318 8.64167C9.95909 9.54722 8.54848 10 7 10ZM7 8.66667C8.19848 8.66667 9.29886 8.33611 10.3011 7.675C11.3034 7.01389 12.0697 6.12222 12.6 5C12.0697 3.87778 11.3034 2.98611 10.3011 2.325C9.29886 1.66389 8.19848 1.33333 7 1.33333C5.80152 1.33333 4.70114 1.66389 3.69886 2.325C2.69659 2.98611 1.9303 3.87778 1.4 5C1.9303 6.12222 2.69659 7.01389 3.69886 7.675C4.70114 8.33611 5.80152 8.66667 7 8.66667Z"
																fill="currentColor"
															/>
														</svg>
													);
													break;
											}

											return (
												<a
													className={`text-black uppercase flex items-center hover:text-nova-primary print-link ${actionKey}`}
													key={actionKey}
													href={actionValue.url}
													title={actionValue.name}
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
													{actionValue.name}
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
