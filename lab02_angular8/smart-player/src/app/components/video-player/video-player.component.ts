import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Course } from '..';
import { PlayerComponent } from './player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild(PlayerComponent, { static: true }) playerComponent: PlayerComponent;

  courses: Course[] = [
    {
      id: 0,
      title: 'Introduction to HTML5',
      url: 'mp4/SampleVideo_1280x720_2mb.mp4'
    },
    {
      id: 1,
      title: 'Introduction to Styling with CSS3',
      url: 'mp4/Sample1280.mp4'
    },
    {
      id: 2,
      title: 'Introduction to Bootstrap 4',
      url: 'mp4/SampleVideo_1280x720_2mb.mp4'
    },
    {
      id: 3,
      title: 'Learn to create website with HTML5, CSS3 and Bootstrap4',
      url: 'mp4/Sample1280.mp4'
    },
    {
      id: 4,
      title: 'Introduction to Javascript',
      url: 'mp4/SampleVideo_720x480_1mb.mp4'
    }
  ];
  constructor() {}

  ngOnInit() {}

  get video() {
    return this.playerComponent.videoRef.nativeElement;
  }

  handleCourseSelected(course: Course) {
    console.log(course);
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  stop() {
    this.video.pause();
    this.video.currentTime = 0;
  }

  volume(amount: number) {
    const current = +this.video.volume;
    let expected = current + amount;

    if (expected > 1) {
      expected = 1;
    } else if (expected < 0) {
      expected = 0;
    }

    this.video.volume = expected;
  }

  toggleMute() {
    const muted = this.video.muted;
    this.video.muted = !muted;
  }
}
