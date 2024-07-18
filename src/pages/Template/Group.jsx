import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaRegTrashCan } from "react-icons/fa6";
import { IoFolderOpenOutline } from "react-icons/io5";
import { LuFolderEdit } from "react-icons/lu";

import IconButton from "../../components/ui/IconButton";

export default function Group({
  isActive,
  onSelect,
  name,
  isLastGroup,
  children,
}) {
  const groupId = `group-${name}`;

  return (
    <>
      <h2 id={groupId}>
        <button
          type="button"
          className={`flex items-center justify-between w-full gap-3 p-5 font-medium text-dark-gray border-t border-stroke ${isLastGroup && !isActive && "border-b"} ${isActive && "bg-gray-50"} rtl:text-right hover:bg-blue-100`}
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
        <div className={`p-5 ${isLastGroup && isActive && "border-b"}`}>
          <div className="flex justify-between mb-2">
            <span className="self-center font-semibold text-dark-gray">
              Total: 6
            </span>
            <div className="flex">
              <Link to="/templates/groups/edit">
                <IconButton tooltip="Edit Group Name">
                  <LuFolderEdit />
                </IconButton>
              </Link>
              <Link to="/templates/groups/delete">
                <IconButton tooltip="Delete Group">
                  <FaRegTrashCan />
                </IconButton>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </article>
    </>
  );
}
