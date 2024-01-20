document.addEventListener('DOMContentLoaded', function () {
	const navTabs = document.querySelectorAll(
		'.product-nav-tabs:not(.not-tab) a'
	);
	const productNavContent = document.getElementById('productNavContent');

	navTabs.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			e.preventDefault();
			navTabs.forEach((tab) => tab.classList.remove('active'));
			tab.classList.add('active');
			const navContent = tab.dataset.menu;
			productNavContent
				.querySelectorAll('.product-nav-content-item')
				.forEach((content) => content.classList.remove('active'));
			productNavContent
				.querySelector(`.product-nav-content-item[data-nav="${navContent}"]`)
				.classList.add('active');

			const tabHref = tab.getAttribute('href') || tab.id; // Get href or ID value
			window.history.pushState({}, '', tabHref);

			window.dispatchEvent(new Event('resize'));
		});
	});

	function parameterExists(param) {
		const queryParams = new URLSearchParams(window.location.search);
		return queryParams.has(param);
	}

	window.addEventListener('load', () => {
		const hash = window.location.hash;
		console.log(!parameterExists('qedit'));
		if (!parameterExists('qedit')) {
			if (hash) {
				console.log(hash);
				document.querySelector('a[href="' + hash + '"]')?.click();
			} else {
				document.querySelector('a[href="#overview"]')?.click();
			}
		}
	});

	function initGallery() {
		// Check if the #galleryMain element exists
		const galleryMainEl = document.querySelector('#galleryMain');
		if (!galleryMainEl) {
			return; // Exit the function if #galleryMain does not exist
		}

		const galleryNavItems = document.querySelectorAll(
			'#galleryNav .splide__slide'
		);

		try {
			const mainGallerySplide = new Splide('#galleryMain', {
				type: 'loop',
				pagination: false,
				rewind: false,
				arrows: false,
				breakpoints: {
					767: {
						pagination: true,
					},
				},
			});

			const galleryNavSplide = new Splide('#galleryNav', {
				type: 'slide',
				direction: 'ttb',
				gap: 6,
				height: '100%',
				fixedWidth: 75,
				fixedHeight: 75,
				perPage: 8,
				gap: 6,
				arrows: galleryNavItems.length > 8,
				isNavigation: true,
				pagination: false,
			});

			mainGallerySplide.sync(galleryNavSplide);
			mainGallerySplide.mount();
			galleryNavSplide.mount();
		} catch (e) {
			console.error(e);
		}
	}

	initGallery();
});
