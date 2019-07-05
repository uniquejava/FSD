const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

const PLAYING = 'playing';
const PAUSED = 'paused';
const STOPPED = 'stopped';

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
    this.progressContainer = document.querySelector('#progressContainer');
    this.progressBar = document.querySelector('progress');
    this.btnCircle = document.querySelector('#btnCircle');
    this.timeTag = document.querySelector('.time-tag');

    this.status = STOPPED;

    this._bindEvents();
    this._calcProgressContainerSize();
    this._displayVoteInfo();
  }

  _bindEvents() {
    let video = this.video;
    video.addEventListener('timeupdate', this.onTimeUpdate.bind(this), false);
    video.addEventListener('ended', this.stop.bind(this), false);

    let videoContainer = this.videoContainer;
    videoContainer.addEventListener('fullscreenchange', this.onFullscreenchange.bind(this), false);

    // drag
    let btnCircle = this.btnCircle;
    btnCircle.addEventListener('mousedown', this.onMousedown.bind(this), false);

    this.debouncedSeekTime = debounce(this.seekTime, 80);

    videoContainer.addEventListener('mousemove', this.onMousemove.bind(this), false);
    videoContainer.addEventListener('mouseup', this.onMouseup.bind(this), false);
    videoContainer.addEventListener('mouseleave', this.onMouseup.bind(this), false);

    // resize
    this.debouncedResize = debounce(this.onResize, 100);
    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  _getItem(key, defaultValue) {
    return +localStorage.getItem(key) || defaultValue;
  }

  _calcProgressContainerSize() {
    this.containerLeft = offset(this.progressContainer).left;
    this.containerWidth = parseFloat(window.getComputedStyle(this.progressContainer).width);
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
    this._calcProgressContainerSize();

    let icon = document.querySelector('.btn-fullscreen i');
    icon.classList.toggle('fa-expand', !isFullScreen);
    icon.classList.toggle('fa-compress', isFullScreen);
  }

  onTimeUpdate() {
    // update progress bar
    let video = this.video;
    let percent = (video.currentTime * 100.0) / video.duration;
    percent = percent.toFixed(2);
    this.progressBar.setAttribute('value', percent);

    // update time tag
    let current = toHHMMSS(video.currentTime);
    let duration = toHHMMSS(video.duration || 0);
    this.timeTag.innerText = `${current} / ${duration}`;

    if (!this.dragging) {
      this.btnCircle.style.left = `${percent}%`;
    }
  }

  onMousedown(event) {
    this.dragging = true;
  }

  onMousemove(event) {
    if (this.dragging) {
      let myleft = event.clientX - this.containerLeft - 6;
      let ratio = Math.max(Math.min((myleft * 1.0) / this.containerWidth, 1.0), 0.0);

      // set circle button position
      this._onMouseMoveQuickUpdateUI(ratio);

      // set time (debounced)
      this.debouncedSeekTime(ratio);
    }
  }

  _onMouseMoveQuickUpdateUI(ratio) {
    this.progressBar.setAttribute('value', ratio * 100);
    let current = toHHMMSS(video.duration * ratio);
    let duration = toHHMMSS(video.duration || 0);
    this.timeTag.innerText = `${current} / ${duration}`;
    this.btnCircle.style.left = `${this.containerWidth * ratio}px`;
  }

  seekTime(ratio) {
    this.video.currentTime = (this.video.duration * ratio).toFixed(2);
  }

  onMouseup(event) {
    this.dragging = false;
  }

  onResize() {
    this._calcProgressContainerSize();
  }

  vote(type) {
    let key = type === 'up' ? VOTE_UP : VOTE_DOWN;
    key = `${key}@${this.currentCourse.id}`;
    let current = this._getItem(key, 0);
    localStorage.setItem(key, current + 1);

    this._displayVoteInfo();
  }
}
