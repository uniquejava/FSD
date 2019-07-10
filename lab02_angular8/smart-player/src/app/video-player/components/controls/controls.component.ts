import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

const PLAYING = 'playing';
const PAUSED = 'paused';
const STOPPED = 'stopped';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Input() muted = false;
  @Input() likes = 0;
  @Input() unlikes = 0;
  @Input() ratio = 0;

  @Output() playClicked = new EventEmitter();
  @Output() pauseClicked = new EventEmitter();
  @Output() stopClicked = new EventEmitter();
  @Output() volumeClicked = new EventEmitter();
  @Output() muteClicked = new EventEmitter();
  @Output() voteClicked = new EventEmitter();

  @ViewChild('btnPlay', { static: true }) btnPlay: ElementRef;
  @ViewChild('btnPause', { static: true }) btnPause: ElementRef;
  @ViewChild('btnStop', { static: true }) btnStop: ElementRef;

  status = '';

  constructor(renderer2: Renderer2) {}

  ngOnInit() {}
  reload() {
    this.stop();
    this.play();
  }

  play() {
    this.btnPlay.nativeElement.disabled = true;
    this.btnPause.nativeElement.disabled = false;
    this.btnStop.nativeElement.disabled = false;
    this.status = PLAYING;
    this.playClicked.emit();
  }

  pause() {
    this.btnPlay.nativeElement.disabled = false;
    this.btnPause.nativeElement.disabled = true;
    this.btnStop.nativeElement.disabled = false;
    this.status = PAUSED;

    this.pauseClicked.emit();
  }

  stop() {
    this.btnPlay.nativeElement.disabled = false;
    this.btnPause.nativeElement.disabled = true;
    this.btnStop.nativeElement.disabled = true;
    this.status = STOPPED;
    this.stopClicked.emit();
  }

  volume(amount) {
    this.volumeClicked.emit(amount);
  }

  mute() {
    this.muteClicked.emit();
  }

  vote(type: string) {
    this.voteClicked.emit(type);
  }
}
