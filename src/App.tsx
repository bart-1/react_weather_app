import { useState } from "react";
import FormPanel from "./Components/FormPanel";
import ButtonsPanel from "./Components/ButtonsPanel";
import { ButtonType } from "./Components/Button";
import WeatherBlocks from "./WeatherBlocks";
import { QueryClient, QueryClientProvider } from "react-query";

const buttonsDataSet: Array<ButtonType> = [
  {
    action: () => console.log("test"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Warszawa",
  },
  {
    action: () => console.log("test2"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Stupsk",
  },
  {
    action: () => console.log("test3"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Hajnówka",
  },
];
export const queryClient = new QueryClient();

function App() {
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [pressedButton, setPressedButton] = useState("");

  
  return (
    <div className="App box-border">
      <QueryClientProvider client={queryClient}>
          <div className="grid grid-cols-4 mt-3 max-w-md max-h-90vh md:max-w-3xl gap-[4px] sm:grid-cols-4 md:grid-cols-8 md:grid-rows-4 m-auto justify-center rounded-xl p-4 bg-darksky-max shadow-xl">
            <div className="col-span-4 col-rows-2 sm:col-span-4 md:col-rows-1 md:col-span-8 ">
              <FormPanel
                sendCityName={(cityName) => setCityName(cityName)}
                sendCountryCode={(countryCode) => setCountryCode(countryCode)}
                labelCity="City name"
                labelCountry="Country code"
              />
            </div>
            <WeatherBlocks city={cityName} countryCode={countryCode} />
          </div>
          <ButtonsPanel
            pressedButton={pressedButton}
            buttonsData={buttonsDataSet}
            outputAction={(country: string, city: string, id: string) => {
              setCityName(city);
              setCountryCode(country);
              setPressedButton(id);
            }}
          />
      </QueryClientProvider>
    </div>
  );
}

export default App;
