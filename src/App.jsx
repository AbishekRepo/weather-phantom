import InputBox from "./components/InputBox";
import WeatherDetails from "./components/WeatherDetails";
import Footer from "./components/Footer";
import { useWeatherAppContext, WeatherAppProvider } from "./context/context";

function App() {
  // Get relevant data from the context using useWeatherAppContext
  const { location, handleChange, weatherData } = useWeatherAppContext();

  return (
    <div className="h-[85vh] rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 mx-10 my-10 ">
      <InputBox location={location} handleChange={handleChange} />
      <WeatherDetails weatherData={weatherData} />
      <Footer />
    </div>
  );
}

function MainApp() {
  return (
    // Provide the context using WeatherAppProvider
    <WeatherAppProvider>
      <App />
    </WeatherAppProvider>
  );
}

export default MainApp;
