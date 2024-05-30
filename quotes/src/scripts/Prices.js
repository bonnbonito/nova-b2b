import React, { memo } from 'react';
import { RenderSignageDetails } from './RenderSignageDetails';
import TooltipText from './utils/TooltipText';

const Prices = memo(function Prices({ item, borderTop }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	const singlePrice =
		currency === 'USD' ? item.usdSinglePrice : item.cadSinglePrice;

	const outputPrice =
		price > 0 ? (
			<span>
				{currency}${Number(singlePrice ?? price).toLocaleString()}
				{singlePrice && <span className="text-xs lowercase">/each</span>}
			</span>
		) : (
			<span>TBD</span>
		);

	return (
		<div className={`block ${borderTop}`}>
			<div className="flex justify-between py-2 font-title uppercase md:tracking-[1.6px] text-lg gap-2">
				<TooltipText text={item.title}>
					<div className="text-ellipsis overflow-hidden text-nowrap">
						{item.title}
					</div>
				</TooltipText>

				<TooltipText text={outputPrice}>
					<div className="text-ellipsis overflow-hidden text-nowrap">
						{outputPrice}
					</div>
				</TooltipText>
			</div>

			<RenderSignageDetails
				item={item}
				classContainer="grid grid-cols-2 gap-4 py-[2px] mb-1"
				classLabel="text-left font-title md:tracking-[1.4px] text-sm"
				classValue="text-left text-sm break-words"
			/>
		</div>
	);
});

export default Prices;
