import React from 'react';
import { Modal } from 'react-bootstrap';

function ConfirmDeleteDilaog(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are about to delete this record, this procedure is irreversible.
        </p>
        <p>Do you want to proceed?</p>
        <p className="debug-url" />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={props.onHide}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.onHide('delete');
          }}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default ConfirmDeleteDilaog;
