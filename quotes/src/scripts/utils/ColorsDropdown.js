import React from 'react';
const ColorsDropdown = React.forwardRef(
	(
		{ title, colorName, toggleColor, openColor, colorOptions, selectColor },
		ref
	) => {
		const selectedColorOption = colorOptions.find(
			(option) => option.name === colorName
		);
		return (
			<div className="px-[1px] relative" ref={ref}>
				<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
					{title}
				</label>
				<div
					className={`flex flex-wrap items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
						colorName ? 'text-black' : 'text-[#dddddd]'
					}`}
					onClick={toggleColor}
				>
					{selectedColorOption?.color && (
						<span
							className="rounded-full w-[18px] h-[18px] border mr-2"
							style={{
								background:
									colorName == 'Custom Color'
										? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
										: selectedColorOption
										? selectedColorOption.color
										: '#fff',
							}}
						></span>
					)}

					<span className="whitespace-nowrap text-ellipsis overflow-hidden flex-1 pr-5">
						{colorName === '' ? 'CHOOSE OPTION' : colorName}
					</span>
				</div>
				{openColor && (
					<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto shadow-lg">
						{colorOptions.map((color) => {
							return (
								<div
									className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm flex-wrap"
									onClick={() => {
										selectColor(color);
									}}
								>
									{color?.color && (
										<span
											className="w-[18px] h-[18px] inline-block rounded-full border"
											style={{
												background:
													color.name == 'Custom Color'
														? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
														: color.color,
											}}
										></span>
									)}

									<span className="flex-1">{color.name}</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	}
);

export default ColorsDropdown;
