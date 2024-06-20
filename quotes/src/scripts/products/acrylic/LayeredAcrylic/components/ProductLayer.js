import React from 'react';
import { PlusIcon } from '../../../../svg/Icons';
import AddLayer from './AddLayer';

import { useLayerAcrylic } from '../LayeredAcrylicContext';

const ProductLayer = ({ layer }) => {
	const addSignage = useLayerAcrylic();
	console.log(layer.product_line.ID);
	return (
		<>
			<h4>{layer.product_line.post_title}</h4>
			<div className="flex gap-4">
				{layer.letters && (
					<AddLayer
						addSignage={addSignage}
						type="LETTERS"
						product={layer.product_line}
						title={layer.product_line.post_title}
					>
						LETTERS
						<div className="ml-2">
							<PlusIcon />
						</div>
					</AddLayer>
				)}
				{layer.logo && (
					<AddLayer
						addSignage={addSignage}
						type="LOGO"
						product={layer.product_line}
						title={layer.product_line.post_title}
					>
						LOGO
						<div className="ml-2">
							<PlusIcon />
						</div>
					</AddLayer>
				)}
			</div>
		</>
	);
};

export default ProductLayer;
