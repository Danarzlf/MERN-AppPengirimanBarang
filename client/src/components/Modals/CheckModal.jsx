import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Import Form for the dropdown
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckModal = ({ show, onHide, noTrack, estimatedCost, shipmentId }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [methodPayment, setMethodPayment] = useState("COD"); // Set initial value for methodPayment

  const handleNext = async () => {
    try {
      // Make a PUT request to update costShipment and methodPayment
      const response = await axios.put(`http://localhost:8000/api/v1/shipments/${shipmentId}`, {
        costShipment: estimatedCost, // Send the estimatedCost to update costShipment
        methodPayment: methodPayment, // Send the selected methodPayment
      });

      console.log("Update successful:", response.data);

      // Navigate to the receipt page if the update is successful
      navigate(`/receipt/${noTrack}`);
    } catch (error) {
      console.error("Error updating shipment:", error);
    }
  };

  const handlePaymentChange = (event) => {
    setMethodPayment(event.target.value); // Update methodPayment based on user selection
  };

  console.log("INI TRACK DIMODAL", noTrack);
  console.log("ESTIMATED COST DIMODAL", estimatedCost);
  console.log("shipment id DIMODAL", shipmentId);
  console.log("methodPayment DIMODAL", methodPayment);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Check Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Total Harga: {estimatedCost}</p>
        <Form.Group>
          <Form.Label>Metode Pembayaran</Form.Label>
          <Form.Control as="select" value={methodPayment} onChange={handlePaymentChange}>
            <option value="COD">COD</option>
            <option value="Payment Gateway">Payment Gateway</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleNext}>
          Selanjutnya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckModal;
