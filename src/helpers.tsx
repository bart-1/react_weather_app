

export function filterText(text: string) {
  return text.replaceAll("_", " ");
}

export function filterBlocks(text: string) {
  switch (true) {
    case text === "coord_lon":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "coord_lat":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "0_id":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "0_main":
      return { show: true, title: "Icon", unit: "", iconShow: true, icon: <></> };
    case text === "0_description":
      return { show: true, title: "Description", unit: "", iconShow: true, icon: <></> };
    case text === "0_icon":
      return { show: true, title: "Icon", unit: "", iconShow: true, icon: <></> };
    case text === "base":
      return { show: false, title: " ", unit: "", iconShow: true, icon: <></> };
    case text === "main_temp":
      return {
        show: true,
        title: "Temperature",
        unit: "\u{2103}",
        iconShow: true,
        icon: <></>,
      };
    case text === "main_feels_like":
      return { show: true, title: "Feels like", unit: "\u{2103}", iconShow: true, icon: <></> };
    case text === "main_temp_min":
      return { show: true, title: "Todays min", unit: "\u{2103}", iconShow: true, icon: <></> };
    case text === "main_temp_max":
      return { show: true, title: "Todays max", unit: "\u{2103}", iconShow: true, icon: <></> };
    case text === "main_pressure":
      return { show: true, title: "Pressure", unit: "hPa", iconShow: true, icon: <></> };
    case text === "main_humidity":
      return {
        show: true,
        title: "Humidity",
        unit: "\u{0025}",
        iconShow: true,
        icon: <></>,
      };
    case text === "visibility":
      return { show: true, title: "Visibility", unit: "m", iconShow: true, icon: <></> };
    case text === "wind_speed":
      return { show: true, title: "Wind speed", unit: "m/s", iconShow: true, icon: <></> };
    case text === "wind_deg":
      return { show: true, title: "Wind deg", unit: "\u{00B0}", iconShow: true, icon: <></> };
    case text === "clouds_all":
      return { show: true, title: "Clouds", unit: "\u{0025}", iconShow: true, icon: <></> };
    case text === "dt":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "sys_type":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "sys_id":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "sys_country":
      return { show: true, title: "Country", unit: "", iconShow: true, icon: <></> };
    case text === "sys_sunrise":
      return { show: true, title: "Sunrise", unit: "", iconShow: true, icon: <></> };
    case text === "sys_sunset":
      return { show: true, title: "Sunset", unit: "", iconShow: true, icon: <></> };
    case text === "timezone":
      return { show: true, title: "Timezone", unit: "", iconShow: true, icon: <></> };
    case text === "id":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    case text === "name":
      return { show: true, title: "City", unit: "", iconShow: true, icon: <></> };
    case text === "cod":
      return { show: false, title: "", unit: "", iconShow: true, icon: <></> };
    default:
      return { show: true, title: "", unit: "", iconShow: true, icon: <></> };
  }
}

const objectContructor = {}.constructor;

export const isIterable = (obj: any) => {
  if (obj == null || typeof obj === "string" || typeof obj === "number")
    return false;
  else if (Array.isArray(obj) || obj.constructor === objectContructor)
    return true;
};
