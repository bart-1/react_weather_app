import { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { FlatObject } from "./helpers/helpers";
import FormPanel from "./Components/FormPanel";
import ButtonsPanel from "./Components/ButtonsPanel";
import useFetchApi from "./helpers/useFetchApi";
import useBlocksGenerator from "./helpers/useBlocksGenerator";
import { ButtonType } from "./Components/Button";
import WeatherBlocks from "./WeatherBlocks";

const buttonsDataSet: Array<ButtonType> = [
  {
    action: () => console.log("test"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Warszawa",
  },
  {
    action: () => console.log("test2"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Stupsk",
  },
  {
    action: () => console.log("test3"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Hajnówka",
  },
];

function App() {
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [pressedButton, setPressedButton] = useState("");


  return (
    <div className="App box-border">
      <div className="grid grid-cols-4 mt-3 max-w-md max-h-90vh md:max-w-3xl gap-[4px] sm:grid-cols-4 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-darksky-max shadow-xl">
        <div className="col-span-4 col-rows-2 sm:col-span-4 md:col-rows-1 md:col-span-8 ">
          <FormPanel
            sendCityName={(cityName) => setCityName(cityName)}
            sendCountryCode={(countryCode) => setCountryCode(countryCode)}
            labelCity="City name"
            labelCountry="Country code"
          />
        </div>
        <WeatherBlocks city={cityName } country={countryCode} />
    
      </div>
      <ButtonsPanel
        pressedButton={pressedButton}
        buttonsData={buttonsDataSet}
        outputAction={(country: string, city: string, id: string) => {
          setCityName(city);
          setCountryCode(country);
          setPressedButton(id)}
        }
      />
    </div>
  );
}

export default App;
