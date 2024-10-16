import { useContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  Stack,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import { CgLogIn } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosNotificationsOutline, IoIosList } from "react-icons/io";
import { LuLogOut, LuUser } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import LogoutModal from "../Modals/LogoutModal";
import "../styles/NavBar.css";

const NavBar = () => {
  const {
    user,
    logoutUser,
    isLogoutModalVisible,
    hideLogoutModal,
    confirmLogout,
  } = useContext(AuthContext);

  const { userProfiles } = useContext(ProfileContext);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar
        className="navbar fixed-top"
        style={{ height: "5.5rem", padding: "0 30px" }}
      >
        <Container fluid>
         
        <Stack direction="horizontal" gap={4}>
          <h2 className="me-4">
            {/* <img src="/vite.svg" alt="ChatApp Logo" className="logo-image" /> */}
            <Link to="/" className="text-logo link-light text-decoration-none">
              KirimKan
            </Link>
          </h2>
          <NavDropdown
                    id="basic-nav-dropdown"
                    title={
                      <div className="d-flex align-items-center">
                        <p className="m-0 ms-2 text-white">
                          Informasi
                        </p>
                      </div>
                    }
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/track");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span>LACAK PAKET</span>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/cost-estimation");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span>ESTIMASI BIAYA KIRIM</span>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/drop-point" className="flex items-center gap-3 nav-drop">
                        <span>CARI DROP POINT</span>
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <div
                        className="flex items-center gap-3"
                      >
                        <span>FAQ</span>
                      </div>
                    </NavDropdown.Item>
          </NavDropdown>
          <Link
                    to="/service"
                    className="link-light text-decoration-none"
                  >
                   Layanan
           </Link>
            <Link
                    to="/news"
                    className="link-light text-decoration-none"
                  >
                   Berita
           </Link>
            <Link
                    to="/about-us"
                    className="link-light text-decoration-none"
                  >
                   Tentang Kami
           </Link>
          <Link
                    to="/partner"
                    className="link-light text-decoration-none"
                  >
                   Partner
           </Link>
            
          </Stack>
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Cari yang terbaik..."
              className="h-[3rem] w-[12rem] cursor-pointer rounded-xl bg-white px-3 py-2 md:w-[20rem] lg:w-[30rem]"
            />
            <BiSearchAlt
              size={30}
              className="absolute inset-y-2 right-4 hidden cursor-pointer rounded bg-primary p-1 text-white md:flex lg:flex"
            />
          </div> */}

          <Nav>
            <Stack direction="horizontal" gap={4}>
              {userProfiles && (
                <>
                  <Link to="/" className="link-light text-decoration-none">
                    <div className="">
                      <IoIosList
                        size={33}
                        onClick={() => {
                          navigate("/");
                        }}
                      />
                    </div>
                  </Link>
                  <Link
                    to="/notification"
                    className="link-light text-decoration-none"
                  >
                    <IoIosNotificationsOutline
                      size={33}
                      className="hidden lg:flex"
                    />
                  </Link>
                  
                  <Button size="sm" className="nav-bg-profile">
                    <div className="nav-page">
                      <LuUser size={30} />
                      Akun
                    </div>
                  </Button>
                </>
              )}

              {!userProfiles && (
                <>
                  <Link
                    to="/login"
                    className="link-light text-decoration-none login-navbar"
                  >
                    <CgLogIn
                      size={40}
                      className="hidden md:flex lg:flex me-2"
                    />
                    Masuk
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
      <LogoutModal
        show={isLogoutModalVisible}
        handleClose={hideLogoutModal}
        handleLogout={confirmLogout}
      />
    </div>
  );
};

export default NavBar;

