document.addEventListener('DOMContentLoaded', function () {
	const bannerSplideElem = document.querySelectorAll('.banner-splide');
	bannerSplideElem.forEach((banner) => {
		const bannerSplide = new Splide(banner);
		const bannerNext = document.getElementById('bannerNext');
		const bannerPrev = document.getElementById('bannerPrev');
		bannerSplide.mount();

		bannerNext.addEventListener('click', (e) => {
			e.preventDefault();
			bannerSplide.go('>');
		});

		bannerPrev.addEventListener('click', (e) => {
			e.preventDefault();
			bannerSplide.go('<');
		});
	});
});
