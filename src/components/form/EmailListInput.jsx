import { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMailSharp } from "react-icons/io5";

import axios from "../../api/axiosConfig";

const SEPARATORS = ["Enter", " ", ","];

export default function EmailListInput({ label, name, value, onChange }) {
  const [emails, setEmails] = useState(value);
  const [isInit, setIsInit] = useState(true);

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

  const [emailInput, setEmailInput] = useState("");

  const getEmailIfValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? email : null;
  };

  const addEmail = (event) => {
    const validEmail = getEmailIfValid(emailInput.trim());

    if (SEPARATORS.includes(event.key)) {
      if (validEmail !== null) {
        setEmails((prev) => {
          return [...prev, validEmail];
        });
      }

      setEmailInput("");
    }
  };

  const [isComposing, setIsComposing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [autocompleteList, setAutocompleteList] = useState([]);

  const fetchAutocompleteList = async (query) => {
    if (query.includes("@") && autocompleteList.length === 0) return;

    if (query.includes("@") && autocompleteList.length > 0) {
      setAutocompleteList([]);
      return;
    }

    try {
      const { data } = await axios.get(`/v1/autocomplete?email=${query}`);
      setAutocompleteList(data);
    } catch (error) {
      setAutocompleteList([]);
      console.error("Error during fetch autocomplete", error);
    }
  };

  const handleEmailInut = (event) => {
    const inputEmailValue = event.target.value;

    if (inputEmailValue.trim().length > 0) {
      fetchAutocompleteList(inputEmailValue.trim());
    } else {
      setAutocompleteList([]);
    }

    setEmailInput(inputEmailValue);
  };

  const handleKeyDown = (event) => {
    const inputValue = event.target.value;
    if (isComposing) return;

    preventSubmit(event);

    if (event.key === "Backspace" && inputValue.length === 0) {
      if (emails.length === 0) return;

      deleteEmail(emails.length - 1);
      return;
    }

    if (event.key === "ArrowDown") {
      setSelectedIndex(
        (prevIndex) => (prevIndex + 1) % autocompleteList.length,
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? autocompleteList.length - 1 : prevIndex - 1,
      );
    } else if (event.key === "Escape") {
      setAutocompleteList([]);
      setSelectedIndex(-1);
    } else if (
      (event.key === "Enter" || event.key === "Tab") &&
      selectedIndex !== -1
    ) {
      if (autocompleteList[selectedIndex]) {
        setEmails((prev) => {
          return [...prev, autocompleteList[selectedIndex].email];
        });
      }

      setAutocompleteList([]);
      setSelectedIndex(-1);
      setEmailInput("");

      return;
    }

    addEmail(event);
  };

  const handleBlur = () => {
    setAutocompleteList([]);

    if (emailInput.trim() !== "") {
      const emailList = emailInput.trim().split(",");

      emailList.forEach((email) => {
        const validEmail = getEmailIfValid(email);

        setEmails((prev) => {
          return [...prev, validEmail];
        });
      });

      setEmailInput("");
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
            value={emailInput}
            onInput={handleEmailInut}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onBlur={handleBlur}
            className="flex-grow p-2 text-sm appearance-none text-dark-gray focus:border-primary focus:outline-none"
            autoComplete="off"
          />
          {autocompleteList.length > 0 && (
            <div className="absolute z-10 bg-white rounded-lg shadow left-2 top-10 w-60">
              <ul className="py-2 overflow-y-auto text-sm text-gray-700 max-h-48">
                {autocompleteList.map(({ email }, index) => (
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
