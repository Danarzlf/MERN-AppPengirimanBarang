import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const EstimationModal = ({ show, onClose, estimatedCost }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Estimasi Biaya</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{estimatedCost}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

EstimationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    estimatedCost: PropTypes.number
};

export default EstimationModal;
