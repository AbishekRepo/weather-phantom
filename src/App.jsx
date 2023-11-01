import React, { useState, useEffect } from "react";
import { weather } from "./data";
import InputBox from "./components/InputBox";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [location, setLocation] = useState("chennai");
  const [weatherData, setWeatherData] = useState("");

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
        }
      } catch (error) {
        console.error("Error:", error);
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

  console.log(weatherData);
  return (
    <div className="h-[85vh] rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 mx-10 my-10">
      <InputBox location={location} handleChange={handleChange} />
      <WeatherDetails weatherData={weatherData ? weatherData : weather} />
    </div>
  );
}

export default App;
