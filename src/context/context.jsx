import { useState, useEffect, createContext, useContext } from "react";
import { weather } from "../data";

const AppContext = createContext();

export function useWeatherAppContext() {
  return useContext(AppContext);
}

export function WeatherAppProvider({ children }) {
  const [location, setLocation] = useState("chennai");
  const [weatherData, setWeatherData] = useState(weather);
  const [isError, isSetError] = useState(false);

  useEffect(() => {
    const delay = 500;
    const fetchData = async () => {
      try {
        if (location.trim() !== "") {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=02d3addc460c229880bc3d5e27622219`
          );
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          const data = await response.json();
          setWeatherData(data);
          isSetError(false);
        }
      } catch (error) {
        console.error("Error:", error);
        isSetError(true);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  function handleChange(e) {
    setLocation(e.target.value);
  }

  const contextValue = {
    location,
    handleChange,
    weatherData,
    isError,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}