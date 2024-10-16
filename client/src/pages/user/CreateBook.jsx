import { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Alert  } from "react-bootstrap";
import { ProfileContext } from "../../context/ProfileContext";
import NavBarNormal from "../../components/NavBar/NavBarNormal";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../utils/api-endpoint";

// CSS
import "../../components/styles/CreateBook.css";

// Contoh URL gambar, ganti dengan path atau URL gambar yang sebenarnya
const pickupImage = "pickup-.png";
const dropoffImage = "dropoff-.png";

const CreateBook = () => {
  const { userProfiles } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan kesalahan
  const navigate = useNavigate();

  const createShipment = async (type) => {
    if (!userProfiles || !userProfiles._id) {
      console.error("User profile is not available");
      return;
    }
  
    try {
      setLoading(true); // Set loading to true before making the request
      setErrorMessage(""); // Reset error message

      const noTrack = `TRK-${Date.now()}`; // Generate tracking number
      const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CREATE_SHIPMENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userProfiles._id, // Get userId from userProfiles
          noTrack: noTrack, // Use the generated tracking number
          type: type === "PickUp" ? "PickUp" : "DropOff", // Ensure exact case ('PickUp' or 'DropOff')
          status: "Pending",
        }),
      });
  
      // Check for 429 Too Many Requests
      if (response.status === 429) {
        const data = await response.json();
        setErrorMessage(data.error || " silakan coba lagi nanti.");
        setLoading(false); // Set loading to false after handling error
        return; // Stop further processing
      }
  
      const data = await response.json();
      setLoading(false); // Set loading to false after the request completes
  
      if (data.status) {
        console.log("Shipment created successfully:", data);
        const shipmentId = data.data._id; // Assuming the created shipment's ID is returned in the data
        // Navigate to the create-pickup page with shipmentId and noTrack
        navigate("/create-pickup", { state: { shipmentId, noTrack } });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      setLoading(false); // Set loading to false on error
      console.error("Error creating shipment:", error);
    }
  };

  return (
    <>
      <div className="droppoint-title mb-4">
        <h1 className="mb-4">Create Book</h1>
        <p>Home &gt; Create Book</p>
      </div>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card className="mb-4 card-book">
              <Row noGutters>
                <Col md={4}>
                  <Card.Img
                    variant="left"
                    src={pickupImage}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Pickup</Card.Title>
                    <Card.Text>
                      Layanan pickup kami memungkinkan barang Anda dijemput langsung oleh kurir kami dari rumah Anda. Anda tidak perlu repot keluar rumah, kurir kami akan datang dan mengambil barang Anda dengan aman dan cepat.
                    </Card.Text>
                    <Button
                      onClick={() => createShipment("PickUp")} // Call the API with 'Pickup' as the type
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? "Processing..." : "Pilih"}
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 card-book">
              <Row noGutters>
                <Col md={4}>
                  <Card.Img
                    variant="left"
                    src={dropoffImage}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>DropOff</Card.Title>
                    <Card.Text>
                      Dengan layanan dropoff, Anda dapat membawa barang Anda ke lokasi terdekat yang telah bekerja sama dengan kami. Ini memberikan fleksibilitas lebih bagi Anda untuk memilih waktu dan tempat yang paling nyaman untuk mengirim barang Anda.
                    </Card.Text>
                    <Button
                      onClick={() => createShipment("DropOff")} // Call the API with 'DropOff' as the type
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? "Processing..." : "Pilih"}
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Display error message */}
      </Container>
      <NavBarNormal />
      <Footer />
    </>
  );
};

export default CreateBook;
