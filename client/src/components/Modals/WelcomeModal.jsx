// WelcomeModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const WelcomeModal = ({ show, handleClose, username }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome, {username}!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Thank you for logging in. Enjoy your chat experience!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
