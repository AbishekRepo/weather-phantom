import React from "react";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import strom from "../assets/storm.png";
import locationImg from "../assets/location.png";
import Hot from "../assets/giphy.gif";
import cold from "../assets/cold.gif";
import moderate from "../assets/moderate.gif";
import chill from "../assets/chill.gif";

function WeatherDetails({ weatherData }) {
  const { main, sys, clouds, weather, wind } = weatherData;
  const temperatureInCelsius = Math.floor((main.temp - 273.15).toFixed(2));
  const date = new Date(sys.sunrise * 1000);
  const sunriseTime = date.toLocaleTimeString();
  const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();

  const temperatureCelsius = weatherData.main.temp - 273.15;

  // Define temperature thresholds
  const temperatureThresholds = {
    cold: 10,
    chilly: 20,
    hot: 30,
  };

  let temperatureCategory = "";

  if (temperatureCelsius < temperatureThresholds.cold) {
    temperatureCategory = chill;
  } else if (temperatureCelsius < temperatureThresholds.chilly) {
    temperatureCategory = cold;
  } else if (temperatureCelsius < temperatureThresholds.hot) {
    temperatureCategory = moderate;
  } else {
    temperatureCategory = Hot;
  }

  console.log(temperatureCategory);

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
            <h1 className="flex text-9xl" style={{ fontSize: "1.3rem" }}>
              <img src={locationImg} alt="" className="h-6" />
              {weatherData.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="gify">
        <img src={temperatureCategory} alt="" />
      </div>
    </div>
  );
}

export default WeatherDetails;
