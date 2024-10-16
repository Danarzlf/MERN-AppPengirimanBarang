import { createContext, useState, useEffect } from "react";
import { API_ENDPOINT } from "../utils/api-endpoint";

export const DropPointContext = createContext();

export const DropPointContextProvider = ({ children }) => {
  const [dropPoints, setDropPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDropPoints = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/v1${API_ENDPOINT.GET_ALL_DROP_POINT}`);

        if (response.ok) {
          const data = await response.json();
          setDropPoints(data);
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching drop points");
        }
      } catch (error) {
        console.error("Error fetching drop points:", error);
        setError("Error fetching drop points. Please try again later.");
      }
    };

    fetchDropPoints();
  }, []);

  return (
    <DropPointContext.Provider
      value={{
        dropPoints,
        isLoading,
        error,
      }}
    >
      {children}
    </DropPointContext.Provider>
  );
};