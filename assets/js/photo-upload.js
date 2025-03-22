document.addEventListener('DOMContentLoaded', function () {
	const video = document.getElementById('video');
	const canvas = document.getElementById('canvas');
	const photo = document.getElementById('photo');
	const openCameraButton = document.getElementById('open-camera');
	const closeCameraButton = document.getElementById('close-camera');
	const captureButton = document.getElementById('take-photo');
	const statusText = document.getElementById('status');
	const cameraModal = document.getElementById('camera-modal');
	const photoPreview = document.getElementById('photo-preview');
	const fileUploadInput = document.getElementById('file-upload');
	const loader = document.getElementById('loader');
	const photoResult = document.getElementById('nova-photo-result');
	const novaSignUpForm = document.getElementById('novaSignUpForm');

	// Set canvas dimensions to match video
	canvas.width = 640;
	canvas.height = 480;

	let stream = null;

	// Handle file upload
	fileUploadInput.addEventListener('change', function (e) {
		const file = e.target.files[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith('image/')) {
			statusText.textContent = 'Please select an image file.';
			return;
		}

		// Validate file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			statusText.textContent = 'File size must be less than 5MB.';
			return;
		}

		const reader = new FileReader();
		reader.onload = async function (e) {
			const imageDataURL = e.target.result;
			photo.src = imageDataURL;
			photoPreview.classList.remove('hidden');
			statusText.textContent = 'Photo uploaded! Processing...';
			await processImage(imageDataURL);
		};
		reader.readAsDataURL(file);
	});

	// Open camera modal
	async function openCameraModal() {
		cameraModal.classList.remove('hidden');
		await startCamera();
	}

	async function processImage(imageDataURL) {
		loader.style.display = 'flex';
		photoResult.innerHTML = '';
		novaSignUpForm.classList.add('loading');
		let formData = new FormData();
		formData.append('file', imageDataURL);
		formData.append('action', 'process_image');
		formData.append('nonce', novaPhotoUpload.nonce);

		try {
			const response = await fetch(novaPhotoUpload.ajax_url, {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();

				// Check if we have valid data
				if (!data.data) {
					throw new Error('Invalid response data');
				}

				let parsedData;
				try {
					console.log(data);
					// First try parsing the data directly
					parsedData =
						typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
				} catch (parseError) {
					// If direct parsing fails, try cleaning the string
					const jsonString = data.data
						.replace(/```json\n?/, '') // Remove opening ```json and optional newline
						.replace(/\n?```$/, '') // Remove closing ``` and optional newline
						.trim();
					parsedData = JSON.parse(jsonString);
				}

				console.log('Parsed data:', parsedData);
				loader.style.display = 'none';

				const businessEmail = document.getElementById('businessEmail');
				const businessName = document.getElementById('businessName');
				const businessPhone = document.getElementById('businessPhone');
				const businessWebsite = document.getElementById('businessWebsite');
				const city = document.getElementById('city');
				const country = document.getElementById('country');
				const firstName = document.getElementById('firstName');
				const lastName = document.getElementById('lastName');
				const state = document.getElementById('state');
				const street = document.getElementById('street');
				const zip = document.getElementById('zip');

				if (businessEmail && parsedData.businessEmail) {
					businessEmail.value = parsedData.businessEmail;
				}
				if (businessName && parsedData.businessName) {
					businessName.value = parsedData.businessName;
				}
				if (businessPhone && parsedData.businessPhone) {
					businessPhone.value = parsedData.businessPhone;
				}
				if (businessWebsite && parsedData.businessWebsite) {
					businessWebsite.value = parsedData.businessWebsite;
				}
				if (city && parsedData.city) {
					city.value = parsedData.city;
				}
				if (country && parsedData.country) {
					country.value = parsedData.country;
					country.dispatchEvent(new Event('change', { bubbles: true }));
				}
				if (firstName && parsedData.firstName) {
					firstName.value = parsedData.firstName;
				}
				if (lastName && parsedData.lastName) {
					lastName.value = parsedData.lastName;
				}
				if (state && parsedData.state) {
					state.value = parsedData.state;
					state.dispatchEvent(new Event('change', { bubbles: true }));
				}
				if (street && parsedData.street) {
					street.value = parsedData.street;
				}
				if (zip && parsedData.zip) {
					zip.value = parsedData.zip;
				}
				photoResult.innerHTML =
					'<p style="text-align: center;">Please double check the details</p>';

				novaSignUpForm.classList.remove('loading');
			}
		} catch (error) {
			console.error('Error processing image:', error);
			loader.style.display = 'none';
			novaSignUpForm.classList.remove('loading');
		}
	}

	// Close camera modal
	function closeCameraModal() {
		cameraModal.classList.add('hidden');
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			stream = null;
		}
	}

	// Start camera function
	async function startCamera() {
		try {
			statusText.textContent = 'Requesting camera access...';
			captureButton.disabled = true;

			// Request camera access with HD resolution
			stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 1920 },
					height: { ideal: 1080 },
					facingMode: 'user',
				},
				audio: false,
			});

			// Connect stream to video element
			video.srcObject = stream;

			// Enable take photo button when camera starts
			video.onloadedmetadata = () => {
				statusText.textContent =
					"Camera ready! Click 'Take Photo' to capture an image.";
				captureButton.disabled = false;
			};

			// Handle camera errors
			video.onerror = (error) => {
				console.error('Video error:', error);
				handleCameraError();
			};
		} catch (error) {
			console.error('Error accessing camera:', error);
			handleCameraError();
		}
	}

	// Handle camera errors
	function handleCameraError() {
		statusText.textContent =
			"Error accessing camera. Please ensure you've granted permission and that your device has a camera.";
		captureButton.disabled = true;
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			stream = null;
		}
	}

	// Take photo function
	async function takePhoto() {
		try {
			// Draw current video frame to canvas
			const context = canvas.getContext('2d');
			context.drawImage(video, 0, 0, canvas.width, canvas.height);

			// Convert canvas to data URL with high quality
			const imageDataURL = canvas.toDataURL('image/jpeg', 0.95);
			photo.src = imageDataURL;
			photoPreview.classList.remove('hidden');

			// Close modal and stop camera
			closeCameraModal();
			await processImage(imageDataURL);

			statusText.textContent =
				'Photo captured! You can download it or take a new one.';
		} catch (error) {
			console.error('Error capturing photo:', error);
			statusText.textContent = 'Error capturing photo. Please try again.';
		}
	}

	// Reset for new photo
	async function resetForNewPhoto() {
		photoPreview.classList.add('hidden');
		fileUploadInput.value = ''; // Clear file input
		await openCameraModal();
	}

	// Clean up when page is unloaded
	window.addEventListener('beforeunload', () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			stream = null;
		}
	});

	// Close modal when clicking outside
	cameraModal.addEventListener('click', (e) => {
		if (e.target === cameraModal) {
			closeCameraModal();
		}
	});

	// Close modal with Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !cameraModal.classList.contains('hidden')) {
			closeCameraModal();
		}
	});

	// Event listeners
	openCameraButton.addEventListener('click', openCameraModal);
	closeCameraButton.addEventListener('click', closeCameraModal);
	captureButton.addEventListener('click', takePhoto);
});
