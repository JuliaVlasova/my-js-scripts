"use strict";

window.onload = function() {
    let slideNow = 1, 
    slideCount = $('.lp-slider__inner').children().length,
    translateWidth = 0,
    slidesIds = [];

    $('.lp-slider__inner').children().each(function() {
        slidesIds.push(this.id);
    });

    function nextSlide() {
        if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
            $('.lp-slider__inner').css('transform', 'translate(0, 0)');
            slideNow = 1;

            activateButton();
        } else {
            translateWidth = -$('.lp-slider__container').width() * (slideNow);
            
            $('.lp-slider__inner').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow++;

            activateButton();
        }
    }

    function prevSlide() {
        if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
            $('.lp-slider__inner').css('transform', 'translate(-300%, 0)');
            slideNow = 4;

            activateButton();
        } else {
            translateWidth = -$('.lp-slider__container').width() * (slideNow-2);

            $('.lp-slider__inner').css({
                'transform': 'translate(' - translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow--;

            activateButton();
        }
    }

    $('.lp-slider__arrow_right').click(function() {
        $('.lp-slider__slide').show();

        nextSlide();
    });

    $('.lp-slider__arrow_left').click(function() {
        $('.lp-slider__slide').show();

        prevSlide();
    });

    function sliderImageSize() {
        let containerWidth = $('.lp-slider__container').width();

        $('.lp-slider__slide img').css('width', containerWidth);
    }

    sliderImageSize();

    $(window).resize(function () {
        sliderImageSize();
    });
}
