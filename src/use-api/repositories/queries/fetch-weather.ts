import { WeatherRaw } from "use-api/interfaces/weather";
import apiCaller from "../api-caller";
import { sanitizeWeatherFromRaw } from "use-api/sanitizers/weather";

export interface FetchWeatherPayload {
  city: string;
}

const fetchWeather = async (payload: FetchWeatherPayload) => {
  const weather = await apiCaller<WeatherRaw>(`weather?city=${payload.city}`, {
    method: "GET",
  });

  return sanitizeWeatherFromRaw(weather);
};

export default fetchWeather;
