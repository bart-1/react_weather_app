import { SyntheticEvent, useState } from "react";
import InputField from "./InputField";
import Search from "./Search";

interface FormPanelProps {
  sendCityName: (cityName: string) => void;
  sendCountryCode: (countryCode: string) => void;
  labelCity: string;
  labelCountry: string;
}

const FormPanel = ({
  sendCityName,
  sendCountryCode,
  labelCity,
  labelCountry,
}: FormPanelProps) => {
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countrySearchValue, setCountrySearchValue] = useState("");

  const handleForm = (e: SyntheticEvent) => {
    e.preventDefault();
    sendCityName(cityName);
    sendCountryCode(countryCode);
  };
  return (
    <>
      <div className="flex w-fit mt-3 p-3 m-auto justify-center rounded-xl bg-gradient-to-b from-gray-900 to-black shadow-xl ">
        <form onSubmit={(e: SyntheticEvent) => handleForm(e)}>
          <div className="flex flex-row gap-3 z-0">
            <Search
              sendCountryCode={(text: string) => setCountryCode(text)}
              sendCountryName={(text: string) => setCountrySearchValue(text)}
              inputFieldLabel={"Country"}
            />

            <InputField
              labelName={labelCity}
              sendText={(text) => setCityName(text)}
              disabled={false}
            />

            <button
              className="bg-slate-800 hover:bg-orange-500 h-8 w-12 self-end hover:text-black text-xs text-bold text-white border-2 border-separate border-white rounded-md p-1"
              type="submit"
            >
              Show
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPanel;
