import { useState } from "react";
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

// Helper
import { showSuccessToast, showErrorToast } from "../../helper/ToastHelper";

import "../../components/styles/Login.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showSuccessToast(data.message);
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };
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
              <Form onSubmit={handleSubmit}>
                <Row
                  style={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center", // Center vertically
                  }}
                >
                  <Col xs={12} md={10} lg={6}>
                    <Stack gap={3}>
                      <h2 className="title-login">Lupa Password</h2>

                      <div className="flex flex-col gap-2 ">
                        <span className="text-left text-lg">Email</span>
                        <Form.Control
                          type="email"
                          placeholder="slamet@gmail.com"
                          className="placeholder-login"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <Button className="btn-login" type="submit">
                        Reset Password
                      </Button>
                    </Stack>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgetPassword;
