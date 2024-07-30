import { useState } from "react";

export default function ColorInput({
  id,
  tooltip,
  value = "#000000",
  onColorChange,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleColorChange = (event) => {
    onColorChange(event.target.value);
  };

  return (
    <div className="relative flex items-center justify-center">
      <input
        type="color"
        id={id}
        className="ml-2 color-picker"
        value={value}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={handleColorChange}
      />
      {showTooltip && (
        <div className="absolute px-2 py-1 mb-2 text-xs text-white transform -translate-x-1/2 bg-black rounded-md bottom-full left-1/2 whitespace-nowrap w-max">
          {tooltip}
        </div>
      )}
    </div>
  );
}
