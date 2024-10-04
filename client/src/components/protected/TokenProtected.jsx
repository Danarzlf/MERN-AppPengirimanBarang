import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper
import { showErrorToast } from "../../helper/ToastHelper";

function TokenProtected({ children }) {
  const navigate = useNavigate();

  const user = localStorage.getItem("User");

  useEffect(() => {
    if (!user) {
      showErrorToast("Silahkan login terlebih dahulu");
      navigate("/login");
    }
  }, []);

  return children;
}

export default TokenProtected;
