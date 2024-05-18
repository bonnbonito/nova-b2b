import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';

import { Letters } from './components/Letters';
import { Logo } from './components/Logo';

import { useAppContext } from '../../../AppProvider';

import convert_json from '../../../utils/ConvertJson';

export const acrylicBaseOptions = [
	{
		option: 'Black',
	},
	{
		option: 'Custom (Pantone Code)',
	},
];

export const METAL_ACRYLIC_PRICING = 1.3;

export default function MetalLaminate() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	const [letterPricing, setLetterPricing] = useState([]);

	useEffect(() => {
		async function fetchLetterPricing() {
			console.log('Fetching letterpricing');
			try {
				const response = await fetch(
					NovaQuote.letters_pricing_api + NovaQuote.product
				);
				const data = await response.json();
				const pricing = convert_json(data?.pricing_table);

				setLetterPricing(pricing);
			} catch (error) {
				console.error('Error fetching letter pricing:', error);
			}
		}

		fetchLetterPricing();
	}, []);

	function setDefaultSignage() {
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
				acrylicThickness: '',
				acrylicBase: { name: 'Black', color: '#000000' },
				metalLaminate: '',
				letterHeight: '',
				usdPrice: 0,
				cadPrice: 0,
				filePaths: [],
				fileNames: [],
				fileUrls: [],
				files: [],
				customFont: '',
				customColor: '',
				sets: 1,
				studLength: '',
				spacerStandoffDistance: '',
				product: NovaQuote.product,
			},
		]);
	}

	useEffect(() => {
		if (NovaQuote.is_editting === '1') {
			const currentSignage = JSON.parse(NovaQuote.signage);
			if (currentSignage) {
				setSignage(currentSignage);
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
		acrylicThickness: '',
		waterproof: '',
		usdPrice: 0,
		cadPrice: 0,
		filePaths: [],
		fileNames: [],
		fileUrls: [],
		files: [],
		fontFilePath: '',
		fontFileName: '',
		fontFileUrl: '',
		fontFile: '',
		metalLaminate: '',
		acrylicBase: { name: 'Black', color: '#000000' },
		customColor: '',
		sets: 1,
		studLength: '',
		spacerStandoffDistance: '',
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
					title: `LETTERS ${count + 1}`,
					letters: '',
					font: '',
					thickness_options: '',
					customFont: '',
					letterHeight: '',
				};
			} else {
				args = {
					type: type,
					title: `LOGO ${count + 1}`,
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
		console.log('Attempting to preload fonts...');
		async function preloadFonts() {
			try {
				await loadingFonts();
			} catch (error) {
				console.error('Error loading fonts:', error);
			}
		}
		preloadFonts();
	}, []);

	const loadingFonts = async () => {
		const loadPromises = NovaQuote.fonts.map((font) => loadFont(font));
		await Promise.all(loadPromises);
	};

	async function loadFont({ name, src }) {
		const fontFace = new FontFace(name, `url(${src})`);

		try {
			await fontFace.load();
			document.fonts.add(fontFace);
		} catch (e) {
			console.error(`Font ${name} failed to load`);
		}
	}

	/* useEffect(() => {
		localStorage.setItem(storage + '-x', JSON.stringify(signage));
	}, [signage]); */

	useEffect(() => {
		if (NovaQuote.is_editting.length === 0) {
			setTempFolder(tempFolderName);
		} else {
			setTempFolder(`Q-${NovaQuote.current_quote_id}`);
		}
	}, []);

	return (
		<div className="md:flex gap-6">
			<div className="md:w-3/4 w-full">
				{letterPricing.length === 0 ? (
					<div className="rounded-md border border-gray-200 py-20 mb-8 justify-center items-center flex">
						<div className="flex justify-center items-center gap-2">
							<svg
								className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>{' '}
							Loading...
						</div>
					</div>
				) : (
					signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item}>
							{item.type === 'letters' ? (
								<Letters
									key={item.id}
									item={item}
									letterPricing={letterPricing}
								/>
							) : (
								<Logo key={item.id} item={item} />
							)}
						</Signage>
					))
				)}

				<div className="flex gap-2">
					{signage.length < 10 && (
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addSignage('letters')}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD LETTERS
							<PlusIcon />
						</button>
					)}

					{signage.length < 10 && (
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
	);
}
