import { createContext, useState, useEffect } from "react";
import { API_ENDPOINT } from "../utils/api-endpoint";

export const TrackContext = createContext();

export const TrackContextProvider = ({ children }) => {
  const [trackingId, setTrackingId] = useState("");
  const [shipmentData, setShipmentData] = useState(() => {
    // Load existing shipment data from localStorage if available
    const savedData = localStorage.getItem("shipmentData");
    return savedData ? JSON.parse(savedData) : null;
  });
  const [error, setError] = useState(null);

  const handleTrackPackage = async () => {
    if (!trackingId) {
      setError("Harap masukkan nomor resi"); // Client-side validation
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/shipments/track/${trackingId}`);

      // Check if the response is not ok (4xx or 5xx status)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data"); // Use the server's error message
      }

      const data = await response.json();
      setShipmentData(data);
      // localStorage.setItem("shipmentData", JSON.stringify(data)); // Save to localStorage
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    }
  };

  

  // console.log("ini data shipment dari context", shipmentData);
  return (
    <TrackContext.Provider
      value={{
        trackingId,
        setTrackingId,
        shipmentData,
        error,
        handleTrackPackage
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
