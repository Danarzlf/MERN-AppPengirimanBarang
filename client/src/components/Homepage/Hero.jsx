import { useState } from "react";
import Cookies from "js-cookie";
import LoginModal from "../../components/Modals/LoginModal";
import "../../components/styles/Hero.css";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    const user = Cookies.get('User');
    if (!user) {
      setShowModal(true);
    } else {
      window.location.href = '/create-book';
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up" style={{ textAlign: 'justify' }}>
              Mau barangmu sampai ke tujuan dengan cepat dan aman?
            </h1>
            <h2 data-aos="fade-up" data-aos-delay={400}>
              Kirim sekarang barangmu dengan KirimKan
            </h2>
            <div data-aos="fade-up" data-aos-delay={600}>
              <div className="text-center text-lg-start" onClick={handleButtonClick} style={{ cursor: 'pointer'}}>
              <a 
                  className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                >
                  <span>Kirim Sekarang</span>
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 hero-img"
            data-aos="zoom-out"
            data-aos-delay={200}
          >
            <img src="delivery-removebg.png" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
      <LoginModal showModal={showModal} handleClose={handleCloseModal} />
    </section>
  );
};

export default Hero;
