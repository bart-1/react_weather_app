import { useEffect, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import {
  CurrentWeatherModel,
  emptyCurrentWeather,
} from "../models/CurrentWeatherModel";
import { WeatherApiModel, emptyWeatherApi } from "../models/WeatherApiModel";
import { useWeatherState } from "./useAppState";

export type StatusProp = "idle" | "error" | "loading" | "success";

export const useFetchApi = <T,>(emptyModel: T, observedKeys: string[]) => {
  const queryClient = useQueryClient();

  const [returnedData, setReturnedData] = useState<T>(emptyModel);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<StatusProp>("idle");

  const { data, refetch } = useQuery({
    enabled: !!url,
    retry: true,
    queryKey: [...observedKeys, url],
    queryFn: async (): Promise<T> => {
      setStatus("loading");
      const response = await fetch(url).then((response) => {
        if (!response.ok) throw new Error("Connection problems");
        else if (response.headers.get("content-type") === "text/html") {
          setStatus("error");
          return Promise.reject(new Error("found nothing"));
        } else if (
          response.headers.get("content-type") === "application/json"
        ) {
          setStatus("success");
          return response.json();
        }
      });
      return response;
    },
    refetchInterval: 10000,
  });

  useEffect(() => {
    queryClient.clear();

    if (url) refetch();
  }, [...observedKeys, url]);

  useEffect(() => {
    if (status === "success" && data) {
      setReturnedData(data);
    }
  }, [status, data]);

  const setNewUrl = (url: string) => {
    setUrl(url);
  };

  return {
    status: status,
    data: returnedData,
    setNewUrl: setNewUrl,
  };
};

export const apiURL = `https://dziwnykot.pl/weather-api-second`;

export const useFetchWeatherAPI = () => {
  const [readyToReturn, setReadyToReturn] =
    useState<CurrentWeatherModel>(emptyCurrentWeather);

  const { status, data, setNewUrl } = useFetchApi<WeatherApiModel>(
    emptyWeatherApi,
    ["city", "countryCode"]
  );

  const {
    setWeather,
    weather,
    setCityName,
    setCountryCode,
    setTimestamp,
    setStatus,
  } = useWeatherState();

  useEffect(() => {
    if (status === "success" && data.weather && data.weather !== "") {
      setReadyToReturn(JSON.parse(data.weather));
      setWeather(JSON.parse(data.weather));
      setCityName(data.city);
      setCountryCode(data.country);
      setTimestamp(data.updated_at);
      setStatus(status);
    } else {
      setReadyToReturn(emptyCurrentWeather);
    }
  }, [data]);

  const setQuery = (city: string, countryCode: string) => {
    setNewUrl(`${apiURL}/${countryCode}/${city}`);
  };
  return {
    setQuery: setQuery,
  };
};
