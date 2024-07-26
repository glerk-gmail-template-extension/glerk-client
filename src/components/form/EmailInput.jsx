import { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMailSharp } from "react-icons/io5";

export default function EmailInput({ label, name, value, onChange }) {
  const [email, setEmail] = useState(value);
  const [isComposing, setIsComposing] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (email === "" && value !== "" && isInit) {
      setEmail(value);
      setIsInit(false);
    } else {
      onChange({
        target: {
          name,
          value: email,
        },
      });
    }
  }, [email, value, isInit]);

  const deleteEmail = () => {
    setEmail(null);
  };

  const preventSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const addEmail = (event) => {
    const currentValue = emailInputRef.current.value.trim();

    if (event.key === "Enter" && currentValue !== "") {
      setEmail(currentValue);

      emailInputRef.current.value = "";
    }
  };

  const handleEnterKeyDown = (event) => {
    if (isComposing) return;

    preventSubmit(event);

    const inputValue = emailInputRef.current.value;

    if (event.key === "Backspace" && inputValue.length === 0) {
      if (!email) return;
      deleteEmail(null);
      return;
    }

    addEmail(event);
  };

  const handleBlur = () => {
    const currentValue = emailInputRef.current.value.trim();

    if (currentValue !== "") {
      setEmail(currentValue);

      emailInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full mb-2">
      <p className="mb-2 text-sm font-medium text-dark-gray">{label}</p>
      <div className="flex flex-wrap items-center p-1 border rounded-lg border-stroke">
        <IoMailSharp color="#c1c1c1" size={18} className="ml-2 mr-2" />
        {email && (
          <div className="flex justify-center items-center m-1 pl-3 py-0.5 border rounded-full border-light-gray">
            <span className="text-sm">{email}</span>
            <button
              type="button"
              className="p-2"
              aria-label="delete email"
              onClick={() => {
                setEmail(null);
              }}
            >
              <HiOutlineXMark size={12} />
            </button>
          </div>
        )}
        <div className="flex items-center flex-grow">
          <input
            type="text"
            name={name}
            ref={emailInputRef}
            {...(email && { disabled: "disabled" })}
            onKeyDown={handleEnterKeyDown}
            onBlur={handleBlur}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="flex-grow p-2 text-sm appearance-none text-dark-gray focus:outline-none disabled:bg-white"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
