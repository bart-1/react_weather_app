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

<<<<<<< HEAD
=======
  const blocks = Object.values(dataArray).map((element, index) => {
    const [[key, value]] = Object.entries(element);
    return (
      <Block
        blockTitle={key}
        blockValue={validateEmptyValue(value)}
        key={index}
      />
    );
  });

  const blockByKey = (keyToFind: string, blockTitle: string) => {
    const filteredArray = Object.values(dataArray).filter((element) => {
      const [[key, value]] = Object.entries(element);
      if (key === keyToFind) return element;
    });

    let values: Array<ValueType> = [];
    if (filteredArray.length > 0) {
      Object.values(filteredArray).map((element) => {
        const [[key, value]] = Object.entries(element);
        values = [...values, value];
      });

      return (
        <Block blockTitle={blockTitle} blockValue={values} key={keyToFind} />
      );
    } else return null;
  };
>>>>>>> 543d645539a7e259e545e85684a8dea5db389e22

  return (
    <div className="App box-border">
      <FormPanel
        sendCityName={(cityName) => setCityName(cityName)}
        sendCountryCode={(countryCode) => setCountryCode(countryCode)}
        labelCity="City name"
        labelCountry="Country code"
      />
      <div className="grid grid-cols-4 mt-6 max-w-md max-h-90vh md:max-w-3xl gap-[8px] sm:grid-cols-4 sm:grid-rows-6 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-gray-900 to-black shadow-xl">
<<<<<<< HEAD
        {getBlocksByName("weather_0_icon", "main_icon")}
        {getBlocksByName("weather_0_description", "descriptions")}
        {getAllBlocks()}
=======
        {blockByKey("weather_0_icon", "main_icon")}
        {blockByKey("weather_0_description", "descriptions")}
        {blocks}
>>>>>>> 543d645539a7e259e545e85684a8dea5db389e22
      </div>
    </div>
  );
}

export default App;
