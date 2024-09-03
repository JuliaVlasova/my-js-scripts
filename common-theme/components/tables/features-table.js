"use strict";

$(document).ready(function () {
    if($(window).width() <= 1230) {
        $(".colspan-mobile").attr("colspan", "2");
    }

    function activateTopScroll() {
        $(".table-wrapper_top-scrollbar").each(function() {
            $(this).scroll(function(){
                $(this).parent().find(".table-wrapper_main-scrollbar").scrollLeft($(this).scrollLeft());
            });
        });
    }

    function activateMainScroll() {
        $(".table-wrapper_main-scrollbar").each(function() {
            $(this).scroll(function(){
                $(this).parent().find(".table-wrapper_top-scrollbar").scrollLeft($(this).scrollLeft());
            });
        });
    }

    function activateIosScroll() {
        let scrollIosBarWidth = ($(window).width() - 40) / ($(".lightpro-table").width() / ($(window).width() - 40));
        $(".damn-ios-crutch").css('width', scrollIosBarWidth + "px");

        $(window).on('resize', function() {
            let scrollIosBarWidth = ($(window).width() - 40) / ($(".lightpro-table").width() / ($(window).width() - 40));
            $(".damn-ios-crutch").css('width', scrollIosBarWidth + "px");
        });

        $(".damn-ios-crutch").each(function() {
            let mainParent = $(this).parents(".table-ios-parent");
            $(mainParent).find(".table-wrapper_main-scrollbar").scroll(function(){
                $(mainParent).find(".damn-ios-crutch").css("left", $(this).scrollLeft() / ($(".lightpro-table").width() / ($(window).width() - 40)) + "px");
            });
        });
    }

    if($(window).width() <= 1140) { //1075
        activateTopScroll();
        activateMainScroll();
        if($(".damn-ios-crutch").is(":visible")) {
            activateIosScroll();
        }
    }
});

