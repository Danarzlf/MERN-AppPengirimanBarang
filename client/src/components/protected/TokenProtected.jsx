import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Helper
import { showErrorToast } from "../../helper/ToastHelper";

function TokenProtected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Get the token directly

    if (!token) {
      showErrorToast("Silahkan login terlebih dahulu"); // Show error message
      navigate("/login"); // Redirect to login
    }
  }, [navigate]); // No need to add userCookie as dependency

  return children; // Render the protected children
}

export default TokenProtected;
