import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { CloseIcon } from './svg/Icons';
import { processQuote } from './utils/QuoteFunctions';

export const DeleteQuote = () => {
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);
	const [label, setLabel] = useState("Yes I'm Sure");
	const [isDeleted, setIsDeleted] = useState(false);

	const handleDeleteQuote = async (event) => {
		event.preventDefault(); // Prevent default form submission
		setIsLoading(true);
		setLabel('Deleting...');
		// Form submission logic here
		try {
			const formData = new FormData();
			formData.append('nonce', NovaQuote.nonce);
			formData.append('quote_id', NovaQuote.current_quote_id);
			formData.append('action', 'delete_quote');
			formData.append('role', NovaQuote.user_role[0]);

			const data = await processQuote(formData);

			if (data.status === 'success') {
				setLabel('Deleted');
				setIsDeleted(true);
				window.location.replace(NovaQuote.mockup_account_url);
			} else {
				alert('Error');
			}
			console.log(data);
		} catch (err) {
			// Handle errors
			console.log(err);
			setError('Failed to delete quote. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const [isLoading, setIsLoading] = useState(false);
	return (
		<>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger asChild>
					<button className="border-nova-light border-solid rounded px-4 py-3 border font-title text-nova-gray uppercase text-xs bg-white inline-block hover:text-white hover:bg-red-600 w-full text-center cursor-pointer disabled:cursor-not-allowed">
						DELETE QUOTE
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[50]" />
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[51]">
						<Dialog.Title className="m-0 font-title uppercase font-medium text-lg text-center">
							Delete Quote
						</Dialog.Title>
						<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
							<div className="flex justify-center">
								<svg
									className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>

							{isDeleted ? (
								<>
									<p className="mb-4 text-gray-500 text-center">Deleted</p>
								</>
							) : (
								<>
									<p className="mb-4 text-gray-500 text-center">
										Are you sure you want to delete this quote?
									</p>
									<div className="flex justify-center items-center space-x-4">
										<Dialog.Close asChild>
											<button
												type="button"
												className="py-2 px-3 border border-solid text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
											>
												No, cancel
											</button>
										</Dialog.Close>
										<button
											onClick={handleDeleteQuote}
											disabled={isLoading}
											className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
										>
											{label}
										</button>
									</div>
								</>
							)}
						</Dialog.Description>
						<Dialog.Close asChild>
							<div
								className="text-nova-gray absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:shadow-[0_0_0_2px] focus:outline-none border cursor-pointer"
								aria-label="Close"
							>
								<CloseIcon />
							</div>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
};
