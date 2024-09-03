"use strict";

window.onload = function() {
	var toggleFlag = true;

	$(".toggle-link").click(function() {
		if (toggleFlag) {
			$(this).next(".toggle-block").slideToggle("fast", function() {
				$(this).prev(".toggle-link").children(".icon-menu").toggleClass("open");
			});
		}
	});

	$(".open-link").click(function() {
		toggleFlag = false;
		setTimeout(function () {
			toggleFlag = true;
		}, 1000);
		$(".order-separately").show();
		$(".icon-menu", $(".order-separately").prev()).addClass("open");
	});

	/* change button indent in price tables */
	function freeButtonIndent(tableWrapper) {
		$(tableWrapper).each(function(){
			var tablePriceOld = $(this).find(".price-old");
			if(tablePriceOld.length && tablePriceOld.text().trim() != "") {
				$(this).find(".free.upgrade-table .upgrade-table-body").addClass("upgrade-table-body_indent");
			} else {
				$(this).find(".free.upgrade-table .upgrade-table-body").removeClass("upgrade-table-body_indent");
			}
		});
	}

	freeButtonIndent(".order-separately");
	freeButtonIndent(".upgrade-table-container");
}();
