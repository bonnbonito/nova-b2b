import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { SignageCount } from '../../../utils/QuoteFunctions';
import Letters from './components/Letters';
import Logo from './components/Logo';

export const QuoteContext = createContext(null);

export const acrylicBaseOptions = [
	{
		option: 'Black',
	},
	{
		option: 'Standard Colors',
	},
	{
		option: 'Custom (Pantone Code)',
	},
];

export const METAL_ACRYLIC_PRICING = 1.3;

export default function MetalLaminate() {
	const [signage, setSignage] = useState([]);
	const currency = wcumcs_vars_data.currency;

	function setDefaultSignage() {
		const savedStorage = JSON.parse(
			localStorage.getItem(window.location.href + NovaQuote.user_id)
		);
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
					acrylicBase: 'Black',
					metalFinish: { name: '', color: '' },
					letterHeight: '',
					usdPrice: 0,
					cadPrice: 0,
					filePath: '',
					fileName: '',
					fileUrl: '',
					file: '',
					pieces: '30 pieces or fewer',
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
		usdPrice: 0,
		cadPrice: 0,
		filePath: '',
		fileName: '',
		fileUrl: '',
		file: '',
		acrylicBase: 'Black',
		product: NovaQuote.product,
		pieces: '30 pieces or fewer',
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
					font: '',
					metalFinish: { name: '', color: '' },
					thickness_options: '',
					letterHeight: '',
				};
			} else {
				args = {
					type: type,
					title: `${type} ${count + 1}`,
					width: '',
					height: '',
					metalLaminate: '',
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

	const required = {
		letters: [
			{
				key: 'letters',
				title: 'Letters',
			},
			{
				key: 'thickness',
				title: 'Thickness',
			},
			{
				key: 'letterHeight',
				title: 'Letter Height',
			},
			{
				key: 'acrylicBase',
				title: 'Acrylic Base',
			},
			{
				key: 'font',
				title: 'Font',
			},
			{
				key: 'waterproof',
				title: 'Waterproof',
			},
			{
				key: 'mounting',
				title: 'Mounting',
			},
			{
				key: 'metalFinishing',
				title: 'Metal Finishing',
			},
			{
				key: 'pieces',
				title: 'Pieces/Cutouts',
			},
		],
		logo: [
			{
				key: 'thickness',
				title: 'Thickness',
			},
			{
				key: 'width',
				title: 'Logo Width',
			},
			{
				key: 'height',
				title: 'Logo Height',
			},
			{
				key: 'acrylicBase',
				title: 'Acrylic Base',
			},
			{
				key: 'waterproof',
				title: 'Waterproof',
			},
			{
				key: 'mounting',
				title: 'Mounting',
			},
			{
				key: 'metalLaminate',
				title: 'Metal Laminate',
			},
			{
				key: 'pieces',
				title: 'Pieces/Cutouts',
			},
			{
				key: 'fileUrl',
				title: 'File',
			},
		],
	};

	return (
		<QuoteContext.Provider
			value={{ signage, setSignage, addSignage, currency }}
		>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					{signage.map((item, index) => (
						<Signage
							index={index}
							id={item.id}
							item={item}
							signage={signage}
							setSignage={setSignage}
							addSignage={addSignage}
						>
							{item.type === 'letters' ? (
								<Letters key={item.id} item={item} />
							) : (
								<Logo key={item.id} item={item} />
							)}
						</Signage>
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
				<Sidebar signage={signage} required={required} />
			</div>
		</QuoteContext.Provider>
	);
}
