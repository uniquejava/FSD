import { Component } from '@angular/core';
import { Course } from './components';
import { loadavg } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-player';
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

  handleCourseSelected(course: Course) {
    console.log(course);
  }
}
