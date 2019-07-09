import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services';
import { Course } from '../home/video-player';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  save() {
    console.log('saved.');
  }

  edit(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      _ => {
        console.log('update...');
      },
      f => f
    );
  }

  delete(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      _ => {
        console.log('delete...');
      },
      f => f
    );
  }

  approve() {
    console.log('approve...');
  }
}
