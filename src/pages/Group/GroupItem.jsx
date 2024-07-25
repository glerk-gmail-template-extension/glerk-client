import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaRegTrashCan } from "react-icons/fa6";
import { IoFolderOpenOutline, IoFolderOutline } from "react-icons/io5";
import { LuFolderEdit } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";

import IconButton from "../../components/ui/IconButton";

export default function Group({
  id,
  name,
  isLastGroup,
  isActive,
  onGroupSelect,
  totalCount,
  children,
}) {
  return (
    <>
      <h2 id={id}>
        <button
          type="button"
          className={`flex items-center justify-between w-full gap-3 p-5 font-medium text-dark-gray border-t border-stroke ${isLastGroup && !isActive && "border-b"} ${isActive && "bg-gray-50"} rtl:text-right hover:bg-gray-50 active:bg-gray-100`}
          data-accordion-target={`#${name}`}
          aria-expanded={isActive}
          aria-controls={name}
          onClick={onGroupSelect}
        >
          <div className="flex items-center gap-2">
            {isActive ? <IoFolderOpenOutline /> : <IoFolderOutline />}
            <span>{name}</span>
            <div className="flex items-center justify-center py-0.5 px-3 bg-sky-100 text-dark-gray rounded-2xl text-sm ml-2">
              <FaRegFileAlt /> <span className="ml-2">{totalCount}</span>
            </div>
          </div>
          {isActive ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </h2>
      <article
        id={name}
        className={`${!isActive && "hidden"}`}
        aria-labelledby={id}
      >
        <div className={`p-5 ${isLastGroup && isActive && "border-b"}`}>
          <div className="flex justify-between mb-2">
            <span className="self-center font-semibold text-dark-gray">
              Total: {totalCount}
            </span>
            <div className="flex">
              <Link to={`/groups/edit/${id}`}>
                <IconButton tooltip="그룹 수정">
                  <LuFolderEdit />
                </IconButton>
              </Link>
              <Link to={`/groups/delete/${id}`}>
                <IconButton tooltip="그룹 삭제">
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
