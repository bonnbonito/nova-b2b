const navTabs = document.querySelectorAll('.product-nav-tabs a');
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
			document.querySelector('a[href="' + hash + '"]').click();
			console.log('remove');
		} else {
			document.querySelector('a[href="#overview"]').click();
			console.log('remove');
		}
	}
});
