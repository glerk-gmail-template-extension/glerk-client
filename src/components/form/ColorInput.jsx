import { useState } from "react";

export default function ColorInput({
  name,
  tooltip,
  defaultValue = "#000000",
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <input
        type="color"
        name={name}
        className="ml-2 color-picker"
        defaultValue={defaultValue}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-black rounded-md bottom-full left-1/2 whitespace-nowrap w-max">
          {tooltip}
        </div>
      )}
    </div>
  );
}
