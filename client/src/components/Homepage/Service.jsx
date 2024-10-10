import React from "react";
import Marquee from "react-fast-marquee";
import { Button } from "react-bootstrap";
import "../../components/styles/Service.css";

const Service = () => {
  return (
    <>
    <section id="service">
      <div className="container">
        <h1>Produk & Layanan</h1>
        <p>Tentukan layanan pengiriman paket yang sesuai dengan kebutuhanmu</p>
      </div>
      <div className="marquee-container">
    
          <img src="Shipping-rates-active.svg" alt="Profile 1" className="marquee-image" />
          <img src="Tracking-zones-active.svg" alt="Profile 2" className="marquee-image" />
          <img src="Drop-point-active.svg" alt="Profile 3" className="marquee-image" />
          <img src="Events-active.svg" alt="Profile 4" className="marquee-image" />
          <img src="ONAPPS-logo-active.svg" alt="Profile 5" className="marquee-image" />

      </div>
    </section>

    <section
      id="find-us"
      style={{
        backgroundImage: 'url(item-banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container text-center text-white">
        <p className="fw-bold" style={{fontSize:'30px'}}>Taruh barangmu di DropShip terdekat</p>
        <Button style={{ backgroundColor: 'var(--secondary-color)', color: 'white', border:'none' }}>Cari DropShip</Button>
      </div>
    </section>

    </>
  );
};
export default Service;
