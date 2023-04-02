import {  useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  CurrentWeatherModel,
  emptyCurrentWeather,
} from "../models/CurrentWeatherModel";
import { WeatherApiModel, emptyWeatherApi } from "../models/WeatherApiModel";
import { WeatherBlocksProps } from "../WeatherBlocks";

export const apiURL = `https://dev-1.pl/weather-api`;

const useFetchApi = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [url, setUrl] = useState("");
  const [weather, setWeather] = useState<CurrentWeatherModel>(emptyCurrentWeather);
  const [timestamp, setTimestamp] = useState("");
  const queryClient = useQueryClient();

  const { data, status, refetch } = useQuery({
    enabled: !!url,
    retry: true,
    queryKey: ["city", {"city": city}, "country", country, "weather", url],
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
    if (url)
      refetch()
      queryClient.clear();
  }, [url, city, country]);

  useEffect(() => {
    if (status === "success" && data) {
      setWeather(JSON.parse(data.weather));
      setTimestamp(data.updated_at);
    }

  }, [status]);


  const setQuery = ({countryCode, city}:WeatherBlocksProps) => {

    setUrl(`${apiURL}/${countryCode}/${city}`)
    setCity(city)
    setCountry(countryCode)
  };

  return { status: status, weather: weather, timestamp: timestamp, setQuery: setQuery}
      
}


export default useFetchApi;
