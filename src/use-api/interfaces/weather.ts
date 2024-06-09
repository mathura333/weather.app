export interface WeatherRaw {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  wind_speed: number;
  humidity: number;
  description?: string;
}

export interface Weather {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  windSpeed: number;
  humidity: number;
  description?: string;
}
