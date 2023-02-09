import React, { useEffect, useState } from "react";
import { validateEmptyValue, ValueType } from "./assets/helpers";
import { setupBlocks } from "./assets/setupBlocks";

interface BlockProps {
  blockValue: ValueType | ValueType[];
  blockTitle: string;
}

const Block = ({ blockValue, blockTitle }: BlockProps ) => {
  const [isValueArray, setIsValueArray] = useState(false);
  const [valueArrayKey, setValueArrayKey] = useState(0);
  const block = setupBlocks(blockTitle, blockValue);

  useEffect(() => {
    if (Array.isArray(blockValue)) setIsValueArray(true);
  }, []);

  useEffect(() => {
    const blockValueTimer = setInterval(() => {
      setValueArrayKey((prevState) => {
        if (Array.isArray(blockValue) && prevState < blockValue.length - 1) return prevState + 1;
        else return (prevState = 0);
      });
    }, 2000);
    return () => {
      clearInterval(blockValueTimer);
    };
  }, [isValueArray]);

  return block.show && block ? (
    <div
      className={`flex grow-0 flex-col bg-gradient-to-b from-gray-900 to-transparent hover:bg-blue-600 shadow-xl ${block.className}`}>
      <span className="text-xs p-1 md:p-3 text-white rounded-t-xl">
        {block.title ? block.title : blockTitle}
      </span>
      {block.icon ? (
        isValueArray && Array.isArray(blockValue) ? (
          <img
            src={`./assets/icons/${blockValue[valueArrayKey]}.svg`}></img>
        ) : (
          <img src={`./assets/icons/${blockValue}.svg`}></img>
        )
      ) : null}
      <span
        className={`text-red-500 p-2 md:p-3 text-sm md:text-xl font-bold text-center`}>
        {block.processedData
          ? `${block.processedData} ${block.unit}`
          : `${
              isValueArray && Array.isArray(blockValue) 
                ? validateEmptyValue(blockValue[valueArrayKey])
                : validateEmptyValue(blockValue)
            } ${block.unit}`}
      </span>
    </div>
  ) : null;
};
export default Block;
