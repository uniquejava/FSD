import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001';
const http = axios.create({
  baseURL: API_BASE_URL,
});

export function getCourses() {
  return http.get('/courses?_sort=id&_order=desc');
}

export function saveCourse(course) {
  course.approved = false;
  return http.post('/courses', course);
}

export function updateCourse(id, course) {
  course.approved = false;
  return http.put(`/courses/${id}`, course);
}

export function approveCourse(id) {
  return http.patch(`/courses/${id}`, { approved: true });
}

export function deleteCourse(id) {
  return http.delete(`/courses/${id}`);
}

export function getApprovedCourses() {
  return http.get('/courses?approved=true');
}

export default http;
