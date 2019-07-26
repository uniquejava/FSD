import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './course.css';

const initialState = {
  courses: [],
  title: '',
  url: 'https://',
  titleRequiredError: false,
  urlRequireError: false,
  urlInvalidError: false,
};

const COURSES_URL = 'http://localhost:3000/courses';

class Course extends Component {
  state = initialState;

  componentDidMount() {
    axios
      .get(COURSES_URL)
      .then(res => {
        let courses = res.data;
        this.setState({
          courses: courses,
        });
      })
      .catch(err => {
        console.log('err=', err);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="card mb-2">
          <div className="card-header">New Video</div>
          <div className="card-body">{this.buildForm()}</div>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S.no</th>
                  <th scope="col" nowrap="nowrap">
                    Title
                  </th>
                  <th scope="col">URL</th>
                  <th scope="col" colSpan="3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{this.buildRows(this.state.courses)}</tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }

  buildForm() {
    const {
      title,
      url,
      titleRequiredError,
      urlRequireError,
      urlInvalidError,
    } = this.state;
    return (
      <form onSubmit={this.save}>
        <div className="form-group row">
          <label className="col-sm-2">Title:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              name="title"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            {titleRequiredError ? (
              <small className="text-danger">Title is required</small>
            ) : null}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="url" className="col-sm-2">
            URL:
          </label>
          <div className="col-sm-9">
            <input
              type="url"
              className="form-control"
              placeholder="http://"
              autoComplete="off"
              name="url"
              value={url}
              onChange={e => this.setState({ url: e.target.value })}
            />
            <div>
              {urlRequireError ? (
                <small className="text-danger">URL is required.</small>
              ) : null}
              {urlInvalidError ? (
                <small className="text-danger">URL is invalid.</small>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2 d-none d-sm-block">&nbsp;</label>
          <div className="col-sm-9">
            <button type="submit" className="btn btn-primary">
              Add Video
            </button>
          </div>
        </div>
      </form>
    );
  }

  buildRows(courses = []) {
    return courses.map((c, i) => (
      <tr key={c.id}>
        <th scope="row">{i + 1}</th>
        <td className="title">{c.title}</td>
        <td className="url">
          <a href={c.url} rel="noopener noreferrer" target="_blank">
            {c.url}
          </a>
        </td>
        <td>
          <button className="btn btn-primary" onClick={() => this.edit(c.id)}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => this.delete(c.id)}>
            Delete
          </button>
        </td>
        <td>
          <button
            className="btn btn-success"
            disabled={c.approved}
            onClick={() => this.approve(c.id)}
          >
            Approve
          </button>
        </td>
      </tr>
    ));
  }

  validate() {
    const { title, url } = this.state;
    const titleRequiredError = !title;
    const urlRequireError = !url;
    const urlInvalidError = url && !url.match(/https?:\/\/\w+/);
    this.setState({ titleRequiredError, urlRequireError, urlInvalidError });

    return !titleRequiredError && !urlRequireError && !urlInvalidError;
  }

  save = event => {
    event.preventDefault();

    const isValid = this.validate();

    if (!isValid) {
      return false;
    }

    const { courses, title, url } = this.state;

    const course = {
      id: Date.now(),
      title,
      url,
      duration: '',
      approved: false,
    };

    axios.post(COURSES_URL, course).then(
      res => {
        console.log('res=', res);

        courses.unshift(course);
        this.setState(initialState);

        console.log('success');
      },
      error => {
        console.error(error);
      }
    );
  };

  edit = cid => {};

  delete = cid => {};

  approve = cid => {};
}

export default Course;
