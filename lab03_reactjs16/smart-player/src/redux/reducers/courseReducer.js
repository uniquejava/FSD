import {
  FETCH_ALL_COURSES,
  SAVE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  APPROVE_COURSE,
} from '../actions/actionTypes';

const courses = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_ALL_COURSES:
      return payload;
    case SAVE_COURSE:
      return [payload.course, ...state];
    case UPDATE_COURSE:
      return state.map(course => {
        if (course.id === payload.id) {
          return payload.course;
        }
        return course;
      });
    case DELETE_COURSE:
      let courses = [...state];
      let idx = courses.findIndex(c => c.id === payload.id);
      courses.splice(idx, 1);
      return courses;
    case APPROVE_COURSE:
      return state.map(course => {
        if (course.id === payload.id) {
          return { ...course, approved: true };
        }
        return course;
      });
    default:
      return state;
  }
};

export default courses;
