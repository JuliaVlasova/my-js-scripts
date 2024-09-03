"use strict";

$(document).ready(function () {
    $('.lp-collapse__top').click(function(){
        $(this).parents('.lp-collapse').toggleClass('lp-collapse_collapsed').toggleClass('lp-collapse_uncollapsed').find('.lp-collapse__content').toggleClass('lp-collapse__content_open');
        $(this).find('.lp-collapse__arrow').toggleClass('lp-collapse__arrow_transformed');
		$(this).find('.lp-collapse__tip').toggleClass('lp-collapse__tip_active');
    });
});

