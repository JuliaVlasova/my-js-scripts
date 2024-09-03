"use strict";

$(document).ready(function () {
    $('.sps-menu-box').click(function () {
		$(".container-top-menu").toggleClass('sps-mobile-menu');
		$(this).add('open');
	});

    $(document).mouseup(function (e) {
        let container = $(".container-top-menu");
        if (container.has(e.target).length === 0 && container.is(":visible")) {
            $(container).removeClass('sps-mobile-menu');
		    $('.sps-menu-box').removeClass('open');
        }
    });
});
