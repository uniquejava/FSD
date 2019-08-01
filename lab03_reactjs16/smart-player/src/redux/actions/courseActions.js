import http from '../../api';
import {
  FETCH_ALL_COURSES,
  SAVE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  APPROVE_COURSE,
} from './actionTypes';

// action creator
const fetchAllCoursesSuccess = data => ({
  type: FETCH_ALL_COURSES,
  payload: data,
});

export const fetchAllCourses = () => {
  return dispatch => {
    http
      .get('/courses?_sort=id&_order=desc')
      .then(res => {
        dispatch(fetchAllCoursesSuccess(res.data));
      })
      .catch(err => {
        console.log('err=', err);
      });
  };
};

export const saveCourse = course => {
  course.approved = false;
  return dispatch => {
    http
      .post('/courses', course)
      .then(res => {
        dispatch({
          type: SAVE_COURSE,
          payload: { course },
        });
      })
      .catch(err => {
        console.log('err=', err);
      });
  };
};

const updateCourseSuccess = (id, course) => ({
  type: UPDATE_COURSE,
  payload: { id, course },
});

export const updateCourse = (id, course) => {
  course.approved = false;

  return dispatch => {
    http
      .put(`/courses/${id}`, course)
      .then(res => {
        dispatch(updateCourseSuccess(id, course));
      })
      .catch(err => {
        console.log('err=', err);
      });
  };
};

const deleteCourseSuccess = id => ({
  type: DELETE_COURSE,
  payload: { id },
});

export const deleteCourse = id => {
  return dispatch => {
    http
      .delete(`/courses/${id}`)
      .then(res => {
        dispatch(deleteCourseSuccess(id));
      })
      .catch(err => {
        console.log('err=', err);
      });
  };
};

const approveCourseSuccess = id => ({
  type: APPROVE_COURSE,
  payload: { id },
});

export const approveCourse = id => {
  return dispatch => {
    http
      .patch(`/courses/${id}`, { approved: true })
      .then(res => {
        dispatch(approveCourseSuccess(id));
      })
      .catch(err => {
        console.log('err=', err);
      });
  };
};
