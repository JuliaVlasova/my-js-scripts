$(document).ready(function () {
	$(".wrapper-for-sticky_active *[id]").each(function() {
		let idModified = $(this).attr('id').toString().replace(/[.!?";,&:\[\]]/g,'').replace(/[_%+=\/]/g,'-').replace(/\u00a0/g, "-").split('#').slice(-1)[0];
		$(this).attr('id', idModified);
	});

	$(".content-list a[href]").each(function() {
		let windowLocation = window.location.href.split('#').slice(0)[0].split('/').slice(-1)[0]; 
		let hrefModified = $(this).attr('href').toString().replace(/[.!?";,&:\[\]]/g,'').replace(/[_%+=\/]/g,'-').replace(/\u00a0/g, "-").split('#').slice(-1)[0];
		$(this).attr('href', windowLocation + "#" + hrefModified);
	});

	$.fn.isInViewport = function() {
		let elementTop = $(this).offset().top - $(".header").outerHeight() - 100;
		let elementBottom = elementTop + $(this).outerHeight() - $(".header").outerHeight() - 100;

		let viewportTop = $(window).scrollTop();
		let viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	let contentAnchors = [];
	let targetBlock;
	
	$('.content__list li').each(function() {
		let anchorHref = $(this).find('a').attr('href').split('#').slice(-1)[0];
		contentAnchors.push(anchorHref);
		$(this).attr('id', 'li-' + anchorHref);
	});

	for (let element of contentAnchors) {
		let activeItem = "#" + element;

		function smartClick(menuButton) {
			$(menuButton).mouseover(function() {
				$(".wrapper-for-sticky_active img").each(function() {
					$(this).attr('loading', '').removeClass("lazyload");
				});
			});

			$(menuButton).bind("click", function(e) { 
				e.stopPropagation();
				
				function scrollToEl() {
					targetBlock = $(activeItem).offset().top - 100 - $(".header").outerHeight();
					$("html, body").animate({
						scrollTop: targetBlock
					}, 500);
				}
			
				scrollToEl();
			});
		}

		smartClick("#li-" + element);
	
		$(window).on('scroll', function() {
			if ($(activeItem).isInViewport()) {
				$("#li-" + element).removeClass('list-item-active');
			} else {
				$('.content__list li').removeClass('list-item-active');
				$("#li-"+ element).addClass('list-item-active');
			}
		});
	}
});
