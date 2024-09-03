let videoDialog = $("#video-dialog");
let youTubePlayer = $("#you-tube-player");

videoDialog.appendTo("body");
let overlay = document.createElement("div");
$(overlay).addClass("overlay");
videoDialog.after(overlay);

let closeBtn = document.createElement("div");
$(closeBtn).addClass("video-dialog-close");
youTubePlayer.before(closeBtn);

$(overlay).click(function () {
	closeVideo();
});

$(".video-dialog-close").click(function () {
	closeVideo();
});

function closeVideo() {
	dialogReady = false;
	$("body").removeClass("stop-scrolling");
	$(".overlay").hide();
	videoDialog.hide();
	stopVideo();
}

function openVideo(videoId) {
	playerVideoId = videoId;
	dialogReady = true;
	videoDialog.css("top", Math.max(0, (($(window).height() - videoDialog.outerHeight()) / 2) + $(window).scrollTop()) + "px");
	$(window).resize(function () {
		videoDialog.position({my: "center", at: "center", of: "html"});
	});
	$("body").addClass("stop-scrolling");
	$(".overlay").show();
	videoDialog.show();
	playVideo();
}