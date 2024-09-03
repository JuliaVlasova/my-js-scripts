document.addEventListener('DOMContentLoaded', () => {
	const popupCloseButton = document.querySelector('.popup-window__close');
	const forms = document.querySelectorAll('#get-product-index-inline-form');

	popupCloseButton.addEventListener('click', () => {
		clearDownloadProductForm(forms);
	});
});

function clearDownloadProductForm(forms) {
	$('.form-group').removeClass('has-error');
	$('span.help-block').css('display', 'none');
	forms.forEach((formItem) => {
		formItem.reset();
	});
}
