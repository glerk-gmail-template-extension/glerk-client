import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

import EditorButtons from "../editor/EditorButtons";

export default function Editor({ name, value, onChange }) {
  const editorRef = useRef(null);
  const contentRef = useRef(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current && value) {
      contentRef.current = DOMPurify.sanitize(value);
      if (editorRef.current) {
        editorRef.current.innerHTML = contentRef.current;
      }
      isInitializedRef.current = true;
    }
  }, [value]);

  const handleHtmlModeToggle = () => {
    if (!isHtmlMode) {
      contentRef.current = DOMPurify.sanitize(
        editorRef.current.innerHTML,
      ).replace(/></g, ">\n<");
    } else {
      contentRef.current = DOMPurify.sanitize(
        editorRef.current.innerText,
      ).replace(/>\n</g, "><");

      editorRef.current.innerHTML = "";
    }

    setIsHtmlMode(!isHtmlMode);
  };

  useEffect(() => {
    if (isHtmlMode) {
      editorRef.current.textContent = contentRef.current;
    }
  }, [isHtmlMode]);

  const onEditorBlur = () => {
    onChange({
      target: {
        name,
        value: isHtmlMode
          ? DOMPurify.sanitize(editorRef.current.innerText).replace(
              />\n</g,
              "><",
            )
          : DOMPurify.sanitize(editorRef.current.innerHTML),
      },
    });
  };

  return (
    <div className="w-full p-2 border rounded-lg border-stroke">
      <EditorButtons editorRef={editorRef} />
      <div
        ref={editorRef}
        contentEditable
        className="p-4 overflow-y-auto border-t outline-none h-120 border-stroke reset"
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          whiteSpace: isHtmlMode ? "pre-wrap" : "normal",
        }}
        {...(!isHtmlMode && {
          dangerouslySetInnerHTML: {
            __html: contentRef.current,
          },
        })}
        onBlur={onEditorBlur}
      ></div>
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
