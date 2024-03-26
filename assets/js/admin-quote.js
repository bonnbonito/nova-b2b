let signage = JSON.parse(QuoteAdmin.signage);
const signageInput = document.querySelector('[data-name="signage"] input');
const cadPrice = document.getElementById('cadPrice');
const finalPriceInput = document.querySelector(
	'[data-name="final_price"] input'
);
const exchangeRate = 1.3;

function displayQuoteDetails() {
	// Initialize and display the CAD price based on the USD price
	updateCADPriceFromUSD(exchangeRate);

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
	const cadPriceDisplay = convertToCAD(totalUsdPrice, exchangeRate).toFixed(2);

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
					const newCadPrice = convertToCAD(newPrice, exchangeRate).toFixed(2);
					signage[signIndex].cadPrice = newCadPrice;
					// Update the displayed price
					document.getElementById(`priceDisplay_${sign.id}`).textContent =
						newPrice;

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
						? `$${convertToCAD(totalUsdPrice, exchangeRate).toFixed(2)}`
						: 'TBD';

					document.getElementById('totalComputed').textContent = priceDisplay;
					document.getElementById('totalCadComputed').textContent =
						cadPriceDisplay;

					console.log(signage);

					finalPriceInput.value = totalUsdPrice.toFixed(2);
					signageInput.value = JSON.stringify(signage);
					cadPrice.textContent = convertToCAD(
						totalUsdPrice,
						exchangeRate
					).toFixed(2);
				}
			}
		},
		true
	); // Use capture phase to ensure the blur event is captured
}

function getSignageItemHTML(sign) {
	const detailFields = getSignageDetailFields(sign);
	const htmlDetails = detailFields
		.map((field) => {
			// Check if the current field is "CAD PRICE" to conditionally add the data-id attribute
			const dataIdAttribute =
				field.label === 'CAD PRICE' ? `data-id="${sign.id}"` : '';
			return `
                <div class="signage-details ${
									field.descriptClass ? field.descriptClass : ''
								}">
                    <div class="signage-label">${field.label}</div>
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

function getSignageDetailFields(sign) {
	return [
		{ label: 'CAD PRICE', value: sign.cadPrice },
		{ label: 'TYPE', value: sign.type },
		{ label: 'LINE TEXT', value: sign.letters },
		{
			label: 'Letter Height',
			value: sign.letterHeight ? sign.letterHeight + '"' : '',
		},
		{ label: 'THICKNESS', value: sign.thickness?.thickness },
		{ label: 'WIDTH', value: sign.width ? sign.width + '"' : '' },
		{ label: 'HEIGHT', value: sign.height ? sign.height + '"' : '' },
		{ label: 'MOUNTING', value: sign.mounting },
		{ label: 'ENVIRONMENT', value: sign.waterproof },
		{ label: 'COLOR', value: sign.color?.name },
		{ label: 'CUSTOM COLOR', value: sign.customColor },
		{ label: 'METAL', value: sign.metal },
		{
			label: 'METAL FINISH',
			value:
				typeof sign.metalFinish === 'object' && sign.metalFinish !== null
					? sign.metalFinish.name
					: sign.metalFinish,
		},
		{
			label: 'ACRYLIC BASE',
			value:
				typeof sign.acrylicBase === 'object' && sign.acrylicBase !== null
					? sign.acrylicBase.name
					: sign.acrylicBase,
		},
		{ label: 'METAL FINISHING', value: sign.metalFinishing },
		{ label: 'STEEL POLISHED', value: sign.stainlessSteelPolished },
		{ label: 'BASE COLOR', value: sign.baseColor },
		{ label: 'PRINT PREFERENCE', value: sign.printPreference },
		{ label: 'FINISHING', value: sign.finishing },
		{ label: 'INSTALLATION', value: sign.installation },
		{ label: 'FONT', value: sign.font },
		{ label: 'PIECES/CUTOUTS', value: sign.pieces },
		{ label: 'COMMENTS', value: sign.comments },
		{ label: 'DESCRIPTION', value: sign.description },
		{ label: 'FILE PATH', value: sign.filePath },
		{ label: 'FONT FILE PATH', value: sign.fontFilePath },
		{
			label: 'View File',
			value: sign.fontFileName
				? `<a href="${sign.fontFileUrl}" target="_blank">${sign.fontFileName}</a>`
				: '',
		},
	].filter((field) => field.value);
}

function getTitleSectionHTML(sign) {
	const priceSection = sign.usdPrice
		? `$<span id="priceDisplay_${sign.id}">${sign.usdPrice}</span>`
		: '';
	const editButtonHTML = `<div class="button" data-edit="${sign.id}" onclick="toggleEditPriceVisibility('${sign.id}');">Edit Price</div>`;

	return `
        <h3 style="text-transform: uppercase;">
            ${sign.title} ----- ${priceSection}
            ${editButtonHTML}
            <input type="number" id="priceInput_${sign.id}" data-edit="${sign.id}" style="display: none;" value="${sign.usdPrice}" />
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
	document.addEventListener('DOMContentLoaded', displayQuoteDetails);
} else {
	displayQuoteDetails();
}
