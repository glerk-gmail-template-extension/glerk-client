import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAtom, useSetAtom } from "jotai";

import Avatar from "./Avatar";
import IconButton from "../ui/IconButton";

import axios from "../../api/axiosConfig";
import { toastMessageAtom, userAtom } from "../../lib/atoms";
import profile from "../../assets/images/profile.png";

export default function Navigation() {
  const [user, setUser] = useAtom(userAtom);
  const setToastMessage = useSetAtom(toastMessageAtom);

  const handleLogoutClick = async () => {
    try {
      await axios.get("/v1/oauth/logout");
      setUser(null);

      window.location.href = "/login";
    } catch (error) {
      setToastMessage({
        message:
          "오류가 발생하여 로그아웃할 수 없습니다. 잠시 후 다시 시도해 주세요.",
        isWarning: true,
      });
    }
  };

  return (
    <nav className="flex items-center justify-between h-20">
      <Link to="/">
        <h1 className="text-3xl font-roboto">Glerk</h1>
      </Link>
      <div className="relative flex items-center justify-between">
        <div className="flex">
          <div className="self-center">
            <Avatar profileUrl={user.profileUrl || profile} />
          </div>
          <div className="ml-3 mr-6 text-left">
            <p className="text-base font-semibold">{user.username}</p>
            <p className="text-sm font-light">{user.email}</p>
          </div>
          <IconButton tooltip="Log out" onClick={handleLogoutClick}>
            <FiLogOut />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
