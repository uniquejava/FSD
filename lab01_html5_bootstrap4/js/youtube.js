// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var ytPlayer;
var me;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('video', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    origin: 'http://localhost:8080',
    playerVars: { autoplay: 0, controls: 0, origin: 'http://localhost:8080' },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onPlaybackRateChange,
      onPlaybackRateChange,
    },
  });

  me = new Player(ytPlayer, courses);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log('onPlayerReady');

  // event.target.playVideo();
  me.ready();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  console.log('event.data=', event.data);
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }

  me.onPlayerStateChange(event);
}

function stopVideo() {
  ytPlayer.stopVideo();
}
