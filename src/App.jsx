// import { weather } from "./data";
import InputBox from "./components/InputBox";
import WeatherDetails from "./components/WeatherDetails";
import { useWeatherAppContext, WeatherAppProvider } from "./context/context";

function App() {
  const { location, handleChange, weatherData } = useWeatherAppContext();
  return (
    <div className="h-[85vh] rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 mx-10 my-10 ">
      <InputBox location={location} handleChange={handleChange} />
      <WeatherDetails weatherData={weatherData ? weatherData : weather} />
    </div>
  );
}

function MainApp() {
  return (
    <WeatherAppProvider>
      <App />
    </WeatherAppProvider>
  );
}

export default MainApp;
