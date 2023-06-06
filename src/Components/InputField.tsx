import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

interface InputFieldProps {
  labelName: string;
  sendText: (text: string) => void;
  minLength?: number;
  maxLength?: number;
  disabled: boolean;
  defaultValue?: string;
  refresh?: boolean;
  errorOuterMessage?: string;
}

const InputField = ({
  labelName,
  sendText,
  defaultValue,
  minLength,
  maxLength,
  refresh,
  disabled = false,
  errorOuterMessage,
}: InputFieldProps) => {
  const [text, setText] = useState("");
  const [errorInnerMessage, setErrorInnerMessage] = useState("");
  const [reload, setReload] = useState(true);
  const [showError, setShowError] = useState<string | undefined>();

  useEffect(() => {
    if (defaultValue) setText(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    sendText(text);
  }, [text]);

  useEffect(() => {
    setShowError(undefined);
    const errorsArray = errorInnerMessage || errorOuterMessage ? true : false;
    const errIntv =
      errorsArray &&
      setInterval(() => {
        setShowError((prevState) =>
          prevState === errorInnerMessage
            ? (prevState = errorOuterMessage)
            : (prevState = errorInnerMessage)
        );
      }, 500);

    return () => {
      errIntv && clearInterval(errIntv);
    };
  }, [errorInnerMessage, errorOuterMessage]);

  useEffect(() => {
    setReload((prevState) => !prevState);
    if (defaultValue) setText(defaultValue);
  }, [refresh]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    const regex = /[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŻżŹź]/g;
    const result = [...text.matchAll(regex)];
    if (result && result.length === text.length) {
      setErrorInnerMessage("");
      setText(result.join(""));
    } else {
      setErrorInnerMessage(` * only letters`);
    }
  };

  return (
    <div className="flex flex-col w-44">
      <label className="text-white p-1 text-xs" htmlFor="input">
        {`${labelName} `}
        {showError !== undefined ? (
          <span className="text-led-red-on">{showError}</span>
        ) : (
          ""
        )}
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
    </div>
  );
};

export default InputField;
