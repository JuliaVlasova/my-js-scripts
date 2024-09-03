"use strict";

window.onload = function() {
    //popup
    $(".popup-opener").click(function() {
		$(".overlay").slideDown(200);
		$("body").addClass("body-hidden");
        
		return false;
	});

    $('.popup__close').click(function(){
        $(".overlay").slideUp(200);
        $('body').removeClass('body-hidden');
    });
	
	$(document).mouseup(function (e) {
		var container = $(".overlay");

		if(container.has(e.target).length === 0 && container.is(":visible")) {
			container.slideUp(200);
			$("body").removeClass("body-hidden");
		}
	});


	//slider dots
	let sliderBlocks = $(".lp-use-cases").find(".lp-use-cases__block");
	let dot = "<div class='lp-slider-nav__dot'></div>";
	
	if($(window).width() < 600) {
		for(let i = 0; i < sliderBlocks.length; i++) {
			$(".lp-slider-nav").append(dot);
			$(sliderBlocks[i]).attr("id", "lp-use-cases__block_" + i);
		}

		let dots = $(".lp-slider-nav").find(".lp-slider-nav__dot");

		for(let d = 0; d < dots.length; d++) {
			$(dots[d]).attr("id", "lp-slider-nav__dot_" + d);
		}

		$("#lp-slider-nav__dot_0").addClass("lp-slider-nav__dot_active");

		$(".lp-use-cases_swipe").on("touchmove", function() {
			function handleTouchMove() {
				for(let i = 0; i < sliderBlocks.length; i++) {
                    setTimeout(function() {if($(sliderBlocks[i]).position().left > -$(sliderBlocks[i]).outerWidth() && $(sliderBlocks[i]).position().left < 21 ) {
						let idActive = i;
						let idActiveLast = sliderBlocks.length - 1;
						let activeDot = "#lp-slider-nav__dot_" + idActive;
						let activeDotLast = "#lp-slider-nav__dot_" + idActiveLast;
	
						$(".lp-slider-nav__dot").removeClass("lp-slider-nav__dot_active");
						$(activeDot).addClass("lp-slider-nav__dot_active");
	
						if(-$(".lp-use-cases_swipe").offset().left > $(".lp-use-cases_swipe").outerWidth() - 2 * $(sliderBlocks[i]).outerWidth()) {
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
 
