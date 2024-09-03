"use strict";

window.addEventListener("load", function(evt) {
    function setHeight(currentLink) {
        if($(currentLink).length) {
            let currentLinkId = $(currentLink).attr('id').replace('button-', '');
            let currentSlide = $("#" + currentLinkId);
            let heightLatestPosts = $(currentSlide).find(".slider-height-mark").outerHeight();
            let mustRead = $(currentSlide).find(".categories-slider__must-read");
            let heightMustRead;
            let currentSlideHeight;

            if($(mustRead).length) {
                heightMustRead = $(mustRead).outerHeight();
                currentSlideHeight = heightLatestPosts + heightMustRead + $(".block-indent-mobile").outerHeight();
            } else {
                heightMustRead = 0;
                currentSlideHeight = heightLatestPosts + heightMustRead + $(".block-indent-mobile").outerHeight();
            }

            $(currentLink).parents('.categories-slider').height(currentSlideHeight);
        }
    }

    function sliderHeight() {
        $('.categories-slider').each(function() {
            let currentLink = $(this).find('.categories-slider__link_active');
            setHeight(currentLink);
        });
    }

    function slidersMobile() {
        $('.categories-slider').each(function() {
            let sliderButtonMobile = $(this).find('.categories-slider__link');
            let sliderBlockMobile = $(this).find('.categories-slider__top');
            let container = $(this);

            /* Slider Buttons Mobile */
            if ($(window).width() < 600) {
                $(sliderBlockMobile).addClass("categories-slider__top_mobile");
                $(sliderBlockMobile).find(".categories-slider__link:first").addClass("categories-slider__link_active");

                $(sliderButtonMobile).click(function() {
                    if(!$(this).hasClass('categories-slider__link_active')) {
                        $(sliderButtonMobile).removeClass('categories-slider__link_active');
                        $(this).addClass('categories-slider__link_active');
                        $(this).parents(".categories-slider").removeClass("categories-slider_open");

                        let currentLink = $(this);
                        setHeight(currentLink);
                    } else {
                        $(this).parents(".categories-slider").toggleClass("categories-slider_open");
                    }
                });

                $(document).mouseup(function (e) {
                    if (container.has(e.target).length === 0 && container.is(":visible")) {
                        container.removeClass("categories-slider_open");
                    }
                });
            } else {
                $(sliderBlockMobile).removeClass("categories-slider__top_mobile"); 
            }
        });
    }

    if ($(window).width() < 600) {
        slidersMobile();
        sliderHeight();
    }
});
