import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../../AppProvider';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { INDOOR_NOT_WATERPROOF } from '../../../utils/defaults';
import { Logo } from './components/Logo';

const ModularLightbox = () => {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	const setDefaultSignage = useCallback(() => {
		setSignage([
			{
				id: uuidv4(),
				type: 'lightbox',
				title: 'LIGHTBOX 1',
				waterproof: INDOOR_NOT_WATERPROOF,
				uvPrintedCover: '',
				usdPrice: 0,
				cadPrice: 0,
				filePaths: [],
				fileNames: [],
				fileUrls: [],
				files: [],
				sets: 1,
				product: NovaQuote.product,
			},
		]);
	}, []);

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
	}, []);

	const defaultArgs = {
		id: uuidv4(),
		waterproof: INDOOR_NOT_WATERPROOF,
		product: NovaQuote.product,
	};

	const addSignage = useCallback(
		(type) => {
			setSignage((prevSignage) => {
				const count = prevSignage.filter((sign) => sign.type === type).length;
				let args;
				if (type === 'logo') {
					args = {
						type: type,
						title: `LIGHTBOX ${count + 1}`,
						waterproof: INDOOR_NOT_WATERPROOF,
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
						<Logo key={item.id} item={item} productId={item.product} />
					</Signage>
				))}

				<div className="flex gap-2">
					{signage.length < 10 && (
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addSignage('logo')}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD LIGHTBOX
							<PlusIcon />
						</button>
					)}
				</div>
			</div>
			<Sidebar />
		</div>
	);
};

export default ModularLightbox;
