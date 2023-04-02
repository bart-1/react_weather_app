import { useEffect, useState } from "react";

interface BlockProps {
  value: string | number | boolean;
  title: string;
  unit: string;
  icon: boolean;
  className?: string;
}

const Block = ({ value, title, unit="", icon = false, className }: BlockProps) => {
  const [isValueArray, setIsValueArray] = useState(false);
  const [valueArrayKey, setValueArrayKey] = useState(0);


  useEffect(() => {
    if (Array.isArray(value)) {
      setIsValueArray(true);
    }
  }, []);

  useEffect(() => {
    const valueTimer = setInterval(() => {
      setValueArrayKey((prevState) => {
        if (value && Array.isArray(value) && prevState < value.length - 1)
          return prevState + 1;
        else return (prevState = 0);
      });
    }, 2000);
    return () => {
      clearInterval(valueTimer);
    };
  }, [isValueArray]);

  return (
    <>
      <div
        className={`flex grow-0 flex-col max-h-40 md:max-h-full bg-gradient-to-b from-darksky-mid to-black border-2 border-black rounded-md ${className}`}
      >
        {title ? (
          <span className="text-xs p-1 md:p-3 text-white rounded-t-xl">
            {title}
          </span>
        ) : null}
        {icon && value? (
          isValueArray && Array.isArray(value) ? (
            <div className="flex h-full justify-center">
              <img src={`./assets/icons/${value[valueArrayKey]}.svg`}></img>
            </div>
          ) : (
            <div className="flex h-full justify-center">
              <img src={`./assets/icons/${value}.svg`}></img>
            </div>
          )
        ) : null}
        <span
          className={`text-led-red-on p-2 md:p-3 text-sm md:text-xl font-bold text-center`}
        >{!icon ? isValueArray && Array.isArray(value)
            ? `${value[valueArrayKey]}`
            : `${value} ${unit}`:""}
        </span>
      </div>
    </>
  );
};
export default Block;
