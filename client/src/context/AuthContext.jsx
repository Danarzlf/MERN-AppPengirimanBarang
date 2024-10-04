import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";
import { API_ENDPOINT } from "../utils/api-endpoint";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Helper
import { showSuccessToast, showErrorToast } from "../helper/ToastHelper";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // MODAL
  const [isModalLoadingVisible, setIsModalLoadingVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  // console.log("USERR", user);
  // console.log("loginInfo", loginInfo);
  // console.log("registerInfo", registerInfo);
  // console.log("registerError", registerError);

  //protecting route agar kalo direfresh data user tetep ada
  //pakai local
  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  //pakai cookie
  // useEffect(() => {
  //   const user = Cookies.get("User");
  //   // console.log("User dari Cookie:", user);

  //   try {
  //     const parsedUser = JSON.parse(user);
  //     setUser(parsedUser);
  //   } catch (error) {
  //     console.error("Error saat parsing user:", error);
  //     // Handle error disini, seperti menetapkan state pengguna default atau menghapus cookie
  //   }
  // }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsModalLoadingVisible(true);
      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}${API_ENDPOINT.USER_REGISTER}`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);
      setIsModalLoadingVisible(false);

      if (response.error) {
        setRegisterError(response);
        showErrorToast(response.message); // Show error toast
        return;
      }

      // if (response.error) {
      //   return setRegisterError(response);
      // }

      // Save user email to session storage
      sessionStorage.setItem("userEmail", registerInfo.email);

      // Navigate to OTP page
      navigate("/OTP");
    },
    [registerInfo, navigate]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}${API_ENDPOINT.USER_LOGIN}`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);
      if (response.error) {
        setLoginError(response);
        showErrorToast(response.message); // Show error toast
        return;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);

      // Assuming your response contains a 'successMessage' field
      if (response.message) {
        // showSuccessToast(response.message); // Show success toast from response
        // navigate("/");
        // setWelcomeModal(true);
        window.location.href = "/";
      }
    },
    [loginInfo]
  );

  const verifyOTP = async (email, otp) => {
    try {
      const response = await fetch(`${baseUrl}${API_ENDPOINT.VERIFY_OTP}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("userEmail");
        // Handle success actions if needed
        return { success: true, message: data.message };
      } else {
        // Handle error actions if needed
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error during verification:", error);
      // Handle error actions if needed
      return { success: false, message: "Error during verification" };
    }
  };

  const toggleShowRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const toggleShowLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const showWelcomeModal = () => {
    setWelcomeModal(true);
  };

  const hideWelcomeModal = () => {
    setWelcomeModal(false);
  };

  const logoutUser = useCallback(() => {
    // Show logout confirmation modal
    showLogoutModal();
  }, []);

  const confirmLogout = () => {
    // Hide the logout confirmation modal
    hideLogoutModal();

    // Perform actual logout
    localStorage.removeItem("User");
    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        showRegisterPassword,
        toggleShowRegisterPassword,

        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        showLoginPassword,
        toggleShowLoginPassword,

        verifyOTP,

        logoutUser,
        isLogoutModalVisible,
        hideLogoutModal,
        confirmLogout,

        isModalLoadingVisible,
        welcomeModal,
        hideWelcomeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
