import { ReactNode } from "react";
import { transformDate, wind } from "../helpers";

export type BlockType = {
  show: boolean;
  title: string;
  unit: string;
  processedData: string;
  icon: ReactNode;
  className: string;
};

export function setupBlocks(
  text: string,
  value: string | number | unknown
): BlockType {
  switch (true) {
    // coordinates

    case text === "coord_lon":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "coord_lat":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    
    // description

    case text.includes("_main"):
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "0_description":
      return {
        show: true,
        title: "Description",
        unit: "",
        processedData: "",
        icon: null,
        className: "col-span-3",
      };
    case text.includes("_description"):
      return {
        show: false,
        title: "Description",
        unit: "",
        processedData: "",
        icon: null,
        className: "col-span-3",
      };

    // icons

    case text === "0_icon":
      return {
        show: false,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: <img src={`./assets/icons/${value}.svg`}></img>,
        className: "",
      };
    case text === "main_icon":
      return {
        show: true,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: <img src={`./assets/icons/${value}.svg`}></img>,
        className: "col-span-3 row-span-3",
      };
    case text.includes("_icon"):
      return {
        show: false,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: <img src={`./assets/icons/${value}.svg`}></img>,
        className: "",
      };

    //temperature

    case text === "main_temp":
      return {
        show: true,
        title: "Temp.",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: "",
      };
    case text === "main_feels_like":
      return {
        show: true,
        title: "Feels like",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: "",
      };
    case text === "main_temp_min":
      return {
        show: true,
        title: "Todays min",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: "",
      };
    case text === "main_temp_max":
      return {
        show: true,
        title: "Todays max",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: "",
      };

    //pressure

    case text === "main_pressure":
      return {
        show: true,
        title: "Pressure",
        unit: "hPa",
        processedData: "",
        icon: null,
        className: "col-span-2",
      };

    //humidity

    case text === "main_humidity":
      return {
        show: true,
        title: "Humidity",
        unit: "\u{0025}",
        processedData: "",
        icon: null,
        className: "",
      };

    //visibility

    case text === "visibility":
      return {
        show: true,
        title: "Visibility",
        unit: "m",
        processedData: "",
        icon: null,
        className: "col-span-2",
      };

    //wind

    case text === "wind_speed":
      return {
        show: true,
        title: "Wind speed",
        unit: "m/s",
        processedData: "",
        icon: null,
        className: "col-span-2",
      };
    case text === "wind_deg":
      return {
        show: true,
        title: "Wind deg",
        unit: typeof value === "number" ? wind(value) : "\u{2022}",
        processedData: " ",
        icon: null,
        className: "",
      };
    case text === "wind_gust":
      return {
        show: true,
        title: "Wind gust",
        unit: "m/s",
        processedData: " ",
        icon: null,
        className: "",
      };

    //clouds

    case text === "clouds_all":
      return {
        show: true,
        title: "Clouds",
        unit: "\u{0025}",
        processedData: "",
        icon: null,
        className: "",
      };

    // rainfall and snowfall

    case text === "rain_1h":
      return {
        show: true,
        title: "Rain mm/1h",
        unit: "mm",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "rain_3h":
      return {
        show: true,
        title: "Rain mm/3h",
        unit: "mm",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "snow_1h":
      return {
        show: true,
        title: "Snow mm/1h",
        unit: "mm",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "snow_3h":
      return {
        show: true,
        title: "Snow mm/3h",
        unit: "mm",
        processedData: "",
        icon: null,
        className: "",
      };

    // country & city

    case text === "sys_country":
      return {
        show: true,
        title: "Country",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };

    case text === "name":
      return {
        show: true,
        title: "City",
        unit: "",
        processedData: "",
        icon: null,
        className: "col-span-2",
      };

    //time & date

    case text === "dt": //time of data calculation
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };

    case text === "sys_sunrise":
      return {
        show: true,
        title: "Sunrise",
        unit: "",
        processedData: `${typeof value === "number" && transformDate(value)}`,
        icon: null,
        className: "col-span-2",
      };
    case text === "sys_sunset":
      return {
        show: true,
        title: "Sunset",
        unit: "",
        processedData: `${typeof value === "number" && transformDate(value)}`,
        icon: null,
        className: "col-span-2",
      };
    case text === "timezone":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };

    // API server internal data

    case text.includes("_id"):
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "base":
      return {
        show: false,
        title: " ",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "sys_type":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "sys_id":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "cod":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
    case text === "id":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };

    default:
      return {
        show: true,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: "",
      };
  }
}
