import { ReactNode } from "react";

export const transformDate = (date: number) => {
  const convDate = new Date(date * 1000);
  const seconds = "0" + convDate.getSeconds();
  const minutes = "0" + convDate.getMinutes();
  const hours = "0" + convDate.getHours();

  return `${
    hours.slice(-2) + ":" + minutes.slice(-2) + ":" + seconds.slice(-2)
  }`;
};

export const validateEmptyValue = (value: ValueType | ValueType[]) => {
  if (!value) return "-";

  return value;
};

export const roundNumberValue = (value: number) => {
  return Math.round(Number(value));
};

export const convertTimestamp = (value: string) => {
  return value.slice(0, 19).replace("T", " ");
};

/**
 * Return a human-readable data.
 * @param time epoch value of time
 * @param ymd add to return year-month-day (default: true)
 * @param hms add to return hour-minute-second (default: true)
 * @returns
 */
export const epochTimeConverter = (
  time: number,
  ymd: boolean = true,
  hms: boolean = true
) => {
  if (time === undefined) return "-";
  const date = new Date(time * 1000);
  const year = date.getUTCFullYear();
  const month = "0" + (date.getUTCMonth() + 1);
  const day = "0" + date.getUTCDate();
  const seconds = "0" + date.getUTCSeconds();
  const minutes = "0" + date.getUTCMinutes();
  const hoursTimezoneCorrection = "0" + (date.getUTCHours() + 1);

  return `${ymd ? `${year}-${month.slice(-2)}-${day.slice(-2)}` : ""} ${
    hms
      ? ` ${hoursTimezoneCorrection.slice(-2)}:${minutes.slice(
          -2
        )}:${seconds.slice(-2)}`
      : ""
  }`;
};
//45
export const wind = (deg: number) => {
  switch (true) {
    case (deg >= 337.5 && deg <= 360) || (deg >= 0 && deg <= 22.5):
      return "N \u{2191}";
    case deg > 22.5 && deg < 67.5:
      return "NE \u{2197}";
    case deg >= 67.5 && deg <= 112.5:
      return "E \u{2192}";
    case deg > 112.5 && deg < 157.5:
      return "SE \u{2198}";
    case deg >= 157.5 && deg <= 202.5:
      return "S \u{2193}";
    case deg > 202.5 && deg < 247.5:
      return "SW \u{2199}";
    case deg >= 247.5 && deg <= 292.5:
      return "W \u{2190}";
    case deg > 292.5 && deg < 337.5:
      return "NW \u{2196}";
    default:
      return "\u{2022}";
  }
};

export const tripleObjectArrayManager = (object: object) => {
  if (arrayStore.length < 3) {
    arrayStore.push(object);
  } else {
    arrayStore.push(object);
    arrayStore = arrayStore.slice(1);
  }

  return arrayStore;
};

export const isIterableObject = (obj: any): boolean => {
  if (typeof obj === "object" && obj !== null) return true;
  else return false;
};

let arrayStore = [{}];

type ValueType = string | number;
type FlatObject = { [key: string]: ValueType };
type IterableObject = { [key: string]: ValueType | FlatObject };

export const iterateObject = (dataPcs: IterableObject, masterKey = "") => {
  let newObject = {} as FlatObject;
  (function iteration(dataPcs: IterableObject, masterKey = "") {
    Object.entries(dataPcs).map(([key, value]) => {
      if (typeof value !== "object") {
        newObject[`${masterKey ? `${masterKey}_` : ""}${key}`] = value;
      } else iteration(value, `${masterKey ? `${masterKey}_` : ""}${key}`);
    });
  })(dataPcs, masterKey);

  return newObject;
};

 export function isJson(str: string | null) {
    if (!str) return false;
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
