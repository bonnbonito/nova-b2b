let signage = JSON.parse(QuoteAdmin.signage);
const signageInput = document.querySelector('[data-name="signage"] input');
const cadPrice = document.getElementById('cadPrice');
const finalPriceInput = document.querySelector(
	'[data-name="final_price"] input'
);
const EXCHANGE_RATE = 1.3;

function displayQuoteDetails() {
	// Initialize and display the CAD price based on the USD price
	updateCADPriceFromUSD(EXCHANGE_RATE);

	// Calculate and display the total USD price for all signage items
	displayTotalUsdPrice(signage);

	// Iterate over each signage item and display its details
	signage.forEach(displaySignageItem);
}

function updateCADPriceFromUSD(exchangeRate) {
	const cadPriceElement = document.getElementById('cadPrice');
	const finalPriceElement = document.querySelector('#finalPrice input');
	const usdPrice = finalPriceElement.value;

	// Convert and display initial CAD price
	cadPriceElement.textContent = convertToCAD(usdPrice, exchangeRate).toFixed(2);

	// Update CAD price on USD price change
	finalPriceElement.addEventListener('change', (e) => {
		cadPriceElement.textContent = convertToCAD(
			e.target.value,
			exchangeRate
		).toFixed(2);
	});
}

function convertToCAD(usdPrice, exchangeRate) {
	return parseFloat(usdPrice) * exchangeRate;
}

function displayTotalUsdPrice(signage) {
	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);
	const priceDisplay = totalUsdPrice ? `$${totalUsdPrice.toFixed(2)}` : 'TBD';
	const cadPriceDisplay = convertToCAD(totalUsdPrice, EXCHANGE_RATE).toFixed(2);

	const totalPriceElement = document.createElement('div');
	totalPriceElement.className = 'total-signage-price';
	totalPriceElement.innerHTML = `<h2 style="padding-bottom: 0;">Price: <span id="totalComputed">${priceDisplay}</span></h2>
	<h3 style="padding-left: 12px; margin-top: 0;">CAD Price: <span id="totalCadComputed">$${cadPriceDisplay}</span></h3>`;

	document.getElementById('novaquote').appendChild(totalPriceElement);
}

function displaySignageItem(sign) {
	const container = document.getElementById('novaquote');
	const signageItemElement = document.createElement('div');
	signageItemElement.className = 'signage-item';
	signageItemElement.innerHTML = getSignageItemHTML(sign);

	container.appendChild(signageItemElement);

	container.addEventListener(
		'blur',
		function (event) {
			// Check if the blurred element is a price input
			if (event.target && event.target.matches(`#priceInput_${sign.id}`)) {
				const newPrice = event.target.value;
				// Update the usdPrice for the sign in the signage array
				const signIndex = signage.findIndex((s) => s.id === sign.id);
				if (signIndex !== -1) {
					signage[signIndex].usdPrice = newPrice;

					console.log(newPrice);

					const newCadPrice = convertToCAD(newPrice, EXCHANGE_RATE).toFixed(2);

					console.log(newCadPrice);

					signage[signIndex].cadPrice = newCadPrice;
					// Update the displayed price
					document.getElementById(`priceDisplay_${sign.id}`).textContent =
						newPrice;

					console.log(`.signage-value[data-id="${sign.id}"]`);

					document.querySelector(
						`.signage-value[data-id="${sign.id}"]`
					).textContent = newCadPrice;

					const totalUsdPrice = signage.reduce(
						(acc, item) => acc + parseFloat(item.usdPrice),
						0
					);
					const priceDisplay = totalUsdPrice
						? `$${totalUsdPrice.toFixed(2)}`
						: 'TBD';

					const cadPriceDisplay = totalUsdPrice
						? `$${convertToCAD(totalUsdPrice, EXCHANGE_RATE).toFixed(2)}`
						: 'TBD';

					document.getElementById('totalComputed').textContent = priceDisplay;
					document.getElementById('totalCadComputed').textContent =
						cadPriceDisplay;

					console.log(signage);

					finalPriceInput.value = totalUsdPrice.toFixed(2);
					signageInput.value = JSON.stringify(signage);
					cadPrice.textContent = convertToCAD(
						totalUsdPrice,
						EXCHANGE_RATE
					).toFixed(2);
				}
			}
		},
		true
	); // Use capture phase to ensure the blur event is captured
}

function getSignageItemHTML(sign) {
	const detailFields = allAttributes(sign);
	const htmlDetails = detailFields
		.map((field) => {
			// Check if the current field is "CAD PRICE" to conditionally add the data-id attribute
			const dataIdAttribute =
				field.label === 'CAD PRICE' ? `data-id="${sign.id}"` : '';
			return `
                <div class="signage-details ${
									field.descriptClass ? field.descriptClass : ''
								}">
                    <div class="signage-label" style="text-transform: uppercase;">${
											field.label
										}</div>
                    <div class="signage-value" ${dataIdAttribute}>${
				field.value
			}</div>
                </div>
            `;
		})
		.join('');

	const titleSection = getTitleSectionHTML(sign);
	let previewHtml = '';

	if (sign.type === 'letter') {
		previewHtml = `LETTER`;
	}

	return `${titleSection}${previewHtml}${htmlDetails}`;
}

function allAttributes(sign) {
	return [
		{ label: 'CAD PRICE', value: sign.cadPrice ? sign.cadPrice : '0' },
		{ label: 'MATERIAL', value: sign.material ? sign.material : '' },
		{ label: 'PRODUCT LINE', value: sign.productLine ? sign.productLine : '' },
		{ label: 'TYPE', value: sign.type },
		{ label: 'TEXT', value: sign.letters },
		{
			label: 'MATERIAL',
			value: sign.etchedMaterial ? sign.etchedMaterial : '',
		},
		{
			label: 'WIDTH',
			value: sign.etchedWidth ? sign.etchedWidth : '',
		},
		{
			label: 'HEIGHT',
			value: sign.etchedHeight ? sign.etchedHeight : '',
		},

		{ label: 'FONT', value: sign.font ? sign.font : '' },
		{
			label: 'VIEW CUSTOM FONT',
			value: sign.fontFileName
				? `<a href="${sign.fontFileUrl}" target="_blank">${sign.fontFileName}</a>`
				: '',
		},
		{ label: 'FILE PATH', value: sign.filePath ? sign.filePath : '' },
		{
			label: 'FONT FILE PATH',
			value: sign.fontFilePath ? sign.fontFilePath : '',
		},

		{ label: 'METAL', value: sign.metal ? sign.metal : '' },

		{
			label: 'THICKNESS',
			value: sign.thickness?.thickness ? sign.thickness.thickness : '',
		},

		{
			label: 'METAL DEPTH',
			value: sign.metalDepth?.thickness ? sign.metalDepth.thickness : '',
		},

		{
			label: 'ACRYLIC THICKNESS',
			value: sign.acrylicThickness?.thickness
				? sign.acrylicThickness.thickness
				: '',
		},

		{
			label: 'ACRYLIC THICKNESS',
			value: sign.acrylicChannelThickness ? sign.acrylicChannelThickness : '',
		},

		{
			label: 'METAL THICKNESS',
			value: sign.metalThickness?.thickness
				? sign.metalThickness.thickness
				: '',
		},

		{ label: 'METAL DEPTH', value: sign.depth?.depth ? sign.depth.depth : '' },

		{
			label: 'LETTER HEIGHT',
			value: sign.letterHeight ? sign.letterHeight + '"' : '',
		},

		{
			label: 'RETURN',
			value: sign.acrylicReturn ? sign.acrylicReturn + '"' : '',
		},

		{ label: 'LOGO WIDTH', value: sign.width ? sign.width + '"' : '' },
		{ label: 'LOGO HEIGHT', value: sign.height ? sign.height + '"' : '' },

		{
			label: 'FRONT OPTION',
			value: sign.frontOption ? sign.frontOption + '"' : '',
		},

		{
			label: 'PAINT COLOR',
			value: sign.paintColor ? sign.paintColor + '"' : '',
		},

		{
			label: 'ACRYLIC FRONT',
			value: sign.acrylicFront ? sign.acrylicFront : '',
		},

		{
			label: 'FINISHING',
			value: sign.backLitFinishing ? sign.backLitFinishing : '',
		},

		{
			label: 'METAL FINISH',
			value: sign.backLitMetalFinish ? sign.backLitMetalFinish : '',
		},

		{
			label: 'FACE & RETURN COLOR',
			value: sign.faceReturnColor?.name ? sign.faceReturnColor.name : '',
		},

		{
			label: 'NEON SIGN WIDTH',
			value: sign.neonSignWidth ? sign.neonSignWidth : '',
		},
		{
			label: 'NEON SIGN HEIGHT',
			value: sign.neonSignHeight ? sign.neonSignHeight : '',
		},
		{ label: 'NEON USED(ft)', value: sign.neonUsed ? sign.neonUsed : '' },
		{
			label: 'NEON THICKNESS',
			value: sign.neonThickness ? sign.neonThickness : '',
		},
		{
			label: 'NEON LENGTH(ft)',
			value: sign.neonLength ? sign.neonLength : '',
		},

		{
			label: 'ENVIRONMENT',
			value: sign.rigidWaterproof ? sign.rigidWaterproof : '',
		},

		{ label: 'NEON COLORS', value: sign.neonColor ? sign.neonColor : '' },

		{
			label: '8mm NEON LENGTH',
			value: sign.neonLength8mm ? sign.neonLength8mm : '',
		},
		{
			label: '10mm NEON LENGTH',
			value: sign.neonLength10mm ? sign.neonLength10mm : '',
		},
		{
			label: '14mm NEON LENGTH',
			value: sign.neonLength14mm ? sign.neonLength14mm : '',
		},
		{
			label: '20mm NEON LENGTH',
			value: sign.neonLength20mm ? sign.neonLength20mm : '',
		},

		{ label: 'FINISHING', value: sign.metalFinish ? sign.metalFinish : '' },

		{
			label: 'METAL FINISH',
			value: sign.stainLessMetalFinish ? sign.stainLessMetalFinish : '',
		},

		{
			label: 'STEEL POLISH',
			value: sign.stainlessSteelPolished ? sign.stainlessSteelPolished : '',
		},

		{ label: 'LAYERS', value: sign.layers ? sign.layers : '' },

		{
			label: 'METAL LAMINATE',
			value: sign.metalLaminate ? sign.metalLaminate : '',
		},

		{
			label: 'PVC BASE COLOR',
			value: sign.pvcBaseColor?.name ? sign.pvcBaseColor?.name : '',
		},

		{
			label: 'ACRYLIC BASE',
			value:
				typeof sign.acrylicBase === 'object' && sign.acrylicBase !== null
					? sign.acrylicBase.name
					: sign.acrylicBase,
		},

		{
			label: 'PRINT PREFERENCE',
			value: sign.printPreference ? sign.printPreference : '',
		},

		{ label: 'COLOR', value: sign.color?.name ? sign.color.name : '' },

		{
			label: 'RETURN COLOR',
			value: sign.returnColor?.name ? sign.returnColor.name : '',
		},

		{ label: 'CUSTOM COLOR', value: sign.customColor ? sign.customColor : '' },

		{ label: 'FINISHING', value: sign.finishing ? sign.finishing : '' },

		{
			label: 'ALUMINUM FINISHING',
			value: sign.aluminumFinishing ? sign.aluminumFinishing : '',
		},

		{
			label: 'ANODIZED FINISHING',
			value: sign.anodizedFinishing ? sign.anodizedFinishing : '',
		},

		{
			label: 'ANODIZED COLOR',
			value: sign.anodizedColor ? sign.anodizedColor : '',
		},

		{
			label: 'COLOR',
			value: sign.metalColor?.name ? sign.metalColor.name : '',
		},

		{
			label: 'CUSTOM COLOR',
			value: sign.metalCustomColor ? sign.metalCustomColor : '',
		},

		{
			label: 'RETURN PAINT COLOR',
			value: sign.returnPaintColor ? sign.returnPaintColor : '',
		},

		{
			label: 'ACRYLIC REVEAL',
			value: sign.acrylicReveal ? sign.acrylicReveal : '',
		},

		{
			label: 'FRONT ACRYLIC COVER',
			value: sign.frontAcrylicCover ? sign.frontAcrylicCover : '',
		},

		{
			label: '3M 3630 VINYL',
			value: sign.vinylWhite?.name
				? sign.vinylWhite?.name +
				  (sign.vinylWhite?.code ? '-[' + sign.vinylWhite?.code + ']' : '')
				: '',
		},

		{
			label: '3M 3635 VINYL',
			value: sign.vinyl3635 ? sign.vinyl3635 : '',
		},

		{
			label: 'FRONT &amp; BACK VINYL',
			value: sign.frontBackVinyl ? sign.frontBackVinyl : '',
		},

		{
			label: 'RETURN PAINT COLOR',
			value: sign.acrylicReturnPaintColor ? sign.acrylicReturnPaintColor : '',
		},

		{
			label: 'LED LIGHT COLOR',
			value: sign.ledLightColor ? sign.ledLightColor : '',
		},

		{
			label: 'BACKING',
			value: sign.acrylicBackingOption ? sign.acrylicBackingOption : '',
		},

		{
			label: 'BACKING',
			value: sign.rigidBacking ? sign.rigidBacking : '',
		},

		{
			label: 'PAINTED PC COLOR',
			value: sign.paintedPCColor ? sign.paintedPCColor : '',
		},

		{
			label: 'PC CUSTOM COLOR',
			value: sign.pcCustomColor ? sign.pcCustomColor : '',
		},

		{ label: 'BASE COLOR', value: sign.baseColor ? sign.baseColor : '' },

		{
			label: 'BASE CUSTOM COLOR',
			value: sign.baseCustomColor ? sign.baseCustomColor : '',
		},

		{
			label: 'PAINTED PC FINISH',
			value: sign.paintedPCFinish ? sign.paintedPCFinish : '',
		},

		{
			label: 'LIGHT BOX TYPE',
			value: sign.lightboxType ? sign.lightboxType : '',
		},
		{
			label: 'UV PRINTED COVER',
			value: sign.uvPrintedCover ? sign.uvPrintedCover : '',
		},

		{ label: 'ENVIRONMENT', value: sign.waterproof ? sign.waterproof : '' },

		{ label: 'BACK OPTION', value: sign.backOption ? sign.backOption : '' },

		{ label: 'MOUNTING', value: sign.mounting ? sign.mounting : '' },

		{
			label: 'M4 STUD LENGTH',
			value: sign.rigidM4StudLength ? sign.rigidM4StudLength : '',
		},

		{
			label: 'METAL FINISHING',
			value: sign.metalFinishing ? sign.metalFinishing : '',
		},

		{ label: 'STUD LENGTH', value: sign.studLength ? sign.studLength : '' },
		{
			label: 'STANDOFF SPACE',
			value: sign.spacerStandoffDistance ? sign.spacerStandoffDistance : '',
		},

		{
			label: 'ENVIRONMENT',

			value: sign.trimLessWaterproof ? sign.trimLessWaterproof : '',
		},
		{
			label: 'INCLUDED ITEMS',
			value: sign.lightingPackaged ? sign.lightingPackaged : '',
		},
		{
			label: 'INCLUDED ITEMS',
			value: sign.includedItems ? sign.includedItems : '',
		},

		{
			label: 'REMOTE CONTROL',
			value: sign.remoteControl ? sign.remoteControl : '',
		},
		{
			label: 'WIRE EXIT LOCATION',
			value: sign.wireExitLocation ? sign.wireExitLocation : '',
		},
		{
			label: 'WIRE TYPE',
			value: sign.wireType ? sign.wireType : '',
		},

		{
			label: 'INSTALLATION',
			value: sign.installation ? sign.installation : '',
		},

		{ label: 'PIECES/CUTOUTS', value: sign.pieces ? sign.pieces : '' },

		{ label: 'QUANTITY', value: sign.sets ? sign.sets : '' },
		{ label: 'COMMENTS', value: sign.comments ? sign.comments : '' },
		{ label: 'DESCRIPTION', value: sign.description ? sign.description : '' },

		{
			label: 'File Paths',
			value:
				sign.filePaths?.length > 0
					? sign.filePaths
							.map(
								(filename, index) =>
									`<a href="${sign.fileUrls[index]}" target="_blank" style="display: block;">${filename}</a>`
							)
							.join('')
					: '',
		},
		{
			label: 'Files',
			value:
				sign.fileNames?.length > 0
					? sign.fileNames
							.map(
								(filename, index) =>
									`<a href="${sign.fileUrls[index]}" target="_blank">${filename}</a>`
							)
							.join(', ')
					: '',
		},
	].filter((field) => field.value);
}

function getTitleSectionHTML(sign) {
	const priceSection = `$<span id="priceDisplay_${sign.id}">${sign.usdPrice}</span>`;
	const editButtonHTML = `<div class="button" data-edit="${sign.id}" onclick="toggleEditPriceVisibility('${sign.id}');" step="0.01">Edit Price</div>`;

	return `
        <h3 style="text-transform: uppercase;">
            ${sign.title} ----- ${priceSection}
            ${editButtonHTML}
            <input type="number" id="priceInput_${sign.id}" data-edit="${sign.id}" style="display: none;" value="${sign.usdPrice}" step="0.01"/>
        </h3>
    `;
}

function toggleEditPriceVisibility(signId) {
	const priceDisplay = document.getElementById(`priceDisplay_${signId}`);
	const priceInput = document.getElementById(`priceInput_${signId}`);
	const editButton = document.querySelector(`[data-edit="${signId}"]`);

	priceDisplay.style.display = 'none';
	priceInput.style.display = 'inline';
	editButton.style.display = 'none';
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		displayQuoteDetails();
	});
} else {
	displayQuoteDetails();
}
