import { createContext, useState, useEffect } from "react";
import { API_ENDPOINT } from "../utils/api-endpoint";

export const TrackContext = createContext();

export const TrackContextProvider = ({ children }) => {
  const [trackingId, setTrackingId] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackPackage = async () => {
    if (!trackingId) {
      setError("Harap masukkan nomor resi"); // Client-side validation
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.TRACK_SHIPMENT.replace(':noTrack', trackingId)}`);

      // Check if the response is not ok (4xx or 5xx status)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data"); // Use the server's error message
      }

      const data = await response.json();
      setShipmentData(data);
  
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    }
  };

  
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
