import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../../AppProvider';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { INDOOR_NOT_WATERPROOF } from '../../../utils/defaults';
import { Letters } from './components/Letters';
import { Logo } from './components/Logo';

export default function AcrylicFrontLit() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	function setDefaultSignage() {
		setSignage([
			{
				id: uuidv4(),
				type: 'letters',
				title: 'LETTERS 1',
				letters: '',
				font: '',
				comments: '',
				waterproof: '',
				acrylicChannelThickness: '1.2"',
				acrylicFront: 'White',
				returnPaintColor: 'Black',
				vinylWhite: { name: '', color: '', code: '' },
				ledLightColor: '6500K White',
				letterHeight: '',
				usdPrice: 0,
				cadPrice: 0,
				filePaths: [],
				fileNames: [],
				fileUrls: [],
				files: [],
				sets: 1,
				customColor: '',
				mounting: '',
				studLength: '',
				spacerStandoffDistance: '',
				product: NovaQuote.product,
			},
		]);
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
		acrylicChannelThickness: '1.2"',
		acrylicFront: 'White',
		returnPaintColor: 'Black',
		vinylWhite: { name: '', color: '', code: '' },
		ledLightColor: '6500K White',
		waterproof: INDOOR_NOT_WATERPROOF,
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
					color: { name: '', color: '' },
					letterHeight: '',
					customColor: '',
					filePaths: [],
					fileNames: [],
					fileUrls: [],
					files: [],
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
				{signage.map((item, index) => (
					<Signage index={index} id={item.id} item={item}>
						{item.type === 'letters' ? (
							<Letters key={item.id} item={item} productId={item.product} />
						) : (
							<Logo key={item.id} item={item} productId={item.product} />
						)}
					</Signage>
				))}

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
