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
		window.dispatchEvent(new Event('resize'));
	});
});
