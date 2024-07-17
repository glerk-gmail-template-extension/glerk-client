export default function Button({
  text,
  textColor = "text-dark-gray",
  borderColor = "border-stroke",
  backgroundColor = "bg-white",
  hoverBackgroundColor = "hover:bg-gray-50",
  children: Icon,
}) {
  const buttonStyle = `${textColor} ${borderColor} ${backgroundColor} ${hoverBackgroundColor}`;

  return (
    <button
      type="button"
      className={`flex border ${buttonStyle} font-medium rounded-2xl text-sm px-5 py-2.5 h-10`}
    >
      <div className="flex items-center h-5 mr-1.5">{Icon}</div>
      <div>{text}</div>
    </button>
  );
}
