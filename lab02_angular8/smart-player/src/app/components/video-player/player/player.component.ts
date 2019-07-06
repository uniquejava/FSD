import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('video', { static: true }) videoRef: ElementRef;
  @Output() videoTimeUpdated = new EventEmitter();
  @Output() videoEnded = new EventEmitter();

  constructor() {}

  get video() {
    return this.videoRef.nativeElement;
  }

  ngOnInit() {
    this.video.addEventListener('timeupdate', event => {
      this.videoTimeUpdated.emit(event);
    });

    this.video.addEventListener('ended', () => {
      this.videoEnded.emit();
    });
  }
}
