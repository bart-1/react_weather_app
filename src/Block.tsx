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
      className={`flex grow-0 flex-col bg-gradient-to-b from-gray-900 to-transparent hover:bg-blue-600 shadow-xl ${blockSetupData.className}`}>
      <span className="text-xs p-1 md:p-3 text-white rounded-t-xl">
        {blockSetupData.title ? blockSetupData.title : blockObjectKey}
      </span>
      {blockSetupData.icon ? blockSetupData.icon : null}
      <span className={`text-red-500 p-2 md:p-3 text-sm md:text-xl font-bold text-center`}>
        {blockSetupData.processedData
          ? `${blockSetupData.processedData} ${blockSetupData.unit}`
          : `${blockObjectValue} ${blockSetupData.unit}`}
      </span>
    </div>
  ) : null;
};
export default Block;
