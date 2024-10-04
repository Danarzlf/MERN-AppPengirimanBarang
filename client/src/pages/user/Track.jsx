import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBarNormal from "../../components/NavBar/NavBarNormal";
import Footer from "../../components/Footer/Footer";
import Table from 'react-bootstrap/Table';
import { TrackContext } from "../../context/TrackContext";

// CSS
import "../../components/styles/Track.css";

const Track = () => {
  const { trackingId, setTrackingId, shipmentData, error, handleTrackPackage } = useContext(TrackContext);
  const navigate = useNavigate(); // Create a navigate function

  const handleViewReceipt = () => {
    navigate(`/receipt/${trackingId}`); // Correctly format the URL to navigate
  };
  console.log(shipmentData)
  return (
    <>
      <div className="droppoint-title mb-4">
        <h1 className="mb-4">Track</h1>
        <p>Home &gt; Track</p>
      </div>
      <div className="container mt-5">
        <h4>Lacak Paket</h4>
        <p>Lacak paketmu dengan memasukkan no resi di bawah ini</p>
        <div className="card mb-3 p-5">
          <div className="card-body">
            <input
              className="track-input"
              type="text"
              placeholder="Input no resi"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <p className="mt-3">*Bedakan dengan titik koma(,) </p>
            <button className="btn btn-primary btn-track" onClick={handleTrackPackage}>
              Lacak Paket
            </button>
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        {shipmentData && (
          <div className="shipment-details">
            <h5>Detail Pengiriman</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No Resi</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Aksi</th>
                  {/* Add more fields as per API response */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{shipmentData.data.shipment.noTrack}</td>
                  <td>{shipmentData.data.shipment.type}</td>
                  <td>{shipmentData.data.shipment.status}</td>
                  <td>
                    <button onClick={handleViewReceipt}>Lihat Resi</button>
                  </td>
                  {/* Map more fields as needed */}
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <NavBarNormal />
      <Footer />
    </>
  );
};

export default Track;
