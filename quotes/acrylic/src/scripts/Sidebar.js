import React, { useContext } from 'react';
import { AcrylicContext } from './Acrylic';
import Prices from './Prices';

export default function Sidebar() {
	const { signage } = useContext(AcrylicContext);

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	return (
		<div className="w-1/4">
			<div className="rounded-md border border-gray-200 p-4 sticky top-8">
				<div className="w-full max-h-[calc(100vh-300px)] overflow-y-auto">
					{signage.map((item) => (
						<Prices id={item.id} item={item}></Prices>
					))}

					<hr />
				</div>

				<div className="flex justify-between my-5">
					<h4 className="text-2xl">TOTAL:</h4>
					<h4 className="text-2xl">${totalUsdPrice.toFixed(2)} USD</h4>
				</div>

				<button className="mb-5 font-title rounded-md text-white w-full text-center bg-[#f22e00] text-sm h-[49px] hover:bg-[#ff5e3d]">
					ADD TO CART
				</button>

				<button
					className="mb-5 font-title rounded-md text-gray-400 border border-gray-400 w-full text-center bg-white text-sm h-[49px] hover:bg-gray-400 hover:text-white"
					style={{ border: '1px solid' }}
				>
					SAVE ORDER
				</button>
			</div>
		</div>
	);
}
