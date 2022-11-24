import { useEffect, useState } from "react";
import { filterBlocks, filterText, isIterable } from "./helpers";
import { apiKey } from "../apiKey";

function App() {
  const [dataArray, setDataArray] = useState({});

  const iterateIt = (dataPcs: any, masterKey = "") => {
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
      .then((response) => {
        setDataArray({});
        iterateIt(response);
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const apiData = apiFetch(
      `https://api.openweathermap.org/data/2.5/weather?q=warszawa&units=metric&APPID=${apiKey}`
    );

    const mainTimer = setInterval(() => {
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
    const block = filterBlocks(key, value);

    return block.show && block ? (
      <div
        className={`flex flex-col border-2 border-blue-900 bg-gradient-to-b from-gray-900 to-transparent rounded-xl hover:scale-150 ${block.className}`}
        key={index}>
        <span className="text-xs p-3 text-white bg-black rounded-t-xl">
          {block.title ? block.title : filterText(String(key))}
        </span>
        {block.icon ? block.icon : null}
        <span className="text-red-500 p-3 text-2xl font-bold">
          {block.processedData
            ? `${block.processedData} ${block.unit}`
            : `${value} ${block.unit}`}
        </span>
      </div>
    ) : null;
  });

  if (!blocks) return <div>Epmty</div>;
  // );
  return (
    <div className="App m-0 p-0 box-border">
      <div className="mt-12 max-w-2xl flex flex-wrap gap-3 m-auto justify-center">
        {blocks}
      </div>
    </div>
  );
}

export default App;
