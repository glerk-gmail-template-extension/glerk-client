import { forwardRef, useState } from "react";
import { TbCalendarCode } from "react-icons/tb";

import SelectBox from "../form/SelectBox";
import LabelInput from "../form/LabelInput";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";

import {
  DATE_FORMAT,
  DATE_OPTIONS,
  MAIL_BUTTONS,
  MONTH_BUTTONS,
} from "../../constants/customVariable";

const VariableArea = forwardRef(function VariableArea({ onVariableAdd }, ref) {
  const [customVariable, setCustomVariable] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [dateOption, setDateOption] = useState(DATE_OPTIONS[0].id);

  const isValidVaraible = (variable) => {
    return variable && variable.trim() !== "";
  };

  const addCustomVariable = (variable) => {
    if (isValidVaraible(variable)) {
      onVariableAdd(variable);
    } else {
      setValidationMessage("빈 공백을 제외한 문자를 입력해주세요.");
    }
  };

  const handleFormatOptionChange = (event) => {
    onVariableAdd(`${dateOption}.${event.target.value}`);
  };

  return (
    <div
      ref={ref}
      role="textbox"
      aria-multiline
      tabIndex={0}
      className="absolute z-10 p-4 transform -translate-x-1/2 bg-white rounded-md w-108 shadow-popover left-1/2"
    >
      <h2 className="p-2 font-medium text-gray-400">Custom</h2>
      <div className="flex items-center p-2">
        <div className="w-3/4 pr-1.5">
          <LabelInput
            label="Custom Variable"
            name="variable"
            onChange={(event) => setCustomVariable(event.target.value)}
            validationMessage={validationMessage}
          />
        </div>
        <div className="mb-1 text-primary">
          <IconButton
            tooltip="커스텀 변수 추가"
            onClick={() => addCustomVariable(customVariable)}
          >
            {"{+}"}
          </IconButton>
        </div>
      </div>
      <h2 className="p-2 font-medium text-gray-400">Mail</h2>
      <div className="flex flex-wrap items-center px-2 pb-2">
        {MAIL_BUTTONS.map(({ id, name }) => (
          <div key={name} className="inline-block p-0.5">
            <Button
              text={name}
              textColor="text-white"
              borderColor="border-purple"
              backgroundColor="bg-purple"
              hoverBackgroundColor="hover:bg-dark-purple"
              onClick={() => addCustomVariable(id)}
            />
          </div>
        ))}
      </div>
      <h2 className="p-2 font-medium text-gray-400">Month</h2>
      <div className="flex flex-wrap items-center px-2 pb-2">
        {MONTH_BUTTONS.map(({ id, name }) => (
          <div key={name} className="inline-block p-0.5">
            <Button
              text={name}
              textColor="text-white"
              borderColor="border-purple"
              backgroundColor="bg-purple"
              hoverBackgroundColor="hover:bg-dark-purple"
              onClick={() => addCustomVariable(id)}
            />
          </div>
        ))}
      </div>
      <h2 className="p-2 font-medium text-gray-400">Date</h2>
      <div className="flex flex-wrap items-center p-2">
        <div className="inline-block">
          <SelectBox
            options={DATE_OPTIONS}
            value={dateOption}
            onChange={(e) => setDateOption(e.target.value)}
          >
            <TbCalendarCode />
          </SelectBox>
        </div>
        <div className="flex flex-col items-start font-extralight">
          <label htmlFor="long-date-format" className="flex items-center">
            <input
              type="radio"
              id="long-date-format"
              name="dateFormat"
              value="long"
              onChange={handleFormatOptionChange}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm">
              Long (
              {new Date().toLocaleDateString(
                navigator.language,
                DATE_FORMAT.LONG,
              )}
              )
            </span>
          </label>
          <label htmlFor="short-date-format" className="flex items-center">
            <input
              type="radio"
              id="short-date-format"
              name="dateFormat"
              value="short"
              onChange={handleFormatOptionChange}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm">
              Short (
              {new Date().toLocaleDateString(
                navigator.language,
                DATE_FORMAT.SHORT,
              )}
              )
            </span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default VariableArea;
