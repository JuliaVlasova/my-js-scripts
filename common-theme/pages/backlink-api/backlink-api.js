"use strict";

let showModalOverlay = function () {
	$(".popup-overlay").fadeIn(200);
	$("body").addClass("noscroll");
};
let hideModalOverlay = function () {
	$(".popup-window").hide();
	$("body").removeClass("noscroll");
	$(".popup-overlay").fadeOut(200);
};

let modalMainForm = function () {
	$(".main-form__form").insertAfter("#main-form-child");
	$(".main-form__modal").val(1);
	$(".main-form__button").text("Get my trial");
	$(".popup-window_form").fadeIn(400);
};
let inlineMainForm = function () {
	$(".main-form__form").insertAfter("#main-form-parent");
	$(".main-form__modal").val(0);
	$(".main-form__button").text("Send request");
};

$(document).ready(function() {
	if (typeof mainFormIsModal !== 'undefined' && mainFormIsModal) {
		modalMainForm();
		showModalOverlay();
	}

	$(".popup-opener_form").click(function() {
		modalMainForm();
		showModalOverlay();
	});

	$(".popup-opener_table").click(function() {
		$(".popup-window_table").fadeIn(400);
		showModalOverlay();
	});

	$(".popup-window__close_form").click(function() {
		hideModalOverlay();
		inlineMainForm();
	});

	$(".popup-window__close_table").click(function() {
		hideModalOverlay();
		$(".popup-window_table").hide();
	});

	//video fading
	let myVideoPlayer = document.getElementById('firstScreenVideo');

	function playVideo(e) {
		e.play();
		e.classList.remove('fading');
		setTimeout(() => {
			e.classList.add('fading');
		}, (e.duration / e.playbackRate - 1) * 1000)
	}

	myVideoPlayer.oncanplay = function() {
		if($(window).width() >= 800) {
			playVideo(myVideoPlayer);
		}
	}

	myVideoPlayer.onended = function() {
		if($(window).width() >= 800) {
			playVideo(myVideoPlayer);
		}
	}
});
