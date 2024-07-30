import React, { useState } from 'react';
import { useAppContext } from '../../AppProvider';
import { PlusIcon } from '../../svg/Icons';
import ProductLayer from './components/ProductLayer';
const productLayers = NovaQuote.product_layers;

function ThreeDLayer({ product }) {
	const { signage } = useAppContext();
	const [openLayer, setOpenLayer] = useState(false);
	const layerCount = signage.filter((sign) => sign.isLayered).length;
	return (
		<div className="border-gray-200 p-4 mx-4 cursor-pointer rounded-md border mb-2 bg-slate-200">
			<div className="font-title uppercase mb-2">
				{product.product.post_title}
			</div>
			{/* if layer less than 5, show add layer button */}
			{layerCount < 5 && (
				<>
					<button
						className="bg-white text-black font-title inline-flex items-center gap-2 px-8 py-3 mb-2 border-solid border rounded-md"
						onClick={() => setOpenLayer((prev) => !prev)}
					>
						ADD LAYER <PlusIcon open={!openLayer} />
					</button>
					{openLayer && (
						<div className=" border-black p-4 rounded-md border shadow-2xl">
							{productLayers.map((layer) => {
								return <ProductLayer layer={layer} length={signage.length} />;
							})}
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default ThreeDLayer;
