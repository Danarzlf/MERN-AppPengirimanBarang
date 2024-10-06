import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/user/Chat";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import NavBar from "./components/NavBar/NavBar";
import Notification from "./pages/user/Notification";
import Profile from "./pages/user/Profile";
import Error404 from "./pages/error/Error404";
import OTP from "./pages/user/OTP";
import ForgetPassword from "./pages/user/ForgetPassword";
import UpdatePassword from "./pages/user/UpdatePassword";
import DropPoint from "./pages/user/DropPoint";
import Estimation from "./pages/user/Estimation";
import Track from "./pages/user/track";
import CreateBook from "./pages/user/CreateBook";
import CreatePickUp from "./pages/user/CreatePickUp";
import Payment from "./pages/user/Payment";
import Receipt from "./pages/user/Receipt";
import AboutUs from "./pages/user/AboutUs";

//Style
import "bootstrap/dist/css/bootstrap.min.css";

//Context
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Token Protected
import TokenProtected from "./components/protected/TokenProtected";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* <NavBar /> */}

      <Routes>
        {/* <Route path="/register" element={user ? <Chat /> : <Register />} /> */}
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={user ? <Chat /> : <Register />} />
        <Route path="/login" element={user ? <Chat /> : <Login />} />
        <Route
          path="/notification"
          element={
            <TokenProtected>
              <Notification />
            </TokenProtected>
          }
        />
        <Route
          path="/profile"
          element={
            <TokenProtected>
              <Profile />
            </TokenProtected>
          }
        />

        <Route path="/create-book" element={
            <TokenProtected>
              <CreateBook />
            </TokenProtected>} />

        <Route path="/receipt/:trackingId" element={
             <Receipt />
            } />

        <Route path="/payment" element={
            <TokenProtected>
              <Payment />
            </TokenProtected>} />
        <Route path="/create-pickup" element={
            <TokenProtected>
              <CreatePickUp />
            </TokenProtected>} />
        <Route path="/drop-point" element={<DropPoint />} />
        <Route path="/cost-estimation" element={<Estimation />} />
        <Route path="/track" element={<Track />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
