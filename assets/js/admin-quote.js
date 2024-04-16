let signage = JSON.parse(QuoteAdmin.signage);
const signageInput = document.querySelector('[data-name="signage"] input');
const cadPrice = document.getElementById('cadPrice');
const finalPriceInput = document.querySelector(
	'[data-name="final_price"] input'
);
const exchangeRate = 1.3;

async function updateDropboxFolder() {
	const updateDropboxFolderButtons = document.querySelectorAll(
		'a[data-btn="updateDropbox"]'
	);

	updateDropboxFolderButtons.forEach((button) => {
		button.addEventListener('click', async (e) => {
			e.preventDefault();

			button.textContent = 'Please wait'; // Change text content of each button
			// Disable all buttons and change text to "Please wait"
			updateDropboxFolderButtons.forEach((btn) => {
				btn.disabled = true;
			});

			const oldPath = button.dataset.old;
			const newPath = button.dataset.new;
			const postID = button.dataset.id;
			console.log(oldPath, newPath);

			try {
				const status = await renameDropboxFolder(oldPath, newPath);

				if (status) {
					const formData = new FormData();
					formData.append('action', 'update_signage');
					formData.append('nonce', QuoteAdmin.nonce);
					formData.append('old_path', oldPath);
					formData.append('new_path', newPath);
					formData.append('post_id', postID);
					formData.append('signage', QuoteAdmin.signage);

					const response = await fetch(QuoteAdmin.ajax_url, {
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Cache-Control': 'no-cache',
						},
						body: formData,
					});
					const data = await response.json();
					console.log(data);
					if (data.code == 2) {
						location.reload(); // Uncomment to reload the page if needed
					}
				}
			} catch (error) {
				console.error('Error:', error);
			} finally {
				// Re-enable all buttons and restore original text after operation
				updateDropboxFolderButtons.forEach((btn) => {
					btn.disabled = false;
					btn.textContent = 'Update Dropbox'; // Change back to original text or relevant text
				});
			}
		});
	});
}

async function renameDropboxFolder(oldPath, newPath) {
	const getRefreshToken = async () => {
		const clientId = QuoteAdmin.dropbox_app_key;
		const clientSecret = QuoteAdmin.dropbox_secret;
		const refreshToken = QuoteAdmin.dropbox_refresh_token;

		const url = 'https://api.dropboxapi.com/oauth2/token';
		const params = new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: clientId,
			client_secret: clientSecret,
		});

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: params,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			if (!response.ok) {
				const error = await response.text();
				console.error('Error getting access token:', error);
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			return data.access_token;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	};

	const accessToken = await getRefreshToken();
	if (!accessToken) {
		console.error('Failed to get access token');
		return false; // indicate failure
	}

	const moveUrl = 'https://api.dropboxapi.com/2/files/move_v2';
	const moveParams = JSON.stringify({
		from_path: oldPath,
		to_path: newPath,
		autorename: true,
	});

	try {
		const moveResponse = await fetch(moveUrl, {
			method: 'POST',
			body: moveParams,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!moveResponse.ok) {
			const error = await moveResponse.text(); // Get the text of the error response
			console.error('Failed to move folder. Response:', error);
			throw new Error('Failed to move folder');
		}

		const moveData = await moveResponse.json();
		console.log('Folder moved successfully:', moveData);
		return true; // indicate success
	} catch (error) {
		console.error('Error moving folder:', error);
		return false; // indicate failure
	}
}

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

					console.log(newPrice);

					const newCadPrice = convertToCAD(newPrice, exchangeRate).toFixed(2);

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

function getSignageDetailFields(sign) {
	return [
		{ label: 'CAD PRICE', value: sign.cadPrice ? sign.cadPrice : '0' },
		{ label: 'TYPE', value: sign.type },
		{ label: 'LINE TEXT', value: sign.letters },
		{ label: 'LAYERS', value: sign.layers },
		{
			label: 'Letter Height',
			value: sign.letterHeight ? sign.letterHeight + '"' : '',
		},
		{ label: 'THICKNESS', value: sign.thickness?.thickness },
		{ label: 'METAL DEPTH', value: sign.depth?.depth },
		{ label: 'WIDTH', value: sign.width ? sign.width + '"' : '' },
		{ label: 'HEIGHT', value: sign.height ? sign.height + '"' : '' },
		{ label: 'MOUNTING', value: sign.mounting },
		{ label: 'ENVIRONMENT', value: sign.waterproof },
		{ label: 'COLOR', value: sign.color?.name },
		{ label: 'ACRYLIC COVER', value: sign.acrylicCover?.name },
		{ label: '3M 360 VINYL', value: sign.vinylWhite?.name },
		{ label: 'FRONT ACRYLIC COVER', value: sign.frontAcrylicCover },
		{ label: 'LED LIGHT COLOR', value: sign.ledLightColor },
		{ label: 'BASE COLOR', value: sign.baseColor },
		{ label: 'PVC BASE COLOR', value: sign.pvcBaseColor?.name },
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
		{ label: 'STUD LENGTH', value: sign.studLength },
		{ label: 'SPACER STANDOFF DISTANCE', value: sign.spacerStandoffDistance },
		{ label: 'PRINT PREFERENCE', value: sign.printPreference },
		{ label: 'FINISHING', value: sign.finishing },
		{ label: 'INSTALLATION', value: sign.installation },
		{ label: 'ACRYLIC REVEAL', value: sign.acrylicReveal },
		{ label: 'FONT', value: sign.font },
		{ label: 'PIECES/CUTOUTS', value: sign.pieces },
		{ label: 'QUANTITY', value: sign.sets },
		{ label: 'COMMENTS', value: sign.comments },
		{ label: 'DESCRIPTION', value: sign.description },
		{ label: 'FILE PATH', value: sign.filePath },
		{ label: 'FONT FILE PATH', value: sign.fontFilePath },
		{
			label: 'VIEW CUSTOM FONT',
			value: sign.fontFileName
				? `<a href="${sign.fontFileUrl}" target="_blank">${sign.fontFileName}</a>`
				: '',
		},
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
		updateDropboxFolder();
	});
} else {
	displayQuoteDetails();
	updateDropboxFolder();
}
