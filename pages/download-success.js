window.onload = function() {
    function bannerPopup() {
        $(".popup-additional-info").addClass("popup-additional-info_indent");
    }

	function bannerPopupAnimated() {
        $(".popup-additional-info").addClass("popup-additional-info_animated");
    }

	function bannerTitle() {
        $(".popup-role__title").addClass("popup-role__title_active");
    }

	function bannerDescription() {
        $(".popup-role__descr").addClass("popup-role__descr_active");
    }

	function bannerAlex() {
        $(".popup-role__alex").addClass("popup-role__alex_active");
    }

	function bannerButton() {
        $(".popup-role__button").addClass("popup-role__button_active");
    }

    setTimeout(bannerPopup, 300);
	setTimeout(bannerPopupAnimated, 600);
	setTimeout(bannerTitle, 700);
	setTimeout(bannerDescription, 800);
	setTimeout(bannerAlex, 1000);
	setTimeout(bannerButton, 1100);

	$(".popup-role__container-close").click(function() {
		return false;
	});
}();
