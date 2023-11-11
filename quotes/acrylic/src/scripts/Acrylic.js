import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import Signage from './Signage';
import { PlusIcon } from './svg/Icons';

export const AcrylicContext = createContext(null);

const AcrylicOptions = AcrylicQuote.quote_options;

export default function Accrylic() {
	const [signage, setSignage] = useState([
		{
			id: uuidv4(),
			type: 'letters',
			title: 'LETTERS 1',
			letters: '',
			comments: '',
			font: 'Comfortaa',
			mounting: AcrylicOptions.mounting_options[0].mounting_option,
			waterproof: AcrylicOptions.waterproof_options[0].option,
			thickness: AcrylicOptions.acrylic_thickness_options[0],
			color: AcrylicOptions.colors[0],
			letterHeight: 1,
			usdPrice: 0,
			cadPrice: 0,
		},
	]);

	const defaultArgs = {
		id: uuidv4(),
		comments: '',
		mounting: AcrylicOptions.mounting_options[0].mounting_option,
		thickness: AcrylicOptions.acrylic_thickness_options[0],
		waterproof: AcrylicOptions.waterproof_options[0].option,
		usdPrice: 0,
		cadPrice: 0,
	};

	function addSignage(type) {
		setSignage((prevSignage) => {
			// Count how many signages of this type already exist
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args;
			// Create new signage with incremented title number
			if (type === 'letters') {
				args = {
					type: type,
					title: `${type} ${count + 1}`,
					letters: '',
					comments: '',
					font: 'Comfortaa',
					mounting: AcrylicOptions.mounting_options[0].mounting_option,
					waterproof: AcrylicOptions.waterproof_options[0].option,
					thickness: AcrylicOptions.acrylic_thickness_options[0],
					thickness_options: AcrylicOptions.acrylic_thickness_options,
					color: AcrylicOptions.colors[0],
					letterHeight: 1,
				};
			} else {
				args = {
					type: type,
					title: `${type} ${count + 1}`,
					width: 1,
					height: 1,
				};
			}
			const newSignage = {
				...defaultArgs,
				...args,
			};

			// Append the new signage to the array
			return [...prevSignage, newSignage];
		});
	}

	return (
		<AcrylicContext.Provider value={{ signage, setSignage, addSignage }}>
			<div className="flex gap-6">
				<div className="w-3/4">
					{signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item}></Signage>
					))}

					<div className="flex gap-2">
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addSignage('letters')}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD LETTERS
							<PlusIcon />
						</button>
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addSignage('logo')}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD LOGO
							<PlusIcon />
						</button>
					</div>
				</div>
				<Sidebar />
			</div>
		</AcrylicContext.Provider>
	);
}
