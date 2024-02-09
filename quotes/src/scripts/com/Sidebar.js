import React, { useContext } from 'react';
import { QuoteContext } from '../LaserCutAcrylic';
import ModalSave from './ModalSave';
import Prices from './Prices';

export default function Sidebar() {
	const { signage, currency } = useContext(QuoteContext);
	const taxRate = NovaMyAccount.tax_rate;

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	const totalCadPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.cadPrice),
		0
	);

	const totalPrice = currency === 'USD' ? totalUsdPrice : totalCadPrice;
	const exchangeRate = parseFloat(wcumcs_vars_data.currency_data.rate);

	const flatRate = currency === 'USD' ? 14.75 : 14.75 * exchangeRate;

	const standardRate = totalPrice > 0 ? parseFloat(totalPrice * 0.075) : 0;

	const estimatedShipping =
		totalPrice > 0 ? parseFloat(Math.max(flatRate, standardRate)) : 0;

	const tax = taxRate ? parseFloat(taxRate.tax_rate / 100) : 0;
	const taxCompute = parseFloat(totalPrice * tax);

	const estimateTotalPrice = totalPrice + estimatedShipping + taxCompute;

	return (
		<div className="md:w-1/4 w-full mt-8 md:mt-0">
			<div className="rounded-md border border-gray-200 p-4 sticky top-12">
				<div className="w-full max-h-[calc(100vh-300px)] overflow-y-auto">
					{signage.map((item) => (
						<Prices id={item.id} item={item}></Prices>
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

					{NovaMyAccount.tax_rate && (
						<div className="flex justify-between font-title uppercase md:tracking-[1.6px]">
							{NovaMyAccount.tax_rate.tax_rate_name}
							<span>
								{currency}${Number(taxCompute.toFixed(2)).toLocaleString()}
							</span>
						</div>
					)}
				</div>

				<hr />

				<div className="flex justify-between my-5">
					<h4 className="text-2xl">TOTAL:</h4>
					<h4 className="text-2xl">
						{currency}${Number(estimateTotalPrice.toFixed(2)).toLocaleString()}
					</h4>
				</div>

				{signage.length > 0 && (
					<>
						{NovaQuote.is_editting === '1' ? (
							<>
								{NovaQuote.user_role[0] !== 'pending' ? (
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
			</div>
		</div>
	);
}
