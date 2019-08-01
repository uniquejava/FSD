import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EditCourseDialog from './edit_course';
import ConfirmDeleteDilaog from './del_course';
import './course.css';
import {
  fetchAllCourses,
  saveCourse,
  updateCourse,
  deleteCourse,
  approveCourse,
} from '../../redux/actions/courseActions';

const initialState = {
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
    this.props.fetchAllCourses();
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
              <tbody>{this.buildRows(this.props.courses)}</tbody>
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

    const { title, url } = this.state;

    const course = {
      id: Date.now(),
      title,
      url,
      duration: '',
      approved: false,
    };

    this.props.saveCourse(course);
    this.setState({ ...initialState });
  };

  preEdit = id => {
    const courses = this.props.courses;
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
      const formData = this.state.formData;
      const id = formData.id;
      formData.approved = false;
      this.props.updateCourse(id, formData);
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
      const { id } = this.state;
      this.props.deleteCourse(id);
    }
  };

  approve = id => {
    this.props.approveCourse(id);
  };
}

const mapStateToProps = state => ({
  courses: state.courses,
});

const mapDispatchToProps = dispatch => ({
  fetchAllCourses: () => dispatch(fetchAllCourses()),
  saveCourse: course => dispatch(saveCourse(course)),
  updateCourse: (id, course) => dispatch(updateCourse(id, course)),
  deleteCourse: id => dispatch(deleteCourse(id)),
  approveCourse: id => dispatch(approveCourse(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);
