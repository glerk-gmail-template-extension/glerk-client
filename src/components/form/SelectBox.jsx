export default function SelectBox({
  name,
  value,
  options,
  onChange,
  children,
}) {
  return (
    <div className="flex p-1 mr-4 border rounded-lg border-stroke">
      <div className="self-center ml-2">{children}</div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="text-sm block w-full p-2.5 outline-none truncate"
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
