import { create } from "zustand";
import {
  CurrentWeatherModel,
  emptyCurrentWeather,
} from "../models/CurrentWeatherModel";
import { StatusProp } from "./useFetchApi";
import { SearchStatus } from "../Components/Search";
import { WeatherShortcutButton } from "../Components/ButtonsPanel";
import { persist, createJSONStorage } from "zustand/middleware";
import { buttonsDataSet as initialButtonsDataSet } from "../assets/initialCityButtonsData";

export interface WeatherState {
  //f

  //buttons
  numberOfButtons: number;
  setNumberOfButtons: (num: number) => void;
  buttonsArray: WeatherShortcutButton[];
  initializeButtonsArray: (initializeValue: WeatherShortcutButton[]) => void;

  addButtonsToArray: (
    button: WeatherShortcutButton,
    numberOfButtons: number
  ) => void;
  checkButtonsArr: () => void;

  //inputs
  inputCityName: string;
  setInputCityName: (cityName: string) => void;
  inputCountryCode: string;
  setInputCountryCode: (countryCode: string) => void;
  errInputCity: boolean;
  setErrInputCity: (err: boolean) => void;
  errInputCountryCode: SearchStatus;
  setErrInputCountryCode: (err: SearchStatus) => void;

  //fetched
  cityName: string;
  setCityName: (cityName: string) => void;
  countryCode: string;
  setCountryCode: (cityName: string) => void;
  weather: CurrentWeatherModel;
  setWeather: (weather: CurrentWeatherModel) => void;
  status: StatusProp;
  setStatus: (status: StatusProp) => void;
  timestamp: string;
  setTimestamp: (timestamp: string) => void;
}

const AppState = create<WeatherState>()(
  persist(
    (set, get) => ({
      //buttons
      numberOfButtons: 3,
      setNumberOfButtons: (num) => set((state) => ({ numberOfButtons: num })),
      buttonsArray: [],
      buttonsArrayVer: 0,
      initializeButtonsArray: (initializeValue) =>
        set((state) => ({ buttonsArray: initializeValue })),
      addButtonsToArray: (button, num = get().numberOfButtons) =>
        set((state) => ({
          ...state,
          buttonsArray: state.buttonsArray.concat(button).slice(-num),
        })),
      checkButtonsArr: () => console.log(get().buttonsArray),

      //inputs
      inputCityName: "",
      setInputCityName: (cityName) => set({ inputCityName: cityName }),
      inputCountryCode: "",
      setInputCountryCode: (countryCode: string) =>
        set({ inputCountryCode: countryCode }),
      errInputCity: false,
      setErrInputCity: (err) => set({ errInputCity: err }),
      errInputCountryCode: "",
      setErrInputCountryCode: (status) => set({ errInputCountryCode: status }),

      //fetched
      cityName: "",
      setCityName: (cityName) => set({ cityName: cityName }),
      countryCode: "",
      setCountryCode: (code) => set({ countryCode: code }),
      weather: emptyCurrentWeather,
      setWeather: (newWeather) => set({ weather: newWeather }),
      status: "error",
      setStatus: (newStatus) => set({ status: newStatus }),
      timestamp: "",
      setTimestamp: (newTimestamp) => set({ timestamp: newTimestamp }),
    }),
    {
      name: "weatherApp",
      version: 1,
      partialize: (state) => ({ buttonsArray: state.buttonsArray }),
      // migrate: (persistedState, version) => {
      //   let state = persistedState;
      //   if (version === 0)
      //     state = initialButtonsDataSet;
      //   else state = persistedState;

      //   return state;
      
      // },
    }
  )
);

export const useWeatherState = () => AppState();
