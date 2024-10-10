import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Helper
import { showErrorToast } from "../../helper/ToastHelper";

function TokenProtected({ children }) {
  const navigate = useNavigate();

  const userCookie = Cookies.get("User"); // Get the User cookie

  useEffect(() => {
    const user = userCookie ? JSON.parse(userCookie) : null; // Parse the cookie to get the user object

    if (!user) {
      showErrorToast("Silahkan login terlebih dahulu"); // Show error message
      navigate("/login"); // Redirect to login
    }
  }, [userCookie, navigate]); // Adding userCookie and navigate to the dependency array

  return children; // Render the protected children
}

export default TokenProtected;
