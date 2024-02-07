function display_quote_details() {
	const signage = JSON.parse(QuoteAdmin.signage);

	const totalUsdPrice = signage.reduce(
		(acc, item) => acc + parseFloat(item.usdPrice),
		0
	);

	const container = document.getElementById('novaquote');

	const totalPrice = document.createElement('div');
	totalPrice.className = 'total-signage-price';
	totalPrice.innerHTML = `<h2>Price: $${totalUsdPrice.toFixed(2)}</h2>`;
	container.appendChild(totalPrice);

	signage.forEach((sign) => {
		let html = '';
		if (sign.type === 'letters') {
			html = displayLetters(sign);
		} else {
			html = displayLogo(sign);
		}
		const tempDiv = document.createElement('div');
		tempDiv.className = 'signage-item';
		tempDiv.innerHTML = html;
		container.appendChild(tempDiv); // Append the entire div
	});
}

function displayLogo(sign) {
	const html = `
        <h3 style="text-transform: uppercase;">${sign.title} ----- $${sign.usdPrice}</h3>
        <div class="signage-details">
            <div class="signage-label">THICKNESS</div>
            <div class="signage-value">${sign.thickness.thickness}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">WIDTH</div>
            <div class="signage-value">${sign.width}"</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">HEIGHT</div>
            <div class="signage-value">${sign.height}"</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">MOUNTING</div>
            <div class="signage-value">${sign.mounting}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">WATERPROOF</div>
            <div class="signage-value">${sign.waterproof}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">COLOR</div>
            <div class="signage-value">${sign.color?.name}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">FINISHING</div>
            <div class="signage-value">${sign.finishing}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">COMMENTS</div>
            <div class="signage-value">${sign.comments}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">FILE PATH</div>
            <div class="signage-value">${sign.filePath}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">View File</div>
            <div class="signage-value"><a href="${sign.fileUrl}" target="_blank">${sign.fileName}</a></div>
        </div>
    `;

	return html;
}

function displayLetters(sign) {
	const html = `
        <h3>${sign.title} ----- $${sign.usdPrice}</h3>
        <div class="signage-details">
            <div class="signage-label">THICKNESS</div>
            <div class="signage-value">${sign.thickness.thickness}"</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">LETTER HEIGHT</div>
            <div class="signage-value">${sign.letterHeight}"</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">MOUNTING</div>
            <div class="signage-value">${sign.mounting}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">WATERPROOF</div>
            <div class="signage-value">${sign.waterproof}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">COLOR</div>
            <div class="signage-value">${sign.color.name}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">FINISHING</div>
            <div class="signage-value">${sign.finishing}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">FONT</div>
            <div class="signage-value">${sign.font}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">LINE TEXT</div>
            <div class="signage-value">${sign.letters}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">COMMENTS</div>
            <div class="signage-value">${sign.comments}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">FILE PATH</div>
            <div class="signage-value">${sign.filePath}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">View File</div>
            <div class="signage-value"><a href="${sign.fileUrl}" target="_blank">${sign.fileName}</a></div>
        </div>
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
