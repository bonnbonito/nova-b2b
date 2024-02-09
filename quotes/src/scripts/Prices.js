import React from 'react';

export default function Prices({ item }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	return (
		<div className="block">
			<div className="flex justify-between py-2 font-title uppercase md:tracking-[1.6px]">
				{item.title}{' '}
				<span>
					{currency}${Number(price).toLocaleString()}
				</span>
			</div>
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

			{item.type === 'logo' && (
				<>
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
							<div className="text-left text-sm break-words">
								{item.height}"
							</div>
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
							<div className="text-left text-sm break-words">
								{item.baseColor}
							</div>
						</div>
					)}
				</>
			)}

			{item.type === 'letters' && (
				<>
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
				</>
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

			{item.type === 'letters' && (
				<>
					{item.color.name && (
						<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
							<div className="text-left font-title md:tracking-[1.4px] text-sm">
								COLOR
							</div>
							<div className="text-left text-sm">{item.color?.name}</div>
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
					{item.letters && (
						<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
							<div className="text-left font-title md:tracking-[1.4px] text-sm">
								LINE TEXT
							</div>
							<div className="text-left text-sm break-words">
								{item.letters}
							</div>
						</div>
					)}
				</>
			)}

			{item.pieces && (
				<div className="grid grid-cols-2 gap-4 py-[2px] mb-1">
					<div className="text-left font-title md:tracking-[1.4px] text-sm">
						PIECES<small>(CUTOUTS)</small>
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
		</div>
	);
}
