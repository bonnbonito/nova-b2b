import React, { createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../../AppProvider';

const LayeredAcrylicContext = createContext();

export function useLayerAcrylic() {
	return useContext(LayeredAcrylicContext);
}

export function LayeredAcrylicProvider({ children }) {
	const { setSignage } = useAppContext();

	function addSignage(productLine, productId, type, component, material) {
		const defaultArgs = {
			id: uuidv4(),
			productLine,
			product: productId,
			usdPrice: 0,
			cadPrice: 0,
			component,
			comments: '',
			material,
		};

		setSignage((prevSignage) => {
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args;
			args = {
				type: type.toLowerCase(),
				title: `${type} ${count + 1}`,
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
		<LayeredAcrylicContext.Provider value={addSignage}>
			{children}
		</LayeredAcrylicContext.Provider>
	);
}
