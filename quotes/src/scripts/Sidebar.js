import React from 'react';
import { useAppContext } from './AppProvider';
import ModalSave from './ModalSave';
import Prices from './Prices';
import { EXCHANGE_RATE } from './utils/defaults';

const currency = wcumcs_vars_data.currency;

export default function Sidebar() {
	const { signage } = useAppContext();

	const taxRateObj = NovaMyAccount.tax_rate;
	//const tax = taxRateObj ? parseFloat(taxRateObj.tax_rate / 100) : 0;
	const tax = 0;
	const taxRateName = taxRateObj ? taxRateObj.tax_rate_name : 'Tax';

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	const totalCadPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.cadPrice),
		0
	);

	const totalPrice = currency === 'USD' ? totalUsdPrice : totalCadPrice;

	const flatRate = currency === 'USD' ? 14.75 : 14.75 * EXCHANGE_RATE;

	const standardRate = totalPrice > 0 ? parseFloat(totalPrice * 0.075) : 0;

	const estimatedShipping =
		totalPrice > 0 ? parseFloat(Math.max(flatRate, standardRate)) : 0;

	//const taxCompute = parseFloat(totalPrice * tax);
	const taxCompute = 0;

	const estimateTotalPrice = totalPrice + estimatedShipping + taxCompute;

	return (
		<div className="md:w-1/4 w-full mt-8 md:mt-0">
			<div className="rounded-md border border-gray-200 p-4 sticky top-36">
				<div className="w-full max-h-[calc(100vh-300px)] overflow-y-auto pr-5">
					{signage.map((item, index) => (
						<Prices
							id={item.id}
							item={item}
							borderTop={index > 0 && 'border-t mt-2'}
						></Prices>
					))}

					<hr className="mt-5" />
				</div>

				<div className="block mb-2">
					<div className="flex justify-between pt-2 font-title uppercase md:tracking-[1.6px]">
						SUBTOTAL
						<span>
							{currency}${Number(totalPrice.toFixed(2)).toLocaleString()}
						</span>
					</div>
					{Number(totalPrice) > 0 && (
						<div className="flex justify-between font-title uppercase md:tracking-[1.6px]">
							SHIPPING
							<span>
								{currency}$
								{Number(estimatedShipping.toFixed(2)).toLocaleString()}
							</span>
						</div>
					)}

					{tax > 0 && (
						<div className="flex justify-between font-title uppercase md:tracking-[1.6px]">
							{taxRateName}
							<span>
								{currency}${Number(taxCompute.toFixed(2)).toLocaleString()}
							</span>
						</div>
					)}
				</div>

				<hr />

				<div className="flex justify-between mt-5 mb-3">
					<h4 className="text-2xl">TOTAL:</h4>
					<h4 className="text-2xl">
						{currency}${Number(estimateTotalPrice.toFixed(2)).toLocaleString()}
					</h4>
				</div>

				<div className="text-[11px] mb-5">
					<ul>
						{tax === 0 && <li>Tax not included</li>}
						<li>The final quote will be ready in 24 business hours.</li>
						<li>Extra freight charges may apply for connected fonts.</li>
					</ul>
				</div>

				{signage.length > 0 &&
					NovaQuote.quote_status?.value !== 'processing' &&
					NovaQuote.quote_status?.value !== 'ready' &&
					NovaQuote.quote_status?.value !== 'archived' && (
						<>
							{NovaQuote.is_editting === '1' ? (
								<>
									{NovaQuote.user_role[0] !== 'pending' &&
									NovaQuote.is_admin === 'no' ? (
										<ModalSave
											action="update-processing"
											label="Submit Quote"
											btnClass="mb-5 font-title rounded-md text-white w-full text-center bg-[#f22e00] text-sm h-[49px] hover:bg-[#ff5e3d]"
										/>
									) : (
										''
									)}

									<ModalSave
										action="update"
										label="Update Quote"
										btnClass="mb-5 font-title border border-nova-light rounded-md text-nova-gray w-full text-center bg-white text-sm h-[49px] hover:bg-nova-light hover:text-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
									/>
								</>
							) : (
								<>
									{NovaQuote.user_role[0] !== 'pending' ? (
										<ModalSave
											action="processing"
											label="Submit Quote"
											btnClass="mb-5 font-title rounded-md text-white w-full text-center bg-[#f22e00] text-sm h-[49px] hover:bg-[#ff5e3d]"
										/>
									) : (
										''
									)}

									<ModalSave
										action="draft"
										label="Save to Draft"
										btnClass="mb-5 font-title border border-nova-light rounded-md text-nova-gray w-full text-center bg-white text-sm h-[49px] hover:bg-nova-light hover:text-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
									/>
								</>
							)}
						</>
					)}

				{signage.length > 0 &&
					NovaQuote.quote_status?.value === 'processing' &&
					NovaQuote.is_admin === 'yes' &&
					NovaQuote.is_editting === '1' && (
						<ModalSave
							action="update-processing-admin"
							label="Update Quote"
							btnClass="mb-5 font-title border border-nova-light rounded-md text-nova-gray w-full text-center bg-white text-sm h-[49px] hover:bg-nova-light hover:text-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
						/>
					)}

				<div className="text-sm mb-4">Quote & Draft Validity: 30 days</div>
			</div>
		</div>
	);
}
