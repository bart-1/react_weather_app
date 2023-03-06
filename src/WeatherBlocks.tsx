import React, { useEffect, useState } from "react";
import { FlatObject } from "./helpers/helpers";
import useBlocksGenerator from "./helpers/useBlocksGenerator";
import useFetchApi from "./helpers/useFetchApi";

interface WeatherBlocksProps {
  city: string;
  country: string;
}

const WeatherBlocks = ({city, country}:WeatherBlocksProps) => {
  const [data, dataLoading, setQuery, loadEmpty] = useFetchApi();
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [dataArray, setDataArray] = useState<Array<FlatObject>>();
    const [getAllBlocks, getBlocksByName, setBlocksArray] = useBlocksGenerator();
    

    useEffect(() => {
        setCityName(city);
        setCountryCode(country);
    },[city, country])

  useEffect(() => {
    if (countryCode && cityName) setQuery(`${countryCode}/${cityName}`);

    const mainTimer = setInterval(() => {
      setQuery(`${countryCode}/${cityName}`);
    }, 100000);

    return () => {
      clearInterval(mainTimer);
    };
  }, [cityName, countryCode]);

  useEffect(() => {
    if (!dataLoading) {
      setDataArray(data);
      setBlocksArray(data);
    }
  }, [dataLoading]);

  if (dataLoading) return <span>Data is loading...</span>;
  if (!dataArray) return <span>Data is loading...</span>;

  return (
    <>
      {getBlocksByName("weather_0_icon", "main_icon")}
      {getBlocksByName("weather_0_description", "descriptions")}
      {getAllBlocks()}
    </>
  );
};
export default WeatherBlocks;
