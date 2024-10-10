import { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ProfileContext } from "../../context/ProfileContext";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import axios for API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../components/styles/Profile.css';
import Cookies from 'js-cookie';

const LinkUpProfile = () => {
  const { userProfiles } = useContext(ProfileContext);
  const [showPesanan, setShowPesanan] = useState(true); // State to toggle between Pesanan and Riwayat
  const [shipments, setShipments] = useState([]); // State to store shipments data
  const [error, setError] = useState(""); // State to handle errors
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const navigate = useNavigate(); // Initialize useNavigate

  console.log("shipment di pesanan saya", shipments)
  
  // Fetch shipments data from API
  const fetchShipments = async () => {
    try {
      const userCookie = Cookies.get("User"); // Get the User cookie
      const user = userCookie ? JSON.parse(userCookie) : null; // Get the User object from local storage
  
      if (!user || !user.data || !user.data.token) {
        throw new Error("User is not authenticated"); // Handle case where user or token is missing
      }
  
      const token = user.data.token; // Extract the token from user.data.token
  
      const response = await axios.get("http://localhost:8000/api/v1/shipments", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      // Assuming response.data.data contains the shipments
      const sortedShipments = response.data.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by creation date in descending order
      });

      setShipments(sortedShipments);
    } catch (err) {
      setError("Failed to fetch shipments. Please try again.");
    }
  };

  useEffect(() => {
    fetchShipments(); // Call the fetchShipments function when the component mounts
  }, []);

  // Filter shipments to include only those with a non-null and non-zero costShipment
  const filteredShipments = shipments.filter(shipment => 
    shipment.costShipment != null && shipment.costShipment !== 0
  );

  // Handle search logic
  const searchResults = filteredShipments.filter(shipment =>
    shipment.noTrack?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by tracking number
    shipment.type?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by type
    shipment.payments?.status?.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by status
  );

  return (
    <>
      <div className="card">
        <ul className="">
          {/* <div className="title-profile-booking list-group-item d-flex justify-content-between align-items-center flex-wrap">
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
          </div> */}
          <div className="profile-booking">
            {/* {error && <p>{error}</p>}  */}
            
            {showPesanan ? (
              <>
                <h5>Pesanan</h5>
                <p style={{ fontSize: '14px' }}>Pesanan kamu akan tampil disini</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Cari"
                    value={searchTerm} // Bind the input value to searchTerm state
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
                    style={{ width: '200px' }} // Set custom width here
                  />
                </div>
                <Table hover className="mt-4">
                  <thead>
                    <tr>
                      {/* <th></th> */}
                      <th>no resi</th>
                      <th>tipe</th>
                      <th>tanggal</th>
                      <th>ongkir</th>
                      <th>waktu paket diambil</th>
                      <th>status</th>
                      <th>aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((shipment, index) => (
                      <tr key={index}>
                        {/* <td>{index + 1}</td> */}
                        <td>{shipment?.noTrack}</td>
                        <td>{shipment?.type}</td>
                        <td>
                          {new Date(shipment?.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          }).replace(/\//g, '-')}
                        </td>
                        <td>{shipment?.costShipment}</td>
                        <td>
                          {shipment?.pickupTime
                            ? `${new Date(shipment.pickupTime).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                              }).replace(/\//g, '-')}` +
                              ' jam ' +
                              `${new Date(shipment.pickupTime).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}`
                            : 'N/A'}
                        </td>
                        <td>
                          <Button
                            style={{
                              backgroundColor: shipment?.payments?.status === 'settlement' ? 'green' : 'red',
                              color: 'white',
                              border: 'none',
                            }}
                          >
                            {shipment?.payments?.status}
                          </Button>
                        </td>
                        <td>
                          {/* <Button className="me-2" style={{ backgroundColor: "var(--main-color)", border: "none" }}>Detail</Button> */}
                          <Button style={{ backgroundColor: "var(--main-color)", border: "none" }} onClick={() => navigate(`/receipt/${shipment.noTrack}`)}>Cek Resi</Button>
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
                    {searchResults.map((shipment, index) => (
                      <tr key={index}>
                        <td>{shipment.trackingNumber}</td>
                        <td>{shipment.bookingNumber}</td>
                        <td>{shipment.date}</td>
                        <td>
                          <Button onClick={() => navigate(`/receipt/${shipment.trackingNumber}`)}>Aksi</Button>
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
