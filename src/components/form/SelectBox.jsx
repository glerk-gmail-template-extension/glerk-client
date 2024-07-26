export default function SelectBox({
  name,
  value,
  options,
  onChange,
  hasLabel = false,
  children,
}) {
  return (
    <div
      className={`flex p-1 mr-4 border rounded-lg border-stroke ${hasLabel && "mt-1.5"}`}
    >
      <div className="self-center ml-2">{children}</div>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full p-2.5 text-sm truncate outline-none"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
