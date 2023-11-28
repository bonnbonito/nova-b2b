import { useEffect, useState } from 'react';
import { DeleteQuote } from './DeleteQuote';
import PricesView from './PricesView';

const decodeHTML = (html) => {
	let txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

export default function QuoteView() {
	const NovaAccount = NovaMyAccount.quote;
	const signage = JSON.parse(NovaAccount.data);

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

	return (
		<>
			<div>
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
					<h4>ESTIMATED TOTAL:</h4>{' '}
					<h4>${parseFloat(NovaAccount.final_price).toLocaleString()} USD</h4>
				</div>
			</div>
			<div>
				{NovaAccount.quote_status.value === 'ready' && (
					<div className="rounded mb-3 px-4 py-3 border border-nova-light font-title text-white bg-nova-primary text-xs inline-block hover:text-white hover:bg-nova-secondary w-full text-center cursor-pointer">
						CHECKOUT
					</div>
				)}
				<DeleteQuote />
			</div>
		</>
	);
}
