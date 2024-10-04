import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  Row,
  Col,
  Stack,
  Container,
} from "react-bootstrap";
import loginLogo from "/vite.svg";

// Context
import { AuthContext } from "../../context/AuthContext";

// Modals
import RegisterSuccesModal from "../../components/Modals/RegisterSuccesModal";
import LoadingModal from "../../components/Modals/LoadingModal";

// Helper
import { showSuccessToast, showErrorToast } from "../../helper/ToastHelper";

import "../../components/styles/OTP.css";

const OTP = () => {
  const { verifyOTP } = useContext(AuthContext);

  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move to the next input box
    if (value !== "" && event.target.nextSibling) {
      event.target.nextSibling.focus();
    }
  };

  const maskedEmail = email
    ? email.charAt(0) +
      "*".repeat(email.indexOf("@") - 1) +
      email.substring(email.indexOf("@"))
    : "";

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await verifyOTP(email, otp.join(""));

      if (result.success) {
        setShowSuccessModal(true);
        showSuccessToast(result.message);
      } else {
        showErrorToast(result.message);
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  return (
    <>
      <Container fluid>
        <div className="row align-items-center">
          <div
            className="col-md-4 d-none d-md-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "var(--main-color)",
              padding: "0",
              height: "100vh",
            }}
          >
            <img
              src={loginLogo}
              alt="background"
              style={{
                width: "35%",
                height: "auto", // Adjust height if needed
              }}
            />
          </div>
          <div className="log col-md-8 col-lg-8 col-md-5 mx-auto">
            <div className="row">
              <Row
                style={{
                  height: "100vh",
                  justifyContent: "center",
                  alignItems: "center", // Center vertically
                }}
              >
                <Col xs={12} md={8} lg={5}>
                  <h1 className="fw-bold">Masukkan OTP</h1>
                  <p className="text-center mt-3 mt-sm-5 mb-4">
                    Ketik 6 digit kode yang dikirimkan ke
                    <span className="fw-bolder">{maskedEmail}</span>
                  </p>
                  <form className="text-center" onSubmit={handleOtpSubmit}>
                    {/* Display error message if exists */}

                    <div className="d-flex justify-content-center ">
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={value}
                          onChange={(event) => handleChange(index, event)}
                          className="text-center otp-column"
                        />
                      ))}
                    </div>
                    <Button
                      className="otp__btn col-12 rounded-4 border-0 mt-2 mt-sm-5"
                      type="submit"
                    >
                      Simpan
                    </Button>
                  </form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
      <RegisterSuccesModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
      />
    </>
  );
};

export default OTP;
