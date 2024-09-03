"use strict";

$(document).ready(function () {
    $(".open-link").click(function() {
        toggleFlag = false;
        setTimeout(function () {
            toggleFlag = true;
        }, 1000);
        $(".lp-standalone .lp-dropdown__top").click();
    });
});

