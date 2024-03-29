import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { SignageCount } from '../../../utils/QuoteFunctions';
import Logo from './components/Logo';

export const QuoteContext = createContext(null);

export const ASSEMBLY_FEES = 1.1;

export default function LayeredAcrylic() {
	const [signage, setSignage] = useState([]);
	const [missing, setMissing] = useState([]);
	const [tempFolder, setTempFolder] = useState('');
	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;

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
					type: 'logo',
					title: 'LOGO 1',
					comments: '',
					mounting: '',
					thickness: '',
					waterproof: '',
					finishing: 'Matte',
					usdPrice: 0,
					cadPrice: 0,
					filePath: '',
					fileName: '',
					fileUrl: '',
					file: '',
					width: '',
					height: '',
					layers: '',
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
		mounting: '',
		thickness: '',
		waterproof: '',
		finishing: 'Matte',
		description: '',
		usdPrice: 0,
		cadPrice: 0,
		filePath: '',
		fileName: '',
		fileUrl: '',
		file: '',
		layers: '',
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
						>
							<Logo key={item.id} item={item} />
						</Signage>
					))}

					<div className="flex gap-2">
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
				<Sidebar signage={signage} required={missing} tempFolder={tempFolder} />
			</div>
		</QuoteContext.Provider>
	);
}
