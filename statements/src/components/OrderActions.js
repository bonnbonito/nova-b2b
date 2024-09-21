import React from 'react';
import { CancelIcon, EyeIcon, InvoiceIcon, PayIcon } from './Icons';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/DropdownMenu';

export default function OrderActions({ order }) {
	return (
		<div className="relative flex justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6 cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
						/>
					</svg>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-white">
					{Object.entries(order.actions).map(([actionKey, actionValue]) => {
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
								content = <EyeIcon className="mr-1 hover:text-nova-primary" />;
								title = 'View Order';
								break;
						}

						return (
							<DropdownMenuItem>
								<a
									className={`text-black flex no-underline items-center hover:text-nova-primary print-link ${actionKey}`}
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
									{content} {title}
								</a>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
