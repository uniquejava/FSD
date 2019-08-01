import { combineReducers } from 'redux';
import courseReducer from './reducers/courseReducer';
import playListReducer from './reducers/playListReducer';

export default combineReducers({
  courses: courseReducer,
  playlist: playListReducer,
});
