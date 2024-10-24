export const allAttributes = (item) => [
	{ key: item.material, label: 'MATERIAL' },
	{ key: item.productLine, label: 'PRODUCT LINE' },
	{ key: item.letters, label: 'TEXT' },
	{ key: item.font, label: 'FONT' },
	{
		key: item.fontFileUrl && item.fontFileName,
		label: 'CUSTOM FONT',
		isLink: true,
	},
	{ key: item.etchedMaterial, label: 'MATERIAL' },
	{ key: item.etchedWidth, label: 'WIDTH' },
	{ key: item.etchedHeight, label: 'HEIGHT' },
	{ key: item.etchedMetalThickness, label: 'METAL THICKNESS' },
	{ key: item.etchedFinishing, label: 'FINISHING' },
	{ key: item.etchedPaintedColor, label: 'PAINTED COLOR' },
	{ key: item.etchedElectroplated, label: 'ELECTROPLATED FINISHING' },
	{ key: item.etchedAnodizedColor, label: 'ANODIZED COLOR' },
	{ key: item.etchedGraphicsStyle, label: 'GRAPHICS STYLE' },
	{ key: item.etchedEdges, label: 'EDGES' },
	{ key: item.metal, label: 'METAL' },
	{ key: item.thickness?.thickness, label: 'THICKNESS' },
	{ key: item.metalDepth?.thickness, label: 'METAL DEPTH' },
	{ key: item.acrylicThickness?.thickness, label: 'ACRYLIC THICKNESS' },
	{ key: item.acrylicChannelThickness, label: 'ACRYLIC THICKNESS' },
	{ key: item.metalThickness?.thickness, label: 'METAL THICKNESS' },
	{ key: item.depth?.depth, label: 'METAL DEPTH' },
	{ key: item.letterHeight, label: 'LETTER HEIGHT' },
	{ key: item.acrylicReturn, label: 'RETURN' },
	{ key: item.width, label: 'LOGO WIDTH' },
	{ key: item.height, label: 'LOGO HEIGHT' },
	{ key: item.frontOption, label: 'FRONT OPTION' },
	{ key: item.paintColor, label: 'PAINT COLOR' },
	{ key: item.acrylicFront, label: 'ACRYLIC FRONT' },
	{ key: item.backLitFinishing, label: 'FINISHING' },
	{ key: item.backLitMetalFinish, label: 'METAL FINISH' },
	{ key: item.faceReturnColor?.name, label: 'FACE & RETURN COLOR' },
	{ key: item.neonSignWidth, label: 'NEON SIGN WIDTH' },
	{ key: item.neonSignHeight, label: 'NEON SIGN HEIGHT' },
	{ key: item.neonUsed, label: 'NEON USED(ft)' },
	{ key: item.neonThickness, label: 'NEON THICKNESS' },
	{ key: item.neonLength, label: 'NEON LENGTH(ft)' },
	{ key: item.rigidWaterproof, label: 'ENVIRONMENT' },
	{ key: item.neonColor, label: 'NEON COLORS' },
	{ key: item.neonLength8mm, label: '8mm NEON LENGTH' },
	{ key: item.neonLength10mm, label: '10mm NEON LENGTH' },
	{ key: item.neonLength14mm, label: '14mm NEON LENGTH' },
	{ key: item.neonLength20mm, label: '20mm NEON LENGTH' },
	{ key: item.metalFinish, label: 'FINISHING' },
	{ key: item.stainLessMetalFinish, label: 'METAL FINISH' },
	{ key: item.stainlessSteelPolished, label: 'STEEL POLISH' },
	{ key: item.layers, label: 'LAYERS' },
	{ key: item.metalLaminate, label: 'METAL LAMINATE' },
	{ key: item.pvcBaseColor?.name, label: 'PVC BASE COLOR' },
	{ key: item.acrylicBase?.name, label: 'ACRYLIC BASE' },
	{ key: item.printPreference, label: 'PRINT PREFERENCE' },
	{ key: item.color?.name, label: 'COLOR' },
	{ key: item.returnColor?.name, label: 'RETURN COLOR' },
	{ key: item.customColor, label: 'CUSTOM COLOR' },
	{ key: item.finishing, label: 'FINISHING' },
	{ key: item.aluminumFinishing, label: 'ALUMINUM FINISHING' },
	{ key: item.anodizedFinishing, label: 'ANODIZED FINISHING' },
	{ key: item.anodizedColor, label: 'ANODIZED COLOR' },
	{ key: item.metalColor?.name, label: 'COLOR' },
	{ key: item.metalCustomColor, label: 'CUSTOM COLOR' },
	{ key: item.returnPaintColor, label: 'RETURN PAINT COLOR' },
	{ key: item.acrylicReveal, label: 'ACRYLIC REVEAL' },
	{ key: item.frontAcrylicCover, label: 'FRONT ACRYLIC COVER' },
	{ key: item.vinylWhite?.name, label: '3M 3630 VINYL', isVinyl: true },
	{ key: item.vinyl3635, label: '3M 3635 VINYL' },
	{ key: item.frontBackVinyl, label: 'FRONT & BACK VINYL' },
	{ key: item.acrylicReturnPaintColor, label: 'RETURN PAINT COLOR' },
	{ key: item.ledLightColor, label: 'LED LIGHT COLOR' },
	{ key: item.acrylicBackingOption, label: 'BACKING' },
	{ key: item.rigidBacking, label: 'BACKING' },
	{ key: item.paintedPCColor, label: 'PAINTED PC COLOR' },
	{ key: item.pcCustomColor, label: 'CUSTOM COLOR' },
	{ key: item.baseColor, label: 'BASE COLOR' },
	{ key: item.baseCustomColor, label: 'BASE CUSTOM COLOR' },
	{ key: item.paintedPCFinish, label: 'PAINTED PC FINISH' },
	{ key: item.lightboxType, label: 'LIGHT BOX TYPE' },
	{ key: item.uvPrintedCover, label: 'UV PRINTED COVER' },
	{ key: item.waterproof, label: 'ENVIRONMENT' },
	{ key: item.backOption, label: 'BACK OPTION' },
	{ key: item.mounting, label: 'MOUNTING' },
	{ key: item.rigidM4StudLength, label: 'M4 STUD LENGTH' },
	{ key: item.metalFinishing, label: 'METAL FINISHING' },
	{ key: item.studLength, label: 'STUD LENGTH' },
	{ key: item.spacerStandoffDistance, label: 'STANDOFF SPACE' },
	{ key: item.trimLessWaterproof, label: 'ENVIRONMENT' },
	{ key: item.lightingPackaged, label: 'INCLUDED ITEMS' },
	{ key: item.includedItems, label: 'INCLUDED ITEMS' },
	{ key: item.remoteControl, label: 'REMOTE CONTROL' },
	{ key: item.wireExitLocation, label: 'WIRE EXIT LOCATION' },
	{ key: item.wireType, label: 'WIRE TYPE' },
	{ key: item.installation, label: 'INSTALLATION' },
	{ key: item.pieces, label: 'PIECES' },
	{ key: item.sets, label: 'QUANTITY' },
	{ key: item.comments?.trim(), label: 'COMMENTS' },
	{ key: item.fileUrl && !item.files, label: 'FILE', isFile: true },
	{
		key: item.fileNames?.length > 0 && item.fileUrls?.length > 0,
		label: 'FILES',
		isFiles: true,
	},
	{ key: item.description, label: 'DESCRIPTION' },
];
