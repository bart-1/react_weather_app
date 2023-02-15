import { useEffect, useState } from "react";
import InputField from "./Components/InputField";
import { Codes, codes } from "./assets/codes";

interface SearchProps {
  sendCountryCode: (text: string) => void;
  sendCountryName: (text: string) => void;
  inputFieldLabel: string;
}

const Search = ({
  sendCountryCode,
  sendCountryName,
  inputFieldLabel,
}: SearchProps) => {
  const [phrase, setPhrase] = useState("");
  const [codesArr, setCodesArr] = useState<Codes>();
  const [results, setResults] = useState<Codes>();
  const [choosedCountryCode, setChoosedCountryCode] = useState("");
  const [choosedCountryName, setChoosedCountryName] = useState("");
  const [hideSearch, setHideSearch] = useState(true);
  const [refreshInput, setRefreshInput] = useState(true);

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
      setResults([]);
      setHideSearch(false);
      if (codesArr && Array.isArray(codesArr)) {
        const phraseSearchResult = codesArr.filter(
          (element) =>
            element.code.toLowerCase().includes(phrase.toLowerCase()) ||
            element.name.toLowerCase().includes(phrase.toLowerCase())
        );
        setResults(phraseSearchResult);
      }
    }
  }, [phrase]);

  const searchResultsRender = results?.map((result) => {
    return (
      <li key={result.code} className="w-full text-sm ">
        <button
          className="w-40 h-5 hover:bg-black hover:text-white text-left"
          onClick={() => {
            setChoosedCountryCode(result.code);
            setChoosedCountryName(result.name);
            setHideSearch(true)
            setRefreshInput(prevState => !prevState)
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
          labelName={inputFieldLabel}
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
      <div className="w-6 h-6 rounded-sm text-gray-700 text-xs text-center self-end p-0 items-center">
        <span>{choosedCountryCode}</span>
      </div>
    </>
  );
};

export default Search;
