import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../home/video-player';

@Injectable()
export class CourseService {
  constructor(private http: HttpClient) {}
  getCourses() {
    return this.http.get<Course[]>('/courses');
  }

  getApprovedCourses() {
    return this.http.get<Course[]>('/courses?approved=true');
  }
}
