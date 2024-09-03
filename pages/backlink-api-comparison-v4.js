"use strict";

$(document).ready(function() {
    $(".section").height("auto");
    $(".fp-tableCell").height("auto");

    if($(window).width() > 1600 || $(window).height() > 900) {
        $('#fullpage').fullpage({
            anchors: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11'],
            menu: '#menu',
            css3: true,
            scrollingSpeed: 1000,
            responsiveWidth:1600,
            responsiveHeight:900,
            normalScrollElements: '.lp-footer'
        });
    }
});
