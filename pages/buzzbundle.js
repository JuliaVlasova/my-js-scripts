$(document).ready(function () {
	$('.bz-menu-box').click(function () {
		$('.main-menu').toggleClass('open-menu');
	});
	if ($(window).width() < 980) {
		$('.bz-menu-box').click(function () {
			$('.fixed-top-menu').toggleClass('sps-mobile-menu');
		});
	}
});
