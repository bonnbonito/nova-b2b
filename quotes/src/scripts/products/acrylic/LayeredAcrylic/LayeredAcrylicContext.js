import React, { createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../../AppProvider';

const LayeredAcrylicContext = createContext();

export function useLayerAcrylic() {
  return useContext(LayeredAcrylicContext);
}

export function LayeredAcrylicProvider({ children }) {
  const { setSignage } = useAppContext();

  function addSignage(productLine, productId, type, component) {
    const defaultArgs = {
      id: uuidv4(),
      productLine,
      product: productId,
      usdPrice: 0,
      cadPrice: 0,
      component,
      comments: '',
    };

    setSignage(prevSignage => {
      let args;
      const count = prevSignage.length;
      args = {
        type: type.toLowerCase(),
        hideQuantity: true,
        isLayered: true,
        title: `Layer ${count + 1}`,
      };
      const newSignage = {
        ...defaultArgs,
        ...args,
      };

      setTimeout(() => {
        const newElement = document.getElementById(defaultArgs.id);
        newElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);

      // Append the new signage to the array
      return [...prevSignage, newSignage];
    });
  }

  return (
    <LayeredAcrylicContext.Provider value={addSignage}>{children}</LayeredAcrylicContext.Provider>
  );
}
