import { useEffect, useState } from "react";
import { useWeatherState } from "./useAppState";
import { buttonsDataSet } from "../assets/initialCityButtonsData";
import { isJson } from "./helpers";

export const useLocalStorage = <T>(initialData: T, storageName: string) => {
  const [dataFromStorage, setDataFromStorage] = useState<T>(initialData);
  const [dataToStore, setDataToStore] = useState<T>(initialData);

  useEffect(() => {
    const data = localStorage.getItem(storageName);
    if (!data || isJson(data)) setDataToStore(initialData);
    else setDataFromStorage(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (dataToStore !== initialData)
      localStorage.setItem(storageName, JSON.stringify(dataToStore));
  }, [dataToStore]);

  function setToLocalStorage(data: T) {
    setDataToStore(data);
  }

  function getFromLocalStorage() {
    const data = localStorage.getItem(storageName);
    if (data && isJson(data))
      try {
        const jsonData = JSON.parse(data);
        setDataFromStorage(jsonData);
      } catch (e) {
        console.log(e);
      }
  }

  function clearLocalStorage() {
    localStorage.removeItem(storageName);
  }

  return {
    getData: getFromLocalStorage,
    setData: setToLocalStorage,
    clearData: clearLocalStorage,
    data: dataFromStorage,
  };
};

export const useWeatherLocalStorage = () => {
  const [ignition, setIgnition] = useState(false);

  const {
    addButtonsToArray,
    setNumberOfButtons,
    buttonsArray,
    checkButtonsArr,
  } = useWeatherState();

  const { data, setData, getData, clearData } = useLocalStorage(
    buttonsDataSet,
    "weather"
  );

  useEffect(() => {
    getData();
    setNumberOfButtons(data.length);
    data.forEach((element) => {
      addButtonsToArray(element, data.length);
    });
  }, [ignition]);

  const refreshData = () => {
    if (buttonsArray.length > 0) setData(buttonsArray);
  };

  return {
    refreshData: refreshData,
    getData: data,
    ignition: setIgnition,
  } as const;
};
