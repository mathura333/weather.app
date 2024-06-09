import { Weather, WeatherRaw } from "use-api/interfaces/weather";

export const sanitizeWeatherFromRaw = (data: WeatherRaw): Weather => {
  return {
    feelsLike: data.feels_like,
    humidity: data.humidity,
    temp: data.temp,
    tempMax: data.temp_max,
    tempMin: data.temp_min,
    windSpeed: data.wind_speed,
    description: data.description,
  };
};
