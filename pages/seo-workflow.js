$(document).ready(function () {
	function smallHiddenMenu(clickElemSelector, hiddenBlock) {
		var clickElem = $(clickElemSelector);
		var hiddenMenuBlock = $(hiddenBlock);
		clickElem.on('click', function () {
			if (hiddenMenuBlock.is(':hidden')) {
				hiddenMenuBlock.slideDown(200);
			} else {
				hiddenMenuBlock.slideUp(200);
			}
		});
		$(document).mouseup(function (e) {
			var container = hiddenMenuBlock;
			if (container.has(e.target).length === 0 && container.is(':visible')) {
				container.slideUp(200);
			}
		});
	}

	smallHiddenMenu('.workflow-menu-box_seo', '.workflow-mobile-menu_seo');

	function setDesktopMenuBehavior() {
		$(window).scroll(function () {
			let scrollTop = $(document).scrollTop();
			let stopPoint =
				$('.footer').offset().top - $('.seo-workflow-menu').outerHeight() - $('.header-top-bar').outerHeight();
			let stopPointSmallWidget = $('.footer').offset().top - $(window).height();

			if (scrollTop >= stopPoint) {
				$('.seo-workflow-menu').hide();
			} else {
				$('.seo-workflow-menu').show();
			}

			if (scrollTop >= stopPointSmallWidget) {
				if ($(window).height() > 870) {
					$('.mobile-hidden-workflow-widget').hide();
				}
			} else {
				if ($(window).height() > 870) {
					$('.mobile-hidden-workflow-widget').show();
				}
			}
		});
	}

	if ($(window).width() > 980) {
		if ($('.footer').length > 0) {
			setDesktopMenuBehavior();
		}
	}
});
