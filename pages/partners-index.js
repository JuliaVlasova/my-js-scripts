"use strict";

window.onload = function() {
    $(".lp-select-wrapper").click(function(){
		$(".lp-select-arrow").toggleClass("lp-select-arrow_transformed");
		$(".lp-contact-form__select").toggleClass("lp-contact-form__select_transformed");
		$("select option").first().attr("disabled", true);
		if($("select option:selected").hasClass("lp-void-option")) {
			$("select").removeClass("active-select");
		} else {
			$("select").addClass("active-select");
		}	
	});

	$(document).mouseup(function (e) {
		let container =  $(".lp-select-wrapper");
		if (container.has(e.target).length === 0 && container.is(":visible")) {
			$(".lp-select-arrow").removeClass("lp-select-arrow_transformed");
			$(".lp-contact-form__select").removeClass("lp-contact-form__select_transformed");
		}
	});

	//slider dots
	let sliderBlocks = $(".lp-points").find(".lp-points__block");
	let dot = "<div class='lp-slider-nav__dot'></div>";
	
	if($(window).width() < 600) {
		for(let i = 0; i < sliderBlocks.length; i++) {
			$(".lp-slider-nav").append(dot);
			$(sliderBlocks[i]).attr("id", "lp-points__block_" + i);
		}

		let dots = $(".lp-slider-nav").find(".lp-slider-nav__dot");

		for(let d = 0; d < dots.length; d++) {
			$(dots[d]).attr("id", "lp-slider-nav__dot_" + d);
		}

		$("#lp-slider-nav__dot_0").addClass("lp-slider-nav__dot_active");

		$(".lp-points__row").on("touchmove", function() {
			function handleTouchMove() {
				for(let i = 0; i < sliderBlocks.length; i++) {
                    setTimeout(function() {if($(sliderBlocks[i]).position().left > -$(sliderBlocks[i]).outerWidth() && $(sliderBlocks[i]).position().left < 21 ) {
						let idActive = i;
						let idActiveLast = sliderBlocks.length - 1;
						let activeDot = "#lp-slider-nav__dot_" + idActive;
						let activeDotLast = "#lp-slider-nav__dot_" + idActiveLast;
	
						$(".lp-slider-nav__dot").removeClass("lp-slider-nav__dot_active");
						$(activeDot).addClass("lp-slider-nav__dot_active");
	
						if(-$(".lp-points__row").offset().left > $(".lp-points__row").outerWidth() - 2 * $(sliderBlocks[i]).outerWidth()) {
							$(".lp-slider-nav__dot").removeClass("lp-slider-nav__dot_active");
							$(activeDotLast).addClass("lp-slider-nav__dot_active");
						}
					}}, 500);
					
				}
			}
            
            handleTouchMove();
		
		});
	}


}

$('#partner-feedback').on('afterValidate', function (event, messages, errorAttributes) {
	setTimeout(function() {
		var elementsWithErrors = $('#partner-feedback').find('div.has-error');
		if (elementsWithErrors.length !== 0) {
			$('#partner-feedback-submit').addClass('lp-contact-form__button_disabled');
		} else {
			$('#partner-feedback-submit').removeClass('lp-contact-form__button_disabled');
		}
	}, 0);
});