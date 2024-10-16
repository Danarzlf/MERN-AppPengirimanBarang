import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
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
  // console.log(cities);

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
  
  const handleClick = () => {
    navigate('/about-us'); // Arahkan ke /about-us saat tombol diklik
  };

  const handleClickEstimation = () => {
    navigate('/cost-estimation'); // Arahkan ke /about-us saat tombol diklik
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
            <button className="btn mt-4" style={{backgroundColor:'#3884c4', color:"white"}} onClick={handleClick}>Selengkapnya</button>
          </div>
          <div className="col-lg-6 about-package" data-aos="zoom-out" data-aos-delay={200}>
            <div>
              <button className={`btn ${showTrackForm ? "btn-light" : "text-white"}`} onClick={handleTrackClick}>
                Lacak Paket
              </button>
              <button className={`btn ms-2 ${showPriceForm ? "btn-light" : "text-white"}`} onClick={handlePriceClick}>
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
                  maxLength={30}
                />
                <button className="btn mt-2 btn-track" style={{backgroundColor: "#3884c4", color:"white"}} onClick={handleTrackPackage}>
                  Lacak
                </button>

                {shipmentData ? (
                  <>
                    <Table hover className="mt-4">
                      <thead>
                        <tr>
                          <th>No Resi</th>
                          <th>tipe</th>
                          <th>status</th>
                          <th>tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{shipmentData?.data?.shipment?.noTrack}</td>
                          <td>{shipmentData?.data?.shipment?.type}</td>
                          <td>{shipmentData?.data?.shipment?.status}</td>
                          <td>
                            {new Date(shipmentData?.data?.shipment?.createdAt).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            }).replace(/\//g, '-')}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <Button className="btn-dark me-auto">Reset</Button> {/* Tombol Reset di kiri */}
                        <Button className="me-1" onClick={handleViewReceipt} style={{ backgroundColor: '#3884c4', border: 'none' }}>Lihat Resi</Button>
                        {/* <Button className="" style={{ backgroundColor: '#3884c4', border: 'none' }}>Detail</Button> */}
                      </div>

                  </>
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

                  <Button variant="primary" className="btn-price" onClick={handleClickEstimation} style={{backgroundColor: "#3884c4", color:"white", border:'none'}} type="submit">
                    Cek Ongkir
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
