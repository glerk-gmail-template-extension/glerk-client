import { IoSearch } from "react-icons/io5";

export default function SearchInput({
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
        <IoSearch />
      </div>
      <input
        type="search"
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="block w-full p-4 text-sm text-gray-900 border outline-none border-stroke rounded-2xl ps-10"
        placeholder={placeholder}
      />
    </div>
  );
}
