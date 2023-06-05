import { useEffect, useState } from "react";
import InputField from "./InputField";
import { Codes, codes } from "../assets/codes";
import { useWeatherState } from "../hooks/useAppState";

export type SearchStatus = "only letters" | "no result" | "ok" | "";

interface SearchProps {
  sendCountryCode: (text: string) => void;
  sendCountryName: (text: string) => void;
  innerError?: (status: SearchStatus) => void;
}

const Search = ({
  sendCountryCode,
  sendCountryName,
  innerError,
}: SearchProps) => {
  const [phrase, setPhrase] = useState("");
  const [codesArr, setCodesArr] = useState<Codes>();
  const [results, setResults] = useState<Codes>();
  const [choosedCountryCode, setChoosedCountryCode] = useState("");
  const [choosedCountryName, setChoosedCountryName] = useState("");
  const [hideSearch, setHideSearch] = useState(true);
  const [refreshInput, setRefreshInput] = useState(true);

  const { setErrInputCountryCode, errInputCountryCode } = useWeatherState();

  useEffect(() => {
    setCodesArr(codes);
  }, []);

  useEffect(() => {
    sendCountryCode(choosedCountryCode);
    sendCountryName(choosedCountryName);
    setHideSearch(true);
  }, [choosedCountryCode]);

  useEffect(() => {
    if (phrase !== choosedCountryName) {
      setErrInputCountryCode("");
      setResults([]);
      setHideSearch(false);
      if (codesArr && Array.isArray(codesArr)) {
        const searchResult = codesArr.filter(
          (element) =>
            element.code.toLowerCase().includes(phrase.toLowerCase()) ||
            element.name.toLowerCase().includes(phrase.toLowerCase())
        );
        if (searchResult.length === 0) {
          setErrInputCountryCode("no result");
        } else {
          setResults(searchResult);
          setErrInputCountryCode("");
        }
      }
    }
  }, [phrase]);

  const searchResultsRender = results?.map((result) => {
    return (
      <li key={result.code} className="w-full text-sm ">
        <button
          className="w-40 hover:bg-black hover:text-white text-left"
          onClick={() => {
            setChoosedCountryCode(result.code);
            setChoosedCountryName(result.name);
            setHideSearch(true);
            setRefreshInput((prevState) => !prevState);
            setErrInputCountryCode("ok");
          }}
        >
          {result.name} - {result.code}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="w-44">
        <InputField
          labelName={`Country`}
          errorOuterMessage={
            errInputCountryCode !== "ok" ? errInputCountryCode : ""
          }
          sendText={(text) => setPhrase(text)}
          disabled={false}
          defaultValue={choosedCountryName}
          refresh={refreshInput}
        />
        {searchResultsRender &&
          searchResultsRender?.length > 0 &&
          !hideSearch && (
            <div className="z-30 absolute max-h-48 p-2 overflow-hidden bg-white shadow-md rounded-b-md text-left">
              <ul>{searchResultsRender}</ul>
            </div>
          )}
      </div>
    </>
  );
};

export default Search;
