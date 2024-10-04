import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UpdateSuccessModal = ({ isVisible, onClose }) => {
  const handleModalClose = () => {
    onClose();
    window.location.reload(); // Reload the page
  };

  return (
    <Modal show={isVisible} onHide={handleModalClose} centered>
      <Modal.Header>
        <Modal.Title>Profile Updated Successfully!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your profile has been updated successfully.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSuccessModal;
