import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';

import Letters from './components/Letters';

export const QuoteContext = createContext(null);

export default function TrimLessFrontAndBackLit() {
	const [signage, setSignage] = useState([]);
	const [missing, setMissing] = useState([]);
	const [tempFolder, setTempFolder] = useState('');
	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;
	const storage =
		window.location.href + NovaQuote.user_id + NovaQuote.quote_div_id + 'x';
	const localStorageQuote = localStorage.getItem(storage);
	const savedStorage = JSON.parse(localStorageQuote);

	const [isLoading, setIsLoading] = useState(false);

	function setDefaultSignage() {
		if (savedStorage?.length > 0) {
			console.log('loading saved');
			setSignage(savedStorage);
		} else {
			console.log('setting');
			setSignage([
				{
					id: uuidv4(),
					type: 'letters',
					title: 'LETTERS 1',
					depth: '',
					letters: '',
					comments: '',
					font: '',
					customFont: '',
					waterproof: '',
					thickness: '',
					vinylWhite: { name: '', color: '', code: '' },
					frontAcrylicCover: 'White',
					mounting: '',
					studLength: '',
					spacerStandoffDistance: '',
					color: { name: 'Black', color: '#000000' },
					customColor: '',
					letterHeight: '',
					ledLightColor: '6500K White',
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
		type: 'letters',
		title: 'LETTERS 1',
		depth: '',
		letters: '',
		comments: '',
		font: '',
		customFont: '',
		waterproof: '',
		thickness: '',
		frontAcrylicCover: 'White',
		vinylWhite: { name: '', color: '', code: '' },
		mounting: '',
		studLength: '',
		spacerStandoffDistance: '',
		color: { name: 'Black', color: '#000000' },
		customColor: '',
		letterHeight: '',
		ledLightColor: '6500K White',
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
		sets: 1,
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

	/* useEffect(() => {
		localStorage.setItem(storage + '-x', JSON.stringify(signage));
	}, [signage]); */

	useEffect(() => {
		if (NovaQuote.is_editting.length === 0) {
			const savedStorageFolder = JSON.parse(
				localStorage.getItem(
					window.location.href + NovaQuote.user_id + '-folder'
				)
			);

			if (savedStorageFolder?.length > 0) {
				setTempFolder(savedStorageFolder);
			} else {
				localStorage.setItem(
					window.location.href + NovaQuote.user_id + '-folder',
					JSON.stringify(tempFolderName)
				);
				setTempFolder(tempFolderName);
			}
		} else {
			setTempFolder(`Q-${NovaQuote.current_quote_id}`);
		}
	}, []);

	return (
		<QuoteContext.Provider
			value={{
				signage,
				setSignage,
				addSignage,
				missing,
				setMissing,
				tempFolder,
				isLoading,
				setIsLoading,
			}}
		>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full flex flex-col">
					{signage.map((item, index) => (
						<Signage
							index={index}
							id={item.id}
							item={item}
							signage={signage}
							setSignage={setSignage}
							addSignage={addSignage}
							setMissing={setMissing}
							storage={storage}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						>
							<Letters key={item.id} item={item} />
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
					</div>
				</div>
				<Sidebar
					signage={signage}
					required={missing}
					tempFolder={tempFolder}
					storage={storage}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
			</div>
		</QuoteContext.Provider>
	);
}
