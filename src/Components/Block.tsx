import { useEffect, useState } from "react";
import { setupBlocks } from "../setupBlocks";

interface BlockProps {
  blockValue: string | number | boolean |undefined;
  blockTitle: string;
}

const Block = ({ blockValue, blockTitle }: BlockProps) => {
  const [isValueArray, setIsValueArray] = useState(false);
  const [valueArrayKey, setValueArrayKey] = useState(0);


  const block = setupBlocks(blockTitle, blockValue);
 

  useEffect(() => {
    if (Array.isArray(blockValue)) {
      setIsValueArray(true);
    }
  }, []);

  useEffect(() => {
    const blockValueTimer = setInterval(() => {
      setValueArrayKey((prevState) => {
        if (
          block &&
          Array.isArray(block.value) &&
          prevState < block.value.length - 1
        )
          return prevState + 1;
        else return (prevState = 0);
      });
    }, 2000);
    return () => {
      clearInterval(blockValueTimer);
    };
  }, [isValueArray]);


  return (
    <>
      {block.show ? (
      <div
        className={`flex grow-0 flex-col max-h-40 md:max-h-full bg-gradient-to-b from-darksky-mid to-black border-2 border-black rounded-md ${block.className}`}
      >
        {block.title ? (
          <span className="text-xs p-1 md:p-3 text-white rounded-t-xl">
            {block.title}
          </span>
        ) : null}
        {block.icon ? (
          isValueArray && Array.isArray(block.value) ? (
            <div className="flex h-full justify-center">
              <img
                src={`./assets/icons/${block.value[valueArrayKey]}.svg`}
              ></img>
            </div>
          ) : (
            <div className="flex h-full justify-center">
              <img src={`./assets/icons/${block.value}.svg`}></img>
            </div>
          )
        ) : null}
        <span
          className={`text-led-red-on p-2 md:p-3 text-sm md:text-xl font-bold text-center`}
        >
          {block.processedData
            ? `${block.processedData} ${block.unit}`
            : `${
                isValueArray && Array.isArray(block.value)
                  ? block.value[valueArrayKey]
                  : block.value
              } ${block.unit}`}
        </span>
      </div>
      ) : null}
    </>
  );
};
export default Block;
