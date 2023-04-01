import {  useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  CurrentWeatherModel,
  emptyCurrentWeather,
} from "../models/CurrentWeatherModel";
import { WeatherApiModel, emptyWeatherApi } from "../models/WeatherApiModel";

export const apiURL = `https://dev-1.pl/weather-api`;

const useFetchApi = () => {
  const [url, setUrl] = useState("");
  const [weather, setWeather] = useState<CurrentWeatherModel>(emptyCurrentWeather);
  const [timestamp, setTimestamp] = useState("");

  const { data, status, refetch } = useQuery({
    enabled: false,
    queryKey: [""],
    queryFn: async (): Promise<WeatherApiModel> => {
      const response = await fetch(url).then((response) => {
        if (response.headers.get("content-type") === "text/html") {
          const emptyWeather = emptyWeatherApi;
          emptyWeather.weather = JSON.stringify(emptyCurrentWeather);

          return emptyWeather;
        } else if (response.headers.get("content-type") === "application/json")
          return response.json();
      });

      return response;
    },
  });

  useEffect(() => {
    setWeather(emptyCurrentWeather);
  }, []);
  useEffect(() => {
    if(url)
    refetch()
  }, [url]);

  useEffect(() => {
    if (status === "success" && data) {
      setWeather(JSON.parse(data.weather));
      setTimestamp(data.updated_at);
    }
  }, [status]);


  const setQuery = (queryUrl: string) => {
    setUrl(queryUrl)
  };

  return { status: status, weather: weather, timestamp: timestamp, setQuery: setQuery}
      
}


export default useFetchApi;
