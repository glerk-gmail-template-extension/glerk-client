import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import Avatar from "./Avatar";
import IconButton from "../ui/IconButton";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between h-20 mx-auto my-3 min-w-224 max-w-240">
      <Link to="/">
        <h1 className="text-3xl font-roboto">Glerk</h1>
      </Link>
      <div className="relative flex items-center justify-between">
        <div className="flex">
          <div className="self-center">
            <Avatar initial="J" />
          </div>
          <div className="ml-3 mr-6 text-left">
            <p className="text-base font-semibold">Jieun Oh</p>
            <p className="text-sm font-light">jieunoh@gmail.com</p>
          </div>
          <IconButton tooltip="Log out">
            <FiLogOut />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
