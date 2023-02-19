import { useEffect, useState } from "react";
import { FlatObject } from "./helpers/helpers";
import FormPanel from "./Components/FormPanel";
import useFetchApi from "./helpers/useFetchApi";
import useBlocksGenerator from "./helpers/useBlocksGenerator";

function App() {
  const [data, dataLoading, setQuery, loadEmpty] = useFetchApi();
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [dataArray, setDataArray] = useState<Array<FlatObject>>();
  const [getAllBlocks, getBlocksByName, setBlocksArray] = useBlocksGenerator();

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
      <FormPanel
        sendCityName={(cityName) => setCityName(cityName)}
        sendCountryCode={(countryCode) => setCountryCode(countryCode)}
        labelCity="City name"
        labelCountry="Country code"
      />
      <div className="grid grid-cols-4 mt-6 max-w-md max-h-90vh md:max-w-3xl gap-[8px] sm:grid-cols-4 sm:grid-rows-6 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-gray-900 to-black shadow-xl">
        {getBlocksByName("weather_0_icon", "main_icon")}
        {getBlocksByName("weather_0_description", "descriptions")}
        {getAllBlocks()}
      </div>
    </div>
  );
}

export default App;
