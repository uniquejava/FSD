const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

class Player {
  constructor(ytPlayer, courses) {
    this.ytPlayer = ytPlayer;

    this.courses = courses;

    let selectedIndex = 0;

    this.currentCourse = courses[selectedIndex];
    this.subtitles = Subtitle.parse(SUBTITLES[selectedIndex % 2]);

    this.videoContainer = document.querySelector('#videoContainer');
    // this.video = document.querySelector('#video');
    this.video = this.ytPlayer;

    this.controls = document.querySelector('#videoControls');
    this.extraControls = document.querySelector('#extraControls');
    this.btnReload = document.querySelector('#btnReload');
    this.btnPlay = document.querySelector('#btnPlay');
    this.btnStop = document.querySelector('#btnStop');
    this.btnPause = document.querySelector('#btnPause');
    this.btnVolumeUp = document.querySelector('#btnVolumeUp');
    this.btnVolumeDown = document.querySelector('#btnVolumeDown');
    this.btnMute = document.querySelector('#btnMute');
    this.btnFullScreen = document.querySelector('#btnFullScreen');
    this.btnCaption = document.querySelector('#btnCaption');
    this.btnVoteUp = document.querySelector('#btnVoteUp');
    this.btnVoteDown = document.querySelector('#btnVoteDown');
    this.progressContainer = document.querySelector('#progressContainer');
    this.progressBar = document.querySelector('progress');
    this.btnCircle = document.querySelector('#btnCircle');
    this.timeTag = document.querySelector('#timeTag');

    this.caption = 'on';

    this._bindEvents();
    this._calcProgressContainerSize();
    this._displayVoteInfo();
  }

  _bindEvents() {
    // button events
    bind(this.btnReload, 'click', this.reload.bind(this));
    bind(this.btnPlay, 'click', this.play.bind(this));
    bind(this.btnPause, 'click', this.pause.bind(this));
    bind(this.btnStop, 'click', this.stop.bind(this));
    bind(this.btnVolumeUp, 'click', this.volume.bind(this, 10));
    bind(this.btnVolumeDown, 'click', this.volume.bind(this, -10));
    bind(this.btnMute, 'click', this.toggleMute.bind(this));
    bind(this.btnFullScreen, 'click', this.toggleFullScreen.bind(this));
    bind(this.btnCaption, 'click', this.toggleCaption.bind(this));
    bind(this.btnVoteUp, 'click', this.vote.bind(this, 'up'));
    bind(this.btnVoteDown, 'click', this.vote.bind(this, 'down'));

    // video events
    let video = this.video;
    bind(video, 'ended', this.stop.bind(this));

    // auto show/hide video controls
    let videoContainer = this.videoContainer;
    videoContainer.addEventListener(
      'mouseenter',
      this.onMouseEnter.bind(this),
      false
    );
    this.throttledKeepControls = _.throttle(this.keepControls, 200);
    videoContainer.addEventListener(
      'mousemove',
      this.throttledKeepControls.bind(this),
      false
    );
    videoContainer.addEventListener(
      'mouseleave',
      this.onMouseLeave.bind(this),
      false
    );

    // toggle fullscreen icon
    videoContainer.addEventListener(
      'fullscreenchange',
      this.onFullscreenchange.bind(this),
      false
    );

    // seek time via `slider`
    let btnCircle = this.btnCircle;
    btnCircle.addEventListener('mousedown', this.onMousedown.bind(this), false);

    this.debouncedSeekTime = _.debounce(this.seekTime, 80);
    videoContainer.addEventListener(
      'mousemove',
      this.onMousemove.bind(this),
      false
    );
    videoContainer.addEventListener(
      'mouseup',
      this.onMouseup.bind(this),
      false
    );
    videoContainer.addEventListener(
      'mouseleave',
      this.onMouseup.bind(this),
      false
    );

    // seek time by click anywhere on the progress bar
    this.progressContainer.addEventListener(
      'click',
      this.onClickProgressBar.bind(this),
      false
    );

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
    this.containerWidth = parseFloat(
      window.getComputedStyle(this.progressContainer).width
    );
  }

  _displayVoteInfo() {
    let up = document.querySelector('#btnVoteUp i');
    let key = `${VOTE_UP}@${this.currentCourse.id}`;
    up.innerText = ` ${this._getItem(key, 0)}`;

    let down = document.querySelector('#btnVoteDown i');
    key = `${VOTE_DOWN}@${this.currentCourse.id}`;
    down.innerText = ` ${this._getItem(key, 0)}`;
  }

  ready() {
    this.btnPlay.disabled = false;
  }

  onPlayerStateChange(event) {
    console.log('event.data=', event.data);

    if (event.data === YT.PlayerState.PLAYING) {
      this.progressInterval = setInterval(this.onTimeUpdate.bind(this), 1000);
    } else {
      clearInterval(this.progressInterval);
    }
  }

  reload() {
    this.stop();
    this.play();
  }

  load(url, startPlay, link) {
    this.currentCourse = this.courses[index];

    this.ytPlayer.loadVideoByUrl(this.currentCourse.url, 0);

    if (startPlay) {
      this.play();
    }

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

    // this.video.play();
    this.ytPlayer.playVideo();
  }

  togglePlay() {
    if (this.getPlayerState() === YT.PlayerState.PLAYING) {
      this.pause();
    } else {
      this.play();
    }
  }

  pause() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = false;
    // this.video.pause();

    this.ytPlayer.pauseVideo();
  }

  stop() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = true;
    // this.video.pause();
    // this.video.currentTime = 0;
    this.ytPlayer.stopVideo();
  }

  volume(amount) {
    let current = +this.ytPlayer.getVolume();
    let expected = current + amount;

    if (expected > 100) {
      expected = 100;
    } else if (expected < 0) {
      expected = 0;
    }

    this.ytPlayer.setVolume(expected);
  }

  toggleMute() {
    // let muted = this.video.muted;
    let muted = this.ytPlayer.isMuted();

    let icon = document.querySelector('#btnMute i');
    icon.classList.toggle('fa-volume-mute', !muted);
    icon.classList.toggle('fa-volume-up', muted);
    // this.video.muted = !muted;
    if (muted) {
      this.ytPlayer.unMute();
    } else {
      this.ytPlayer.mute();
    }
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
    let enter =
      elem.requestFullscreen ||
      elem.msRequestFullscreen ||
      elem.mozRequestFullScreen ||
      elem.webkitRequestFullscreen;
    enter.call(elem);
  }

  exitFS() {
    let exit =
      document.exitFullscreen ||
      document.msExitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen;
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

    if (this.getPlayerState() === YT.PlayerState.PLAYING) {
      this.progressContainer.style.display = 'none';
      this.controls.style.display = 'none';
      this.extraControls.style.display = 'none';
      //this.subtitleContainer.style.bottom = '0';
    }
  }

  onTimeUpdate() {
    // update progress bar
    let currentTime = this.getCurrentTime();
    let duration = this.getDuration();

    let percent = (currentTime * 100.0) / duration;
    percent = percent.toFixed(2);
    this.progressBar.setAttribute('value', percent);

    // update time tag
    this.timeTag.innerText = `${toHHMMSS(currentTime)} / ${toHHMMSS(
      duration || 0
    )}`;

    if (!this.dragging) {
      this.btnCircle.style.left = `${percent}%`;
    }
  }

  onClickProgressBar(event) {
    event.stopPropagation();

    let myleft = event.clientX - this.containerLeft - 6;
    let ratio = Math.max(
      Math.min((myleft * 1.0) / this.containerWidth, 1.0),
      0.0
    );
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
      let ratio = Math.max(
        Math.min((myleft * 1.0) / this.containerWidth, 1.0),
        0.0
      );

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

  /* built-in video properties */
  getDuration() {
    return this.ytPlayer.getDuration();
  }
  getCurrentTime() {
    return this.ytPlayer.getCurrentTime();
  }
  getPlayerState() {
    /*
    -1 – unstarted
    0 – ended
    1 – playing
    2 – paused
    3 – buffering
    5 – video cued
  */

    return this.ytPlayer.getPlayerState();
  }
}
