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
    <div className="App box-border">
      <div className="grid grid-cols-4 mt-3 max-w-md max-h-90vh md:max-w-3xl gap-[4px] sm:grid-cols-4 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-darksky-max shadow-xl">
        <FormPanel />
        <WeatherBlocks />
      </div>
      <ButtonsPanel />
    </div>
  );
}

export default App;
