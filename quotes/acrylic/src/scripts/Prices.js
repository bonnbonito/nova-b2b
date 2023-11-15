import React from 'react';

export default function Sidebar({ item }) {
	return (
		<div className="block">
			<div className="flex justify-between py-2 font-title uppercase">
				{item.title} <span>${Number(item.usdPrice).toLocaleString()} USD</span>
			</div>
			<div className="grid grid-cols-2 py-[2px]">
				<div className="text-left text-xs font-title">THICKNESS</div>
				<div className="text-left text-[10px] uppercase">
					{item.thickness.thickness}
				</div>
			</div>

			{item.type === 'logo' && (
				<>
					<div className="grid grid-cols-2 py-[2px]">
						<div className="text-left text-xs font-title">WIDTH</div>
						<div className="text-left text-[10px] break-words">
							{item.width}"
						</div>
					</div>
					<div className="grid grid-cols-2 py-[2px]">
						<div className="text-left text-xs font-title">HEIGHT</div>
						<div className="text-left text-[10px] break-words">
							{item.height}"
						</div>
					</div>
				</>
			)}

			{item.type === 'letters' && (
				<>
					<div className="grid grid-cols-2 py-[2px]">
						<div className="text-left text-xs font-title">LETTER HEIGHT</div>
						<div className="text-left text-[10px] break-words">
							{item.letterHeight}"
						</div>
					</div>
				</>
			)}

			<div className="grid grid-cols-2 py-[2px]">
				<div className="text-left text-xs font-title">MOUNTING</div>
				<div className="text-left text-[10px]">{item.mounting}</div>
			</div>

			<div className="grid grid-cols-2 py-[2px]">
				<div className="text-left text-xs font-title">WATERPROOF</div>
				<div className="text-left text-[10px]">{item.waterproof}</div>
			</div>

			<div className="grid grid-cols-2 py-[2px]">
				<div className="text-left text-xs font-title">COLOR</div>
				<div className="text-left text-[10px]">{item.color?.name}</div>
			</div>

			<div className="grid grid-cols-2 py-[2px]">
				<div className="text-left text-xs font-title">FINISHING</div>
				<div className="text-left text-[10px]">{item.finishing}</div>
			</div>

			{item.type === 'letters' && (
				<>
					<div className="grid grid-cols-2 py-[2px]">
						<div className="text-left text-xs font-title">FONT</div>
						<div className="text-left text-[10px] break-words">{item.font}</div>
					</div>
					<div className="grid grid-cols-2 py-[2px]">
						<div className="text-left text-xs font-title">LINE TEXT</div>
						<div className="text-left text-[10px] break-words">
							{item.letters}
						</div>
					</div>
				</>
			)}

			<div className="grid grid-cols-2 py-[2px]">
				<div className="text-left text-xs font-title">COMMENTS</div>
				<div className="text-left text-[10px] break-words">{item.comments}</div>
			</div>
			{item.file && (
				<div className="grid grid-cols-2 py-[2px]">
					<div className="text-left text-xs font-title">FILE</div>
					<div className="text-left text-[10px] break-words">
						<a href={item.file} target="_blank">
							View File
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
