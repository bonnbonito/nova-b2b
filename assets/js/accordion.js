const accordion = document.querySelector('.accordion');
const faqItems = document.querySelectorAll('.faq-item');

accordion
	?.querySelectorAll('.accordion-panel .faq-question')
	.forEach((panel) => {
		panel.addEventListener('click', (e) => {
			const activePanel = e.target.closest('.accordion-panel');
			if (!activePanel) return;
			toggleAccordion(activePanel);
		});
	});

function toggleAccordion(panelToActivate) {
	const activeButton = panelToActivate.querySelector('button');
	const activePanel = panelToActivate.querySelector('.accordion-content');
	const activePanelIsOpened = activeButton.getAttribute('aria-expanded');

	if (activePanelIsOpened === 'true') {
		panelToActivate
			.querySelector('button')
			.setAttribute('aria-expanded', false);

		panelToActivate
			.querySelector('.accordion-content')
			.setAttribute('aria-hidden', true);
	} else {
		panelToActivate.querySelector('button').setAttribute('aria-expanded', true);

		panelToActivate
			.querySelector('.accordion-content')
			.setAttribute('aria-hidden', false);
	}
}

faqItems?.forEach((faqItem) => {
	faqItem.addEventListener('click', () => {
		faqItem.querySelector('.faq-question').classList.toggle('active');
		faqItem.querySelector('.expander').classList.toggle('expanded');
	});
});
