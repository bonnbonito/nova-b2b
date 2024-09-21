import { useState } from 'react';
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
};

export default function Deposits() {
	const [orders, setOrders] = useState<Order[]>(NovaDeposits.pending_payments);

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
				{orders.map((order: Order) => (
					<TableRow key={order.order_id}>
						<TableCell className="font-medium">
							<Button asChild>
								<a href={order.order_admin_url}>{order.order_number}</a>
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
						<TableCell>{order.payment_date}</TableCell>
						<TableCell className="text-right">...</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
