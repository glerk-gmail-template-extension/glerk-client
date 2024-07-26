import React, { useEffect, useRef, useState } from "react";
import { LuBaseline, LuHighlighter, LuRemoveFormatting } from "react-icons/lu";

import Divider from "../form/Divider";
import ColorInput from "../form/ColorInput";

import IconButton from "../ui/IconButton";

import {
  EDITOR_FEATURES,
  EDITOR_FONT,
  EDITOR_FONT_SIZE,
  EDITOR_HEADER,
} from "../../constants/editor";

import VariableArea from "./VariableArea";
import { addVariable, storeCurrentCursor } from "../../utils/editor";

export default function EditorButtons({ editorRef }) {
  const variablePopoverRef = useRef(null);
  const variableButtonRef = useRef(null);
  const [showVariableArea, setShowVariableArea] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !showVariableArea ||
        !variablePopoverRef.current ||
        !variableButtonRef.current
      ) {
        return;
      }

      if (
        !variablePopoverRef.current.contains(event.target) &&
        !variableButtonRef.current.contains(event.target)
      ) {
        setShowVariableArea(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVariableArea]);

  const handleFormatOptionButton = (formatText) => {
    formatText();
    editorRef.current.focus();
  };

  const handleEditorChange = (command, value) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleFontSizeChange = (event) => {
    document.execCommand(
      "insertHTML",
      false,
      `<span style="font-size: ${event.target.value}px;">${window
        .getSelection()
        .toString()}</span>`,
    );
    editorRef.current.focus();
  };

  const cursorRef = useRef(null);

  const handleVariableAdd = (variable) => {
    addVariable(variable, editorRef, cursorRef);
    setShowVariableArea(false);
  };

  return (
    <>
      <div>
        {EDITOR_FEATURES.map((feature) => {
          return (
            <React.Fragment key={feature.description}>
              {feature.option === "break" && <Divider />}
              {feature.option !== "break" && (
                <IconButton
                  tooltip={feature.description}
                  onClick={() => {
                    handleFormatOptionButton(feature.formatText);
                  }}
                >
                  <feature.Icon size={20} />
                </IconButton>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex items-center mx-1 my-2">
        <div className="flex items-center h-8">
          <select
            id="font"
            className="outline-none"
            onChange={(event) =>
              handleEditorChange("fontName", event.target.value)
            }
          >
            {EDITOR_FONT.map((fontFamily) => (
              <option key={fontFamily.option} value={fontFamily.option}>
                {fontFamily.description}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center h-8 ml-4">
          <select
            id="fontSize"
            defaultValue={14}
            className="outline-none"
            onChange={handleFontSizeChange}
          >
            {EDITOR_FONT_SIZE.map((fontSize) => (
              <option key={fontSize.option} value={fontSize.option}>
                {fontSize.description}
              </option>
            ))}
          </select>
        </div>
        <Divider />
        <div className="flex items-center h-8 ml-4">
          <select
            id="heading"
            defaultValue="H6"
            className="outline-none"
            onChange={(event) =>
              handleEditorChange("formatBlock", event.target.value)
            }
          >
            {EDITOR_HEADER.map((header) => (
              <option key={header.option} value={header.option}>
                {header.description}
              </option>
            ))}
          </select>
        </div>
        <Divider />
        <LuBaseline size={20} />
        <ColorInput
          id="textColor"
          tooltip="Text Color"
          onColorChange={(hex) => handleEditorChange("foreColor", hex)}
        />
        <LuHighlighter size={20} className="ml-3" />
        <ColorInput
          id="backgroundColor"
          tooltip="Background Color"
          defaultValue="#ffffff"
          onColorChange={(hex) => handleEditorChange("backColor", hex)}
        />
        <Divider />
        <IconButton tooltip="Remove Formatting">
          <LuRemoveFormatting size={20} />
        </IconButton>
        <Divider />
        <div className="relative">
          <div ref={variableButtonRef} className="inline-block text-primary">
            <IconButton
              tooltip="변수 추가"
              onClick={() => {
                storeCurrentCursor(cursorRef);
                setShowVariableArea(!showVariableArea);
              }}
            >
              <span className="select-none">{"{...}"}</span>
            </IconButton>
          </div>
          {showVariableArea && (
            <VariableArea
              ref={variablePopoverRef}
              onVariableAdd={handleVariableAdd}
            />
          )}
        </div>
      </div>
    </>
  );
}
