var switchProducts = function (selectedProductId) {
	$('.product-select').each(function () {
		$(this).find('input[type=radio]').prop('checked', ($(this).attr('data-product-id') == selectedProductId));

		(('input[type=radio]', $(this)).attr('data-product-id') == selectedProductId)
			? $('label', $(this)).addClass('ui-state-active')
			: $('label', $(this)).removeClass('ui-state-active');

		($(this).attr('data-product-id') == selectedProductId)
		? $(this).addClass('active')
		: $(this).removeClass('active');
	});

	$('.product-link').each(function () {
		($(this).attr('data-product-id') == selectedProductId) ? $(this).removeClass('hide') : $(this).addClass('hide');
	});
};

function nearestAncestorHref(node){
	while(node && !node.href) node = node.parentNode;
	return node;
}

function decorateMe(event) {
	event = event || window.event; // Cross browser hoops.
	var target = event.target || event.srcElement;

	if (target) {
		if (!target.href) {
			target = nearestAncestorHref(target);
		}

		if (target.href) {
			ga('linker:decorate', target);
		}
	}
}

// Cross browser way to listen for events.
function addListener(element, type, callback) {
	if (element.addEventListener) element.addEventListener(type, callback);
	else if (element.attachEvent) element.attachEvent('on' + type, callback);
}

$(function () {
	(function($) {
		$.QueryString = (function(a) {
			if (a == "") return {};
			var b = {};
			for (var i = 0; i < a.length; ++i)
			{
				var p=a[i].split('=', 2);
				if (p.length != 2) continue;
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		})(window.location.search.substr(1).split('&'))
	})(jQuery);

	let searchParams = new URLSearchParams(window.location.search);
	var selectedProductId = (searchParams.has('ent')) ? 'ENT' : 'PRO';

	switchProducts(selectedProductId);

	$('.product-select').on('click', function () {
		switchProducts($(this).attr('data-product-id'));
	});

	if (typeof ga === 'function') {
		$(".order-link").each(function () {
			addListener($(this).get(0), 'mousedown', decorateMe);
			addListener($(this).get(0), 'keydown', decorateMe);
		});
	}

	$("[data-billing-btn]").click(function() {
		var orderBillingBtn = $(this).data("billing-btn");

		$("[data-billing-btn]").each(function () {
			(orderBillingBtn == $(this).data("billing-btn")) ? $(this).addClass("active") : $(this).removeClass("active");
		});

		$("[data-billing-block]").each(function () {
			(orderBillingBtn == $(this).data("billing-block")) ? $(this).addClass("active") : $(this).removeClass("active");
		});
	});

	$(".tool-radio input:checked").parents(".block-bg-order").addClass("gray-back");
	$(".tool-radio").parents(".block-bg-order").click(function() {
		$(".block-bg-order").removeClass("gray-back");
		$(".tool-radio input:checked").parents(".block-bg-order").addClass("gray-back");
	});

	$(".order-switch-btn").click(function() {
		$(this).parents(".order-btns-container").find(".order-switch-btn").removeClass("active");
		$(this).addClass("active");
	});
});

