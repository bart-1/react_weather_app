import { useEffect, useState } from "react";
import { isIterable, validateEmptyValue } from "./assets/helpers";
import * as empty from "./assets/empty.json";
import Block from "./Block";
import FormPanel from "./FormPanel";

function App() {
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [dataIsReady, setDataIsReady] = useState(false);

  const iterateIt = (dataPcs: object, masterKey = "") => {
    Object.entries(dataPcs).map(([key, value]) => {
      if (!isIterable(value))
        setDataArray((prevState) => ({
          ...prevState,
          [`${masterKey ? `${masterKey}_` : ""}${key}`]: value,
        }));
      else iterateIt(value, `${masterKey ? `${masterKey}_` : ""}${key}`);
    });
  };

  const apiFetch = async (url: string) => {
    const response = await fetch(url)
      .then((response) => response.json())
      .catch((response) => (response = empty));

    setDataArray([]);

    iterateIt(JSON.parse(response.weather));
    setDataIsReady(true);
  };

  useEffect(() => {
    setDataArray([]);

    iterateIt(JSON.parse(empty.weather));
  }, []);
  
  useEffect(() => {
    setDataArray([]);

    const apiData = apiFetch(
      `https://dev-1.pl/weather-api/${countryCode}/${cityName}`
    );

    const mainTimer = setInterval(() => {
      setDataArray([]);
      setDataIsReady(false);
      const apiData = apiFetch(
        `https://dev-1.pl/weather-api/${countryCode}/${cityName}`
      );
    }, 100000);

    return () => {
      clearInterval(mainTimer);
    };
  }, [cityName, countryCode]);

  if (!dataIsReady) return <span>Data is loading...</span>;

  const blocks = Object.entries(dataArray).map(([key, value], index) => {
    return (
      <Block
        blockTitle={key}
        blockValue={validateEmptyValue(value)}
        key={index}
      />
    );
  });

  if (!blocks) return <div>Epmty</div>;

  const blockByKey = (keyToFind: string, blockTitle: string) => {
    const filteredArray = Object.entries(dataArray).filter(([key, value]) =>
      key.includes(keyToFind)
    );

    if (filteredArray.length > 0) {
      const arrayOfValues = filteredArray[0].filter(
        (el, index) => index % 2 !== 0
      );

      return (
        <Block
          blockTitle={blockTitle}
          blockValue={arrayOfValues}
          key={keyToFind}
        />
      );
    } else return null;
  };

  return (
    <div className="App m-0 p-3 box-border">
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
