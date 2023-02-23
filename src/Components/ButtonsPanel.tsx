import React, { useState } from "react";
import Button, { ButtonType } from "./Button";

interface ButtonsPanelProps {
  outputAction?: () => void;
  buttonsData: ButtonType[];
}

const ButtonsPanel = ({ outputAction, buttonsData }: ButtonsPanelProps) => {
  const [isOn, setIsOn] = useState("");

  const onOffHandler = (id: string) => {
    setIsOn(id);
  };

  const buttonsGenerator = buttonsData.map((button, index) => {
    return (
      <Button
        action={(id: string) => onOffHandler(id)}
        bgColor={button.bgColor}
        id={button.title + index}
        isActive={button.isActive}
        isOn={button.title + index === isOn ? true : false}
        size={button.size}
        title={button.title}
        key={button.title + index}
      />
    );
  });

  return (
    <>
      <div className="grid grid-cols-1 mt-2 max-w-md max-h-90vh md:max-w-3xl gap-[8px] sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-darksky-mid to-black shadow-xl">
        {buttonsGenerator}{" "}
      </div>
    </>
  );
};
export default ButtonsPanel;
