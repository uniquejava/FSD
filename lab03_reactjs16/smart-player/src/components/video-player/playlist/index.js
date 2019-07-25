import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import './playlist.scss';
class PlayList extends Component {
  state = { selectedIndex: -1 };

  render() {
    return (
      <Fragment>
        <div className="section-title">Chapter 01 Introduction</div>
        <ul className="course-list">
          {this.buildCourseList(this.props.courses)}
        </ul>
      </Fragment>
    );
  }

  buildCourseList(courses = []) {
    return courses.map((c, i) => (
      <li key={c.id} className="course">
        <button
          className={`btn btn-block link ${
            this.state.selectedIndex === i ? 'active' : ''
          }`}
          onClick={e => {
            this.handleSelection(i);
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faYoutube} /> {c.title}
          </div>
          <div>
            <span className="time">{c.duration}</span>
          </div>
        </button>
      </li>
    ));
  }
  handleSelection(index) {
    this.setState({
      selectedIndex: index,
    });

    this.props.selectCourse(this.props.courses[index]);
  }
}

export default PlayList;
