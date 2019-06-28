class Player {
  constructor() {
    let player = (this.player = document.querySelector('#smartPlayer'));

    this.btnPlay = document.querySelector('#btnPlay');
    this.btnStop = document.querySelector('#btnStop');
    this.btnPause = document.querySelector('#btnPause');
    this.btnMute = document.querySelector('#btnMute');
    this.progressBar = document.querySelector('progress');

    player.addEventListener('timeupdate', this.updateProgressBar.bind(this), false);
    player.addEventListener('ended', this.stop.bind(this), false);
  }

  reload() {
    this.stop();
    this.play();
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
}
