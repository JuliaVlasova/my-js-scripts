"use strict";

$(document).ready(function () {
    $(".popup-opener").click(function() {
        let thisId = $(this).attr("id").replace("popup-opener_","");
        $("body").addClass("noscroll");
        if($(window).width() >= 1280) {
            $("html").css("overflow", "hidden");
        }
        $(".popup-window").fadeIn(300);
        $(".popup-overlay").fadeIn(200);
        $("#download-" + thisId).fadeIn(400);
    });

    $(".popup-window__close").click(function() {
        if (window.downloadForm) {
            window.downloadForm.clearErrors();
        }

        $("body").removeClass("noscroll");
        $(".popup-overlay").fadeOut(200);
        $(".popup-window").hide();
        if($(window).width() >= 1280) {
            $("html").css({
                'overflow' : 'visible',
                'overflow-x' : 'hidden'
            });
        }
    });
});
