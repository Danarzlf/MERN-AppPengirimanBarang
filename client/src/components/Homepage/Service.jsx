import React from "react";
import Marquee from "react-fast-marquee";
import "../../components/styles/Service.css";

const Service = () => {
  return (
    <section id="service">
      <div className="container">
        <h1>Layanan KIRIMKAN</h1>
        <p>Tentukan layanan pengiriman paket yang sesuai dengan kebutuhanmu</p>
      </div>
      <div className="marquee-container">
        <Marquee speed={90} gradient={false} spacing={50}>
          <img src="profile-null.png" alt="Profile 1" style={{ marginRight: "90px" }} />
          <img src="profile-null.png" alt="Profile 2" style={{ marginRight: "90px" }} />
          <img src="profile-null.png" alt="Profile 3" style={{ marginRight: "90px" }} />
          <img src="profile-null.png" alt="Profile 3" style={{ marginRight: "90px" }} />
          <img src="profile-null.png" alt="Profile 3" style={{ marginRight: "90px" }} />
        </Marquee>
      </div>
    </section>
  );
};

export default Service;
