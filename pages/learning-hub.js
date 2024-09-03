$(document).ready(function () {
    $(function() {
		$( "#tabs").tabs();
	});

	$(".tabs-content #smm").hide();
	
	if(document.URL.indexOf("#smm") >= 0){ 
		$(".tabs-content #smm").show();
		$(".tabs-content #tabs-1").hide();
	}
	else {
		$(".tabs-content #smm").hide();
		$(".tabs-content #tabs-1").show();
	}
});
