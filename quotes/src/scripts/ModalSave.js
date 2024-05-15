import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from './AppProvider';
import { CloseIcon, LoadingIcon } from './svg/Icons';
import { processQuote } from './utils/QuoteFunctions';
import { checkAndCreateFolder, renameFolder } from './utils/uploadFunctions';

function ModalSave({ action, btnClass, label }) {
	const { signage, tempFolder, missing, isLoading, setIsLoading, partner } =
		useAppContext();

	const required = missing;

	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState({});
	const [quoteID, setQuoteID] = useState('');
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
		if (required && required.length > 0) {
			let htmlString = '';

			required.forEach((missing) => {
				if (missing.missingFields.length > 0) {
					htmlString += `<strong class="uppercase">${missing.title}</strong>\n<ul>\n`;

					// Add each missing field as a list item
					missing.missingFields.forEach((field) => {
						htmlString += `    <li>${field}</li>\n`;
					});

					// Close the unordered list for this item
					htmlString += '</ul>\n';
				}
			});

			if (htmlString) {
				setError({
					type: 'missing',
					message: htmlString,
				});
			} else {
				setError('');
			}
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

	const toProcessingMessage = () => {
		return `
    <div class="mb-4">
      <p class="font-bold mb-4">QUOTE REQUEST RECEIVED.</p>
	  <p class="font-bold mb-0">Process:</p>
	  <ol class="mb-4">
		<li>We'll review your order before finalizing the price.</li>
		<li>For updates, please check your email or visit QUOTED (in MOCKUPS) within 1 business day.</li>
		<li>After getting a quote, add the product to your cart and go to the CART page.</li>
		<li>Next, proceed to CHECKOUT to pay.</li>
	  </ol>
	  <p class="font-bold mb-0">What's next?</p>
	  <strong>Go to Mockups:</strong> View all your sign mockups.<br>
	  <strong>Create New Mockup:</strong> Create a new design.</p>
    </div>
  `;
	};

	const updateMessageHtml = () => {
		return `
    <div class="mb-4">
      <p class="font-bold mb-4">UPDATED ORDER QUOTE DRAFT</p>
	  <p class="mb-4">You can still edit this project before sending it to us for the final quotation. Find your saved draft in the <strong>MOCKUPS</strong> section under <strong>DRAFTS</strong>.</p>
	  <p class="font-bold mb-0">What's next?</p>
	  <p><strong>Go to Mockups:</strong> View all your sign mockups.<br>
	  <strong>Create New Mockup:</strong> Create a new design.<br>
	  <strong>Continue Editing:</strong> Edit current mockup.</p>
    </div>
  `;
	};

	const saveDraftMessageHtml = () => {
		return `
    <div class="mb-4">
      <p class="font-bold mb-4">PROJECT IS SAVED AS A DRAFT</p>
	  <p class="mb-4">You can edit your saved draft anytime before submitting a quote. Access your saved work in <strong><a href="${NovaQuote.mockup_drafts_url}">DRAFTS</a></strong> (in MOCKUPS).</p>
	  <p class="font-bold mb-0">What's next?</p>
	  <p><strong>Go to Mockups:</strong> View all your sign mockups.<br>
	  <strong>Create New Mockup:</strong> Create a new design.<br>
	  <strong>Continue Editing:</strong> Edit current mockup.</p>

    </div>
  `;
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault(); // Prevent default form submission
		console.log(partner);
		setIsLoading(true);
		setSubmitting(true);

		// Form submission logic here
		try {
			const formData = new FormData();
			formData.append('nonce', NovaQuote.nonce);
			formData.append('title', title);
			formData.append('product', NovaQuote.product);
			formData.append('action', 'save_quote');
			formData.append('user_id', partner ?? NovaQuote.user_id);
			formData.append('signage', JSON.stringify(signage));
			formData.append('total', totalUsdPrice.toFixed(2));
			formData.append('quote_status', 'draft');
			formData.append('currency', wcumcs_vars_data.currency);
			formData.append('partner', partner ?? 0);

			if (action === 'update-processing' || action === 'processing') {
				formData.append('quote_status', 'processing');
			}

			if (action === 'update' || action === 'update-processing') {
				formData.append('quote_id', NovaQuote.current_quote_id);
				formData.append('editing', 'edit');
			}

			if (action === 'update-processing-admin') {
				formData.append('quote_status', 'processing');
				formData.append('quote_id', NovaQuote.current_quote_id);
				formData.append('editing', 'edit');
			}

			const status = await processQuote(formData);
			if (status.status === 'success') {
				if (NovaQuote.is_editting.length === 0) {
					console.log('renaming...');

					const folderPath = `/NOVA-CRM/${NovaQuote.business_id}/${tempFolder}`;
					const newPath = `/NOVA-CRM/${NovaQuote.business_id}/Q-${status.generated_id}`;

					try {
						const rename = await renameFolder(folderPath, newPath);

						if (rename) {
							console.log('updating quote field...');

							const prevSignage = JSON.stringify(signage);

							const updatedSignage = prevSignage.replace(
								new RegExp(folderPath, 'g'),
								newPath
							);

							const newData = new FormData();
							newData.append('nonce', NovaQuote.nonce);
							newData.append('updated', updatedSignage);
							newData.append('quote_id', status.generated_id); // Make sure to use newData here
							newData.append('action', 'update_dropbox_path');

							const updating = await processQuote(newData);

							if (updating.status === 'success') {
								console.log('Quote updated successfully');
							} else {
								console.error('Error updating quote:', updating);
								alert('Error');
							}
						} else {
							console.error('Renaming folder failed');
						}
					} catch (error) {
						console.error('An error occurred:', error);
						alert('An error occurred, please try again.');
					}
				}

				try {
					const projectFolder = `/NOVA-CRM/${NovaQuote.business_id}/Q-${status.generated_id}/FromClient`;
					const createFolder = await checkAndCreateFolder(projectFolder);
					if (createFolder) {
						console.log('Folder created');
					}
				} catch (error) {
					console.error('An error occurred:', error);
				}

				setQuoteID(status.generated_id);

				console.log(status);

				setSubmitted(true);
			} else {
				alert('Error');
			}
		} catch (err) {
			// Handle errors
			setError({
				type: 'not_saved',
				message: 'Failed to save quote. Please try again.',
			});
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog.Root open={submitting ? true : open} onOpenChange={setOpen}>
			{isLoading ? (
				<button className={btnClass}>
					{isLoading ? 'Please wait...' : label}
				</button>
			) : (
				<Dialog.Trigger asChild>
					<button className={btnClass}>
						{isLoading ? 'Please wait...' : label}
					</button>
				</Dialog.Trigger>
			)}

			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-[50]" />
				{!error ? (
					!submitted ? (
						<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[51] overflow-auto">
							<Dialog.Title className="m-0 font-title uppercase font-medium text-2xl">
								{action === 'processing' || action === 'update-processing'
									? 'Submit Your Quote Request'
									: 'Save Your Draft'}
							</Dialog.Title>
							<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
								Please add a PROJECT NAME.
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

								{action === 'processing' || action === 'update-processing' ? (
									<p className="text-sm mt-4">
										<strong>NOTE:</strong> Our team will finalize the pricing
										for this order once you click Submit. You CANNOT EDIT this
										project afterwards.
									</p>
								) : (
									<p className="text-sm mt-4">
										<strong>NOTE:</strong> You can still edit this product after
										you click{' '}
										{action === 'update' ? 'UPDATE QUOTE' : 'SAVE TO DRAFT'}. Go
										to MOCKUPS and select DRAFTS.
									</p>
								)}

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
						<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[51] overflow-auto">
							<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
								{(action === 'processing' ||
									action === 'update-processing') && (
									<div
										dangerouslySetInnerHTML={{
											__html: toProcessingMessage(),
										}}
									></div>
								)}
								{action === 'draft' && (
									<div
										dangerouslySetInnerHTML={{ __html: saveDraftMessageHtml() }}
									></div>
								)}
								{(action === 'update' ||
									action === 'update-processing-admin') && (
									<div
										dangerouslySetInnerHTML={{ __html: updateMessageHtml() }}
									></div>
								)}
								<div className="gap-2 block justify-center sm:flex">
									{(action === 'draft' ||
										action === 'update' ||
										action === 'update-processing-admin') && (
										<a
											href={NovaQuote.quote_url + '?qedit=1&qid=' + quoteID}
											className="block mb-4 text-center text-sm px-3 py-2 text-white no-underline bg-nova-primary rounded hover:bg-nova-secondary"
										>
											Continue Editing
										</a>
									)}
									<a
										href={NovaQuote.quote_url}
										className="block mb-4 text-center text-sm px-3 py-2 text-white no-underline bg-nova-primary rounded hover:bg-nova-secondary"
									>
										Create New Mockup
									</a>
									<a
										href={`${NovaQuote.mockup_account_url}`}
										className="block mb-4 text-center text-sm px-3 py-2 text-white no-underline bg-nova-primary rounded hover:bg-nova-secondary"
									>
										Go to Mockups
									</a>
								</div>
							</Dialog.Description>
						</Dialog.Content>
					)
				) : (
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[51] overflow-auto">
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
