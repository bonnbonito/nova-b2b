import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import ProductLayer from './components/ProductLayer';

import { Letters as AcrylicLetters } from '../LaserCutAcrylic/components/Letters';
import { Logo as AcrylicLogo } from '../LaserCutAcrylic/components/Logo';
import { Letters as AcrylicMetalLetters } from '../MetalLaminate/components/Letters';
import { Logo as AcrylicMetalLogo } from '../MetalLaminate/components/Logo';
import { Logo as AcrylicUV } from '../UvPrintedAcrylic/components/Logo';

import { useAppContext } from '../../../AppProvider';
import { LayeredAcrylicProvider } from './LayeredAcrylicContext';

const productLayers = NovaQuote.product_layers;

export const ASSEMBLY_FEES = 1.1;

export default function LayeredAcrylic() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	const [openLayer, setOpenLayer] = useState(false);

	function setDefaultSignage() {
		setSignage([]);
	}

	const showComponent = (item) => {
		let output;
		switch (item.component) {
			case 'AcryLic':
				if (item.type === 'letters') {
					output = (
						<AcrylicLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicLogo key={item.id} item={item} productId={item.product} />
					);
				}
				break;
			case 'AcrylicUV':
				output = (
					<AcrylicUV key={item.id} item={item} productId={item.product} />
				);
				break;
			case 'AcrylicMetalLaminate':
				if (item.type === 'letters') {
					output = (
						<AcrylicMetalLetters
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicMetalLogo
							key={item.id}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
		}

		return output;
	};

	useEffect(() => {
		if (NovaQuote.is_editting === '1') {
			const currentSignage = JSON.parse(NovaQuote.signage);
			if (currentSignage) {
				setSignage(currentSignage);
			} else {
				window.location.href = window.location.pathname;
			}
		} else {
			setDefaultSignage();
		}
	}, []);

	useEffect(() => {
		if (NovaQuote.is_editting.length === 0) {
			setTempFolder(tempFolderName);
		} else {
			setTempFolder(`Q-${NovaQuote.current_quote_id}`);
		}
	}, []);

	return (
		<LayeredAcrylicProvider>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					{signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item} storage={storage}>
							{showComponent(item)}
						</Signage>
					))}

					{signage.length < 10 && (
						<div className="gap-2">
							<button
								className="bg-white text-black font-title text-3xl inline-flex items-center gap-2 px-8 py-4 mb-2 border-solid border rounded-md"
								onClick={() => setOpenLayer((prev) => !prev)}
							>
								ADD LAYERS <PlusIcon />
							</button>
							{openLayer && (
								<div className=" border-gray-200 p-4 rounded-md border">
									{productLayers.map((layer) => {
										return <ProductLayer layer={layer} />;
									})}
								</div>
							)}
						</div>
					)}
				</div>
				<Sidebar />
			</div>
		</LayeredAcrylicProvider>
	);
}
