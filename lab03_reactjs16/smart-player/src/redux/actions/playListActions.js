import http from '../../api';
import { FETCH_APPROVED_COURSES } from './actionTypes';

// action creator
const fetchApprovedCoursesSuccess = data => ({
  type: FETCH_APPROVED_COURSES,
  payload: data,
});

export const fetchApprovedCourses = () => {
  return dispatch => {
    http
      .get('/courses?approved=true')
      .then(res => {
        dispatch(fetchApprovedCoursesSuccess(res.data));
      })
      .catch(err => {
        console.log('err=', err);
      });
  };
};
