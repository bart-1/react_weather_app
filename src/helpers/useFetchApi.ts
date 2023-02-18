import { useState } from "react";
import { FlatObject, iterateObject } from "./helpers";
import * as empty from "../assets/empty.json";

const apiURL = `https://dev-1.pl/weather-api/`;

const useFetchApi = () => {
  const [data, setData] = useState<Array<FlatObject>>();
  const [dataLoading, setDataLoading] = useState(false);

  const apiFetch = async (url: string) => {
    setDataLoading(true);
    const response = await fetch(url)
      .then((response) => response.json())
      .catch((response) => (response = empty));

    const convertedResponse = iterateObject(JSON.parse(response.weather));
    setData(convertedResponse);
    setDataLoading(false);
  };

  return {
    setQuery(url: string) {
      apiFetch(apiURL+url);
    },
    loadEmpty() {
      setData([]);
      const convertedResponse = iterateObject(JSON.parse(empty.weather));
      setData(convertedResponse);
    },
    dataLoading,
    data,
  };
};

export default useFetchApi;
