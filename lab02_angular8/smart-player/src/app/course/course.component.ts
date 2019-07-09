import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services';
import { Course } from '../home/video-player';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];

  // two ways to build a form group.
  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    url: new FormControl('http://', [
      Validators.required,
      Validators.pattern(/https?:\/\/\w+/),
    ]),
  });

  courseEditForm = this.fb.group({
    title: ['', Validators.required],
    url: [''],
  });

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  save() {
    const { title, url } = this.courseForm.value;

    const course = {
      id: Date.now(),
      title,
      url,
      duration: '',
      approved: false,
    };

    this.courseService.saveCourse(course).subscribe(
      res => {
        this.courses.unshift(course);
        this.courseForm.reset({ url: 'http://' });
      },
      error => {
        console.error(error);
      }
    );
  }

  edit(content, cid) {
    const idx = this.courses.findIndex(c => c.id === cid);
    const course = this.courses[idx];

    this.courseEditForm.setValue({ title: course.title, url: course.url });

    this.modalService.open(content, { size: 'lg' }).result.then(
      _ => {
        const course2save = {
          ...course,
          ...this.courseEditForm.value,
        };
        this.courseService.updateCourse(cid, course2save).subscribe(
          res => {
            console.log(res);

            this.courses.splice(idx, 1, course2save);
          },
          error => {
            console.error(error);
          }
        );
      },
      f => f
    );
  }

  delete(content, cid) {
    this.modalService.open(content, { centered: true }).result.then(
      _ => {
        this.courseService.deleteCourse(cid).subscribe(
          res => {
            console.log(res);

            const idx = this.courses.findIndex(c => c.id === cid);
            this.courses.splice(idx, 1);
          },
          error => {
            console.error(error);
          }
        );
      },
      f => f
    );
  }

  approve(cid) {
    this.courseService.approveCourse(cid).subscribe(
      res => {
        const idx = this.courses.findIndex(c => c.id === cid);
        const course = this.courses[idx];
        this.courses.splice(idx, 1, { ...course, approved: true });
      },
      error => {
        console.error(error);
      }
    );
  }
}
