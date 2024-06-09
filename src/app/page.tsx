import getQueryClient from "utils/get-query-client";
import useWeather from "use-api/hooks/queries/use-weather";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import WeatherPage from "./weather-page";
import { headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = getQueryClient();

  const city =
    typeof searchParams?.["city"] === "string" ? searchParams?.["city"] : "";

  const headersList = headers();
  const host = headersList.get("host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "";

  global.apiBasePath = protocol && host ? `${protocol}://${host}` : "";

  await queryClient.prefetchQuery(
    useWeather.getFetchOptions({
      city,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeatherPage />
    </HydrationBoundary>
  );
}
