import React from "react";

// Icons
import { FcGoogle } from "react-icons/fc";

export const LoginGoogle = () => {
  const handleLoginGoogle = async () => {
    window.location = "https://bingwa-b11.vercel.app/api/v1/users/google";
  };

  return (
    <div
      className="bg-white py-2 text-center "
      style={{ border: "2px solid black", borderRadius: "10px", gap: "5px" }}
    >
      <FcGoogle size={30} />
      <span className="ms-2 fw-bold">Masuk dengan Google</span>
    </div>
  );
};
