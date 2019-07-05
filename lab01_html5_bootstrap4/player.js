const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

const PLAYING = 'playing';
const PAUSED = 'paused';
const STOPPED = 'stopped';

const toHHMMSS = seconds => {
  let h,
    m,
    s,
    result = '';

  // hours
  h = Math.floor(seconds / 3600);
  seconds -= h * 3600;
  if (h) {
    result = h + ':';
  }

  // minutes
  m = Math.floor(seconds / 60);
  result += m < 10 && h > 0 ? '0' + m + ':' : m + ':';

  // seconds
  s = Math.floor(seconds % 60);
  result += s < 10 ? '0' + s : s;
  return result;
};

class Player {
  constructor(courses) {
    this.courses = courses;
    this.currentCourse = courses[0];

    this.videoContainer = document.querySelector('#videoContainer');
    this.video = document.querySelector('#video');
    this.controls = document.querySelector('#videoControls');
    this.btnPlay = document.querySelector('#btnPlay');
    this.btnStop = document.querySelector('#btnStop');
    this.btnPause = document.querySelector('#btnPause');
    this.btnMute = document.querySelector('#btnMute');
    this.progressBar = document.querySelector('progress');
    this.timeTag = document.querySelector('.time-tag');

    this.status = STOPPED;

    this._bindEvents();
    this._displayVoteInfo();
  }

  _bindEvents() {
    this.video.addEventListener('timeupdate', this.onTimeUpdate.bind(this), false);
    this.video.addEventListener('ended', this.stop.bind(this), false);
    this.videoContainer.addEventListener('fullscreenchange', this.onFullscreenchange.bind(this), false);
  }

  _getItem(key, defaultValue) {
    return +localStorage.getItem(key) || defaultValue;
  }

  _displayVoteInfo() {
    let up = document.querySelector('#btnVoteUp i');
    let key = `${VOTE_UP}@${this.currentCourse.id}`;
    up.innerText = ` ${this._getItem(key, 0)}`;

    let down = document.querySelector('#btnVoteDown i');
    key = `${VOTE_DOWN}@${this.currentCourse.id}`;
    down.innerText = ` ${this._getItem(key, 0)}`;
  }

  reload() {
    this.stop();
    this.play();
  }

  load(index, link) {
    this.currentCourse = this.courses[index];
    this.video.src = this.currentCourse.url;
    this.play();
    this._displayVoteInfo();

    // highlight course that is currently playing.
    if (link && link.style) {
      let links = document.querySelectorAll('.course-list .link');
      links.forEach(link => link.classList.toggle('active', false));
      link.classList.toggle('active', true);
    }
  }

  play() {
    this.btnPlay.disabled = true;
    this.btnPause.disabled = false;
    this.btnStop.disabled = false;
    this.video.play();

    this.status = PLAYING;
  }

  pause() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = false;
    this.video.pause();

    this.status = PAUSED;
  }

  stop() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = true;
    this.video.pause();
    this.video.currentTime = 0;

    this.status = STOPPED;
  }

  volume(amount) {
    let current = +this.video.volume;
    let expected = current + amount;

    if (expected > 1) {
      expected = 1;
    } else if (expected < 0) {
      expected = 0;
    }

    this.video.volume = expected;
  }

  toggleMute() {
    let muted = this.video.muted;
    let icon = document.querySelector('#btnMute i');
    icon.classList.toggle('fa-volume-mute', !muted);
    icon.classList.toggle('fa-volume-up', muted);
    this.video.muted = !muted;
  }

  toggleFullScreen() {
    // see Fullscreen API: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
    let elem = document.fullscreenElement;
    if (!elem) {
      this.enterFS(this.videoContainer);
    } else {
      this.exitFS();
    }
  }

  enterFS(elem) {
    // see https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#Examples
    let enter = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
    enter.call(elem);
  }

  exitFS() {
    let exit = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
    exit.call(document);
  }

  onFullscreenchange() {
    let isFullScreen = !!document.fullscreenElement;
    let icon = document.querySelector('.btn-fullscreen i');
    icon.classList.toggle('fa-expand', !isFullScreen);
    icon.classList.toggle('fa-compress', isFullScreen);
  }

  onTimeUpdate() {
    // update progress bar
    let video = this.video;
    let percent = (video.currentTime * 100.0) / video.duration;
    this.progressBar.setAttribute('value', percent);

    // update time tag
    let current = toHHMMSS(video.currentTime);
    let duration = toHHMMSS(video.duration || 0);
    this.timeTag.innerText = `${current} / ${duration}`;
  }

  vote(type) {
    let key = type === 'up' ? VOTE_UP : VOTE_DOWN;
    key = `${key}@${this.currentCourse.id}`;
    let current = this._getItem(key, 0);
    localStorage.setItem(key, current + 1);

    this._displayVoteInfo();
  }
}
