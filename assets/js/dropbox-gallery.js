function NovaDropboxGallerySlider() {
	const emblaNodes = document.querySelectorAll('.embla');
	const plugins = [EmblaCarouselAutoScroll({ playOnInit: false })];
	const OPTIONS = { loop: true, align: 'start' };

	emblaNodes.forEach((emblaNode) => {
		const viewportNode = emblaNode.querySelector('.embla__viewport');
		const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
		const nextBtnNode = emblaNode.querySelector('.embla__button--next');
		const dotsNode = emblaNode.querySelector('.embla__dots');

		const emblaApi = EmblaCarousel(viewportNode, OPTIONS, plugins);
		const loadImagesInView = setupLazyLoadImage(emblaApi);

		const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
			emblaApi,
			prevBtnNode,
			nextBtnNode
		);
		const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
			emblaApi,
			dotsNode
		);

		emblaApi
			.on('init', loadImagesInView)
			.on('reInit', loadImagesInView)
			.on('slidesInView', loadImagesInView)
			.on('destroy', removePrevNextBtnsClickHandlers)
			.on('destroy', removeDotBtnsAndClickHandlers);
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		NovaDropboxGallerySlider();
	});
} else {
	NovaDropboxGallerySlider();
}

const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
	const togglePrevNextBtnsState = () => {
		if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled');
		else prevBtn.setAttribute('disabled', 'disabled');

		if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled');
		else nextBtn.setAttribute('disabled', 'disabled');
	};

	emblaApi
		.on('select', togglePrevNextBtnsState)
		.on('init', togglePrevNextBtnsState)
		.on('reInit', togglePrevNextBtnsState);

	return () => {
		prevBtn.removeAttribute('disabled');
		nextBtn.removeAttribute('disabled');
	};
};

const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
	const scrollPrev = () => {
		emblaApi.scrollPrev();
	};
	const scrollNext = () => {
		emblaApi.scrollNext();
	};
	prevBtn.addEventListener('click', scrollPrev, false);
	nextBtn.addEventListener('click', scrollNext, false);

	const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
		emblaApi,
		prevBtn,
		nextBtn
	);

	return () => {
		removeTogglePrevNextBtnsActive();
		prevBtn.removeEventListener('click', scrollPrev, false);
		nextBtn.removeEventListener('click', scrollNext, false);
	};
};

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
	let dotNodes = [];

	const addDotBtnsWithClickHandlers = () => {
		dotsNode.innerHTML = emblaApi
			.scrollSnapList()
			.map(() => '<button class="embla__dot" type="button"></button>')
			.join('');

		const scrollTo = (index) => {
			emblaApi.scrollTo(index);
		};

		dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
		dotNodes.forEach((dotNode, index) => {
			dotNode.addEventListener('click', () => scrollTo(index), false);
		});
	};

	const toggleDotBtnsActive = () => {
		const previous = emblaApi.previousScrollSnap();
		const selected = emblaApi.selectedScrollSnap();
		dotNodes[previous].classList.remove('embla__dot--selected');
		dotNodes[selected].classList.add('embla__dot--selected');
	};

	emblaApi
		.on('init', addDotBtnsWithClickHandlers)
		.on('reInit', addDotBtnsWithClickHandlers)
		.on('init', toggleDotBtnsActive)
		.on('reInit', toggleDotBtnsActive)
		.on('select', toggleDotBtnsActive);

	return () => {
		dotsNode.innerHTML = '';
	};
};

const setupLazyLoadImage = (emblaApi) => {
	const imagesInView = [];
	const slideNodes = emblaApi.slideNodes();
	const spinnerNodes = slideNodes.map((slideNode) =>
		slideNode.querySelector('.embla__lazy-load__spinner')
	);
	const imageNodes = slideNodes.map((slideNode) =>
		slideNode.querySelector('.embla__lazy-load__img')
	);

	const loadImageInView = (index) => {
		const imageNode = imageNodes[index];
		const slideNode = slideNodes[index];
		const spinnerNode = spinnerNodes[index];
		const src = imageNode.getAttribute('data-src');

		imageNode.src = src;
		imagesInView.push(index);

		const onLoad = () => {
			slideNode.classList.add('embla__lazy-load--has-loaded');
			spinnerNode.parentElement?.removeChild(spinnerNode);
			imageNode.removeEventListener('load', onLoad);
		};
		imageNode.addEventListener('load', onLoad);
	};

	const loadImagesInView = () => {
		emblaApi
			.slidesInView()
			.filter((index) => !imagesInView.includes(index))
			.forEach(loadImageInView);
		return imagesInView.length === imageNodes.length;
	};

	const loadImagesInViewAndDestroyIfDone = (emblaApi, eventName) => {
		const loadedAll = loadImagesInView();
		if (loadedAll) emblaApi.off(eventName, loadImagesInViewAndDestroyIfDone);
	};

	return loadImagesInViewAndDestroyIfDone;
};
