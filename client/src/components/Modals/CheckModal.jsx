import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Import Form for the dropdown
import { useNavigate } from "react-router-dom";
import axios from "axios";

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const CheckModal = ({ show, onHide, noTrack, estimatedCost, shipmentId }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [methodPayment, setMethodPayment] = useState("COD"); // Set initial value for methodPayment
  const [pickupTime, setPickupTime] = useState(dayjs()); // Initial value for pickupTime
  const currentYear = dayjs();

  const handleNext = async () => {
    try {
      // Make a PUT request to update shipment data
      const response = await axios.put(`http://localhost:8000/api/v1/shipments/${shipmentId}`, {
        costShipment: estimatedCost,
        methodPayment: methodPayment,
        pickupTime: pickupTime.toISOString(), // Send the selected pickup time
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

  const handlePickupTimeChange = (newValue) => {
    setPickupTime(newValue); // Update the pickup time when the user selects a new time
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

        <Form.Group className="mt-4">
          <Form.Label>Tentukan kapan barang mau diambil</Form.Label> <br/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                label="Pilih Kapan"
                value={pickupTime}
                onChange={handlePickupTimeChange}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                minDate={currentYear}
              />
            </DemoContainer>
          </LocalizationProvider>
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
