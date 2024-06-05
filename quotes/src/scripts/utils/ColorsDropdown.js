import React from 'react';
const ColorsDropdown = React.forwardRef(
	(
		{
			title,
			color,
			setColor,
			toggleColor,
			openColor,
			colorOptions,
			selectColor,
		},
		ref
	) => {
		return (
			<div className="px-[1px] relative" ref={ref}>
				<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
					{title}
				</label>
				<div
					className={`flex items-center px-2 select border border-gray-200 w-full rounded-md text-sm font-title uppercase h-[40px] cursor-pointer ${
						color ? 'text-black' : 'text-[#dddddd]'
					}`}
					onClick={toggleColor}
				>
					<span
						className="rounded-full w-[18px] h-[18px] border mr-2"
						style={{
							background:
								color == 'Custom Color'
									? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
									: colorOptions.find((option) => option.name === color).color,
						}}
					></span>
					{color === '' ? 'CHOOSE OPTION' : color}
				</div>
				{openColor && (
					<div className="absolute w-[205px] max-h-[180px] bg-white z-20 border border-gray-200 rounded-md overflow-y-auto shadow-lg">
						{colorOptions.map((color) => {
							return (
								<div
									className="p-2 cursor-pointer flex items-center gap-2 hover:bg-slate-200 text-sm"
									onClick={() => {
										setColor(color.name);
										selectColor();
									}}
								>
									<span
										className="w-[18px] h-[18px] inline-block rounded-full border"
										style={{
											background:
												color.name == 'Custom Color'
													? `conic-gradient( from 90deg, violet, indigo, blue, green, yellow, orange, red, violet)`
													: color.color,
										}}
									></span>
									{color.name}
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
