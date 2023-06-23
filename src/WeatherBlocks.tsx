import React, { useEffect } from "react";
import Block from "./Components/Block";
import {
  convertTimestamp,
  epochTimeConverter,
  roundNumberValue,
  wind,
} from "./hooks/helpers";
import { useWeatherState } from "./hooks/useAppState";
import { useFetchWeatherAPI } from "./hooks/useFetchApi";

export interface WeatherBlocksProps {
  city: string;
  inputCountryCode: string;
}

const WeatherBlocks = () => {
  const { setQuery } = useFetchWeatherAPI();
  const { inputCityName, inputCountryCode } = useWeatherState();

  const { weather, timestamp, status } = useWeatherState();
  useEffect(() => {
    if (inputCityName && inputCountryCode) {
      setQuery(inputCityName, inputCountryCode);
    }
  }, [inputCityName, inputCountryCode]);

  return (
    <>
      <Block
        value={weather!.weather[0].icon}
        title={""}
        icon={true}
        unit=""
        className="md:order-none order-3 col-span-2 row-span-3 md:col-span-3 md:row-span-3 h-44 md:h-full"
      />
      <Block
        value={weather!.name}
        title={"city"}
        icon={false}
        unit={""}
        className="md:order-none order-4 col-span-2 md:col-span-3 "
      />
      <Block
        value={roundNumberValue(weather!.main.temp)}
        title={"temp"}
        icon={false}
        unit={"\u{2103}"}
        className="md:order-none order-5 col-span-1 md:col-span-2  "
      />
      <Block
        value={weather!.weather[0].description}
        title={"description"}
        icon={false}
        className="md:order-none order-4 col-span-2 md:col-span-3 "
        unit=""
      />

      <Block
        value={roundNumberValue(weather!.main.feels_like)}
        title={"feels like"}
        icon={false}
        unit={"\u{2103}"}
        className="md:order-none order-5 col-span-1 md:col-span-2 "
      />
      <Block
        value={roundNumberValue(weather!.main.temp_max)}
        title={"todays max"}
        icon={false}
        unit={"\u{2103}"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={roundNumberValue(weather!.main.temp_min)}
        title={"todays min"}
        icon={false}
        unit={"\u{2103}"}
        className="md:order-none order-5 col-span-1 md:col-span-3"
      />
      <Block
        value={weather!.main.pressure}
        title={"pressure"}
        icon={false}
        unit={"hPa"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.main.humidity}
        title={"humidity"}
        icon={false}
        unit={"%"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.visibility}
        title={"visibility"}
        icon={false}
        unit={"m"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={roundNumberValue(weather!.wind.speed)}
        title={"wind"}
        icon={false}
        unit={"m/s"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={wind(weather!.wind.deg)}
        title={"wind deg"}
        icon={false}
        unit={""}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.wind.gust ? roundNumberValue(weather!.wind.gust) : 0}
        title={"wind gust"}
        icon={false}
        unit={"m/s"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={weather!.clouds.all}
        title={"clouds"}
        icon={false}
        unit={"%"}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      {!weather.snow ? (
        <Block
          value={weather!.rain ? weather!.rain["1h"] : "0"}
          title={"rain"}
          icon={false}
          unit={"mm/h"}
          className="md:order-none order-5 col-span-1 md:col-span-2"
        />
      ) : (
        <Block
          value={weather!.snow ? weather!.snow["1h"] : "0"}
          title={"snow"}
          icon={false}
          unit={"mm/h"}
          className="md:order-none order-5 col-span-1 md:col-span-2"
        />
      )}
      <Block
        value={epochTimeConverter(weather!.sys.sunrise, false, true)}
        title={"sunrise"}
        icon={false}
        unit={""}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />
      <Block
        value={epochTimeConverter(weather!.sys.sunset, false, true)}
        title={"sunset"}
        icon={false}
        unit={""}
        className="md:order-none order-5 col-span-1 md:col-span-2"
      />

      <Block
        value={convertTimestamp(timestamp)}
        title={"updated_at"}
        icon={false}
        unit={""}
        className="md:order-none order-5 col-span-4 md:col-span-4"
      />
    </>
  );
};
export default WeatherBlocks;
