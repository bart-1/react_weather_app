import { useEffect, useState } from "react";
import { iterateObject } from "./helpers";
import * as empty from "../assets/empty.json";

const apiURL = `https://dev-1.pl/weather-api/`;

const initialValue = iterateObject(JSON.parse(empty.weather));

export default function useFetchApi() {
  const [data, setData] = useState(initialValue);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setData(initialValue);
  }, []);

  const setQuery = (url: string) => {
    apiFetch(`${apiURL}${url}`);
  };

  const loadEmpty = () => {
    setData([]);
    const convertedResponse = initialValue;
    setData(convertedResponse);
  };

  const apiFetch = async (url: string) => {
    setDataLoading(true);
    const response = await fetch(url)
      .then((response) => response.json())
      .catch((response) => (response = empty));

    const convertedResponse = iterateObject(JSON.parse(response.weather));
    setData(convertedResponse);
    setDataLoading(false);
  };

  return [data, dataLoading, setQuery, loadEmpty] as const;
}
