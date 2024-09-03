"use strict";
$(document).ready(function () {
    //popup
    $(".popup-opener").click(function() {
		$(".overlay").slideDown(200);
		$("body").addClass("body-hidden");
		return false;
	});
	
	$(document).mouseup(function (e) {
		var container = $(".overlay");
		if (container.has(e.target).length === 0 && container.is(":visible") ){
			container.slideUp(200);
			$("body").removeClass("body-hidden");
		}
	});

    //slider
    function slidesHandle() {
        $(".rt-slider").each(function() {
            $(this).find(".rt-slider__screen").hide();
            $(this).find(".rt-slider__text").hide();
            let buttonActiveId = $(this).find(".rt-slider__button_active").attr("id");
            let images = $(this).find(".rt-slider__screen");
            let texts = $(this).find(".rt-slider__text");
            for(let i = 0; i < images.length; i++) {
                if($(images[i]).attr("id").split("_").pop() == buttonActiveId) {
                    $(images[i]).show();
                }
            }
            for(let t = 0; t < texts.length; t++) {
                if($(texts[t]).attr("id").split("_").pop() == buttonActiveId) {
                    $(texts[t]).show();
                }
            }
        });
    }
    slidesHandle();

    $(".rt-slider__button").click(function() {
        $(this).parents(".rt-slider").find(".rt-slider__button").removeClass("rt-slider__button_active");
        $(this).addClass("rt-slider__button_active");
        slidesHandle();
    });
    

    // FAQ collapse
    $('.lp-collapse__top').click(function(){
        $(this).parents('.lp-collapse').toggleClass('lp-collapse_collapsed').toggleClass('lp-collapse_uncollapsed').find('.lp-collapse__content').toggleClass('lp-collapse__content_open');
        $(this).find('.lp-collapse__arrow').toggleClass('lp-collapse__arrow_transformed');
    });
  
});

