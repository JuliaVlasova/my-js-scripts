"use strict";

$(document).ready(function() {
	function showVideo() {
		let dataSrc = $("#firstScreenVideo").attr("data-src");
		$("#firstScreenVideo").fadeIn(300);
		$(".first-screen .pic_container").fadeOut(300);
		$("#firstScreenVideo").attr("src", dataSrc);
	}

	if($(window).width() >= 800) {
		setTimeout(showVideo, 3000);
	}
});

