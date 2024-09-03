window.onload = function() {
    function addStick() {
        $(".sale-line").addClass("stick-menu");
    }

    function removeStick() {
        $(".sale-line").removeClass("stick-menu");
    }

    $(window).scroll(function () {
		if ($(this).width() <= 960) {
			if ($(this).scrollTop() > $(".header").height()) {
				addStick();
			} else {
				removeStick();
			}

		}
	});
}();
