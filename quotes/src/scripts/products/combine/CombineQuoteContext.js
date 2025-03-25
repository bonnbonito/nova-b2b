import { createContext, useContext } from '@wordpress/element';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../AppProvider';
import { useEffect } from 'react';

const CombineQuote = createContext();

export function useCombineQuote() {
  return useContext(CombineQuote);
}

export function CombineQuoteProvider({ children }) {
  const { signage, setSignage } = useAppContext();

  function addSignage({
    productLine,
    productId,
    type,
    component,
    material,
    isLayered,
    hideQuantity,
    isCustom = false,
  }) {
    const defaultArgs = {
      id: uuidv4(),
      productLine,
      product: productId,
      usdPrice: 0,
      cadPrice: 0,
      component,
      comments: '',
      material,
      isLayered,
      hideQuantity,
      isCustom,
    };

    setSignage(prevSignage => {
      const layerCount = prevSignage.filter(sign => sign.isCustom).length;
      let args;
      args = {
        type: type.toLowerCase(),
        title: `${isCustom ? `LAYER ${layerCount + 1}` : type}`,
      };

      const newSignage = {
        ...defaultArgs,
        ...args,
      };

      setTimeout(() => {
        const newElement = document.getElementById(defaultArgs.id);
        newElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);

      return [...prevSignage, newSignage];
    });
  }

  return <CombineQuote.Provider value={addSignage}>{children}</CombineQuote.Provider>;
}
