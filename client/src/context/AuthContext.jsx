import { createContext, useCallback, useState } from "react";
import { postRequest } from "../utils/service";
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

  
  // pakai cookie
  useEffect(() => {
    const userCookie = Cookies.get("token");
  
    if (userCookie) {
      // Token exists, set it directly
      setUser(userCookie); // Assuming you want to store the token directly
    } else {
      // Optionally clear the user state if no token is found
      setUser(null); // Set user to null if no token is found
    }
  }, []);
  

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
        `${API_ENDPOINT.BASE_URL}${API_ENDPOINT.USER_REGISTER}`,
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
        `${API_ENDPOINT.BASE_URL}${API_ENDPOINT.USER_LOGIN}`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);
      if (response.error) {
        setLoginError(response);
        showErrorToast(response.message); // Show error toast
        return;
      }

      // Assuming your response directly contains the token
      const { token } = response; // Destructure the token from the response
      Cookies.set("token", token, { expires: 7 }); // Set the token cookie directly
      setUser(response); // Store user info in state (if needed)

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
      const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.VERIFY_OTP}`, {
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

    Cookies.remove("token"); // Remove the User cookie
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
