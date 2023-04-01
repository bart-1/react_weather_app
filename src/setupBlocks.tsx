import { ReactNode } from "react";
import {
  epochTimeConverter,
  FlatObject,
  validateEmptyValue,
  ValueType,
  wind,
} from "./hooks/helpers";

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

export function setupBlocks(
  key: string,
  value: ValueType | ValueType[]
): BlockType {
  switch (true) {
    // coordinates

    case key === "coord_lon":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "coord_lat":
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

    case key.includes("_main"):
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "descriptions":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Description",
        unit: "",
        processedData: "",
        icon: false,
        className: "col-span-4",
      };
    case key === "weather_0_description":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Description",
        unit: "",
        processedData: "",
        icon: false,
        className: "col-span-4",
      };
    case key.includes("_description"):
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

    case key === "weather_0_icon":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: false,
        className: "",
      };
    case key === "main_icon":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: true,
        className: "col-span-4 row-span-2 md:col-span-3 md:row-span-3 ",
      };
    case key.includes("_icon"):
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

    case key === "main_temp":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Temp.",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2 md:col-span-1",
      };
    case key === "main_feels_like":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Feels like",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2 md:col-span-1",
      };
    case key === "main_temp_min":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Todays min",
        unit: "\u{2103}",
        processedData: roundNumberValue(value),
        icon: false,
        className: "col-span-2",
      };
    case key === "main_temp_max":
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

    case key === "main_pressure":
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

    case key === "main_humidity":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Humidity",
        unit: "\u{0025}",
        processedData: "",
        icon: false,
        className: "col-span-2 md:col-span-1",
      };

    //sea & grnd level
    case key === "main_sea_level":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Sea lvl",
        unit: "m",
        processedData: "",
        icon: false,
        className: "col-span-2 md:col-span-1",
      };
    case key === "main_grnd_level":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Ground lvl",
        unit: "m",
        processedData: "",
        icon: false,
        className: "col-span-2 md:col-span-1",
      };

    //visibility

    case key === "visibility":
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

    case key === "wind_speed":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Wind speed",
        unit: "m/s",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case key === "wind_deg":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Wind deg",
        unit: typeof value === "number" ? wind(value) : "\u{2022}",
        processedData: " ",
        icon: false,
        className: "col-span-2 md:col-span-1",
      };
    case key === "wind_gust":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Wind gust",
        unit: "m/s",
        processedData: " ",
        icon: false,
        className: "col-span-2 md:col-span-1",
      };

    //clouds

    case key === "clouds_all":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Clouds",
        unit: "\u{0025}",
        processedData: "",
        icon: false,
        className: "col-span-2 md:col-span-1",
      };

    // rainfall and snowfall

    case key === "rain_1h":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Rain mm/1h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case key === "rain_3h":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Rain mm/3h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case key === "snow_1h":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Snow mm/1h",
        unit: "mm",
        processedData: "",
        icon: false,
        className: "col-span-2",
      };
    case key === "snow_3h":
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

    case key === "sys_country":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "Country",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };

    case key === "name":
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

    case key === "dt": //time of data calculation
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Updated at",
        unit: "",
        processedData: `${epochTimeConverter(Number(value))}`,
        icon: false,
        className: "col-span-4 order-last",
      };

    case key === "sys_sunrise":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Sunrise",
        unit: "",
        processedData: `${epochTimeConverter(Number(value), false, true)}`,
        icon: false,
        className: "col-span-2",
      };
    case key === "sys_sunset":
      return {
        value: validateEmptyValue(value),
        show: true,
        title: "Sunset",
        unit: "",
        processedData: `${epochTimeConverter(Number(value), false, true)}`,
        icon: false,
        className: "col-span-2",
      };
    case key === "timezone":
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

    case key.includes("_id"):
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "base":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: " ",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "sys_type":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "sys_id":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "cod":
      return {
        value: validateEmptyValue(value),
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: false,
        className: "",
      };
    case key === "id":
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
