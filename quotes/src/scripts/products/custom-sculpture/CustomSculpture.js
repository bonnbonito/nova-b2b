import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarNoPrice from '../../SidebarNoPrice';
import Signage from '../../Signage';
import { PlusIcon } from '../../svg/Icons';
import { Sculpture } from './components/Sculpture';
import Note from '../../Note';

import { useAppContext } from '../../AppProvider';

export default function CustomSculpture() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	function setDefaultSignage() {
		setSignage([
			{
				id: uuidv4(),
				type: 'custom-sculpture',
				title: 'CUSTOM SCULPTURE',
				sculptureMaterial: 'NOVA Suggestion',
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
		type: 'custom-sculpture',
		title: 'CUSTOM SCULPTURE',
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
						<Sculpture key={item.id} item={item} />
					</Signage>
				))}

				<Note title="Note">
					<ul className="text-sm">
						<li>
							Please upload as many reference files as you can, such as your
							design concepts, final product examples, or similar items, to help
							us better understand your vision.
						</li>
					</ul>
				</Note>

				<div className="flex gap-2">
					{signage.length < 10 && (
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addSignage('custom-sculpture')}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD SCULPTURE
							<PlusIcon />
						</button>
					)}
				</div>
			</div>
			<SidebarNoPrice />
		</div>
	);
}
