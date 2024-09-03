"use strict";

window.addEventListener("load", function(evt) {
    if ($(window).width() > 1200) {
        $("#slide-alternative-search-engines").parents(".categories-slider__inner").height(635);
    }

    function sliders() {
        $('.categories-slider').each(function() {
            let slideNow = 1;
            let sliderInner = $(this).find('.categories-slider__inner');
            let sliderButton = $(this).find('.categories-slider__button');
            let sliderSlide = $(this).find('.categories-slider__slide');
            let slidesIds = [];

            $(sliderInner).children().each(function() {
                slidesIds.push(this.id);
            });

            $(sliderButton).first().addClass("highlighted");

            /* Slider Buttons */
            $(this).find(sliderButton).click(function(){
                $(sliderInner).css('transform', 'translate(0, 0)');
                $(sliderButton).removeClass('categories-slider__button_active highlighted');
                $(this).addClass('categories-slider__button_active highlighted');
                let buttonId = $(this).attr('id').replace('button-', '');
                slideNow = buttonId.replace('slide', '');
                $(sliderSlide).hide();
                $(this).parents(".categories-slider").find('#' + buttonId).fadeIn(100);
                if ($(window).width() > 1200) {
                    $(this).parents(".categories-slider").find(".categories-slider__inner").height("auto");
                }
            });
        });
    }

    sliders();


    // if blocks in slide are less than 7
    if ($(window).width() > 1200) {
        $('.categories-slider__latest-posts_all-columns').each(function() {
            let intoLength = $(this).find(".intro").length;
            while(intoLength < 7) {
                $(this).append('<div class="intro no-line"></div>');
                intoLength++;
            }
        });
    }
});
