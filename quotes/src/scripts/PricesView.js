import React, { useEffect, useRef } from 'react';
import { RenderSignageDetails } from './RenderSignageDetails';

export default function PricesView({ item }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	const style = {
		margin: '0',
		fontSize: '50px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		fontFamily: item.font,
		color: item.color?.color || '#000000',
		textShadow: '0px 0px 1px rgba(0, 0, 0, 1)',
		wordBreak: 'break-all',
		lineHeight: '1.6',
		padding: '0 10px 20px 10px',
	};

	const headlineRef = useRef(null);

	const adjustFontSize = () => {
		if (!headlineRef.current) {
			return;
		}
		const container = headlineRef.current.parentNode;
		const headline = headlineRef.current;

		// Reset the font-size to the maximum desired font-size
		headline.style.fontSize = '50px';

		// Check if the headline is wider than its container
		while (
			headline.scrollWidth > container.offsetWidth &&
			parseFloat(window.getComputedStyle(headline).fontSize) > 0
		) {
			// Reduce the font-size by 1px until it fits
			headline.style.fontSize = `${
				parseFloat(window.getComputedStyle(headline).fontSize) - 1
			}px`;
		}
	};

	useEffect(() => {
		adjustFontSize();
	}, [item.type]);

	return (
		<div className="pb-8 mb-8 border-b-nova-light border-b">
			{item.type === 'letters' && (
				<>
					<div className="mt-4 p-4 border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md exclude-from-pdf max-w-[834px]">
						<div className="w-full self-center">
							<div
								className="self-center text-center"
								style={style}
								ref={headlineRef}
							>
								{item.letters}
							</div>
						</div>
					</div>
					<div className="text-xs text-[#5E5E5E] mb-8 mt-1 pl-2">
						Preview Image. Actual product color may differ.
					</div>
				</>
			)}

			<div className="block">
				<div className="flex justify-between py-2 font-title uppercase">
					{item.title}{' '}
					<span>
						{price > 0
							? `${currency}$${parseFloat(price).toFixed(2).toLocaleString()}`
							: `TBD`}
					</span>
				</div>

				<RenderSignageDetails
					item={item}
					classContainer="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5"
					classLabel="text-left text-xs font-title"
					classValue="text-left text-[14px] break-words"
				/>
			</div>
		</div>
	);
}
