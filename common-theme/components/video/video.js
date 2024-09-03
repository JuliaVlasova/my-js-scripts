"use strict";

window.onload = function() {
	$(".lp-video-block").click(function() {
		if($(".lp-video-block__image").is(":visible")) {
			if($(".lp-video-block__image").hasClass("lp-video-block__image_mobile")) {
				$(".lp-video-block__image").hide();
				$(".lp-video-block__main").show();
				$(".lp-video-block__main iframe")[0].src += "?autoplay=1";

				if($(window).width() < 600) {
					$(".lp-video-block__main iframe").show();
				}
			} else {
				if($(window).width() >= 600) {
					$(".lp-video-block__image").hide();
					$(".lp-video-block__main").show();
					$(".lp-video-block__main iframe")[0].src += "?autoplay=1";
				}
			}
		}
	});	
}
