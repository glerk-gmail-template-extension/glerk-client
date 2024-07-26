import { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMailSharp } from "react-icons/io5";

const SEPARATORS = ["Enter", " ", ","];

const EMAIL_LIST = [
  "jeo92u@gmail.com",
  "jeo92ny@gmail.com",
  "jeseLeos@gmail.com",
  "ohjieun@naver.com",
  "jieun@kakao.com",
];

export default function EmailListInput({ label, name, value, onChange }) {
  const [emails, setEmails] = useState(value);
  const [isComposing, setIsComposing] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const emailInputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (emails.length === 0 && value.length > 0 && isInit) {
      setEmails(value);
      setIsInit(false);
    } else {
      onChange({
        target: {
          name,
          value: emails,
        },
      });
    }
  }, [emails, value, isInit]);

  useEffect(() => {
    onChange({
      target: {
        name,
        value: emails,
      },
    });
  }, [emails]);

  const deleteEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const preventSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const addEmail = (event) => {
    const currentValue = emailInputRef.current.value.trim();

    if (SEPARATORS.includes(event.key) && currentValue !== "") {
      setEmails((prev) => {
        return [...prev, currentValue];
      });

      emailInputRef.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    const inputValue = emailInputRef.current.value;

    if (inputValue.trim().length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }

    if (isComposing) return;

    preventSubmit(event);

    if (event.key === "Backspace" && inputValue.length === 0) {
      if (emails.length === 0) return;
      deleteEmail(emails.length - 1);
      return;
    }
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % EMAIL_LIST.length);
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? EMAIL_LIST.length - 1 : prevIndex - 1,
      );
    } else if (event.key === "Escape") {
      setIsTyping(false);
      setSelectedIndex(-1);
    } else if (
      (event.key === "Enter" || event.key === "Tab") &&
      selectedIndex !== -1
    ) {
      setEmails((prev) => {
        return [...prev, EMAIL_LIST[selectedIndex]];
      });
      setIsTyping(false);
      setSelectedIndex(-1);

      emailInputRef.current.value = "";
    }

    addEmail(event);
  };

  const handleBlur = () => {
    setIsTyping(false);

    const currentValue = emailInputRef.current.value.replaceAll(" ", "");

    if (currentValue !== "") {
      const values = currentValue.split(",");

      setEmails((prev) => {
        return [...prev, ...values];
      });

      emailInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full mb-2">
      <p className="mb-2 text-sm font-medium text-dark-gray">{label}</p>
      <div className="flex flex-wrap items-center p-1 border rounded-lg border-stroke">
        <IoMailSharp color="#c1c1c1" size={18} className="ml-2 mr-2" />
        {emails.map((email, index) => (
          <div
            key={email}
            className="flex justify-center items-center m-1 pl-3 py-0.5 border rounded-full border-light-gray"
          >
            <span className="text-sm">{email}</span>
            <button
              type="button"
              className="p-2"
              aria-label="delete email"
              onClick={() => deleteEmail(index)}
            >
              <HiOutlineXMark size={12} />
            </button>
          </div>
        ))}
        <div className="relative flex items-center flex-grow">
          <input
            type="text"
            name={name}
            ref={emailInputRef}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onBlur={handleBlur}
            className="flex-grow p-2 text-sm appearance-none text-dark-gray focus:border-primary focus:outline-none"
            autoComplete="off"
          />
          {isTyping && (
            <div className="absolute z-10 bg-white rounded-lg shadow left-2 top-10 w-60">
              <ul className="py-2 overflow-y-auto text-sm text-gray-700 max-h-48">
                {EMAIL_LIST.map((email, index) => (
                  <li
                    key={email}
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 ${index === selectedIndex && "bg-gray-200"}`}
                  >
                    {email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
