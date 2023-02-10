import { SyntheticEvent, useState } from "react";
import InputField from "./Components/InputField";

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

  const handleForm = (e: SyntheticEvent) => {
    e.preventDefault();
    sendCityName(cityName);
    sendCountryCode(countryCode);
  };
  return (
    <>
      <div className="flex max-w-md p-3 m-auto justify-center rounded-xl bg-gradient-to-b from-gray-900 to-black shadow-xl ">
        <form onSubmit={(e: SyntheticEvent) => handleForm(e)}>
         
            <div className="flex flex-row gap-3">
              <InputField
                labelName={labelCity}
                sendText={(text) => setCityName(text)}
              />
              <InputField
                labelName={labelCountry}
                sendText={(text) => setCountryCode(text)}
              />
              <button
                className="bg-slate-800 hover:bg-orange-500 w-12 text-xs text-bold text-white border-2 border-separate border-white rounded-md p-1"
                type="submit"
              >
                Send
              </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default FormPanel;
