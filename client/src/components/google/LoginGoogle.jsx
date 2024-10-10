import React from "react";

// Icons
import { FcGoogle } from "react-icons/fc";

export const LoginGoogle = () => {
  const handleLoginGoogle = async () => {
    window.location = "http://localhost:8000/api/v1/users/google";
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
