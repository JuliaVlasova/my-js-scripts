window.addEventListener('load', function () {
    function showBanner() {
        $(".sale-banner-popup").addClass("sale-bannner-visible");
        $(".sale-banner-popup__top-img").addClass("sale-bannner-visible");
        $(".sale-banner-popup__container").addClass("sale-bannner-visible");
    }

    function showButton() {
        $(".sale-banner-popup__button").addClass("sale-banner-popup__elem_visible");
    }

    function showDiscount() {
        $(".sale-banner-popup__discount").addClass("sale-banner-popup__elem_visible");
    }

    function showOff() {
        $(".sale-banner-popup__off").addClass("sale-banner-popup__elem_visible");
    }

    function showLogo() {
        $(".sale-banner-popup__logo").addClass("sale-banner-popup__elem_visible");
    }

    function showText() {
        $(".sale-banner-popup__text-sm").addClass("sale-banner-popup__elem_visible");
    }

    setTimeout(showBanner, 6000);
    setTimeout(showButton, 6500);
    setTimeout(showDiscount, 6700);
    setTimeout(showOff, 6900);
    setTimeout(showLogo, 7100);
    setTimeout(showText, 7300);

    $(".popup-additional-info").addClass("popup-additional-info_indent");
    $(".sale-banner-popup__close-button").on("click", function(n) {
        return $(".sale-banner-popup").fadeOut(700), $(".additional-info-overlay").hide(), $(".popup-additional-info").removeClass("popup-additional-info_indent"), !1
    });
    setTimeout(function() {
        var bannerSessionLifetime = 60 * 60; // one hour
        var n, o;
        var bannerSessionExpirationDate = setExpirationSessionDate(bannerSessionLifetime);
        n = document.cookie.match(new RegExp("(?:^|; )" + saleBannerCookieName.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)")), o = n && parseInt(decodeURIComponent(n[1])) || 0, o++, document.cookie = saleBannerCookieName + "=" + o + "; path=/; expires=" + bannerSessionExpirationDate + "";
        $(".sale-banner-popup").show();
    }, 300)
});
