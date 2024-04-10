import React from 'react';
import ModalSave from './ModalSave';
import Prices from './Prices';

export default function SidebarNoPrice({
	signage,
	required,
	tempFolder,
	storage,
	isLoading,
	setIsLoading,
}) {
	return (
		<div className="md:w-1/4 w-full mt-8 md:mt-0">
			<div className="rounded-md border border-gray-200 p-4 sticky top-36">
				<div className="w-full max-h-[calc(100vh-300px)] overflow-y-auto">
					{signage.map((item) => (
						<Prices id={item.id} item={item}></Prices>
					))}

					<hr className="mt-5" />
				</div>

				<div className="block mb-2">
					<div className="flex justify-between pt-2 font-title uppercase md:tracking-[1.6px]">
						SUBTOTAL
						<span>TBD</span>
					</div>
				</div>

				<hr />

				<div className="flex justify-between my-5">
					<h4 className="text-2xl">TOTAL:</h4>
					<h4 className="text-2xl">TBD</h4>
				</div>

				{signage.length > 0 && (
					<ModalSave
						signage={signage}
						required={required}
						tempFolder={tempFolder}
						storage={storage}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						action="processing"
						label="Request Quote"
						btnClass="mb-5 font-title rounded-md text-white w-full text-center bg-[#f22e00] text-sm h-[49px] hover:bg-[#ff5e3d]"
					/>
				)}
			</div>
		</div>
	);
}
