import React, { useState } from "react";
import { Alert, Button, Form, Row, Col, Stack, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import loginLogo from "/vite.svg";
import { showSuccessToast, showErrorToast } from "../../helper/ToastHelper";
import "../../components/styles/Login.css";
import axios from "axios";
import { API_ENDPOINT } from '../../utils/api-endpoint';

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      showErrorToast("Password and confirmation do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `${API_ENDPOINT.BASE_URL}${API_ENDPOINT.UPDATE_PASS}`,
        { password, passwordConfirmation },
        { params: { token } }
      );

      if (response.data.status) {
        showSuccessToast(response.data.message);
        navigate("/login"); // Redirect to login page after successful update
      } else {
        showErrorToast(response.data.message);
      }
    } catch (error) {
      showErrorToast("An error occurred while updating the password.");
      console.error("Error updating password:", error);
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
                height: "auto",
              }}
            />
          </div>
          <div className="log col-md-8 col-lg-8 col-md-5 mx-auto">
            <div className="row">
              <Form onSubmit={handlePasswordUpdate}>
                <Row
                  style={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Col xs={12} md={10} lg={6}>
                    <Stack gap={3}>
                      <h2 className="title-login">Reset Password</h2>
                      <div className="flex flex-col gap-2">
                        <span className="text-left text-lg">
                          Masukkan Password Baru
                        </span>
                        <Form.Control
                          type="password"
                          placeholder="Password Baru"
                          className="placeholder-login"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-left text-lg">
                          Ulangi Password Baru
                        </span>
                        <Form.Control
                          type="password"
                          placeholder="Ulangi Password Baru"
                          className="placeholder-login"
                          value={passwordConfirmation}
                          onChange={(e) => setPasswordConfirmation(e.target.value)}
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

export default UpdatePassword;
