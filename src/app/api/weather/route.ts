import { type NextRequest } from "next/server";
import envs from "utils/envs";
import kelvinToCelsius from "utils/kelvin-to-celsius";
import mpsToKph from "utils/mps-to-kph";
import retrieveErrorMessage from "utils/retrieve-error-message";

interface CityDetailRaw {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

interface WeatherDetailRaw {
  dt: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export async function GET(request: NextRequest) {
  try {
    const cityName = request.nextUrl.searchParams.get("city");

    if (!cityName) {
      return Response.json(
        { message: "No city name given" },
        {
          status: 404,
        }
      );
    }

    const cityDetailsResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${envs.OPENWEATHER_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const cityDetails = (await cityDetailsResponse.json()) as CityDetailRaw[];

    if (!cityDetails?.length) {
      return Response.json(
        { message: "No city found" },
        {
          status: 404,
        }
      );
    }

    const latitude = cityDetails[0]?.lat;
    const longitude = cityDetails[0]?.lon;

    const weatherDetailsResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${envs.OPENWEATHER_API_KEY}`,
      {
        method: "GET",
        next: {
          revalidate: 2 * 60,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const weatherDetails =
      (await weatherDetailsResponse.json()) as WeatherDetailRaw;

    return Response.json(
      {
        temp: kelvinToCelsius(weatherDetails.main.temp),
        feels_like: kelvinToCelsius(weatherDetails.main.feels_like),
        temp_min: kelvinToCelsius(weatherDetails.main.temp_min),
        temp_max: kelvinToCelsius(weatherDetails.main.temp_max),
        wind_speed: mpsToKph(weatherDetails.wind.speed),
        humidity: weatherDetails.main.humidity,
        description: weatherDetails.weather[0]?.description,
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage = retrieveErrorMessage(err);

    return Response.json(
      { message: errorMessage },
      {
        status: 500,
      }
    );
  }
}
