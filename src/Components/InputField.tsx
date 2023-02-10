import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

interface InputFieldProps {
  labelName: string;
  sendText: (text: string) => void;
  minLength?: number;
  maxLength?: number;
}

const InputField = ({
  labelName,
  sendText,
  minLength,
  maxLength,
}: InputFieldProps) => {
  const [text, setText] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    sendText(text);
  }, [text]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    const regex = /[a-zA-Z]/g;
    const result =[...text.matchAll(regex)];
    if (result && result.length === text.length) {
      setErrMessage("");
      setText(result.join(''));
    } else {
      setErrMessage("Only letters");
    }
  };

  return (
    <div className="flex flex-col max-w-xs">
      <label className="text-white p-1 text-xs" htmlFor="input">
        {labelName}
      </label>
      <input
        className="p-1 font-bold text-xs text-center"
        name="input"
        type="text"
        value={text}
        onChange={handleInput}
      
      />
      {errMessage && (
        <span className="text-xs p-1 text-red-600">{errMessage}</span>
      )}
    </div>
  );
};

export default InputField;
