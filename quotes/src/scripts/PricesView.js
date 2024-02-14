import React from 'react';

export default function PricesView({ item }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	return (
		<div className="pb-8 mb-8 border-b-nova-light border-b">
			{item.type === 'letters' && (
				<div className="mt-4 p-4 border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md exclude-from-pdf">
					<div className="w-full self-center">
						<div
							className="self-center text-center"
							style={{
								margin: '0',
								fontSize: '50px',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								fontFamily: item.font,
								color: item.color.color,
								textShadow: '0px 0px 1px rgba(0, 0, 0, 1)',
								wordBreak: 'break-all',
								lineHeight: '1.6',
								paddingBottom: '20px',
							}}
						>
							{item.letters}
						</div>
					</div>
				</div>
			)}

			<div className="block">
				<div className="flex justify-between py-2 font-title uppercase">
					{item.title}{' '}
					<span>
						{currency}${Number(price).toFixed(2).toLocaleString()}
					</span>
				</div>
				<div className="grid grid-cols-[160px_1fr] py-[2px]">
					<div className="text-left text-xs font-title">THICKNESS</div>
					<div className="text-left text-[10px] uppercase">
						{item.thickness.thickness}
					</div>
				</div>

				{item.type === 'logo' && (
					<>
						{item.width && (
							<div className="grid grid-cols-[160px_1fr] py-[2px]">
								<div className="text-left text-xs font-title">LOGO WIDTH</div>
								<div className="text-left text-[10px] break-words">
									{item.width}"
								</div>
							</div>
						)}
						{item.height && (
							<div className="grid grid-cols-[160px_1fr] py-[2px]">
								<div className="text-left text-xs font-title">LOGO HEIGHT</div>
								<div className="text-left text-[10px] break-words">
									{item.height}"
								</div>
							</div>
						)}
						{item.printPreference && (
							<div className="grid grid-cols-[160px_1fr] py-[2px]">
								<div className="text-left text-xs font-title">
									PRINT PREFERENCE
								</div>
								<div className="text-left text-[10px] break-words">
									{item.printPreference}
								</div>
							</div>
						)}
						{item.baseColor && (
							<div className="grid grid-cols-[160px_1fr] py-[2px]">
								<div className="text-left text-xs font-title">BASE COLOR</div>
								<div className="text-left text-[10px] break-words">
									{item.baseColor}
								</div>
							</div>
						)}
					</>
				)}

				{item.type === 'letters' && (
					<>
						{item.letterHeight && (
							<div className="grid grid-cols-[160px_1fr] py-[2px]">
								<div className="text-left text-xs font-title">
									LETTER HEIGHT
								</div>
								<div className="text-left text-[10px] break-words">
									{item.letterHeight}"
								</div>
							</div>
						)}
					</>
				)}

				{item.mounting && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">MOUNTING</div>
						<div className="text-left text-[10px]">{item.mounting}</div>
					</div>
				)}

				{item.waterproof && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">WATERPROOF</div>
						<div className="text-left text-[10px]">{item.waterproof}</div>
					</div>
				)}

				{item.finishing && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">FINISHING</div>
						<div className="text-left text-[10px]">{item.finishing}</div>
					</div>
				)}

				{item.metalFinishing && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">METAL FINISHING</div>
						<div className="text-left text-[10px]">{item.metalFinishing}</div>
					</div>
				)}

				{item.type === 'letters' && (
					<>
						<div className="grid grid-cols-[160px_1fr] py-[2px]">
							<div className="text-left text-xs font-title">FONT</div>
							<div className="text-left text-[10px] break-words">
								{item.font}
							</div>
						</div>

						{item.color && (
							<div className="grid grid-cols-[160px_1fr] py-[2px]">
								<div className="text-left text-xs font-title">COLOR</div>
								<div className="text-left text-[10px]">{item.color?.name}</div>
							</div>
						)}

						<div className="grid grid-cols-[160px_1fr] py-[2px]">
							<div className="text-left text-xs font-title">LINE TEXT</div>
							<div className="text-left text-[10px] break-words">
								{item.letters}
							</div>
						</div>
					</>
				)}

				{item.metalFinish && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">METAL FINISH</div>
						<div className="text-left text-[10px]">
							{item.metalFinish?.name}
						</div>
					</div>
				)}

				{item.acrylicBase && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">ACRYLIC BASE</div>
						<div className="text-left text-[10px]">{item.acrylicBase}</div>
					</div>
				)}

				{item.installation && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">INSTALLATION</div>
						<div className="text-left text-[10px]">{item.installation}</div>
					</div>
				)}

				{item.pieces && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">PIECES/CUTOUTS</div>
						<div className="text-left text-[10px]">{item.pieces}</div>
					</div>
				)}

				{item.comments && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">COMMENTS</div>
						<div className="text-left text-[10px] break-words">
							{item.comments}
						</div>
					</div>
				)}

				{item.file && (
					<div className="grid grid-cols-[160px_1fr] py-[2px]">
						<div className="text-left text-xs font-title">FILE</div>
						<div className="text-left text-[10px] break-words">
							<a href={item.fileUrl} target="_blank">
								{item.fileName}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
