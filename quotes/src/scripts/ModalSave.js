import * as Dialog from '@radix-ui/react-dialog';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NovaContext } from './NovaQuote';
import { CloseIcon, LoadingIcon } from './svg/Icons';
import { processQuote } from './utils/QuoteFunctions';

function ModalSave({ action, btnClass, label }) {
	const [isLoading, setIsLoading] = useState(false);
	const { signage } = useContext(NovaContext);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [title, setTitle] = useState(() =>
		NovaQuote.current_quote_title ? NovaQuote.current_quote_title : ''
	);
	const formRef = useRef(null);
	const inputRef = useRef(null);

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	useEffect(() => {
		const checkForEmptyLetters = (signageArray) => {
			return signageArray.some(
				(item) => item.type === 'letters' && item.letters === ''
			);
		};

		const checkForEmptyLettersHeight = (signageArray) => {
			return signageArray.some(
				(item) => item.type === 'letters' && item.letterHeight === ''
			);
		};

		const checkForEmptyLettersThickness = (signageArray) => {
			return signageArray.some(
				(item) => item.type === 'letters' && item.thickness === ''
			);
		};

		const checkForEmptyLogo = (signageArray) => {
			return signageArray.some(
				(item) => item.type === 'logo' && item.file === ''
			);
		};

		const hasEmptyLetters = checkForEmptyLetters(signage);
		const hasEmptyLogo = checkForEmptyLogo(signage);
		const hasEmptyLettersHeight = checkForEmptyLettersHeight(signage);
		const hasEmptyLettersThickness = checkForEmptyLettersThickness(signage);

		if (hasEmptyLetters && hasEmptyLogo) {
			setError('Error: Please add Letter text and upload a file to the Logo');
		} else if (hasEmptyLetters) {
			setError('Error: Please add a content to the Letters');
		} else if (hasEmptyLogo) {
			setError('Error: Please upload a file to the logo');
		} else if (hasEmptyLettersThickness) {
			setError('Error: Please choose a letter thickness');
		} else if (hasEmptyLettersHeight) {
			setError('Error: Please choose a letter height');
		} else {
			if (
				NovaQuote.user_role[0] === 'pending' &&
				(action === 'update-processing' || action === 'processing')
			) {
				setError(
					'Error: Your account is not yet approved. You cannot submit a quotation yet.'
				);
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
			console.log(action);

			if (action === 'update-processing' || action === 'processing') {
				formData.append('quote_status', 'processing');
			}

			if (action === 'update' || action === 'update-processing') {
				formData.append('quote_id', NovaQuote.current_quote_id);
				formData.append('editing', 'edit');
			}

			const status = await processQuote(formData);
			console.log(status);
			if (status === 'success') {
				if (action !== 'update') {
					window.location.replace(NovaQuote.mockup_account_url);
				}
			} else {
				alert('Error');
			}
		} catch (err) {
			// Handle errors
			setError('Failed to save quote. Please try again.');
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
							{error}
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
