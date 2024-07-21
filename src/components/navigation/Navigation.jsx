import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useSetAtom } from "jotai";

import Avatar from "./Avatar";
import IconButton from "../ui/IconButton";

import axios from "../../api/axiosConfig";
import { tokenAtom } from "../../lib/atoms";
import profile from "../../assets/images/profile.png";

export default function Navigation() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileUrl, setProfileUrl] = useState(profile);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/v1/user");

        setUsername(data.username);
        setEmail(data.email);
        setProfileUrl(data.profileUrl);
      } catch (error) {
        console.error(error.response);
      }
    };

    getUser();
  }, []);

  const handleLogoutClick = async () => {
    setToken("");

    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between h-20">
      <Link to="/">
        <h1 className="text-3xl font-roboto">Glerk</h1>
      </Link>
      <div className="relative flex items-center justify-between">
        <div className="flex">
          <div className="self-center">
            <Avatar profileUrl={profileUrl} />
          </div>
          <div className="ml-3 mr-6 text-left">
            <p className="text-base font-semibold">{username}</p>
            <p className="text-sm font-light">{email}</p>
          </div>
          <IconButton tooltip="Log out" onClick={handleLogoutClick}>
            <FiLogOut />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
