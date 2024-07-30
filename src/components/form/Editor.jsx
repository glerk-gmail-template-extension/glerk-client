import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

import EditorButtons from "../editor/EditorButtons";
import {
  getBackgroundColor,
  getFontColor,
  getFontFamily,
  getFontSize,
  getHeaderTag,
  getTextAlign,
} from "../../utils/editor";
import { EDITOR_FONT, EDITOR_FONT_SIZE } from "../../constants/editor";

export default function Editor({ name, value, onChange }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const textEditorRef = useRef(null);
  const htmlEditorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isInitialized && value) {
      contentRef.current = DOMPurify.sanitize(value);
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  const handleHtmlModeToggle = () => {
    if (!isHtmlMode) {
      contentRef.current = DOMPurify.sanitize(
        textEditorRef.current.innerHTML,
      ).replace(/></g, ">\n<");
    } else {
      contentRef.current = DOMPurify.sanitize(
        htmlEditorRef.current.value,
      ).replace(/>\n</g, "><");
    }

    setIsHtmlMode(!isHtmlMode);
  };

  const onEditorBlur = () => {
    onChange({
      target: {
        name,
        value: isHtmlMode
          ? DOMPurify.sanitize(htmlEditorRef.current.value).replace(
              />\n</g,
              "><",
            )
          : DOMPurify.sanitize(textEditorRef.current.innerHTML),
      },
    });
  };

  const [activeFormat, setActiveFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const getCaretNode = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const node = range.startContainer;

    return node.nodeType === 3 ? node.parentNode : node;
  };

  const updateActiveFormat = () => {
    const node = getCaretNode();
    if (!node) return;

    const fonts = EDITOR_FONT.map((font) => font.option);

    setActiveFormat({
      bold: node.closest("b") !== null,
      italic: node.closest("i") !== null,
      underline: node.closest("u") !== null,
      strikethrough: node.closest("strike") !== null,
      insertOrderedList: node.closest("ol") !== null,
      insertUnorderedList: node.closest("ul") !== null,
      justifyFull: getTextAlign(node) === "justify",
      justifyLeft: getTextAlign(node) === "left",
      justifyCenter: getTextAlign(node) === "center",
      justifyRight: getTextAlign(node) === "right",
      fontFamily: getFontFamily(node, fonts),
      fontSize: getFontSize(node, EDITOR_FONT_SIZE),
      headerTag: getHeaderTag(node),
      fontColor: getFontColor(node),
      backgroundColor: getBackgroundColor(node),
    });
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormat();
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <div className="w-full p-2 border rounded-lg border-stroke">
      {!isHtmlMode && (
        <EditorButtons editorRef={textEditorRef} activeFormat={activeFormat} />
      )}
      {isHtmlMode ? (
        <textarea
          rows={22}
          ref={htmlEditorRef}
          onBlur={onEditorBlur}
          defaultValue={contentRef?.current || ""}
          className="w-full p-4 overflow-y-auto border-t outline-none border-stroke editor"
          style={{
            height: "35rem",
            display: "block",
          }}
        />
      ) : (
        <div
          ref={textEditorRef}
          contentEditable
          className="p-4 overflow-y-auto border-t outline-none border-stroke editor"
          style={{
            fontFamily: "sans-serif",
            fontSize: "14px",
            height: "30rem",
            display: "block",
          }}
          {...(!isHtmlMode && {
            dangerouslySetInnerHTML: {
              __html: contentRef.current,
            },
          })}
          onBlur={onEditorBlur}
        ></div>
      )}
      <label
        className="inline-flex items-center mb-5 cursor-pointer"
        htmlFor="editorType"
      >
        <input
          id="editorType"
          type="checkbox"
          value="editor"
          className="sr-only peer"
          onChange={handleHtmlModeToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-emerald-400"></div>
        <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
          {isHtmlMode ? "HTML" : "Editor"}
        </span>
      </label>
    </div>
  );
}
