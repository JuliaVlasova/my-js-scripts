"use strict";

$(document).ready(function () {
    $(".lp-upgrade-top .open-link").click(function() {
        toggleFlag = false;
        setTimeout(function () {
            toggleFlag = true;
        }, 1000);
        $(".lp-standalone .toggle-block__title").click();
    });
});

