import FormPanel from "./Components/FormPanel";
import ButtonsPanel from "./Components/ButtonsPanel";
import WeatherBlocks from "./WeatherBlocks";
import { QueryClient } from "react-query";
import { useWeatherState } from "./hooks/useAppState";
import { useEffect } from "react";
import { buttonsDataSet } from "./assets/initialCityButtonsData";

export const queryClient = new QueryClient();

function App() {
  const { status } = useWeatherState();
  const { buttonsArray, initializeButtonsArray } = useWeatherState();

  if (status !== "success") <div>loading...</div>;

  useEffect(() => {
    if (
      !buttonsArray ||
      (Array.isArray(buttonsArray) && buttonsArray.length === 0)
    ) {
      initializeButtonsArray(buttonsDataSet);
    }
  }, [buttonsArray]);

  return (
    <div className="App box-border ">
      <div className="mt-1 m-auto sm:mt-3 max-w-md max-h-90vh md:max-w-3xl justify-center rounded-xl p-4 bg-gradient-to-b from-darksky-mid to-black shadow-xl">
        <FormPanel />
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-[4px] grid-rows-7 md:grid-rows-4 mt-3 max-w-md max-h-90vh md:max-w-3xl m-auto justify-center rounded-xl p-4 bg-darksky-max shadow-xl">
        <WeatherBlocks />
      </div>

      <div className="grid grid-cols-1 mt-2 max-w-md max-h-90vh md:max-w-3xl gap-[8px] md:grid-cols-3 md:grid-rows-1 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-darksky-mid to-black shadow-xl">
        <ButtonsPanel />
      </div>
    </div>
  );
}

export default App;
