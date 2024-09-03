"use strict";
window.addEventListener("load", function(evt) {
    /* Open popup */
    $('.lp-popup-opener').click(function(){
        $('.lp-popup').addClass('lp-popup_opened');
        $('body').addClass('body_no-scroll');
    });

    $('.lp-popup__close').click(function(){
        $('.lp-popup').removeClass('lp-popup_opened');
        $('body').removeClass('body_no-scroll');
    });

    $('.lp-popup').click(function(){
        $('.lp-popup').removeClass('lp-popup_opened');
        $('body').removeClass('body_no-scroll');
    }).children().click(function(e){
        e.stopPropagation();
    });

    function sliders() {
        $('.lp-slider').each(function() {
            let slideNow = 1;
            let sliderInner = $(this).find('.lp-slider__inner');
            let sliderButton = $(this).find('.lp-slider__button');
            let sliderContainer = $(this).find('.lp-slider__container');
            let sliderSlide = $(this).find('.lp-slider__slide');
            let slideCount = $(sliderInner).children().length;
            let translateWidth = 0;

            let slidesIds = [];
            $(sliderInner).children().each(function() {
                slidesIds.push(this.id);
            });

            function activateButton() {
                $(sliderButton).removeClass('lp-slider__button_active');
                $(this).find('#button-slide' + slideNow).addClass('lp-slider__button_active');
            }

            function nextSlide() {
                if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
                    $(sliderInner).css('transform', 'translate(0, 0)');
                    slideNow = 1;
                } else {
                    translateWidth = -$(sliderContainer).width() * (slideNow);
                    $(sliderInner).css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow++;
                }
            }

            function prevSlide() {
                if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
                    translateWidth = - (slideCount - 1) * 100;
                    $(sliderInner).css('transform', 'translate(' + translateWidth + '%, 0)');
                    slideNow = slideCount;
                } else {
                    translateWidth = -$(sliderContainer).width() * (slideNow-2);
                    $(sliderInner).css({
                        'transform': 'translate(' - translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow--;
                }
            }

            $(this).find('.lp-slider__arrow_right').click(function() {
                $(this).parents(".lp-slider").find('.lp-slider__slide').show();
                nextSlide();
                $(sliderButton).removeClass('lp-slider__button_active');
                $(this).parents(".lp-slider").find('#button-slide' + slideNow).addClass('lp-slider__button_active');
            });

            $(this).find('.lp-slider__arrow_left').click(function() {
                $(this).parents(".lp-slider").find('.lp-slider__slide').show();
                prevSlide();
                $(sliderButton).removeClass('lp-slider__button_active');
                $(this).parents(".lp-slider").find('#button-slide' + slideNow).addClass('lp-slider__button_active');
            });

            function sliderImageSize() {
                $('.lp-slider').each(function() {
                    let containerWidth = $(this).find('.lp-slider__container').width();
                    $(this).find('.lp-slider__slide img').css('width', containerWidth);
                });
            }

            sliderImageSize();

            $(window).resize(function () {
                sliderImageSize();
            });

            /* Slider Buttons */
            $(this).find(sliderButton).click(function(){
                $(sliderInner).css('transform', 'translate(0, 0)');
                $(sliderButton).removeClass('lp-slider__button_active');
                $(this).addClass('lp-slider__button_active');
                let buttonId = $(this).attr('id').replace('button-', '');
                slideNow = buttonId.replace('slide', '');
                $(sliderSlide).hide();
                $(this).parents(".lp-slider").find('#' + buttonId).fadeIn(100);
            });
        });
    }

    sliders();
});
