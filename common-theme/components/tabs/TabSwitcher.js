const setupTabSwitcher = (tabBoxClass, tabButtonClass, tabClass) => {
	const tabBoxes = document.querySelectorAll(tabBoxClass);

	tabBoxes.forEach(tabBox => {
		const tabButtons = tabBox.querySelectorAll(tabButtonClass);
		const tabs = tabBox.querySelectorAll(tabClass);

		tabButtons.forEach(button => {
			button.addEventListener("click", function() {
				const tabId = this.getAttribute("data-tab");
				const tab = tabBox.querySelector(`#${tabId}`);

				tabs.forEach(tab => {
					tab.style.display = "none";
				});

				tabButtons.forEach(btn => {
					btn.classList.remove("active");
				});

				tab.style.display = "block";
				this.classList.add("active");
				// Прокрутка текущего элемента в область видимости
				this.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
			});
		});

		// Показывать вкладку по умолчанию при загрузке страницы
		const defaultTabButton = tabBox.querySelector(tabButtonClass);
		const defaultTabId = defaultTabButton.getAttribute("data-tab");
		const defaultTab = tabBox.querySelector(`#${defaultTabId}`);

		defaultTab.style.display = "block";
		defaultTabButton.classList.add("active");
	});
}

// document.addEventListener('DOMContentLoaded', () => {
// // Вызов функции для установки переключения вкладок
// 	setupTabSwitcher(".tab-box", ".tab-button", ".tab");
// });


