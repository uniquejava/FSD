const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

const PLAYING = 'playing';
const PAUSED = 'paused';
const STOPPED = 'stopped';

class Player {
  constructor(courses) {
    this.courses = courses;

    let selectedIndex = 0;

    this.currentCourse = courses[selectedIndex];
    this.subtitles = Subtitle.parse(SUBTITLES[selectedIndex % 2]);

    this.videoContainer = document.querySelector('#videoContainer');
    this.video = document.querySelector('#video');
    this.controls = document.querySelector('#videoControls');
    this.extraControls = document.querySelector('#extraControls');
    this.btnPlay = document.querySelector('#btnPlay');
    this.btnStop = document.querySelector('#btnStop');
    this.btnPause = document.querySelector('#btnPause');
    this.btnMute = document.querySelector('#btnMute');
    this.subtitleContainer = document.querySelector('#subtitleContainer');
    this.progressContainer = document.querySelector('#progressContainer');
    this.progressBar = document.querySelector('progress');
    this.btnCircle = document.querySelector('#btnCircle');
    this.timeTag = document.querySelector('#timeTag');

    this.status = STOPPED;
    this.caption = 'on';

    this._bindEvents();
    this._calcProgressContainerSize();
    this._displayVoteInfo();
  }

  _bindEvents() {
    let video = this.video;
    video.addEventListener('timeupdate', this.onTimeUpdate.bind(this), false);
    video.addEventListener('ended', this.stop.bind(this), false);

    // auto show/hide video controls
    let videoContainer = this.videoContainer;
    videoContainer.addEventListener('mouseenter', this.onMouseEnter.bind(this), false);
    this.throttledKeepControls = _.throttle(this.keepControls, 200);
    videoContainer.addEventListener('mousemove', this.throttledKeepControls.bind(this), false);
    videoContainer.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);

    // toggle fullscreen icon
    videoContainer.addEventListener('fullscreenchange', this.onFullscreenchange.bind(this), false);

    // double click to toggle fullscren
    videoContainer.addEventListener('dblclick', this.toggleFullScreen.bind(this), false);

    // click to play/pause
    this.controls.addEventListener('click', event => event.stopPropagation(), false);
    videoContainer.addEventListener('click', this.togglePlay.bind(this), false);

    // seek time via `slider`
    let btnCircle = this.btnCircle;
    btnCircle.addEventListener('mousedown', this.onMousedown.bind(this), false);

    this.debouncedSeekTime = _.debounce(this.seekTime, 80);
    videoContainer.addEventListener('mousemove', this.onMousemove.bind(this), false);
    videoContainer.addEventListener('mouseup', this.onMouseup.bind(this), false);
    videoContainer.addEventListener('mouseleave', this.onMouseup.bind(this), false);

    // seek time by click anywhere on the progress bar
    this.progressContainer.addEventListener('click', this.onClickProgressBar.bind(this), false);

    // resize
    this.throttledResize = _.throttle(this.onResize, 100);
    window.addEventListener('resize', this.throttledResize.bind(this), false);
  }

  // get value from localStorage
  _getItem(key, defaultValue) {
    return +localStorage.getItem(key) || defaultValue;
  }

  // recalcuate current size of progressbar (when toggle fullscreen or resize window, to reposition the circle button)
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
    this.subtitles = Subtitle.parse(SUBTITLES[index % 2]);
    this.subtitleContainer.innerHTML = this.currentCourse.title;
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

  togglePlay() {
    if (this.status === PLAYING) {
      this.pause();
    } else {
      this.play();
    }
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
    this.subtitleContainer.innerHTML = '';
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

  toggleCaption() {
    this.caption = this.caption === 'off' ? 'on' : 'off';

    let off = this.caption === 'off';
    if (off) {
      this.subtitle = '';
    }

    this.subtitleContainer.classList.toggle('hide', off);

    let icon = document.querySelector('.btn-caption i');
    icon.classList.toggle('far', off);
    icon.classList.toggle('fas', !off);
  }

  onMouseEnter() {
    this.mouseStatus = 'ENTER';
    this.showControls();
  }

  onMouseLeave() {
    this.mouseStatus = 'LEAVE';
    this.hideControls();
  }

  showControls() {
    this.controlsHided = false;

    this.progressContainer.style.display = 'block';
    this.controls.style.display = 'block';
    this.extraControls.style.display = 'flex';
    this.subtitleContainer.style.bottom = '46px';
  }

  keepControls() {
    if (this.mouseStatus !== 'LEAVE') {
      this.lastActiveTime = Date.now();

      if (!this.timer) {
        console.log('new timer ...');
        this.timer = setInterval(() => {
          let idleTime = Date.now() - this.lastActiveTime;
          if (idleTime >= 2500) {
            this.hideControls();
          }
        }, 500);
      }

      if (this.controlsHided) {
        this.showControls();
      }
    }
  }

  hideControls() {
    this.controlsHided = true;

    if (this.timer) {
      console.log('clear timer');
      clearInterval(this.timer);
      this.timer = null;
    }

    if (this.status === PLAYING) {
      this.progressContainer.style.display = 'none';
      this.controls.style.display = 'none';
      this.extraControls.style.display = 'none';
      this.subtitleContainer.style.bottom = '6px';
    }
  }

  onTimeUpdate() {
    // update progress bar
    let video = this.video;

    if (this.caption === 'on') {
      let offset = Math.floor(video.currentTime * 1000);
      for (let i = 0; i < this.subtitles.length; i++) {
        const item = this.subtitles[i];
        if (offset > item.start && offset < item.end) {
          this.subtitleContainer.innerHTML = item.text;
        }
      }
    }

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

  onClickProgressBar(event) {
    event.stopPropagation();

    let myleft = event.clientX - this.containerLeft - 6;
    let ratio = Math.max(Math.min((myleft * 1.0) / this.containerWidth, 1.0), 0.0);
    this.seekTime(ratio);
  }

  onMousedown(event) {
    this.dragging = true;
  }

  onMousemove(event) {
    event.preventDefault();
    event.stopPropagation();

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
