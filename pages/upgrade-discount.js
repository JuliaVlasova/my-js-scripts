"use strict";

window.onload = function() {
	if($(".upgrade-info-block").is(":visible") || window.location.href.indexOf("hash=") > -1 ) {
		$(".upgrade-block").addClass("upgrade-block_lg");
		$("form.ng-dirty").parents(".upgrade-block").removeClass("upgrade-block_lg");
	} else {
		$(".upgrade-block").removeClass("upgrade-block_lg");
	}

	$(".upgrade-block form .form-control").on('keyup change', function(){
		if($(this).parents(".upgrade-block  form").hasClass("ng-dirty")) {
			$(".upgrade-block").removeClass("upgrade-block_lg");
		} else {
			$(".upgrade-block").addClass("upgrade-block_lg");
		}
	});
}();
