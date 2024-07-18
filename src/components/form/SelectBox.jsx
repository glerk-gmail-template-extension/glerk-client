export default function SelectBox({ defaultValue, options, children }) {
  return (
    <div className="flex p-1 mr-4 border rounded-lg border-stroke">
      <div className="self-center ml-2">{children}</div>
      <select
        defaultValue={defaultValue}
        className="text-sm block w-full p-2.5 outline-none truncate"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
