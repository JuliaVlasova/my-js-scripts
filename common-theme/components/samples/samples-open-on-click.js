"use strict";

$(document).ready(function () {
	$(".block-hidden-opener").click(function() {
        let imgSrc = $(this).attr("data-image");
        $(".block-hidden").find(".block-hidden__image").attr("src", imgSrc);
        $(".block-hidden").addClass("block-hidden_opened");
    });

    $(".block-hidden__close").click(function() {
        $(this).parents(".block-hidden").removeClass("block-hidden_opened");
        $(this).parents(".block-hidden").find(".block-hidden__image").attr("src", '');
    });
});

