import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavigationItem({ children, isActive, title, url }) {
  return (
    <li className="mb-6">
      <Link
        to={url}
        className={`flex flex-col items-center group ${isActive && "text-primary pointer-events-none cursor-default"}`}
      >
        <div
          className={`flex items-center justify-center w-full h-10 mb-1 rounded-full ${!isActive && "group-hover:bg-gray-200"}`}
        >
          {children}
        </div>
        <span className="text-xs font-semibold">{title}</span>
      </Link>
    </li>
  );
}

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
