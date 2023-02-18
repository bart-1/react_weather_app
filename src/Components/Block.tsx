import { useEffect, useState } from "react";
import { FlatObject, ValueType } from "../helpers/helpers";
import { BlockType, setupBlocks } from "../helpers/setupBlocks";

interface BlockProps {
  blockValue: ValueType | ValueType[];
  blockTitle: string;
}

const Block = ({ blockValue, blockTitle }: BlockProps) => {
  const [isValueArray, setIsValueArray] = useState(false);
  const [valueArrayKey, setValueArrayKey] = useState(0);
  const [block, setBlock] = useState<BlockType>();

  useEffect(() => {
    if (Array.isArray(blockValue)) {
      setIsValueArray(true);
    } else setBlock(setupBlocks(blockTitle, blockValue));
  }, []);

  // if (!block) return <div>blocks...</div>;

  useEffect(() => {
    const blockValueTimer = setInterval(() => {
      setValueArrayKey((prevState) => {
        if (block && Array.isArray(block.value) && prevState < block.value.length - 1)
          return prevState + 1;
        else return (prevState = 0);
      });
    }, 2000);
    return () => {
      clearInterval(blockValueTimer);
    };
  }, [isValueArray]);

  return block && block.show ? (
    <div
      className={`flex grow-0 flex-col bg-gradient-to-b from-gray-900 to-transparent hover:bg-blue-600 shadow-xl ${block.className}`}
    >
      <span className="text-xs p-1 md:p-3 text-white rounded-t-xl">
        {block.title ? block.title : blockTitle}
      </span>
      {block.icon ? (
        isValueArray && Array.isArray(block.value) ? (
          <img src={`./assets/icons/${block.value[valueArrayKey]}.svg`}></img>
        ) : (
          <img src={`./assets/icons/${block.value}.svg`}></img>
        )
      ) : null}
      <span
        className={`text-red-500 p-2 md:p-3 text-sm md:text-xl font-bold text-center`}
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
  ) : null;
};
export default Block;
