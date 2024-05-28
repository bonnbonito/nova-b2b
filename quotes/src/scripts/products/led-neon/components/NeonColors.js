import React, { useEffect, useMemo, useState } from 'react';
import useOutsideClick from '../../../utils/ClickOutside';
import { neonColorOptions } from '../neonSignOptions';

export const NeonColors = ({
	colorRef,
	colors,
	toggle,
	openColor,
	getSelectedColors,
	setToogle,
}) => {
	const [selectedColors, setSelectedColors] = useState([]);

	const handleColorChange = (colorOption) => {
		setSelectedColors((prevColors) => {
			if (prevColors.some((c) => c.name === colorOption.name)) {
				return prevColors.filter((c) => c.name !== colorOption.name);
			} else {
				return [...prevColors, colorOption];
			}
		});
	};

	useEffect(() => {
		console.log(colors.length);
	}, [colors]);

	useEffect(() => {
		getSelectedColors(selectedColors);
	}, [selectedColors]);

	const colorSelections = useMemo(
		() => (
			<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto">
				{neonColorOptions.map((colorOption) => (
					<label
						key={colorOption.name}
						className="has-[:checked]:ring-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm  select-none"
					>
						<input
							type="checkbox"
							checked={selectedColors.some((c) => c.name === colorOption.name)}
							onChange={() => handleColorChange(colorOption)}
						/>
						<span
							className="w-[18px] h-[18px] inline-block rounded-full border"
							style={{
								background:
									colorOption.name === 'Custom Color'
										? `conic-gradient(from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: colorOption.color,
							}}
						></span>
						{colorOption.name}
					</label>
				))}
			</div>
		),
		[selectedColors]
	);

	useOutsideClick([colorRef], () => {
		if (!openColor) return;
		setToogle(false);
	});

	return (
		<div className="px-[1px] relative" ref={colorRef}>
			<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
				Neon Colors
			</label>
			<div
				className={`flex items-center text-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
					selectedColors.length > 0 ? 'text-black' : 'text-[#dddddd]'
				}`}
				onClick={toggle}
			>
				{selectedColors.length} selected
			</div>
			{openColor && colorSelections}
		</div>
	);
};
