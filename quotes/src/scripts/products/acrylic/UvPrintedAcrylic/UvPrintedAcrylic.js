import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from '../../../Note';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';

import { Logo } from './components/Logo';

import { useAppContext } from '../../../AppProvider';

export default function UvPrintedAcrylic() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	function setDefaultSignage() {
		setSignage([
			{
				id: uuidv4(),
				type: 'logo',
				title: 'LOGO 1',
				comments: '',
				mounting: '',
				acrylicThickness: '',
				waterproof: '',
				finishing: 'Matte',
				usdPrice: 0,
				cadPrice: 0,
				filePaths: [],
				fileNames: [],
				fileUrls: [],
				files: [],
				width: '',
				height: '',
				printPreference: '',
				baseColor: 'Black',
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
		finishing: 'Matte',
		usdPrice: 0,
		cadPrice: 0,
		filePaths: [],
		fileNames: [],
		fileUrls: [],
		files: [],
		baseColor: 'Black',
		printPreference: '',
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
			args = {
				type: type,
				title: `LOGO ${count + 1}`,
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
			if (NovaQuote.project_folder_status) {
				setTempFolder(
					`${NovaQuote.project_folder_status}/Q-${NovaQuote.current_quote_id}`
				);
			} else {
				setTempFolder(`Q-${NovaQuote.current_quote_id}`);
			}
		}
	}, []);

	return (
		<div className="md:flex gap-6">
			<div className="md:w-3/4 w-full">
				{signage.map((item, index) => (
					<Signage key={item.id} index={index} id={item.id} item={item}>
						<Logo key={item.id} item={item} />
					</Signage>
				))}

				<Note title="Note">
					<ul className="text-sm">
						<li>The minimum stroke for 3M double-sided tape is 10mm.</li>
						<li>
							For stud pins: The minimum stroke is 12mm (1/2”) and the minimum
							acrylic thickness is 1/4" (6mm).
						</li>
						<li>
							You can choose a thicker acrylic to accommodate the design. If you
							choose thinner acrylic, take note that it cannot use stud pins and
							the sign must be carefully glued to the installation surface.
						</li>
						<li>
							Sharp, thin points are not ideal unless requested. Slim sections
							will be cut for shipping as small lines may break easily. You can
							glue them together upon receipt.
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
