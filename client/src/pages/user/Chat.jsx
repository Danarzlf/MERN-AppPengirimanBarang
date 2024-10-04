import { useContext } from "react";
import { Container } from "react-bootstrap";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "../../context/AuthContext";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/HomePage/Hero";
import About from "../../components/HomePage/About";
import Service from "../../components/HomePage/Service";
import WhyUs from "../../components/HomePage/WhyUs";
import WelcomeModal from "../../components/Modals/WelcomeModal";

import "../../components/styles/Chat.css";

const Chat = () => {
  const { userProfiles } = useContext(ProfileContext);
  const {
    welcomeModal,
    hideWelcomeModal,
    isLogoutModalVisible,
    hideLogoutModal,
  } = useContext(AuthContext);

  // console.log(userProfiles);
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavBar />
        <Hero />
        <About />
        <Service />
        <WhyUs />

        {/* <Container style={{ flex: 1 }}>
          {userProfiles && (
            <span className="text-danger">
              Logged in as {userProfiles?.UserProfile?.fullName}
            </span>
          )}
        </Container> */}

        {welcomeModal && (
          <WelcomeModal
            show={welcomeModal}
            handleClose={hideWelcomeModal}
            username={userProfiles?.UserProfile?.fullName}
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Chat;
