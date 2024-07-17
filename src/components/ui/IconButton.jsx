import { useState } from "react";

export default function IconButton({ children, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </button>
      {showTooltip && (
        <div className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-black rounded-md bottom-full left-1/2 whitespace-nowrap w-max">
          {tooltip}
        </div>
      )}
    </div>
  );
}
