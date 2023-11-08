import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './App';

export default function Logo({ item }) {
	const { signage, setSignage } = useContext(AppContext);
	const [comments, setComments] = useState('');

	function handleComments(e) {
		setComments(e.target.value);
	}

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					comments: comments,
				};
			} else {
				return sign;
			}
		});
		setSignage(updatedSignage);
	}

	useEffect(() => {
		setComments(item.comments);
	}, []);

	useEffect(() => {
		updateSignage();
	}, [comments]);

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm mb-2 tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="px-[1px] col-span-3">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						COMMENTS
					</label>
					<input
						className="w-full py-4 px-2 color-black text-sm font-bold rounded-md h-[40px] placeholder:text-slate-400"
						type="text"
						value={item.comments}
						onChange={handleComments}
						placeholder="ADD COMMENTS"
					/>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						UPLOAD PDF/AI FILE
					</label>
					<button className="h-[40px] w-full py-4 px-2 text-center text-white rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]">
						Upload Design
					</button>
				</div>
			</div>
		</>
	);
}
