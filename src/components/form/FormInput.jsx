import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  {
    label,
    name,
    value,
    onChange,
    onBlur,
    isRequired,
    placeholder,
    validationMessage,
  },
  ref,
) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${validationMessage ? "text-red" : "text-dark-gray"}`}
      >
        {label}
        {isRequired && <span className="absolute -top-1">*</span>}
        <input
          ref={ref}
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          className={`border ${validationMessage ? "border-red text-red placeholder-red" : "border-stroke text-dark-gray focus:border-primary"} text-sm rounded-lg block w-full px-2.5 py-3 mt-1.5 appearance-none focus:outline-none`}
          placeholder={placeholder}
          autoComplete="off"
        />
      </label>
      <p className="h-4 mt-2 text-xs text-red">
        {validationMessage && (
          <span className="font-light">{validationMessage}</span>
        )}
      </p>
    </div>
  );
});

export default FormInput;
