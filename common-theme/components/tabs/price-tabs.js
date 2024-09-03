"use strict";

$(document).ready(function () {
    let tab = $('.plan-tabs').find('.plan-tabs__block');
    let planSection = $('.plan-section');

    let pricePro = $(planSection).find('.price-pro');
    let priceEnt = $(planSection).find('.price-ent');
   
    let pricePro1 = $(planSection).find('.price-pro-year-1').html();
    let pricePro2 = $(planSection).find('.price-pro-year-2').html();
    let pricePro3 = $(planSection).find('.price-pro-year-3').html();
    let priceEnt1 = $(planSection).find('.price-ent-year-1').html();
    let priceEnt2 = $(planSection).find('.price-ent-year-2').html();
    let priceEnt3 = $(planSection).find('.price-ent-year-3').html();

    let topButtonPro = $(planSection).find('.product-block__button_pro');
    let topButtonEnt = $(planSection).find('.product-block__button_ent');

    let topButtonPro1 = $(planSection).find('.product-block__button_pro-year-1').html();
    let topButtonPro2 = $(planSection).find('.product-block__button_pro-year-2').html();
    let topButtonPro3 = $(planSection).find('.product-block__button_pro-year-3').html();
    let topButtonEnt1 = $(planSection).find('.product-block__button_ent-year-1').html();
    let topButtonEnt2 = $(planSection).find('.product-block__button_ent-year-2').html();
    let topButtonEnt3 = $(planSection).find('.product-block__button_ent-year-3').html();

    let year1 = {
        picePro: pricePro1,
        priceEnt: priceEnt1,
        topButtonPro: topButtonPro1,
        topButtonEnt: topButtonEnt1,
    }

    let year2 = {
        picePro: pricePro2,
        priceEnt: priceEnt2,
        topButtonPro: topButtonPro2,
        topButtonEnt: topButtonEnt2,
    }

    let year3 = {
        picePro: pricePro3,
        priceEnt: priceEnt3,
        topButtonPro: topButtonPro3,
        topButtonEnt: topButtonEnt3,
    }

    $(tab).click(function() {
        $(tab).removeClass('plan-tabs__block_active');
        $(this).addClass('plan-tabs__block_active');

        if($(this).hasClass('plan-tabs__block_1')) {
            $(pricePro).html(year1.picePro);
            $(priceEnt).html(year1.priceEnt);
            $(topButtonPro).html(year1.topButtonPro);
            $(topButtonEnt).html(year1.topButtonEnt);
        } else if($(this).hasClass('plan-tabs__block_2')) {
            $(pricePro).html(year2.picePro);
            $(priceEnt).html(year2.priceEnt);
            $(topButtonPro).html(year2.topButtonPro);
            $(topButtonEnt).html(year2.topButtonEnt);
        } else {
            $(pricePro).html(year3.picePro);
            $(priceEnt).html(year3.priceEnt);
            $(topButtonPro).html(year3.topButtonPro);
            $(topButtonEnt).html(year3.topButtonEnt);
        }
    });
});

