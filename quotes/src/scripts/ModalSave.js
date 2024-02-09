import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useRef, useState } from 'react';
import { CloseIcon, LoadingIcon } from './svg/Icons';
import { processQuote } from './utils/QuoteFunctions';

function ModalSave({ signage, action, btnClass, label, required }) {
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState({});
	const [title, setTitle] = useState(() =>
		NovaQuote.current_quote_title ? NovaQuote.current_quote_title : ''
	);
	const formRef = useRef(null);
	const inputRef = useRef(null);

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	function checkForMissingValues(signageArray) {
		let missingFields = [];

		signageArray.forEach((signageItem) => {
			const type = signageItem.type;
			const requiredFields = required[type];

			if (requiredFields) {
				const missingFieldsForItem = requiredFields
					.filter((field) => {
						if (field.key === 'color') {
							return (
								!signageItem[field.key] ||
								signageItem[field.key].name === '' ||
								signageItem[field.key].name === undefined
							);
						} else {
							return (
								signageItem[field.key] === '' ||
								signageItem[field.key] === undefined
							);
						}
					})
					.map((field) => field.title);

				if (missingFieldsForItem.length > 0) {
					missingFields.push({
						itemId: signageItem.id,
						missing: missingFieldsForItem,
					});
				}
			}
		});

		return missingFields;
	}

	useEffect(() => {
		const missingValues = checkForMissingValues(signage);

		if (missingValues && missingValues.length > 0) {
			let htmlString = '';

			missingValues.forEach((missing) => {
				// Find the title of the item with the missing values
				const itemTitle =
					signage.find((item) => item.id === missing.itemId)?.title ||
					'Unknown Item';

				// Start the HTML string for this item
				htmlString += `<strong class="uppercase">${itemTitle}</strong>\n<ul>\n`;

				// Add each missing field as a list item
				missing.missing.forEach((field) => {
					htmlString += `    <li>${field}</li>\n`;
				});

				// Close the unordered list for this item
				htmlString += '</ul>\n';
			});

			setError({
				type: 'missing',
				message: htmlString,
			});
		} else {
			if (
				NovaQuote.user_role[0] === 'pending' &&
				(action === 'update-processing' || action === 'processing')
			) {
				setError({
					type: 'not_approved',
					message:
						'Error: Your account is not yet approved. You cannot submit a quotation yet.',
				});
			} else {
				setError(''); // No error
			}
		}
	}, [signage]);

	const loadingStatus = () => {
		if (isLoading) {
			return <LoadingIcon text="Saving..." />;
		} else {
			return label;
		}
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault(); // Prevent default form submission
		setIsLoading(true);

		// Form submission logic here
		try {
			const formData = new FormData();
			formData.append('nonce', NovaQuote.nonce);
			formData.append('title', title);
			formData.append('product', NovaQuote.product);
			formData.append('action', 'save_quote');
			formData.append('signage', JSON.stringify(signage));
			formData.append('total', totalUsdPrice.toFixed(2));
			formData.append('quote_status', 'draft');

			if (action === 'update-processing' || action === 'processing') {
				formData.append('quote_status', 'processing');
			}

			if (action === 'update' || action === 'update-processing') {
				formData.append('quote_id', NovaQuote.current_quote_id);
				formData.append('editing', 'edit');
			}

			const status = await processQuote(formData);
			if (status === 'success') {
				localStorage.removeItem(window.location.href + NovaQuote.user_id);
				if (action !== 'update') {
					window.location.replace(NovaQuote.mockup_account_url);
				}
			} else {
				alert('Error');
			}
		} catch (err) {
			// Handle errors
			setError({
				type: 'not_saved',
				message: 'Failed to save quote. Please try again.',
			});
		} finally {
			setIsLoading(false);
			setOpen(false);
		}
	};

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className={btnClass}>{label}</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[50]" />
				{!error ? (
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[51]">
						<Dialog.Title className="m-0 font-title uppercase font-medium">
							Quotation Name
						</Dialog.Title>
						<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
							Add a title to your quote.
						</Dialog.Description>
						<form ref={formRef} onSubmit={handleFormSubmit}>
							<input
								className="nline-flex h-[45px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] font-title"
								name="quoteTitle"
								id="quoteTitle"
								ref={inputRef}
								required={true}
								value={title}
								onChange={handleTitleChange}
								disabled={isLoading}
							/>

							<div className="mt-[25px] flex justify-end">
								{title.length > 0 && (
									<button
										className="block h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none background-nova-primary text-white font-title uppercase border bg-black"
										disabled={isLoading}
									>
										{loadingStatus()}
									</button>
								)}
							</div>
						</form>
						<Dialog.Close asChild>
							<div
								className="text-nova-gray absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:shadow-[0_0_0_2px] focus:outline-none border cursor-pointer"
								aria-label="Close"
							>
								<CloseIcon />
							</div>
						</Dialog.Close>
					</Dialog.Content>
				) : (
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[51]">
						<Dialog.Title className="m-0 font-title uppercase font-medium">
							Error
						</Dialog.Title>
						<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
							{error.type === 'missing' && (
								<h5 className="font-title mb-4 uppercase">Missing Values:</h5>
							)}
							<div dangerouslySetInnerHTML={{ __html: error.message }} />
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
				)}
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default ModalSave;
