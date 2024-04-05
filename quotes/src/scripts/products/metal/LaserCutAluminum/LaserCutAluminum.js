import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { SignageCount } from '../../../utils/QuoteFunctions';
import Letters from './components/Letters';
import Logo from './components/Logo';

export const QuoteContext = createContext(null);

export default function LaserCutAluminum() {
	const [signage, setSignage] = useState([]);
	const [missing, setMissing] = useState([]);
	const [tempFolder, setTempFolder] = useState('');
	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;
	const storage =
		window.location.href + NovaQuote.user_id + NovaQuote.quote_div_id;
	const localStorageQuote = localStorage.getItem(storage);
	const savedStorage = JSON.parse(localStorageQuote);

	function setDefaultSignage() {
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
					installation: '',
					waterproof: '',
					thickness: '',
					color: { name: '', color: '' },
					letterHeight: '',
					usdPrice: 0,
					cadPrice: 0,
					filePath: '',
					fileName: '',
					fontFilePath: '',
					fontFileName: '',
					fontFileUrl: '',
					fontFile: '',
					fileUrl: '',
					file: '',
					finishing: '',
					customFont: '',
					customColor: '',
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
		comments: '',
		installation: '',
		thickness: '',
		waterproof: '',
		finishing: '',
		usdPrice: 0,
		cadPrice: 0,
		filePath: '',
		fileName: '',
		fileUrl: '',
		file: '',
		product: NovaQuote.product,
		customFont: '',
		customColor: '',
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
					fontFilePath: '',
					fontFileName: '',
					fontFileUrl: '',
					fontFile: '',
					thickness_options: '',
					color: { name: '', color: '' },
					letterHeight: '',
				};
			} else {
				args = {
					type: type,
					title: `${type} ${count + 1}`,
					color: { name: 'Custom Color', color: '' },
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
		localStorage.setItem(storage, JSON.stringify(signage));
	}, [signage]);

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
			}}
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
							setMissing={setMissing}
							storage={storage}
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
				<Sidebar
					signage={signage}
					required={missing}
					tempFolder={tempFolder}
					storage={storage}
				/>
			</div>
		</QuoteContext.Provider>
	);
}
