import { useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import { useWeatherState } from "../hooks/useAppState";
import { useWeatherLocalStorage } from "../hooks/useLocalStorage";

export type WeatherGeoData = {
  cityName: string;
  countryCode: string;
};

export type WeatherShortcutButton = ButtonType & WeatherGeoData;

const ButtonsPanel = () => {
  const [isOn, setIsOn] = useState("");
  const { buttonsArray } = useWeatherState();
  const { setInputCityName, setInputCountryCode } = useWeatherState();
  const { ignition } = useWeatherLocalStorage();

  useEffect(() => {
    ignition(true);
  }, []);

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
      <div className="grid grid-cols-1 mt-2 max-w-md max-h-90vh md:max-w-3xl gap-[8px] sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-darksky-mid to-black shadow-xl">
        {buttonsGenerator}{" "}
      </div>
    </>
  );
};
export default ButtonsPanel;
