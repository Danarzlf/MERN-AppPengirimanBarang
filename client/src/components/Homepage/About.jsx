import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../../components/styles/About.css";
import { TrackContext } from "../../context/TrackContext"; // Adjust the import path as needed
import { CityContext } from "../../context/CityContext";

const About = () => {
  const [showTrackForm, setShowTrackForm] = useState(true); // Initial value set to true
  const [showPriceForm, setShowPriceForm] = useState(false);
  const navigate = useNavigate();

  const {
    trackingId,
    setTrackingId,
    handleTrackPackage,
    shipmentData,
    error,
  } = useContext(TrackContext);

  const { cities, isLoading } = useContext(CityContext);
  console.log(cities);

  const handleTrackClick = () => {
    setShowTrackForm(true);
    setShowPriceForm(false);
  };

  const handlePriceClick = () => {
    setShowPriceForm(true);
    setShowTrackForm(false);
  };

  const handleViewReceipt = () => {
    if (trackingId) {
      navigate(`/receipt/${trackingId}`); // Correctly format the URL to navigate
    }
  };

  return (
    <section id="about">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6 about-text">
            <p data-aos="fade-up" data-aos-delay={200}>
              Tentang Kirimkan
            </p>
            <p data-aos="fade-up" data-aos-delay={400}>
              Daftarkan disini sekolah mengemudi dengan mentor berpengalaman Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, adipisci.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aliquid eos iusto placeat natus aspernatur.
            </p>
            <button className="btn btn-light mt-4">Selengkapnya</button>
          </div>
          <div className="col-lg-6 about-package" data-aos="zoom-out" data-aos-delay={200}>
            <div>
              <button className={`btn ${showTrackForm ? "btn-light" : ""}`} onClick={handleTrackClick}>
                Lacak Paket
              </button>
              <button className={`btn ms-2 ${showPriceForm ? "btn-light" : ""}`} onClick={handlePriceClick}>
                Estimasi Harga
              </button>
            </div>

            {/* Track Package Form */}
            {showTrackForm && (
              <div className="track-package">
                <h3 className="fw-bold">Lacak Paket</h3>
                <p>Lacak paket dengan memasukkan nomor resi di bawah ini</p>
                <input
                  type="text"
                  className="form-control"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
                <button className="btn btn-primary mt-2 btn-track" onClick={handleTrackPackage}>
                  Lacak
                </button>

                {shipmentData ? (
                  <div className="shipment-data mt-3">
                    <h5>Shipment Details</h5>
                    <p><strong>Tracking ID:</strong> {shipmentData?.data?.shipment?._id}</p>
                    <p><strong>Status:</strong> {shipmentData?.data?.shipment?.status}</p>
                    <p><strong>Pengirim:</strong> {shipmentData?.data?.shipment?.sender?.name}</p>
                    <p><strong>Penerima:</strong> {shipmentData?.data?.shipment?.recipient?.name}</p>
                    <p><strong>Alamat Tujuan:</strong> {shipmentData?.data?.shipment?.recipient?.destinationCity}</p>
                    <button onClick={handleViewReceipt}>Lihat Resi</button>
                    <button>Tutup</button>
                  </div>
                ) : error ? (
                  <p className="text-danger mt-3">{error}</p>
                ) : (
                  <p className="text-muted mt-3"></p>
                )}
              </div>
            )}

            {/* Price Estimate Form */}
            {showPriceForm && (
              <div className="track-price">
                <h3 className="fw-bold">Estimasi Harga</h3>
                <p>Hitung estimasi biaya pengiriman paket dari daerahmu</p>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Asal</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tujuan</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Berat</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>

                  <Button variant="primary" className="btn-price" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
