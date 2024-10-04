import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBarNormal from "../../components/NavBar/NavBarNormal";
import Footer from "../../components/Footer/Footer";
import "../../components/styles/Receipt.css";

const Receipt = () => {
  const { trackingId } = useParams(); // Get trackingId from URL
  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = localStorage.getItem("User");
  const isAuthenticated = user !== null;

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/shipments/track/${trackingId}`);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

console.log("ini dari receipt data", shipmentData)
  return (
    <>
      <NavBarNormal />
      <div className="container bootstrap snippets bootdey container-receipt">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row m-0">
              <div className="col-md-2 col-sm-2 text-left">
                <h4><strong>LOGO</strong></h4>
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
              <a className="btn btn-primary me-2" href="/profile">
                <i className="fa fa-check"></i>Lihat Pesanan Saya
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Receipt;
