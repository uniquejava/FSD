const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

class Player {
  constructor(courses) {
    this.courses = courses;
    this.currentCourse = courses[0];

    let player = (this.player = document.querySelector('#smartPlayer'));

    this.btnPlay = document.querySelector('#btnPlay');
    this.btnStop = document.querySelector('#btnStop');
    this.btnPause = document.querySelector('#btnPause');
    this.btnMute = document.querySelector('#btnMute');
    this.progressBar = document.querySelector('progress');

    this._bindEvents(player);
    this._displayVoteInfo();
  }

  _bindEvents(player) {
    player.addEventListener('timeupdate', this.updateProgressBar.bind(this), false);
    player.addEventListener('ended', this.stop.bind(this), false);
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
    this.player.src = this.currentCourse.url;
    this.play();
    this._displayVoteInfo();
  }

  play() {
    this.btnPlay.disabled = true;
    this.btnPause.disabled = false;
    this.btnStop.disabled = false;
    this.player.play();
  }

  pause() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = false;
    this.player.pause();
  }

  stop() {
    this.btnPlay.disabled = false;
    this.btnPause.disabled = true;
    this.btnStop.disabled = true;
    this.player.pause();
    this.player.currentTime = 0;
  }

  volume(amount) {
    let current = +this.player.volume;
    let expected = current + amount;

    if (expected > 1) {
      expected = 1;
    } else if (expected < 0) {
      expected = 0;
    }

    this.player.volume = expected;
  }

  toggleMute() {
    let muted = this.player.muted;
    let icon = document.querySelector('#btnMute i');
    icon.classList.toggle('fa-volume-mute', !muted);
    icon.classList.toggle('fa-volume-up', muted);
    this.player.muted = !muted;
  }

  updateProgressBar() {
    let player = this.player;
    let percent = (player.currentTime * 100.0) / player.duration;
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
