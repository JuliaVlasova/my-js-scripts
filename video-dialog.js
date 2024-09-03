jQuery("#video-dialog").dialog({
    "title": "",
    "autoOpen": false,
    "dialogClass": "video-dialog",
    "modal": true,
    "resizable": false,
    "draggable": true,
    "closeOnEscape": true,
    "width": "828",
    "height": "auto",
    "open": function (e, ui) {
        dialogReady = true;
        playVideo();
        $(window).resize(function () {
            $(".ui-dialog").position({my: "center", at: "center", of: "html"});
        });
        $('body').addClass('stop-scrolling');
    },
    "close": function (e, ui) {
        dialogReady = false;
        stopVideo();
        $('body').removeClass('stop-scrolling');
    }
});

(function() {
    // memorize old function
    var originFn = $.ui.dialog.prototype._createOverlay;

    // make new function
    $.ui.dialog.prototype._createOverlay = function() {
        originFn.call(this); // call old one

        // write your own extension code there
        if (this.options["dialogClass"] === "video-dialog") {
            var overlay = this.overlay; // memorize overlay (it is in old function call as this.overlay)

            var that = this; // just cause bind is event

            // my own extenstion, when you click anywhere on overlay, dialog is closed + I change css
            overlay.bind('click', function() {
                that.close(); // it is same like element.dialog('close');
            });
        }
    };
})();