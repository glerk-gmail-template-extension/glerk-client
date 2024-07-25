import { Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";

import IconButton from "../ui/IconButton";

export default function ContentWrapper({ children, title, url }) {
  return (
    <div className="box-border relative bg-white rounded-3xl w-140">
      <div className="flex justify-between px-8 pt-6 pb-3 border-b">
        <h1 className="pt-1 text-xl font-semibold">{title}</h1>
        <Link to={url}>
          <IconButton tooltip="닫기">
            <HiOutlineXMark size={25} />
          </IconButton>
        </Link>
      </div>
      {children}
    </div>
  );
}
