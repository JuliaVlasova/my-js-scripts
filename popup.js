window.addEventListener('load', function () {
    $(".popup-overlay").slideDown(200);

	$(".popup-opener").click(function() {
		$(".popup-overlay").slideDown(200);
	});

	$(".popup__close").click(function() {
		$(".popup-overlay").slideUp(200);
	});
});
