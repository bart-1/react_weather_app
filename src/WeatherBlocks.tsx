import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Block from "./Components/Block";
import useFetchApi from "./hooks/useFetchApi";
import { apiURL } from "./hooks/useFetchApi";

interface WeatherBlocksProps {
  city: string;
  countryCode: string;
}

const WeatherBlocks = ({ city, countryCode }: WeatherBlocksProps) => {

  const queryClient = useQueryClient();
  const { setQuery, status, weather } = useFetchApi();

  useEffect(() => {
    if (city && countryCode) {
      setQuery(`${apiURL}/${countryCode}/${city}`);
    }
  }, []);

  useEffect(() => {
    let mainTimer: ReturnType<typeof setInterval>;

    if (city && countryCode) {
      setQuery(`${apiURL}/${countryCode}/${city}`);
      mainTimer = setInterval(() => {
        setQuery(`${apiURL}/${countryCode}/${city}`);
      }, 10000);
    }

    return () => {
      clearInterval(mainTimer);
    };
  }, [city, countryCode]);

  return (
    <>
   
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
        <Block blockValue={weather!.main.temp} blockTitle={"temp"} />
     
    
    </>
  );
};
export default WeatherBlocks;
