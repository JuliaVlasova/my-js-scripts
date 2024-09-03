"use strict";

$(document).ready(function () {
	function sliders() {
        $('.slider-dotted').each(function() {
            let slideNow = 1;
			let dotNow = 1;
            let sliderInner = $(this).find('.slider-dotted__inner');
			let sliderNav = $(this).find('.slider-dotted__nav');
            let sliderContainer = $(this).find('.slider-dotted__container');
            let sliderSlide = $(this).find('.slider-dotted__slide');
            let slideCount = $(sliderInner).children().length;
            let translateWidth = 0;

			//slider dots
			let dot = "<div class='slider-dotted__dot'></div>";

			for(let i = 0; i < sliderSlide.length; i++) {
				$(sliderNav).append(dot);
				$(sliderSlide[i]).attr("id", "slider-dotted__slide_" + i);
			}

			let dots = $(sliderNav).find(".slider-dotted__dot");

			for(let d = 0; d < dots.length; d++) {
				$(dots[d]).attr("id", "slider-dotted__dot_" + d);
			}

			$(sliderNav).find("#slider-dotted__dot_0").addClass("slider-dotted__dot_active");

			function handleTouchMove() {
				for(let i = 0; i < sliderSlide.length; i++) {
                    setTimeout(function() {if($(sliderSlide[i]).position().left > -$(sliderSlide[i]).outerWidth() && $(sliderSlide[i]).position().left < 21) {
						let idActive = i;
						let idActiveLast = sliderSlide.length - 1;
						let activeDot = "#slider-dotted__dot_" + idActive;
						let activeDotLast = "#slider-dotted__dot_" + idActiveLast;

						$(sliderNav).find(".slider-dotted__dot").removeClass("slider-dotted__dot_active");
						$(sliderNav).find(activeDot).addClass("slider-dotted__dot_active");

						if(-$(sliderInner).offset().left > ($(sliderSlide[i]).outerWidth() * (sliderSlide.length - 1)) - $(sliderSlide[i]).outerWidth() / 2) {
							$(sliderNav).find(".slider-dotted__dot").removeClass("slider-dotted__dot_active");
						$(sliderNav).find(activeDotLast).addClass("slider-dotted__dot_active");
						}
					}}, 500);
				}
			}

			if($(window).width() < 600) {
				$(sliderInner).on("touchmove", function() {
					handleTouchMove();
				});
			}

            let slidesIds = [];
            $(sliderInner).children().each(function() {
                slidesIds.push(this.id);
            });

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

			function nextDot() {
				let activeDot;

				if (dotNow == slideCount || dotNow <= 0 || dotNow > slideCount) {
                    activeDot = "#slider-dotted__dot_0";
					$(sliderNav).find(activeDot).addClass('slider-dotted__dot_active');
                    dotNow = 1;
                } else {
					activeDot = "#slider-dotted__dot_" + dotNow;
					$(sliderNav).find(activeDot).addClass('slider-dotted__dot_active');
                    dotNow++;
                }
			}

			// Automatic slides change
			if($(window).width() >= 600) {
				let autoChange = setInterval(function() {
					nextSlide();
					$(dots).removeClass('slider-dotted__dot_active');
					nextDot();
				}, 7000);

				$(".block-hidden-opener").click(function() {
					clearInterval(autoChange);
				});

				$(".slider-dotted__dot").click(function() {
					clearInterval(autoChange);
				});

				// Dots click
				$(dots).click(function(){
					$(sliderInner).css('transform', 'translate(0, 0)');
					$(dots).removeClass('slider-dotted__dot_active');
					$(this).addClass('slider-dotted__dot_active');
					let dotId = $(this).attr('id').replace('slider-dotted__dot_', '');
					slideNow = dotId;
					$(sliderSlide).hide();
					$(this).parents(".slider-dotted").find('#slider-dotted__slide_' + dotId).fadeIn(100);
				});
			}
        });
    }

    sliders();
});

