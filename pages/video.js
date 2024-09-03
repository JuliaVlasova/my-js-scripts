"use strict";

$(document).ready(function() {
    function tabClickController(tab) {
        $(tab).click(function() {
            let targetNumber = $(this).attr("id").split("-")[1];
            $(tab).removeClass("v-tabs__item_active");
            $(this).addClass("v-tabs__item_active");
            $(".v-tab-content").hide();
            $(".v-tab-content-" + targetNumber).show();
        });
    }

    tabClickController(".v-tabs__item");

    //show video details
    $(".text-block__details-link").click(function() {
        $(this).parents(".v-tab-content__block").find(".v-transcript").toggle();
    });

    //open category if url has hash
    let urlHash = window.location.hash;
    if(urlHash && $(urlHash).length !== 0) {
        let targetTabContent = $(urlHash);
        let targetTabArray = $(targetTabContent).attr("class").split("-");
        let targetTabNumber = targetTabArray[targetTabArray.length - 1];

        console.log(targetTabNumber);
        $(".v-tab-content").hide();
        $(targetTabContent).show();
        $(".v-tabs__item").removeClass("v-tabs__item_active");
        $("#tab-" + targetTabNumber).addClass("v-tabs__item_active");
    }
});