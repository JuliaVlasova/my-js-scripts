var downloadCallback = function (eventName, data) {
	if (data && data.success) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({'event': eventName});

		if (data.redirectUrl) {
			window.location.href = data.redirectUrl;
		}
	}
};

var getProductCallback = function (data) {
	downloadCallback('download_submit', data);
};

var getProductMobileCallback = function (data) {
	downloadCallback('download_mobile_submit', data);
};

$(document).ready(function () {
	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	$('.sps-menu-box').click(function () {
		$(".fixed-top-menu").toggleClass('sps-mobile-menu');
		$(".fixed-inner-menu").toggleClass('sps-mobile-menu');
		$(this).toggleClass('open');
	});

	// Mobile scripts
	if (isMobile.any() || $(window).width() < 980) {
		$('#search-icon').click(function () {
			window.location = '/search.html';
			return false;
		});
	} else {
		// Open search field

		var isSearchOpen = false;
		$('#search-icon').click(function () {
			if (isSearchOpen == false) {
				isSearchOpen = true;
				$("#search-field").animate({width: "250px"}, 0);
				$("#search-field").css({"padding": "3px 5px", "margin-left": "5px"});
				$(this).addClass('active');
				$("#search-field").focus();
			} else {
				$("#search-field").animate({width: "0"}, 0);
				$("#search-field").css({"padding": "3px 0", "margin-left": "0"});
				$(this).removeClass('active');
				isSearchOpen = false;
			}
		});

		$("#search-field").blur(function () {
			if ($("#search-field").val() == '') {
				$(this).animate({width: "0"}, 0);
				$("#search-field").css({"padding": "3px 0", "margin-left": "0"});
				$("#search-icon").removeClass('active');
				isSearchOpen = false;
			}
		});

		$('.search-icon-gray').click(function () {
			isSearchOpen = true;
			$("#search-field").animate({width: "250px"}, 500);
			$("#search-field").css({"padding": "3px 5px", "margin-left": "5px"});
			$(this).addClass('active');
			$("#search-field").focus();
		});

		// Fixed menus

		var menuFixed = $(".static-menu") || $(".dynamic-menu");
		var heightHeader = $(".header").height();

		var heightFixedMenu = menuFixed.innerHeight() + parseInt(menuFixed.css('margin-top'), 10);
		menuFixed.wrapAll("<div style='height: " + heightFixedMenu + "px; position: relative;'></div>");

		function fixedMenu(heightHeader, menu) {
			var scrollPage = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

			if (scrollPage > heightHeader && menu.hasClass("static-menu")) {
				menu.fadeOut('fast', function () {
					$(this).removeClass('static-menu').addClass('dynamic-menu').fadeIn('fast');
				});
			} else if (scrollPage <= heightHeader && menu.hasClass("dynamic-menu")) {
				menu.fadeOut('fast', function () {
					$(this).removeClass('dynamic-menu').addClass('static-menu').fadeIn('fast');
				});
			}
		}

		//fixedMenu(heightHeader, menuFixed);
		$(window).scroll(function () {
			fixedMenu(heightHeader, menuFixed);
		});
	}

	var fixedMenuMargin = 119;
	$(".fixed-box").wrapAll("<div class='fixed-group-widgets static-box'></div>");
	var widgetFixed = $(".fixed-group-widgets");


	if (widgetFixed.length) {
		var widgetTopMargin = widgetFixed.offset().top;

		function fixedWidget() {

			var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
			if (top + fixedMenuMargin > widgetTopMargin && widgetFixed.hasClass("static-box")) {

				widgetFixed.removeClass('static-box').addClass('dynamic-box');
			} else if (top + fixedMenuMargin <= widgetTopMargin && widgetFixed.hasClass("dynamic-box")) {
				widgetFixed.removeClass('dynamic-box').addClass('static-box');
			}
		}

		fixedWidget();
		$(window).scroll(function () {
			fixedWidget();
		});
	}

	/* Lang menu */

	$('.lang-menu').click(function () {
		$(this).toggleClass('active');
	});

	/* Stick menu */
	$(window).scroll(function () {
		if ($(this).width() <= 960) {
			if ($(this).scrollTop() > $(".header").height()) {
				$('.dropdown-nav-container').addClass("stick-menu");
			} else {
				$('.dropdown-nav-container').removeClass("stick-menu");
			}
		}
	});
	/* Top menu and content display when resizing window */
	$(window).resize(function () {
		if ($(this).width() <= 960) {
			$(".fixed-top-menu").parent().css("height", "auto");
		}
	});

	/* tooltip */
	$(".tooltip-txt").mouseenter(function() {
        $(this).find(".tooltiptext").show();
    });
    $(".tooltip-txt").mouseleave(function() {
        $(this).find(".tooltiptext").hide();
	});


	$(".toggle-link-block").click(function () {
        $(this).parent().next().slideToggle();
        $(this).prev().toggleClass('arr-down');
    });

	/* popup */
	$(".additional-info-overlay_open").slideDown(200);

	$(".popup-opener").click(function() {
		$(".additional-info-overlay").slideDown(200);
		return false;
	});

	$(document).keyup(function (e) {
		if(e.key === "Escape") {
			$(".additional-info-overlay").slideUp(200);
			$(".additional-info-overlay .popup-additional-info").hide();
		}
	});

	$(".popup-additional-info__close").click(function() {
		$(".additional-info-overlay").slideUp(200);
	});

});
