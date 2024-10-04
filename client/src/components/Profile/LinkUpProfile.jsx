import { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import Table from 'react-bootstrap/Table';
import axios from 'axios'; // Import axios for API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../components/styles/Profile.css';

const LinkUpProfile = () => {
  const { userProfiles } = useContext(ProfileContext);
  const [showPesanan, setShowPesanan] = useState(true); // State to toggle between Pesanan and Riwayat
  const [shipments, setShipments] = useState([]); // State to store shipments data
  const [error, setError] = useState(0); // State to handle errors

  const navigate = useNavigate(); // Initialize useNavigate

  console.log("shipment di pesanan saya", shipments)
  // Fetch shipments data from API
  const fetchShipments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("User")); // Get the User object from local storage
  
      if (!user || !user.data || !user.data.token) {
        throw new Error("User is not authenticated"); // Handle case where user or token is missing
      }
  
      const token = user.data.token; // Extract the token from user.data.token
  
      const response = await axios.get("http://localhost:8000/api/v1/shipments", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      setShipments(response.data.data); // Assuming response.data.data contains the shipments
    } catch (err) {
      setError("Failed to fetch shipments. Please try again.");
    }
  };

  useEffect(() => {
    fetchShipments(); // Call the fetchShipments function when the component mounts
  }, []);

  // Filter shipments to include only those with a non-null costShipment
  const filteredShipments = shipments.filter(shipment => shipment.costShipment !== 0);

  return (
    <>
      <div className="card">
        <ul className="">
          <div className="title-profile-booking list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <button 
              className={`btn ${showPesanan ? 'btn-primary' : ''}`} 
              onClick={() => setShowPesanan(true)}
            >
              Pesanan
            </button>
            <button 
              className={`btn ${!showPesanan ? 'btn-primary' : ''}`} 
              onClick={() => setShowPesanan(false)}
            >
              Riwayat
            </button>
          </div>
          <div className="profile-booking">
            {error && <p>{error}</p>} 
            {showPesanan ? (
              <>
                <h5>Pesanan</h5>
                <p>Pesanan kamu akan tampil disini</p>
                <Table hover>
                  <thead>
                    <tr>
                      <th>No. Resi</th>
                      <th>Tipe</th>
                      <th>Tanggal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((shipment, index) => (
                      <tr key={index}>
                        <td>{shipment?.noTrack}</td>
                        <td>{shipment?.type}</td>
                        <td>{shipment?.createdAt}</td>
                        <td>
                          <button onClick={() => navigate(`/receipt/${shipment.noTrack}`)}>Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <h5>Riwayat</h5>
                <p>Riwayat kamu akan tampil disini</p>
                <Table hover>
                  <thead>
                    <tr>
                      <th>No. Resi</th>
                      <th>No. Booking</th>
                      <th>Tanggal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((shipment, index) => (
                      <tr key={index}>
                        <td>{shipment.trackingNumber}</td>
                        <td>{shipment.bookingNumber}</td>
                        <td>{shipment.date}</td>
                        <td>
                          <button onClick={() => navigate(`/receipt/${shipment.trackingNumber}`)}>Aksi</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default LinkUpProfile;    
