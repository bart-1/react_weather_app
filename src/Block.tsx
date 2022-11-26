import React from "react";
import { BlockType } from "./assets/setupBlocks";
import { filterText } from "./helpers";

interface BlockProps {
  blockSetupData: BlockType;
  blockObjectValue: string | number;
  blockObjectKey: string;
}

const Block = ({
  blockSetupData,
  blockObjectValue,
  blockObjectKey,
}: BlockProps) => {
  return blockSetupData.show && blockSetupData ? (
    <div
      className={` flex grow-0 flex-col border-2 border-blue-900 bg-gradient-to-b from-gray-900 to-transparent rounded-xl hover:scale-150 shadow-xl ${blockSetupData.className}`}>
      <span className="text-xs p-3 text-white bg-black rounded-t-xl">
        {blockSetupData.title ? blockSetupData.title : blockObjectKey}
      </span>
      {blockSetupData.icon ? blockSetupData.icon : null}
      <span className={`text-red-500 p-3 text-xl font-bold shadow-md`}>
        {blockSetupData.processedData
          ? `${blockSetupData.processedData} ${blockSetupData.unit}`
          : `${blockObjectValue} ${blockSetupData.unit}`}
      </span>
    </div>
  ) : null;
};
export default Block;
