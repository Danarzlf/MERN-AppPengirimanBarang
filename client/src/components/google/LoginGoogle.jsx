import React from "react";

// Icons
import { FcGoogle } from "react-icons/fc";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const LoginGoogle = () => {
  const handleLoginGoogle = async () => {
    window.location = `${API_ENDPOINT.BASE_URL}${API_ENDPOINT.GOOGLE}`;
  };

  return (
    <div
    onClick={handleLoginGoogle}
      className="bg-white py-2 text-center"
      style={{ border: "2px solid black", borderRadius: "10px", gap: "5px", cursor:"pointer" }}
    >
      <FcGoogle size={30} />
      <span className="ms-2 fw-bold">Masuk dengan Google</span>
    </div>
  );
};
