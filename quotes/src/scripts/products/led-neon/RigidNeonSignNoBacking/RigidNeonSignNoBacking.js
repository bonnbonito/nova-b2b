import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../../AppProvider';
import Note from '../../../Note';
import Sidebar from '../../../Sidebar';
import Signage from '../../../Signage';
import { PlusIcon } from '../../../svg/Icons';
import { NeonSign } from './components/NeonSign';

export default function RigidNeonSignNoBacking() {
	const { signage, setSignage, setTempFolder, tempFolderName } =
		useAppContext();

	const defaultSignage = {
		id: uuidv4(),
		type: 'SIGN',
		title: 'SIGN 1',
		neonSignWidth: '',
		neonSignHeight: '',
		neonThickness: '',
		neonLength8mm: '',
		neonLength10mm: '',
		neonLength14mm: '',
		neonLength20mm: '',
		remoteControl: 'No',
		neonColor: '',
		customColor: '',
		rigidWaterproof: '',
		comments: '',
		mounting: '',
		wireType: '',
		spacerStandoffDistance: '',
		usdPrice: 0,
		cadPrice: 0,
		filePaths: [],
		fileNames: [],
		fileUrls: [],
		files: [],
		sets: 1,
		product: NovaQuote.product,
	};

	function setDefaultSignage() {
		setSignage([defaultSignage]);
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

	function addSignage(type) {
		setSignage((prevSignage) => {
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args = {
				type: 'SIGN',
				title: `SIGN ${count + 1}`,
			};
			const newSignage = {
				...defaultSignage,
				...args,
			};

			return [...prevSignage, newSignage];
		});
	}

	useEffect(() => {
		if (NovaQuote.is_editting.length === 0) {
			setTempFolder(tempFolderName);
		} else {
			setTempFolder(`Q-${NovaQuote.current_quote_id}`);
		}
		// Only run once, no need to add dependencies if they don't change
	}, []);

	return (
		<div className="md:flex gap-6">
			<div className="md:w-3/4 w-full">
				{signage.map((item, index) => (
					<Signage index={index} id={item.id} item={item}>
						<NeonSign key={item.id} item={item} productId={item.product} />
					</Signage>
				))}

				<Note title="Note">
					<ul className="text-sm">
						<li>The spacer is white to match the neon base.</li>
						<li>
							By default, each neon section will have 1 wire exit per segment.
							If you prefer all wire exits to be in one place, please let us
							know.
						</li>
					</ul>
				</Note>

				<div className="flex gap-2">
					{signage.length < 10 && (
						<button
							className="flex leading-none items-center rounded-md border bg-white border-gray-200 p-4 cursor-pointer w-[193px] justify-between hover:bg-slate-600 font-title text-black hover:text-white"
							onClick={() => addSignage('SIGN')}
							style={{ border: '1px solid #d2d2d2d2' }}
						>
							ADD NEON SIGN
							<PlusIcon />
						</button>
					)}
				</div>
			</div>
			<Sidebar />
		</div>
	);
}
