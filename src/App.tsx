import { useEffect, useState } from "react";
import { validateEmptyValue, FlatObject, ValueType } from "./helpers/helpers";
import Block from "./Components/Block";
import FormPanel from "./Components/FormPanel";
import useFetchApi from "./helpers/useFetchApi";

function App() {
  const { setQuery, data, loadEmpty, dataLoading } = useFetchApi();
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [dataArray, setDataArray] = useState<Array<FlatObject>>();

  useEffect(() => {
    loadEmpty();
  }, []);

  useEffect(() => {
    setQuery(`${countryCode}/${cityName}`);

    const mainTimer = setInterval(() => {
      setQuery(`${countryCode}/${cityName}`);
    }, 100000);

    return () => {
      clearInterval(mainTimer);
    };
  }, [cityName, countryCode]);

  useEffect(() => {
    if (!dataLoading) setDataArray(data);
  }, [dataLoading]);

  if (dataLoading) return <span>Data is loading...</span>;
  if (!dataArray) return <span>Data is loading...</span>;

  const blocks = Object.values(dataArray).map((element) => {
    console.log(dataArray)
     const block = Object.entries(element).map(([key, value], index) => {
        return (
          <Block
            blockTitle={key}
            blockValue={validateEmptyValue(value)}
            key={index}
          />
        );
     });
    return block;
    });

  const blockByKey = (keyToFind: string, blockTitle: string) => {
    const filteredArray = dataArray.filter(
      (element) => element.key === keyToFind
    );

    if (filteredArray.length > 0) {
      let values: Array<ValueType> = [];
      filteredArray.forEach((element) => {
        values = [...values, element.value];
      });
      return (
        <Block blockTitle={blockTitle} blockValue={values} key={keyToFind} />
      );
    } else return null;
  };

  return (
    <div className="App box-border">
      <FormPanel
        sendCityName={(cityName) => setCityName(cityName)}
        sendCountryCode={(countryCode) => setCountryCode(countryCode)}
        labelCity="City name"
        labelCountry="Country code"
      />
      <div className="grid grid-cols-4 mt-6 max-w-md max-h-90vh md:max-w-3xl gap-[8px] sm:grid-cols-4 sm:grid-rows-6 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-gray-900 to-black shadow-xl">
        {blockByKey("_icon", "main_icon")}
        {blockByKey("_description", "descriptions")}
        {blocks}
      </div>
    </div>
  );
}

export default App;
