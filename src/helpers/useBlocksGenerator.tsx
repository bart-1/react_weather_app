import React from "react";
import { useState } from "react";
import {
  FlatObject,
  validateEmptyValue,
  ValueType,
} from "./helpers";
import Block from "../Components/Block";

const useBlocksGenerator = () => {
  const [blocksData, setBlocksData] = useState<Array<FlatObject>>();

  const render = (
    blockTitle: string,
    values: ValueType | ValueType[],
    keyToFind: string | number
  ) => {
    return (
      <Block
        blockTitle={blockTitle}
        blockValue={validateEmptyValue(values)}
        key={keyToFind}
      />
    );
  };

  const getAllBlocks = () => {
    if (blocksData) {
      const blocks = Object.values(blocksData).map((element, index) => {
        const [[key, value]] = Object.entries(element);
        return render(key, value, index);
      });

      return blocks;
    }
  };
  const getBlocksByName = (keyToFind: string, blockTitle: string) => {
    if (blocksData) {
      const filteredArray = Object.values(blocksData).filter((element) => {
        const [[key, value]] = Object.entries(element);
        if (key === keyToFind) return element;
      });

      let values: Array<ValueType> = [];
      if (filteredArray.length > 0) {
        Object.values(filteredArray).map((element) => {
          const [[key, value]] = Object.entries(element);
          values = [...values, value];
        });

        return render(blockTitle, values, keyToFind);
      } else return null;
    }
  };

  const setBlocksArray = (array: FlatObject[]) => {
    setBlocksData(array);
  };

  return [getAllBlocks, getBlocksByName, setBlocksArray] as const;
};

export default useBlocksGenerator;
