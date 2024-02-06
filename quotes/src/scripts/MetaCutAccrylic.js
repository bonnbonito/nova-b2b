import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import Signage from './Signage';
import { PlusIcon } from './svg/Icons';

export const NovaContext = createContext(null);

export const SignageCount = (signage, type) =>
	signage.filter((sign) => sign.type === type).length;

const NovaOptions = NovaQuote.quote_options;

export default function MetalCutAccrylic() {
	const [signage, setSignage] = useState([]);

	function setDefaultSignage() {
		const savedStorage = JSON.parse(
			localStorage.getItem(window.location.href + NovaQuote.user_id)
		);
		console.log(savedStorage);
		if (savedStorage?.length > 0) {
			setSignage(savedStorage);
		} else {
			setSignage([
				{
					id: uuidv4(),
					type: 'letters',
					title: 'LETTERS 1',
					letters: '',
					comments: '',
					font: '',
					mounting: '',
					waterproof: '',
					thickness: '',
					color: { name: '', color: '' },
					letterHeight: '',
					usdPrice: 0,
					cadPrice: 0,
					file: '',
					fileName: '',
					finishing: '',
					product: NovaQuote.product,
				},
			]);
		}
	}

	useEffect(() => {
		if (NovaQuote.is_editting === '1') {
			const currentSignage = JSON.parse(NovaQuote.signage);
			if (currentSignage) {
				const savedStorage = JSON.parse(
					localStorage.getItem(window.location.href + NovaQuote.user_id)
				);
				if (savedStorage?.length > 0) {
					setSignage(savedStorage);
				} else {
					setSignage(currentSignage);
				}
			} else {
				window.location.href = window.location.pathname;
			}
		} else {
			setDefaultSignage();
		}
	}, []);

	const defaultArgs = {
		id: uuidv4(),
		comments: '',
		mounting: '',
		thickness: '',
		waterproof: '',
		finishing: '',
		usdPrice: 0,
		cadPrice: 0,
		file: '',
		fileName: '',
		product: NovaQuote.product,
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
					font: '',
					mounting: '',
					waterproof: '',
					thickness: '',
					thickness_options: '',
					color: { name: '', color: '' },
					letterHeight: '',
				};
			} else {
				args = {
					type: type,
					title: `${type} ${count + 1}`,
					width: '',
					height: '',
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

	useEffect(() => {
		localStorage.setItem(
			window.location.href + NovaQuote.user_id,
			JSON.stringify(signage)
		);
	}, [signage]);

	const currency = wcumcs_vars_data.currency;

	return (
		<NovaContext.Provider value={{ signage, setSignage, addSignage, currency }}>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					{signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item}></Signage>
					))}

					<div className="flex gap-2">
						{SignageCount(signage, 'letters') < 5 && (
							<button
								className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
								onClick={() => addSignage('letters')}
								style={{ border: '1px solid #d2d2d2d2' }}
							>
								ADD LETTERS
								<PlusIcon />
							</button>
						)}

						{SignageCount(signage, 'logo') < 5 && (
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
				<Sidebar />
			</div>
		</NovaContext.Provider>
	);
}