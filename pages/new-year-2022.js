"use strict";

function pageJump(h) {
	let top = document.getElementById(h).offsetTop;
	window.scrollTo(0, top);
}

$(document).ready(function () {
	if ($(window).width() > 1600 || $(window).height() > 900) {
		$('#fullpage').fullpage({
			anchors: ['block1', 'block2', 'block3', 'block4'],
			menu: '#menu',
			css3: true,
			scrollingSpeed: 1000,
			responsiveWidth: 1600,
			responsiveHeight: 900,
			normalScrollElements: '.lp-congrats-scroll'
		});
	}

	$(".lp-go-button").click(function () {
		pageJump('block_2');
	});

	$(".lp-button-scroll").click(function () {
		pageJump('block_4');
	});

	$(".lp-button-confirm").click(function () {
		pageJump('block_3');
	});

	$(".lp-go-button-1").click(function () {
		pageJump('block_3');
	});

	let getUrlParameter = function getUrlParameter(sParam) {
		let sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
		return false;
	};

	let emailParam = getUrlParameter('email');
	let nameParam = getUrlParameter('name');

	if (nameParam) {
		$("#user-name").text(", " + nameParam);
	}

	if (emailParam) {
		$("#subscribeform-email").val(emailParam);
		$(".lp-email-form").hide();
		$(".lp-email-string").show();
		$(".lp-email-string__email").text(emailParam);
	}

	$(".lp-email-string__change").click(function () {
		$(".lp-email-form").fadeIn();
		$(".lp-email-string").hide();
	});

	function getRandomImage() {
		let images = $(".lp-randomiser__container").find('img');
		let index = (typeof selectedShareImage !== 'undefined') ? selectedShareImage : Math.floor(Math.random() * images.length);
		return images[index];
	}

	function startRandomizer() {
		let image = getRandomImage();

		$(".lp-randomiser__container img").show();
		$(".lp-randomiser__container").addClass("lp-randomiser__container_animated");
		$(image).remove().appendTo(".lp-randomiser__container");
		setTimeout(function () {
			$(".lp-randomiser__social-buttons").addClass("lp-randomiser__social-buttons_animated");
		}, 1000);
		setTimeout(function () {
			$(".lp-randomiser__share-info").addClass("lp-randomiser__share-info_visible");
		}, 2000);
	}

	$(".lp-randomiser__button").click(function () {
		let subscribeForm = $("#subscribe_form");
		let randomiserButton = $(this);
		let shadowBlock = $(".lp-randomiser__block_inner-shadow");

		subscribeForm.submit();

		subscribeForm.on('afterValidate', function(event) {
			pageJump('block3');
			randomiserButton.fadeOut();
			shadowBlock.show();
			startRandomizer();
		});
	});
}); 
