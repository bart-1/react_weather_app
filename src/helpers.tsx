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

export function filterText(text: string) {
  return text.replaceAll("_", " ");
}
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

export const isIterable = (obj: any): boolean => {
  if (typeof obj === "object" && obj !== null) return true;
  else return false;
};
