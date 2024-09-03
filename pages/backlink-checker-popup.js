$(document).ready(function () {
	/* Select style for download-success */

	$(".popup-form__select").each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children("option").length;

		$this.addClass("s-hidden");
		$this.wrap("<div class='select'></div>");
		$this.after("<div class='styledSelect'></div>");
		var $styledSelect = $this.next("div.styledSelect");
		$styledSelect.text($this.children("option").eq(0).text());
		var $list = $("<ul />", {
			"class": "options"
		}).insertAfter($styledSelect);

		for (var i = 1; i < numberOfOptions; i++) {
			$("<li />", {
				text: $this.children("option").eq(i).text(),
				rel: $this.children("option").eq(i).val()
			}).appendTo($list);
		}

		$('#get-product-index-inline-form').on('submit', function() {
			var personaElement = $('#downloadpopupform-persona');
			var levelElement = $('#downloadpopupform-level');
			$('#get-product-index-inline-form-submit').blur();
			personaElement.parent().parent().removeClass('error-message');
			levelElement.parent().parent().removeClass('error-message');
			if (!personaElement.val() && !levelElement.val()) {
				personaElement.parent().parent().addClass('error-message');
				levelElement.parent().parent().addClass('error-message');
				$('.error-summary').show().text('Oops! You didn’t select your role and assess your experience.');
			} else if (!personaElement.val()) {
				personaElement.parent().parent().addClass('error-message');
				$('.error-summary').show().text('Oops! You didn’t select your role.');
			} else if (!levelElement.val()) {
				levelElement.parent().parent().addClass('error-message');
				$('.error-summary').show().text('Oops! You didn’t assess your experience.');
			} else {
				$('.additional-info-overlay').fadeOut(300);
				return true;
			}
			return false;
		});

		var $listItems = $list.children("li");

		$styledSelect.click(function (e) {
			$(this).toggleClass("active");
			$(this).toggleClass("active_bg");
			e.stopPropagation();
			$("div.styledSelect.active").each(function () {
				$(this).removeClass("active").next("ul.options").hide();
			});
			$(this).toggleClass("active").next("ul.options").toggle();
		});

		$('#downloadpopupform-persona').change(function () {
			alert('lol');
		});

		$styledSelect.bind('DOMSubtreeModified', function () {
			if ($(this).parent().parent().hasClass('error-message')) {
				$(this).parent().parent().removeClass('error-message');
				switch ($(this).parent().children(0).attr('id')) {
					case 'downloadpopupform-persona':
						if (!$('#downloadpopupform-level').val())
							$('.error-summary').show().text('Oops! You didn’t assess your experience.');
						else $('.error-summary').hide();
						break;
					case 'downloadpopupform-level':
						if (!$('#downloadpopupform-persona').val())
							$('.error-summary').show().text('Oops! You didn’t select your role.');
						else $('.error-summary').hide();
						break;
				}
			}
		});

		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass("active");
			$styledSelect.removeClass("active_bg");
			$this.val($(this).attr("rel"));
			$list.hide();
		});

		$(document).click(function () {
			$styledSelect.removeClass("active");
			$styledSelect.removeClass("active_bg");
			$list.hide();
		});
	});

	$('.subscribe-form').on('beforeSubmit', function () {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({'event': 'subscribe_submit'});
	});

	$(".help-block-green").addClass("help-block-green_padding");

	$('#get-product-index-inline-form_role').on('submit', function() {
		var personaElement = $('#downloadpopupform-persona');
		$('#get-product-index-inline-form-submit').blur();
		personaElement.parent().removeClass('error-message');
		if (!personaElement.find("input").is(':checked')) {
			personaElement.parent().addClass('error-message');
		} else {
			var val = personaElement.find("input:checked").val();
			var showDemoPopup = $('.popup-role_explore');

			if(showDemoPopup.length && showDemoPopup.data('show-val') && (showDemoPopup.data('show-val') == val || showDemoPopup.data('show-val') == 'all')) {
				$(".popup-role").hide();
				$(".popup-role_explore").show();
				return true;
			} else {
				$('.additional-info-overlay').fadeOut(300);
				return true;
			}
		}
		return false;
	});

	$(".popup-role label").click(function(){
		$(".popup-role .field-downloadpopupform-persona").removeClass('error-message');
	});

	$(".popup-role .popup-button_explore").click(function(){
		$(".additional-info-overlay").slideUp(200);
	});
});
