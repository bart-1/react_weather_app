import React, { useMemo } from "react";
import { useState } from "react";
import { validateEmptyValue } from "./helpers";
import Block from "../Components/Block";
import { FlatObject, ValueType } from "./useFetchApi";

const BlockRender = (
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

const useBlocksGenerator = () => {
  const [blocksData, setBlocksData] = useState<FlatObject | FlatObject[]>();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<ValueType | ValueType[]>();
  const [index, setIndex] = useState<string | number>(0);

  // const renderMemo = useMemo()

  const getAllBlocks = () => {
    if (blocksData) {
      const blocks = Object.entries(blocksData).map(([key, value], index) => {
        setTitle(key);
        setValue(value);
        setIndex(index);
      });
    }
  };
  const getBlocksByName = (keyToFind: string, blockTitle: string) => {
    if (blocksData) {
      const filteredArray = Object.entries(blocksData).filter(
        ([key, value], index) => {
          if (key === keyToFind) return value;
        }
      );
      let values: Array<ValueType> = [];
      if (filteredArray.length > 0) {
        Object.entries(filteredArray).map(([key, value], index) => {
          values = [...values, value[1]];
        });

        setTitle(blockTitle);
        setValue(values);
        setIndex(keyToFind);
      }
    }
  };

  const setBlocksArray = (array: FlatObject[]) => {
    setBlocksData(array);
  };

  return [getAllBlocks, getBlocksByName, setBlocksArray] as const;
};

export default useBlocksGenerator;
