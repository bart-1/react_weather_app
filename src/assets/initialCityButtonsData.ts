import { ButtonType } from "../Components/Button";
import { WeatherShortcutButton } from "../Components/ButtonsPanel";

export const buttonsDataSet: Array<WeatherShortcutButton> = [
  {
    action: () => console.log("test"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Warszawa",
    cityName: "Warszawa",
    countryCode: "pl",
  },
  {
    action: () => console.log("test2"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Stupsk",
    cityName: "Stupsk",
    countryCode: "pl",
  },
  {
    action: () => console.log("test3"),
    bgColor: "special",
    id: "",
    isActive: true,
    isOn: false,
    size: "M",
    title: "Hajnówka",
    cityName: "Hajnówka",
    countryCode: "pl",
  },
];
