import React from "react";
import "../../components/styles/WhyUs.css";

const WhyUs = () => {
  return (
    <section id="whyus">
      <div className="container">
        <div className="text-center mb-5">
          <h1>Kenapa KIRIMKAN?</h1>
          <p>Percayakan pengiriman paket Anda dengan KIRIMKAN</p>
        </div>
        <div className="image-text-container">
          <div className="image-text">
            <img src="VIPCustomer.svg" alt="Profile" />
            <div>
              <h5>Diskon Spesial</h5>
              <p>Biaya kirim terhemat dibanding yang lain</p>
            </div>
          </div>
          <div className="image-text">
            <img src="VIPCustomer-4.svg" alt="Profile" />
            <div>
              <h5>Pasti di PickUp</h5>
              <p>Fasilitas GRATIS Pick Up yang fleksibel sesuai kebutuhan</p>
            </div>
          </div>
          <div className="image-text">
            <img src="VIPCustomer-3.svg" alt="Profile" />
            <div>
              <h5>Bisa COD</h5>
              <p>Sistem COD menambah potensi penjualan yang lebih tinggi</p>
            </div>
          </div>
          <div className="image-text">
            <img src="VIPCustomer-2.svg" alt="Profile" />
            <div>
              <h5>Tim Berdedikasi</h5>
              <p>Tim yang berdedikasi untuk memantau setiap kiriman paket</p>
            </div>
          </div>
          <div className="image-text">
            <img src="VIPCustomer-1.svg" alt="Profile" />
            <div>
              <h5>Cashback & Reward</h5>
              <p>Berkesempatan mendapatkan cashback dan reward menarik</p>
            </div>
          </div>
          <div className="image-text">
            <img src="VIPCustomer-5.svg" alt="Profile" />
            <div>
              <h5>Realtime Tracking</h5>
              <p>Kemudahan pelacakan kiriman melalui website ONDELIVERY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
