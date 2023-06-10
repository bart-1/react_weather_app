import { SyntheticEvent, useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import Search from "./Search";
import { useWeatherState } from "../hooks/useAppState";

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
      <div className="col-span-4 col-rows-2 sm:col-span-4 md:col-rows-1 md:col-span-8 border-2 border-black justify-center rounded-xl bg-gradient-to-b from-darksky-mid to-black shadow-xl md:p-4">
        <form onSubmit={(e: SyntheticEvent) => handleForm(e)}>
          <div className="grid grid-cols-5 grid-rows-2 md:grid-rows-1 z-0">
            <div className="col-span-3 self-start md:col-span-2">
              <Search
                sendCountryCode={(text: string) => setFreshCountryCode(text)}
                sendCountryName={(text: string) => setCountrySearchValue(text)}
              />
            </div>
            <div className="col-span-3 self-start md:col-span-2">
              <InputField
                labelName={`City`}
                sendText={(text) => setFreshCityName(text.toLowerCase())}
                disabled={errInputCountryCode !== "ok" ? true : false}
                errorOuterMessage={""}
              />
            </div>
            <div className="col-span-2 row-span-2 self-start justify-self-end md:col-span-1 md:row-span-1">
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
      </div>
    </>
  );
};

export default FormPanel;
