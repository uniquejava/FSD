const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

class Player {
  constructor(courses) {
    this.courses = courses;
    this.currentCourse = courses[0];

    let video = (this.video = document.querySelector('video'));

    this.wrapper = document.querySelector('.smart-player-wrapper');
    this.controls = document.querySelector('.smart-controls');
    this.btnPlay = document.querySelector('#btnPlay');
    this.btnStop = document.querySelector('#btnStop');
    this.btnPause = document.querySelector('#btnPause');
    this.btnMute = document.querySelector('#btnMute');
    this.progressBar = document.querySelector('progress');

    this._bindEvents(video);
    this._displayVoteInfo();
    this._resizePlayer();
  }

  _bindEvents(video) {
    video.addEventListener('timeupdate', this.updateProgressBar.bind(this), false);
    video.addEventListener('ended', this.stop.bind(this), false);

    window.addEventListener('resize', this._resizePlayer.bind(this), false);
  }

  _resizePlayer(event) {
    let style = window.getComputedStyle(this.video, null);
    this.wrapper.style.height = style.height;
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

  load(index) {
    this.currentCourse = this.courses[index];
    this.video.src = this.currentCourse.url;
    this.play();
    this._displayVoteInfo();
  }

  play() {
    this.btnPlay.disabled = true;
    this.btnPause.disabled = false;
    this.btnStop.disabled = false;
    this.video.play();
  }

  pause() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = false;
    this.video.pause();
  }

  stop() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = true;
    this.video.pause();
    this.video.currentTime = 0;
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

  updateProgressBar() {
    let video = this.video;
    let percent = (video.currentTime * 100.0) / video.duration;
    this.progressBar.setAttribute('value', percent);
  }

  vote(type) {
    let key = type === 'up' ? VOTE_UP : VOTE_DOWN;
    key = `${key}@${this.currentCourse.id}`;
    let current = this._getItem(key, 0);
    localStorage.setItem(key, current + 1);

    this._displayVoteInfo();
  }
}
