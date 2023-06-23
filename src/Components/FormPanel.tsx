import { SyntheticEvent, useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import Search from "./Search";
import { useWeatherState } from "../hooks/useAppState";
import Block from "./Block";

const FormPanel = () => {
  const [freshCityName, setFreshCityName] = useState("");
  const [freshCountryCode, setFreshCountryCode] = useState("");
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [readyToStore, setReadyToStore] = useState(false);

  const [isShown, setIsShown] = useState(false);

  const {
    setInputCityName,
    setInputCountryCode,
    setErrInputCity,
    setErrInputCountryCode,
    errInputCountryCode,
    status,
    addButtonsToArray,
    numberOfButtons,
  } = useWeatherState();

  const { weather } = useWeatherState();

  const handleForm = (e: SyntheticEvent | string) => {
    typeof e !== "string" ? e.preventDefault() : "";
    if (freshCityName !== undefined) {
      setErrInputCity(false);
      setInputCityName(freshCityName);
    } else setErrInputCity(true);

    if (freshCountryCode !== undefined || countrySearchValue !== undefined) {
      setErrInputCountryCode("ok");
      setInputCountryCode(freshCountryCode);
    } else setErrInputCountryCode("no result");
  };

  const handleAddClick = () => {
    if (freshCityName !== "" && freshCountryCode !== "") {
      addButtonsToArray(
        {
          bgColor: "special",
          action: () => "",
          title: weather.name,
          type: "button",
          isActive: true,
          isOn: false,
          id: freshCityName,
          cityName: freshCityName,
          countryCode: freshCountryCode,
        },
        numberOfButtons
      );
      handleForm("");
      setReadyToStore(true);
    }
  };

  useEffect(() => {
    setReadyToStore(false);
  }, [readyToStore]);

  return (
    <>
      <form onSubmit={(e: SyntheticEvent) => handleForm(e)}>
        <div className="grid grid-cols-3 grid-rows-2 md:grid-rows-1 md:grid-cols-8 z-0">
          <div className="flex row-span-2 md:row-span-1 md:col-span-2 order-2 md:order-none ">
            <span className="text-md text-blue-400 border-2 border-blue-400 h-fit self-center p-1 rounded-md">
              v1.0
            </span>
          </div>
          <div className="self-start md:col-span-2 order-3 -mt-1 md:mt-0 md:order-none">
            <Search
              sendCountryCode={(text: string) => setFreshCountryCode(text)}
              sendCountryName={(text: string) => setCountrySearchValue(text)}
            />
          </div>
          <div className="self-start order-5 md:col-span-2 md:order-none">
            <InputField
              labelName={`City`}
              sendText={(text) => setFreshCityName(text.toLowerCase())}
              disabled={errInputCountryCode !== "ok" ? true : false}
              errorOuterMessage={""}
            />
          </div>
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 row-span-2 md:row-span-1 md:col-span-2 gap-[4px] self-start justify-self-end order-4 md:order-none">
            {isShown && (
              <Button
                id={"add"}
                action={() => {
                  handleAddClick();
                  setIsShown(false);
                }}
                type="button"
                bgColor="special"
                isActive={
                  freshCityName !== "" &&
                  freshCountryCode !== "" &&
                  isShown === true &&
                  status === "success"
                    ? true
                    : false
                }
                isOn={false}
                size="M"
                title="Add City"
              />
            )}
            <Button
              id={"search"}
              action={() => setIsShown(true)}
              type="submit"
              bgColor="special"
              isActive={true}
              isOn={false}
              size="M"
              title="Show"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormPanel;
