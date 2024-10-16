import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { ProfileContext } from "../../context/ProfileContext";
import NavBarNormal from "../../components/NavBar/NavBarNormal";
import Footer from "../../components/Footer/Footer";
import "../../components/styles/Receipt.css";
import Cookies from "js-cookie";
import { API_ENDPOINT } from '../../utils/api-endpoint';

const Receipt = () => {
  const { userProfiles } = useContext(ProfileContext);
  const { trackingId } = useParams(); // Get trackingId from URL
  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = Cookies.get("User");
  const isAuthenticated = user !== null;

  // Ambil userId dari userProfiles jika pengguna terautentikasi
  const userId = isAuthenticated ? userProfiles?._id : null;

  // console.log('ini profile di receipt', userProfiles);
  console.log('ini shipdi receipt', shipmentData);

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.TRACK_SHIPMENT.replace(':noTrack', trackingId)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch shipment data");
        }
        const data = await response.json();
        setShipmentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentData();
  }, [trackingId]); // Use trackingId here

  const handlePayment = async () => {
    if (!shipmentData || !userId) return; // Pastikan userId ada sebelum melanjutkan
  
    const { noTrack, costShipment } = shipmentData.data.shipment;
    const shipmentId = shipmentData.data.shipment._id;
  
    // console.log("User ID:", userId);
    // console.log("Shipment ID:", shipmentId);
    // console.log("Amount:", costShipment);
  
    // Mengirim permintaan
    try {
      const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CREATE_PAYMENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          shipmentId: shipmentId,
          amount: costShipment,
        }),
      });
  
      // Log the response status and content
      // console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response from payment API:", result);
  
      // Correctly check for redirect_url
      const redirectUrl = result.data?.redirect_url; // Access redirect_url from the correct path
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("Failed to initiate payment: No redirect URL found.");
        console.error("Payment response did not contain a redirect URL:", result);
      }
    } catch (err) {
      console.error("Error during payment process:", err);
      alert(`An error occurred while processing the payment: ${err.message}`);
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBarNormal />
      <div className="container bootstrap snippets bootdey container-receipt">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row m-0">
              <div className="col-md-2 col-sm-2 text-left">
                <h4><strong>KirimKan</strong></h4>
              </div>
              <div className="col-md-10 col-sm-10 text-center">
                <p><strong>{shipmentData?.data?.shipment?.noTrack}</strong></p> {/* Display tracking ID from URL */}
              </div>
            </div>
            <hr className="mt-0" />
            <div className="row">
              <div className="col-md-6 col-sm-6 text-left small-text">
                <h5><strong>Penerima</strong></h5>
                <ul className="list-unstyled">
                  <li><strong>{shipmentData?.data?.shipment?.recipient?.name}</strong></li>
                  <li><strong>Home</strong></li>
                  <li>{shipmentData?.data?.shipment?.recipient?.address}</li>
                  <li>{shipmentData?.data?.shipment?.recipient?.destinationCity}</li>
                </ul>
              </div>

              <div className="col-md-6 col-sm-6 text-right small-text" style={{ textAlign: "right" }}>
                <h5><strong>Pengirim</strong></h5>
                <ul className="list-unstyled">
                  <li><strong>{shipmentData?.data?.shipment?.sender?.name}</strong></li>
                  <li>{shipmentData?.data?.shipment?.sender?.phoneNumber}</li>
                  <li>{shipmentData?.data?.shipment?.sender?.originCity}</li>
                </ul>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-condensed nomargin">
                <thead>
                  <tr>
                    <th>Nama Produk</th>
                    <th>Tinggi</th>
                    <th>Lebar</th>
                    <th>Panjang</th>
                    <th>Berat &#40;kg&#41;</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentData?.data?.shipment?.packages?.map((pkg, index) => (
                    <tr key={index}>
                      <td><div><small>{pkg.itemName}</small></div></td>
                      <td>{pkg.height}</td>
                      <td>{pkg.width}</td>
                      <td>{pkg.length}</td>
                      <td>{pkg.weight} &#40;kg&#41;</td>
                      <td>{pkg.quantity}</td>
                    </tr>
                  ))} 
                </tbody>
              </table>
            </div>

            <div className="row">
              <div className="col-sm-6 text-left">
                <p className="m-0"><strong><small>Catatan:</small> </strong></p>
                <small>{shipmentData?.data?.shipment?.packages?.[0]?.remarks}</small>
              </div>

              <div className="col-sm-6 text-right" style={{ textAlign: "right" }}>
                <ul className="list-unstyled">
                  <li><strong>{shipmentData?.data?.shipment?.methodPayment}</strong></li>
                  <li><strong>Total Biaya:</strong></li>
                  <li><strong>{shipmentData?.data?.shipment?.costShipment}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-default text-right mt-3" style={{ textAlign: "right" }}>
          <div className="panel-body">
            {/* Tampilkan tombol "Kembali" hanya jika pengguna tidak terautentikasi */}
            {!isAuthenticated && (
              <a className="btn btn-primary me-2" href="/track">
                <i className="fa fa-check"></i>Kembali
              </a>
            )}
           {isAuthenticated && (
                  <>
                    <a className="btn btn-primary me-2" href="/profile">
                      <i className="fa fa-check"></i>Lihat Pesanan Saya
                    </a>
                    <Button
                      className="btn me-2"
                      style={{ backgroundColor: '#3884c4', color: 'white', border: 'none' }}
                      onClick={handlePayment}
                      disabled={
                        shipmentData?.data?.shipment?.payments?.status === 'settlement' || 
                        shipmentData?.data?.shipment?.payments?.status === 'expire'
                      }
                    >
                      {shipmentData?.data?.shipment?.payments?.status === 'settlement' 
                        ? 'Sudah Bayar' 
                        : shipmentData?.data?.shipment?.payments?.status === 'expire' 
                        ? 'Expire' 
                        : shipmentData?.data?.shipment?.payments?.status === 'pending' 
                        ? 'Bayar Sekarang' 
                        : 'Bayar Sekarang'}
                    </Button>

                  </>
                )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Receipt;
