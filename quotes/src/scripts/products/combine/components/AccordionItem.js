import React, { useEffect, useState } from 'react';
import { PlusIcon } from '../../../svg/Icons';

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
							<button
								className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
								onClick={() =>
									addSignage(
										product.product.post_title,
										product.product.ID,
										'letters',
										product.component,
										title
									)
								}
								style={{ border: '1px solid #d2d2d2d2' }}
							>
								ADD LETTERS
								<PlusIcon />
							</button>
						)}

						{product.logo && (
							<button
								className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
								onClick={() =>
									addSignage(
										product.product.post_title,
										product.product.ID,
										'logo',
										product.component,
										title
									)
								}
								style={{ border: '1px solid #d2d2d2d2' }}
							>
								ADD LOGO
								<PlusIcon />
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
