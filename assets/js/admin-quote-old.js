function display_quote_details() {
	const signage = JSON.parse(QuoteAdmin.signage);
	const exchangeRate = 1.3;
	const cadPrice = document.getElementById('cadPrice');
	const finalPrice = document.querySelector('#finalPrice input');

	const usdPrice = finalPrice.value;

	cadPrice.innerHTML = (
		parseFloat(usdPrice) * parseFloat(exchangeRate)
	).toFixed(2);

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	finalPrice.addEventListener('change', (e) => {
		cadPrice.innerHTML = (
			parseFloat(e.target.value) * parseFloat(exchangeRate)
		).toFixed(2);
	});

	let priceDisplay = `<h2>Price: TBD</h2>`;

	if (totalUsdPrice) {
		priceDisplay = `<h2>Price: $${totalUsdPrice.toFixed(2)}</h2>`;
	}

	const container = document.getElementById('novaquote');

	const totalPrice = document.createElement('div');
	totalPrice.className = 'total-signage-price';
	totalPrice.innerHTML = priceDisplay;
	container.appendChild(totalPrice);

	signage.forEach((sign) => {
		let html = '';
		html = displaySignage(sign);
		const tempDiv = document.createElement('div');
		tempDiv.className = 'signage-item';
		tempDiv.innerHTML = html;
		container.appendChild(tempDiv); // Append the entire div
	});
}

function displaySignage(sign) {
	const details = [
		{ label: 'TYPE', value: sign.type },
		{ label: 'LINE TEXT', value: sign.letters },
		{
			label: 'LETTERS HEIGHT',
			value: sign.letterHeight ? sign.letterHeight + '"' : '',
		},
		{ label: 'THICKNESS', value: sign.thickness?.thickness },
		{ label: 'WIDTH', value: sign.width ? sign.width + '"' : '' },
		{ label: 'HEIGHT', value: sign.height ? sign.height + '"' : '' },
		{ label: 'MOUNTING', value: sign.mounting },
		{ label: 'ENVIRONMENT', value: sign.waterproof },
		{ label: 'COLOR', value: sign.color?.name },
		{ label: 'BASE COLOR', value: sign.baseColor },
		{ label: 'PRINT PREFERENCE', value: sign.printPreference },
		{ label: 'FINISHING', value: sign.finishing },
		{ label: 'FONT', value: sign.font },
		{ label: 'PIECES/CUTOUTS', value: sign.pieces },
		{ label: 'COMMENTS', value: sign.comments },
		{ label: 'DESCRIPTION', value: sign.description },
		{ label: 'FILE PATH', value: sign.filePath },
		{
			label: 'View File',
			value: sign.fileName
				? `<a href="${sign.fileUrl}" target="_blank">${sign.fileName}</a>`
				: '',
		},
	];

	const htmlDetails = details
		.filter((detail) => detail.value) // Only include details with a value
		.map((detail) => {
			const descriptClass = detail.label === 'DESCRIPTION' ? 'description' : '';
			return `
            <div class="signage-details ${descriptClass}">
                <div class="signage-label">${detail.label}</div>
                <div class="signage-value">${detail.value}</div>
            </div>
        `;
		})
		.join(''); // Combine all detail strings into one HTML string

	let htmlTitle = `<h3 style="text-transform: uppercase;">${sign.title}</h3>`;

	if (sign.usdPrice) {
		htmlTitle = `<h3 style="text-transform: uppercase;">${sign.title} ----- $${sign.usdPrice}</h3>`;
	}

	const html = `
        ${htmlTitle}
        ${htmlDetails}
    `;

	return html;
}

function displayLetters(sign) {
	const details = [
		{ label: 'THICKNESS', value: sign.thickness?.thickness + '"' },
		{ label: 'LETTERS HEIGHT', value: sign.letterHeight + '"' },
		{ label: 'MOUNTING', value: sign.mounting },
		{ label: 'ENVIRONMENT', value: sign.waterproof },
		{ label: 'COLOR', value: sign.color?.name },
		{ label: 'FINISHING', value: sign.finishing },
		{ label: 'FONT', value: sign.font },
		{ label: 'LINE TEXT', value: sign.letters },
		{ label: 'COMMENTS', value: sign.comments },
		{ label: 'DESCRIPTION', value: sign.description },
		{ label: 'FILE PATH', value: sign.filePath },
		{
			label: 'View File',
			value: sign.fileName
				? `<a href="${sign.fileUrl}" target="_blank">${sign.fileName}</a>`
				: '',
		},
	];

	const htmlDetails = details
		.filter((detail) => detail.value)
		.map(
			(detail) => `
            <div class="signage-details">
                <div class="signage-label">${detail.label}</div>
                <div class="signage-value">${detail.value}</div>
            </div>
        `
		)
		.join(''); // Join all detail strings into one HTML string

	const html = `
        <h3>${sign.title} ----- $${sign.usdPrice}</h3>
        ${htmlDetails}
    `;

	return html;
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', display_quote_details);
} else {
	// `DOMContentLoaded` has already fired
	display_quote_details();
}
