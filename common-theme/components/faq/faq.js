"use strict";

$(document).ready(function () {
    $(".faq-block__title").click(function(){
        $(this).toggleClass("faq-block__title_active");
        $(this).next().toggleClass("faq-block__text_opened");
    });
});

