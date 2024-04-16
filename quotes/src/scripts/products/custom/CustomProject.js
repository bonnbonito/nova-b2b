import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarNoPrice from '../../SidebarNoPrice';
import Signage from '../../Signage';
import { PlusIcon } from '../../svg/Icons';
import { SignageCount } from '../../utils/QuoteFunctions';
import Logo from './components/Logo';

export const QuoteContext = createContext(null);

export default function CustomProject() {
	const [signage, setSignage] = useState([]);
	const [missing, setMissing] = useState([]);
	const [tempFolder, setTempFolder] = useState('');
	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;
	const storage =
		window.location.href + NovaQuote.user_id + NovaQuote.quote_div_id;
	const localStorageQuote = localStorage.getItem(storage);
	const savedStorage = JSON.parse(localStorageQuote);

	const [isLoading, setIsLoading] = useState(false);

	function setDefaultSignage() {
		setSignage([
			{
				id: uuidv4(),
				type: 'custom',
				title: 'CUSTOM PROJECT',
				description: '',
				usdPrice: 0,
				cadPrice: 0,
				custom_id: '',
				filePaths: [],
				fileNames: [],
				fileUrls: [],
				files: [],
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
		type: 'custom',
		title: 'CUSTOM PROJECT',
		description: '',
		custom_id: '',
		filePaths: [],
		fileNames: [],
		fileUrls: [],
		files: [],
		product: NovaQuote.product,
	};

	function addSignage(type) {
		setSignage((prevSignage) => {
			// Count how many signages of this type already exist
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args;
			args = {
				title: `${type} ${count + 1}`,
			};
			const newSignage = {
				...defaultArgs,
				...args,
			};

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
				isLoading,
				setIsLoading,
			}}
		>
			<div className="md:flex gap-6">
				<div className="md:w-3/4 w-full">
					{signage.map((item, index) => (
						<Signage
							index={index}
							id={item.id}
							item={item}
							missing={missing}
							setMissing={setMissing}
							signage={signage}
							setSignage={setSignage}
							addSignage={addSignage}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
							storage={storage}
						>
							<Logo key={item.id} item={item} />
						</Signage>
					))}

					<div className="flex gap-2">
						{signage.length < 10 && (
							<button
								className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
								onClick={() => addSignage('custom')}
								style={{ border: '1px solid #d2d2d2d2' }}
							>
								ADD PROJECT
								<PlusIcon />
							</button>
						)}
					</div>
				</div>
				<SidebarNoPrice
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
