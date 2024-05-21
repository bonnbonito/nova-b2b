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
	{ key: item.metal, label: 'METAL' },
	{ key: item.thickness?.thickness, label: 'THICKNESS' },
	{ key: item.metalDepth?.thickness, label: 'METAL DEPTH' },
	{ key: item.acrylicThickness?.thickness, label: 'ACRYLIC THICKNESS' },
	{ key: item.metalThickness?.thickness, label: 'METAL THICKNESS' },
	{ key: item.depth?.depth, label: 'METAL DEPTH' },
	{ key: item.letterHeight, label: 'LETTER HEIGHT' },
	{ key: item.backLitFinishing, label: 'FINISHING' },
	{ key: item.backLitMetalFinish, label: 'METAL FINISH' },
	{ key: item.faceReturnColor?.name, label: 'FACE & RETURN COLOR' },
	{ key: item.width, label: 'LOGO WIDTH' },
	{ key: item.height, label: 'LOGO HEIGHT' },
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
	{ key: item.baseColor, label: 'BASE COLOR' },
	{ key: item.customColor, label: 'CUSTOM COLOR' },
	{ key: item.finishing, label: 'FINISHING' },
	{ key: item.metalColor?.name, label: 'COLOR' },
	{ key: item.metalCustomColor, label: 'CUSTOM COLOR' },
	{ key: item.ledLightColor, label: 'LED LIGHT COLOR' },
	{ key: item.acrylicReveal, label: 'ACRYLIC REVEAL' },
	{ key: item.frontAcrylicCover, label: 'FRONT ACRYLIC COVER' },
	{ key: item.vinylWhite?.name, label: '3M VINYL', isVinyl: true },
	{ key: item.neonSignWidth, label: 'NEON SIGN WIDTH' },
	{ key: item.neonSignHeight, label: 'NEON SIGN HEIGHT' },
	{ key: item.neonUsed, label: 'NEON USED(ft)' },
	{ key: item.neonThickness, label: 'NEON THICKNESS' },
	{ key: item.neonLength, label: 'NEON LENGTH(ft)' },
	{ key: item.neonLength8mm, label: '8mm NEON LENGTH' },
	{ key: item.neonLength10mm, label: '10mm NEON LENGTH' },
	{ key: item.neonLength14mm, label: '14mm NEON LENGTH' },
	{ key: item.neonLength20mm, label: '20mm NEON LENGTH' },
	{ key: item.acrylicBackingOption, label: 'ACRYLIC BACKING OPTION' },
	{ key: item.rigidBacking, label: 'BACKING OPTION' },
	{ key: item.paintedPCColor, label: 'PAINTED PC COLOR' },
	{ key: item.paintedPCFinish, label: 'PAINTED PC FINISH' },
	{ key: item.waterproof, label: 'ENVIRONMENT' },
	{ key: item.mounting, label: 'MOUNTING' },
	{ key: item.remoteControl, label: 'REMOTE CONTROL' },
	{ key: item.wireExitLocation, label: 'WIRE EXIT LOCATION' },
	{ key: item.wireType, label: 'WIRE TYPE' },
	{ key: item.neonColor, label: 'COLOR' },
	{ key: item.metalFinishing, label: 'METAL FINISHING' },
	{ key: item.studLength, label: 'STUD LENGTH' },
	{ key: item.spacerStandoffDistance, label: 'STANDOFF SPACE' },
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
