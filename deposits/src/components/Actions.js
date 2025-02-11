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
	const [showEmailAlert, setShowEmailAlert] = useState(false);
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleDelete = () => {
		// Implement your logout logic here
		deleteOrder(order.order_id);
		setIsLoading(false); // Reset loading state after deletion
		setShowLogoutAlert(false); // Close the alert dialog after action
	};

	const sendReminder = (email, index) => {
		if (!email) return;
		const formData = new FormData();
		formData.append('action', 'nova_deposit_reminder_email');
		formData.append('email_key', email?.email_key);
		formData.append('order_id', email?.order_id);
		formData.append('row_index', index);
		formData.append('security', NovaDeposits.nonce);

		console.log(email, index);

		fetch(NovaDeposits.ajax_url, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
				location.reload();
				// Optionally, update the state or provide feedback to the user
				// setIsLoading(false); // Reset loading state after sending email
				// setShowEmailAlert(false); // Close the alert dialog after action
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false); // Reset loading state even if there's an error
			});
	};

	return (
		order.shipped_date && (
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
						{order.shipped_date && (
							<>
								<DropdownMenuLabel>Emails</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									{order.emails?.map((email, index) => (
										<DropdownMenuItem
											key={index}
											onClick={() => {
												setShowEmailAlert(true); // Corrected function name
												setSelectedEmail(email); // Corrected typo
												setSelectedIndex(index);
											}}
										>
											{email.email_sent ? <CheckCheckIcon /> : <Mail />}
											<span>{email.email_label}</span>
										</DropdownMenuItem>
									))}
								</DropdownMenuGroup>
							</>
						)}
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
							<AlertDialogCancel
								onClick={() => {
									setIsLoading(false);
									setShowLogoutAlert(false);
								}}
							>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleDelete}>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<AlertDialog open={showEmailAlert} onOpenChange={setShowEmailAlert}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to send the email?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This will send a reminder email.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								onClick={() => {
									setIsLoading(false);
									setShowEmailAlert(false);
								}}
							>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									setIsLoading(true);
									sendReminder(selectedEmail, selectedIndex);
								}}
							>
								Send
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</>
		)
	);
}
