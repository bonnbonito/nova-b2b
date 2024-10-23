import { useState } from 'react';
import { Actions } from './components/Actions';
import { Button } from './components/ui/ButtonUI';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './components/ui/TableUI';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './components/ui/ToolTipUI';

type Order = {
	order_id: number;
	order_number: string;
	order_url: string;
	customer_name: string;
	deposit_chosen: string;
	deposit_amount: string;
	total: string;
	order_status: string;
	payment_date: string;
	order_admin_url: string;
	total_amount: string;
	due_date: string;
	time_diff: string;
	ago: boolean;
	emails: string[];
};

export default function Deposits() {
	const [orders, setOrders] = useState<Order[]>(NovaDeposits.pending_payments);

	const deleteOrder = (order_id: number) => {
		const formData = new FormData();
		formData.append('action', 'delete_pending_payment_order');
		formData.append('order_id', order_id.toString());
		formData.append('security', NovaDeposits.nonce);
		fetch(NovaDeposits.ajax_url, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
				if (data.success) {
					setOrders(
						NovaDeposits.pending_payments.filter(
							(order) => order.order_id != order_id
						)
					);
				}
			})
			.catch((error) => console.error(error));
	};

	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Order</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Payment Type</TableHead>
					<TableHead>Deposit</TableHead>
					<TableHead>Total Amount</TableHead>
					<TableHead>Order Status</TableHead>
					<TableHead>Due Date</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order: Order) => {
					let due_date = order.due_date;
					let due_date_display = '';
					if (due_date) {
						//convert to May 1, 2022 format
						due_date_display = new Date(due_date).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						});
					}
					return (
						<TableRow key={order.order_id}>
							<TableCell className="font-medium">
								<Button asChild>
									<a href={order.order_admin_url} target="_blank">
										{order.order_number}
									</a>
								</Button>
							</TableCell>
							<TableCell>{order.customer_name}</TableCell>
							<TableCell>{order.deposit_chosen}</TableCell>
							<TableCell
								dangerouslySetInnerHTML={{ __html: order.deposit_amount }}
							></TableCell>
							<TableCell
								dangerouslySetInnerHTML={{ __html: order.total_amount }}
							></TableCell>
							<TableCell>{order.order_status}</TableCell>
							<TableCell>
								{due_date && (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<p className="flex gap-2 items-center">
													{order.ago ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="red"
															className="size-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
															/>
														</svg>
													)}
													{due_date_display}
												</p>
											</TooltipTrigger>
											<TooltipContent
												className={order.ago && 'bg-red-600 text-white'}
											>
												<p>{`${order.time_diff} ${
													order.ago ? 'ago' : 'from now'
												}`}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
							</TableCell>
							<TableCell className="text-right">
								<Actions order={order} deleteOrder={deleteOrder} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
