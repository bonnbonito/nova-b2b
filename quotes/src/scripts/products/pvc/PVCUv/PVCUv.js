import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';

import Logo from './components/Logo';

export const QuoteContext = createContext(null);

export default function PVCUv() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	function setDefaultSignage() {
		if (savedStorage?.length > 0) {
			setSignage(savedStorage);
		} else {
			setSignage([
				{
					id: uuidv4(),
					type: 'logo',
					title: 'LOGO 1',
					comments: '',
					mounting: '',
					waterproof: '',
					thickness: '',
					pvcBaseColor: { name: 'Black', color: '#000000' },
					usdPrice: 0,
					cadPrice: 0,
					filePaths: [],
					fileNames: [],
					fileUrls: [],
					files: [],
					finishing: 'Matte',
					studLength: '',
					spacerStandoffDistance: '',
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
		finishing: 'Matte',
		usdPrice: 0,
		pvcBaseColor: { name: 'Black', color: '#000000' },
		cadPrice: 0,
		filePaths: [],
		fileNames: [],
		fileUrls: [],
		files: [],
		studLength: '',
		spacerStandoffDistance: '',
		sets: 1,
		product: NovaQuote.product,
	};

	function addSignage(type) {
		setSignage((prevSignage) => {
			// Count how many signages of this type already exist
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args;
			args = {
				type: type,
				title: `${type} ${count + 1}`,
				width: '',
				height: '',
			};
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
						<Signage index={index} id={item.id} item={item}>
							<Logo key={item.id} item={item} />
						</Signage>
					))}

					<div className="flex gap-2">
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
