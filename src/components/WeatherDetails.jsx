import React from "react";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import strom from "../assets/storm.png";
import locationImg from "../assets/location.png";
import { useWeatherAppContext } from "../context/context";

function WeatherDetails({ weatherData }) {
  // Destructure data from the weatherData prop
  const { main, sys, clouds, weather, wind } = weatherData;

  // Calculate temperature in Celsius and format sunrise and sunset times
  const temperatureInCelsius = Math.floor((main.temp - 273.15).toFixed(2));
  const date = new Date(sys.sunrise * 1000);
  const sunriseTime = date.toLocaleTimeString();
  const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();

  // Get the image source from the context
  const { imageSrc } = useWeatherAppContext();

  return (
    <div className="weather-container">
      <div className="celcius">
        <p style={{ fontSize: "3rem" }}>{weather[0].main}</p>
        <p style={{ fontSize: "6rem" }}>{temperatureInCelsius}°C</p>
      </div>
      <div className="content">
        <div className="info">
          <div className="info-block">
            <p>
              <img src={cloud} alt="" className="h-7 text-white" />
              {clouds.all}%
            </p>
            <p>
              <img src={humidity} alt="" className="h-7" />
              {main.humidity}%
            </p>
            <p>
              <img src={strom} alt="" className="h-7" /> {wind.speed} m/s
            </p>
          </div>
          <div className="info-block-sun">
            <p>Sunrise: {sunriseTime}</p>
            <p>Sunset: {sunsetTime}</p>
          </div>
          <div className="info-block-name">
            <h1
              className="flex text-9xl text-center"
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            >
              <img src={locationImg} alt="" className="h-6" />
              {weatherData.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="gify">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  );
}

export default WeatherDetails;
