"use strict";

$(document).ready(function() {
	let checkIfPopupVisible = setInterval(function() {
		if($(".fb_iframe_widget iframe").is(":visible")) {
			$(".additional-info-overlay").addClass("additional-info-overlay_visible");
			clearInterval(checkIfPopupVisible);
		}
	}, 400); 

	$(".fb-messenger__close").click(function() {
		$(".additional-info-overlay").hide();
		$("#fb-root").hide();
	});
});


