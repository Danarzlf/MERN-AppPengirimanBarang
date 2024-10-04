import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper
import { showErrorToast } from "../../../helper/ToastHelper";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

function AdminTokenProtected({ children }) {
  const navigate = useNavigate();

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    if (token === undefined) {
      showErrorToast("Silahkan login terlebih dahulu");
      navigate("/admin/login");
    }
  }, []);

  return children;
}

export default AdminTokenProtected;
