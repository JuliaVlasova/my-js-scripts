"use strict";window.onload=function(){$(".fancybox").click(function(e){e.preventDefault();e=$(this).attr("href");$("body").addClass("body-hidden"),$(".fixed-inner-menu").addClass("block-hidden"),$(".widgets-bar").addClass("z-200"),$(".fancybox-overlay").show(),$(".fancybox-image").attr("src",e)}),$(document).mouseup(function(e){let d=$(".fancybox-overlay");0===d.has(e.target).length&&d.is(":visible")&&(d.hide(),$("body").removeClass("body-hidden"),$(".fixed-inner-menu").removeClass("block-hidden"),$(".widgets-bar").removeClass("z-200"))})};
