import SelectBox from "./SelectBox";

export default function LabelSelectBox({
  name,
  label,
  isRequired,
  value,
  options,
  onChange,
  children,
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-dark-gray"
      >
        {label}
        {isRequired && <span className="absolute -top-1">*</span>}
        <SelectBox
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          hasLabel
        >
          {children}
        </SelectBox>
      </label>
    </div>
  );
}
