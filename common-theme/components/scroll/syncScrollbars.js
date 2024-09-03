function syncScrollbars(scrollContentSelector, scrollbarSelector, scrollbarContentSelector) {
	const scrollContent = document.querySelector(scrollContentSelector);
	const scrollbar = document.querySelector(scrollbarSelector);
	const scrollbarContent = document.querySelector(scrollbarContentSelector);

	// Установить ширину scrollbarContent такой же, как у scrollContent
	scrollbarContent.style.width = scrollContent.scrollWidth + 'px';

	scrollbar.addEventListener('scroll', () => {
		scrollContent.scrollLeft = scrollbar.scrollLeft;
	});

	scrollContent.addEventListener('scroll', () => {
		scrollbar.scrollLeft = scrollContent.scrollLeft;
	});
}



