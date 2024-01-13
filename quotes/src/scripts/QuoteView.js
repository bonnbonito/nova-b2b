import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { useEffect, useRef, useState } from 'react';
import { DeleteQuote } from './DeleteQuote';
import PricesView from './PricesView';

const decodeHTML = (html) => {
	let txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

export default function QuoteView() {
	const NovaAccount = NovaMyAccount.quote;
	const taxRate = NovaMyAccount.tax_rate;
	const currency = wcumcs_vars_data.currency;
	const signage = JSON.parse(NovaAccount.data);
	const quoteRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		console.log('Attempting to preload fonts...');
		async function preloadFonts() {
			try {
				await loadingFonts();
			} catch (error) {
				console.error('Error loading fonts:', error);
			}
		}
		preloadFonts();
	}, []);

	const loadingFonts = async () => {
		const loadPromises = NovaQuote.fonts.map((font) => loadFont(font));
		await Promise.all(loadPromises);
	};

	async function loadFont({ name, src }) {
		const fontFace = new FontFace(name, `url(${src})`);

		try {
			await fontFace.load();
			document.fonts.add(fontFace);
		} catch (e) {
			console.error(`Font ${name} failed to load`);
		}
	}

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	const printHandler = (e) => {
		e.preventDefault();

		if (quoteRef.current && !isDownloading) {
			setIsDownloading(true); // Disable the button and show loading state

			const options = {
				margin: [10, 10, 10, 10], // Top, Left, Bottom, Right
				filename: `Quote-${NovaAccount.ID}.pdf`,
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2, letterRendering: true },
				jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
				windowHeight: quoteRef.current.scrollHeight,
				windowWidth: quoteRef.current.scrollWidth,
			};

			const clone = quoteRef.current.cloneNode(true);
			const elementsToRemove = clone.querySelectorAll('.exclude-from-pdf');
			elementsToRemove.forEach((el) => el.remove());

			html2pdf()
				.from(clone)
				.set(options)
				.toPdf()
				.get('pdf')
				.then((pdf) => {
					console.log('PDF generated', pdf);
				})
				.save()
				.then(() => {
					setIsDownloading(false);
				})
				.catch((error) => {
					console.error('Error generating PDF:', error);
					setIsDownloading(false);
				});
		}
	};

	const addToCart = () => {
		setIsLoading(true);

		const formData = new FormData();
		formData.append('action', 'to_checkout');
		formData.append('quote', NovaAccount.ID);
		formData.append('nonce', NovaMyAccount.nonce);
		formData.append('role', NovaQuote.user_role[0]);
		formData.append('nova_product', NovaQuote.nova_quote_product.ID);
		formData.append(
			'product',
			NovaAccount.product_name ? decodeHTML(NovaAccount.product_name) : 'None'
		);

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
					let event = new Event('added_to_cart');
					document.body.dispatchEvent(event);
					setIsLoading(false);
					alert('Added to cart');
				} else {
					alert(data.error);
					location.reload(true);
				}
			})
			.catch((error) => console.error('Error:', error));
	};

	const quotePrice = parseFloat(NovaAccount.final_price);
	const exchangeRate = parseFloat(wcumcs_vars_data.currency_data.rate);
	const finalPrice =
		currency === 'USD' ? quotePrice : quotePrice * exchangeRate;
	const flatRate = 14.75;
	const standardRate = parseFloat(finalPrice * 0.075);
	const expediteRate = parseFloat(finalPrice * 0.155);
	const tax = taxRate ? parseFloat(taxRate.tax_rate / 100) : 0;
	const taxCompute = parseFloat(finalPrice * tax);
	const estimatedShipping = Math.max(flatRate, standardRate, expediteRate);
	const estimatedTotal = parseFloat(
		finalPrice + estimatedShipping + taxCompute
	);

	return (
		<>
			<div className="flex pb-4 mb-4 border-b justify-between">
				<a
					href={NovaQuote.mockup_account_url}
					className="border-nova-light rounded px-4 py-3 border font-title text-nova-gray uppercase text-xs bg-white inline-flex items-center hover:text-black hover:bg-nova-light"
				>
					← Back To Mockups
				</a>
				<a
					onClick={printHandler}
					className={`rounded px-4 py-3 border ${
						!isDownloading
							? 'border-nova-light font-title text-nova-primary bg-white'
							: 'border-gray-300 text-gray-500 bg-gray-100'
					} text-xs inline-block hover:text-white hover:bg-nova-primary w-[160px] text-center cursor-pointer`}
					disabled={isDownloading}
				>
					{isDownloading ? 'Downloading...' : 'DOWNLOAD PDF'}
				</a>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
				<div id="quoteDiv" ref={quoteRef} className="pb-6">
					<div className="flex gap-2 items-center mb-4 ">
						<h6 className="m-0 text-nova-primary">
							STATUS:{' '}
							<span className="text-sm font-normal font-thin">
								{NovaAccount.quote_status.label}
							</span>
						</h6>
					</div>
					<div className="mb-10 block">
						<h4 className="uppercase">QUOTE ID: {NovaAccount.ID}</h4>
					</div>
					<div className="flex gap-2 items-center">
						<h6 className="leading-[2] m-0">INITIAL QUOTE REQUESTED ON:</h6>{' '}
						<span className="text-sm">{NovaAccount.published}</span>
					</div>
					<div className="flex gap-2 items-center">
						<h6 className="leading-[2] m-0">LAST QUOTE SAVED:</h6>{' '}
						<span className="text-sm">{NovaAccount.updated_date}</span>
					</div>
					<div className="flex gap-2 items-center mb-6">
						<h6 className="leading-[2] m-0">QUOTE NAME:</h6>{' '}
						<span className="text-sm">{decodeHTML(NovaAccount.title)}</span>
					</div>
					<div className="flex gap-2 items-center">
						<h6 className="leading-[2] m-0">PARTNER ID:</h6>{' '}
						<span className="text-sm">
							{NovaAccount.business_id ? NovaAccount.business_id : 'None'}
						</span>
					</div>
					<div className="flex gap-2 items-center mb-6">
						<h6 className="leading-[2] m-0">COMPANY NAME:</h6>{' '}
						<span className="text-sm">
							{NovaAccount.company_name ? NovaAccount.company_name : 'None'}
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<h6 className="leading-[2] m-0">PARTNER ID:</h6>{' '}
						<span className="text-sm">
							{NovaAccount.business_id ? NovaAccount.business_id : 'None'}
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<h6 className="leading-[2] m-0">MATERIAL:</h6>{' '}
						<span className="text-sm">
							{NovaAccount.material ? NovaAccount.material : 'None'}
						</span>
					</div>
					<div className="flex gap-2 items-center mb-8 pb-8 border-b-nova-light border-b">
						<h6 className="leading-[2] m-0">PRODUCT:</h6>{' '}
						<span className="text-sm">
							{NovaAccount.product_name
								? decodeHTML(NovaAccount.product_name)
								: 'None'}
						</span>
					</div>
					{signage.map((item) => (
						<PricesView id={item.id} item={item}></PricesView>
					))}

					{NovaAccount.note && (
						<div className="block mb-4">
							<h5>Note:</h5>
							<div
								className="block text-sm"
								dangerouslySetInnerHTML={{ __html: NovaAccount.note }}
							></div>
						</div>
					)}

					<div className="flex justify-between gap-4">
						<h5>ESTIMATED SHIPPING:</h5>{' '}
						<h5>
							{currency}${estimatedShipping.toFixed(2).toLocaleString()}
						</h5>
					</div>

					<div className="flex justify-between gap-4">
						<h5>ESTIMATED SUBTOTAL:</h5>{' '}
						<h5>
							{currency}${finalPrice.toFixed(2).toLocaleString()}
						</h5>
					</div>

					{taxRate && (
						<div className="flex justify-between gap-4">
							<h5>{taxRate.tax_rate_name}</h5>{' '}
							<h5>
								{currency}${taxCompute.toFixed(2).toLocaleString()}
							</h5>
						</div>
					)}

					<div className="flex justify-between gap-4 border-b pb-14 mt-8">
						<h4>ESTIMATED TOTAL:</h4>{' '}
						<h4>
							{currency}${estimatedTotal.toFixed(2).toLocaleString()}
						</h4>
					</div>

					<p className="mt-4 text-[10px] text-[#5E5E5E]">
						Freight charges may vary based on factors such as shipping
						destination, package size, and delivery speed. 
					</p>
				</div>
				<div>
					{NovaAccount.quote_status.value === 'ready' && (
						<div
							className="rounded mb-3 px-4 py-3 border border-nova-light font-title text-white bg-nova-primary text-xs inline-block hover:text-white hover:bg-nova-secondary w-full text-center cursor-pointer uppercase"
							disabled={isLoading}
							onClick={addToCart}
						>
							{isLoading ? (
								'Adding To Cart...'
							) : (
								<span className="tracking-[1.6px]">ADD TO CART</span>
							)}
						</div>
					)}
					<DeleteQuote />
				</div>
			</div>
		</>
	);
}
