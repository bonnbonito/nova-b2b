import React, { useEffect, useState } from 'react';
import { PlusIcon } from '../../../svg/Icons';
import { useCombineQuote } from '../CombineQuoteContext';
import ThreeDLayer from '../ThreeDLayer';
import { AddSignage } from './AddSignage';

export default function AccordionItem({ title, products, isOpen }) {
  const [open, setOpen] = useState(false);

  const addSignage = useCombineQuote();

  const toggleOpen = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    isOpen(newOpenState);
  };

  return (
    <div className={open ? 'bg-slate-50' : ''}>
      <div
        className={`p-4 font-title uppercase text-lg select-none cursor-pointer bg-white hover:bg-slate-50 flex justify-between items-center ${
          open && 'bg-slate-50'
        }`}
        onClick={toggleOpen}
      >
        {title}
        <PlusIcon open={!open} />
      </div>

      {open &&
        products.map(product => {
          const uniqueKey = `${product.id}-${product.component}`;
          return product.component === 'ThreeDLayer' ? (
            <OutputThreeDLayer
              key={uniqueKey}
              product={product}
              addSignage={addSignage}
              title={title}
            />
          ) : (
            <ProductItems key={uniqueKey} product={product} addSignage={addSignage} title={title} />
          );
        })}
    </div>
  );
}

const OutputThreeDLayer = ({ product, addSignage, title }) => (
  <ThreeDLayer addSignage={addSignage} product={product} title={title} type="LAYER" />
);

const ProductItems = ({ product, addSignage, title }) => {
  return (
    <div className="border-gray-200 p-4 mx-4 cursor-pointer rounded-md border mb-2 bg-slate-200">
      <div
        className="font-title uppercase mb-2"
        dangerouslySetInnerHTML={{ __html: product.product.post_title }}
      />

      <div className="flex gap-2">
        {product.letters && (
          <AddSignage
            key={`${product.product.ID}-letters`}
            addSignage={addSignage}
            product={product}
            title={title}
            type="LETTERS"
          >
            ADD LETTERS
            <div className="ml-2">
              <PlusIcon />
            </div>
          </AddSignage>
        )}
        {product.logo && (
          <AddSignage
            key={`${product.product.ID}-logo`}
            addSignage={addSignage}
            product={product}
            title={title}
            type="LOGO"
          >
            ADD LOGO
            <div className="ml-2">
              <PlusIcon />
            </div>
          </AddSignage>
        )}
        {product.sign && (
          <AddSignage
            key={`${product.product.ID}-sign`}
            addSignage={addSignage}
            product={product}
            title={title}
            type="SIGN"
          >
            ADD SIGN
            <div className="ml-2">
              <PlusIcon />
            </div>
          </AddSignage>
        )}
        {product.etched && (
          <AddSignage
            key={`${product.product.ID}-etched`}
            addSignage={addSignage}
            product={product}
            title={title}
            type="ETCHED SIGN"
          >
            ADD ETCHED SIGN
            <div className="ml-2">
              <PlusIcon />
            </div>
          </AddSignage>
        )}
        {product.custom && (
          <AddSignage
            key={`${product.product.ID}-custom`}
            addSignage={addSignage}
            product={product}
            title={title}
            type="CUSTOM"
          >
            ADD CUSTOM PROJECT
            <div className="ml-2">
              <PlusIcon />
            </div>
          </AddSignage>
        )}
      </div>
    </div>
  );
};
