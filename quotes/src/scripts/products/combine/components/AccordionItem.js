import React, { useState } from 'react';
import { PlusIcon } from '../../../svg/Icons';

export default function AccordionItem({ group, addSignage }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				className="font-title uppercase text-lg select-none"
				onClick={() => setOpen((prev) => !prev)}
			>
				{group.product_line.post_title}
			</div>

			{open &&
				group.products.map((productLine) => (
					<div className=" border-gray-200 p-4 cursor-pointer rounded-md border mb-2 bg-gray-50">
						<div className="font-title uppercase mb-2">
							{productLine.product.post_title}
						</div>
						<div class="flex gap-2">
							{productLine.letters && (
								<button
									className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
									onClick={() => addSignage('letters')}
									style={{ border: '1px solid #d2d2d2d2' }}
								>
									ADD LETTERS
									<PlusIcon />
								</button>
							)}

							{productLine.logo && (
								<button
									className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
									onClick={() => addSignage('logo')}
									style={{ border: '1px solid #d2d2d2d2' }}
								>
									ADD LOGO
									<PlusIcon />
								</button>
							)}
						</div>
					</div>
				))}
		</>
	);
}
