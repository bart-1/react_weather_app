import { useEffect, useState } from "react";
import { filterBlocks, filterText, isIterable } from "./helpers";



function App() {
  const [url, setUrl] = useState(
    "https://api.openweathermap.org/data/2.5/weather?q=warszawa&units=metric&APPID=d923dc3ed6c037a2d2997ef6466fb01f"
  );
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
      .catch((err) => console.log(err));

    setDataArray([]);
    iterateIt(response);
  };

  useEffect(() => {
    apiFetch(url);
    const mainTimer = setInterval(() => apiFetch(url), 50000);

    return () => {
      clearInterval(mainTimer);
    };
  }, []);



  const blocks = Object.entries(dataArray).map(([key, value], index) => {
    const block = filterBlocks(key);

    return block.show && block ? (
      <div
        className="flex flex-col border-2 border-blue-900 bg-gradient-to-b from-gray-900 to-transparent rounded-xl hover:scale-150"
        key={index}>
        <span className="text-xs p-3 text-white bg-black rounded-t-xl">
          {block.title ? block.title : filterText(String(key))}
        </span>
        <span className="text-red-500 p-3 text-2xl font-bold">
          {`${value} ${block.unit}`}
        </span>
      </div>
    ) : (
      null
    );
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
