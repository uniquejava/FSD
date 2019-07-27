import React from 'react';
import { Modal } from 'react-bootstrap';

const EditCourseDialog = ({ formData, onFormDataChange, show, onHide }) => {
  console.log('EditCourseDialog render ...');

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
                onFormDataChange({ title: e.target.value });
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
                onFormDataChange({ url: e.target.value });
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
};

export default EditCourseDialog;
