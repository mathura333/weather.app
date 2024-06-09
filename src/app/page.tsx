"use client";
import WeatherCard from "./components/weather-card";
import useWeather from "use-api/hooks/queries/use-weather";
import { useState } from "react";
import useQueryParams from "hooks/use-query-params";
import { KEYS } from "constants/keyboard";
import Button from "./components/button";

export default function Home() {
  const queryParams = useQueryParams();

  const city = queryParams.get("city");

  const [currentInputCity, setCurrentInputCity] = useState(city || "");

  const weather = useWeather({
    variables: {
      city: city || "",
    },
    enabled: !!city,
  });

  return (
    <main className="min-h-screen flex justify-center items-center p-24">
      <div className="flex flex-col items-center justify-center gap-20 w-max">
        <div className="flex items-start gap-4">
          <div>
            <input
              className="bg-slate-200 focus:outline-cyan-700 focus:outline-1 caret-cyan-800 py-2 px-4 text-gray-950"
              placeholder="Enter City Name"
              value={currentInputCity}
              onChange={(e) => setCurrentInputCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === KEYS.ENTER) {
                  queryParams.set("city", currentInputCity);
                }
              }}
            />

            <p className="text-red-500">{weather.error?.message}</p>
          </div>

          <Button
            onClick={() => queryParams.set("city", currentInputCity)}
            disabled={!currentInputCity || weather.isLoading}
            isLoading={weather.isLoading}
          >
            Get Weather
          </Button>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-6 flex-wrap">
            <WeatherCard
              title="Temperature"
              value={weather.data ? `${weather.data.temp}°C` : "-"}
            />

            <WeatherCard
              title="Feels like"
              value={weather.data ? `${weather.data.feelsLike}°C` : "-"}
            />
          </div>

          <div className="flex gap-6 flex-wrap">
            <WeatherCard
              title="Humidity"
              value={weather.data ? `${weather.data.humidity}%` : "-"}
            />

            <WeatherCard
              title="Wind Speed"
              value={weather.data ? `${weather.data.windSpeed} kmp` : "-"}
            />
          </div>

          <WeatherCard
            title="Description"
            value={weather.data ? `${weather.data.description}` : "-"}
          />
        </div>
      </div>
    </main>
  );
}
