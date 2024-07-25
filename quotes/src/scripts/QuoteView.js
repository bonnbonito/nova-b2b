import { useEffect, useRef, useState } from 'react';
import { DeleteQuote } from './DeleteQuote';
import PricesView from './PricesView';
import { EXCHANGE_RATE } from './utils/defaults';

const decodeHTML = (html) => {
	let txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

export default function QuoteView() {
	const NovaAccount = NovaMyAccount.quote;
	const taxRate = NovaMyAccount.tax_rate;
	const currency = wcumcs_vars_data.currency;
	const signage = NovaMyAccount.quote ? JSON.parse(NovaAccount.data) : null;
	const quoteRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [addedToCart, setAddedToCart] = useState(NovaQuote.is_added_to_cart);

	useEffect(() => {
		if (!NovaAccount || Object.keys(NovaAccount).length === 0) {
			window.location.href = NovaQuote.mockup_account_url;
		}
	}, []);

	const addToCart = () => {
		if (addedToCart) return;
		setIsLoading(true);

		const formData = new FormData();
		formData.append('action', 'to_checkout');
		formData.append('quote', NovaAccount.ID);
		formData.append('nonce', NovaMyAccount.nonce);
		formData.append('role', NovaQuote.user_role[0]);
		formData.append('nova_product', NovaQuote.nova_quote_product.ID);
		formData.append(
			'product',
			NovaAccount.product_name
				? decodeHTML(NovaAccount.product_name)
				: 'Custom Project'
		);
		formData.append('product_id', NovaQuote.generated_product_id);
		formData.append('product_line', NovaAccount.product_line?.ID);

		fetch(NovaMyAccount.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				if (data.code == 2) {
					const cartTotal = document.querySelector('.header-cart-total');
					cartTotal.innerText = parseInt(cartTotal.innerText) + 1;

					setAddedToCart(true);

					let event = new Event('added_to_cart');
					//document.body.dispatchEvent(event);
					setIsLoading(false);
					alert('Added to cart');
				} else {
					alert(data.error);
					location.reload(true);
				}
			})
			.catch((error) => console.error('Error:', error));
	};

	const quotePrice = NovaAccount?.final_price
		? parseFloat(NovaAccount.final_price)
		: 0;

	const finalPrice =
		currency === 'USD' ? quotePrice : quotePrice * EXCHANGE_RATE;

	const flatRate = currency === 'USD' ? 14.75 : 14.75 * EXCHANGE_RATE;

	const standardRate = parseFloat((finalPrice * 0.075).toFixed(2));

	const estimatedShipping =
		quotePrice > 0 ? Math.max(flatRate, standardRate) : 0;

	const priceWithShipping = parseFloat(
		(finalPrice + estimatedShipping).toFixed(2)
	);

	const tax = taxRate ? parseFloat((taxRate.tax_rate / 100).toFixed(2)) : 0;
	const taxCompute = parseFloat((priceWithShipping * tax).toFixed(2));

	const estimatedTotal = parseFloat(
		(finalPrice + estimatedShipping + taxCompute).toFixed(2)
	);

	const downloadFile = NovaAccount?.ID
		? `/${NovaAccount.business_id}-INV-Q-${NovaAccount.ID}-${currency}.pdf`
		: null;

	return (
		NovaAccount && (
			<>
				<div className="flex pb-4 mb-4 border-b justify-between">
					<a
						href={NovaQuote.mockup_account_url}
						className="border-nova-light rounded px-4 py-3 border font-title text-nova-gray uppercase text-xs bg-white inline-flex items-center hover:text-black hover:bg-nova-light"
					>
						← Back To Mockups
					</a>
					{NovaAccount?.quote_status?.value === 'ready' && (
						<a
							href={downloadFile && NovaQuote.invoice_url + downloadFile}
							className={`rounded px-4 py-3 border ${
								!isDownloading
									? 'border-nova-light font-title text-nova-primary bg-white'
									: 'border-gray-300 text-gray-500 bg-gray-100'
							} text-xs inline-block hover:text-white hover:bg-nova-primary w-[160px] text-center cursor-pointer`}
							disabled={isDownloading}
							target="_blank"
						>
							{isDownloading ? 'Downloading...' : 'DOWNLOAD PDF'}
						</a>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
					<div id="quoteDiv" ref={quoteRef} className="pb-6">
						<div className="flex gap-2 items-center mb-4 ">
							<h6 className="m-0 text-nova-primary">
								STATUS:{' '}
								<span className="text-sm">
									{NovaAccount?.quote_status?.label}
								</span>
							</h6>
						</div>
						<div className="mb-10 block">
							<h4 className="uppercase">
								QUOTE ID: Q-{NovaAccount?.ID.padStart(4, '0')}
							</h4>
						</div>
						<div className="flex gap-2 items-center">
							<h6 className="leading-[2] m-0">INITIAL QUOTE REQUESTED ON:</h6>{' '}
							<span className="text-sm">{NovaAccount?.published}</span>
						</div>
						<div className="flex gap-2 items-center">
							<h6 className="leading-[2] m-0">LAST QUOTE SAVED:</h6>{' '}
							<span className="text-sm">{NovaAccount?.updated_date}</span>
						</div>
						<div className="flex gap-2 items-center mb-6">
							<h6 className="leading-[2] m-0">QUOTE NAME:</h6>{' '}
							<span className="text-sm">{decodeHTML(NovaAccount?.title)}</span>
						</div>
						<div className="flex gap-2 items-center">
							<h6 className="leading-[2] m-0">BUSINESS ID:</h6>{' '}
							<span className="text-sm">
								{NovaAccount?.business_id ? NovaAccount?.business_id : 'None'}
							</span>
						</div>
						<div className="flex gap-2 items-center mb-6">
							<h6 className="leading-[2] m-0">COMPANY NAME:</h6>{' '}
							<span className="text-sm">
								{NovaAccount?.company_name ? NovaAccount?.company_name : 'None'}
							</span>
						</div>

						<div className="flex gap-2 items-center">
							<h6 className="leading-[2] m-0">MATERIAL:</h6>{' '}
							<span className="text-sm">
								{NovaAccount?.material ? NovaAccount?.material : 'None'}
							</span>
						</div>
						<div className="flex gap-2 items-center mb-8 pb-8 border-b-nova-light border-b">
							<h6 className="leading-[2] m-0">PRODUCT:</h6>{' '}
							<span className="text-sm">
								{NovaAccount?.product_name
									? decodeHTML(NovaAccount?.product_name)
									: 'None'}
							</span>
						</div>
						{signage?.map((item) => (
							<PricesView id={item.id} item={item}></PricesView>
						))}

						{NovaAccount?.note && (
							<div className="block mb-4">
								<h5>Note:</h5>
								<div
									id="novaQuoteNote"
									className="nova-quote-note block text-sm"
									dangerouslySetInnerHTML={{ __html: NovaAccount?.note }}
								></div>
							</div>
						)}

						<div className="flex justify-between gap-4">
							<h5>
								{`${
									NovaAccount?.quote_status?.value === 'ready'
										? 'SUBTOTAL'
										: 'ESTIMATED SUBTOTAL'
								}`}
								:
							</h5>{' '}
							<h5>
								{finalPrice > 0
									? `${currency}$${Number(
											finalPrice.toFixed(2)
									  ).toLocaleString()}`
									: 'TBD'}
							</h5>
						</div>

						{taxRate && (
							<div className="flex justify-between gap-4">
								<h5>{taxRate.tax_rate_name}</h5>{' '}
								<h5>
									{taxCompute > 0
										? `${currency}$${Number(
												taxCompute.toFixed(2)
										  ).toLocaleString()}`
										: 'TBD'}
								</h5>
							</div>
						)}

						<div className="flex justify-between gap-4">
							<h5 className="flex gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 cursor-pointer select-none"
									onClick={() => setIsHovered((prev) => !prev)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
									/>
								</svg>
								PACKAGING &amp; SHIPPING:
							</h5>{' '}
							<h5>
								{estimatedShipping > 0
									? `${currency}$${Number(
											estimatedShipping.toFixed(2)
									  ).toLocaleString()}`
									: 'TBD'}
							</h5>
						</div>
						<div
							className={`text-sm mb-2 ${
								isHovered ? 'opacity-100' : 'opacity-0'
							}`}
						>
							The shipping cost depends on the address in your account. You can
							change the shipping type and shipping address during checkout.
						</div>

						<div className="flex justify-between gap-4 border-b pb-14 mt-8">
							<h4>ESTIMATED TOTAL:</h4>{' '}
							<h4>
								{estimatedTotal > 0
									? `${currency}$${Number(
											parseFloat(estimatedTotal).toFixed(2)
									  ).toLocaleString()}`
									: 'TBD'}
							</h4>
						</div>

						<p className="mt-4 text-[10px] text-[#5E5E5E]">
							Freight charges may vary based on factors such as shipping
							destination, package size, and delivery speed. 
						</p>
					</div>
					<div>
						{NovaAccount?.quote_status.value === 'ready' && (
							<div
								className={`rounded mb-3 px-4 py-3 border border-nova-light font-title text-white  text-xs inline-block hover:text-white  w-full text-center uppercase ${
									addedToCart
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-nova-primary hover:bg-nova-secondary cursor-pointer'
								}`}
								disabled={isLoading}
								onClick={addToCart}
							>
								{isLoading ? (
									'Adding To Cart...'
								) : (
									<span className="tracking-[1.6px]">
										{addedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
									</span>
								)}
							</div>
						)}
						<DeleteQuote />
					</div>
				</div>
			</>
		)
	);
}
