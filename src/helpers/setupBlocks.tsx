import { ReactNode } from "react";
import {
  epochTimeConverter,
  FlatObject,
  validateEmptyValue,
  ValueType,
  wind,
} from "./helpers";

export type BlockType = {
  show: boolean;
  title: string;
  unit: string;
  processedData: string | number | undefined;
  icon: ReactNode;
  className: string;
  value: ValueType | ValueType[];
};

function roundNumberValue(value: ValueType | ValueType[] | undefined) {
  if (!value) return "-";
  if (!Array.isArray(value)) return Math.round(Number(value));
}

export function setupBlocks(text: string, value: ValueType | ValueType[]): BlockType {
  switch (true) {
    // coordinates

    case text === "coord_lon":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "coord_lat":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };

    // description

    case text.includes("_main"):
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "descriptions":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Description",
        unit: "",
        processedData: "",
        icon: false,
        className: "col-span-4",
      };
    case text === "weather_0_description":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Description",
        unit: "",
        processedData: "",
        icon: false,
        className: "col-span-4",
      };
    case text.includes("_description"):
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Description",
        unit: "",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };

    // icons

    case text === "weather_0_icon":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: false,
        className: "",
      };
    case text === "main_icon":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: true,
        className:
          "col-span-2 row-span-4 sm:col-span-2 md:col-span-3 md:row-span-3 ",
      };
    case text.includes("_icon"):
      return {
        value: validateEmptyValue(value),
        show: false,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: false,
        className: "",
      };

    //temperature

    case text === "main_temp":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Temp.",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2 md:col-span-1",
      };
    case text === "main_feels_like":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Feels like",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2 sm:col-span-1",
      };
    case text === "main_temp_min":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Todays min",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2",
      };
    case text === "main_temp_max":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Todays max",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2",
      };

    //pressure

    case text === "main_pressure":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Pressure",
        unit: "hPa",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };

    //humidity

    case text === "main_humidity":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Humidity",
        unit: "\u{0025}",
        processedData: "",
        icon: false,
        className: "col-span-2 sm:col-span-1",
      };

    //visibility

    case text === "visibility":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Visibility",
        unit: "m",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };

    //wind

    case text === "wind_speed":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Wind speed",
        unit: "m/s",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case text === "wind_deg":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Wind deg",
        unit: typeof value === "number" ? wind(value) : "\u{2022}",
        processedData: " ",
        icon: false,
        className: "col-span-2 sm:col-span-1",
      };
    case text === "wind_gust":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Wind gust",
        unit: "m/s",
        processedData: " ",
        icon: false,
        className: "col-span-2 sm:col-span-1",
      };

    //clouds

    case text === "clouds_all":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Clouds",
        unit: "\u{0025}",
        processedData: "",
        icon: false,
        className: "col-span-2 sm:col-span-1",
      };

    // rainfall and snowfall

    case text === "rain_1h":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Rain mm/1h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case text === "rain_3h":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Rain mm/3h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case text === "snow_1h":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Snow mm/1h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case text === "snow_3h":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Snow mm/3h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };

    // country & city

    case text === "sys_country":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Country",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };

    case text === "name":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "City",
        unit: "",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };

    //time & date

    case text === "dt": //time of data calculation
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Updated at",
        unit: "",
        processedData: `${epochTimeConverter(Number(value))}`,
        icon: false,
        className: "col-span-4 order-last",
      };

    case text === "sys_sunrise":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Sunrise",
        unit: "",
        processedData: `${epochTimeConverter(Number(value), false, true)}`,
        icon: false,
        className: "col-span-2",
      };
    case text === "sys_sunset":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Sunset",
        unit: "",
        processedData: `${epochTimeConverter(Number(value), false, true)}`,
        icon: false,
        className: "col-span-2",
      };
    case text === "timezone":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };

    // API server internal data

    case text.includes("_id"):
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "base":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: " ",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "sys_type":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "sys_id":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "cod":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case text === "id":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };

    default:
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
  }
}
