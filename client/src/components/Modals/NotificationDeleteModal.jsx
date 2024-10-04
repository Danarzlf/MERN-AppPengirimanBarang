// src/components/ConfirmDeleteModal.js
import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const NotificationDeleteModal = ({ show, onClose, onConfirm, notificationTitle }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Hapus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin menghapus notifikasi "{notificationTitle}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

NotificationDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  notificationTitle: PropTypes.string.isRequired,
};

export default NotificationDeleteModal;
