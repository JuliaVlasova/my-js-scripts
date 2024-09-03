"use strict";

window.onload = function() {
	$(".fancybox").click(function(e) {
		e.preventDefault();

		let currentSrcBig = $(this).attr('href');

		$("body").addClass("body-hidden");
		$(".fixed-inner-menu").addClass("block-hidden");
		$(".fancybox-overlay").show();
		$(".fancybox-image").attr("src", currentSrcBig);
	});

	$(document).mouseup(function (e) {
		let container = $(".fancybox-overlay");

		if(container.has(e.target).length === 0 && container.is(":visible")) {
			container.hide();
			$("body").removeClass("body-hidden");
			$(".fixed-inner-menu").removeClass("block-hidden");
		}
	});

	$(".tabs-block").each(function() {
		let tabList = $(this).find(".tabs-list");
		let tabItems = $(tabList).find("li");
		
		$(tabList).find(">:first-child").addClass("tabs-list__item_active");
		$(tabItems).each(function() {
			$(this).click(function(e) {
				e.preventDefault();

				$(tabItems).removeClass("tabs-list__item_active");
				$(this).addClass("tabs-list__item_active");

				handleTabsContent();
			});
		});
	});

	function handleTabsContent() {
		$(".tabs-content").each(function() {
			$(this).find(">div").hide();
			let activeTabHref = $(this).parents(".tabs-block").find(".tabs-list__item_active a").attr('href');
			$(activeTabHref).show();
		});
	}

	handleTabsContent();
}
