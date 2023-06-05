import React, { useEffect, useState } from "react";

export interface ButtonType {
  action: (id: string) => void;
  bgColor?:
    | "blue"
    | "green"
    | "darkBlue"
    | "red"
    | "orange"
    | "black"
    | "special";
  isActive?: boolean;
  isOn?: boolean;
  size?: "S" | "M" | "L";
  title: string;
  type?: "button" | "submit";
  id: string;
}

const Button = ({
  action,
  bgColor = "black",
  isActive = true,
  isOn = false,
  size = "M",
  title = "button",
  type = "button",
  id,
}: ButtonType) => {
  const [buttonSize, setButtonSize] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    switch (size) {
      case "L":
        setButtonSize("w-fill text-md");
        break;
      case "M":
        setButtonSize("w-fill  text-sm");
        break;
      case "S":
        setButtonSize("w-fill text-xs");
        break;
    }
  }, [size]);

  useEffect(() => {
    switch (bgColor) {
      case "blue":
        setButtonColor(
          `${
            isOn
              ? `bg-blue-400 text-blue-100`
              : `bg-blue-700 hover:bg-blue-400 text-blue-100`
          } `
        );
        break;
      case "green":
        setButtonColor(
          `${
            isOn
              ? `bg-green-400 text-green-100`
              : `bg-green-700 hover:bg-green-400 text-green-100`
          }`
        );
        break;
      case "darkBlue":
        setButtonColor(
          `${
            isOn
              ? `bg-slate-400 text-slate-100`
              : `bg-slate-900 hover:bg-slate-700 text-slate-100`
          }`
        );
        break;
      case "red":
        setButtonColor(
          `${
            isOn
              ? `bg-red-400 text-red-100`
              : `bg-red-700 hover:bg-red-400 text-red-100`
          }`
        );
        break;
      case "orange":
        setButtonColor(
          `${
            isOn
              ? `bg-orange-400 text-orange-100`
              : `bg-orange-700 hover:bg-orange-400 text-orange-100`
          }`
        );
        break;
      case "black":
        setButtonColor(
          `${
            isOn
              ? `bg-gray-800 text-white`
              : `bg-black hover:bg-gray-800 text-white`
          }`
        );
        break;
      case "special":
        setButtonColor(`${isOn ? ` text-white` : `text-white`}`);
        break;
    }
  }, [bgColor]);

  const onClickHandler = () => {
    action(id);
    setButtonClicked(true);
  };

  return (
    <>
      {isActive && (
        <button
          type={type}
          onMouseOver={() => setButtonHover(true)}
          onMouseLeave={() => {
            setButtonHover(false);
            setButtonClicked(false);
          }}
          onClick={isActive ? onClickHandler : () => ""}
          className={`${buttonSize} border-2 border-black rounded-md text-center ${buttonColor}
        } ${
          isOn
            ? `bg-gradient-to-b from-black to-transparent pl-2 pb-2 pr-2 pt-3 `
            : ` p-2`
        }
        }`}
        >
          {title}
          <div
            className={`w-6 h-0.5 rounded-xl ${
              buttonHover
                ? `${buttonClicked ? `bg-led-green-on` : `bg-yellow-400`}`
                : `${isOn ? `bg-led-green-on` : `bg-led-orange-on`}`
            }`}
          ></div>
        </button>
      )}
    </>
  );
};
export default Button;
