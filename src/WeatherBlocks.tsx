import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Block from "./Components/Block";
import { convertTimestamp, epochTimeConverter, roundNumberValue, wind } from "./hooks/helpers";
import useFetchApi from "./hooks/useFetchApi";

export interface WeatherBlocksProps {
  city: string;
  countryCode: string;
}

const WeatherBlocks = ({ city, countryCode }: WeatherBlocksProps) => {
  const queryClient = useQueryClient();
  const { setQuery, status, weather, timestamp } = useFetchApi();

  useEffect(() => {
    if (city && countryCode) {
      setQuery({countryCode:countryCode, city:city});
    }
  }, []);

  useEffect(() => {
    let mainTimer: ReturnType<typeof setInterval>;

    if (city && countryCode) {
      setQuery({countryCode:countryCode, city:city});
      mainTimer = setInterval(() => {
        setQuery({ countryCode: countryCode, city: city });
      }, 10000);
    }

    return () => {
      clearInterval(mainTimer);
    };
  }, [city, countryCode]);

  return (
    <>
      <Block
        value={weather!.weather[0].icon}
        title={""}
        icon={true}
        unit=""
        className="col-span-2 row-span-2 md:col-span-3 md:row-span-3"
      />
      <Block
        value={weather!.name}
        title={"city"}
        icon={false}
        unit={""}
        className="col-span-2 md:col-span-3 "
      />
      <Block
        value={roundNumberValue(weather!.main.temp)}
        title={"temp"}
        icon={false}
        unit={"\u{2103}"}
        className="col-span-2 md:col-span-2  "
      />
      <Block
        value={weather!.weather[0].description}
        title={"description"}
        icon={false}
        className={"col-span-2 md:col-span-3 "}
        unit=""
      />

      <Block
        value={roundNumberValue(weather!.main.feels_like)}
        title={"feels like"}
        icon={false}
        unit={"\u{2103}"}
        className="col-span-1 md:col-span-2"
      />
      <Block
        value={roundNumberValue(weather!.main.temp_max)}
        title={"todays max"}
        icon={false}
        unit={"\u{2103}"}
        className="col-span-1 md:col-span-2"
      />
      <Block
        value={roundNumberValue(weather!.main.temp_min)}
        title={"todays min"}
        icon={false}
        unit={"\u{2103}"}
        className="col-span-1 md:col-span-3"
      />
      <Block
        value={weather!.main.pressure}
        title={"pressure"}
        icon={false}
        unit={"hPa"}
        className="col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.main.humidity}
        title={"humidity"}
        icon={false}
        unit={"%"}
        className="col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.visibility}
        title={"visibility"}
        icon={false}
        unit={"m"}
        className="col-span-10 md:col-span-2"
      />
      <Block
        value={roundNumberValue(weather!.wind.speed)}
        title={"wind"}
        icon={false}
        unit={"m/s"}
        className="col-span-11 md:col-span-2"
      />
      <Block
        value={wind(weather!.wind.deg)}
        title={"wind deg"}
        icon={false}
        unit={""}
        className="col-span-12 md:col-span-2"
      />
      <Block
        value={weather!.wind.gust ? roundNumberValue(weather!.wind.gust) : 0}
        title={"wind gust"}
        icon={false}
        unit={"m/s"}
        className="col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.clouds.all}
        title={"clouds"}
        icon={false}
        unit={"%"}
        className="col-span-1 md:col-span-2"
      />
      {!weather.snow ? (
        <Block
          value={weather!.rain ? weather!.rain["1h"] : "0"}
          title={"rain"}
          icon={false}
          unit={"mm/h"}
          className="col-span-2 md:col-span-2"
        />
      ) : (
        <Block
          value={weather!.snow ? weather!.snow["1h"] : "0"}
          title={"snow"}
          icon={false}
          unit={"mm/h"}
          className="col-span-1 md:col-span-2"
        />
      )}
      <Block
        value={epochTimeConverter(weather!.sys.sunrise, false, true)}
        title={"sunrise"}
        icon={false}
        unit={""}
        className="col-span-1 md:col-span-2"
      />
      <Block
        value={epochTimeConverter(weather!.sys.sunset, false, true)}
        title={"sunset"}
        icon={false}
        unit={""}
        className="col-span-1 md:col-span-2"
      />

      <Block
        value={convertTimestamp(timestamp)}
        title={"updated_at"}
        icon={false}
        unit={""}
        className="col-span-4 md:col-span-4"
      />
    </>
  );
};
export default WeatherBlocks;
