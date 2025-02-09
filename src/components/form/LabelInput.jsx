export default function LabelInput({
  label,
  name,
  value,
  onChange,
  isRequired,
  validationMessage,
}) {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          aria-describedby={`message-${label}`}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-dark-gray bg-transparent rounded-lg border appearance-none focus:outline-none peer ${validationMessage ? "border-red" : "border-stroke"}`}
          value={value}
          onChange={onChange}
          placeholder=" "
          autoComplete="off"
        />
        <label
          htmlFor={name}
          className={`absolute text-sm bg-white ${validationMessage ? "text-red" : "text-dark-gray"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1`}
        >
          {label}
          {isRequired && <span className="absolute -top-1">*</span>}
        </label>
      </div>
      <p id={`message-${label}`} className="mt-2 text-xs text-red">
        {validationMessage && (
          <span className="font-light">{validationMessage}</span>
        )}
      </p>
    </>
  );
}
