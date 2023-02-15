import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

interface InputFieldProps {
  labelName: string;
  sendText: (text: string) => void;
  minLength?: number;
  maxLength?: number;
  disabled: boolean;
  defaultValue?: string;
  refresh?: boolean;
}

const InputField = ({
  labelName,
  sendText,
  defaultValue,
  minLength,
  maxLength,
  refresh,
  disabled = false,
}: InputFieldProps) => {
  const [text, setText] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (defaultValue) setText(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    sendText(text);
  }, [text]);

  useEffect(() => {
    setReload((prevState) => !prevState);
    if (defaultValue) setText(defaultValue);
  }, [refresh]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    const regex = /[a-zA-Z]/g;
    const result = [...text.matchAll(regex)];
    if (result && result.length === text.length) {
      setErrMessage("");
      setText(result.join(""));
    } else {
      setErrMessage("Only letters");
    }
  };

  return (
    <div className="flex flex-col w-44">
      <label className="text-white p-1 text-xs" htmlFor="input">
        {labelName}
      </label>
      <input
        className="p-1 font-bold text-xs"
        name="input"
        type="text"
        value={text}
        onChange={handleInput}
        autoComplete="off"
        disabled={disabled}
      />
      {errMessage && (
        <span className="text-xs p-1 text-red-600">{errMessage}</span>
      )}
    </div>
  );
};

export default InputField;
