import { useContext } from "react";
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
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

// Modals
import LoadingModal from "../../components/Modals/LoadingModal";

import "../../components/styles/Register.css";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    showRegisterPassword,
    toggleShowRegisterPassword,
    isModalLoadingVisible,
  } = useContext(AuthContext);
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
              <Form onSubmit={registerUser}>
                <Row
                  style={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center", // Center vertically
                  }}
                >
                  <Col xs={6}>
                    <Stack gap={3}>
                      <h2 className="title-register">Register</h2>

                      <div className="flex flex-col gap-2 ">
                        <span className="text-left text-lg">Nama</span>
                        <Form.Control
                          type="text"
                          placeholder="Nama Lengkap"
                          onChange={(e) =>
                            updateRegisterInfo({
                              ...registerInfo,
                              fullName: e.target.value,
                            })
                          }
                          className="placeholder-register"
                        />
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <span className="text-left text-lg">
                          Email/No Telepon
                        </span>
                        <Form.Control
                          type="email"
                          placeholder="slamet@gmail.com"
                          onChange={(e) =>
                            updateRegisterInfo({
                              ...registerInfo,
                              email: e.target.value,
                            })
                          }
                          className="placeholder-register"
                        />
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <span className="text-left text-lg">Nomor Telepon</span>
                        <Form.Control
                          type="number"
                          placeholder="08"
                          onChange={(e) =>
                            updateRegisterInfo({
                              ...registerInfo,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="placeholder-register"
                        />
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <span className="text-left text-lg">Buat Password</span>
                        <div className="input-group mb-2 mt-1">
                          <Form.Control
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="Masukkan Password"
                            onChange={(e) =>
                              updateRegisterInfo({
                                ...registerInfo,
                                password: e.target.value,
                              })
                            }
                            className="placeholder-register"
                          />

                          <span
                            className="input-group-text"
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#EFF1F3 ",
                              border: "1px solid #A6A6A6",
                            }}
                            onClick={toggleShowRegisterPassword}
                          >
                            {showRegisterPassword ? (
                              <FiEye
                                size={27}
                                className="text-slate-400 show-pw"
                              />
                            ) : (
                              <FiEyeOff
                                size={27}
                                className="text-slate-400 show-pw"
                              />
                            )}
                          </span>
                        </div>
                      </div>

                      {/* <Form.Check
                        type="checkbox"
                        label="Show Password"
                        onChange={toggleShowRegisterPassword}
                      /> */}
                      <Button className="btn-login" type="submit">
                        {isRegisterLoading
                          ? "Creating your account"
                          : "Register"}
                      </Button>
                      {/* {registerError?.error && (
                        <Alert variant="danger">
                          <p>{registerError?.message}</p>
                        </Alert>
                      )} */}
                      <h3 className="to-login">
                        Sudah punya akun?{" "}
                        <span>
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            Login di sini.
                          </Link>
                        </span>
                      </h3>
                    </Stack>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Container>
      {isModalLoadingVisible && <LoadingModal />}
    </>
  );
};

export default Register;
