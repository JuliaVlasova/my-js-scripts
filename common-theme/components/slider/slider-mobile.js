"use strict";

function handleSrollThumb(elem) {
	let swipeLine = $(this).find(".slider-mobile__inner");
	let sliderThumbBlock = $(this).find(".scroll-thumb__block");
	let scrolledBlock = $(this).find(".slider-mobile__outer");
	let sliderThumb = $(this).find(".scroll-thumb");

	function setScrollThumbWidth() {
		let scrollBarWidth = $(sliderThumb).width() * ($(sliderThumb).width() / $(swipeLine).width());
		$(sliderThumbBlock).css('width', scrollBarWidth  + "px");
	}

	setScrollThumbWidth();

	$(window).on('resize', function() {
		setScrollThumbWidth();
	});

	$(scrolledBlock).scroll(function() {
		$(sliderThumbBlock).css("left", $(this).scrollLeft() / ($(swipeLine).width() / $(sliderThumb).width()) + "px");
	});
} 

$(document).ready(function () {
	$(".slider-mobile").each(function() {
		//slider dots
		let swipeLine = $(this).find(".slider-mobile__inner");
		let sliderBlocks = $(this).find(".slider-mobile__inner").children();
		let sliderNav = $(this).find(".slider-mobile-nav");
		let sliderThumb = $(this).find(".scroll-thumb");
		
		let dot = "<div class='slider-mobile-nav__dot'></div>";
		let lineWidth = $(swipeLine).outerWidth();
		let windowWidth = $(window).width();
		let trBoolean = $(this).find(".slider-mobile__inner tr").length > 0;
		let lastTr;
		let sliderBlocksLength;

		if(trBoolean) {
			sliderBlocks = $(this).find(".slider-mobile__inner tr").children();
			let firstTrWidth = $(this).find(".slider-mobile__inner tr").first().outerWidth();
			lastTr = $(this).find(".slider-mobile__inner tr").last();
			sliderBlocksLength = $(this).find(".slider-mobile__inner tr").length;
			lineWidth = firstTrWidth * sliderBlocksLength;
		}
		
		if($(window).width() < 1280) {
			for(let i = 0; i < sliderBlocks.length; i++) {
				$(sliderNav).append(dot);
				$(sliderBlocks[i]).attr("id", "slider-mobile__block_" + i);
			}

			let dots = $(sliderNav).find(".slider-mobile-nav__dot");

			for(let d = 0; d < dots.length; d++) {
				$(dots[d]).attr("id", "slider-mobile-nav__dot_" + d);
			}

			$(sliderNav).find("#slider-mobile-nav__dot_0").addClass("slider-mobile-nav__dot_active");

			function handleTouchMove() {
				for(let i = 0; i < sliderBlocks.length; i++) {
					setTimeout(function() {if($(sliderBlocks[i]).position().left > -$(sliderBlocks[i]).outerWidth() && $(sliderBlocks[i]).position().left < 21 ) {
						let idActive = i;
						let idActiveLast = sliderBlocks.length - 1;
						let activeDot = "#slider-mobile-nav__dot_" + idActive;
						let activeDotLast = "#slider-mobile-nav__dot_" + idActiveLast;

						let blockWidth = $(sliderBlocks[i]).outerWidth();
						let lineOffset = Math.ceil(-$(swipeLine).offset().left);
						let slidesInWindow = windowWidth / blockWidth;
						let presumableOffset = lineWidth - slidesInWindow * blockWidth;

						if(trBoolean) {
							lineOffset = Math.ceil(-$(lastTr).offset().left) * sliderBlocksLength;
							presumableOffset = lineWidth - slidesInWindow * blockWidth * sliderBlocksLength;
						}

						$(sliderNav).find(".slider-mobile-nav__dot").removeClass("slider-mobile-nav__dot_active");
						$(sliderNav).find(activeDot).addClass("slider-mobile-nav__dot_active");
						
						if(presumableOffset <= lineOffset) {
							$(sliderNav).find(".slider-mobile-nav__dot").removeClass("slider-mobile-nav__dot_active");
							$(sliderNav).find(activeDotLast).addClass("slider-mobile-nav__dot_active");
						}
					}}, 500);
				}
			}

			if($(sliderNav).length > 0) {
				if($(window).width() < 800) {
					$(swipeLine).on("touchmove", function() {
						handleTouchMove();
					});
				}
			}

			if($(sliderThumb).length > 0) {
				handleSrollThumb.call(this);
			}
		} 
	});
});

