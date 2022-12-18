import { useEffect, useState } from "react";
import { isIterable } from "./helpers";
import { apiKey } from "../apiKey";
import Block from "./Block";

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [dataIsReady, setDataIsReady] = useState(false);
  const [weatherDescription, setWeatherDescription] = useState("null");

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

      .catch((err) => console.log(err));
    setDataArray([]);
    iterateIt(response);
    setDataIsReady(true);
  };

  useEffect(() => {
    setDataArray([]);

    const apiData = apiFetch(
      `https://api.openweathermap.org/data/2.5/weather?q=warszawa&units=metric&APPID=${apiKey}`
    );

    const mainTimer = setInterval(() => {
      setDataArray([]);
      setDataIsReady(false)
      const apiData = apiFetch(
        `https://api.openweathermap.org/data/2.5/weather?q=warszawa&units=metric&APPID=${apiKey}`
      );
    }, 100000);

    return () => {
      clearInterval(mainTimer);
    };
  }, []);

  if (!dataIsReady) return <span>Data is loading...</span>;

  const blocks = Object.entries(dataArray).map(([key, value], index) => {
    return <Block blockTitle={key} blockValue={value} key={index} />;
  });

  if (!blocks) return <div>Epmty</div>;


  const blockByKey = (keyToFind: string, blockTitle: string) => {
    const filteredArray = Object.entries(dataArray)
      .filter(([key, value]) => key.includes(keyToFind))

    if(filteredArray.length > 0){
      const arrayOfValues = filteredArray[0].filter((el, index) => index % 2 !== 0);

    return (
      <Block
        blockTitle={blockTitle}
        blockValue={arrayOfValues}
        key={keyToFind}
      />
    );} else return null
  };

  return (
    <div className="App m-0 p-3 box-border">
      <div className="mt-6 max-w-md max-h-90vh md:max-w-3xl grid grid-flow-row-dense grid-cols-4 gap-[8px] sm:grid-cols-4 sm:grid-rows-6 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-gray-900 to-black shadow-xl">
        {blockByKey("_icon", "main_icon")}
        {blockByKey("_description", "descriptions")}
        {blocks}
      </div>
    </div>
  );
}

export default App;
