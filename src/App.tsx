import { useEffect, useState } from "react";
import { filterText, isIterable } from "./helpers";
import { apiKey } from "../apiKey";
import Block from "./Block";
import { setupBlocks } from "./assets/setupBlocks";

function App() {
  const [dataArray, setDataArray] = useState([]);

  const iterateIt = (dataPcs: object, masterKey = "") => {
    Object.entries(dataPcs).map(([key, value]) => {
      if (!isIterable(value))
        setDataArray((prevState) => ({
          ...prevState,
          [`${masterKey ? `${masterKey + "_"}` : ""}${key}`]: value,
        }));
      else iterateIt(value, key);
    });
  };

  const apiFetch = async (url: string) => {
    const response = await fetch(url)
      .then((response) => response.json())

      .catch((err) => console.log(err));
    setDataArray([]);
    iterateIt(response);
  };

  useEffect(() => {
    setDataArray([]);

    const apiData = apiFetch(
      `https://api.openweathermap.org/data/2.5/weather?q=warszawa&units=metric&APPID=${apiKey}`
    );

    const mainTimer = setInterval(() => {
      setDataArray([]);
      const apiData = apiFetch(
        `https://api.openweathermap.org/data/2.5/weather?q=warszawa&units=metric&APPID=${apiKey}`
      );
    }, 50000);

    return () => {
      clearInterval(mainTimer);
    };
  }, []);

  if (Object.keys(dataArray).length === 0)
    return <span>Data is loading...</span>;

  const blocks = Object.entries(dataArray).map(([key, value], index) => {
    const block = setupBlocks(key, value);

    return (
      <Block
        blockSetupData={block}
        blockObjectKey={key}
        blockObjectValue={value}
        key={index}
      />
    );
  });

  if (!blocks) return <div>Epmty</div>;

  const icon = Object.entries(dataArray).map(([key, value], index) => {
    if (key === "0_icon") {
      const block = setupBlocks("main_icon", value);
      return (
        <Block
          blockSetupData={block}
          blockObjectKey={"main_icon"}
          blockObjectValue={value}
          key={index}
        />
      );
    } else return null;
  });
  // );
  return (
    <div className="App m-0 p-0 box-border">
      <div className="mt-12 max-w-2xl grid grid-cols-8 grid-rows-4 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-gray-900 to-black shadow-xl">
        {icon}
        {blocks}
      </div>
    </div>
  );
}

export default App;
