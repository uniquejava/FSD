import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class EditCourseDialog extends Component {
  render() {
    console.log('EditCourseDialog render ...');

    const { formData, handleFormDataChange, show, onHide } = this.props;
    const { title, url } = formData;

    return (
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Video update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                name="title"
                className="form-control"
                autoComplete="off"
                value={title}
                onChange={e => {
                  handleFormDataChange({ title: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL:</label>
              <input
                type="url"
                name="url"
                className="form-control"
                autoComplete="off"
                value={url}
                onChange={e => {
                  handleFormDataChange({ url: e.target.value });
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light"
            onClick={() => {
              onHide();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onHide('save');
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditCourseDialog;
