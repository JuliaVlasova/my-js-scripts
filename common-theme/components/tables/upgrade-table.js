"use strict";

$(document).ready(function () {
    //Dropdown for individual products
	$(".lp-dropdown__top").click(function() {
        $(".lp-dropdown").toggleClass("lp-dropdown_opened");
        $(this).toggleClass("lp-dropdown__top_active");
    });

    $(".lp-dropdown__block").click(function() {
        let blockHtml = $(this).html();
        $(".lp-dropdown__block").removeClass("lp-dropdown__block_selected");
        $(this).addClass("lp-dropdown__block_selected");
        $(".lp-dropdown").removeClass("lp-dropdown_opened");
        $(".lp-dropdown__top").addClass("lp-dropdown__top_after-select").removeClass("lp-dropdown__top_active").html(blockHtml);
    });

    let clickMobileMenuController = function(box, container, activeBoxClass, activeContainerClass) {
		$(document).mouseup(function(e) {
			if (!$(container).is(e.target) && !$(box).is(e.target) && $(container).has(e.target).length === 0 && $(box).has(e.target).length === 0) {
				$(container).removeClass(activeContainerClass);
				$(box).removeClass(activeBoxClass);
			} else if ($(box).is(e.target)) {
				$(container).toggleClass(activeContainerClass);
				$(box).toggleClass(activeBoxClass);
			} 
		});
	}

    clickMobileMenuController(".lp-dropdown__top", ".lp-dropdown", "lp-dropdown__top_active", "lp-dropdown_opened");
    //Dropdown for individual products END

    //Show product
    function showProduct() {
        $(".lp-dropdown__block").click(function() {
            let dropdownId = $(this).attr("id").replace("#", "");
            $(".lp-standalone__product").hide().removeClass("lp-standalone__product_opened");
            $("#lp-standalone-" + dropdownId).show().addClass("lp-standalone__product_opened");
        });
    }

    function showProductOnDirectLink() {
        let hash = window.location.hash.replace("#", "");

		if (hash) {
            $(".lp-standalone__product").hide().removeClass("lp-standalone__product_opened");
            $("#lp-standalone-" + hash).show().addClass("lp-standalone__product_opened");
            $(".lp-dropdown__block_" + hash).click();

            $('html, body').animate({
                scrollTop: $(".lp-standalone").offset().top - 100
            }, 300);
		}
    }

    showProductOnDirectLink();
    showProduct();
});

