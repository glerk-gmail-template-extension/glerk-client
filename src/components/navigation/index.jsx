import {
  FaPaperPlane,
  FaRegPaperPlane,
  FaFileAlt,
  FaRegFileAlt,
} from "react-icons/fa";

import NavigationItem from "./NavigationItem";
import Profile from "./Profile";
import Avatar from "./Avatar";

export default function Navigation() {
  return (
    <nav className="flex flex-col justify-between w-24 px-1 py-10 text-dark-gray bg-ghost-white">
      <ul className="mb-4">
        <NavigationItem isActive title="Templates" url="/templates">
          <FaFileAlt className="w-6 h-6" />
        </NavigationItem>
        <NavigationItem isActive={false} title="Templates" url="/templates">
          <FaRegFileAlt className="w-6 h-6" />
        </NavigationItem>
        <NavigationItem isActive title="Auto Replies" url="/auto-replies">
          <FaPaperPlane className="w-6 h-6" />
        </NavigationItem>
        <NavigationItem
          isActive={false}
          title="Auto Replies"
          url="/auto-replies"
        >
          <FaRegPaperPlane className="w-6 h-6" />
        </NavigationItem>
      </ul>
      <div className="relative flex justify-center">
        <button onClick={() => {}} aria-label="show profile">
          <Avatar initial="J" />
        </button>
        <Profile />
      </div>
    </nav>
  );
}
