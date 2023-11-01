import chill from "../assets/chill.gif";
import cold from "../assets/cold.gif";
import moderate from "../assets/moderate.gif";
import Hot from "../assets/giphy.gif";

export async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function setImage(temperatureCelsius) {
  const temperatureThresholds = {
    cold: 10,
    chilly: 20,
    hot: 30,
  };

  if (temperatureCelsius < temperatureThresholds.cold) {
    return chill;
  } else if (temperatureCelsius < temperatureThresholds.chilly) {
    return cold;
  } else if (temperatureCelsius < temperatureThresholds.hot) {
    return moderate;
  } else {
    return Hot;
  }
}
