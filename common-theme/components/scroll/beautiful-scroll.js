"use strict";

$(document).ready(function() {
    $(".beautiful-scroll").each(function() {
        let targetId = $(this).attr('href');
        $(this).click(function() {
            $('html, body').animate({
                scrollTop: $(targetId).offset().top
            }, 1000);
        });
    });
});

