const mobileSliders = document.querySelectorAll('.mobile-slider');

mobileSliders.forEach((mobileSlider) => {
	let args = {
		cellAlign: 'left',
		wrapAround: true,
		adaptiveHeight: true,
		pageDots: false,
		watchCSS: true,
		prevNextButtons: false,
	};

	new Flickity(mobileSlider, {
		...args,
	});
});
