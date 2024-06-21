import React from 'react';
import { PlusIcon } from '../../../../svg/Icons';
import AddLayer from './AddLayer';

const ProductLayer = ({ layer, length }) => {
	return (
		<>
			<h5 className="uppercase">{layer.product_line.post_title}</h5>
			<div className="flex gap-4">
				{layer.letters && (
					<AddLayer
						type="LETTERS"
						length={length}
						product={layer.product_line}
						component={layer.component}
					>
						LETTERS
						<div className="ml-2">
							<PlusIcon />
						</div>
					</AddLayer>
				)}
				{layer.logo && (
					<AddLayer
						type="LOGO"
						length={length}
						product={layer.product_line}
						component={layer.component}
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
