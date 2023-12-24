import React, { useState, ChangeEvent } from "react";

interface FormInputProps {
  inputName: string;
  isInputValid: boolean;
  handleSave: (value: string, inputName: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ handleSave, inputName, isInputValid }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const truncatedValue = newValue.slice(0, 12);

    const isAlphabetic = /^[a-zA-Z]*$/.test(truncatedValue);
    setIsValid(truncatedValue.length >= 2 && truncatedValue.length <= 12);

    if (isAlphabetic) {
      setInputValue(truncatedValue);
      setIsTouched(true);
      handleSave(truncatedValue, inputName);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor="grid-first-name"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4"
        >
          {inputName}
        </label>
        <input
          id="grid-first-name"
          className={`appearance-none block w-full hover:border-purple-600 focus:border-purple-600 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
            isTouched && !isValid ? "border-red-500" : ""
          }`}
          type="text"
          name={inputName}
          placeholder={inputName}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isTouched && !isValid && !isInputValid && (
          <p className="text-red-500 text-xs">
            Please enter valid data.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
