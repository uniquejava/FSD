import { FETCH_APPROVED_COURSES } from '../actions/actionTypes';

const courses = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_APPROVED_COURSES:
      return payload;
    default:
      return state;
  }
};

export default courses;
