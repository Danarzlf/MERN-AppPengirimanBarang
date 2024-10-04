import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterSuccesModal = ({ show }) => {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Modal show={show} onHide={handleLoginRedirect}>
      <Modal.Header closeButton>
        <Modal.Title>Verification Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Congratulations! Your OTP has been successfully verified.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLoginRedirect}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterSuccesModal;
