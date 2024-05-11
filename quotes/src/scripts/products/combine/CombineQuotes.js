import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../Sidebar';
import Signage from '../../Signage';
import AccordionItem from './components/AccordionItem';

export const QuoteContext = createContext(null);

export default function CombineQuotes() {
	const productLines = NovaQuote.product_lines_accordion;
	const [signage, setSignage] = useState([]);
	const [missing, setMissing] = useState([]);
	const [tempFolder, setTempFolder] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const tempFolderName = `temp-${Math.random().toString(36).substring(2, 9)}`;

	const storage =
		window.location.href + NovaQuote.user_id + NovaQuote.quote_div_id + 'x';

	const localStorageQuote = localStorage.getItem(storage);

	const savedStorage = JSON.parse(localStorageQuote);

	function setDefaultSignage() {
		if (savedStorage?.length > 0) {
			setSignage(savedStorage);
		} else {
			setSignage([]);
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
		product: NovaQuote.product,
	};

	function addSignage(type) {
		setSignage((prevSignage) => {
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args;
			args = {
				type: type,
				title: `${type} ${count + 1}`,
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

	const accordion = productLines.map((group) => (
		<div className="border-gray-200 p-4 cursor-pointer rounded-md border mb-2">
			<AccordionItem group={group} addSignage={addSignage} />
		</div>
	));

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
							signage={signage}
							setSignage={setSignage}
							addSignage={addSignage}
							setMissing={setMissing}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
							storage={storage}
						>
							<p>{item.type}</p>
						</Signage>
					))}

					{signage.length < 10 && (
						<div className="gap-2">
							<div className="font-title text-3xl">PRODUCT LINES</div>
							<div className=" border-gray-200 p-4 cursor-pointer rounded-md border">
								{accordion}
							</div>
						</div>
					)}
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
