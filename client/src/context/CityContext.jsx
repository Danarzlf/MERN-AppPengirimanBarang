import { createContext, useState, useEffect } from "react";
import { API_ENDPOINT } from "../utils/api-endpoint";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.GET_ALL_CITY}`);

        if (response.ok) {
          const data = await response.json();
          setCities(data);
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching cities");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError("Error fetching cities. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities, isLoading, error }}>
      {children}
    </CityContext.Provider>
  );
};
