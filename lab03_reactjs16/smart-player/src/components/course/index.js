import React, { Component, Fragment } from 'react';
import * as api from '../../api';
import EditCourseDialog from './edit_course';
import ConfirmDeleteDilaog from './del_course';
import './course.css';

const initialState = {
  courses: [],

  // add form
  title: '',
  url: 'https://',

  // validation
  titleRequiredError: false,
  urlRequireError: false,
  urlInvalidError: false,

  // edit
  editDialogVisible: false,
  formData: {},

  // delete
  id: null,
  confirmDialogVisible: false,
};

class Course extends Component {
  state = initialState;

  componentDidMount() {
    api
      .getCourses()
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
        <EditCourseDialog
          formData={this.state.formData}
          onFormDataChange={this.onFormDataChange}
          show={this.state.editDialogVisible}
          onHide={this.edit}
        />

        <ConfirmDeleteDilaog
          show={this.state.confirmDialogVisible}
          onHide={this.delete}
        />

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
      <form onSubmit={this.save} noValidate>
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
            <button className="btn btn-primary">Add Video</button>
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
          <button
            className="btn btn-primary"
            onClick={() => this.preEdit(c.id)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.preDelete(c.id)}
          >
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

    api.saveCourse(course).then(
      res => {
        console.log('res=', res);

        courses.unshift(course);
        this.setState({ ...initialState, courses });

        console.log('success');
      },
      error => {
        console.error(error);
      }
    );
  };

  preEdit = id => {
    const courses = this.state.courses;
    const idx = courses.findIndex(c => c.id === id);
    const course = courses[idx];

    this.setState({
      editDialogVisible: true,
      id,
      formData: course,
    });
  };

  onFormDataChange = item => {
    let newForm = { ...this.state.formData, ...item };
    this.setState({ formData: newForm });
  };

  edit = action => {
    this.setState({
      editDialogVisible: false,
    });

    if (action === 'save') {
      const courses = [...this.state.courses];
      const formData = this.state.formData;
      const id = formData.id;

      formData.approved = false;

      const idx = courses.findIndex(c => c.id === id);
      api.updateCourse(id, formData).then(
        res => {
          courses.splice(idx, 1, formData);
          this.setState({ courses });

          console.log('success');
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  preDelete = id => {
    this.setState({
      id,
      confirmDialogVisible: true,
    });
  };

  delete = action => {
    this.setState({
      confirmDialogVisible: false,
    });

    if (action === 'delete') {
      const { id, courses } = this.state;
      api.deleteCourse(id).then(
        res => {
          const idx = courses.findIndex(c => c.id === id);
          courses.splice(idx, 1);
          this.setState({ courses });
          console.log('success');
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  approve = id => {
    const { courses } = this.state;
    api.approveCourse(id).then(
      res => {
        const idx = courses.findIndex(c => c.id === id);
        courses.splice(idx, 1, { ...courses[idx], approved: true });

        this.setState({ courses });
      },
      error => {
        console.error(error);
      }
    );
  };
}

export default Course;
