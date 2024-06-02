import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../../AppProvider';
import Note from '../../../Note';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { INDOOR_NOT_WATERPROOF } from '../../../utils/defaults';
import { Letters } from './components/Letters';

const AcrylicFrontSideLit = () => {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	const setDefaultSignage = useCallback(() => {
		setSignage([
			{
				id: uuidv4(),
				type: 'letters',
				title: 'LETTERS 1',
				letters: '',
				font: '',
				comments: '',
				waterproof: '',
				acrylicChannelThickness: '1.2" (30mm)',
				ledLightColor: '6500K White',
				letterHeight: '',
				acrylicReturn: 'White',
				frontOption: 'White',
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
	}, []);

	const loadFont = useCallback(async ({ name, src }) => {
		const fontFace = new FontFace(name, `url(${src})`);
		try {
			await fontFace.load();
			document.fonts.add(fontFace);
		} catch (e) {
			console.error(`Font ${name} failed to load`);
		}
	}, []);

	const preloadFonts = useCallback(async () => {
		const loadPromises = NovaQuote.fonts.map((font) => loadFont(font));
		await Promise.all(loadPromises);
	}, [loadFont]);

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

		if (NovaQuote.is_editting.length === 0) {
			setTempFolder(() => tempFolderName);
		} else {
			setTempFolder(() => `Q-${NovaQuote.current_quote_id}`);
		}

		console.log('Attempting to preload fonts...');
		preloadFonts();
	}, []);

	const defaultArgs = {
		id: uuidv4(),
		acrylicChannelThickness: '1.2" (30mm)',
		acrylicReturn: 'White',
		ledLightColor: '6500K White',
		waterproof: INDOOR_NOT_WATERPROOF,
		product: NovaQuote.product,
		acrylicReturn: 'White',
	};

	const addSignage = useCallback(
		(type) => {
			setSignage((prevSignage) => {
				const count = prevSignage.filter((sign) => sign.type === type).length;
				let args;
				if (type === 'letters') {
					args = {
						type: type,
						title: `LETTERS ${count + 1}`,
						letters: '',
						font: '',
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
				const newSignage = { ...defaultArgs, ...args };
				return [...prevSignage, newSignage];
			});
		},
		[signage]
	);

	return (
		<div className="md:flex gap-6">
			<div className="md:w-3/4 w-full">
				{signage.map((item, index) => (
					<Signage key={item.id} index={index} id={item.id} item={item}>
						<Letters key={item.id} item={item} productId={item.product} />
					</Signage>
				))}

				<Note title="Note">
					<ul className="text-sm">
						<li>
							The default cut is straight, but for strokes ranging from 6mm to
							15mm, it will be sloped
						</li>
						<li>
							We can customize the colors that are not on the 3M Vinyl options
							through UV printing.
						</li>
						<li>
							The spacer will be black (default) or match the painted sign's
							color.
						</li>
					</ul>
				</Note>

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
				</div>
			</div>
			<Sidebar />
		</div>
	);
};

export default AcrylicFrontSideLit;
