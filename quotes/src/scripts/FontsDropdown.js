import React, { useRef, useState } from 'react';
import useOutsideClick from './utils/ClickOutside';
import { fontDefaultOptions } from './utils/FontOptions';

export default function FontsDropdown({
	font,
	handleSelectFont,
	fontRef,
	openFont,
	setOpenFont,
	setOpenColor,
}) {
	const handleCustomFontSelection = () => {
		// TODO: Add your logic here for custom font selection
		console.log('Custom font selected');
		handleSelectFont('Custom font');
		setOpenFont(false);
	};

	return (
		<div className="px-[1px] relative" ref={fontRef}>
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				FONT
			</label>
			<div
				className={`flex px-2 items-center select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
					font ? 'text-black' : 'text-[#dddddd]'
				}`}
				onClick={() => {
					setOpenFont((prev) => !prev);
					setOpenColor(false);
				}}
				style={{
					fontFamily: font,
				}}
			>
				<div className="truncate">{font === '' ? 'CHOOSE OPTION' : font}</div>
			</div>
			{openFont && (
				<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
					{/* Custom Font Option */}
					<div
						className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
						onClick={handleCustomFontSelection}
					>
						- Custom Font
					</div>
					<div className="">
						<h5 class="p-2 pb-0">Popular Fonts</h5>

						{fontDefaultOptions.popular_fonts.split(',').map((popularfont) => {
							return (
								<div
									className={`p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm ${
										popularfont === font && 'bg-slate-200'
									}`}
									style={{ fontFamily: popularfont }}
									onClick={() => {
										handleSelectFont(popularfont);
										setOpenFont(false);
									}}
								>
									- {popularfont}
								</div>
							);
						})}
						<h5 class="p-2 pb-0">Fonts</h5>
						{fontDefaultOptions.fonts.split(',').map((regFont) => {
							return (
								<div
									className={`p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm ${
										regFont === font && 'bg-slate-200'
									}`}
									style={{ fontFamily: regFont }}
									onClick={() => {
										handleSelectFont(regFont);
										setOpenFont(false);
									}}
								>
									- {regFont}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
