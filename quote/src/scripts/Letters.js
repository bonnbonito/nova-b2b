import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './App';

export default function Letters({ item }) {
	const { signage, setSignage } = useContext(AppContext);
	const [letters, setLetters] = useState('');
	const [comments, setComments] = useState('');

	const headlineRef = useRef(null);

	const adjustFontSize = () => {
		const container = headlineRef.current.parentNode;
		const headline = headlineRef.current;

		// Reset the font-size to the maximum desired font-size
		headline.style.fontSize = '60px';

		// Check if the headline is wider than its container
		while (
			headline.scrollWidth > container.offsetWidth &&
			parseFloat(window.getComputedStyle(headline).fontSize) > 0
		) {
			// Reduce the font-size by 1px until it fits
			headline.style.fontSize = `${
				parseFloat(window.getComputedStyle(headline).fontSize) - 1
			}px`;
		}
	};

	function updateSignage() {
		const updatedSignage = signage.map((sign) => {
			if (sign.id === item.id) {
				return {
					...sign,
					letters: letters,
					comments: comments,
				};
			} else {
				return sign;
			}
		});
		setSignage(updatedSignage);
	}

	function handleOnChange(e) {
		setLetters(() => e.target.value);
	}

	function handleComments(e) {
		setComments(e.target.value);
	}

	useEffect(() => {
		setComments(item.comments);
		setLetters(item.letters);
	}, []);

	useEffect(() => {
		adjustFontSize();
		updateSignage();
	}, [letters, comments]);

	return (
		<>
			<div className="mt-4 p-4 border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md">
				<div className="w-full self-center">
					<div
						className="self-center text-center"
						ref={headlineRef}
						style={{
							fontSize: '60px',
							margin: '0',
							lineHeight: '1.2',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
						}}
					>
						{letters}
					</div>
				</div>
			</div>
			<div className="py-4">
				<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
					Letters
				</label>
				<input
					className="w-full py-4 px-2 color-black text-sm font-bold rounded-md h-14 placeholder:text-slate-400"
					type="text"
					onChange={handleOnChange}
					maxLength={100}
					value={letters}
					placeholder="YOUR TEXT HERE"
				/>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						Option
					</label>
					<select className="border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px]">
						<option>Test</option>
						<option>Test2</option>
					</select>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
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
						value={comments}
						onChange={handleComments}
						placeholder="ADD COMMENTS"
					/>
				</div>
				<div className="px-[1px]">
					<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
						UPLOAD PDF/AI FILE
					</label>

					<button className="h-[40px] w-full py-2 px-2 text-center text-red rounded-md text-sm uppercase bg-slate-400 hover:bg-slate-600 font-title leading-[1em]">
						Upload Design
					</button>
				</div>
			</div>

			<div className="text-xs text-[#9F9F9F] pt-4">
				We size the letters in proportion to your chosen font. Some
				uppercase/lowercase letters may appear shorter or taller than your
				selected height on the form to maintain visual harmony.
			</div>
		</>
	);
}
