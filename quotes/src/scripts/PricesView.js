import React, { useEffect, useRef } from 'react';

export default function PricesView({ item }) {
	const currency = wcumcs_vars_data.currency;
	const price = currency === 'USD' ? item.usdPrice : item.cadPrice;
	const style = {
		margin: '0',
		fontSize: '50px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		fontFamily: item.font,
		color: item.color?.color || '#000000',
		textShadow: '0px 0px 1px rgba(0, 0, 0, 1)',
		wordBreak: 'break-all',
		lineHeight: '1.6',
		padding: '0 10px 20px 10px',
	};

	const headlineRef = useRef(null);

	const adjustFontSize = () => {
		if (!headlineRef.current) {
			return;
		}
		const container = headlineRef.current.parentNode;
		const headline = headlineRef.current;

		// Reset the font-size to the maximum desired font-size
		headline.style.fontSize = '50px';

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

	useEffect(() => {
		adjustFontSize();
	}, [item.type]);

	return (
		<div className="pb-8 mb-8 border-b-nova-light border-b">
			{item.type === 'letters' && (
				<>
					<div className="mt-4 p-4 border border-gray-200 w-full h-72 flex align-middle justify-center rounded-md exclude-from-pdf max-w-[834px]">
						<div className="w-full self-center">
							<div
								className="self-center text-center"
								style={style}
								ref={headlineRef}
							>
								{item.letters}
							</div>
						</div>
					</div>
					<div className="text-xs text-[#5E5E5E] mb-8 mt-1 pl-2">
						Preview Image. Actual product color may differ.
					</div>
				</>
			)}

			<div className="block">
				<div className="flex justify-between py-2 font-title uppercase">
					{item.title}{' '}
					<span>
						{price > 0 &&
							`${currency}$${parseFloat(price).toFixed(2).toLocaleString()}`}
					</span>
				</div>

				{item.letters && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">TEXT</div>
						<div className="text-left text-[14px] break-words">
							{item.letters}
						</div>
					</div>
				)}

				{item.material && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">MATERIAL</div>
						<div className="text-left text-[14px] break-words">
							{item.material}
						</div>
					</div>
				)}

				{item.productLine && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">PRODUCT LINE</div>
						<div className="text-left text-[14px] break-words">
							{item.productLine}
						</div>
					</div>
				)}

				{item.font && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">FONT</div>
						<div className="text-left text-[14px] break-words">{item.font}</div>
					</div>
				)}

				{item.fontFileUrl && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">CUSTOM FONT</div>
						<div className="text-left text-[14px] break-words">
							<a href={item.fontFileUrl} target="_blank">
								{item.fontFileName}
							</a>
						</div>
					</div>
				)}

				{item.metal && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL</div>
						<div className="text-left text-[14px]">{item.metal}</div>
					</div>
				)}

				{item.metalThickness?.thickness && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL THICKNESS</div>
						<div className="text-left text-[14px] uppercase">
							{item.metalThickness.thickness}
						</div>
					</div>
				)}

				{item.metalDepth?.thickness && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL DEPTH</div>
						<div className="text-left text-[14px] uppercase">
							{item.metalDepth.thickness}
						</div>
					</div>
				)}

				{item.thickness?.thickness && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">THICKNESS</div>
						<div className="text-left text-[14px] uppercase">
							{item.thickness.thickness}
						</div>
					</div>
				)}

				{item.acrylicThickness?.thickness && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">
							ACRYLIC THICKNESS
						</div>
						<div className="text-left text-[14px] uppercase">
							{item.acrylicThickness.thickness}
						</div>
					</div>
				)}

				{item.depth?.depth && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL DEPTH</div>
						<div className="text-left text-[14px] uppercase">
							{item.depth.depth}
						</div>
					</div>
				)}

				{item.width && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">LOGO WIDTH</div>
						<div className="text-left text-[14px] break-words">
							{item.width}"
						</div>
					</div>
				)}

				{item.height && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">LOGO HEIGHT</div>
						<div className="text-left text-[14px] break-words">
							{item.height}"
						</div>
					</div>
				)}

				{item.layers && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">LAYERS</div>
						<div className="text-left text-[14px] break-words">
							{item.layers}
						</div>
					</div>
				)}

				{item.letterHeight && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">LETTER HEIGHT</div>
						<div className="text-left text-[14px] break-words">
							{item.letterHeight}"
						</div>
					</div>
				)}

				{item.backLitFinishing && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">FINISHING</div>
						<div className="text-left text-[14px]">{item.backLitFinishing}</div>
					</div>
				)}

				{item.backLitMetalFinish && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL FINISH</div>
						<div className="text-left text-[14px]">
							{item.backLitMetalFinish}
						</div>
					</div>
				)}

				{item.faceReturnColor?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">
							FACE & RETURN COLOR
						</div>
						<div className="text-left text-[14px]">
							{item.faceReturnColor?.name}
						</div>
					</div>
				)}

				{item.printPreference && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">PRINT PREFERENCE</div>
						<div className="text-left text-[14px] break-words">
							{item.printPreference}
						</div>
					</div>
				)}

				{item.metalLaminate && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL LAMINATE</div>
						<div className="text-left text-[14px]">{item.metalLaminate}</div>
					</div>
				)}

				{item.pvcBaseColor?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">PVC BASE COLOR</div>
						<div className="text-left text-[14px]">
							{item.pvcBaseColor?.name}
						</div>
					</div>
				)}

				{item.metalFinish?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL FINISH</div>
						<div className="text-left text-[14px]">
							{item.metalFinish?.name}
						</div>
					</div>
				)}

				{item.acrylicBase?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">ACRYLIC BASE</div>
						<div className="text-left text-[14px]">{item.acrylicBase.name}</div>
					</div>
				)}

				{typeof item.metalFinish !== 'object' && item.metalFinish && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">FINISHING</div>
						<div className="text-left text-[14px]">{item.metalFinish}</div>
					</div>
				)}

				{item.color?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">COLOR</div>
						<div className="text-left text-[14px]">{item.color?.name}</div>
					</div>
				)}

				{item.returnColor?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">RETURN COLOR</div>
						<div className="text-left text-[14px]">
							{item.returnColor?.name}
						</div>
					</div>
				)}

				{item.baseColor && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">BASE COLOR</div>
						<div className="text-left text-[14px] break-words">
							{item.baseColor}
						</div>
					</div>
				)}

				{item.customColor && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">CUSTOM COLOR</div>
						<div className="text-left text-[14px]">{item.customColor}</div>
					</div>
				)}

				{item.ledLightColor && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">LED LIGHT COLOR</div>
						<div className="text-left text-[14px]">{item.ledLightColor}</div>
					</div>
				)}

				{item.acrylicReveal && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">ACRYLIC REVEAL</div>
						<div className="text-left text-[14px]">{item.acrylicReveal}</div>
					</div>
				)}

				{item.frontAcrylicCover && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">
							FRONT ACRYLIC COVER
						</div>
						<div className="text-left text-[14px]">
							{item.frontAcrylicCover}
						</div>
					</div>
				)}

				{item.vinylWhite?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">3M VINYL</div>
						<div className="text-left text-[14px]">
							{item.vinylWhite?.name} - [{item.vinylWhite?.code}]
						</div>
					</div>
				)}

				{item.finishing && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">FINISHING</div>
						<div className="text-left text-[14px]">{item.finishing}</div>
					</div>
				)}

				{item.stainLessMetalFinish && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL FINISH</div>
						<div className="text-left text-[14px]">
							{item.stainLessMetalFinish}
						</div>
					</div>
				)}

				{item.metalColor?.name && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">COLOR</div>
						<div className="text-left text-[14px]">{item.metalColor?.name}</div>
					</div>
				)}

				{item.metalCustomColor && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">CUSTOM COLOR</div>
						<div className="text-left text-[14px]">{item.metalCustomColor}</div>
					</div>
				)}

				{item.waterproof && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">ENVIRONMENT</div>
						<div className="text-left text-[14px]">{item.waterproof}</div>
					</div>
				)}

				{item.mounting && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">MOUNTING</div>
						<div className="text-left text-[14px]">{item.mounting}</div>
					</div>
				)}
				{item.studLength && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">STUD LENGTH</div>
						<div className="text-left text-[14px]">{item.studLength}</div>
					</div>
				)}

				{item.spacerStandoffDistance && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">STANDOFF SPACE</div>
						<div className="text-left text-[14px]">
							{item.spacerStandoffDistance}
						</div>
					</div>
				)}

				{item.metalFinishing && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">METAL FINISHING</div>
						<div className="text-left text-[14px]">{item.metalFinishing}</div>
					</div>
				)}

				{item.stainlessSteelPolished && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">
							STAINLESS STEEL POLISH
						</div>
						<div className="text-left text-[14px]">
							{item.stainlessSteelPolished}
						</div>
					</div>
				)}

				{item.installation && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">INSTALLATION</div>
						<div className="text-left text-[14px]">{item.installation}</div>
					</div>
				)}

				{item.pieces && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">PIECES/CUTOUTS</div>
						<div className="text-left text-[14px]">{item.pieces}</div>
					</div>
				)}

				{item.sets && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">QUANTITY</div>
						<div className="text-left text-[14px]">{item.sets}</div>
					</div>
				)}

				{item.comments && item.comments.trim() && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">COMMENTS</div>
						<div className="text-left text-[14px] break-words">
							{item.comments}
						</div>
					</div>
				)}

				{item.description && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">DESCRIPTION</div>
						<div className="text-left text-[14px] break-words">
							{item.description}
						</div>
					</div>
				)}

				{item.fileUrl && item.fileUrls?.length == 0 && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">FILE</div>
						<div className="text-left text-[14px] break-words">
							<a href={item.fileUrl} target="_blank">
								{item.fileName}
							</a>
						</div>
					</div>
				)}

				{item.fileNames?.length > 0 && item.fileUrls?.length > 0 && (
					<div className="grid grid-cols-[160px_1fr] py-[2px] items-center gap-5">
						<div className="text-left text-xs font-title">FILES</div>
						<div className="text-left text-[14px] break-words">
							{item.fileUrls.map((fileUrl, index) => (
								<>
									<a href={fileUrl} target="_blank">
										{item.fileNames[index]}
									</a>
									{index < item.fileUrls?.length - 1 ? ', ' : ''}
								</>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
