"use strict";

$(document).ready(function () {
    let tab = $('.plan-tabs').find('.plan-tabs__block');
    let planSection = $('.plan-tabs').next('.plan-section');

    let selectTab = $('.plan-tabs-select').find('.plan-tabs-select__block');
    let selectSection = $('.plan-tabs-select').next('.select-section');
    let selectDiscount = (".sale-discount");

    let selectSectionSavePro = $(selectSection).find(".select-section_save_pro");
    let selectSectionSaveEnt = $(selectSection).find(".select-section_save_ent");
    let selectPricePro = $(selectSection).find(".select-price_pro");
    let selectPriceEnt = $(selectSection).find(".select-price_ent");
    let orderButtonPro = $(selectSection).find(".order-button_pro");
    let orderButtonEnt = $(selectSection).find(".order-button_ent");

    let orderButtonPro1 = $('.order-button__button_pro-year-1').html();
    let orderButtonPro2 = $('.order-button__button_pro-year-2').html();
    let orderButtonPro3 = $('.order-button__button_pro-year-3').html();
    let orderButtonEnt1 = $('.order-button__button_ent-year-1').html();
    let orderButtonEnt2 = $('.order-button__button_ent-year-2').html();
    let orderButtonEnt3 = $('.order-button__button_ent-year-3').html();

    let pricePro = $(planSection).find('.price-pro');
    let priceEnt = $(planSection).find('.price-ent');
    let pricePro1 = $(planSection).find('.price-pro-year-1').html();
    let pricePro2 = $(planSection).find('.price-pro-year-2').html();
    let pricePro3 = $(planSection).find('.price-pro-year-3').html();
    let priceEnt1 = $(planSection).find('.price-ent-year-1').html();
    let priceEnt2 = $(planSection).find('.price-ent-year-2').html();
    let priceEnt3 = $(planSection).find('.price-ent-year-3').html();

    let savePro = $(planSection).find('.save-block_pro');
    let saveEnt = $(planSection).find('.save-block_ent');
    let savePro1 = $(planSection).find('.save-pro-year-1').html();
    let savePro2 = $(planSection).find('.save-pro-year-2').html();
    let savePro3 = $(planSection).find('.save-pro-year-3').html();
    let saveEnt1 = $(planSection).find('.save-ent-year-1').html();
    let saveEnt2 = $(planSection).find('.save-ent-year-2').html();
    let saveEnt3 = $(planSection).find('.save-ent-year-3').html();

    let oneDayOfferPro = $(planSection).find('.one-day-offer_pro');
    let oneDayOfferEnt = $(planSection).find('.one-day-offer_ent');
    let oneDayOfferPro1 = $(planSection).find('.one-day-offer-pro-year-1').html();
    let oneDayOfferPro2 = $(planSection).find('.one-day-offer-pro-year-2').html();
    let oneDayOfferPro3 = $(planSection).find('.one-day-offer-pro-year-3').html();
    let oneDayOfferEnt1 = $(planSection).find('.one-day-offer-ent-year-1').html();
    let oneDayOfferEnt2 = $(planSection).find('.one-day-offer-ent-year-2').html();
    let oneDayOfferEnt3 = $(planSection).find('.one-day-offer-ent-year-3').html();

    let topButtonPro = $(planSection).find('.product-block__button_pro');
    let topButtonEnt = $(planSection).find('.product-block__button_ent');
    let topButtonPro1 = $(planSection).find('.product-block__button_pro-year-1').html();
    let topButtonPro2 = $(planSection).find('.product-block__button_pro-year-2').html();
    let topButtonPro3 = $(planSection).find('.product-block__button_pro-year-3').html();
    let topButtonEnt1 = $(planSection).find('.product-block__button_ent-year-1').html();
    let topButtonEnt2 = $(planSection).find('.product-block__button_ent-year-2').html();
    let topButtonEnt3 = $(planSection).find('.product-block__button_ent-year-3').html();
    
    let orderTableLinkPro = $(".order-link_pro");
    let orderTableLinkEnt = $(".order-link_ent");
    let orderTableLinkPro1 = $(".order-link_pro-year-1").html();
    let orderTableLinkPro2 = $(".order-link_pro-year-2").html();
    let orderTableLinkPro3 = $(".order-link_pro-year-3").html();
    let orderTableLinkEnt1 = $(".order-link_ent-year-1").html();
    let orderTableLinkEnt2 = $(".order-link_ent-year-2").html();
    let orderTableLinkEnt3 = $(".order-link_ent-year-3").html();

    let discount = $(planSection).find('.discount-number');
    let discountToChange = $('.lp-wrapper').find('.discount-year-1').html();

    let year1 = {
        picePro: pricePro1,
        priceEnt: priceEnt1,
        savePro: savePro1,
        saveEnt: saveEnt1,
        oneDayOfferPro: oneDayOfferPro1,
        oneDayOfferEnt: oneDayOfferEnt1,
        topButtonPro: topButtonPro1,
        topButtonEnt: topButtonEnt1,
        orderTableLinkPro: orderTableLinkPro1,
        orderTableLinkEnt: orderTableLinkEnt1,
        orderButtonPro: orderButtonPro1,
        orderButtonEnt: orderButtonEnt1,
        discount: discountToChange,
    }

    let year2 = {
        picePro: pricePro2,
        priceEnt: priceEnt2,
        savePro: savePro2,
        saveEnt: saveEnt2,
        oneDayOfferPro: oneDayOfferPro2,
        oneDayOfferEnt: oneDayOfferEnt2,
        topButtonPro: topButtonPro2,
        topButtonEnt: topButtonEnt2,
        orderButtonPro: orderButtonPro2,
        orderButtonEnt: orderButtonEnt2,
        orderTableLinkPro: orderTableLinkPro2,
        orderTableLinkEnt: orderTableLinkEnt2,
        discount: '78%',
    }

    let year3 = {
        picePro: pricePro3,
        priceEnt: priceEnt3,
        savePro: savePro3,
        saveEnt: saveEnt3,
        oneDayOfferPro: oneDayOfferPro3,
        oneDayOfferEnt: oneDayOfferEnt3,
        topButtonPro: topButtonPro3,
        topButtonEnt: topButtonEnt3,
        orderButtonPro: orderButtonPro3,
        orderButtonEnt: orderButtonEnt3,
        orderTableLinkPro: orderTableLinkPro3,
        orderTableLinkEnt: orderTableLinkEnt3,
        discount: '82%',
    }

    let controlSelectButtons = function() {
        if($(window).width() < 960) {
            $(".lp-hidden-block-lg .product-link.order-link").text("GET LICENSE");
        } else {
            if($("#radio-pro1").is(':checked')) {
                $(".select-section .order-button.order-button_pro .order-link").removeClass('hide');
                $(".select-section .order-button.order-button_ent .order-link").addClass('hide');
            } else {
                $(".select-section .order-button.order-button_pro .order-link").addClass('hide');
                $(".select-section .order-button.order-button_ent .order-link").removeClass('hide');
            }
        }
    }

    $(".label-pro label").click(function() {
        if($(window).width() >= 960) {
            $(".select-section .order-button.order-button_pro .order-link").addClass('hide');
            $(".select-section .order-button.order-button_ent .order-link").removeClass('hide');
        }
    });

    $(".label-ent label").click(function() {
        if($(window).width() >= 960) {
            $(".select-section .order-button.order-button_pro .order-link").removeClass('hide');
            $(".select-section .order-button.order-button_ent .order-link").addClass('hide');
        }
    });

    $(tab).click(function() {
        $(tab).removeClass('plan-tabs__block_active');
        $(this).addClass('plan-tabs__block_active');

        if($(this).hasClass('plan-tabs__block_1')) {
            $(pricePro).html(year1.picePro);
            $(priceEnt).html(year1.priceEnt);
            $(savePro).html(year1.savePro);
            $(saveEnt).html(year1.saveEnt);
            $(oneDayOfferPro).html(year1.oneDayOfferPro);
            $(oneDayOfferEnt).html(year1.oneDayOfferEnt);
            $(topButtonPro).html(year1.topButtonPro);
            $(topButtonEnt).html(year1.topButtonEnt);
            $(discount).html(year1.discount);
        } else if($(this).hasClass('plan-tabs__block_2')) {
            $(pricePro).html(year2.picePro);
            $(priceEnt).html(year2.priceEnt);
            $(savePro).html(year2.savePro);
            $(saveEnt).html(year2.saveEnt);
            $(oneDayOfferPro).html(year2.oneDayOfferPro);
            $(oneDayOfferEnt).html(year2.oneDayOfferEnt);
            $(topButtonPro).html(year2.topButtonPro);
            $(topButtonEnt).html(year2.topButtonEnt);
            $(discount).html(year2.discount);
        } else {
            $(pricePro).html(year3.picePro);
            $(priceEnt).html(year3.priceEnt);
            $(savePro).html(year3.savePro);
            $(saveEnt).html(year3.saveEnt);
            $(oneDayOfferPro).html(year3.oneDayOfferPro);
            $(oneDayOfferEnt).html(year3.oneDayOfferEnt);
            $(topButtonPro).html(year3.topButtonPro);
            $(topButtonEnt).html(year3.topButtonEnt);
            $(discount).html(year3.discount);
        }
    });

    $(".table-dropdown__block").click(function() {
        if($(this).hasClass('table-dropdown__block_1')) {
            $(orderTableLinkPro).html(year1.orderTableLinkPro);
            $(orderTableLinkEnt).html(year1.orderTableLinkEnt);
        } else if($(this).hasClass('table-dropdown__block_2')) {
            $(orderTableLinkPro).html(year2.orderTableLinkPro);
            $(orderTableLinkEnt).html(year2.orderTableLinkEnt);
        } else {
            $(orderTableLinkPro).html(year3.orderTableLinkPro);
            $(orderTableLinkEnt).html(year3.orderTableLinkEnt);
        }
    });

    $(selectTab).click(function() {
        $(selectTab).removeClass('plan-tabs-select__block_active');
        $(this).addClass('plan-tabs-select__block_active');

        if($(this).hasClass('plan-tabs-select__block_1')) {
            $(selectDiscount).html(year1.discount);
            $(selectSectionSavePro).html(year1.savePro);
            $(selectSectionSaveEnt).html(year1.saveEnt);
            $(selectPricePro).html(year1.picePro);
            $(selectPriceEnt).html(year1.priceEnt);
            $(orderButtonPro).html(year1.orderButtonPro);
            $(orderButtonEnt).html(year1.orderButtonEnt);
            controlSelectButtons();
        } else if($(this).hasClass('plan-tabs-select__block_2')) {
            $(selectDiscount).html(year2.discount);
            (selectSectionSavePro).html(year2.savePro);
            $(selectSectionSaveEnt).html(year2.saveEnt);
            $(selectPricePro).html(year2.picePro);
            $(selectPriceEnt).html(year2.priceEnt);
            $(orderButtonPro).html(year2.orderButtonPro);
            $(orderButtonEnt).html(year2.orderButtonEnt);
            controlSelectButtons();
        } else {
            $(selectDiscount).html(year3.discount);
            (selectSectionSavePro).html(year3.savePro);
            $(selectSectionSaveEnt).html(year3.saveEnt);
            $(selectPricePro).html(year3.picePro);
            $(selectPriceEnt).html(year3.priceEnt);
            $(orderButtonPro).html(year3.orderButtonPro);
            $(orderButtonEnt).html(year3.orderButtonEnt);
            controlSelectButtons();
        }
    });
});

