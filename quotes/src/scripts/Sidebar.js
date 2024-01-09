import React, { useContext, useState } from 'react';
import ModalSave from './ModalSave';
import { NovaContext } from './NovaQuote';
import Prices from './Prices';

export default function Sidebar() {
	const { signage } = useContext(NovaContext);

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	return (
		<div className="md:w-1/4 w-full mt-8 md:mt-0">
			<div className="rounded-md border border-gray-200 p-4 sticky top-12">
				<div className="w-full max-h-[calc(100vh-300px)] overflow-y-auto">
					{signage.map((item) => (
						<Prices id={item.id} item={item}></Prices>
					))}

					<hr />
				</div>

				<div className="flex justify-between my-5">
					<h4 className="text-2xl">TOTAL:</h4>
					<h4 className="text-2xl">
						${Number(totalUsdPrice.toFixed(2)).toLocaleString()} USD
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
