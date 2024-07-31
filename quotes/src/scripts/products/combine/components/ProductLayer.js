import React from 'react';
import { PlusIcon } from '../../../svg/Icons';
import AddLayer from './AddLayer';

export const ProductLayer = ({ layer, length, title, layerTitle }) => {
	return (
		<>
			<h5
				className="uppercase"
				dangerouslySetInnerHTML={{ __html: layer.product_line.post_title }}
			/>
			<div className="flex gap-4">
				{layer.letters && (
					<AddLayer
						type="LETTERS"
						length={length}
						product={layer.product_line}
						component={layer.component}
						title={`${title} - ${layerTitle}`}
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
						title={title}
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
