import React, { useEffect, useState } from 'react';
import Note from '../../../Note';
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

	const showComponent = (item, index) => {
		let output;
		switch (item.component) {
			case 'AcryLic':
				if (item.type === 'letters') {
					output = (
						<AcrylicLetters
							key={item.id}
							index={index}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicLogo
							key={item.id}
							index={index}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
			case 'AcrylicUV':
				output = (
					<AcrylicUV
						key={item.id}
						index={index}
						item={item}
						productId={item.product}
					/>
				);
				break;
			case 'AcrylicMetalLaminate':
				if (item.type === 'letters') {
					output = (
						<AcrylicMetalLetters
							key={item.id}
							index={index}
							item={item}
							productId={item.product}
						/>
					);
				} else {
					output = (
						<AcrylicMetalLogo
							key={item.id}
							index={index}
							item={item}
							productId={item.product}
						/>
					);
				}
				break;
		}

		return output;
	};

	const signageOutput = signage.map((item, index) => {
		return (
			<Signage index={index} id={item.id} item={item} editable={false}>
				{showComponent(item, index)}
			</Signage>
		);
	});

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
			if (NovaQuote.project_folder_status) {
				setTempFolder(
					`${NovaQuote.project_folder_status}/Q-${NovaQuote.current_quote_id}`
				);
			} else {
				setTempFolder(`Q-${NovaQuote.current_quote_id}`);
			}
		}
	}, []);

	return (
		<LayeredAcrylicProvider>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					{signageOutput}

					<Note title="Note">
						<ul className="text-sm">
							<li className="font-bold">
								Layer 1 is the bottom layer. Each subsequent layer (Layer 2,
								Layer 3, etc.) is positioned above the previous one
							</li>
							<li>The minimum stroke for 3M double-sided tape is 10mm.</li>
							<li>
								For stud pins: The minimum stroke is 12mm (1/2”) and the minimum
								acrylic thickness is 1/4" (6mm).
							</li>
							<li>
								You can choose a thicker acrylic to accommodate the design. If
								you choose thinner acrylic, take note that it cannot use stud
								pins and the sign must be carefully glued to the installation
								surface.
							</li>
							<li>
								Sharp, thin points are not ideal unless requested. Slim sections
								will be cut for shipping as small lines may break easily. You
								can glue them together upon receipt.
							</li>
							<li>
								The spacer will be black (default) or match the painted sign's
								color.
							</li>
						</ul>
					</Note>

					{signage.length < 5 && (
						<div className="gap-2">
							<button
								className="bg-white text-black font-title text-2xl inline-flex items-center gap-2 px-8 py-3 mb-2 border-solid border rounded-md"
								onClick={() => setOpenLayer((prev) => !prev)}
							>
								ADD LAYER <PlusIcon open={!openLayer} />
							</button>
							{openLayer && (
								<div className=" border-black p-4 rounded-md border shadow-2xl">
									{productLayers.map((layer) => {
										return (
											<ProductLayer layer={layer} length={signage.length} />
										);
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
