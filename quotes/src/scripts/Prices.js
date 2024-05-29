import React from 'react';
import { RenderSignageDetails } from './RenderSignageDetails';

export default function Prices({ item, borderTop }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	const singlePrice =
		item.usdSinglePrice && currency === 'USD'
			? item.usdSinglePrice
			: item.cadSinglePrice;
	return (
		<div className={`block ${borderTop}`}>
			<div className="flex justify-between py-2 font-title uppercase md:tracking-[1.6px]">
				{item.title}
				{price > 0 ? (
					<span>
						{currency}$
						{singlePrice
							? Number(singlePrice.toFixed(2)).toLocaleString()
							: Number(price).toLocaleString()}
						{singlePrice && <span className="text-xs lowercase">/each</span>}
					</span>
				) : (
					<span>TBD</span>
				)}
			</div>

			<RenderSignageDetails
				item={item}
				classContainer="grid grid-cols-2 gap-4 py-[2px] mb-1"
				classLabel="text-left font-title md:tracking-[1.4px] text-sm"
				classValue="text-left text-sm break-words"
			/>
		</div>
	);
}
