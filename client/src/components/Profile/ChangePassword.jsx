import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import '../../components/styles/Profile.css';
import Cookies from "js-cookie"
import { API_ENDPOINT } from "../../utils/api-endpoint";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = async () => {
    // console.log("Attempting to change password...");
  
    // Retrieve token from cookies directly
    const token = Cookies.get("token"); // Get the token directly from the cookie
  
    if (!token) {
      console.error("Token is not available");
      setMessage("Unable to retrieve authentication token.");
      setMessageType("error");
      return;
    }
  
    try {
      const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CHANGE_PASSWORD}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Use the token directly
        },
        body: JSON.stringify({
          oldPassword, // Old password value (should be a state or passed from somewhere)
          newPassword, // New password value (should be a state or passed from somewhere)
          newPasswordConfirmation, // New password confirmation (should be a state or passed from somewhere)
        }),
      });
  
      const result = await response.json();
  
      console.log("API Response:", result);
  
      if (result.status) {
        setMessage(result.message);
        setMessageType("success");
      } else {
        setMessage(result.message);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while changing the password.");
      setMessageType("error");
    }
  };
  

  return (
    <>
      <div className="card p-4">
        <div className="form-container">
          {message && (
            <Alert variant={messageType === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}
          <div className="form-group mb-5">
            <label className="form-label">Password Saat Ini</label>
            <div className="input-container">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="form-control short-input"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className="input-group-text"
                onClick={toggleCurrentPasswordVisibility}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#EFF1F3",
                  border: "1px solid #A6A6A6",
                }}
              >
                {showCurrentPassword ? (
                  <FiEyeOff size={27} className="text-slate-400 show-pw" />
                ) : (
                  <FiEye size={27} className="text-slate-400 show-pw" />
                )}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">Password Baru</label>
            <div className="input-container">
              <input
                type={showNewPassword ? "text" : "password"}
                className="form-control short-input"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="input-group-text"
                onClick={toggleNewPasswordVisibility}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#EFF1F3",
                  border: "1px solid #A6A6A6",
                }}
              >
                {showNewPassword ? (
                  <FiEyeOff size={27} className="text-slate-400 show-pw" />
                ) : (
                  <FiEye size={27} className="text-slate-400 show-pw" />
                )}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Ulangi Password Baru</label>
            <div className="input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control short-input"
                id="confirmPassword"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              />
              <span
                className="input-group-text"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#EFF1F3",
                  border: "1px solid #A6A6A6",
                }}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={27} className="text-slate-400 show-pw" />
                ) : (
                  <FiEye size={27} className="text-slate-400 show-pw" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handlePasswordChange}>Ganti Password</Button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
