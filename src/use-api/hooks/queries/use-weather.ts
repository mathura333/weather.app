import { createQuery } from "react-query-kit";
import { Weather } from "use-api/interfaces/weather";
import fetchWeather, {
  FetchWeatherPayload,
} from "use-api/repositories/queries/fetch-weather";
import { RQ_WEATHER } from "../query-keys";

const useWeather = createQuery<Weather, FetchWeatherPayload, Error>({
  queryKey: [RQ_WEATHER],
  fetcher: fetchWeather,
});

export default useWeather;
