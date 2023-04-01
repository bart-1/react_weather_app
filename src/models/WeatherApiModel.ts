import { CurrentWeatherModel } from "./CurrentWeatherModel";

export interface WeatherApiModel {
  id: number;
  created_at: string;
  updated_at: string;
  weather: string;
  city: string;
  country: string;
}

export const emptyWeatherApi:WeatherApiModel = {
  id: 0,
  created_at: "",
  updated_at: "",
  weather: "",
  city: "",
  country: "",
};
