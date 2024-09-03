'use strict';

$(document).ready(function () {
	let xhrObject = null;
	
	// TOOLTIP
	$(document).on('click', '.p-tooltip', function () {
		$('.p-tooltip__text_active').not($(this).find('.p-tooltip__text')).removeClass('p-tooltip__text_active');
		$(this).find('.p-tooltip__text').toggleClass('p-tooltip__text_active');
	});

	$(document).on('click', function (event) {
		if ($(event.target).closest('.p-tooltip').length === 0) {
			$('.p-tooltip__text_active').removeClass('p-tooltip__text_active');
		}
	});
	// TOOLTIP END

	// MODAL POPUP
	let showModalOverlay = function () {
		$('.popup-overlay').fadeIn(200);
		$('body').addClass('noscroll');
		$('.popup-window').fadeIn(400);
	};

	let hideModalOverlay = function () {
		$('.popup-window').hide();
		$('body').removeClass('noscroll');
		$('.popup-overlay').fadeOut(200);
	};

	$('.popup-window__close').click(function () {
		hideModalOverlay();
		$('.popup-window').hide();
		$('.p-form-wrapper .has-error input').val('');
		$('.p-form-wrapper .form-group.has-error .help-block').hide();
		$('.p-form-wrapper .form-group.has-error').removeClass('has-error');
		$('.bottom-form input[name="DownloadForm[email]"]').val(''); // it works, but selector #downloadform-email does NOT work
		
		if (xhrObject !== null) {
			xhrObject.abort();
		}
	});
	// MODAL POPUP END

	function hidePreloader() {
		$('#kg-preloader').hide();
		$('.p-results').show();
	}

	function hideNotFound() {
		$('#kg-not-found').hide();
		$('.p-results').show();
	}

	function showPreloader() {
		showModalOverlay();
		hideNotFound();
		$('#kg-preloader').show();
		$('.p-results').hide();
	}

	function showNotFound() {
		showModalOverlay();
		hidePreloader();
		$('#kg-not-found').show();
		$('.p-results').hide();
	}

	function updatePopupData(response) {
		let nf = new Intl.NumberFormat('en-US');
		$('.js-popup-backlinks').text(nf.format(response.backlinks));
		$('.js-popup-refdomains').text(nf.format(response.refdomains));
		$('.js-popup-c-blocks').text(nf.format(response.subnets));
		$('.js-popup-ips').text(nf.format(response.ips));
		$('.js-popup-inlink-rank').text(nf.format(response.inlink_rank));
		$('.js-popup-domain-inlink-rank').text(nf.format(response.domain_inlink_rank));
	}
	
	function updateCharts(response) {
		let chart1Selector = '#domain-checker-chart-1';
		let chart2Selector = '#domain-checker-chart-2';
		let interval = window.setInterval(function() {
			try {
				let hightchartsLoaded = ($(chart1Selector).highcharts().hasLoaded === true) && ($(chart2Selector).highcharts().hasLoaded === true);
				
				if (hightchartsLoaded) {
					let chart1 = $(chart1Selector).highcharts();
					let chart2 = $(chart2Selector).highcharts();
					chart1.series[0].data[0].update({y: response.inlink_rank});
					chart1.series[0].data[1].update({y: 100 - response.inlink_rank});
					chart2.series[0].data[0].update({y: response.domain_inlink_rank});
					chart2.series[0].data[1].update({y: 100 - response.domain_inlink_rank});
					window.clearInterval(interval);	
				}
			} catch (e) {}
		}, 100);
	}
	
	function prependProtocol() {
		let $url = $('#form-domain'), val = $url.val();
		
		if (!/^https?:\/\//i.test(val)) {
			$url.val('https://' + val);
		}
	}
	
	function submitForm($form) {
		showPreloader();

		xhrObject = $.ajax({
			url: $form.attr('action'),
			type: $form.attr('method'),
			data: $form.serialize(),
			dataType: 'json',
			success: function (response) {
				hidePreloader();

				if (response.backlinks === undefined) {
					showNotFound();
					return;
				}

				updatePopupData(response);
				updateCharts(response);
				showModalOverlay();
			},
			error: function (jqXHR, textStatus) {
				if (textStatus === 'abort') {
					// user closes popup manually
					return;
				}
				
				hidePreloader();
				showNotFound();
			},
			timeout: 30000
		});
		return false;
	}

	$(document).on('input', '#form-domain', function () {
		let $formGroup = $(this).closest('.form-group');
		$formGroup.removeClass('has-error');
		$formGroup.find('.help-block').text('');
	});

	$('body').on('beforeSubmit', '#domain-authority-checker-form', function () {
		prependProtocol();
		submitForm($(this));
		return false;
	});
});
