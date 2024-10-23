import { CheckCheckIcon, Loader2, Mail, SquareX, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/ButtonUI';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from './ui/DropdownMenuUI';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from './ui/AlertDialogUI';

export function Actions({ order, deleteOrder }) {
	const [isLoading, setIsLoading] = useState(false);
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);

	const handleDelete = () => {
		// Implement your logout logic here
		deleteOrder(order.order_id);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</>
						) : (
							'Open'
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-white w-80">
					<DropdownMenuLabel>Emails</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						{order.emails?.map((email, index) => (
							<DropdownMenuItem key={index} onClick={() => console.log(email)}>
								{email.email_sent ? <CheckCheckIcon /> : <Mail />}
								<span>{email.email_label}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							setIsLoading(true);
							setShowLogoutAlert(true);
						}}
					>
						<Trash2 />
						<span>Delete</span>
						<DropdownMenuShortcut>
							<SquareX />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to delete?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This will delete the order in the pending payment table.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsLoading(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
