"use strict";

$(document).ready(function () {
    function slidesHandle() {
        $(".lp-tabs").each(function() {
            $(this).find(".lp-tabs__block").hide();
            let buttonActiveId = $(this).find(".lp-tabs__button_active").attr("id");
            let texts = $(this).find(".lp-tabs__block");
            for(let t = 0; t < texts.length; t++) {
                if($(texts[t]).attr("id").split("_").pop() == buttonActiveId) {
                    $(texts[t]).show();
                }
            }
        });
    }

    slidesHandle();

    $(".lp-tabs__button").click(function() {
        $(this).parents(".lp-tabs").find(".lp-tabs__button").removeClass("lp-tabs__button_active");
        $(this).addClass("lp-tabs__button_active");

        slidesHandle();
    });

    // FAQ collapse
    $('.lp-collapse__top').click(function(){
        $(this).parents('.lp-collapse').toggleClass('lp-collapse_collapsed').toggleClass('lp-collapse_uncollapsed').find('.lp-collapse__content').toggleClass('lp-collapse__content_open');
        $(this).find('.lp-collapse__arrow').toggleClass('lp-collapse__arrow_transformed');
    });
});

