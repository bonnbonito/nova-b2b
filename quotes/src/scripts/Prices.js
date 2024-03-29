import React from 'react';

export default function Prices({ item }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	return (
		<div className="block">
			<div className="flex justify-between py-2 font-title uppercase md:tracking-[1.6px]">
				{item.title}
				{price > 0 && (
					<span>
						{currency}${Number(price).toLocaleString()}
					</span>
				)}
			</div>
			{item.layers && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						LAYERS
					</div>
					<div className="text-left text-sm uppercase">{item.layers}</div>
				</div>
			)}
			{item.thickness && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						THICKNESS
					</div>
					<div className="text-left text-sm uppercase">
						{item.thickness.thickness}
					</div>
				</div>
			)}
			{item.depth?.depth && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL DEPTH
					</div>
					<div className="text-left text-sm uppercase">{item.depth.depth}</div>
				</div>
			)}
			{item.width && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						LOGO WIDTH
					</div>
					<div className="text-left text-sm break-words">{item.width}"</div>
				</div>
			)}
			{item.height && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						LOGO HEIGHT
					</div>
					<div className="text-left text-sm break-words">{item.height}"</div>
				</div>
			)}
			{item.printPreference && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						PRINT PREFERENCE
					</div>
					<div className="text-left text-sm break-words">
						{item.printPreference}
					</div>
				</div>
			)}
			{item.baseColor && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						BASE COLOR
					</div>
					<div className="text-left text-sm break-words">{item.baseColor}</div>
				</div>
			)}
			{item.letterHeight && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						LETTER HEIGHT
					</div>
					<div className="text-left text-sm break-words">
						{item.letterHeight}"
					</div>
				</div>
			)}
			{item.metal && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL OPTION
					</div>
					<div className="text-left text-sm">{item.metal}</div>
				</div>
			)}
			{item.mounting && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						MOUNTING
					</div>
					<div className="text-left text-sm">{item.mounting}</div>
				</div>
			)}
			{item.waterproof && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						WATERPROOF
					</div>
					<div className="text-left text-sm">{item.waterproof}</div>
				</div>
			)}
			{item.finishing && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						FINISHING
					</div>
					<div className="text-left text-sm">{item.finishing}</div>
				</div>
			)}
			{item.metalFinishing && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL FINISHING
					</div>
					<div className="text-left text-sm">{item.metalFinishing}</div>
				</div>
			)}
			{item.acrylicReveal && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						ACRYLIC REVEAL
					</div>
					<div className="text-left text-sm">{item.acrylicReveal}</div>
				</div>
			)}
			{item.stainlessSteelPolished && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						STEEL POLISHED
					</div>
					<div className="text-left text-sm">{item.stainlessSteelPolished}</div>
				</div>
			)}
			{item.font && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						FONT
					</div>
					<div className="text-left text-sm break-words">{item.font}</div>
				</div>
			)}
			{item.fontFileUrl && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						CUSTOM FONT
					</div>
					<div className="text-left text-sm break-words">
						<a href={item.fontFileUrl} target="_blank">
							{item.fontFileName}
						</a>
					</div>
				</div>
			)}

			{item.letters && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						LINE TEXT
					</div>
					<div className="text-left text-sm break-words">{item.letters}</div>
				</div>
			)}
			{item.color?.name && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						COLOR
					</div>
					<div className="text-left text-sm">{item.color?.name}</div>
				</div>
			)}
			{item.acrylicCover?.name && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						ACRYLIC COVER
					</div>
					<div className="text-left text-sm">{item.acrylicCover?.name}</div>
				</div>
			)}
			{item.ledLightColor && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						LED LIGHT COLOR
					</div>
					<div className="text-left text-sm">{item.ledLightColor}</div>
				</div>
			)}
			{item.customColor && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						CUSTOM COLOR
					</div>
					<div className="text-left text-sm">{item.customColor}</div>
				</div>
			)}
			{item.stainLessMetalFinish && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL FINISH
					</div>
					<div className="text-left text-sm">{item.stainLessMetalFinish}</div>
				</div>
			)}
			{item.studLength && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						STUD LENGTH
					</div>
					<div className="text-left text-sm">{item.studLength}</div>
				</div>
			)}
			{item.spacerStandoffDistance && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						SPACER STANDOFF DISTANCE
					</div>
					<div className="text-left text-sm">{item.spacerStandoffDistance}</div>
				</div>
			)}
			{item.metalFinish?.name && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL FINISH
					</div>
					<div className="text-left text-sm">{item.metalFinish?.name}</div>
				</div>
			)}
			{typeof item.metalFinish !== 'object' && item.metalFinish && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL FINISH
					</div>
					<div className="text-left text-sm">{item.metalFinish}</div>
				</div>
			)}
			{item.metalLaminate && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						METAL LAMINATE
					</div>
					<div className="text-left text-sm">{item.metalLaminate}</div>
				</div>
			)}
			{item.acrylicBase?.name && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						ACRYLIC BASE
					</div>
					<div className="text-left text-sm">{item.acrylicBase.name}</div>
				</div>
			)}
			{item.installation && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						INSTALLATION
					</div>
					<div className="text-left text-sm">{item.installation}</div>
				</div>
			)}
			{item.pieces && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						PIECES
					</div>
					<div className="text-left text-sm">{item.pieces}</div>
				</div>
			)}
			{item.comments && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						COMMENTS
					</div>
					<div className="text-left text-sm break-words">{item.comments}</div>
				</div>
			)}
			{item.fileUrl && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						FILE
					</div>
					<div className="text-left text-sm break-words">
						<a href={item.fileUrl} target="_blank">
							{item.fileName}
						</a>
					</div>
				</div>
			)}
			{item.description && (
				<div className="block py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						DESCRIPTION
					</div>
					<div className="text-left text-sm break-words">
						{item.description}
					</div>
				</div>
			)}
		</div>
	);
}
