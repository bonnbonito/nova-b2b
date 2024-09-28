import React, { memo, useMemo } from 'react';
import { RenderSignageDetails } from './RenderSignageDetails';
import TooltipText from './utils/TooltipText';

const Prices = memo(function Prices({ item, borderTop }) {
	const currency = wcumcs_vars_data.currency;
	const price = useMemo(
		() => (currency === 'USD' ? item.usdPrice : item.cadPrice),
		[currency, item]
	);
	const singlePrice = useMemo(
		() => (currency === 'USD' ? item.usdSinglePrice : item.cadSinglePrice),
		[currency, item]
	);

	const outputPrice = useMemo(
		() =>
			price > 0 ? (
				<span>
					{currency}$
					{Number(singlePrice ?? price)
						.toFixed(2)
						.toLocaleString()}
					{singlePrice && <span className="text-xs lowercase">/each</span>}
				</span>
			) : (
				<span>TBD</span>
			),
		[price, singlePrice, currency]
	);

	return (
		<div
			className={`block border-x-0 border-b-0 ${
				borderTop ? 'border-t border-solid border-gray-200' : ''
			}`}
		>
			<div className="flex justify-between py-2 font-title uppercase md:tracking-[1.6px] text-lg gap-2">
				<TooltipText text={item.title}>
					<div className="text-ellipsis overflow-hidden text-nowrap">
						{item.title}
					</div>
				</TooltipText>

				{outputPrice && (
					<TooltipText text={outputPrice}>
						<div className="text-ellipsis overflow-hidden text-nowrap">
							{outputPrice}
						</div>
					</TooltipText>
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
});

export default Prices;
