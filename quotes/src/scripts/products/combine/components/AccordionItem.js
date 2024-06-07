import React, { useEffect, useState } from 'react';
import { PlusIcon } from '../../../svg/Icons';
import { AddSignage } from './AddSignage';

import { useCombineQuote } from '../CombineQuoteContext';

export default function AccordionItem({ title, products, isOpen }) {
	const [open, setOpen] = useState(false);

	const addSignage = useCombineQuote();

	useEffect(() => {
		isOpen(open);
	}, [open]);

	return (
		<div className={open ?? 'bg-slate-50'}>
			<div
				className={`p-4 font-title uppercase text-lg select-none cursor-pointer bg-white hover:bg-slate-50 flex justify-between items-center ${
					open && 'bg-slate-50'
				}`}
				onClick={() => setOpen((prev) => !prev)}
			>
				{title}

				<PlusIcon open={!open} />
			</div>

			{products.map((product) => (
				<div
					className={`border-gray-200 p-4 mx-4 cursor-pointer rounded-md border mb-2 bg-slate-200 ${
						open ? 'block' : 'hidden'
					}`}
				>
					<div className="font-title uppercase mb-2">
						{product.product.post_title}
					</div>
					<div class="flex gap-2">
						{product.letters && (
							<AddSignage
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

						{product.custom && (
							<AddSignage
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
			))}
		</div>
	);
}
