import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoFolderOpenOutline } from "react-icons/io5";
import { LuFolderEdit } from "react-icons/lu";

import Button from "../../components/ui/Button";

export default function Group({
  isActive,
  onSelect,
  name,
  isFirstGroup,
  isLastGroup,
  children,
}) {
  const groupId = `group-${name}`;

  return (
    <>
      <h2 id={groupId}>
        <button
          type="button"
          className={`flex items-center justify-between w-full gap-3 p-5 font-medium text-dark-gray border border-stroke ${!isLastGroup && "border-b-0"} ${isActive && "bg-gray-50"} ${isFirstGroup && "rounded-t-lg"} ${isLastGroup && !isActive && "rounded-b-lg"} rtl:text-right hover:bg-blue-100`}
          data-accordion-target={`#${name}`}
          aria-expanded={isActive}
          aria-controls={name}
          onClick={onSelect}
        >
          <div className="flex items-center gap-2">
            <IoFolderOpenOutline />
            <span>{name}</span>
          </div>
          {isActive ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </h2>
      <article
        id={name}
        className={`${!isActive && "hidden"}`}
        aria-labelledby={groupId}
      >
        <div
          className={`p-5 border ${!isLastGroup && "border-b-0"} ${isLastGroup && "border-t-0 rounded-b-lg"} border-stroke`}
        >
          <div className="flex justify-between mb-2">
            <span className="self-center font-semibold text-dark-gray">
              Total: 6
            </span>
            <Button text="Edit Group">
              <LuFolderEdit />
            </Button>
          </div>
          {children}
        </div>
      </article>
    </>
  );
}
