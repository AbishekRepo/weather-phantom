import { useState, useEffect, createContext, useContext } from "react";
import { weather } from "../data";
import { setImage } from "../utils/utils";

const AppContext = createContext();

export function useWeatherAppContext() {
  return useContext(AppContext);
}

export function WeatherAppProvider({ children }) {
  // State variables
  const [location, setLocation] = useState("chennai");
  const [weatherData, setWeatherData] = useState(weather); // Initialize with default data
  const [isError, isSetError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // Fetch weather data when the location changes
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

  // Calculate image source based on weather data
  useEffect(() => {
    if (weatherData) {
      const temperatureCelsius = weatherData.main.temp - 273.15;
      setImageSrc(setImage(temperatureCelsius));
    }
  }, [weatherData]);

  // Handle input change
  function handleChange(e) {
    setLocation(e.target.value);
  }

  // Create context value
  const contextValue = {
    location,
    handleChange,
    weatherData,
    isError,
    imageSrc,
  };

  // Provide context value to children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
