"use strict";

$(document).ready(function () {
	// Search
	let searchDesktopController = function() {
		let isSearchOpen = false;

		$(".top-menu__close-icon").click(function() {
			$(this).fadeOut();
			$(".top-menu__search-field").focus();
			$(".top-menu__search-field").val('');
			$(".top-menu__search-field_active").removeClass("top-menu__search-field_active_with-text");
		});

		$(".top-menu__search-field").blur(function() {
			if ($(".top-menu__search-field").val() == '') {
				$(this).removeClass("top-menu__search-field_active");
				$(".top-menu__search-icon").removeClass("top-menu__search-icon_active");
				$(".top-menu__close-icon").fadeOut();
				$(".top-menu__search-field_active").removeClass("top-menu__search-field_active_with-text");
				isSearchOpen = false;
				if($(window).width() >= 800 && $(window).width() < 1450) {
					$(".top-menu__menu").show(300);
				}
			}
		});

		$(".top-menu__search-icon").click(function() {
			isSearchOpen = true;
			$(".top-menu__search_desktop").addClass("top-menu__search_desktop_width-auto");
			$(".top-menu__search-field").addClass("top-menu__search-field_active");
			$(this).addClass("top-menu__search-icon_active");
			$(".top-menu__search-field").focus();
			if($(window).width() >= 800 && $(window).width() < 1450) {
				$(".top-menu__menu").hide(300);
			}
		});

		$(".top-menu__search-field").on('input', function() {
			if ($(this).val() !== '') {
				$(".top-menu__close-icon").fadeIn();
				$(".top-menu__search-field_active").addClass("top-menu__search-field_active_with-text");
			} else {
				$(".top-menu__close-icon").fadeOut();
				$(".top-menu__search-field_active").removeClass("top-menu__search-field_active_with-text");
			}
		});
	}

	if($(window).width() >= 800) {
		searchDesktopController();
	}

	let clickMobileMenuController = function(box, container, activeBoxClass, activeContainerClass) {
		$(box).click(function(e) {
			e.stopPropagation();
			if($(box).hasClass(activeBoxClass)) {
				$(".top-menu__blur").show();
			} else {
				$(".top-menu__blur").hide();
			}
		});

		$(container).click(function() {
			if($(container).hasClass(activeContainerClass)) {
				$(".top-menu__blur").show();
			} else {
				$(".top-menu__blur").hide();
			}
		});

		$(document).mouseup(function(e) {
			if (!$(container).is(e.target) && !$(box).is(e.target) && $(container).has(e.target).length === 0 && $(box).has(e.target).length === 0) {
				$(container).removeClass(activeContainerClass);
				$(box).removeClass(activeBoxClass);
				$(".top-menu__blur").hide();
			} else if ($(box).is(e.target) || $(box).find('use').is(e.target)) {
				$(container).toggleClass(activeContainerClass);
				$(box).toggleClass(activeBoxClass);
			} 
		});
	}

	if($(window).width() < 1280) {
		// Main Menu
		clickMobileMenuController(".top-menu-box", ".top-menu__inner", "top-menu-box_opened", "top-menu__inner_opened");
		
		if($(window).width() < 800) {
			// Lang Menu
			clickMobileMenuController(".h-lang-mobile", ".top-menu__hidden-list", "h-lang-mobile_active", "top-menu__hidden-list_opened");
		} 
	} 

	let dropdownMobileController = function() {
		$(".top-dropdown").click(function() {
			$(this).find(".top-dropdown__content").toggle(300);
			$(this).find(".top-dropdown__inner").toggleClass("top-dropdown__inner_active");
			$(this).toggleClass("top-dropdown_active");
		});
	}

	if($(window).width() < 1280) {
		dropdownMobileController();
	}
});

