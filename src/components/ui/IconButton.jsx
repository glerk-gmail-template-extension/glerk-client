import { useState } from "react";

export default function IconButton({ children, tooltip, onClick = () => {} }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </button>
      {showTooltip && tooltip && (
        <div className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-black rounded-md bottom-full left-1/2 whitespace-nowrap w-max">
          {tooltip}
        </div>
      )}
    </div>
  );
}
