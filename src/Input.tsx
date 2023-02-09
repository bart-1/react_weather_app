import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  FunctionComponent,
  SyntheticEvent,
  useState,
} from "react";

interface InputProps {
  sendCityName: (cityName: string) => void;
  sendCountryCode: (countryCode: string) => void;
  labelCity: string;
  labelCountry: string;
}

const Input = ({
  sendCityName,
  sendCountryCode,
  labelCity,
  labelCountry,
}: InputProps) => {
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("pl");

  const handleForm = (e: SyntheticEvent) => {
    e.preventDefault();
    sendCityName(cityName);
    sendCountryCode(countryCode);
  };
  return (
    <>
      <div className="max-w-md m-auto justify-center rounded-xl p-4 bg-gradient-to-b from-gray-900 to-black shadow-xl">
        <form onSubmit={(e: SyntheticEvent) => handleForm(e)}>
          <div className="flex">
              <div className="">
                <label className="text-white p-1 text-xs" htmlFor="inputCityName">
                  {labelCity}
                </label>
                <input
                  className="p-1 font-bold text-xs text-center "
                  name="inputCityName"
                  type="text"
                  value={cityName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCityName(e.currentTarget.value)
                  }
                />
              </div>
              <div className="">
                <label className="text-white text-xs p-1" htmlFor="inputCountryCode">
                  {labelCountry}
                </label>
                <input
                  className="p-1 font-bold text-xs text-center"
                  name="inputCountryCode"
                  type="text"
                  value={countryCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCountryCode(e.currentTarget.value)
                  }
                />
              </div>
              <button className=" hover:bg-red-500 text-sm text-bold text-white" type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
