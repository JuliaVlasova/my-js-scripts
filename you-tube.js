var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
	$(function () {
		player = new YT.Player('you-tube-player', {
			height: '450',
			width: '800',
			playerVars: {
				html5: 1,
				'modestbranding': 1,
				'showinfo': 1,
				'rel': 0,
				'controls': 1,
				'border': 0,
				'wmode': 'opaque',
			},
			events: {
				'onReady': onPlayerReady,
				/*'onStateChange': onPlayerStateChange*/
			}
		});
		if (playerVideoId = autoplay()) {
			$("#video-dialog").dialog("open");
		}
	});
}

var playerReady = false;
var dialogReady = false;
var playerVideoId = '';
var playerlistId = '';
var playerlistIndex = '';
var lastFrameTime = 0;
var isIOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) ? true : false;

function onPlayerReady(event) {
	playerReady = true;
	$("#you-tube-player").attr('frameborder', 0);
	playVideo();
}

function onPlayerStateChange(event) {
	if (event.data == '0') {
		player.seekTo(lastFrameTime, true);
		player.pauseVideo();
	}
}

function loadPlaylist_playlist_id() {
	player.loadPlaylist({
		'list': playerlistId,
		'listType': 'playlist',
		'index': playerlistIndex,
		'startSeconds': 0,
		'suggestedQuality': 'large'
	});
}

function playVideo() {
	if (playerReady && dialogReady) {
		if (playerVideoId != '') {
			if (player.videoId != playerVideoId) {
				player.cueVideoById(playerVideoId, 0, 'large');
			}
		}

		if (playerlistId != '') {
			player.loadPlaylist(playerlistId, 0, 'large');
			loadPlaylist_playlist_id();
		}

		player.videoId = playerVideoId;
		if (!isIOS) player.playVideo();
	}
}

function stopVideo() {
	if (playerReady) {
		player.pauseVideo();
	}
}

function autoplay() {
	var url = window.location.href;
	var query = url.substring(url.indexOf('?') + 1);
	if (query !== url) {
		var pair = query.split("=");
		if (pair[0] == "vid") {
			return pair[1];
		}
	}
	return false;
}