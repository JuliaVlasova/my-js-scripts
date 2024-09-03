"use strict";

$(document).ready(function () {
    $(".toggle-block__title").click(function(){
        $(this).toggleClass("toggle-block__title_active");
        $(this).next().toggleClass("toggle-block__content_opened");
    });
});

