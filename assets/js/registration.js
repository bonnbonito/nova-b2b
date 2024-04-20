const US_STATES = {
	AL: 'Alabama',
	AK: 'Alaska',
	AS: 'American Samoa',
	AZ: 'Arizona',
	AR: 'Arkansas',
	CA: 'California',
	CO: 'Colorado',
	CT: 'Connecticut',
	DE: 'Delaware',
	DC: 'District Of Columbia',
	FM: 'Federated States Of Micronesia',
	FL: 'Florida',
	GA: 'Georgia',
	GU: 'Guam',
	HI: 'Hawaii',
	ID: 'Idaho',
	IL: 'Illinois',
	IN: 'Indiana',
	IA: 'Iowa',
	KS: 'Kansas',
	KY: 'Kentucky',
	LA: 'Louisiana',
	ME: 'Maine',
	MH: 'Marshall Islands',
	MD: 'Maryland',
	MA: 'Massachusetts',
	MI: 'Michigan',
	MN: 'Minnesota',
	MS: 'Mississippi',
	MO: 'Missouri',
	MT: 'Montana',
	NE: 'Nebraska',
	NV: 'Nevada',
	NH: 'New Hampshire',
	NJ: 'New Jersey',
	NM: 'New Mexico',
	NY: 'New York',
	NC: 'North Carolina',
	ND: 'North Dakota',
	MP: 'Northern Mariana Islands',
	OH: 'Ohio',
	OK: 'Oklahoma',
	OR: 'Oregon',
	PW: 'Palau',
	PA: 'Pennsylvania',
	PR: 'Puerto Rico',
	RI: 'Rhode Island',
	SC: 'South Carolina',
	SD: 'South Dakota',
	TN: 'Tennessee',
	TX: 'Texas',
	UT: 'Utah',
	VT: 'Vermont',
	VI: 'Virgin Islands',
	VA: 'Virginia',
	WA: 'Washington',
	WV: 'West Virginia',
	WI: 'Wisconsin',
	WY: 'Wyoming',
};

const CAD_STATES = {
	AB: 'Alberta',
	BC: 'British Columbia',
	MB: 'Manitoba',
	NB: 'New Brunswick',
	NL: 'Newfoundland and Labrador',
	NS: 'Nova Scotia',
	NT: 'Northwest Territories',
	NU: 'Nunavut',
	ON: 'Ontario',
	PE: 'Prince Edward Island',
	QC: 'Québec',
	SK: 'Saskatchewan',
	YT: 'Yukon',
};

function novaRegistration() {
	const novaSignUpForm = document.getElementById('novaSignUpForm');
	const submitBtn = document.getElementById('submitBtn');

	const country = document.getElementById('country');
	const state = document.getElementById('state');
	const pstField = document.getElementById('pstField');
	const postInput = pstField.querySelector('input');
	const taxField = document.getElementById('taxField');
	const taxFieldInput = taxField.querySelector('input');
	const referralField = document.getElementById('referralField');
	const referredBy = document.getElementById('referredBy');
	const referral = document.getElementById('referral');

	referral.addEventListener('change', (e) => {
		if (referral.checked) {
			referralField.style.display = 'flex';
		} else {
			referralField.style.display = 'none';
			referredBy.value = '';
		}
	});

	country.addEventListener('change', (e) => {
		while (state.options.length > 0) {
			state.remove(0);
		}

		const defaultOption = document.createElement('option');
		defaultOption.text = 'Select State';
		defaultOption.value = '';
		state.appendChild(defaultOption);

		if (e.target.value === 'US') {
			for (const stateCode in US_STATES) {
				const option = document.createElement('option');
				option.value = stateCode;
				option.text = US_STATES[stateCode];
				state.appendChild(option);
			}
			taxField.classList.add('hidden');
			taxFieldInput.removeAttribute('disabled');
		} else if (e.target.value === 'CA') {
			for (const provinceCode in CAD_STATES) {
				const option = document.createElement('option');
				option.value = provinceCode;
				option.text = CAD_STATES[provinceCode];
				state.appendChild(option);
			}

			taxField.classList.remove('hidden');
			taxFieldInput.setAttribute('required', true);
		}
		// You can continue to add similar logic for other countries if needed
	});

	state.addEventListener('change', (e) => {
		const target = e.target.value;
		if (target === 'BC') {
			pstField.classList.remove('hidden');
			postInput.setAttribute('required', true);
		} else {
			pstField.classList.add('hidden');
			postInput.removeAttribute('required');
		}
	});

	novaSignUpForm.addEventListener('submit', function (event) {
		event.preventDefault();

		submitBtn.classList.add('cursor-not-allowed', 'flex', 'justify-center');
		submitBtn.setAttribute('disabled', '');
		submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Please wait...`;

		// Validate form data here

		let formData = new FormData(this);

		formData.append('nonce', NovaSignUp.nonce);

		console.log(formData);

		fetch(NovaSignUp.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Cache-Control': 'no-cache',
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.code == 2) {
					let formData = new FormData();
					formData.append('action', 'send_activation');
					formData.append('email', data.result.email);
					formData.append('first_name', data.result.first_name);
					formData.append('nonce', NovaSignUp.nonce);
					formData.append('business_id', data.result.business_id);

					window.location.href =
						NovaSignUp.success_url + '/?user_id=' + data.result.user_id;
				} else {
					alert(data.error);
				}
				submitBtn.classList.remove(
					'cursor-not-allowed',
					'flex',
					'justify-center'
				);
				submitBtn.removeAttribute('disabled');
				submitBtn.innerHTML = `Submit Application`;
			})
			.catch((error) => console.error('Error:', error));
	});
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', novaRegistration);
} else {
	// `DOMContentLoaded` has already fired
	novaRegistration();
}
