import React, { createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../AppProvider';

const CombineQuote = createContext();

export function useCombineQuote() {
	return useContext(CombineQuote);
}

export function CombineQuoteProvider({ children }) {
	const { setSignage } = useAppContext();

	function addSignage(
		productLine,
		productId,
		type,
		component,
		material,
		isLayer = false
	) {
		const defaultArgs = {
			id: uuidv4(),
			productLine,
			product: productId,
			usdPrice: 0,
			cadPrice: 0,
			component,
			comments: '',
			material,
			isLayered: false,
			hideQuantity: false,
		};

		setSignage((prevSignage) => {
			const count = prevSignage.filter((sign) => sign.type === type).length;
			const layerCount = prevSignage.filter((sign) => sign.isLayer).length;
			let args;
			args = {
				type: type.toLowerCase(),
				title: `${isLayer ? 'LAYER' : type} ${
					isLayer ? layerCount + 1 : count + 1
				}`,
				isLayered: isLayer,
				hideQuantity: isLayer,
			};

			const newSignage = {
				...defaultArgs,
				...args,
			};

			// Append the new signage to the array
			return [...prevSignage, newSignage];
		});
	}

	return (
		<CombineQuote.Provider value={addSignage}>{children}</CombineQuote.Provider>
	);
}
