import { useEffect, useRef, useState } from "react";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuQuote,
  LuListOrdered,
  LuList,
  LuUndo,
  LuRedo,
  LuLink,
  LuUnlink,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuIndent,
  LuOutdent,
  LuRemoveFormatting,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
  LuBaseline,
  LuHighlighter,
} from "react-icons/lu";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { TbCodePlus, TbCalendarCode } from "react-icons/tb";

import IconButton from "../ui/IconButton";
import Divider from "./Divider";
import ColorInput from "./ColorInput";
import Input from "./Input";
import Button from "../ui/Button";
import SelectBox from "./SelectBox";

const MAIL_BUTTONS = [
  { name: "To: First Name" },
  { name: "To: Full Name" },
  { name: "To: Email" },
];

const MONTH_BUTTONS = [
  { name: "Last Month" },
  { name: "This Month" },
  { name: "Next Month" },
];

const DATE_OPTIONS = [
  { value: "Today", text: "Today" },
  { value: "Tomorrow", text: "Tomorrow" },
  { value: "Next Monday", text: "Next Monday" },
  { value: "Last week", text: "Last week" },
  { value: "Next Week", text: "Next Week" },
];

const DATE_FORMAT = {
  LONG: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  SHORT: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
};

export default function Editor() {
  const [showVariableArea, setShowVariableArea] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!showVariableArea || !popoverRef.current || !buttonRef.current) {
        return;
      }

      if (
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowVariableArea(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVariableArea]);

  return (
    <div className="w-full p-2 border border-stroke">
      <div>
        <IconButton tooltip="Bold">
          <LuBold size={20} />
        </IconButton>
        <IconButton tooltip="Italic">
          <LuItalic size={20} />
        </IconButton>
        <IconButton tooltip="Underline">
          <LuUnderline size={20} />
        </IconButton>
        <IconButton tooltip="Strikethrough">
          <LuStrikethrough size={20} />
        </IconButton>
        <IconButton tooltip="Quote">
          <LuQuote size={20} />
        </IconButton>
        <Divider />
        <IconButton tooltip="Ordered List">
          <LuListOrdered size={20} />
        </IconButton>
        <IconButton tooltip="Unordered List">
          <LuList size={20} />
        </IconButton>
        <Divider />
        <IconButton tooltip="Align Justify">
          <LuAlignJustify size={20} />
        </IconButton>
        <IconButton tooltip="Align Left">
          <LuAlignLeft size={20} />
        </IconButton>
        <IconButton tooltip="Align Center">
          <LuAlignCenter size={20} />
        </IconButton>
        <IconButton tooltip="Align Right">
          <LuAlignRight size={20} />
        </IconButton>
        <Divider />
        <IconButton tooltip="Indent">
          <LuIndent size={20} />
        </IconButton>
        <IconButton tooltip="Outdent">
          <LuOutdent size={20} />
        </IconButton>
        <Divider />
        <IconButton tooltip="Link">
          <LuLink size={20} />
        </IconButton>
        <IconButton tooltip="Unlink">
          <LuUnlink size={20} />
        </IconButton>
        <Divider />
        <IconButton tooltip="Undo">
          <LuUndo size={20} />
        </IconButton>
        <IconButton tooltip="Redo">
          <LuRedo size={20} />
        </IconButton>
        <Divider />
        <IconButton tooltip="Remove Formatting">
          <LuRemoveFormatting size={20} />
        </IconButton>
      </div>
      <div className="flex items-center mx-1 my-2">
        <div className="flex items-center h-8">
          <select name="font" className="outline-none">
            <option value="Sans Serif">Sans Serif</option>
            <option value="Serif">Serif</option>
            <option value="Fixed Width">Fixed Width</option>
            <option value="Arial">Arial</option>
            <option value="Arial Black">Arial Black</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Impact">Impact</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
        <div className="flex items-center h-8 ml-4">
          <select name="fontSize" className="outline-none">
            <option value="8px">8px</option>
            <option value="9px">9px</option>
            <option value="10px">10px</option>
            <option value="11px">11px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="18px">18px</option>
            <option value="24px">24px</option>
            <option value="36px">36px</option>
          </select>
        </div>
        <Divider />
        <IconButton tooltip="Heading 1">
          <LuHeading1 size={20} />
        </IconButton>
        <IconButton tooltip="Heading 2">
          <LuHeading2 size={20} />
        </IconButton>
        <IconButton tooltip="Heading 3">
          <LuHeading3 size={20} />
        </IconButton>
        <IconButton tooltip="Heading 4">
          <LuHeading4 size={20} />
        </IconButton>
        <IconButton tooltip="Heading 5">
          <LuHeading5 size={20} />
        </IconButton>
        <IconButton tooltip="Heading 6">
          <LuHeading6 size={20} />
        </IconButton>
        <Divider />
        <LuBaseline size={20} />
        <ColorInput name="textColor" tooltip="Text Color" />
        <LuHighlighter size={20} className="ml-3" />
        <ColorInput
          name="backgroundColor"
          tooltip="Background Color"
          defaultValue="#ffffff"
        />
        <Divider />
        <div className="relative">
          <div ref={buttonRef} className="inline-block text-primary">
            <IconButton
              tooltip="Variables"
              onClick={() => setShowVariableArea(!showVariableArea)}
            >
              <PiBracketsCurlyBold size={20} />
            </IconButton>
          </div>
          {showVariableArea && (
            <div
              ref={popoverRef}
              className="absolute p-4 transform -translate-x-1/2 bg-white rounded-md w-108 shadow-popover left-1/2"
            >
              <h2 className="p-2 font-medium text-gray-400">Custom</h2>
              <div className="flex items-center p-2">
                <div className="w-3/4 pr-1.5">
                  <Input label="Custom Variable" />
                </div>
                <div className="text-dark-gray">
                  <IconButton>
                    <TbCodePlus size={24} />
                  </IconButton>
                </div>
              </div>
              <h2 className="p-2 font-medium text-gray-400">Mail</h2>
              <div className="flex flex-wrap items-center px-2 pb-2">
                {MAIL_BUTTONS.map(({ name }) => (
                  <div key={name} className="inline-block p-0.5">
                    <Button
                      text={name}
                      textColor="text-white"
                      borderColor="border-purple"
                      backgroundColor="bg-purple"
                      hoverBackgroundColor="hover:bg-dark-purple"
                    />
                  </div>
                ))}
              </div>
              <h2 className="p-2 font-medium text-gray-400">Month</h2>
              <div className="flex flex-wrap items-center px-2 pb-2">
                {MONTH_BUTTONS.map(({ name }) => (
                  <div key={name} className="inline-block p-0.5">
                    <Button
                      text={name}
                      textColor="text-white"
                      borderColor="border-purple"
                      backgroundColor="bg-purple"
                      hoverBackgroundColor="hover:bg-dark-purple"
                    />
                  </div>
                ))}
              </div>
              <h2 className="p-2 font-medium text-gray-400">Date</h2>
              <div className="flex flex-wrap items-center p-2">
                <div className="inline-block">
                  <SelectBox
                    options={DATE_OPTIONS}
                    defaultValue={DATE_OPTIONS[0].value}
                  >
                    <TbCalendarCode />
                  </SelectBox>
                </div>
                <div className="flex flex-col items-start font-extralight">
                  <label
                    htmlFor="long-date-format"
                    className="flex items-center"
                  >
                    <input
                      type="radio"
                      id="long-date-format"
                      name="dateFormat"
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
                  <label
                    htmlFor="short-date-format"
                    className="flex items-center"
                  >
                    <input
                      type="radio"
                      id="short-date-format"
                      name="dateFormat"
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
          )}
        </div>
      </div>
      <div className="p-4 border-t border-stroke">
        <div
          contentEditable
          className="overflow-y-auto outline-none h-120"
        ></div>
      </div>
    </div>
  );
}
