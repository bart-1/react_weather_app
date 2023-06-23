import { useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import { useWeatherState } from "../hooks/useAppState";
import { buttonsDataSet } from "../assets/initialCityButtonsData";
import { isJson } from "../hooks/helpers";

export type WeatherGeoData = {
  cityName: string;
  countryCode: string;
};

export type WeatherShortcutButton = ButtonType & WeatherGeoData;

const ButtonsPanel = () => {
  const [isOn, setIsOn] = useState("");
  const { buttonsArray, initializeButtonsArray } = useWeatherState();
  const { setInputCityName, setInputCountryCode } = useWeatherState();

  const handleClick = (id: string, city: string, code: string) => {
    setIsOn(id);
    setInputCityName(city);
    setInputCountryCode(code);
  };

  const buttonsGenerator = buttonsArray
    ? buttonsArray.map((button, index) => {
        return (
          <Button
            action={(id: string) =>
              handleClick(id, button.cityName, button.countryCode)
            }
            bgColor={button.bgColor}
            id={button.title}
            isActive={button.isActive}
            isOn={button.title === isOn ? true : false}
            size={button.size}
            title={button.title}
            key={button.title + index}
          />
        );
      })
    : "";

  return (
    <>
 
        {buttonsGenerator}{" "}
    </>
  );
};
export default ButtonsPanel;
