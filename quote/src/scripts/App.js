import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';
import Signage from './Signage';
import { PlusIcon } from './svg/Icons';

export const AppContext = createContext(null);

function App() {
	const [signage, setSignage] = useState([
		{
			id: uuidv4(),
			type: 'letters',
			title: 'LETTERS 1',
			letters: '',
			comments: '',
		},
	]);

	function addSignage(type) {
		setSignage((prevSignage) => {
			// Count how many signages of this type already exist
			const count = prevSignage.filter((sign) => sign.type === type).length;
			let args;
			// Create new signage with incremented title number
			if (type === 'letters') {
				args = {
					id: uuidv4(),
					type: type,
					title: `${type} ${count + 1}`,
					letters: '',
					comments: '',
				};
			} else {
				args = {
					id: uuidv4(),
					type: type,
					title: `${type} ${count + 1}`,
					comments: '',
				};
			}
			const newSignage = {
				...args,
			};

			// Append the new signage to the array
			return [...prevSignage, newSignage];
		});
	}

	return (
		<AppContext.Provider value={{ signage, setSignage, addSignage }}>
			<div className="flex gap-6">
				<div className="w-3/4">
					{signage.map((item, index) => (
						<Signage index={index} id={item.id} item={item}></Signage>
					))}

					<div className="flex gap-2">
						<div
							className="flex align-middle rounded-md border border-gray-200 p-4 cursor-pointer w-[193px] justify-between"
							onClick={() => addSignage('letters')}
						>
							<h6 className="leading-4">ADD LETTERS</h6>
							<PlusIcon />
						</div>
						<div
							className="flex align-middle rounded-md border border-gray-200 p-4 cursor-pointer w-[193px] justify-between"
							onClick={() => addSignage('logo')}
						>
							<h6 className="leading-4">ADD LOGO</h6>
							<PlusIcon />
						</div>
					</div>
				</div>
				<Sidebar />
			</div>
		</AppContext.Provider>
	);
}

export default App;
