import {
  Alert,
  Button,
  Form,
  Row,
  Col,
  Stack,
  Container,
} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import loginLogo from "/vite.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { LoginGoogle } from "../../components/google/LoginGoogle";

import "../../components/styles/Login.css";

const Login = () => {
  const {
    loginInfo,
    updateLoginInfo,
    loginUser,
    loginError,
    isLoginLoading,
    logoutUser,
    showLoginPassword,
    toggleShowLoginPassword,
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
              <Form onSubmit={loginUser}>
                <Row
                  style={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center", // Center vertically
                  }}
                >
                  <Col xs={12} md={10} lg={6}>
                    <Stack gap={3}>
                      <h2 className="title-login">Masuk</h2>
                      <div className="flex flex-col gap-2 ">
                        <span className="text-left text-lg">
                          Email/No Telepon
                        </span>
                        <Form.Control
                          placeholder="slamet@gmail.com"
                          onChange={(e) =>
                            updateLoginInfo({
                              ...loginInfo,
                              emailOrPhoneNumber: e.target.value,
                            })
                          }
                          className="placeholder-login"
                        />
                      </div>

                      <div className="flex flex-col gap-2 pt-8">
                        <div>
                          <span className="text-left text-lg">Password</span>
                        </div>

                        <div className="input-group mb-2 mt-1">
                          <Form.Control
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="**********"
                            onChange={(e) =>
                              updateLoginInfo({
                                ...loginInfo,
                                password: e.target.value,
                              })
                            }
                            className="placeholder-login"
                          />
                          {/* <FiEye
                            size={27}
                            className=""
                            onClick={toggleShowLoginPassword}
                          /> */}

                          <span
                            className="input-group-text"
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#EFF1F3 ",
                              border: "1px solid #A6A6A6",
                            }}
                            onClick={toggleShowLoginPassword}
                          >
                            {showLoginPassword ? (
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
                        <span className="cursor-pointer text-lg font-semibold text-primary">
                          <Link
                            to="/forget-password"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            Lupa Kata Sandi
                          </Link>
                        </span>
                      </div>

                      {/* <Form.Check
                        type="checkbox"
                        label="Show Password"
                        onChange={toggleShowLoginPassword}
                      /> */}

                      <Button className="btn-login" type="submit">
                        {isLoginLoading ? "Getting you in..." : "Login"}
                      </Button>

                      <LoginGoogle />

                      <h3 className="to-register">
                        Belum punya akun?
                        <span>
                          <Link
                            to="/register"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            Daftar di sini.
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
    </>
  );
};

export default Login;
