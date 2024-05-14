import React, { useEffect } from 'react';
import Sidebar from '../../Sidebar';
import Signage from '../../Signage';
import AccordionGroup from './components/AccordionGroup';

import { useAppContext } from '../../AppProvider';
import { CombineQuoteProvider } from './CombineQuoteContext';

import Letters from '../acrylic/LaserCutAcrylic/components/Letters';

const productLines = NovaQuote.product_lines_accordion;

export default function CombineQuotes() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	function setDefaultSignage() {
		setSignage([]);
	}

	useEffect(() => {
		if (NovaQuote.is_editting === '1') {
			const currentSignage = JSON.parse(NovaQuote.signage);

			if (currentSignage) {
				setSignage(currentSignage);
			}
		} else {
			setDefaultSignage();
		}
	}, []);

	/* useEffect(() => {
		localStorage.setItem(storage + '-x', JSON.stringify(signage));
	}, [signage]); */

	useEffect(() => {
		if (NovaQuote.is_editting.length === 0) {
			setTempFolder(tempFolderName);
		} else {
			setTempFolder(`Q-${NovaQuote.current_quote_id}`);
		}
	}, []);

	return (
		<CombineQuoteProvider>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					{signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item}>
							<Letters item={item} />
						</Signage>
					))}

					{signage.length < 10 && (
						<div className="gap-2">
							<div className="font-title text-3xl">PRODUCT LINES</div>
							<div className=" border-gray-200 p-4 rounded-md border">
								{productLines.map((productLine) => (
									<AccordionGroup
										group={productLine.product_line}
										products={productLine.products}
									/>
								))}
							</div>
						</div>
					)}
				</div>
				<Sidebar />
			</div>
		</CombineQuoteProvider>
	);
}
