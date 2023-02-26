import { SyntheticEvent, useEffect, useState } from "react";
import { FlatObject } from "./helpers/helpers";
import FormPanel from "./Components/FormPanel";
import ButtonsPanel from "./Components/ButtonsPanel";
import useFetchApi from "./helpers/useFetchApi";
import useBlocksGenerator from "./helpers/useBlocksGenerator";
import { ButtonType } from "./Components/Button";

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
  const [data, dataLoading, setQuery, loadEmpty] = useFetchApi();
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [dataArray, setDataArray] = useState<Array<FlatObject>>();
  const [getAllBlocks, getBlocksByName, setBlocksArray] = useBlocksGenerator();
  const [pressedButton, setPressedButton] = useState("");

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
        {getBlocksByName("weather_0_icon", "main_icon")}
        {getBlocksByName("weather_0_description", "descriptions")}
        {getAllBlocks()}
      </div>
      <ButtonsPanel
        pressedButton={pressedButton}
        buttonsData={buttonsDataSet}
        outputAction={(country: string, city: string, id: string) => {
          setCityName(city);
          setCountryCode(country);
          // setQuery(`${country}/${city}`)
          setPressedButton(id)}
        }
      />
    </div>
  );
}

export default App;
