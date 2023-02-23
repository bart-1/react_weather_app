import { SyntheticEvent, useState } from "react";
import Button from "./Button";
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
      <div className="justify-center rounded-xl p-2 bg-gradient-to-b from-darksky-mid to-black shadow-xl md:p-4">
        <form onSubmit={(e: SyntheticEvent) => handleForm(e)}>
          <div className="grid grid-cols-5 grid-rows-2 md:grid-rows-1 z-0">
            <div className="col-span-3 self-start md:col-span-2">
              <Search
                sendCountryCode={(text: string) => setCountryCode(text)}
                sendCountryName={(text: string) => setCountrySearchValue(text)}
                inputFieldLabel={"Country"}
              />
            </div>

            <div className="col-span-3 self-start md:col-span-2">
              <InputField
                labelName={labelCity}
                sendText={(text) => setCityName(text)}
                disabled={false}
              />
            </div>
            <div className="col-span-2 row-span-2 self-start justify-self-end md:col-span-1 md:row-span-1">
              <Button
                id={"search"}
                action={() => ""}
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
