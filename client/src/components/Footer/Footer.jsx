import React from "react";

import "../../components/styles/Footer.css";

const Footer = () => {
  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div className="footer mt-5">
        {/* Footer */}
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "var(--secondary-color)" }}
        >
          {/* Section: Social media */}
          <section
            className="d-flex justify-content-between p-4"
            style={{ backgroundColor: " rgba(0, 0, 0, 0.2)" }}
          >
            {/* Left */}
            <div className="me-5">
              <span>Terhubung dengan kami di jejaring sosial :</span>
            </div>
            {/* Left */}
            {/* Right */}
            <div>
              <a href="" className="text-white me-4">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-twitter" />
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-google" />
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-instagram" />
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-linkedin" />
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-github" />
              </a>
            </div>
            {/* Right */}
          </section>
          {/* Section: Social media */}
          {/* Section: Links  */}
          <section className="">
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold">KirimKan</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Produk & Layanan</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Reguler
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      SameDay
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      NextDay
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Cargo
                    </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Informasi</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Lacak Paket
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Estimasi Biaya Kirim
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      Cari Drop Point
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white text-decoration-none">
                      FAQ
                    </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Kontak</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fas fa-home mr-3" /> Tangerang, Banten, Indonesia
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3" /> Danarzulfi@example.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3" /> +62 821 1410 3452
                  </p>
                  {/* <p>
                    <i className="fas fa-print mr-3" /> + 01 234 567 89
                  </p> */}
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
          </section>
          {/* Section: Links  */}
          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "var(--secondary-color)" }}
          >
            © 2024 Copyright &nbsp;  
            <a className="text-white text-decoration-none" href="https://mdbootstrap.com/">
              KirimKan
            </a>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
      {/* End of .container */}
    </>
  );
};

export default Footer;
