import React from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip';

const ColorsDropdown = React.forwardRef(
	(
		{
			title,
			colorName,
			toggleColor,
			openColor,
			colorOptions,
			selectColor,
			samePrice = true,
		},
		ref
	) => {
		const selectedColorOption = colorOptions.find(
			(option) => option.name === colorName
		);
		return (
			<div className="px-[1px] relative" ref={ref}>
				<label className="uppercase font-title text-sm tracking-[1.4px] px-2">
					{title}
					{samePrice && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="size-4 cursor-pointer"
									>
										<path
											fillRule="evenodd"
											d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
											clipRule="evenodd"
										/>
									</svg>
								</TooltipTrigger>
								<TooltipContent className="bg-white">
									<span className="font-body text-sm normal-case">
										The pricing remains the same
										<br /> regardless of your color choice.
									</span>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
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
