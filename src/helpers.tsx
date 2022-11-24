const transformDate = (date: number) => {
  const convDate = new Date(date * 1000);
  const seconds = "0" + convDate.getSeconds();
  const minutes = "0" + convDate.getMinutes();
  const hours = "0" + convDate.getHours();

  return `${
    hours.slice(-2) + ":" + minutes.slice(-2) + ":" + seconds.slice(-2)
  }`;
};

export function filterText(text: string) {
  return text.replaceAll("_", " ");
}

export function filterBlocks(text: string, value: string | number | unknown) {
  switch (true) {
    case text === "coord_lon":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "coord_lat":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "0_id":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "0_main":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "0_description":
      return {
        show: true,
        title: "Description",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "0_icon":
      return {
        show: true,
        title: ` `,
        unit: "",
        processedData: " ",
        icon: (
          <img src={`http://openweathermap.org/img/wn/${value}@2x.png`}></img>
        ),
        className: "order-1",
      };
    case text === "base":
      return {
        show: false,
        title: " ",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "main_temp":
      return {
        show: true,
        title: "Temperature",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: ""
      };
    case text === "main_feels_like":
      return {
        show: true,
        title: "Feels like",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: ""
      };
    case text === "main_temp_min":
      return {
        show: true,
        title: "Todays min",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: ""
      };
    case text === "main_temp_max":
      return {
        show: true,
        title: "Todays max",
        unit: "\u{2103}",
        processedData: `${Math.round(Number(value))}`,
        icon: null,
        className: ""
      };
    case text === "main_pressure":
      return {
        show: true,
        title: "Pressure",
        unit: "hPa",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "main_humidity":
      return {
        show: true,
        title: "Humidity",
        unit: "\u{0025}",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "visibility":
      return {
        show: true,
        title: "Visibility",
        unit: "m",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "wind_speed":
      return {
        show: true,
        title: "Wind speed",
        unit: "m/s",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "wind_deg":
      return {
        show: true,
        title: "Wind deg",
        unit: "\u{00B0}",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "clouds_all":
      return {
        show: true,
        title: "Clouds",
        unit: "\u{0025}",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "dt":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "sys_type":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "sys_id":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "sys_country":
      return {
        show: true,
        title: "Country",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "sys_sunrise":
      return {
        show: true,
        title: "Sunrise",
        unit: "",
        processedData: `${typeof value === "number" && transformDate(value)}`,
        icon: null,
        className: ""
      };
    case text === "sys_sunset":
      return {
        show: true,
        title: "Sunset",
        unit: "",
        processedData: `${typeof value === "number" && transformDate(value)}`,
        icon: null,
        className: ""
      };
    case text === "timezone":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "id":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "name":
      return {
        show: true,
        title: "City",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    case text === "cod":
      return {
        show: false,
        title: "",
        unit: "",
        processedData: "",
        icon: null,
        className: ""
      };
    default:
      return { show: true, title: "", unit: "", processedData: "", icon: null };
  }
}

const objectContructor = {}.constructor;

export const isIterable = (obj: any) => {
  if (obj == null || typeof obj === "string" || typeof obj === "number")
    return false;
  else if (Array.isArray(obj) || obj.constructor === objectContructor)
    return true;
};
