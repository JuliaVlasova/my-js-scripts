let preventPjaxChainLoading = false;
let pjaxReloadDelay = 100;
let pjaxRequestTimeout = 40000;
let pjaxBacklinksRequestTimeout = 60000;
let signedUser = false;
let downloadSuccessWindowOpened = false;

if (window.history.replaceState) {
	window.history.replaceState(null, null, window.location.href);
}

$('#backlink-checker-sign-up-form').on('beforeSubmit', function (e) {
	$('.backlink-checker__wait-full-screen').show();
});

function openPopup(clickedElement) {
	$('body').on('click', clickedElement, function () {
		let targetSelector = $(this).data('target');
	
		toggleBacklinkCheckerPopup(true, targetSelector);
	
		return false;
	});
}

openPopup('.backlink-checker-popup-opener');
openPopup('.backlink-checker-block_activated .backlink-checker-banner_en');
openPopup('.backlink-checker-wrapper_en .table-pagination_show-popup');

function toggleBacklinkCheckerPopup(show, targetSelector) {
	if (show) {
		if (typeof targetSelector !== 'undefined') {
			$(targetSelector).find('form').trigger('reset');
			$(targetSelector).show();
			$('.additional-info-overlay').slideDown(200);

			let bcForm = getBacklinkCheckerForm();
			$.ajax({
				method: 'POST',
				data: {
					_csrf: bcForm.find('#backlinkcheckerform-csrf').val(),
					url: bcForm.find('#backlinkcheckerform-url').val(),
					mode: bcForm.find('#backlinkcheckerform-mode').val()
				}
			});
		}
	} else {
		$('.additional-info-overlay').slideUp(200);
		$('.additional-info-overlay .popup-additional-info').hide();
	}
}

function lockBacklinksCheckerForm(lock) {
	if (lock) {
		$('.backlink-checker-block .backlink-checker-form__button').addClass('backlink-checker-form__button_checking');
		$('.backlink-checker-results-block > div').addClass('hidden-if-placeholder');
	} else {
		$('.backlink-checker-block .backlink-checker-form__button').removeClass('backlink-checker-form__button_checking');
		$('.backlink-checker-results-block > div').removeClass('hidden-if-placeholder');
	}
}

function toggleBacklinksCheckerResultsLoading(show, targetSelector) {
	if (typeof targetSelector === 'undefined') {
		targetSelector = '#backlink-checker-results-summary-container, #backlink-checker-results-history-container, #backlink-checker-results-backlinks-container, #backlink-checker-results-additional-container';
	}

	if (show) {
		$('.backlink-checker-block').addClass('backlink-checker-block_activated');
		$('.backlink-checker-results-block__placeholder').removeClass('hidden-if-placeholder');
		$(targetSelector).hide().html('');
		$(targetSelector).parent().find('.backlink-checker-results-block__placeholder').show();
		$(targetSelector).parent().find('.backlink-checker-results-block__placeholder-block_wait').show();
	} else {
		$(targetSelector).parent().find('.backlink-checker-results-block__placeholder').hide();
		$(targetSelector).parent().find('.backlink-checker-results-block__placeholder-block_wait').hide();
		$(targetSelector).show();
	}
}

function restoreBacklinksCheckerResults(sourceSelector, targetSelector) {
	$(targetSelector).html($(sourceSelector).html());
}

function checkBacklinksResponse(xhr, textStatus) {
	let responseIsOk = true;
	let backlinkCheckerForm = getBacklinkCheckerForm();
	let url = backlinkCheckerForm.find('#backlinkcheckerform-url').val();

	if (textStatus.status == 400 && !document.location.hash) {
		responseIsOk = false;
		let pageUrl = document.location.href;

		if (document.location.search == '') {
			pageUrl += '?url=' + url;
		} else if (document.location.search.indexOf('url=') == -1) {
			pageUrl += '&url=' + url;
		}

		document.location.replace(pageUrl + '#reloaded');
	}

	return responseIsOk;
};

function openDownloadSuccessWindow(form) {
	if (downloadSuccessWindowOpened) {
		return;
	}
	
	window.setTimeout(function() {
		let formHasErrors =  $(form).find('.has-error').length
		
		if (formHasErrors) {
			return;
		}
		
		window.open('/seo-spyglass/download-success.html', '_blank');
		downloadSuccessWindowOpened = true;
	}, 250);
}

$('.backlink-checker-slider').slidesjs({
	width: 820,
	height: 268,
	play: {
		auto: true,
		interval: 10000,
	}
});

$('.slidesjs-next, .slidesjs-previous').empty();

$('.backlink-checker-block').on('mouseenter', '.tooltip-txt', function () {
	$(this).find('.tooltiptext').show();
});

$('.backlink-checker-block').on('mouseleave', '.tooltip-txt', function () {
	$(this).find('.tooltiptext').hide();
});

$(document).on('beforeValidateAttribute', '.backlink-checker-block .backlink-checker-form form', function (event, attribute, messages, deferreds) {
	let errors = $(this).find('.backlink-checker-form__error');
	errors.find('ul').text('');
	errors.hide();
});

let getBacklinkCheckerForm = function () {
	return $('.backlink-checker-block .backlink-checker-form form').first();
};

$(document).on('pjax:beforeSend', '.backlink-checker-form-container', function (xhr, options) {
	let form = getBacklinkCheckerForm();
	let submitButton = form.find('.backlink-checker-form__button').first();
	signedUser = !submitButton.hasClass('guest');
	if (!signedUser) {
		toggleBacklinkCheckerPopup(true, '.popup-sign-up');
		return false;
	}
});

$(document).on('pjax:send', '.backlink-checker-form-container', function (xhr, options) {
	lockBacklinksCheckerForm(true);
	toggleBacklinksCheckerResultsLoading(true);
});

$(document).on('pjax:complete', '.backlink-checker-form-container', function (xhr, textStatus, options) {
	if (!checkBacklinksResponse(xhr, textStatus)) return;
	lockBacklinksCheckerForm(true);

	if ($('.backlink-checker-form__error').is(':visible')) {
		$('.backlink-checker-results-block > div').addClass('hidden-if-placeholder');
		$('.backlink-checker-results-block__placeholder').removeClass('hidden-if-placeholder');
		$('.backlink-checker-block_activated').addClass('backlink-checker-block_not-valid');
	} else {
		$('.backlink-checker-results-block > div').removeClass('hidden-if-placeholder');
		$('.backlink-checker-block_activated').removeClass('backlink-checker-block_not-valid');
	}

	let relatedForm = $(xhr.relatedTarget);

	if (relatedForm.data('type') != 'discover') {
		return;
	}

	$('.backlink-checker-block .backlink-checker-form form').each(function () {
		let pageForm = $(this);

		if (pageForm.attr('id') != relatedForm.attr('id')) {
			relatedForm.find('*').filter(':input').each(function () {
				let formField = $(this);

				pageForm.find('*').filter(':input').each(function () {
					let pageFormField = $(this);

					if (pageFormField.attr('id') == formField.attr('id')) {
						pageFormField.val(formField.val());
					}
				});
			});

			pageForm.find('.backlink-checker-form__error').replaceWith(relatedForm.find('.backlink-checker-form__error').clone());
		}
	});

	if (relatedForm.find('.backlink-checker-form__error ul li').length == 0) {
		$.pjax.reload({
			history: false,
			container: '#backlink-checker-results-summary-container',
			url: relatedForm.attr('action'),
			type: 'POST',
			data: relatedForm.serialize(),
		});
	}
});


$(document).on('pjax:send', '#backlink-checker-results-summary-container', function (xhr, options) {
	setTimeout(function () {
		options.abort('timeout');
		if (options.statusText == 'timeout') {
			restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-summary', '#backlink-checker-results-summary-container');
		}
	}, pjaxRequestTimeout);
});

$(document).on('pjax:complete', '#backlink-checker-results-summary-container', function (xhr, textStatus, options) {
	if (!checkBacklinksResponse(xhr, textStatus)) return;

	if ($('#backlink-checker-results-summary-container').html().length < 1) {
		restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-summary', '#backlink-checker-results-summary-container');
	}

	toggleBacklinksCheckerResultsLoading(false, '#backlink-checker-results-summary-container');

	if (preventPjaxChainLoading) {
		preventPjaxChainLoading = false;
		return;
	}

	let backlinkCheckerForm = getBacklinkCheckerForm();

	$.pjax.reload({
		history: false,
		container: '#backlink-checker-results-history-container',
		url: backlinkCheckerForm.attr('action'),
		type: 'POST',
		data: backlinkCheckerForm.serialize(),
	});
});


$(document).on('pjax:send', '#backlink-checker-results-history-container', function (xhr, options) {
	setTimeout(function () {
		options.abort('timeout');
		if (options.statusText == 'timeout') {
			restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-history', '#backlink-checker-results-history-container');
		}
	}, pjaxRequestTimeout);
});

$(document).on('pjax:complete', '#backlink-checker-results-history-container', function (xhr, textStatus, options) {
	if (!checkBacklinksResponse(xhr, textStatus)) return;

	if ($('#backlink-checker-results-history-container').html().length < 1) {
		restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-history', '#backlink-checker-results-history-container');
	}

	toggleBacklinksCheckerResultsLoading(false, '#backlink-checker-results-history-container');

	if (preventPjaxChainLoading) {
		preventPjaxChainLoading = false;
		return;
	}

	let backlinkCheckerForm = getBacklinkCheckerForm();

	setTimeout(function () {
		$.pjax.reload({
			history: false,
			container: '#backlink-checker-results-backlinks-container',
			url: backlinkCheckerForm.attr('action'),
			type: 'POST',
			data: backlinkCheckerForm.serialize(),
		});
	}, pjaxReloadDelay);
});


$(document).on('pjax:send', '#backlink-checker-results-backlinks-container', function (xhr, options) {
	setTimeout(function () {
		options.abort('timeout');
		if (options.statusText == 'timeout') {
			restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-backlinks', '#backlink-checker-results-backlinks-container');
			$('#backlink-checker-results .backlink-checker-table-error').show();
		}
	}, pjaxBacklinksRequestTimeout);
});

$(document).on('pjax:complete', '#backlink-checker-results-backlinks-container', function (xhr, textStatus, options) {
	if (!checkBacklinksResponse(xhr, textStatus)) return;

	if ($('#backlink-checker-results-backlinks-container').html().length < 1) {
		restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-backlinks', '#backlink-checker-results-backlinks-container');
	}

	toggleBacklinksCheckerResultsLoading(false, '#backlink-checker-results-backlinks-container');

	if (preventPjaxChainLoading) {
		preventPjaxChainLoading = false;
		return;
	}

	let backlinkCheckerForm = getBacklinkCheckerForm();

	setTimeout(function () {
		$.pjax.reload({
			history: false,
			container: '#backlink-checker-results-additional-container',
			url: backlinkCheckerForm.attr('action'),
			type: 'POST',
			data: backlinkCheckerForm.serialize(),
		});
	}, 1500);
});

$(document).on('pjax:send', '#backlink-checker-results-additional-container', function (xhr, options) {
	setTimeout(function () {
		options.abort('timeout');
		if (options.statusText == 'timeout') {
			restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-additional', '#backlink-checker-results-additional-container');
		}
	}, pjaxRequestTimeout);
});

$(document).on('pjax:complete', '#backlink-checker-results-additional-container', function (xhr, textStatus, options) {
	if (!checkBacklinksResponse(xhr, textStatus)) return;

	if ($('#backlink-checker-results-additional-container').html().length < 1) {
		restoreBacklinksCheckerResults('#backlink-checker-default-results .backlink-checker-results-additional', '#backlink-checker-results-additional-container');
	}

	lockBacklinksCheckerForm(false);
	toggleBacklinksCheckerResultsLoading(false, '#backlink-checker-results-additional-container');
});

$('body').on('click', '.popup-additional-info__close', function () {
	toggleBacklinkCheckerPopup(false);

	return false;
});

$('.backlink-checker-block').on('click', '.backlink-checker-part .backlink-checker-results-block__history', function () {
	let range = $(this).data('range');
	let btns = $('.backlink-checker-part .backlink-checker-results-block__history');

	btns.removeClass('backlink-checker-results-block__history_active');

	btns.each(function () {
		if ($(this).data('range') === range) {
			$(this).addClass('backlink-checker-results-block__history_active');
		}
	});

	let backlinkCheckerForm = getBacklinkCheckerForm();

	backlinkCheckerForm.find('#backlinkcheckerform-interval').val(range);

	preventPjaxChainLoading = true;

	$.pjax.reload({
		history: false,
		container: '#backlink-checker-results-history-container',
		url: backlinkCheckerForm.attr('action'),
		type: 'POST',
		data: backlinkCheckerForm.serialize(),
	});

	return false;
});
