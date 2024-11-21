document.addEventListener('DOMContentLoaded', function () {
	const reviewForm = document.getElementById('review-form');
	const approveRadios = document.querySelectorAll('input[name="approve"]');
	const revisionWrapper = document.getElementById('revision-wrapper');
	const revisionNotes = document.getElementById('revision_notes');

	// Show or hide the revision notes based on selected option
	approveRadios.forEach(function (radio) {
		radio.addEventListener('change', function () {
			if (this.value === 'revision') {
				revisionWrapper.style.display = 'block';
			} else {
				revisionWrapper.style.display = 'none';
				revisionNotes.value = ''; // Clear the notes if "I approve" is selected
			}
		});
	});

	// Form submission via AJAX using fetch
	reviewForm.addEventListener('submit', function (event) {
		event.preventDefault();

		// Validate that a radio option is selected
		const selectedOptionElement = document.querySelector(
			'input[name="approve"]:checked'
		);
		const selectedOption = selectedOptionElement
			? selectedOptionElement.value
			: null;

		if (!selectedOption) {
			alert('Please select an option before submitting.');
			return;
		}

		// If "Need revision" is selected, ensure that revision notes are provided
		if (selectedOption === 'revision' && revisionNotes.value.trim() === '') {
			alert('Please provide revision notes.');
			return;
		}

		// Disable the submit button to prevent multiple submissions
		const submitButton = reviewForm.querySelector('button[type="submit"]');
		submitButton.disabled = true;

		// Collect form data
		const formData = new FormData(reviewForm);
		formData.append('nonce', order_approve_ajax.nonce);

		console.log(formData);

		// Send AJAX request using fetch
		fetch(order_approve_ajax.ajax_url, {
			method: 'POST',
			body: formData,
			credentials: 'same-origin',
		})
			.then((response) => {
				submitButton.disabled = false;

				if (!response.ok) {
					throw new Error(
						'Network response was not ok: ' + response.statusText
					);
				}

				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (data.success) {
					alert('Your response has been submitted successfully.');
					// Optionally reset the form or redirect the user
					reviewForm.reset();
					revisionWrapper.style.display = 'none';
				} else {
					alert('An error occurred: ' + data.data);
				}
			})
			.catch((error) => {
				submitButton.disabled = false;
				alert('An AJAX error occurred: ' + error.message);
			});
	});
});
